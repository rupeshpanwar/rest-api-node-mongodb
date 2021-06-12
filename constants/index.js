module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    productMessage: {
        PRODUCT_CREATED: 'product successfully created',
        PRODUCT_FETCHED: 'products fetched successfully',
        PRODUCT_NOT_FOUND: 'product not found',
        PRODUCT_UPDATED: 'product updated successfully',
        PRODUCT_DELETED: 'products deleted successfully'
    },
    userMessage: {
        SIGNUP_SUCCESS: 'user signed up successfully',
        DUPLICATE_EMAIL: 'user with this email already exists',
        LOGIN_SUCCESS: 'login successfully',
        USER_NOT_FOUND: 'user not found',
        INVALID_PASSWORD: 'incorrect password'
    },
    requestValidationMessage: {
        BAD_REQUEST: 'Invalid field'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    }

}