const { mapBodyCompToDatabaseModel, mapBodyCompToViewModel } = require("../mapper/bodyCompMapper");
const bodyCompoistionRepository = require("../repositories/bodyCompositionRepository");

exports.createBodyComposition = async (bodyCompositionData) => {
    try {
        const bodyComposition = await bodyCompoistionRepository.createBodyComposition(mapBodyCompToDatabaseModel(bodyCompositionData));
        return mapBodyCompToViewModel(bodyComposition);
    } catch (error) {
        console.error("Error creating body composition:", error);
        throw error; // Propagate the error to the controller
    }
}

exports.getBodyCompositions = async (userId, page, limit, term) => {
    try {
        const { results, totalCount } = await bodyCompoistionRepository.findBodyCompositionsByUserId(userId, page, limit, term);

        const mappedBodyCompositions = Array.isArray(results)
            ? results.map(mapBodyCompToViewModel)
            : [];

        const totalPages = Math.ceil(totalCount / limit);

        return {
            data: mappedBodyCompositions,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        console.error("Error fetching body compositions:", error);
        throw error;
    }
};

exports.deleteBodyComposition = async (userId, bodyCompositionId) => {
    try {
        const result = await bodyCompoistionRepository.deleteBodyComposition(userId, bodyCompositionId);
        if (result) {
            return true; // Successfully deleted
        } else {
            return false; // Body composition not found
        }
    } catch (error) {
        console.error("Error deleting body composition:", error);
        throw error; // Propagate the error to the controller
    }
}

exports.updateBodyComposition = async (bodyCompositionData) => {
    try {
        const updatedBodyComposition = await bodyCompoistionRepository.updateBodyComposition(bodyCompositionData.userId, bodyCompositionData.id, mapBodyCompToDatabaseModel(bodyCompositionData));
        console.log("Updated body composition:", updatedBodyComposition);
        if (updatedBodyComposition) {
            return mapBodyCompToViewModel(updatedBodyComposition);
        } else {
            return null; // Body composition not found
        }
    } catch (error) {
        console.error("Error updating body composition:", error);
        throw error; // Propagate the error to the controller
    }
}