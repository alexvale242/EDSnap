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
    const percentage = (state.edsElementCount / state.totalElements * 100).toFixed(1);
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
    const groupedRuleResults = state.ruleResults.filter(o => o.result == false).reduce((acc, curr) => {
        if (!acc[curr.rule]) {
            acc[curr.rule] = [];
        }
        acc[curr.rule].push(curr);
        return acc;
    }, {});

    var groupRuleHtml = [];

    Object.entries(groupedRuleResults).forEach(([rule, results], index) => {
        groupRuleHtml.push(createGroupHtml(rule, results, index));
    });

    groupRuleHtml.push(createEDSComponentGroupHtml());

    rulesBoard.innerHTML = groupRuleHtml.join('');

    addHighlightHandlers(shadow, groupedRuleResults);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createGroupHtml(rule, results, index) {
    const ruleInfo = ruleDictionary[rule] || { name: 'Unknown', severity: 'Unknown', description: 'No description available.' };
    return `<div class="eds-snap__rule-group">
        <input id="result-grouping-${index}" class="eds-snap__rule-heading-toggle" type="checkbox">
        <label for="result-grouping-${index}" class="eds-snap__rule-heading">${ruleInfo.name}</label>
        <p>${ruleInfo.description}</p>
        <label><input class="eds-snap__rule-select-all" data-checkbox-group="result-grouping-${index}" type="checkbox" />Highlight all</label>
        <div class="eds-snap__rule-list">
            ${results.map((result, i) => `
            <label class="eds-snap__rule-result">
                <input class="eds-snap__rule-result-toggle" id="rule-result-${index}-${i}" type="checkbox" /><p>${escapeHtml(result.node.outerHTML)}</p>
            </label>`).join('')}
        </div>
    </div>`;
}

function createEDSComponentGroupHtml() {
    return `<div class="eds-snap__rule-group result eds-component">
        <input id="eds-component-group" class="eds-snap__rule-heading-toggle" type="checkbox">
        <label for="eds-component-group" class="eds-snap__rule-heading">EDS Components</label>
        <p>These are the EDS components that were found in the page</p>
        <label><input class="eds-snap__rule-select-all" data-checkbox-group="eds-component-group" type="checkbox" />Highlight all</label>
        <div class="eds-snap__rule-list">
            ${state.edsElements.map((node, i) => `
            <div class="eds-snap__rule-result">
                <label><input type="checkbox" id="eds-component-${i}"/>${node.nodeName}</label>
            </div>`).join('')}
        </div>
    </div>`;
}

function addHighlightHandlers(shadow, groupedRuleResults) {
    // Add highlight all checkbox behaviour
    const checkboxes = shadow.querySelectorAll('[data-checkbox-group^="result-grouping-"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.onclick = (checkbox) => {
            const results = groupedRuleResults[Object.keys(groupedRuleResults)[index]];
            if (checkbox.target.checked) {
                activateGroup(results);
            } else {
                deactivateGroup(results);
            }
        };
    });

    // Add individual checkbox behaviour
    const individualCheckboxes = shadow.querySelectorAll('[id^="rule-result-"]');

    individualCheckboxes.forEach((checkbox, index) => {
        // Use the multi part ID to identify the specific checbox
        const groupIndex = checkbox.id.split('-')[2];
        const resultIndex = checkbox.id.split('-')[3];
        const result = groupedRuleResults[Object.keys(groupedRuleResults)[groupIndex]][resultIndex];

        checkbox.onclick = (checkbox) => {
            if (checkbox.target.checked) {
                // deactivate all other checkboxes in the group then activate the selected one
                const otherCheckboxes = shadow.querySelectorAll('[id^="rule-result-"]:not(#' + checkbox.target.id + ')');
                otherCheckboxes.forEach(otherCheckbox => {
                    otherCheckbox.checked = false;
                    const otherGroupIndex = otherCheckbox.id.split('-')[2];
                    const otherResultIndex = otherCheckbox.id.split('-')[3];
                    const otherResult = groupedRuleResults[Object.keys(groupedRuleResults)[otherGroupIndex]][otherResultIndex];
                    deactivateNode(otherResult);
                });
                activateNode(result);
            } else {
                deactivateNode(result);
            }
        };
    });

    // Add highlight all EDS component checkbox behaviour
    const edsComponentCheckbox = shadow.querySelector('[data-checkbox-group="eds-component-group"]');
    edsComponentCheckbox.onclick = (checkbox) => {
        if (checkbox.target.checked) {
            highlightNodeGroup(state.edsElements, true);
        } else {
            removeHighlightFromNodeGroup(state.edsElements);
        }
    };

    // Add individual EDS component checkbox behaviour
    const edsComponentIndividualCheckboxes = shadow.querySelectorAll('[id^="eds-component-"]');
    edsComponentIndividualCheckboxes.forEach((checkbox, index) => {
        checkbox.onclick = (checkbox) => {
            if (checkbox.target.checked) {
                highlightSingleNode(state.edsElements[index], true);
            } else {
                removeHighlightFromSingleNode(state.edsElements[index]);
            }
        };
    });
}

function activateGroup(results) {
    const nodes = results.map((result, i) => {
        return result.node
    });

    highlightNodeGroup(nodes);
}

function deactivateGroup(results) {
    const nodes = results.map((result, i) => {
        return result.node
    });

    removeHighlightFromNodeGroup(nodes);
}

function activateNode(result) {
    highlightSingleNode(result.node);
}

function deactivateNode(result) {
    removeHighlightFromSingleNode(result.node);
}
