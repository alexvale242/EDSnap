if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createPanel();
    });
} else {
    createPanel();
}