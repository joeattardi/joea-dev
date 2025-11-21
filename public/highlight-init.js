document.addEventListener('DOMContentLoaded', function () {
  try {
    var h = window['hljs'];
    if (h && typeof h.highlightAll === 'function') h.highlightAll();
  } catch (e) {
    // fail silently
  }
});
