const constants = require('../constants')
const userService = require('../service/userService')

module.exports.signup = async (req, res) => {
    let response = { ...constants.defaultServerResponse }
    try {
        const responseFromService = await userService.signup(req.body)

        response.status = 200
        response.message = constants.userMessage.SIGNUP_SUCCESS
        response.body = responseFromService

    } catch (error) {
        console.log('something went wrong:Controller:signup', error)
        throw new Error(error)
    }
    return res
        .status(response.status)
        .send(response)
}