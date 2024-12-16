const state = {
    totalElements: 0,
    edsElements: 0,
    irrelevantElements: 0,
    score: 0, // Add score to the state
};

function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        if (nodeIrrellevant(node)) {
            state.irrelevantElements++;
            return;
        }

        state.totalElements++;

        if (typeof node.className === 'string' && node.className.includes('eds')) {
            state.edsElements++;
        }

        node.childNodes.forEach(traverseDOM);
    }
}

function nodeIrrellevant(node) {
    const irrelevantNodeNames = ['HEAD', 'SCRIPT', 'STYLE', 'IFRAME', 'SVG'];
    return irrelevantNodeNames.includes(node.nodeName);
}

function createResultsPanel() {
    const panel = document.createElement('div');
    panel.id = 'fixed-panel';
    panel.style.position = 'fixed';
    panel.style.bottom = '10px';
    panel.style.right = '10px';
    panel.style.padding = '10px';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    panel.style.color = 'white';
    panel.style.borderRadius = '5px';
    panel.style.zIndex = '1000';

    const percentageDiv = document.createElement('div');
    percentageDiv.id = 'percentage';
    panel.appendChild(percentageDiv);

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    panel.appendChild(scoreDiv);

    document.body.appendChild(panel);
}

function updatePanelContent(percentage, score) {
    const percentageDiv = document.getElementById('percentage');
    if (percentageDiv) {
        percentageDiv.textContent = `Percentage of 'eds' elements: ${percentage.toFixed(2)}%`;
    }

    const scoreDiv = document.getElementById('score');
    if (scoreDiv) {
        scoreDiv.textContent = `Score: ${score}`;
    }
}

setTimeout(() => {
    traverseDOM(document.documentElement);
    const percentage = (state.edsElements / state.totalElements) * 100;
    state.score = Math.floor(percentage / 10); // Update score based on percentage
    createResultsPanel();
    updatePanelContent(percentage, state.score);
}, 2000);