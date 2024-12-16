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

const classNames = [
    "eds-button",
    "eds-button--icon",
    "eds-button--menu-button",
    "eds-button--prominent",
    "eds-button--square",
    "eds-button--tertiary",
    "eds-button--with-icon",
    "eds-checkbox",
    "eds-checkbox-form-group",
    "eds-cluster",
    "eds-container",
    "eds-control-region",
    "eds-control-region--transparent",
    "eds-description",
    "eds-dot",
    "eds-dot--error",
    "eds-dot--error__filled",
    "eds-dot--filled",
    "eds-dot--info",
    "eds-dot--info__filled",
    "eds-dot--success",
    "eds-dot--success__filled",
    "eds-dot--warning",
    "eds-dot--warning__filled",
    "eds-empty-message",
    "eds-fieldset",
    "eds-filter-layout",
    "eds-filter-layout--filters",
    "eds-filters-grid",
    "eds-filters-grid--3x3",
    "eds-fixed--container",
    "eds-fixed--viewport",
    "eds-form",
    "eds-form-group",
    "eds-form-group--info-message-container",
    "eds-form-group--read-only",
    "eds-form-group--with-symbol",
    "eds-form-group-header",
    "eds-grid-form",
    "eds-group-header",
    "eds-help-icon",
    "eds-help-label",
    "eds-help-panel",
    "eds-help-panel--delayed",
    "eds-input",
    "eds-input--error",
    "eds-input-error-text",
    "eds-input-range",
    "eds-label",
    "eds-layout--listing",
    "eds-legend",
    "eds-link-text",
    "eds-loader",
    "eds-loader--large",
    "eds-loader--medium",
    "eds-loader--percentage",
    "eds-loader--small",
    "eds-loader-with-percent",
    "eds-loader-with-percent--large",
    "eds-loader-with-percent--medium",
    "eds-loader-with-percent--small",
    "eds-menu-crumbs",
    "eds-nav-bar",
    "eds-pill",
    "eds-pill--error",
    "eds-pill--info",
    "eds-pill--small",
    "eds-pill--success",
    "eds-pill--warning",
    "eds-radio",
    "eds-radio-label",
    "eds-read-only",
    "eds-search__container",
    "eds-select",
    "eds-spacing--1",
    "eds-spacing--2",
    "eds-spacing--3",
    "eds-spacing--4",
    "eds-split-button-container",
    "eds-sr-only",
    "eds-stack",
    "eds-svg-outline",
    "eds-svg-solid",
    "eds-table",
    "eds-tag",
    "eds-tag--error",
    "eds-tag--info",
    "eds-tag--small",
    "eds-tag--success",
    "eds-tag--warning",
    "eds-textarea",
    "eds-tile",
    "eds-tile-grid",
    "eds-tile-grid--dial-pad",
    "eds-tile-grid__tile",
    "eds-tile-text--black",
    "eds-tile-text--large",
    "eds-tile-text--small",
    "eds-tooltip",
    "eds-tooltip--bottom",
    "eds-tooltip--container",
    "eds-tooltip--left",
    "eds-tooltip--right",
    "eds-tooltip-trigger",
    "eds-tooltip-trigger-wrapper",
    "eds-validation-icon",
    "eds-validation-text",
    "eds-validation-text--bottom",
    "eds-validation-text--right",
    "filter-container",
    "filter-container--with-pager",
    "listing-content",
    "listing-content--small-filters"
  ];
  