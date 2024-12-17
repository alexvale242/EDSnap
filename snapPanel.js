function panelHeaderHTML() {
  const logoUrl = chrome.runtime.getURL('images/logo-green.png'); // Get the full URL for the logo
  const panelHtml = `
    <header id="panel-header">
      <img src="${logoUrl}" alt="EDS Logo" id="snapPanelLogo">
</header>`;
    return panelHtml;
}

function panelFooterHTML() { 
  return `<footer><button id="runSnapButton">Run Snap</button>
      <button id="unSnapButton">Unsnap</button></footer>`
 }

function updatePanelContent(state) {
  const panel = document.getElementById('eds-snap-panel');
  const shadow = panel.shadowRoot;
  var panelContent = shadow.getElementById('eds-snap-panel-content');
  if (state !== undefined && state !== null) {
    panelContent.innerHTML += generateStateHtml(state);
  }
  else {
    panelContent.innerHTML = `<h2 id="score"></h2>`;
  }
}

function createPanel() {
    var panel = document.getElementById('eds-snap-panel');
    if (panel === null) {
        panel = document.createElement('div');
        panel.id = 'eds-snap-panel';
        document.body.appendChild(panel);
    }

    const shadow = panel.attachShadow({ mode: 'open' });
    
    // Create a link element for the external stylesheet
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', chrome.runtime.getURL('styles.css')); // Update with the correct path to your stylesheet

    shadow.innerHTML = `
      ${linkElem.outerHTML}
      <div id="eds-snap-panel-root">
      ${panelHeaderHTML()}
      <div id="eds-snap-panel-content"><h3 id="score"></h3></div>
      ${panelFooterHTML()}
      </div>
    `;

    shadow.querySelector('#runSnapButton').onclick = () => {
      runSnap();
      const panelContent = shadow.getElementById('eds-snap-panel-content');
      calculateAndDisplayScore();
      panelContent.appendChild(createRulesContainer());
    };

    shadow.querySelector('#unSnapButton').onclick = unSnap;
}

function generateStateHtml(state) {
    let html = `<div id="panel-score">`;

    if (state !== undefined && state !== null) {
        const percentage = (state.edsElementCount / state.totalElements * 100).toFixed(2);
        html += `<p>Total Elements: ${state.totalElements} <br />
        <p>EDS Elements: ${state.edsElementCount} <br />
        <p>Score: ${state.score} <br />
        <p>Percentage: ${percentage}%</p>`;
    }

    html += "</div>";
    return html;
}

function updateScore(state) {
    updatePanelContent(state);
}

function clearScore() {
  updatePanelContent();
}

function calculateAndDisplayScore() {
    const score = calculateScore();
    const panel = document.getElementById('eds-snap-panel');
    const shadow = panel.shadowRoot;
    const panelContent = shadow.getElementById('eds-snap-panel-content');
    panelContent.querySelector('#score').style.display = 'block';
    panelContent.querySelector('#score').innerText = `Score: ${score}`;
}

function calculateScore() {
  return state.edsElementCount + state.ruleResults.filter(rule => rule.result).length - state.ruleResults.filter(rule => !rule.result).length; 
}

function createRulesContainer() {
  const rulesContainer = document.createElement('div');
  let innerHTML = '';

  state.globalRuleResults.forEach(rule => {
    innerHTML += `<div class="result">${globalRuleResult(rule)}</div>`;
  });

  state.ruleResults.forEach(rule => {
    innerHTML += `<div class="result">${ruleResult(rule)}</div>`;
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
    <div class="rule-result">
    <h3>${name}</h3>
    <p>Severity: ${severity}</p>
    <p>Description: ${description}</p>
    <p>Result: ${result}</p>
    </div>
  `;
}

function globalRuleResult(ruleResult) {
    const name = globalRuleDictionary[ruleResult.rule].name;
    const severity = globalRuleDictionary[ruleResult.rule].severity;
    const description = globalRuleDictionary[ruleResult.rule].description;
    const result = ruleResult.result;
    return `
    <div class="rule-result">
      <h3>${name}</h3>
      <p>Severity: ${severity}</p>
      <p>Description: ${description}</p>
      <p>Result: ${result}</p>
      </div>
    `;
  }
