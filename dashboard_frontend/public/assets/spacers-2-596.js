/**
 * Spacers (2:596) – dynamic row generation for maintainability.
 * Renders rows to match Figma table with pixel-accurate heights and borders.
 */

(function(){
  'use strict';

  // PUBLIC_INTERFACE
  function initSpacersScreen() {
    /** Initialize spacers screen: generate rows, bind a11y, and ensure keyboard navigation. */
    const tbody = document.getElementById('spacer-rows');
    if (!tbody) return;

    // The sequence faithfully follows the Figma YAML ordering
    // Name column (Figma "Name"): '0', 'px', '0.5', '1', '1.5', ..., '96'
    // Size column (Figma "Size"): '0px','1px','0.125rem','0.25rem',...,'24rem'
    // Pixels column (Figma "Pixels"): '0px','1px','2px','4px',...,'384px'
    // Example column draws a blue bar with width matching the Pixels value (numeric)
    const rows = [
      { name:'Name', size:'Size', px:'Pixels', width:null, header:true }, // header handled in HTML; keep for clarity
      // Table rows per YAML alignment
      { name:'0', size:'0px', px:'0px', width:0 },
      { name:'px', size:'1px', px:'1px', width:1 },
      { name:'0.5', size:'0.125rem', px:'2px', width:2 },
      { name:'1', size:'0.25rem', px:'4px', width:4 },
      { name:'1.5', size:'0.375rem', px:'6px', width:6 },
      { name:'2', size:'0.5rem', px:'8px', width:8 },
      { name:'2.5', size:'0.625rem', px:'10px', width:10 },
      { name:'3', size:'0.75rem', px:'12px', width:12 },
      { name:'3.5', size:'0.875rem', px:'14px', width:14 },
      { name:'4', size:'1rem', px:'16px', width:16 },
      { name:'5', size:'1.25rem', px:'20px', width:20 },
      { name:'6', size:'1.5rem', px:'24px', width:24 },
      { name:'7', size:'1.75rem', px:'28px', width:28 },
      { name:'8', size:'2rem', px:'32px', width:32 },
      { name:'9', size:'2.25rem', px:'36px', width:36 },
      { name:'10', size:'2.5rem', px:'40px', width:40 },
      { name:'11', size:'2.75rem', px:'44px', width:44 },
      { name:'12', size:'3rem', px:'48px', width:48 },
      { name:'14', size:'3.5rem', px:'56px', width:56 },
      { name:'16', size:'4rem', px:'64px', width:64 },
      { name:'20', size:'5rem', px:'80px', width:80 },
      { name:'24', size:'6rem', px:'96px', width:96 },
      { name:'28', size:'7rem', px:'112px', width:112 },
      { name:'32', size:'8rem', px:'128px', width:128 },
      { name:'36', size:'9rem', px:'144px', width:144 },
      { name:'40', size:'10rem', px:'160px', width:160 },
      { name:'44', size:'11rem', px:'176px', width:176 },
      { name:'48', size:'12rem', px:'192px', width:192 },
      { name:'52', size:'13rem', px:'208px', width:208 },
      { name:'56', size:'14rem', px:'224px', width:224 },
      { name:'60', size:'15rem', px:'240px', width:240 },
      { name:'64', size:'16rem', px:'256px', width:256 },
      { name:'72', size:'18rem', px:'288px', width:288 },
      { name:'80', size:'20rem', px:'320px', width:320 },
      { name:'96', size:'24rem', px:'384px', width:384 },
    ];

    // Render only data rows (skip the header placeholder)
    rows.filter(r => !r.header).forEach((r, idx) => {
      const row = document.createElement('div');
      row.className = 'table__row';
      row.setAttribute('role', 'row');
      row.setAttribute('tabindex', '0');
      row.setAttribute('aria-rowindex', String(idx + 2)); // +2 accounting for header row

      // Name cell
      const c1 = document.createElement('div');
      c1.className = 'table__cell';
      c1.setAttribute('role', 'cell');
      c1.textContent = r.name;

      // Size (rem/px token)
      const c2 = document.createElement('div');
      c2.className = 'table__cell';
      c2.setAttribute('role', 'cell');
      c2.textContent = r.size;

      // Pixels
      const c3 = document.createElement('div');
      c3.className = 'table__cell';
      c3.setAttribute('role', 'cell');
      c3.textContent = r.px;

      // Example visual bar
      const c4 = document.createElement('div');
      c4.className = 'table__cell';
      c4.setAttribute('role', 'cell');

      const bar = document.createElement('div');
      bar.className = 'spacer-bar';
      bar.setAttribute('role', 'img');
      bar.setAttribute('aria-label', `Example spacer width ${r.px}`);

      // Clamp width to the Example column max (544px) to avoid overflow when zoomed
      const maxWidth = 544; // matches --col-4 css variable
      const w = Math.max(0, Math.min(typeof r.width === 'number' ? r.width : 0, maxWidth));
      bar.style.width = `${w}px`;

      c4.appendChild(bar);

      row.append(c1, c2, c3, c4);
      tbody.appendChild(row);
    });

    // Keyboard: left/right to scroll horizontally within the table region
    const region = document.querySelector('.table-wrap');
    if (region) {
      region.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          region.scrollBy({ left: 60, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          region.scrollBy({ left: -60, behavior: 'smooth' });
        }
      });
    }
  }

  // Expose for inspection/tests
  window.__initSpacersScreen = initSpacersScreen;

  document.addEventListener('DOMContentLoaded', initSpacersScreen);
})();
