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

rule('selectHasEdsSelectClass', selectHasEdsSelectClass, node => node.nodeName === 'SELECT');
rule('inputHasEdsInputClass', inputHasEdsInputClass, node => node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT');