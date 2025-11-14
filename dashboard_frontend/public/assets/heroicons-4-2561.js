(function(){
  'use strict';

  /**
   * PUBLIC_INTERFACE
   * renderHeroiconsScreen
   * Render Solid and Outline icon grids from data arrays with filtering support.
   */
  function renderHeroiconsScreen() {
    const { dataSolid, dataOutline } = getDataSets();

    // Initial render
    renderGrid('grid-solid', dataSolid, false);
    renderGrid('grid-outline', dataOutline, true);

    // Filtering behavior
    const input = document.getElementById('icon-filter');
    if (input) {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        filterRender(q, dataSolid, dataOutline);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          input.value = '';
          filterRender('', dataSolid, dataOutline);
          input.blur();
        }
      });
    }
  }

  /**
   * Build datasets; imagePath strictly under /assets/figmaimages/
   * Note: Where no imagePath is available, we still render the placeholder cell for consistent grid structure.
   */
  function getDataSets(){
    const dataSolid = [
      {name:'color-swatch'},
      {name:'credit-card'},
      {name:'cube-transparent'},
      {name:'cube'},
      {name:'currency-bangladeshi'},
      {name:'currency-dollar'},
      {name:'currency-euro'},
      {name:'currency-pound'},
      {name:'currency-rupee'},
      {name:'currency-yen'},

      {name:'cursor-click'},
      {name:'database'},
      {name:'desktop-computer'},
      {name:'device-mobile'},
      {name:'device-tablet'},
      {name:'document-add'},
      {name:'document-download'},
      {name:'document-duplicate', imagePath:'/assets/figmaimages/figma_image_4_2863_541_934.svg'},
      {name:'document-remove'},
      {name:'document-report'},

      {name:'document-search', imagePath:'/assets/figmaimages/figma_image_4_2866_541_942.svg'},
      {name:'document-text'},
      {name:'document'},
      {name:'dots-circle-horizontal'},
      {name:'dots-horizontal'},
      {name:'dots-vertical'},
      {name:'download', imagePath:'/assets/figmaimages/figma_image_4_2872_541_954.svg'},
      {name:'duplicate', imagePath:'/assets/figmaimages/figma_image_4_2873_541_956.svg'},
      {name:'emoji-happy'},
      {name:'emoji-sad'},

      {name:'exclamation-circle'},
      {name:'exclamation'},
      {name:'external-link'},
      {name:'eye-off', imagePath:'/assets/figmaimages/figma_image_4_2879_541_971.svg'},
      {name:'eye'},
      {name:'fast-forward'},
      {name:'film'},
      {name:'filter'},
      {name:'finger-print', imagePath:'/assets/figmaimages/figma_image_4_2884_541_983.svg'},
      {name:'fire'},

      {name:'flag'},
      {name:'folder-add'},
      {name:'folder-download'},
      {name:'folder-open', imagePath:'/assets/figmaimages/figma_image_4_2889_541_994.svg'},
      {name:'folder-remove'},
      {name:'folder'},
      {name:'gift'},
      {name:'globe-alt'},
      {name:'globe'},
      {name:'hand'},

      {name:'hashtag'},
      {name:'heart', imagePath:'/assets/figmaimages/figma_image_4_2897_541_1012.svg'},
      {name:'home'},
      {name:'identification'},
      {name:'inbox-in'},
      {name:'inbox'},
      {name:'information-circle'},
      {name:'key'},
      {name:'library'},
      {name:'light-bulb'},

      {name:'lightning-bolt', imagePath:'/assets/figmaimages/figma_image_4_2906_541_1031.svg'},
      {name:'link'},
      {name:'location-marker'},
      {name:'lock-closed'},
      {name:'lock-open'},
      {name:'login'},
      {name:'logout'},
      {name:'mail-open'},
      {name:'mail'},
      {name:'map'},

      {name:'menu-alt-1', imagePath:'/assets/figmaimages/figma_image_4_2916_541_1052.svg'},
      {name:'menu-alt-2'},
      {name:'menu-alt-3'},
      {name:'menu-alt-4', imagePath:'/assets/figmaimages/figma_image_4_2919_541_1058.svg'},
      {name:'menu'},
      {name:'microphone'},
      {name:'minus-circle'},
      {name:'minus'},
      {name:'moon'},
      {name:'music-note'},

      {name:'newspaper'},
      {name:'office-building'},
      {name:'paper-airplane'},
      {name:'paper-clip'},
      {name:'pause'},
      {name:'pencil-alt'},
      {name:'pencil'},
      {name:'phone-incoming'},
      {name:'phone-missed-call'},
      {name:'phone-outgoing'},

      {name:'phone'},
      {name:'photograph'},
      {name:'play'},
      {name:'plus-circle'},
      {name:'plus'},
      {name:'presentation-chart-bar'},
      {name:'presentation-chart-line'},
      {name:'printer'},
      {name:'puzzle'},
      {name:'qrcode'},

      {name:'question-mark-circle'},
      {name:'receipt-refund'},
      {name:'receipt-tax'},
      {name:'refresh'},
      {name:'reply'},
      {name:'rewind'},
      {name:'rss', imagePath:'/assets/figmaimages/figma_image_4_2952_541_1130.svg'},
      {name:'save-as', imagePath:'/assets/figmaimages/figma_image_4_2953_541_1134.svg'},
      {name:'save'},
      {name:'scale'},

      {name:'scissors'},
      {name:'search-circle'},
      {name:'search'},
      {name:'selector'},
      {name:'server'},
      {name:'share'},
      {name:'shield-check'},
      {name:'shield-exclamation'},
      {name:'shopping-bag'},
      {name:'shopping-cart', imagePath:'/assets/figmaimages/figma_image_4_2965_541_1160.svg'},

      {name:'sort-ascending'},
      {name:'sort-descending'},
      {name:'sparkles'},
      {name:'speakerphone'},
      {name:'star'},
      {name:'status-offline'},
      {name:'status-online', imagePath:'/assets/figmaimages/figma_image_4_2972_541_1174.svg'},
      {name:'stop'},
      {name:'sun'},
      {name:'support'},

      {name:'switch-horizontal'},
      {name:'switch-vertical'},
      {name:'table'},
      {name:'tag'},
      {name:'template'},
      {name:'terminal'},
      {name:'thumb-down'},
      {name:'thumb-up'},
      {name:'ticket'},
      {name:'translate'},

      {name:'trash'},
      {name:'trending-down'},
      {name:'trending-up'},
      {name:'truck'},
      {name:'upload'},
      {name:'user-add'},
      {name:'user-circle'},
      {name:'user-group'},
      {name:'user-remove'},
      {name:'user'},

      {name:'users'},
      {name:'variable'},
      {name:'video-camera'},
      {name:'view-boards'},
      {name:'view-grid-add'},
      {name:'view-grid'},
      {name:'view-list'},
      {name:'volume-off', imagePath:'/assets/figmaimages/figma_image_4_3003_541_1237.svg'},
      {name:'volume-up'},
      {name:'wifi'},

      {name:'x-circle'},
      {name:'x'},
      {name:'zoom-in'},
      {name:'zoom-out'},

      // Social (examples)
      {name:'FontAwesome/twitter'},
      {name:'FontAwesome/github'},
      {name:'FontAwesome/dribbble'},
      {name:'FontAwesome/facebook-f', imagePath:'/assets/figmaimages/figma_image_4_3015_37_70.svg'},
      {name:'FontAwesome/google'}
    ];

    // For outline, mirror set (in a real build, paths would differ to outline assets)
    const dataOutline = dataSolid.map(d => ({ name: d.name, imagePath: d.imagePath }));
    return { dataSolid, dataOutline };
  }

  /**
   * Create a single 20x20 icon cell with aria label; shows placeholder if no imagePath.
   * @param {{name: string, imagePath?: string}} item
   * @param {boolean} outline
   * @returns {HTMLElement}
   */
  function createCell(item, outline){
    const { name, imagePath } = item;
    const cell = document.createElement('button');
    cell.className = 'icon-cell' + (outline ? ' outline' : '');
    cell.type = 'button';
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-label', name);
    cell.title = name; // mouse users get a native tooltip

    const glyph = document.createElement('div');
    glyph.className = 'icon-img';

    if (imagePath) {
      // Use CSS background to avoid extra <img> nodes; browsers will cache aggressively.
      glyph.style.backgroundImage = `url('${imagePath}')`;
    }
    // else placeholder box

    cell.appendChild(glyph);
    return cell;
  }

  /**
   * Render grid into container by ID using the provided dataset.
   * Sets fixed column count for desktop; CSS reduces columns on narrow screens.
   */
  function renderGrid(containerId, data, outline){
    const root = document.getElementById(containerId);
    if (!root) return;
    // Force a desktop column count to align with 40px rhythm (20px cell + 20px gap).
    root.style.setProperty('--grid-columns', '14');
    root.innerHTML = ''; // clear any previous render
    const frag = document.createDocumentFragment();
    data.forEach(d => frag.appendChild(createCell(d, outline)));
    root.appendChild(frag);
  }

  /**
   * Filter and re-render both grids while preserving column rhythm.
   */
  function filterRender(query, solid, outline){
    const q = query.toLowerCase();
    const filteredSolid = q ? solid.filter(i => i.name.toLowerCase().includes(q)) : solid;
    const filteredOutline = q ? outline.filter(i => i.name.toLowerCase().includes(q)) : outline;

    renderGrid('grid-solid', filteredSolid, false);
    renderGrid('grid-outline', filteredOutline, true);
  }

  // Expose for tests/inspection
  window.__renderHeroiconsScreen = renderHeroiconsScreen;

  document.addEventListener('DOMContentLoaded', renderHeroiconsScreen);
})();
