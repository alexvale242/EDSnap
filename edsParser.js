function edsElementsParser(node) {
    if (nodeIsEdsComponent(node) || typeof node.className === 'string' && classNames.includes(node.className)) {
        state.edsElementCount++;
        state.edsElements.push(node);
    }
}    
