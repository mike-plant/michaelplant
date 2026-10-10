/*
 * Shared CTA measurement for michaelplant.com, michaelplant.realtor and reclaimhomerepair.com.
 * One event shape on all three sites, so they can be compared side by side.
 *
 *   event: "cta_click"
 *   props: { site, page, action, location, label, source }
 *     action   = call | text | email | save_contact | link
 *     location = data-cta on the element (e.g. "hero", "bar", "end"), else the nearest section id
 *     source   = first-touch source (?src= / utm_source / referrer host / "calling-card" on /connect)
 *
 * Sends to whatever analytics is installed: dataLayer (GTM, GA4, Adobe Launch), gtag, plausible,
 * or window.MPTrack. Nothing is sent anywhere if none is installed.
 */
(function () {
  var KEY = 'mp_first_touch';
  var SITE = document.documentElement.getAttribute('data-site') || location.hostname;

  function readTouch() { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } }
  (function recordTouch() {
    if (readTouch()) return;
    var q = new URLSearchParams(location.search);
    var source = q.get('utm_source') || q.get('src');
    if (!source && location.pathname.indexOf('/connect') === 0) source = 'calling-card';
    if (!source && document.referrer) {
      try { var h = new URL(document.referrer).hostname; if (h !== location.hostname) source = h; } catch (e) {}
    }
    try {
      localStorage.setItem(KEY, JSON.stringify({ source: source || 'direct', campaign: q.get('utm_campaign') || '', landing: location.pathname }));
    } catch (e) {}
  })();

  function actionFor(el) {
    var href = (el.getAttribute('href') || '').toLowerCase();
    if (href.indexOf('tel:') === 0) return 'call';
    if (href.indexOf('sms:') === 0) return 'text';
    if (href.indexOf('mailto:') === 0) return 'email';
    if (/\.vcf($|\?)/.test(href)) return 'save_contact';
    return 'link';
  }

  function locationFor(el) {
    if (el.getAttribute('data-cta')) return el.getAttribute('data-cta');
    if (el.closest('.contact-bar')) return 'bar';
    if (el.closest('.masthead')) return 'masthead';
    var s = el.closest('section[id], section[aria-labelledby], header, footer');
    return s ? (s.id || s.getAttribute('aria-labelledby') || s.tagName.toLowerCase()) : 'page';
  }

  function send(name, props) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, props)); } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('event', name, props); } catch (e) {}
    try { if (typeof window.plausible === 'function') window.plausible(name, { props: props }); } catch (e) {}
    try { if (typeof window.MPTrack === 'function') window.MPTrack(name, props); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"], a[href$=".vcf"], [data-cta]');
    if (!el) return;
    var t = readTouch() || {};
    send('cta_click', {
      site: SITE,
      page: location.pathname,
      action: actionFor(el),
      location: locationFor(el),
      label: (el.textContent || '').trim().slice(0, 60),
      source: t.source || 'unknown'
    });
  });

  window.MPCta = { firstTouch: readTouch, send: send };
})();
