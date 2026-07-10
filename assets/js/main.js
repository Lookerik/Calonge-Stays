/* =========================================================
   CALONGE STAYS — main.js (vanilla JS, no dependencies)
   ========================================================= */
(function(){
  "use strict";

  /* ---------- WhatsApp config ---------- */
  // Replace with the real WhatsApp number in international format, no + or spaces.
  var WHATSAPP_NUMBER = "33699734614";

  function buildWhatsAppLink(apartmentName){
    var lines = [
      "Hola.",
      "Estoy interesado en reservar uno de los apartamentos.",
      "Fechas:",
      "Número de personas:",
      "Apartamento: " + (apartmentName || ""),
      "¿Podrían informarme si está disponible?"
    ];
    var text = encodeURIComponent(lines.join("\n"));
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  }

  document.addEventListener("DOMContentLoaded", function(){

    /* ---------- Wire up every WhatsApp trigger ---------- */
    document.querySelectorAll("[data-whatsapp]").forEach(function(el){
      var apt = el.getAttribute("data-apartment") || "";
      el.setAttribute("href", buildWhatsAppLink(apt));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    /* ---------- Header scroll state ---------- */
    var header = document.querySelector(".site-header");
    function onScroll(){
      if(!header) return;
      if(window.scrollY > 30){ header.classList.add("is-scrolled"); }
      else { header.classList.remove("is-scrolled"); }
    }
    window.addEventListener("scroll", onScroll, {passive:true});
    onScroll();

    /* ---------- Mobile menu ---------- */
    var toggle = document.querySelector(".nav-toggle");
    var mobileMenu = document.querySelector(".mobile-menu");
    if(toggle && mobileMenu){
      toggle.addEventListener("click", function(){
        mobileMenu.classList.toggle("is-open");
        document.body.style.overflow = mobileMenu.classList.contains("is-open") ? "hidden" : "";
      });
      mobileMenu.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){
          mobileMenu.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      });
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if("IntersectionObserver" in window && revealEls.length){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, {threshold:0.15, rootMargin:"0px 0px -40px 0px"});
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add("is-visible"); });
    }

    /* ---------- Lazy-loaded images: simple fade-in once loaded ---------- */
    document.querySelectorAll('img[loading="lazy"]').forEach(function(img){
      if(img.complete){ img.classList.add("is-loaded"); }
      else {
        img.addEventListener("load", function(){ img.classList.add("is-loaded"); });
      }
    });

    /* ---------- Gallery filters (galeria.html) ---------- */
    var filterBtns = document.querySelectorAll(".filter-btn");
    var galleryItems = document.querySelectorAll(".gallery-item");
    if(filterBtns.length){
      filterBtns.forEach(function(btn){
        btn.addEventListener("click", function(){
          filterBtns.forEach(function(b){ b.classList.remove("active"); });
          btn.classList.add("active");
          var cat = btn.getAttribute("data-filter");
          galleryItems.forEach(function(item){
            var match = cat === "all" || item.getAttribute("data-category") === cat;
            item.style.display = match ? "" : "none";
          });
        });
      });
    }

    /* ---------- Lightbox ---------- */
    var lightbox = document.querySelector(".lightbox");
    if(lightbox && galleryItems.length){
      var lbImg = lightbox.querySelector("img");
      var lbCaption = lightbox.querySelector(".lightbox-caption");
      var visibleItems = function(){
        return Array.prototype.filter.call(galleryItems, function(item){
          return item.style.display !== "none";
        });
      };
      var currentIndex = 0;

      function openLightbox(index){
        var items = visibleItems();
        currentIndex = index;
        var item = items[currentIndex];
        if(!item) return;
        var img = item.querySelector("img");
        lbImg.src = img.getAttribute("src");
        lbImg.alt = img.getAttribute("alt") || "";
        lbCaption.textContent = item.getAttribute("data-caption") || img.getAttribute("alt") || "";
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
      function closeLightbox(){
        lightbox.classList.remove("is-open");
        document.body.style.overflow = "";
      }
      function showRelative(delta){
        var items = visibleItems();
        if(!items.length) return;
        currentIndex = (currentIndex + delta + items.length) % items.length;
        openLightbox(currentIndex);
      }

      galleryItems.forEach(function(item, idx){
        item.addEventListener("click", function(){
          var items = visibleItems();
          var realIndex = items.indexOf(item);
          openLightbox(realIndex >= 0 ? realIndex : 0);
        });
      });

      var closeBtn = lightbox.querySelector(".lightbox-close");
      var prevBtn = lightbox.querySelector(".lightbox-prev");
      var nextBtn = lightbox.querySelector(".lightbox-next");
      if(closeBtn) closeBtn.addEventListener("click", closeLightbox);
      if(prevBtn) prevBtn.addEventListener("click", function(){ showRelative(-1); });
      if(nextBtn) nextBtn.addEventListener("click", function(){ showRelative(1); });
      lightbox.addEventListener("click", function(e){
        if(e.target === lightbox){ closeLightbox(); }
      });
      document.addEventListener("keydown", function(e){
        if(!lightbox.classList.contains("is-open")) return;
        if(e.key === "Escape") closeLightbox();
        if(e.key === "ArrowLeft") showRelative(-1);
        if(e.key === "ArrowRight") showRelative(1);
      });
    }

    /* ---------- Contact form: build mailto on submit ---------- */
    var contactForm = document.querySelector("#contact-form");
    if(contactForm){
      contactForm.addEventListener("submit", function(e){
        e.preventDefault();
        var consent = contactForm.querySelector("#cf-consent");
        if(consent && !consent.checked){
          consent.focus();
          consent.reportValidity && consent.reportValidity();
          return;
        }
        var name = contactForm.querySelector("#cf-name").value.trim();
        var email = contactForm.querySelector("#cf-email").value.trim();
        var dates = contactForm.querySelector("#cf-dates").value.trim();
        var guests = contactForm.querySelector("#cf-guests").value.trim();
        var apt = contactForm.querySelector("#cf-apt").value;
        var message = contactForm.querySelector("#cf-message").value.trim();

        var subject = encodeURIComponent("Consulta de disponibilidad — " + (apt || "Apartamento"));
        var bodyLines = [
          "Nombre: " + name,
          "Email: " + email,
          "Fechas: " + dates,
          "Número de personas: " + guests,
          "Apartamento: " + apt,
          "",
          "Mensaje:",
          message
        ];
        var body = encodeURIComponent(bodyLines.join("\n"));
        // Replace with the real reservations inbox.
        var GMAIL_ADDRESS = "CordovaMarcos@gmail.com";
        window.location.href = "mailto:" + GMAIL_ADDRESS + "?subject=" + subject + "&body=" + body;
      });
    }

    /* ---------- Cookie consent banner ---------- */
    var cookieBanner = document.querySelector(".cookie-banner");
    if(cookieBanner){
      var CONSENT_KEY = "calongestays_cookie_consent";
      var stored = null;
      try { stored = localStorage.getItem(CONSENT_KEY); } catch(e){}
      if(!stored){
        setTimeout(function(){ cookieBanner.classList.add("is-visible"); }, 700);
      }
      var acceptBtn = cookieBanner.querySelector("[data-cookie-accept]");
      var rejectBtn = cookieBanner.querySelector("[data-cookie-reject]");
      function hideCookieBanner(value){
        try { localStorage.setItem(CONSENT_KEY, value); } catch(e){}
        cookieBanner.classList.remove("is-visible");
      }
      if(acceptBtn) acceptBtn.addEventListener("click", function(){ hideCookieBanner("accepted"); });
      if(rejectBtn) rejectBtn.addEventListener("click", function(){ hideCookieBanner("rejected"); });
    }

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll(".faq-item").forEach(function(item){
      var q = item.querySelector(".faq-q");
      if(!q) return;
      q.addEventListener("click", function(){
        var wasOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item.is-open").forEach(function(i){ i.classList.remove("is-open"); });
        if(!wasOpen){ item.classList.add("is-open"); }
      });
    });

    /* ---------- Footer year ---------- */
    var yearEl = document.querySelector("#footer-year");
    if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  });
})();
