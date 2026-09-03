(function() {
  function initPublicationFilters() {
    const publicationList = document.querySelector('[data-publications-list]');
    const filter = document.querySelector('[data-publication-filter]');

    if (!publicationList || !filter) return;

    const entries = Array.from(publicationList.querySelectorAll('ol.bibliography > li')).map(function(item) {
      const tags = Array.from(item.querySelectorAll('[data-publication-tag]')).map(function(link) {
        return link.dataset.publicationTag;
      });

      return { item: item, tags: new Set(tags) };
    });

    const tagNames = new Map();
    publicationList.querySelectorAll('[data-publication-tag]').forEach(function(link) {
      const slug = link.dataset.publicationTag;
      if (!tagNames.has(slug)) {
        tagNames.set(slug, link.textContent.replace(/^#/, ''));
      }
    });

    if (entries.length === 0 || tagNames.size === 0) return;

    const options = filter.querySelector('[data-publication-filter-options]');
    const status = filter.querySelector('[data-publication-filter-status]');
    const sections = Array.from(publicationList.querySelectorAll('ol.bibliography')).map(function(list) {
      const previous = list.previousElementSibling;
      return {
        list: list,
        heading: previous && previous.matches('h2.bibliography') ? previous : null,
      };
    });

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
      link.dataset.publicationFilterTag = tag;
      link.href = tagUrl(tag);
      link.setAttribute('aria-label', label + ', ' + count + ' ' + (count === 1 ? 'publication' : 'publications'));
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
      const totalNoun = entries.length === 1 ? 'publication' : 'publications';
      let visibleCount = 0;

      entries.forEach(function(entry) {
        const visible = !tag || (knownTag && entry.tags.has(tag));
        entry.item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      sections.forEach(function(section) {
        const hasVisibleEntries = Array.from(section.list.children).some(function(item) {
          return !item.hidden;
        });
        section.list.hidden = !hasVisibleEntries;
        if (section.heading) section.heading.hidden = !hasVisibleEntries;
      });

      options.querySelectorAll('[data-publication-filter-tag]').forEach(function(link) {
        const active = link.dataset.publicationFilterTag === tag;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      publicationList.querySelectorAll('[data-publication-tag]').forEach(function(link) {
        const active = Boolean(tag) && link.dataset.publicationTag === tag;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      if (tag && knownTag) {
        status.textContent = 'Showing ' + visibleCount + ' of ' + entries.length + ' ' + totalNoun + ' tagged #' + tagNames.get(tag);
      } else if (tag) {
        status.textContent = 'No publications are tagged #' + tag;
      } else {
        status.textContent = 'Showing all ' + entries.length + ' ' + totalNoun;
      }

      if (updateUrl && requestedTag() !== tag) {
        window.history.pushState({ publicationTag: tag }, '', tagUrl(tag));
      }
    }

    function handleFilterClick(event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest('[data-publication-filter-tag], [data-publication-tag]');
      if (!link) return;

      event.preventDefault();
      applyFilter(link.dataset.publicationFilterTag || link.dataset.publicationTag || '', true);
    }

    publicationList.addEventListener('click', handleFilterClick);
    window.addEventListener('popstate', function() {
      applyFilter(requestedTag(), false);
    });

    filter.hidden = false;
    applyFilter(requestedTag(), false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPublicationFilters);
  } else {
    initPublicationFilters();
  }
})();
