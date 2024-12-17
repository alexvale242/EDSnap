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


rule('selectHasEdsSelectClass', selectHasEdsSelectClass, node => node.nodeName === 'SELECT');
rule('inputHasEdsInputClass', inputHasEdsInputClass, node => node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT');
rule('angularMaterialInUse', materialElementPresent, node => node.nodeName.toLowerCase().includes('mat'));
rule('buttonNestedInLink', buttonNestedInLink, node => node.nodeName.toLowerCase() === 'button' && node.parentElement.nodeName.toLowerCase() === 'a');
rule('tableUsingEdsTable', tableUsingEdsTable, node => node.nodeName === 'TABLE');