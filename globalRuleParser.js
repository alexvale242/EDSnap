const globalRules = [];

function globalRuleParser() {
    globalRules.forEach(({ ruleName, ruleCallback }) => {
        state.globalRuleResults.push({
            rule: ruleName,
            result: ruleCallback(),
        });
    });
}

function rule(ruleName, ruleCallback) {
    globalRules.push({ ruleName, ruleCallback });
}

function edsIsInstalled() {
    return document.getElementById('grid-overlay') !== null;
}

rule('edsIsInstalled', edsIsInstalled);