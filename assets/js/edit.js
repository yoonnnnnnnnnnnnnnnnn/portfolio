/* =========================================================================
   편집 모드 — 주소 끝에 #edit 을 붙였을 때만 켜집니다.
   빈 카드를 눌러 링크를 넣고, [data.js 내려받기] 로 영구 저장하세요.
   ========================================================================= */
(function () {
  "use strict";

  var P = window.Portfolio;
  if (!P) return;

  var bar = null;
  var active = false;

  /* ── 켜기 / 끄기 ───────────────────────────────────────────── */
  function isEditHash() {
    return location.hash === "#edit" || /(\?|&)edit(=|$)/.test(location.search);
  }

  function enable() {
    if (active) return;
    active = true;
    document.body.classList.add("is-edit");
    buildBar();
  }
  function disable() {
    active = false;
    document.body.classList.remove("is-edit");
    if (bar) { bar.remove(); bar = null; }
  }

  /* ── 하단 편집 바 ──────────────────────────────────────────── */
  function buildBar() {
    bar = document.createElement("div");
    bar.className = "editbar";
    bar.innerHTML =
      '<span>편집 모드 — 카드를 눌러 링크를 넣으세요</span>' +
      '<button type="button" data-act="download">data.js 내려받기</button>' +
      '<button type="button" data-act="copy">코드 복사</button>' +
      '<button type="button" class="ghost" data-act="reset">초기화</button>' +
      '<button type="button" class="ghost" data-act="off">끄기</button>';
    document.body.appendChild(bar);

    bar.addEventListener("click", function (e) {
      var act = e.target.getAttribute && e.target.getAttribute("data-act");
      if (act === "download") downloadDataFile();
      else if (act === "copy") copyCode();
      else if (act === "reset") resetAll();
      else if (act === "off") { history.replaceState(null, "", location.pathname); disable(); }
    });
  }

  /* ── 카드 클릭 → 편집창 ────────────────────────────────────── */
  document.addEventListener("click", function (e) {
    if (!active) return;
    var slot = e.target.closest ? e.target.closest("[data-slot]") : null;
    if (!slot) return;
    e.preventDefault();
    e.stopPropagation();
    openDialog(slot.getAttribute("data-slot"));
  }, true);

  function openDialog(path) {
    var isBrand = path.indexOf("brand.") === 0;
    var item = P.getByPath(path) || {};

    var dlg = document.createElement("div");
    dlg.className = "editdlg";
    dlg.innerHTML =
      '<div class="editdlg__bd" data-x></div>' +
      '<div class="editdlg__box">' +
        "<h3>" + (isBrand ? "브랜드 프로젝트" : "콘텐츠 링크") + "</h3>" +
        '<label>링크 (유튜브 / 인스타그램 주소)</label>' +
        '<input id="f-url" placeholder="https://www.youtube.com/watch?v=..." value="' + attr(item.url) + '">' +
        (isBrand
          ? '<label>제목</label><input id="f-label" placeholder="01 BRAND" value="' + attr(item.label) + '">' +
            '<label>부제</label><input id="f-sub" placeholder="BX / BI" value="' + attr(item.sub) + '">'
          : '<label>제목 (선택)</label><input id="f-title" value="' + attr(item.title) + '">' +
            '<label>태그 (선택, 쉼표로 구분)</label><input id="f-tags" placeholder="부동산, 부산고급빌라" value="' +
              attr(item.tags ? item.tags.join(", ") : "") + '">' +
            '<label>날짜 (선택)</label><input id="f-date" placeholder="2024.07.07" value="' + attr(item.date) + '">') +
        '<label>썸네일 이미지 경로 (선택 · 인스타는 직접 넣어야 보입니다)</label>' +
        '<input id="f-thumb" placeholder="assets/img/thumb-1.jpg" value="' + attr(item.thumb) + '">' +
        '<div class="editdlg__row">' +
          '<button type="button" class="cancel" data-x>취소</button>' +
          '<button type="button" class="del" data-del>비우기</button>' +
          '<button type="button" class="save" data-save>저장</button>' +
        "</div>" +
        '<p class="editdlg__hint">유튜브 주소만 넣으면 썸네일은 자동으로 붙습니다.<br>' +
        "저장하면 이 브라우저에 임시 보관되고, 아래 [data.js 내려받기] 로 영구 저장할 수 있어요.</p>" +
      "</div>";
    document.body.appendChild(dlg);

    var urlInput = dlg.querySelector("#f-url");
    urlInput.focus();

    dlg.addEventListener("click", function (e) {
      var t = e.target;
      if (t.hasAttribute("data-x")) { dlg.remove(); return; }
      if (t.hasAttribute("data-del")) { save(true); return; }
      if (t.hasAttribute("data-save")) { save(false); }
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "Escape") dlg.remove();
      if (e.key === "Enter" && e.target.tagName === "INPUT") save(false);
    });

    function val(id) {
      var n = dlg.querySelector(id);
      return n ? n.value.trim() : "";
    }

    function save(clearIt) {
      var next;
      if (clearIt) {
        next = isBrand
          ? { label: item.label || "", sub: item.sub || "", url: "", thumb: "" }
          : { url: "", title: "", tags: [], date: "", thumb: "" };
      } else if (isBrand) {
        next = { label: val("#f-label"), sub: val("#f-sub"), url: val("#f-url"), thumb: val("#f-thumb") };
      } else {
        var tags = val("#f-tags")
          .split(",")
          .map(function (s) { return s.trim().replace(/^#/, ""); })
          .filter(Boolean);
        next = {
          url: val("#f-url"),
          title: val("#f-title"),
          tags: tags,
          date: val("#f-date"),
          thumb: val("#f-thumb")
        };
      }
      P.setByPath(path, next);
      persist();
      P.render();
      dlg.remove();
      toast(clearIt ? "비웠습니다" : "저장했습니다");
    }
  }

  function attr(v) {
    return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  /* ── 저장 / 초기화 ─────────────────────────────────────────── */
  function persist() {
    try {
      localStorage.setItem(P.STORE_KEY, JSON.stringify(P.getData()));
    } catch (e) {
      toast("브라우저에 저장하지 못했습니다");
    }
  }

  function resetAll() {
    if (!confirm("지금까지 넣은 링크를 모두 지우고 data.js 내용으로 되돌릴까요?")) return;
    try { localStorage.removeItem(P.STORE_KEY); } catch (e) {}
    P.setData(JSON.parse(JSON.stringify(P.original)));
    P.render();
    toast("초기화했습니다");
  }

  /* ── data.js 코드 만들기 ───────────────────────────────────── */
  var HEADER = [
    "/* =========================================================================",
    "   포트폴리오 콘텐츠 데이터  (편집 모드에서 자동 생성됨)",
    "   -------------------------------------------------------------------------",
    "   이 파일을 site/assets/js/data.js 위치에 덮어쓰면 영구 저장됩니다.",
    "   ========================================================================= */",
    "",
    "const PORTFOLIO_DATA = "
  ].join("\n");

  function buildCode() {
    return HEADER + JSON.stringify(P.getData(), null, 2) + ";\n";
  }

  function downloadDataFile() {
    var blob = new Blob([buildCode()], { type: "text/javascript;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.js";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast("data.js 를 내려받았습니다 → assets/js/ 에 덮어쓰세요");
  }

  function copyCode() {
    var code = buildCode();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        function () { toast("복사했습니다 → data.js 에 붙여넣으세요"); },
        function () { fallbackCopy(code); }
      );
    } else {
      fallbackCopy(code);
    }
  }

  function fallbackCopy(code) {
    var ta = document.createElement("textarea");
    ta.value = code;
    ta.style.cssText = "position:fixed;left:5vw;top:10vh;width:90vw;height:70vh;z-index:200;font-size:12px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    if (ok) { ta.remove(); toast("복사했습니다 → data.js 에 붙여넣으세요"); }
    else { toast("아래 내용을 직접 복사하세요 (닫으려면 ESC)"); ta.focus();
      ta.addEventListener("keydown", function (e) { if (e.key === "Escape") ta.remove(); });
    }
  }

  /* ── 토스트 ────────────────────────────────────────────────── */
  var toastTimer = null;
  function toast(msg) {
    var old = document.querySelector(".toast");
    if (old) old.remove();
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, 2600);
  }

  /* ── 시작 ──────────────────────────────────────────────────── */
  window.PortfolioEdit = { refresh: function () { /* 렌더 후 훅 (지금은 CSS 로 처리) */ } };

  if (isEditHash()) enable();
  window.addEventListener("hashchange", function () {
    if (isEditHash()) enable(); else disable();
  });
})();
