const ruleDictionary = {
    selectHasEdsSelectClass: {
        name: 'Select has eds-select class',
        severity: 'low',
        description: 'Select element should have the eds-select class',
    },

    inputHasEdsInputClass: {
        name: 'Input has eds-input class',
        severity: 'medium',
        description: 'Input type element should have the eds-input class',
    },

    angularMaterialInUse: {
        name: 'No angular material elements',
        severity: 'medium',
        description: 'No external angular material elements should be used',
    },

    buttonNestedInLink: {
        name: 'Button nested in link',
        severity: 'low',
        description: 'Links should not contain buttons',
    },

    tableUsingEdsTable: {
        name: 'Table uses eds-table',
        severity: 'low',
        description: 'Tables should use the eds-table class',
    },

    searchUsingEdsSearch: {
        name: 'Search uses eds-search',
        severity: 'low',
        description: 'Search should use the eds-search component',
    },

    pagerUsingEdsPager: {
        name: 'Pager uses eds-pager',
        severity: 'low',
        description: 'Pager should use the eds-pager component',
    },

    edsButtonInsteadOfBtn: {
        name: 'Eds button used instead of bootstrap btn',
        severity: 'low',
        description: 'Buttons should use the eds-button component instead of bootstrap btn',
    }
}