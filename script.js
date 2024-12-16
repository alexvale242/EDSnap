let totalElements = 0;
let edsElements = 0;

function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        // Increment the total elements counter
        totalElements++;

        // Log the node name and class names of the node
        console.log(`Node Name: ${node.nodeName}, Class Names: ${node.className || 'No class'}`);

        if (typeof node.className === 'string' && node.className.includes('eds')) {
            // Increment the 'eds' elements counter
            edsElements++;
            console.log('EDS');
        }

        // Recursively process child nodes
        node.childNodes.forEach(traverseDOM);
    }
}

// Start traversing from the root (document)
setTimeout(() => {
    traverseDOM(document.documentElement);
    // Log the counters after traversal
    console.log(`Total Elements: ${totalElements}`);
    console.log(`Elements with 'eds' in class name: ${edsElements}`);
    // Calculate and log the percentage
    const percentage = (edsElements / totalElements) * 100;
    console.log(`Percentage of 'eds' elements: ${percentage.toFixed(2)}%`);
}, 2000);