
const panelHeaderHTML = `
<header id="panel-header">
      <h1>EDS Snap Panel</h1>
      <p>This is a custom panel that has been injected into the page.</p>
      <h2 id="score" style="display: none">Score: 0</h2>
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

    panel.querySelector('#runSnapButton').onclick = () => {
      runSnap();
      panel.appendChild(createRulesContainer());
      calculateAndDisplayScore();
    };

    panel.querySelector('#unSnapButton').onclick = unSnap;
}

function generateStateHtml(state) {
    let html = `<div id="panel-score">`;

    if (state !== undefined && state !== null) {
        const percentage = (state.edsElements / state.totalElements * 100).toFixed(2);
        html += "<p>Total Elements: " + state.totalElements + "</p>";
        html += "<p>EDS Elements: " + state.edsElements + "</p>";
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

function calculateAndDisplayScore() {
    const score = calculateScore();
    const panel = document.getElementById('eds-snap-panel');
    panel.querySelector('#score').style.display = 'block';
    panel.querySelector('#score').innerText = `Score: ${score}`;
}

function calculateScore() {
  return state.edsElements + state.ruleResults.filter(rule => rule.result).length - state.ruleResults.filter(rule => !rule.result).length; 
}

function createRulesContainer() {
  const rulesContainer = document.createElement('div');
  let innerHTML = '';

  state.globalRuleResults.forEach(rule => {
    innerHTML += `<div>${globalRuleResult(rule)}</div>`;
  });

  state.ruleResults.forEach(rule => {
    innerHTML += `<div>${ruleResult(rule)}</div>`;
  });

  rulesContainer.innerHTML = innerHTML;

  return rulesContainer;
}

function ruleResult(ruleResult) {
  const name = ruleDictionary[ruleResult.rule].name;
  const severity = ruleDictionary[ruleResult.rule].severity;
  const description = ruleDictionary[ruleResult.rule].description;
  const result = ruleResult.result;
  return `
    <h3>${name}</h3>
    <p>Severity: ${severity}</p>
    <p>Description: ${description}</p>
    <p>Result: ${result}</p>
  `;
}

function globalRuleResult(ruleResult) {
    const name = globalRuleDictionary[ruleResult.rule].name;
    const severity = globalRuleDictionary[ruleResult.rule].severity;
    const description = globalRuleDictionary[ruleResult.rule].description;
    const result = ruleResult.result;
    return `
      <h3>${name}</h3>
      <p>Severity: ${severity}</p>
      <p>Description: ${description}</p>
      <p>Result: ${result}</p>
    `;
  }
