/* =========================================================
   Custom Synergy Edge product page — Empire theme
   Handles: gallery, variant selection, qty, tabs, FAQ
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Gallery ---------- */
  function initGallery(root) {
    const thumbs = root.querySelectorAll('[data-synergy-thumbs] .synergy-gallery__thumb');
    const slides = root.querySelectorAll('[data-synergy-stage] .synergy-gallery__slide');
    if (!thumbs.length || !slides.length) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const idx = thumb.getAttribute('data-index');
        thumbs.forEach((t) => t.classList.remove('is-active'));
        slides.forEach((s) => s.classList.remove('is-active'));
        thumb.classList.add('is-active');
        const target = root.querySelector(
          `[data-synergy-stage] .synergy-gallery__slide[data-index="${idx}"]`
        );
        if (target) target.classList.add('is-active');
      });
    });
  }

  /* ---------- Variant selection ---------- */
  function initVariantPicker(section) {
    const form = section.querySelector('#synergy-product-form');
    if (!form) return;

    const select = form.querySelector('[data-synergy-variant-select]');
    const swatchGroups = section.querySelectorAll('[data-option-swatches]');
    if (!select) return;

    const options = section.querySelectorAll('.synergy-product__option');

    function updateSelection() {
      const selected = [];
      options.forEach((opt, idx) => {
        const active = opt.querySelector('.synergy-swatch.is-active');
        if (active) selected[idx] = active.getAttribute('data-option-value');
      });

      Array.from(select.options).forEach((opt) => {
        const title = opt.textContent.trim();
        const parts = title.split(' / ');
        const matches = selected.every((val, i) => parts[i] === val);
        if (matches) {
          select.value = opt.value;
        }
      });

      // Update labels
      options.forEach((opt, idx) => {
        const label = opt.querySelector('.synergy-product__option-value');
        if (label && selected[idx]) label.textContent = selected[idx];
      });

      // Update price
      const atc = form.querySelector('[data-synergy-atc]');
      const priceEl = section.querySelector('.synergy-product__price-current');
      const selectedOpt = select.options[select.selectedIndex];
      if (selectedOpt && priceEl) {
        const price = selectedOpt.getAttribute('data-price');
        if (price) priceEl.textContent = price;
      }
      if (selectedOpt && atc) {
        const available = selectedOpt.getAttribute('data-available') === 'true';
        atc.disabled = !available;
        const atcText = atc.querySelector('.synergy-product__atc-text');
        if (atcText) atcText.textContent = available ? 'ADD TO CART' : 'SOLD OUT';
      }
    }

    swatchGroups.forEach((group) => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('.synergy-swatch');
        if (!btn) return;
        e.preventDefault();
        const siblings = group.querySelectorAll('.synergy-swatch');
        siblings.forEach((s) => s.classList.remove('is-active'));
        btn.classList.add('is-active');
        updateSelection();
      });
    });
  }

  /* ---------- Quantity input ---------- */
  function initQty(section) {
    const field = section.querySelector('[data-synergy-qty]');
    if (!field) return;
    const buttons = section.querySelectorAll('[data-qty-action]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-qty-action');
        const current = parseInt(field.value, 10) || 1;
        field.value = action === 'increment' ? current + 1 : Math.max(1, current - 1);
        field.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs(section) {
    const tabContainer = section.querySelector('[data-synergy-tabs]');
    if (!tabContainer) return;
    const buttons = tabContainer.querySelectorAll('.synergy-tabs__btn');
    const panels = section.querySelectorAll('[data-tab-panel]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-target');
        buttons.forEach((b) => b.classList.remove('is-active'));
        panels.forEach((p) => p.classList.remove('is-active'));
        btn.classList.add('is-active');
        const panel = section.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  /* ---------- Init on DOM ready ---------- */
  function init() {
    document.querySelectorAll('[data-section-type="main-product-synergy"]').forEach((section) => {
      initGallery(section);
      initVariantPicker(section);
      initQty(section);
    });
    document.querySelectorAll('[data-section-type="product-description-features"]').forEach(initTabs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on Shopify theme editor section load
  if (typeof Shopify !== 'undefined' && Shopify.designMode) {
    document.addEventListener('shopify:section:load', init);
  }
})();
