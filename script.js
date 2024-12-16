function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {

    }
    // Run custom code on the current node
    console.log(node.nodeName); // Log the node's name

    // Example: Highlight all text nodes
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        console.log("Text:", node.nodeValue.trim());
        node.nodeValue += "Bananaa"
    }

    // Recursively process child nodes
    node.childNodes.forEach(traverseDOM);
}

// Start traversing from the root (document)
traverseDOM(document.documentElement);
