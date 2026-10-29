(() => {
  'use strict';
  const production = ['1914cake.com', 'www.1914cake.com'].includes(location.hostname);
  window.dataLayer = window.dataLayer || [];
  const track = (...args) => { if (production && window.gtag) window.gtag(...args); };
  if (production) {
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-WNB6L9MQDF');
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-WNB6L9MQDF';
    document.head.append(script);
  }
  const tabs = [...document.querySelectorAll('[data-menu]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  function selectMenu(name) {
    if (!panels.some(panel => panel.dataset.panel === name)) return;
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== name; });
    tabs.forEach(tab => {
      const selected = tab.dataset.menu === name;
      tab.classList.toggle('selected', selected);
      if (selected) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
  }
  function followHash() {
    const menuName = location.hash.replace('#menu-', '');
    if (['yonghe', 'huashan', 'fried'].includes(menuName)) {
      selectMenu(menuName);
      document.getElementById('menu').scrollIntoView({behavior:'instant'});
    }
    const section = location.hash.slice(1);
    if (['hours','menu','reheat'].includes(section)) track('event', 'view_section', {section_name:section});
  }
  selectMenu(['#menu-huashan','#menu-fried'].includes(location.hash) ? location.hash.replace('#menu-','') : 'yonghe');
  document.body.dataset.enhanced = 'true';
  tabs.forEach(tab => tab.addEventListener('click', event => {
    event.preventDefault();
    selectMenu(tab.dataset.menu);
    history.pushState(null, '', tab.getAttribute('href'));
    document.getElementById('menu').scrollIntoView({behavior:'instant'});
    track('event', 'select_menu_location', {menu_location:tab.dataset.menu});
  }));
  window.addEventListener('hashchange', followHash);
  if (location.hash) requestAnimationFrame(followHash);
  document.querySelectorAll('[data-contact]').forEach(link => link.addEventListener('click', () => {
    track('event', 'contact_click', {contact_method:link.dataset.contact,link_url:link.href});
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
