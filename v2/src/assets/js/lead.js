/*
 * Lead capture helpers.
 * - Records first-touch source + landing page (so every lead says where it came from).
 * - Submits forms to HubSpot when configured in _data/site.json (hubspot.portalId + form GUIDs).
 * - Never reports success unless the submission actually went through.
 */
(function () {
  var KEY = 'mp_first_touch';
  var cfg = window.MP_CONFIG || {};

  function readFirstTouch() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; }
  }

  function recordFirstTouch() {
    if (readFirstTouch()) return;
    var params = new URLSearchParams(window.location.search);
    var source = params.get('utm_source') || params.get('src');
    if (!source && window.location.pathname.indexOf('/connect') === 0) source = 'calling-card';
    if (!source && document.referrer) {
      try {
        var host = new URL(document.referrer).hostname;
        if (host !== window.location.hostname) source = host;
      } catch (e) {}
    }
    var touch = {
      source: source || 'direct',
      campaign: params.get('utm_campaign') || '',
      landing: window.location.pathname,
      at: new Date().toISOString()
    };
    try { localStorage.setItem(KEY, JSON.stringify(touch)); } catch (e) {}
  }

  function firstTouch() {
    return readFirstTouch() || { source: 'unknown', campaign: '', landing: window.location.pathname };
  }

  function hubspotFormId(formKey) {
    var hs = cfg.hubspot || {};
    return hs.portalId && hs.forms && hs.forms[formKey] ? hs.forms[formKey] : null;
  }

  function isConfigured(formKey) {
    return !!hubspotFormId(formKey);
  }

  /*
   * fields: { firstname, email, phone, message } — standard HubSpot contact properties.
   * Resolves on success; rejects if not configured or the request fails.
   */
  function submit(formKey, fields) {
    var formId = hubspotFormId(formKey);
    if (!formId) return Promise.reject(new Error('not-configured'));
    var list = [];
    Object.keys(fields).forEach(function (name) {
      if (fields[name]) list.push({ name: name, value: String(fields[name]) });
    });
    var url = 'https://api.hsforms.com/submissions/v3/integration/submit/' +
      cfg.hubspot.portalId + '/' + formId;
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: list,
        context: { pageUri: window.location.href, pageName: document.title }
      })
    }).then(function (res) {
      if (!res.ok) throw new Error('hubspot-' + res.status);
      return res;
    });
  }

  recordFirstTouch();
  window.MPLead = { submit: submit, isConfigured: isConfigured, firstTouch: firstTouch };
})();
