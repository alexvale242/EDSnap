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
                <div class="button-bar">
                    <button id="runSnapButton">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.023 9.34841H21.0156V9.34663M2.98438 19.6444V14.6517M2.98438 14.6517L7.97702 14.6517M2.98438 14.6517L6.16527 17.8347C7.15579 18.8271 8.41285 19.58 9.8646 19.969C14.2657 21.1483 18.7895 18.5364 19.9687 14.1353M4.03097 9.86484C5.21024 5.46374 9.73402 2.85194 14.1351 4.03121C15.5869 4.4202 16.8439 5.17312 17.8345 6.1655L21.0156 9.34663M21.0156 4.3558V9.34663" stroke="#1A5919" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button id="close-button">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
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

    shadow.querySelector('#close-button').onclick = () => {
        clear();
    };

    runSnap();
    render();
}

function clear() {
    var panel = document.getElementById('eds-snap-panel');
    if (panel !== null) {
        panel.remove();
    }
}

function render() {
    var panel = document.getElementById('eds-snap-panel');
    const shadow = panel.shadowRoot;
    updateTitle(shadow);
    updateScoreBoard(shadow);
    updateRulesBoard(shadow);
}

function updateTitle(shadow) {
    const ruleCount = state.ruleResults.filter(o => o.result == false).length + state.globalRuleResults.filter(o => o.result == false).length;
    const title = shadow.getElementById('eds-snap-title');
    title.innerText = `${ruleCount} UI enhancements identified`;
}

function updateScoreBoard(shadow) {
    const scoreboard = shadow.getElementById('eds-snap-scoreboard');
    const percentage = (state.score / state.totalElements * 100).toFixed(1);
    scoreboard.innerHTML = `
    <div class="eds-snap__score">Score: ${state.score}</div>
    <div class="eds-snap__score-data">
        <div>Total Elements: ${state.totalElements}</div>
        <div>EDS Elements: ${state.edsElementCount}</div>
        <div>EDS Usage: ${percentage}%</div>
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