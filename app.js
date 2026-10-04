/* ═══════════════════════════════════════════════════════════════
   BG8LXU · QSL Database — app.js
   时钟 / 复制地址 / 图片灯箱 / 滚动入场
   无依赖，直接以 <script src> 引入即可（含 file:// 本地打开）
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var pad = function (n) { return String(n).padStart(2, '0'); };

  /* ── 1. 时钟：UTC + 本地（业余无线电以 UTC 为准） ─────────── */
  function startClocks() {
    var utcEls = $$('[data-utc]');
    var locEls = $$('[data-local]');
    if (!utcEls.length && !locEls.length) return;

    function tick() {
      var d = new Date();
      var u = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
      var l = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
      utcEls.forEach(function (el) { el.textContent = u; });
      locEls.forEach(function (el) { el.textContent = l; });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── 2. 年份 ───────────────────────────────────────────────── */
  function stampYear() {
    var y = String(new Date().getFullYear());
    $$('[data-year]').forEach(function (el) { el.textContent = y; });
  }

  /* ── 3. 复制到剪贴板（含 file:// 回退） ────────────────────── */
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function bindCopy() {
    $$('[data-copy]').forEach(function (btn) {
      // 记录一次原始文案：按钮内可能同时含中文 + 英文子元素，
      // 若每次点击都从 textContent 取标签，还原时会不断叠加。
      if (!btn.dataset.label) btn.dataset.label = btn.textContent.trim();

      btn.addEventListener('click', function () {
        var src = $(btn.getAttribute('data-copy'));
        if (!src) return;
        var text = (src.textContent || '').trim();
        var status = btn.parentElement ? $('.copied', btn.parentElement) : null;
        var label = btn.dataset.label;

        copyText(text).then(function (ok) {
          btn.textContent = ok ? '✓ 已复制 Copied' : '× 复制失败 Copy failed';
          if (status) {
            status.textContent = ok ? '已复制到剪贴板 / Copied to clipboard' : '浏览器阻止了剪贴板访问 / Clipboard blocked';
            status.classList.add('on');
            setTimeout(function () { status.classList.remove('on'); }, 2600);
          }
          setTimeout(function () { btn.textContent = label; }, 2200);
        });
      });
    });
  }

  /* ── 4. 图片灯箱 ───────────────────────────────────────────── */
  function initLightbox() {
    var links = $$('[data-lightbox]');
    var box = $('#lightbox');
    if (!links.length || !box) return;

    var img = $('[data-lb-img]', box);
    var title = $('[data-lb-title]', box);
    var cap = $('[data-lb-cap]', box);
    var closeBtn = $('.lightbox__close', box);
    var lastFocus = null;

    function open(link) {
      lastFocus = document.activeElement;
      var thumb = $('img', link);
      img.src = link.getAttribute('href');
      img.alt = thumb ? (thumb.alt || '') : '';
      title.textContent = link.getAttribute('data-lightbox') || '';
      cap.textContent = link.getAttribute('data-caption') || '';
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      box.hidden = true;
      img.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (ev) {
        ev.preventDefault();
        open(link);
      });
    });

    box.addEventListener('click', function (ev) {
      if (ev.target === box || ev.target.classList.contains('lightbox__hint')) close();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !box.hidden) close();
    });
  }

  /* ── 5. 滚动入场 ───────────────────────────────────────────── */
  function initReveal() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets = $$('.sec, .card, .award, .factbar, .hero__art');
    if (reduced || !('IntersectionObserver' in window)) return;

    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── 6. 启动 ───────────────────────────────────────────────── */
  function boot() {
    startClocks();
    stampYear();
    bindCopy();
    initLightbox();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
