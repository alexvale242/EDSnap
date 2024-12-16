// Run the highlighting script initially when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createPanel();
    });
} else {
    createPanel();
}