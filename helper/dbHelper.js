const mongoose = require('mongoose')
const constants = require('../constants')
module.exports.formatMongoData = (data) => {
    if (Array.isArray(data)) {
        const newDataList = []
        for (value of data) {
            newDataList.push(value.toObject())
        }
        return newDataList
    }
    return data.toObject()
}

module.exports.checkValidId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(
            constants.databaseMessage.INVALID_ID
        )
    }
}