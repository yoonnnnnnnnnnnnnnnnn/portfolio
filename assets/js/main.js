/* =========================================================================
   포트폴리오 — 렌더링 / 재생 모달 / 캐러셀 / 네비게이션
   순수 자바스크립트 (라이브러리 없음)
   ========================================================================= */
(function () {
  "use strict";

  var STORE_KEY = "jhy_portfolio_v1";

  /* data.js 는 const 로 선언되어 window 에 붙지 않으므로 식별자로 직접 참조 */
  var SOURCE = (typeof PORTFOLIO_DATA !== "undefined") ? PORTFOLIO_DATA : {};

  /* ── 데이터 (data.js + 브라우저에 저장된 편집 내용) ─────────── */
  var data = clone(SOURCE);
  try {
    var saved = localStorage.getItem(STORE_KEY);
    if (saved) data = JSON.parse(saved);
  } catch (e) { /* 저장된 값이 깨졌으면 무시하고 data.js 사용 */ }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ── 경로로 값 읽기/쓰기 (편집 모드에서 사용) ──────────────── */
  function getByPath(path) {
    return path.split(".").reduce(function (o, k) {
      return o == null ? o : o[k];
    }, data);
  }
  function setByPath(path, value) {
    var keys = path.split(".");
    var last = keys.pop();
    var target = keys.reduce(function (o, k) { return o[k]; }, data);
    target[last] = value;
  }

  /* ── 링크 해석 ─────────────────────────────────────────────── */
  var YT = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  var IG = /instagram\.com\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/;

  function parseMedia(url) {
    if (!url) return null;
    url = String(url).trim();
    if (!url) return null;

    var m = url.match(YT);
    if (m) {
      var vertical = /\/shorts\//.test(url);
      return {
        type: "youtube",
        id: m[1],
        vertical: vertical,
        href: "https://www.youtube.com/watch?v=" + m[1],
        embed: "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0&modestbranding=1",
        thumb: "https://i.ytimg.com/vi/" + m[1] + "/maxresdefault.jpg",
        /* 고화질이 없는 영상이 있어서 차례로 내려갑니다 */
        thumbAlt: [
          "https://i.ytimg.com/vi/" + m[1] + "/sddefault.jpg",
          "https://i.ytimg.com/vi/" + m[1] + "/hqdefault.jpg"
        ]
      };
    }

    m = url.match(IG);
    if (m) {
      var kind = m[1] === "reels" ? "reel" : m[1];
      return {
        type: "instagram",
        id: m[2],
        vertical: true,
        href: "https://www.instagram.com/" + kind + "/" + m[2] + "/",
        embed: "https://www.instagram.com/" + kind + "/" + m[2] + "/embed/captioned/",
        thumb: "",
        thumbAlt: []
      };
    }

    return { type: "link", id: "", vertical: false, href: url, embed: "", thumb: "", thumbAlt: [] };
  }

  /* ── DOM 헬퍼 ──────────────────────────────────────────────── */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var PLAY_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  /* ── 카드 만들기 ───────────────────────────────────────────── */
  /* kind: "h"(가로) | "v"(세로) */
  function makeCard(item, path, kind) {
    item = item || {};
    var media = parseMedia(item.url);
    var vertical = kind === "v";
    var cls = "card reveal " + (vertical ? "card--v" : "card--h");

    if (!media) {
      var empty = el("div", cls + " card--empty");
      empty.setAttribute("data-slot", path);
      return empty;
    }

    var a = el("a", cls + " card--link");
    a.href = media.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("data-slot", path);
    a.setAttribute("data-filled", "1");

    var thumbSrc = item.thumb || media.thumb;
    var thumb = el("div", "card__thumb");

    if (thumbSrc) {
      var img = el("img");
      img.src = thumbSrc;
      img.alt = item.title || "콘텐츠 썸네일";
      img.loading = "lazy";
      if (!item.thumb && media.thumbAlt && media.thumbAlt.length) {
        /* 유튜브는 고화질 썸네일이 없을 때 404 대신 120x90 회색 이미지를
           돌려주기 때문에, 크기로 판별해서 다음 후보로 넘어갑니다. */
        var alts = media.thumbAlt.slice();
        var nextThumb = function () {
          if (alts.length) img.src = alts.shift();
          else { img.onerror = null; img.onload = null; }
        };
        img.onerror = nextThumb;
        img.onload = function () {
          if (img.naturalWidth <= 120 && alts.length) nextThumb();
          else { img.onload = null; img.onerror = null; }
        };
      }
      thumb.appendChild(img);
    } else if (media.type === "instagram") {
      thumb.appendChild(el("div", "card__ig",
        '<svg viewBox="0 0 24 24" style="width:38%;margin:auto;opacity:.35" aria-hidden="true">' +
        '<path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1018.6 12 6.6 6.6 0 0012 5.4zm0 10.9A4.3 4.3 0 1116.3 12 4.3 4.3 0 0112 16.3zm6.9-11.1a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z"/></svg>'));
      thumb.style.display = "grid";
    }

    var play = el("div", "card__play", PLAY_ICON);
    thumb.appendChild(play);

    /* 인스타처럼 썸네일 왼쪽 아래에 조회수 표시 */
    if (item.views) {
      thumb.appendChild(el("span", "card__views",
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
        "<b>" + esc(item.views) + "</b>"));
    }
    a.appendChild(thumb);

    var hasText = item.title || item.role || (item.tags && item.tags.length) || item.date;
    if (hasText || !vertical) {
      var body = el("div", "card__body");
      /* 참여 범위 표시 (예: "전체 20강 중 6강 편집") */
      if (item.role) body.appendChild(el("p", "card__role", esc(item.role)));
      if (item.title) body.appendChild(el("p", "card__title", esc(item.title)));
      if (item.tags && item.tags.length) {
        body.appendChild(el("p", "card__tags",
          item.tags.map(function (t) {
            t = String(t).trim();
            return "<span>" + esc(t.charAt(0) === "#" ? t : "#" + t) + "</span>";
          }).join("")));
      }
      if (item.date) body.appendChild(el("p", "card__date", esc(item.date)));
      a.appendChild(body);
    }

    a.addEventListener("click", function (ev) {
      if (document.body.classList.contains("is-edit")) return; // 편집 모드에서는 편집창
      if (media.type === "link") return;                        // 일반 링크는 새 탭
      ev.preventDefault();
      openModal(media, item.title);
    });

    return a;
  }

  /* ── 가로 스크롤 줄 (무한 순환) ────────────────────────────── */
  function makeRow(items, pathPrefix, kind) {
    var wrap = el("div", "row-wrap");
    var row = el("div", "row" + (kind === "v" ? " row--v" : "") + (kind === "ig" ? " row--ig" : ""));
    var cardKind = (kind === "v" || kind === "ig") ? "v" : "h";

    var list = items || [];
    var loop = list.length > 1;
    var sets = loop ? 3 : 1;   /* 앞뒤로 복제해서 끊김 없이 돌아가게 */

    for (var s = 0; s < sets; s++) {
      /* eslint-disable no-loop-func */
      (function (setIndex) {
        list.forEach(function (item, i) {
          var card = makeCard(item, pathPrefix + "." + i, cardKind);
          if (setIndex !== 1) {              /* 가운데 세트만 원본으로 취급 */
            card.setAttribute("aria-hidden", "true");
            if (card.tagName === "A") card.tabIndex = -1;
          }
          row.appendChild(card);
        });
      })(s);
    }

    var prev = el("button", "row-nav row-nav--prev",
      '<svg viewBox="0 0 24 24"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"/></svg>');
    var next = el("button", "row-nav row-nav--next",
      '<svg viewBox="0 0 24 24"><path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z"/></svg>');
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "이전");
    next.setAttribute("aria-label", "다음");

    /* ── 무한 순환 로직 ──────────────────────────────────────
       카드 한 세트 길이(period)만큼 앞으로 밀어놓고 시작합니다.
       그래서 처음부터 왼쪽에 "이전(마지막) 카드"가 걸쳐 보입니다.
       경계에 닿으면 티 안 나게 한 세트만큼 되돌립니다.            */
    var period = 0;
    var maxScroll = 0;
    var animating = false;
    var settleTimer = null;

    function measure() {
      maxScroll = row.scrollWidth - row.clientWidth;
      if (!loop) { period = 0; return; }
      var kids = row.children;
      if (kids.length < list.length * 2) { period = 0; return; }
      period = kids[list.length].offsetLeft - kids[0].offsetLeft;
    }

    function jump(delta) {
      var prevBehavior = row.style.scrollBehavior;
      row.style.scrollBehavior = "auto";
      row.scrollLeft += delta;
      row.style.scrollBehavior = prevBehavior;
    }

    function anchor() {
      measure();
      if (!period) return;
      var prevBehavior = row.style.scrollBehavior;
      row.style.scrollBehavior = "auto";
      row.scrollLeft = period;
      row.style.scrollBehavior = prevBehavior;
    }

    function keepInLoop() {
      if (!period || animating) return;
      var sl = row.scrollLeft;
      if (sl < period * 0.5) jump(period);
      else if (sl > period * 1.5) jump(-period);
    }

    /* 스크롤이 "멈춘 뒤"에만 위치를 되돌립니다.
       움직이는 도중에 되돌리면 관성 스크롤과 부딪혀 화면이 떨립니다. */
    function onScroll() {
      if (!period) return;
      var sl = row.scrollLeft;
      if (sl <= 0 || sl >= maxScroll) { keepInLoop(); return; }  // 끝에 닿았을 때만 즉시
      clearTimeout(settleTimer);
      settleTimer = setTimeout(keepInLoop, 160);
    }

    function step(dir) {
      var card = row.querySelector(".card");
      var gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      var amount = card ? (card.offsetWidth + gap) * 2 : row.clientWidth * 0.8;
      animating = true;
      row.scrollTo({ left: row.scrollLeft + dir * amount, behavior: "smooth" });
      setTimeout(function () { animating = false; measure(); keepInLoop(); }, 560);
    }
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });

    /* 카드가 화면을 넘칠 때만 화살표를 보여줍니다 */
    function sync() {
      var scrollable = row.scrollWidth > row.clientWidth + 4;
      prev.disabled = next.disabled = !scrollable;
    }
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { measure(); sync(); });

    /* 한 세트가 화면에 다 들어오면 순환이 필요 없으므로 복제본을 지웁니다.
       (영상이 2개뿐인 채널에서 같은 카드가 반복돼 보이는 걸 방지)          */
    function init() {
      measure();
      if (loop && period && period <= row.clientWidth + 4) {
        var i;
        for (i = 0; i < list.length; i++) row.removeChild(row.firstChild);   // 앞 복제본
        while (row.children.length > list.length) row.removeChild(row.lastChild); // 뒤 복제본
        loop = false;
        period = 0;
        row.scrollLeft = 0;
        measure();
      } else {
        anchor();
      }
      sync();
    }
    requestAnimationFrame(init);
    setTimeout(init, 300);

    wrap.appendChild(row);
    wrap.appendChild(prev);
    wrap.appendChild(next);
    return wrap;
  }

  /* ── 채널 헤더 ─────────────────────────────────────────────── */
  function makeChannelHead(ch) {
    var head = el("div", "channel__head reveal");
    var logo = el("div", "channel__logo");
    if (ch.logo) {
      var img = el("img");
      img.src = ch.logo; img.alt = ch.name || ""; img.loading = "lazy";
      logo.appendChild(img);
    }
    head.appendChild(logo);

    var box = el("div");
    var nameHtml = esc(ch.name || "");
    if (ch.link) nameHtml = '<a href="' + esc(ch.link) + '" target="_blank" rel="noopener">' + nameHtml + "</a>";
    box.appendChild(el("p", "channel__name", nameHtml));
    if (ch.desc) box.appendChild(el("p", "channel__desc", esc(ch.desc)));
    head.appendChild(box);
    return head;
  }

  function wrapEl(inner, wide) {
    var w = el("div", "wrap" + (wide ? " wrap--wide" : ""));
    w.appendChild(inner);
    return w;
  }

  /* ── 전체 렌더 ─────────────────────────────────────────────── */
  function render() {
    /* LONG-FORM 대표작 */
    var featured = document.getElementById("lf-featured");
    featured.innerHTML = "";
    (data.longform_featured || []).forEach(function (item, i) {
      featured.appendChild(makeCard(item, "longform_featured." + i, "h"));
    });

    /* LONG-FORM 채널별 */
    var channels = document.getElementById("lf-channels");
    channels.innerHTML = "";
    (data.channels || []).forEach(function (ch, i) {
      var block = el("section", "channel");
      block.appendChild(wrapEl(makeChannelHead(ch)));
      block.appendChild(makeRow(ch.items, "channels." + i + ".items", "h"));
      channels.appendChild(block);
    });

    /* ONLINE COURSE (여러 플랫폼) */
    var course = document.getElementById("lf-course");
    course.innerHTML = "";
    var courseList = data.online_courses || (data.online_course ? [data.online_course] : []);
    var coursePath = data.online_courses ? "online_courses" : "online_course";
    courseList.forEach(function (c, i) {
      var cb = el("section", "channel");
      cb.appendChild(wrapEl(makeChannelHead(c)));
      var path = data.online_courses ? coursePath + "." + i + ".items" : "online_course.items";
      cb.appendChild(makeRow(c.items, path, "h"));
      course.appendChild(cb);
    });

    /* SHORT-FORM */
    var sf = document.getElementById("sf-row");
    sf.innerHTML = "";
    sf.appendChild(makeRow(data.shortform, "shortform", "v"));

    /* SELF — 유튜브 */
    var ytHead = document.getElementById("self-yt-head");
    ytHead.innerHTML = "";
    if (data.self_youtube) {
      ytHead.appendChild(makeSelfHead(data.self_youtube));
      var ytRow = document.getElementById("self-yt-row");
      ytRow.innerHTML = "";
      ytRow.appendChild(makeRow(data.self_youtube.items, "self_youtube.items", "h"));

      /* 세로 영상(릴스 · 쇼츠) 줄 */
      var ytReels = document.getElementById("self-yt-reels");
      ytReels.innerHTML = "";
      ytReels.appendChild(makeRow(data.self_youtube.reels, "self_youtube.reels", "v"));
    }

    /* SELF — 옴마 인스타그램 */
    var ohmyIgHead = document.getElementById("self-ohmy-ig-head");
    if (ohmyIgHead && data.self_instagram_ohmy) {
      ohmyIgHead.innerHTML = "";
      ohmyIgHead.appendChild(makeSelfHead(data.self_instagram_ohmy));
      var ohmyIgRow = document.getElementById("self-ohmy-ig-row");
      ohmyIgRow.innerHTML = "";
      ohmyIgRow.appendChild(makeRow(data.self_instagram_ohmy.items, "self_instagram_ohmy.items", "ig"));
    }

    /* SELF — 인스타그램 */
    var igHead = document.getElementById("self-ig-head");
    igHead.innerHTML = "";
    if (data.self_instagram) {
      igHead.appendChild(makeSelfHead(data.self_instagram));
      var igRow = document.getElementById("self-ig-row");
      igRow.innerHTML = "";
      igRow.appendChild(makeRow(data.self_instagram.items, "self_instagram.items", "ig"));
    }

    /* BRAND */
    var brand = document.getElementById("brand-grid");
    brand.innerHTML = "";
    (data.brand || []).forEach(function (b, i) {
      brand.appendChild(makeBrandItem(b, "brand." + i));
    });

    observeReveal();
    if (window.PortfolioEdit) window.PortfolioEdit.refresh();
  }

  function makeSelfHead(ch) {
    var frag = document.createDocumentFragment();

    /* self_youtube / self_instagram 은 name 대신 handle 을 씁니다 */
    var head = { name: ch.name || ch.handle, desc: ch.desc, logo: ch.logo, link: ch.link };

    var left = el("div", "self__left reveal");
    left.appendChild(makeChannelHead(head));

    var ul = null;
    if (ch.stats && ch.stats.length) {
      ul = el("ul", "self__stats reveal");
      ch.stats.forEach(function (s) {
        ul.appendChild(el("li", "",
          '<span class="label">' + esc(s.label) + "</span>" +
          '<span class="value">' + esc(s.value) + "</span>"));
      });
    }

    /* 메모가 있으면 통계는 채널명 아래(왼쪽), 없으면 오른쪽에 배치 */
    if (ul && ch.note) left.appendChild(ul);
    frag.appendChild(left);
    if (ul && !ch.note) frag.appendChild(ul);

    if (ch.note) {
      frag.appendChild(el("p", "self__note reveal", esc(ch.note).replace(/\n/g, "<br>")));
    }
    return frag;
  }

  function makeBrandItem(b, path) {
    var node = b.url ? el("a", "brand-item reveal") : el("div", "brand-item reveal");
    if (b.url) { node.href = b.url; node.target = "_blank"; node.rel = "noopener"; }
    node.setAttribute("data-slot", path);
    if (b.url) node.setAttribute("data-filled", "1");

    var box = el("div", "brand-item__box");
    if (b.thumb) {
      var img = el("img");
      img.src = b.thumb; img.alt = b.label || "브랜드 프로젝트"; img.loading = "lazy";
      box.appendChild(img);
    }
    node.appendChild(box);
    node.appendChild(el("p", "brand-item__label",
      "<b>" + esc(b.label || "") + "</b> <span>" + esc(b.sub || "") + "</span>"));
    return node;
  }

  /* ── 재생 모달 ─────────────────────────────────────────────── */
  var modal = document.getElementById("modal");
  var modalFrame = document.getElementById("modal-frame");
  var modalCaption = document.getElementById("modal-caption");
  var modalBox = modal.querySelector(".modal__box");
  var lastFocus = null;

  function openModal(media, title) {
    lastFocus = document.activeElement;
    modalFrame.innerHTML = "";
    modalBox.classList.toggle("is-vertical", !!media.vertical);

    var iframe = document.createElement("iframe");
    iframe.src = media.embed;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.setAttribute("scrolling", "no");
    iframe.title = title || "콘텐츠";
    modalFrame.appendChild(iframe);

    var label = media.type === "instagram" ? "인스타그램에서 보기" : "유튜브에서 보기";
    modalCaption.innerHTML =
      (title ? esc(title) + " · " : "") +
      '<a href="' + esc(media.href) + '" target="_blank" rel="noopener">' + label + "</a>";

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    modalFrame.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ── 스크롤 등장 애니메이션 ────────────────────────────────── */
  var revealObserver = null;
  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var t = entry.target;
        var sibs = Array.prototype.slice.call(t.parentNode.children).indexOf(t);
        t.style.transitionDelay = Math.min(sibs, 5) * 60 + "ms";
        t.classList.add("is-in");
        revealObserver.unobserve(t);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  }
  function observeReveal() {
    var nodes = document.querySelectorAll(".reveal:not(.is-in)");
    if (!revealObserver) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add("is-in"); });
      return;
    }
    Array.prototype.forEach.call(nodes, function (n) { revealObserver.observe(n); });
  }

  /* ── 상단 네비게이션 ───────────────────────────────────────── */
  var topnav = document.getElementById("topnav");
  var navLinks = topnav.querySelectorAll("[data-nav]");

  window.addEventListener("scroll", function () {
    topnav.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.55);
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Array.prototype.forEach.call(navLinks, function (a) {
          a.classList.toggle("is-active", a.getAttribute("data-nav") === entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["about", "longform", "shortform", "self", "brand"].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ── 맨 위로 버튼 ──────────────────────────────────────────── */
  var topBtn = document.getElementById("topbtn");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      topBtn.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.8);
    }, { passive: true });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── 섹션 접기/펴기 (폴더) ─────────────────────────────────── */
  function fold(section, folded) {
    section.classList.toggle("is-folded", folded);
    var tab = section.querySelector(".tab");
    if (tab) tab.setAttribute("aria-expanded", folded ? "false" : "true");
  }

  Array.prototype.forEach.call(document.querySelectorAll(".section .tab"), function (tab) {
    tab.addEventListener("click", function () {
      var section = tab.closest(".section");
      var willFold = !section.classList.contains("is-folded");
      var before = section.getBoundingClientRect().top;
      fold(section, willFold);
      /* 접는 순간 탭이 화면 밖으로 밀려나지 않게 스크롤 보정 */
      requestAnimationFrame(function () {
        var after = section.getBoundingClientRect().top;
        if (Math.abs(after - before) > 1) window.scrollBy(0, after - before);
      });
    });
  });

  /* 접힌 섹션으로 이동하면 자동으로 펼칩니다 */
  Array.prototype.forEach.call(navLinks, function (a) {
    a.addEventListener("click", function () {
      var target = document.getElementById(a.getAttribute("data-nav"));
      if (target) fold(target, false);
    });
  });

  /* ── 외부 공개 API (편집 모드에서 사용) ────────────────────── */
  window.Portfolio = {
    render: render,
    getData: function () { return data; },
    setData: function (d) { data = d; },
    getByPath: getByPath,
    setByPath: setByPath,
    parseMedia: parseMedia,
    STORE_KEY: STORE_KEY,
    original: clone(SOURCE)
  };

  render();
})();
