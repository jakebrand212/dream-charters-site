/* Shared header, footer, and floating "Text us" button.
   Injected on every page so nav/footer stay identical and links never drift.
   Works over file:// — no fetch, markup lives here as strings. */
(function () {
  var PHONE_DISPLAY = "512-808-3270";
  var PHONE_SMS = "+15128083270";
  var PHONE_TEL = "+15128083270";
  var SMS_HREF = "sms:" + PHONE_SMS;
  var IG = "https://www.instagram.com/dreamcharters.atx/";
  var FB = "https://www.facebook.com/";

  // True-alpha logo sitting directly on the background — no chip.
  // Nav and footer are both --navy, so both take the white lockup.
  var LOGO =
    '<img class="brand__logo" src="assets/dc-logo-white.png" alt="Dream Charters ATX" width="541" height="293">';

  // Single source of truth for header, mobile menu AND footer nav, so the
  // three can never drift out of order or out of sync.
  // NOTE: Home is "index.html", not "/", so the site still works over file://
  // and from a project subpath — every other link here is relative too.
  var LINKS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "book.html", label: "Contact Us", key: "book" },
    { href: "boats.html", label: "Our Boats", key: "boats" },
    { href: "experiences.html", label: "Experiences", key: "experiences" },
    { href: "gallery.html", label: "Gallery", key: "gallery" },
    { href: "reviews.html", label: "Reviews", key: "reviews" },
    { href: "faq.html", label: "FAQ", key: "faq" },
    { href: "waiver.html", label: "Waiver Form", key: "waiver" }
  ];

  var page = document.body.getAttribute("data-page") || "";

  function navLinks(mobile) {
    return LINKS.map(function (l) {
      var on = l.key === page;
      return '<a class="' + (on ? "active" : "") + '"' +
        (on ? ' aria-current="page"' : "") +
        ' href="' + l.href + '">' + l.label + "</a>";
    }).join("");
  }

  // Footer "Explore" column — same links, same order, generated from LINKS.
  function footerLinks() {
    return LINKS.map(function (l) {
      var on = l.key === page;
      return "<li><a" + (on ? ' class="active" aria-current="page"' : "") +
        ' href="' + l.href + '">' + l.label + "</a></li>";
    }).join("");
  }

  var header =
    '<header class="nav">' +
      '<div class="wrap nav__inner">' +
        '<a class="brand" href="index.html">' + LOGO +
          '<span class="brand__name">Dream Charters<small>AUSTIN, TX</small></span>' +
        "</a>" +
        '<nav class="nav__links" aria-label="Primary">' + navLinks(false) + "</nav>" +
        '<div class="nav__cta">' +
          '<a class="btn btn-primary" href="book.html">Book Now</a>' +
          '<button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        "</div>" +
      "</div>" +
      '<div class="nav__mobile" id="mobileMenu">' + navLinks(true) +
        '<a class="btn btn-primary btn-block" href="book.html">Book Now</a>' +
        '<a class="btn btn-secondary btn-block" href="' + SMS_HREF + '">Text ' + PHONE_DISPLAY + "</a>" +
      "</div>" +
    "</header>";

  var footer =
    '<footer class="footer">' +
      '<div class="wrap footer__grid">' +
        '<div class="footer__brand">' +
          '<a class="brand" href="index.html" style="margin-bottom:12px">' + LOGO +
            '<span class="brand__name">Dream Charters<small>AUSTIN, TX</small></span></a>' +
          '<p style="max-width:34ch">Family-owned luxury boat charters on Lake Travis, Lake Austin, Lake LBJ & Canyon Lake. Captain and fuel always included — you just bring the crew.</p>' +
          '<div class="footer__socials">' +
            '<a href="' + IG + '" aria-label="Instagram" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .46 1.4.86.4.4.66.8.86 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.46 1-.86 1.4-.4.4-.8.66-1.4.86-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.46-1.4-.86-.4-.4-.66-.8-.86-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.46-1 .86-1.4.4-.4.8-.66 1.4-.86.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.5A6.3 6.3 0 1 0 18.3 12 6.3 6.3 0 0 0 12 5.7zm0 10.4A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1zm6.5-10.6a1.47 1.47 0 1 0 1.47 1.47A1.47 1.47 0 0 0 18.5 5.5z"/></svg></a>' +
            '<a href="' + FB + '" aria-label="Facebook" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.1 8.5h-2V7.1c0-.6.4-.8.7-.8h1.3V3.7L13 3.7c-2.3 0-2.9 1.7-2.9 2.8v2H8.5v2.6h1.6V21h2.9v-7.9h2l.3-2.6z"/></svg></a>' +
            '<a href="' + SMS_HREF + '" aria-label="Text us"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z"/></svg></a>' +
          "</div>" +
        "</div>" +
        "<div>" +
          "<h4>Explore</h4>" +
          "<ul>" + footerLinks() + "</ul>" +
        "</div>" +
        "<div>" +
          "<h4>Get on the water</h4>" +
          '<p class="footer__phone"><a href="tel:' + PHONE_TEL + '">' + PHONE_DISPLAY + "</a></p>" +
          '<ul style="margin-top:10px">' +
            "<li>Open daily · 8am–8pm</li>" +
            "<li>Lake Travis · Lake Austin</li>" +
            "<li>Lake LBJ · Canyon Lake</li>" +
            "<li>Austin, Texas</li>" +
          "</ul>" +
          '<a class="btn btn-primary" style="margin-top:14px" href="book.html">Book Your Charter</a>' +
        "</div>" +
      "</div>" +
      '<div class="wrap footer__bottom">' +
        "<span>© " + "2026 Dream Charters ATX · Demo site</span>" +
        '<span><span class="stars" aria-hidden="true">★</span> '+
        '<span class="sr-only">Rated </span>4.9<span class="sr-only"> out of 5 stars</span> · 50 Google reviews</span>' +
      "</div>" +
    "</footer>";

  var fab =
    '<a class="text-fab" href="' + SMS_HREF + '" aria-label="Text us at ' + PHONE_DISPLAY + '">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z"/></svg>' +
      '<span class="text-fab__label">Text us ' + PHONE_DISPLAY + "</span>" +
    "</a>";

  // Inject
  var h = document.getElementById("site-header");
  if (h) h.outerHTML = header;
  var f = document.getElementById("site-footer");
  if (f) f.outerHTML = footer;
  document.body.insertAdjacentHTML("beforeend", fab);

  // Mobile menu toggle
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
