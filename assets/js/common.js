$(document).ready(function() {
  // add toggle functionality to abstract and bibtex buttons
  $('a.abstract').click(function() {
    $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass('open');
  });
  $('a.bibtex').click(function() {
    $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass('open');
  });
  $('a').removeClass('waves-effect waves-light');

  // bootstrap-toc
  if($('#toc-sidebar').length){
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href  = "../css/jupyter.css";
  cssLink.rel   = "stylesheet";
  cssLink.type  = "text/css";

  let theme = localStorage.getItem("theme");
  if (theme == null || theme == "null") {
    const userPref = window.matchMedia;
    if (userPref && userPref("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
  }

  $('.jupyter-notebook-iframe-container iframe').each(function() {
    $(this).contents().find("head").append(cssLink);

    if (theme == "dark") {
      $(this).bind("load",function(){
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark"});
      });
    }
  });
});

// Re-typeset MathJax when dynamic content (e.g. Nutshell) is inserted.
// Watches for added nodes that appear to contain TeX delimiters and
// calls MathJax.typesetPromise() (v3) if available.
(function() {
  if (!window.MathJax) return;

  let timeout = null;
  function maybeTypeset() {
    if (!window.MathJax || typeof window.MathJax.typesetPromise !== 'function') return;
    // debounce to avoid thrashing on many mutations
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      window.MathJax.typesetPromise()
        .catch(function(err){ console.warn('MathJax typeset error:', err); });
    }, 150);
  }

  const observer = new MutationObserver(function(mutations) {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue; // element nodes only
        const txt = node.textContent || '';
        // cheap heuristic: only trigger if node contains common TeX markers
        if (txt.includes('$') || txt.includes('\\(') || txt.includes('\\[') || txt.includes('\\\\begin')) {
          maybeTypeset();
          return;
        }
      }
    }
  });

  // start observing the document body (if present) once DOM is ready
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // also try a typeset on page load (in case Nutshell expanded content is present)
  document.addEventListener('DOMContentLoaded', function() { maybeTypeset(); });
})();
