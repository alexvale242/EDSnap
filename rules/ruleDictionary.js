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
    }
}