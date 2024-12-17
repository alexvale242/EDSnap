let state = {
    totalElements: 0,
    edsElementCount: 0,
    score: 0,
    ruleResults: [],
    globalRuleResults: [],
    edsElements: []
};

function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        if (nodeIrrellevant(node)) {
            return;
        }

        ruleParser(node);
        edsElementsParser(node);
        state.totalElements++;


        node.childNodes.forEach(traverseDOM);
    }
}

function nodeIrrellevant(node) {
    const irrelevantNodeNames = ['HEAD', 'SCRIPT', 'STYLE', 'IFRAME', 'SVG'];
    const irrelevantIds = ['eds-snap-panel', 'grid-overlay'];
    return irrelevantNodeNames.includes(node.nodeName) || irrelevantIds.includes(node.id);
}

function nodeIsEdsComponent(node) {
    return COMPONENTS.some(component => node.nodeName === component.tag);
}

function calculateScore() {
    state.score = state.edsElementCount + state.ruleResults.filter(rule => rule.result).length - state.ruleResults.filter(rule => !rule.result).length;
  }

function runSnap() {
    resetState();
    parseGlobalRules();
    traverseDOM(document.documentElement);
    calculateScore();
    console.log(state.ruleResults);
}

function resetState() {
    state.totalElements = 0;
    state.edsElementCount = 0;
    state.score = 0;
    state.edsElements = [];
    state.ruleResults = [];
    state.globalRuleResults = [];
}