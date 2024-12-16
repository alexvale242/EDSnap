const state = {
    totalElements: 0,
    edsElements: 0,
    irrelevantElements: 0,
};

function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        if (nodeIrrellevant(node)) {
            state.irrelevantElements++;
            return;
        }

        state.totalElements++;

        console.log(`Node Name: ${node.nodeName}, Class Names: ${node.className || 'No class'}`);

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

setTimeout(() => {
    traverseDOM(document.documentElement);
    console.log(`Total Elements: ${state.totalElements}`);
    console.log(`Elements with 'eds' in class name: ${state.edsElements}`);
    console.log(`Irrelevant Elements: ${state.irrelevantElements}`);
    const percentage = (state.edsElements / state.totalElements) * 100;
    console.log(`Percentage of 'eds' elements: ${percentage.toFixed(2)}%`);
}, 2000);