let state = {
    totalElements: 0,
    edsElements: 0,
    irrelevantElements: 0,
    score: 0, // Add score to the state
    ruleResults: []
};

function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        if (nodeIrrellevant(node)) {
            console.log('Irrelevant node:', node.id);
            state.irrelevantElements++;
            return;
        }

        ruleParser(node);

        state.totalElements++;

        if (nodeIsEdsComponent(node) || typeof node.className === 'string' && classNames.includes(node.className)) {
            state.edsElements++;
        }

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

function runSnap() {
    resetState();
    traverseDOM(document.documentElement);
    calculateScore();
    updateScore(state);
    console.log(state.ruleResults);
}

function unSnap() {
    resetState();
    clearScore();
}

function calculateScore() {
    const percentage = (state.edsElements / state.totalElements) * 100;
    state.score = Math.floor(percentage / 10);
}

function resetState() {
    state.totalElements = 0;
    state.edsElements = 0;
    state.irrelevantElements = 0;
    state.score = 0;
    state.ruleResults = [];
}