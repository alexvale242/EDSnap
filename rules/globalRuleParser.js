const globalRules = [];

function parseGlobalRules() {
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

function usesProfileMenu() {
    return document.getElementsByTagName('eds-profile-menu').length !== 0;
}


rule('edsIsInstalled', edsIsInstalled);
rule('usesProfileMenu', usesProfileMenu);