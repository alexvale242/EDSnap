const rules = [];

function ruleParser(node) {
    rules.forEach(({ ruleName, ruleCallback, shouldApplyCallback }) => {
        if (shouldApplyCallback(node)) {
            state.ruleResults.push({
                rule: ruleName,
                result: ruleCallback(node),
                node: node
            });
        }
    });
}

function rule(ruleName, ruleCallback, shouldApplyCallback) {
    rules.push({ ruleName, ruleCallback, shouldApplyCallback });
}

// Define rules
function selectHasEdsSelectClass(node) {
    return node.classList && node.classList.contains('eds-select');
}

function inputHasEdsInputClass(node) {
    return node.classList && node.classList.contains('eds-input');
}

function materialElementPresent(node) {
    return false;
}

function buttonNestedInLink(node) {
    return false;
}

function tableUsingEdsTable(node) {
    return node.classList && node.classList.contains('eds-table');
}

function searchUsingEdsSearch(node) {
    return node.classList && node.classList.contains('eds-search__input');
}

function pagerUsingEdsPager(node) {
    return node.classList && node.classList.contains('eds-pager__container') || node.nodeName === 'EDS-PAGER';
}

function edsButtonInsteadOfBtn(node) {
    return false;
}

function controlRegionExists(node) {
    return node.classList && node.classList.contains('control-region');
}

function usesProfileMenu(node) {
    const profileMenu = node.querySelector('eds-profile-menu');
    
    // Return true if the web component is found, otherwise false
    return profileMenu !== null;
}

rule('selectHasEdsSelectClass', selectHasEdsSelectClass, node => node.nodeName === 'SELECT');
rule('inputHasEdsInputClass', inputHasEdsInputClass, node => node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT');
rule('angularMaterialInUse', materialElementPresent, node => node.nodeName.toLowerCase().includes('mat'));
rule('buttonNestedInLink', buttonNestedInLink, node => node.nodeName.toLowerCase() === 'button' && node.parentElement.nodeName.toLowerCase() === 'a');
rule('tableUsingEdsTable', tableUsingEdsTable, node => node.nodeName === 'TABLE');
rule('searchUsingEdsSearch', searchUsingEdsSearch, node => node.nodeName === 'INPUT' && node.type == 'search');
rule('pagerUsingEdsPager', pagerUsingEdsPager, node => (node.classList && node.classList.contains('pager')) || (node.ariaLabel && node.ariaLabel == 'pagination'));
rule('edsButtonInsteadOfBtn', edsButtonInsteadOfBtn, node => node.classList && node.classList.contains('btn'));
rule('controlRegionInsteadOfActionBar', controlRegionExists, node => node.classList && node.classList.contains('action-bar'));
rule('usesProfileMenu', usesProfileMenu, node => node.classList && (node.classList.contains('eds-nav-bar') || node.classList.contains('dealtrack-header')));

