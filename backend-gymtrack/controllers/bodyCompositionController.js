const bodyCompositionService = require('../services/bodyCompositionService');

exports.createBodyComposition = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(400).json({ message: "No user ID provided" });
    }

    // Validate request body
    if (!req.body.weight || !req.body.bodyFat || !req.body.muscleMass) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    const payload = {
        ...req.body,
        userId // Add user_id to the payload
    };

    try {
        const bodyComposition = await bodyCompositionService.createBodyComposition(payload);
        return res.status(201).json(
            bodyComposition
        );
    } catch (error) {
        console.error("Error creating body composition:", error);
        return res.status(500).json({ message: "Failed to create body composition" });
    }
}

exports.getBodyCompositions = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(400).json({ message: "No user ID provided" });
    }

    const page = parseInt(req.query.page) || 1;
    const term = req.query.term || '';
    const limit = parseInt(req.query.limit) || 20;

    try {
        const bodyCompositions = await bodyCompositionService.getBodyCompositions(userId, page, limit, term);
        return res.status(200).json(bodyCompositions);
    } catch (error) {
        console.error("Error fetching body compositions:", error);
        return res.status(500).json({ message: "Failed to fetch body compositions" });
    }
}

exports.deleteBodyComposition = async (req, res) => {
    const userId = req.user.userId;
    const bodyCompositionId = req.params.id;

    if (!userId || !bodyCompositionId) {
        return res.status(400).json({ message: "Invalid request parameters" });
    }

    try {
        const result = await bodyCompositionService.deleteBodyComposition(userId, bodyCompositionId);
        if (result) {
            return res.status(200).json({ message: "Body composition deleted successfully" });
        } else {
            return res.status(404).json({ message: "Body composition not found" });
        }
    } catch (error) {
        console.error("Error deleting body composition:", error);
        return res.status(500).json({ message: "Failed to delete body composition" });
    }
}

exports.updateBodyComposition = async (req, res) => {
    const userId = req.user.userId;
    const bodyCompositionId = req.params.id;

    if (!userId || !bodyCompositionId) {
        return res.status(400).json({ message: "Invalid request parameters" });
    }

    // Validate request body
    if (!req.body.weight || !req.body.bodyFat || !req.body.muscleMass) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    const payload = {
        ...req.body,
        userId, // Add user_id to the payload
        id: bodyCompositionId // Include the ID for updating
    };

    try {
        const updatedBodyComposition = await bodyCompositionService.updateBodyComposition(payload);
        if (updatedBodyComposition) {
            return res.status(200).json(updatedBodyComposition);
        } else {
            return res.status(404).json({ message: "Body composition not found" });
        }
    } catch (error) {
        console.error("Error updating body composition:", error);
        return res.status(500).json({ message: "Failed to update body composition" });
    }
}