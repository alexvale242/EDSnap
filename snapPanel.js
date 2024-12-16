  function injectEdsSnapPanel(runSnap, unSnap) {
    const panel = document.createElement('div');
    panel.id = 'eds-snap-panel';
    panel.innerHTML = `
      <h2>EDS Snap Panel</h2>
      <p>This is a custom panel that has been injected into the page.</p>
      <button id="runSnapButton">Run Snap</button>
      <button id="unSnapButton">Unsnap</button>
    `;
    document.body.appendChild(panel);

    // Set the onclick handler for the button using JavaScript
    const runSnapButton = panel.querySelector('#runSnapButton');
    runSnapButton.addEventListener('click', runSnap);

    // Set the onclick handler for the button using JavaScript
    const unSnapButton = panel.querySelector('#unSnapButton');
    unSnapButton.addEventListener('click', unSnap);
  }
