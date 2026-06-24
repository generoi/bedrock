import {ready} from '~/utils';

const init = (block) => {
  const tabs = block.querySelectorAll('button[role="tab"]');
  const panels = block.querySelectorAll('.wp-block-gds-tab');

  if (!tabs) {
    return;
  }

  for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      tabs.forEach((tab) => {
        tab.setAttribute('aria-selected', 'false');
      });

      panels.forEach((panel) => {
        panel.classList.remove('active');
      });

      e.currentTarget.setAttribute('aria-selected', 'true');

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
