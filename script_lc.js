// Function to apply highlighting to certain elements
function highlightElements() {
    console.log("Highlighting elements...");
    // Replace '.target-class' with your desired selector
    const elements = document.querySelectorAll('a, h2');
    
    elements.forEach(el => {
        el.classList.add('eds-snap-highlight');
      el.style.backgroundColor = 'yellow'; // Change the highlight color here
    });
  }
  
  // Throttling function to optimize performance
  function throttle(callback, delay) {
    let timeoutId = null;
    return () => {
      if (timeoutId) return; // Skip if already waiting
      timeoutId = setTimeout(() => {
        callback();
        timeoutId = null;
      }, delay);
    };
  }
  
  // Throttled version of highlightElements
  const throttledHighlight = throttle(highlightElements, 500);
  
  // Run the highlighting script initially when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      highlightElements();
    });
  } else {
    highlightElements();
  }
  
  // Observe changes to the DOM and re-apply highlighting
  const observer = new MutationObserver((mutationsList, observer) => {
    // Re-apply highlighting when mutations are detected
    throttledHighlight();
  });
  
  // Start observing the DOM
  observer.observe(document.body, {
    childList: true, // Watch for added or removed child nodes
    subtree: true    // Watch for changes in the entire DOM tree
  });
  