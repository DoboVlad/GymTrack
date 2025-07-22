const BodyComposition = require("../models/BodyComposition")
const { Op, fn, col, where } = require("sequelize");

exports.createBodyComposition = (bodyCompositionData) => BodyComposition.create(bodyCompositionData);

exports.findBodyCompositionsByUserId = async (userId, page = 1, limit = 20, searchTerm = '') => {
    const offset = (page - 1) * limit;
    const isNumeric = !isNaN(searchTerm) && searchTerm.trim() !== '';

    const searchConditions = searchTerm
        ? {
            [Op.or]: [
                // Numeric fields use equality or casted LIKE
                ...(isNumeric ? [
                    { weight: parseFloat(searchTerm) },
                    { body_fat: parseFloat(searchTerm) },
                    { muscle_mass: parseFloat(searchTerm) },
                    { body_water: parseFloat(searchTerm) },
                    { bone_mass: parseFloat(searchTerm) },
                    { metabolic_age: parseInt(searchTerm) },
                ] : []),
                // String field - created_at (as text) supports LIKE
                where(fn('DATE_FORMAT', col('created_at'), '%Y-%m-%d'), {
                    [Op.like]: `%${searchTerm}%`
                })
            ]
        }
        : {};

    const whereClause = {
        user_id: userId,
        ...(
            Object.keys(searchConditions).length > 0
                ? { [Op.and]: [searchConditions] }
                : {}
        )
    };

    const [results, totalCount] = await Promise.all([
        BodyComposition.findAll({
            where: whereClause,
            limit,
            offset,
            order: [['created_at', 'DESC']],
        }),
        BodyComposition.count({
            where: whereClause
        })
    ]);

    return {
        results,
        totalCount
    };
};

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
