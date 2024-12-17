function init() {
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
    const logoUrl = chrome.runtime.getURL('images/logo-green.png'); // Get the full URL for the logo
    shadow.innerHTML = `
        ${linkElem.outerHTML}
        <div class="eds-snap">
            <header class="eds-snap__header" id="panel-header">
                <img src="${logoUrl}" alt="EDS Logo" id="snapPanelLogo">
                <button id="runSnapButton">Run Snap</button>
                <button id="unSnapButton">Unsnap</button>
            </header>
            <div class="eds-snap__content" id="eds-snap-panel-content">
              <h1 id="eds-snap-title" class="eds-snap__title"></h1>
              <div id="eds-snap-scoreboard" class="eds-snap__scoreboard"></div>
              <div id="eds-rules-board" class="eds-snap__rules-board"></div>
            </div>
        </div> 
      `;
  
    shadow.querySelector('#runSnapButton').onclick = () => {
      runSnap();
      render();
    };
  
    shadow.querySelector('#unSnapButton').onclick = unSnap;
}

function render() {
    var panel = document.getElementById('eds-snap-panel');
    const shadow = panel.shadowRoot;
    updateTitle(shadow);
    updateScoreBoard(shadow);
    updateRulesBoard(shadow); 
}

function updateTitle(shadow) {
    const ruleCount = state.ruleResults.length + state.globalRuleResults.length;
    const title = shadow.getElementById('eds-snap-title');
    title.innerText = `${ruleCount} UI enhancements identified`;
}

function updateScoreBoard(shadow) {
    const scoreboard = shadow.getElementById('eds-snap-scoreboard');
    scoreboard.innerHTML = `
    <div class="eds-snap__score">Score: ${state.score}</div>
    <div class="eds-snap__score-data">
        <div>Total Elements: ${state.totalElements}</div>
        <div>EDS Elements: ${state.edsElementCount}</div>
    </div>`
}

function updateRulesBoard(shadow) {
    const rulesBoard = shadow.getElementById('eds-rules-board');
    rulesBoard.innerHTML = `
    <div class="eds-snap__rule-heading"><span>Eds doesnt exist</span> <button>*</button></div>
                <div class="eds-snap__rule-group">
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Eds
                                doesnt exist</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">High</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">You're in a timeline where the EDS doesn't exist at all</span>
                        </div>
                    </div>
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Eds
                                doesnt exist</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">High</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">You're in a timeline where the EDS doesn't exist at all</span>
                        </div>
                    </div>
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Eds
                                doesnt exist</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">High</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">You're in a timeline where the EDS doesn't exist at all</span>
                        </div>
                    </div>
                </div>
                <div class="eds-snap__rule-heading"><span>Form spilt wine on the carpet</span> <button>*</button>
                </div>
                <div class="eds-snap__rule-group">
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Form
                                spilt wine on the carpet</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">High</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">You have a cream carpet and now its ruined</span></div>
                    </div>
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Form
                                spilt wine on the carpet</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">High</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">You have a cream carpet and now its ruined</span></div>
                    </div>
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Form
                                spilt wine on the carpet</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">High</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">You have a cream carpet and now its ruined</span></div>
                    </div>
                </div>
                <div class="eds-snap__rule-heading"><span>Search bar not speaking to filters</span>
                    <button>*</button>
                </div>
                <div class="eds-snap__rule-group eds-snap__rule-group--collapsed">
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Search
                                bar not speaking to filters</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">Medium</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">They've had an argument about fonts</span></div>
                    </div>
                    <div class="eds-snap__rule-result">
                        <div class="rule"><span class="rule__title">Name</span> <span class="rule__description">Search
                                bar not speaking to filters</span></div>
                        <div class="rule"><span class="rule__title">Severity</span> <span
                                class="rule__description">Medium</span></div>
                        <div class="rule"><span class="rule__title">Description</span> <span
                                class="rule__description">They've had an argument about fonts</span></div>
                    </div>
                </div>
    `;
}