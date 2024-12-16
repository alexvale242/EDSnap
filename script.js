function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        // Log the node name and class names of the node
        console.log(`Node Name: ${node.nodeName}, Class Names: ${node.className || 'No class'}`);

        // Recursively process child nodes
        node.childNodes.forEach(traverseDOM);
    }
}

// Start traversing from the root (document)
traverseDOM(document.documentElement);