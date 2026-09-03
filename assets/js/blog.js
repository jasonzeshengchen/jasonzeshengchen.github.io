(function() {
  function initBlogTagFilters() {
    const blog = document.querySelector('[data-blog-root]');
    if (!blog) return;

    const filter = blog.querySelector('[data-blog-tag-filter]');
    const postList = blog.querySelector('.post-list');
    if (!filter || !postList) return;

    const currentPage = blog.dataset.blogCurrentPage;
    const entries = Array.from(postList.querySelectorAll('[data-blog-post]')).map(function(item) {
      const tags = Array.from(item.querySelectorAll('[data-blog-tag]')).map(function(link) {
        return link.dataset.blogTag;
      });

      return {
        item: item,
        page: item.dataset.blogPage,
        tags: new Set(tags),
      };
    });

    const tagNames = new Map();
    postList.querySelectorAll('[data-blog-tag]').forEach(function(link) {
      const slug = link.dataset.blogTag;
      if (!tagNames.has(slug)) {
        tagNames.set(slug, link.textContent.trim());
      }
    });

    if (entries.length === 0 || tagNames.size === 0) return;

    const options = filter.querySelector('[data-blog-tag-filter-options]');
    const status = filter.querySelector('[data-blog-tag-filter-status]');
    const pagination = blog.querySelector('[data-blog-pagination]');
    const featured = blog.querySelector('[data-blog-featured]');

    function tagUrl(tag) {
      const url = new URL(window.location.href);
      if (tag) {
        url.searchParams.set('tag', tag);
      } else {
        url.searchParams.delete('tag');
      }
      return url.pathname + url.search + url.hash;
    }

    function addFilterOption(tag, label, count) {
      const link = document.createElement('a');
      const countLabel = document.createElement('span');

      link.className = 'content-filter-option';
      link.dataset.blogFilterTag = tag;
      link.href = tagUrl(tag);
      link.setAttribute('aria-label', label + ', ' + count + ' ' + (count === 1 ? 'post' : 'posts'));
      link.appendChild(document.createTextNode(label));

      countLabel.className = 'content-filter-count';
      countLabel.textContent = count;
      countLabel.setAttribute('aria-hidden', 'true');
      link.appendChild(countLabel);
      options.appendChild(link);
    }

    addFilterOption('', 'All', entries.length);
    Array.from(tagNames.keys()).sort(function(left, right) {
      return tagNames.get(left).localeCompare(tagNames.get(right));
    }).forEach(function(tag) {
      const count = entries.filter(function(entry) {
        return entry.tags.has(tag);
      }).length;
      addFilterOption(tag, '#' + tagNames.get(tag), count);
    });

    function requestedTag() {
      return new URL(window.location.href).searchParams.get('tag') || '';
    }

    function applyFilter(requested, updateUrl) {
      const tag = requested;
      const knownTag = tagNames.has(tag);
      const totalNoun = entries.length === 1 ? 'post' : 'posts';
      let visibleCount = 0;

      entries.forEach(function(entry) {
        const visible = tag ? knownTag && entry.tags.has(tag) : entry.page === currentPage;
        entry.item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (pagination) pagination.hidden = Boolean(tag);
      if (featured) featured.hidden = Boolean(tag);

      options.querySelectorAll('[data-blog-filter-tag]').forEach(function(link) {
        const active = link.dataset.blogFilterTag === tag;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      postList.querySelectorAll('[data-blog-tag]').forEach(function(link) {
        const active = Boolean(tag) && link.dataset.blogTag === tag;
        link.classList.toggle('is-active', active);
      });

      if (tag && knownTag) {
        status.textContent = 'Showing ' + visibleCount + ' of ' + entries.length + ' ' + totalNoun + ' tagged #' + tagNames.get(tag);
      } else if (tag) {
        status.textContent = 'No blog posts are tagged #' + tag;
      } else {
        status.textContent = 'Showing ' + visibleCount + ' of ' + entries.length + ' ' + totalNoun;
      }

      if (updateUrl && requestedTag() !== tag) {
        window.history.pushState({ blogTag: tag }, '', tagUrl(tag));
      }
    }

    function handleFilterClick(event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest('[data-blog-filter-tag], [data-blog-tag]');
      if (!link) return;

      event.preventDefault();
      applyFilter(link.dataset.blogFilterTag || link.dataset.blogTag || '', true);
    }

    blog.addEventListener('click', handleFilterClick);
    window.addEventListener('popstate', function() {
      applyFilter(requestedTag(), false);
    });

    filter.hidden = false;
    applyFilter(requestedTag(), false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogTagFilters);
  } else {
    initBlogTagFilters();
  }
})();
