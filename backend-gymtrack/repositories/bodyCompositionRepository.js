const BodyComposition = require("../models/BodyComposition")

exports.createBodyComposition = (bodyCompositionData) => BodyComposition.create(bodyCompositionData);

exports.findBodyCompositionsByUserId = async (userId) => {
    return BodyComposition.findAll({
        where: { user_id: userId },
        order: [['date', 'DESC']] // Order by creation date, most recent first
    });
}

exports.deleteBodyComposition = async (userId, bodyCompositionId) => {
    const result = await BodyComposition.destroy({
        where: {
            id: bodyCompositionId,
            user_id: userId
        }
    });
    return result > 0; // Returns true if a record was deleted, false otherwise
}

exports.updateBodyComposition = async (userId, bodyCompositionId, bodyCompositionData) => {
    const [updatedRowsCount] = await BodyComposition.update(bodyCompositionData, {
        where: {
            id: bodyCompositionId,
            user_id: userId
        }
    });

    if (updatedRowsCount > 0) {
        return await BodyComposition.findOne({
            where: {
                id: bodyCompositionId,
                user_id: userId
            }
        });
    } else {
        return null;
    }
}
    