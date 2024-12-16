// Run the highlighting script initially when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectEdsSnapPanel(runSnap, unSnap);
    });
} else {
    injectEdsSnapPanel(runSnap, unSnap);
}