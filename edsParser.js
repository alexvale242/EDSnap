const componentToParse = [
    'EDS-ACCORDION',
    'EDS-FORM-FIELD',
    'EDS-MODAL',
    'EDS-POPOVER',
    'EDS-RESIZING-TEXTAREA',
    'EDS-TILE',
]

function edsElementsParser(node) {
    let shouldParseChildren = true;

    if (nodeIsEdsComponent(node)) {
        if (!componentToParse.includes(node.nodeName)) {
            shouldParseChildren = false;
        }
        state.edsElementCount++;
        state.edsElements.push(node);
    }
    
    if (typeof node.className === 'string' && classNames.includes(node.className)) {
        state.edsElementCount++;
        state.edsElements.push(node);
    }

    return shouldParseChildren;
}    

function nodeIsEdsComponent(node) {
    return COMPONENTS.some(component => node.nodeName === component.tag);
}
