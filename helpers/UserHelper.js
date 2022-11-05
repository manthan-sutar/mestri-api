var initModels = require("../models/init-models");
var models = initModels();

class UserHelper {
    async updateUser(userId, payload) {
        try {
            const user = await models.Users.update(
                payload,
                { where: { id: userId } }
            )
            return user;
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserHelper