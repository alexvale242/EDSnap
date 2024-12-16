const rules = [];

function globalRuleParser() {
    rules.forEach(({ ruleName, ruleCallback }) => {
        state.globalRuleResults.push({
            rule: ruleName,
            result: ruleCallback(),
        });
    });
}

function rule(ruleName, ruleCallback) {
    rules.push({ ruleName, ruleCallback });
}

function edsInstalled() {
    return eds !== undefined;
}

rule('edsInstalled', edsInstalled);