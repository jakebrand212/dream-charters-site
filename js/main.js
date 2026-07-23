/* Page interactions: FAQ accordion, review filter chips, demo form handling. */
(function () {
  // ---- FAQ accordion ----
  document.querySelectorAll(".acc__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc__item");
      item.classList.toggle("open");
      var expanded = item.classList.contains("open");
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  });

  // ---- Review filter chips ----
  var chips = document.querySelectorAll(".chip[data-filter]");
  var reviews = document.querySelectorAll("[data-tags]");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter");
        reviews.forEach(function (r) {
          var tags = r.getAttribute("data-tags") || "";
          r.style.display = (f === "all" || tags.indexOf(f) !== -1) ? "" : "none";
        });
      });
    });
  }

  // ---- Demo form (no backend) ----
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = form.querySelector(".form-success");
      if (ok) {
        ok.hidden = false;
        ok.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });
  });

  // ---- Scroll reveal (cards & tiles fade up as they enter the viewport) ----
  // JS applies the hidden state, so content stays visible with JS disabled.
  var canReveal = "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canReveal) {
    var targets = document.querySelectorAll(
      ".card, .feature, .review, .captain, .occasion, .gallery figure, .spec"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 60 + "ms"; // gentle stagger per row
      io.observe(el);
    });
  }

  // ---- Nav: deepen shadow once the page is scrolled ----
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("nav--scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
