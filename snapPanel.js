function panelHeaderHTML() {
  const logoUrl = chrome.runtime.getURL('images/logo-green.png'); // Get the full URL for the logo
  const panelHtml = `
    <header class="eds-snap__header" id="panel-header">
      <img src="${logoUrl}" alt="EDS Logo" id="snapPanelLogo">
      <button id="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
</header>`;
    return panelHtml;
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
  const linkElem = document.createElement('link');
  linkElem.setAttribute('rel', 'stylesheet');
  linkElem.setAttribute('href', chrome.runtime.getURL('styles.css'));

  shadow.innerHTML = `
      ${linkElem.outerHTML}
      <div class="eds-snap">
          ${panelHeaderHTML()}
          <div class="eds-snap__content" id="eds-snap-panel-content">
            <h1 id="eds-snap-title" class="eds-snap__title">20 UI enhancements identified</h1>
            <div id="eds-snap-scoreboard" class="eds-snap__scoreboard"></div>
            <div id="eds-rules-board" class="eds-snap__rules-board"></div>
          </div>
      </div> 
    `;

    shadow.getElementById('close-button').onclick = () => {
      panel.remove();
    };

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

function calculateAndDisplayScore(panelContent) {
  calculateScore();
  panelContent.querySelector('#eds-snap-scoreboard').innerHTML = 
  `             
  <div class="eds-snap__score">Score: ${state.score}</div>
  <div class="eds-snap__score-data">
      <div>Total Elements: ${state.totalElements}</div>
      <div>EDS Elements: ${state.edsElementCount}</div>
  </div>`
}


function createRulesContainer() {
  const rulesContainer = document.createElement('div');
  let innerHTML = '';

  /* Static grouped rule for example */
  const index = 0;
  const ruleName = 'Eds is not installed';
  innerHTML += `
  
  <div class="eds-snap__rule-group result">
      <input id="result-grouping-${index}" class="eds-snap__rule-heading-toggle" type="checkbox">
      <label for="result-grouping-${index}" class="eds-snap__rule-heading">${ruleName}</label>
      <p>You're in a timeline where the EDS doesn't exist at all</p>
      <label><input class="eds-snap__rule-select-all" data-checkbox-group="result-grouping-${index}" type="checkbox" />Highlight all</label>
      <div class="eds-snap__rule-list">
        <div class="eds-snap__rule-result">
            <label><input type="checkbox" />Node 1</label>
        </div>
        <div class="eds-snap__rule-result">
            <label><input type="checkbox" />Node 2</label>
        </div>
        <div class="eds-snap__rule-result">
            <label><input type="checkbox" />Node 3</label>
        </div>
      </div>
  </div>
  `;

  /* Static grouped rule for example */

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
