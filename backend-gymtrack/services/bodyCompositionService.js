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

exports.getBodyCompositions = async (userId) => {
    try {
        const bodyCompositions = await bodyCompoistionRepository.findBodyCompositionsByUserId(userId);

        let mappedBodyCompositions = [];
        if (Array.isArray(bodyCompositions)) {
            mappedBodyCompositions = bodyCompositions.map(comp => mapBodyCompToViewModel(comp));
        } else {
            mappedBodyCompositions = mapBodyCompToViewModel(bodyCompositions);
        }
        return mappedBodyCompositions;
    } catch (error) {
        console.error("Error fetching body compositions:", error);
        throw error; // Propagate the error to the controller
    }
}

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