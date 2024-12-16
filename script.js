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
    return irrelevantNodeNames.includes(node.nodeName);
}

function nodeIsEdsComponent(node) {
    return COMPONENTS.some(component => node.nodeName === component.tag);
}

function runSnap() {
    traverseDOM(document.documentElement);
    const percentage = (state.edsElements / state.totalElements) * 100;
    state.score = Math.floor(percentage / 10); // Update score based on percentage
    updateScore(state);
    console.log(state.ruleResults);
}

function unSnap() {
    console.log('Unsnap');
    state.totalElements = 0;
    state.edsElements = 0;
    state.irrelevantElements = 0;
    state.score = 0;
    clearScore();
}