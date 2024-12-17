// On activating a rule group or EDS group
function highlightNodeGroup(nodes, isPositive) {
    nodes.forEach(node => {
        node.classList.add(isPositive ? 'snap-checker--positive' : 'snap-checker--negative');
    });
}

// On deactivating a rule group or EDS group
function removeHighlightFromNodeGroup(nodes) {
    nodes.forEach(node => {
        node.classList.remove('snap-checker--positive');
        node.classList.remove('snap-checker--negative');
    });
}

// On activating a single rule or EDS component
function highlightSingleNode(node, isPositive) {
    node.classList.add(isPositive ? 'snap-checker--positive-emphasis' : 'snap-checker--negative-emphasis');
}

// On deactivating a single rule or EDS component
function removeHighlightFromSingleNode(node) {
    node.classList.remove('snap-checker--positive-emphasis');
    node.classList.remove('snap-checker--negative-emphasis');
}

// On reset
function removeAllHighlights() {
    const highlightedNodes = document.querySelectorAll('.snap-checker--positive, .snap-checker--negative, .snap-checker--positive-emphasis, .snap-checker--negative-emphasis');
    highlightedNodes.forEach(node => {
        node.classList.remove('snap-checker--positive');
        node.classList.remove('snap-checker--negative');
        node.classList.remove('snap-checker--positive-emphasis');
        node.classList.remove('snap-checker--negative-emphasis');
    });
}