function panelHeaderHTML() {
  const logoUrl = chrome.runtime.getURL('EDSnap_Logo.png'); // Get the full URL for the logo
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
  var panelContent = document.getElementById('eds-snap-panel-content');
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

    panel.innerHTML += panelHeaderHTML();
    var panelContent = document.getElementById('eds-snap-panel-content');
    if (panelContent === null) {
      panelContent = document.createElement('div');
      panelContent.id = 'eds-snap-panel-content';
      panel.appendChild(panelContent);
    }

    panelContent.innerHTML += `<h2 id="score"></h2>`;
    panel.innerHTML += panelFooterHTML();
    panel.querySelector('#runSnapButton').onclick = () => {
      runSnap();
      var panelContent = document.getElementById('eds-snap-panel-content');
      calculateAndDisplayScore();
      panelContent.appendChild(createRulesContainer());
    };
      
    panel.querySelector('#unSnapButton').onclick = unSnap;
    
  };  

function generateStateHtml(state) {
    let html = `<div id="panel-score">`;

    if (state !== undefined && state !== null) {
        const percentage = (state.edsElementCount / state.totalElements * 100).toFixed(2);
        html += "<p>Total Elements: " + state.totalElements + "</p>";
        html += "<p>EDS Elements: " + state.edsElementCount + "</p>";
        html += "<p>Score: " + state.score + "</p>";
        html += "<p>Percentage: " + percentage + "%</p>";
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
    const panelContent = document.getElementById('eds-snap-panel-content');
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
