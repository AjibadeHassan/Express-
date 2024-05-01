export const createValidationSchema = {
    username: {
        isString: true,
        notEmpty: {
            errorMessage: 'username cannot be empty',
        },
        isLength: {
            options:{
                min:5,
                nax: 32
            },
            errorMessage: 'between 5 - 32 characters',
        }
    },

    displayName: {
        isString: true,
        notEmpty: {
            errorMessage: 'displayName cannot be empty',
        },
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: 'between 5 - 32 characters',
        }
    }
}