const COMPONENTS = [
    {
        name: "Accordion",
        tag: "EDS-ACCORDION"
    },
    {
        name: "Auto Fill Search (deprecated)",
        tag: "EDS-AUTO-FILL-SEARCH"
    },
    {
        name: "Avatar",
        tag: "EDS-AVATAR"
    },
    {
        name: "Bar Chart",
        tag: "EDS-BAR-CHART"
    },
    { 
        name: "Button", 
        tag: "EDS-BUTTON" 
    },
    {
        name: "Combo Chart",
        tag: "EDS-CHART"
    },
    {
        name: "Date Picker",
        tag: "EDS-DATE-PICKER"
    },
    {
        name: "Doughnut Chart",
        tag: "EDS-DOUGHNUT-CHART"
    },
    {
        name: "Dot",
        tag: "EDS-DOT"
    },
    {
        name: "Dropdown (deprecated)",
        tag: "EDS-DROPDOWN"
    },
    {
        name: "File Attachment",
        tag: "EDS-FILE-ATTACHMENT"
    },
    {
        name: "File Upload",
        tag: "EDS-FILE-UPLOAD"
    },
    {
        name: "Filter (deprecated)",
        tag: "EDS-FILTER"
    },
    {
        name: "Form Field",
        tag: "EDS-FORM-FIELD"
    },
    {
        name: "Help Text",
        tag: "EDS-HELP-TEXT"
    },
    {
        name: "Hub Switcher",
        tag: "EDS-HUB-SWITCHER"
    },
    { 
        name: "Input", 
        tag: "EDS-INPUT" 
    },
    {
        name: "Input Range",
        tag: "EDS-INPUT-RANGE"
    },
    {
        name: "Line Chart",
        tag: "EDS-LINE-CHART"
    },
    { 
        name: "Loader", 
        tag: "EDS-LOADER" 
    },
    {
        name: "Modal",
        tag: "EDS-MODAL"
    },
    {
        name: "Multi Select",
        tag: "EDS-MULTI-SELECT"
    },
    {
        name: "Pager",
        tag: "EDS-PAGER"
    },
    { 
        name: "Pill", 
        tag: "EDS-PILL" 
    },
    {
        name: "Popover",
        tag: "EDS-POPOVER"
    },
    {
        name: "Profile Menu",
        tag: "EDS-PROFILE-MENU"
    },
    { 
        name: "Radio", 
        tag: "EDS-RADIO" 
    },
    {
        name: "Resizing Textarea",
        tag: "EDS-RESIZING-TEXTAREA"
    },
    {
        name: "Search",
        tag: "EDS-SEARCH"
    },
    {
        name: "Selector Button",
        tag: "EDS-SELECTOR-BUTTON"
    },
    { 
        name: "Select", 
        tag: "EDS-SELECT" 
    },
    {
        name: "Single Select",
        tag: "EDS-SINGLE-SELECT"
    },
    { 
        name: "Spacing", 
        tag: "EDS-SPACING" 
    },
    { 
        name: "Stepper", 
        tag: "EDS-STEPPER" 
    },
    { 
        name: "Table", 
        tag: "EDS-TABLE" 
    },
    { 
        name: "Tag", 
        tag: "EDS-TAG" 
    },
    { 
        name: "Textarea", 
        tag: "EDS-TEXTAREA" 
    },
    { 
        name: "Tile", 
        tag: "EDS-TILE" 
    },
    { 
        name: "Tile Grid", 
        tag: "EDS-TILE-GRID" 
    },
    {
        name: "Tile Grid Dial Pad",
        tag: "EDS-TILE-GRID--DIAL-PAD"
    },
    { 
        name: "Toast", 
        tag: "EDS-TOAST" 
    },
    {
        name: "Toggle Button",
        tag: "EDS-TOGGLE-BUTTON"
    },
    {
        name: "Toggle Switch",
        tag: "EDS-TOGGLE-SWITCH"
    }
];

const state = {
    totalElements: 0,
    edsElements: 0,
    irrelevantElements: 0,
    score: 0, // Add score to the state
};

function traverseDOM(node) {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
        if (nodeIrrellevant(node)) {
            state.irrelevantElements++;
            return;
        }

        state.totalElements++;

        if (typeof node.className === 'string' && nodeIsEdsComponent(node)) {
            state.edsElements++;
            console.log(node.nodeName);
            return;
        }

        node.childNodes.forEach(traverseDOM);
    }
}

function nodeIrrellevant(node) {
    const irrelevantNodeNames = ['HEAD', 'SCRIPT', 'STYLE', 'IFRAME', 'SVG'];
    return irrelevantNodeNames.includes(node.nodeName);
}

function nodeIsEdsComponent(node) {
    return COMPONENTS.some(component => node.nodeName === component.tag);
}

function createResultsPanel() {
    const panel = document.createElement('div');
    panel.id = 'fixed-panel';
    panel.style.position = 'fixed';
    panel.style.bottom = '10px';
    panel.style.right = '10px';
    panel.style.padding = '10px';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    panel.style.color = 'white';
    panel.style.borderRadius = '5px';
    panel.style.zIndex = '1000';

    const percentageDiv = document.createElement('div');
    percentageDiv.id = 'percentage';
    panel.appendChild(percentageDiv);

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    panel.appendChild(scoreDiv);

    document.body.appendChild(panel);
}

function updatePanelContent(percentage, score) {
    const percentageDiv = document.getElementById('percentage');
    if (percentageDiv) {
        percentageDiv.textContent = `Percentage of 'eds' elements: ${percentage.toFixed(2)}%`;
    }

    const scoreDiv = document.getElementById('score');
    if (scoreDiv) {
        scoreDiv.textContent = `Score: ${score}`;
    }
}

setTimeout(() => {
    traverseDOM(document.documentElement);
    const percentage = (state.edsElements / state.totalElements) * 100;
    state.score = Math.floor(percentage / 10); // Update score based on percentage
    createResultsPanel();
    updatePanelContent(percentage, state.score);
}, 2000);