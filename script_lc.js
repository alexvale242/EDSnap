// Function to apply highlighting to certain elements
function highlightElements() {
    console.log("Highlighting elements...");
    // Replace '.target-class' with your desired selector
    const elements = document.querySelectorAll('a:not(#eds-snap-panel a), h2:not(#eds-snap-panel h2)');
    
    elements.forEach(el => {
        el.classList.add('eds-snap-highlight');
    });
  }

  function runSnap() {
    console.log("Running Snap...");
    highlightElements();
  }

  function unSnap() {
    const elements = document.querySelectorAll('.eds-snap-highlight');
    elements.forEach(el => {
      el.classList.remove('eds-snap-highlight');
  });
  }

  function injectEdsSnapPanel() {
    const panel = document.createElement('div');
    panel.id = 'eds-snap-panel';
    panel.innerHTML = `
      <h2>EDS Snap Panel</h2>
      <p>This is a custom panel that has been injected into the page.</p>
      <button id="runSnapButton">Run Snap</button>
      <button id="unSnapButton">Unsnap</button>
    `;
    document.body.appendChild(panel);

    // Set the onclick handler for the button using JavaScript
    const runSnapButton = panel.querySelector('#runSnapButton');
    runSnapButton.addEventListener('click', runSnap);

    // Set the onclick handler for the button using JavaScript
    const unSnapButton = panel.querySelector('#unSnapButton');
    unSnapButton.addEventListener('click', unSnap);
  }

  function initPage() {
    injectEdsSnapPanel();
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
  //const throttledHighlight = throttle(highlightElements, 500);
  
  // Run the highlighting script initially when the DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPage();
    });
  } else {
    initPage();
  }
  
  // // Observe changes to the DOM and re-apply highlighting
  // const observer = new MutationObserver((mutationsList, observer) => {
  //   // Re-apply highlighting when mutations are detected
  //   throttledHighlight();
  // });
  
  // // Start observing the DOM
  // observer.observe(document.body, {
  //   childList: true, // Watch for added or removed child nodes
  //   subtree: true    // Watch for changes in the entire DOM tree
  // });
  