// Sends a Google Analytics event when someone clicks a store, download,
// contact, or other tracked link. A link's data-ga attribute names its event.
// App Store, Google Play, and mailto links are counted without one. Only the
// link's address goes with the event, never anything the visitor typed.
// Copied from backspinlabs-com public/ga-clicks.js: each site deploys on its
// own, so copy it again after changing it there.
(function () {
  function eventFor(a) {
    var named = a.getAttribute("data-ga");
    if (named) return named;
    if (a.protocol === "mailto:") return "contact_click";
    if (a.hostname === "apps.apple.com") return "app_store_click";
    if (a.hostname === "play.google.com") return "play_store_click";
    return null;
  }

  document.addEventListener("click", function (e) {
    if (typeof window.gtag !== "function" || !(e.target instanceof Element)) return;
    var a = e.target.closest("a[href]");
    if (!a) return;
    var name = eventFor(a);
    if (!name) return;
    // A mailto link's subject and body are left out; the address is ours.
    var url = a.protocol === "mailto:" ? a.href.split("?")[0] : a.href;
    window.gtag("event", name, { link_url: url });
  });
})();
