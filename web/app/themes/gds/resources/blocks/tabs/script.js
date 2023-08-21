import {ready} from '~/utils';

const init = (block) => {
  const tabs = block.querySelectorAll('[role="tab"] button');
  const panels = block.querySelectorAll('.wp-block-gds-tab');

  if (!tabs) {
    return;
  }

  for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      tabs.forEach((tab) => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', false);
        tab.setAttribute('tabindex', '-1');
      });

      panels.forEach((panel) => {
        panel.classList.remove('active');
      });

      e.currentTarget.classList.add('active');
      e.currentTarget.setAttribute('aria-selected', true);
      e.currentTarget.setAttribute('tabindex', '0');

      const activePanelId = e.currentTarget.getAttribute('aria-controls');
      const activePanel = block.querySelector(`#${activePanelId}.wp-block-gds-tab`);
      activePanel?.classList.add('active');
    });
  }
}

ready(()=> {
  for (const block of document.querySelectorAll('.wp-block-gds-tabs')) {
    init(block);
  }
});

