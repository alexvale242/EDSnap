const panelHeaderHTML = `
<header id="panel-header">
      <h2>EDS Snap Panel</h2>
      <p>This is a custom panel that has been injected into the page.</p>
      <button id="runSnapButton">Run Snap</button>
      <button id="unSnapButton">Unsnap</button>
</header>
    `

function updatePanelHtml(html) {
    const panel = document.getElementById('eds-snap-panel');
    panel.innerHTML = html;
}

function createPanel(state) {
    var panel = document.getElementById('eds-snap-panel');
    if (panel === null) {
        panel = document.createElement('div');
        panel.id = 'eds-snap-panel';
        document.body.appendChild(panel);
    }

    var html = "";
    html += panelHeaderHTML

    if (state !== undefined && state !== null) {
        html += generateStateHtml(state);
    }

    panel.innerHTML = html;

    const runSnapButton = panel.querySelector('#runSnapButton');
    runSnapButton.addEventListener('click', runSnap);

    const unSnapButton = panel.querySelector('#unSnapButton');
    unSnapButton.addEventListener('click', unSnap);
}

function generateStateHtml(state) {
    let html = `<div id="panel-score">`;

    if (state !== undefined && state !== null) {
        const percentage = (state.edsElements / state.totalElements * 100).toFixed(2);
        html += "<p>Total Elements: " + state.totalElements + "</p>";
        html += "<p>EDS Elements: " + state.edsElements + "</p>";
        html += "<p>Irrelevant Elements: " + state.irrelevantElements + "</p>";
        html += "<p>Score: " + state.score + "</p>";
        html += "<p>Percentage: " + percentage + "%</p>";
    }

    html += "</div>";
    return html;
}

function updateScore(state) {
    createPanel(state);
}

function clearScore() {
    createPanel();
}

