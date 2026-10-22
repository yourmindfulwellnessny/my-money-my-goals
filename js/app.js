(function () {
  "use strict";
  var C = window.WORKSHOP_CONFIG || {};
  var T = window.I18N || {};
  var lang = pickLang();

  function pickLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "es") return q;
    try { var s = localStorage.getItem("mmmg-lang"); if (s === "en" || s === "es") return s; } catch (e) {}
    return (navigator.language || "en").toLowerCase().indexOf("es") === 0 ? "es" : "en";
  }

  function t(key) {
    var v = (T[lang] && T[lang][key]) || (T.en && T.en[key]) || "";
    return v.replace("{n}", C.maxChildren || 14);
  }

  function money(n) { return "$" + n; }

  function total(kids) {
    kids = Math.max(1, Math.floor(kids || 1));
    return C.priceFirstChild + C.priceAdditionalSibling * (kids - 1);
  }

  function formatDate() {
    if (!C.date) return null;
    var d = new Date(C.date + "T12:00:00");
    return new Intl.DateTimeFormat(lang === "es" ? "es-US" : "en-US",
      { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(d);
  }

  function formatTime(hm) {
    var p = hm.split(":"), d = new Date(2000, 0, 1, +p[0], +p[1]);
    return new Intl.DateTimeFormat(lang === "es" ? "es-US" : "en-US",
      { hour: "numeric", minute: "2-digit" }).format(d);
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    // Solo textos propios de i18n.js (créditos con enlaces); nunca contenido de usuarios.
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.alt = t(el.getAttribute("data-i18n-alt"));
    });
    document.querySelectorAll(".lang__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });

    var dateTxt = formatDate() || (lang === "es" ? "Por confirmar" : "To be confirmed");
    var timeTxt = (C.startTime && C.endTime) ? formatTime(C.startTime) + " – " + formatTime(C.endTime)
      : (lang === "es" ? "Por confirmar" : "To be confirmed");
    document.querySelectorAll(".js-date").forEach(function (e) { e.textContent = dateTxt; });
    document.querySelectorAll(".js-time").forEach(function (e) { e.textContent = timeTxt; });
    document.querySelectorAll(".js-place").forEach(function (e) { e.textContent = C.publicLocation || "Wallington, NJ"; });

    var open = !!(C.registrationOpen && C.registrationFormUrl);
    document.querySelector(".js-reg-closed").hidden = open;
    document.querySelector(".js-reg-open").hidden = !open;
    var formHref = open ? withLang(C.registrationFormUrl) : "#register";
    document.querySelectorAll(".js-form-link, .js-register").forEach(function (a) {
      a.textContent = open ? t("cta.open") : t("cta.soon");
      a.href = formHref;
      if (open) { a.target = "_blank"; a.rel = "noopener"; } else { a.removeAttribute("target"); }
      a.classList.toggle("is-soon", !open);
    });
    document.querySelectorAll(".js-form-lang").forEach(function (a) {
      a.href = open ? withLang(C.registrationFormUrl, a.dataset.formLang) : "#register";
    });

    var ul = document.querySelector(".js-contact");
    ul.innerHTML = "";
    if (C.contactEmail) addContact(ul, t("contact.email"), "mailto:" + C.contactEmail, C.contactEmail);
    if (C.instagram) addContact(ul, "Instagram", "https://www.instagram.com/" + C.instagram + "/", "@" + C.instagram);

    updateCalc();
  }

  function withLang(url, forced) {
    // Jotform abre la traducción con ?language=es-US (solo el idioma, nunca datos personales).
    var l = forced || lang;
    try { var u = new URL(url); u.searchParams.set("language", l === "es" ? "es-US" : "en"); return u.toString(); }
    catch (e) { return url; }
  }

  function addContact(ul, label, href, text) {
    var li = document.createElement("li");
    var s = document.createElement("span"); s.textContent = label + ": ";
    var a = document.createElement("a"); a.href = href; a.textContent = text;
    if (href.indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
    li.appendChild(s); li.appendChild(a); ul.appendChild(li);
  }

  var kidsInput = document.getElementById("kids");
  function updateCalc() {
    var n = parseInt(kidsInput.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 6) n = 6;
    document.querySelector(".js-total").textContent = money(total(n));
  }
  kidsInput.addEventListener("input", updateCalc);
  kidsInput.addEventListener("change", function () {
    var n = parseInt(kidsInput.value, 10);
    kidsInput.value = isNaN(n) ? 1 : Math.min(6, Math.max(1, n));
    updateCalc();
  });
  document.querySelectorAll(".stepper__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var n = (parseInt(kidsInput.value, 10) || 1) + parseInt(b.dataset.step, 10);
      kidsInput.value = Math.min(6, Math.max(1, n));
      updateCalc();
    });
  });

  document.querySelectorAll(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang;
      try { localStorage.setItem("mmmg-lang", lang); } catch (e) {}
      render();
    });
  });

  // Mientras la inscripción esté cerrada, el botón lleva a la sección de inscripción (aviso "muy pronto").
  document.querySelector(".js-year").textContent = new Date().getFullYear();

  // Exponer el cálculo para pruebas automáticas.
  window.__mmmgTotal = total;
  render();
})();
