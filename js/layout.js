/* Shared header, footer, and floating "Call us" button.
   Injected on every page so nav/footer stay identical and links never drift.
   Works over file:// — no fetch, markup lives here as strings.
   Every contact CTA on the site dials — Tyler took SMS off the table on
   2026-07-27 because calls convert better for him. No messaging hrefs remain
   anywhere in the repo; the .text-fab / .text-banner class names are
   historical and now style a call button. */
(function () {
  var PHONE_DISPLAY = "512-808-3270";
  var PHONE_TEL = "+15128083270";
  var TEL_HREF = "tel:" + PHONE_TEL;
  // Filled phone glyph, 24x24, same inline-SVG approach as every other icon
  // here — no icon library, nothing extra to load.
  var PHONE_ICON =
    '<path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 ' +
    '1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 ' +
    '0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>';
  var IG = "https://www.instagram.com/dreamcharters.atx/";
  var FB = "https://www.facebook.com/";

  // Tyler's live Square Appointments page — the real booking flow.
  // Note book.html is the CONTACT page (questions + form + tel:), not a booking
  // page, so it stays in LINKS below as "Contact Us". Booking CTAs point here.
  var BOOKING_URL = "https://book.squareup.com/appointments/le7ady9q3649w9/location/LFRJ1VVM5ZY8J/services";
  var BOOKING_ATTRS = ' target="_blank" rel="noopener noreferrer"';

  // Square service IDs — pulled from the live booking flow 2026-07-27
  // Single source of truth for every per-service deep link on the site. When
  // Tyler adds or renames a service, change it here and nowhere else.
  var BOOKING_SERVICES = {
    "sunset-cruise":    "2GCHZUUXDBXDADLTLHX5XR7U",
    "wakesurf-lessons": "MKF6CHXQS3PLSFWPWVUL2VKL",
    "nautique-g23":     "Y3MCSQ34BSVP7OTGUKDKNCFJ",
    "nautique-230":     "7FCTFN2VHKU4O6FQPZ6DNPGD",
    "paragon":          "4S6GRHDUOMYEW3HWSEMZFKE3",
    "centurion":        "ZWIP5M7DXA3H3HKOOP3RG2BC"
  };

  // True-alpha logo sitting directly on the background — no chip.
  // Nav and footer are both a solid --navy (#0B1A2E), never a photo or a
  // scrim, so the blue lockup lands on a known, fixed colour: dc-logo-blue.png
  // is 100% #147EFE, which is 4.53:1 on --navy — over the 3:1 AA floor for
  // graphics. Tyler asked for the blue mark on dark 2026-07-27.
  // dc-logo-white.png and dc-logo-navy.png stay in assets/ for light-background
  // or single-colour uses; the blue mark must NOT go on a light background
  // (#147EFE on #fff is only 3.86:1 and drops under 3:1 on --surface-alt).
  var LOGO =
    '<img class="brand__logo" src="assets/dc-logo-blue.png" alt="Dream Charters ATX" width="541" height="293">';

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
          '<a class="btn btn-primary" href="' + BOOKING_URL + '"' + BOOKING_ATTRS + ">Book Now</a>" +
          '<button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        "</div>" +
      "</div>" +
      '<div class="nav__mobile" id="mobileMenu">' + navLinks(true) +
        '<a class="btn btn-primary btn-block" href="' + BOOKING_URL + '"' + BOOKING_ATTRS + ">Book Now</a>" +
        '<a class="btn btn-secondary btn-block" href="' + TEL_HREF + '">Call ' + PHONE_DISPLAY + "</a>" +
      "</div>" +
    "</header>";

  var footer =
    '<footer class="footer">' +
      '<div class="wrap footer__grid">' +
        '<div class="footer__brand">' +
          '<a class="brand" href="index.html" style="margin-bottom:12px">' + LOGO +
            '<span class="brand__name">Dream Charters<small>AUSTIN, TX</small></span></a>' +
          '<div class="footer__socials">' +
            '<a href="' + IG + '" aria-label="Instagram" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .46 1.4.86.4.4.66.8.86 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.2.6-.46 1-.86 1.4-.4.4-.8.66-1.4.86-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.2-1-.46-1.4-.86-.4-.4-.66-.8-.86-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.2-.6.46-1 .86-1.4.4-.4.8-.66 1.4-.86.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.5A6.3 6.3 0 1 0 18.3 12 6.3 6.3 0 0 0 12 5.7zm0 10.4A4.1 4.1 0 1 1 16.1 12 4.1 4.1 0 0 1 12 16.1zm6.5-10.6a1.47 1.47 0 1 0 1.47 1.47A1.47 1.47 0 0 0 18.5 5.5z"/></svg></a>' +
            '<a href="' + FB + '" aria-label="Facebook" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.1 8.5h-2V7.1c0-.6.4-.8.7-.8h1.3V3.7L13 3.7c-2.3 0-2.9 1.7-2.9 2.8v2H8.5v2.6h1.6V21h2.9v-7.9h2l.3-2.6z"/></svg></a>' +
            '<a href="' + TEL_HREF + '" aria-label="Call us at ' + PHONE_DISPLAY + '"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' + PHONE_ICON + '</svg></a>' +
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
          '<a class="btn btn-primary" style="margin-top:14px" href="' + BOOKING_URL + '"' + BOOKING_ATTRS + ">Book Your Charter</a>" +
        "</div>" +
      "</div>" +
      '<div class="wrap footer__bottom">' +
        "<span>© " + "2026 Dream Charters ATX · Demo site · " +
          '<a class="footer__policy" href="book.html#refund-policy">Cancellation &amp; Refund Policy</a></span>' +
        '<span><span class="stars" aria-hidden="true">★</span> '+
        '<span class="sr-only">Rated </span>4.9<span class="sr-only"> out of 5 stars</span> · 74 Google reviews</span>' +
      "</div>" +
    "</footer>";

  var fab =
    '<a class="text-fab" href="' + TEL_HREF + '" aria-label="Call us at ' + PHONE_DISPLAY + '">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + PHONE_ICON + '</svg>' +
      '<span class="text-fab__label">Call us ' + PHONE_DISPLAY + "</span>" +
    "</a>";

  // Per-service booking deep links.
  // A card opts in with data-book="<key>" and ships the generic /services URL as
  // its href, so the link still works with JS off — this only upgrades it to the
  // exact service. An unknown key is left on the generic list rather than being
  // pointed at a URL that would 404.
  function applyBookingLinks() {
    var nodes = document.querySelectorAll("[data-book]");
    for (var i = 0; i < nodes.length; i++) {
      var id = BOOKING_SERVICES[nodes[i].getAttribute("data-book")];
      if (!id) continue;
      nodes[i].setAttribute("href", BOOKING_URL + "/" + id);
      nodes[i].setAttribute("target", "_blank");
      nodes[i].setAttribute("rel", "noopener noreferrer");
    }
  }
  applyBookingLinks();

  // Embedded booking widget on book.html. The iframe src and its fallback link
  // both come from BOOKING_URL so the URL is never copied into the markup.
  function applyBookingEmbed() {
    var frames = document.querySelectorAll("iframe[data-book-embed]");
    for (var i = 0; i < frames.length; i++) frames[i].setAttribute("src", BOOKING_URL);
    var links = document.querySelectorAll("[data-book-link]");
    for (var j = 0; j < links.length; j++) {
      links[j].setAttribute("href", BOOKING_URL);
      links[j].setAttribute("target", "_blank");
      links[j].setAttribute("rel", "noopener noreferrer");
    }
  }
  applyBookingEmbed();

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
