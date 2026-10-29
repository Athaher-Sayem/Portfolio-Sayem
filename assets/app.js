(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const wideScreen = matchMedia('(min-width: 601px)');
  wideScreen.addEventListener('change', closeMenu);

  const projects = [...document.querySelectorAll('.project')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    projects.forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      // A previously off-screen project must be visible when the filter reorders it.
      if (!project.hidden) project.classList.add('is-visible');
    });
    const count = projects.filter(project => !project.hidden).length;
    document.querySelector('.project-count').textContent = `${String(count).padStart(2, '0')} PROJECTS`;
  }));

  const dialog = document.querySelector('#project-dialog');
  let dialogTrigger;
  document.querySelectorAll('[data-study]').forEach(link => link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    const article = document.getElementById(link.dataset.study).cloneNode(true);
    article.removeAttribute('id');
    article.querySelector('h2').id = 'dialog-title';
    document.querySelector('#dialog-content').replaceChildren(article);
    dialogTrigger = link;
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    dialog.querySelector('.dialog-close').focus();
  }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    dialogTrigger?.focus({ preventScroll: true });
  });

  document.querySelector('.copy-email').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText('athahersayem336@gmail.com');
      status.textContent = 'Email copied.';
    } catch {
      status.textContent = 'Could not copy. Use the email link above.';
    }
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.project, .about-intro, .capabilities, .journey-layout').forEach(element => {
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
  }
})();
