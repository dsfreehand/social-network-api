import Group from "../models/Group.js"; // Make sure to import the Group model
// GET All Groups with populated users
export const getAllGroups = async (_req, res) => {
    try {
        const groups = await Group.find().populate("users");
        res.json(groups);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
// GET Group by ID with populated users
export const getGroupById = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId).populate("users");
        if (group) {
            res.json(group);
        }
        else {
            res.status(404).json({ message: "Group not found" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
// POST Create a new group
export const createGroup = async (req, res) => {
    try {
        const { name, isPrivate, users } = req.body;
        const newGroup = new Group({ name, isPrivate, users });
        await newGroup.save();
        res.status(201).json(newGroup);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
// PUT Update a group by ID
export const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByIdAndUpdate(groupId, req.body, {
            new: true,
        }).populate("users");
        if (group) {
            res.json(group);
        }
        else {
            res.status(404).json({ message: "Group not found" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
// DELETE Group by ID
export const deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByIdAndDelete(groupId);
        if (group) {
            res.json({ message: "Group successfully deleted" });
        }
        else {
            res.status(404).json({ message: "Group not found" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
