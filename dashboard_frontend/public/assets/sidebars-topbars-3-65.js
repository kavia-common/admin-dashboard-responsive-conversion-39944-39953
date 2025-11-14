(function(){
  function toggleGroup(key){
    if(key === 'sales'){
      const group = document.querySelector('[data-accordion="sales"]');
      const header = group.querySelector('[data-toggle="sales"]');
      const submenu = group.querySelector('.submenu');
      const expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!expanded));
      group.classList.toggle('open', !expanded);
      submenu.style.display = expanded ? 'none' : 'flex';
      // swap chevron up/down if needed (we use static up icon per Figma)
    }
  }

  // Initialize default visibility based on Figma (Sales expanded, others collapsed)
  document.addEventListener('DOMContentLoaded', function(){
    const salesGroup = document.querySelector('[data-accordion="sales"]');
    if(salesGroup){
      const submenu = salesGroup.querySelector('.submenu');
      submenu.style.display = 'flex';
    }

    document.querySelectorAll('[data-toggle]').forEach(function(el){
      el.addEventListener('click', function(){
        const key = el.getAttribute('data-toggle');
        toggleGroup(key);
      });
      el.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          const key = el.getAttribute('data-toggle');
          toggleGroup(key);
        }
      });
      el.setAttribute('tabindex','0');
      el.setAttribute('role','button');
      if(!el.hasAttribute('aria-expanded')) el.setAttribute('aria-expanded','false');
    });
  });
})();
