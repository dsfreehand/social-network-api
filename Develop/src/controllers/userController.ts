import { ObjectId } from "mongodb";
import { User, Group } from "../models/index.js";
import { Request, Response } from "express";

// TODO: Create an aggregate function to get the number of users overall
export const headCount = async () => {
  try {
    const numberOfUsers = await User.aggregate([{ $count: "totalUsers" }]);
    return numberOfUsers[0]?.totalUsers || 0;
  } catch (error) {
    throw new Error("Failed to count users.");
  }
};

// Aggregate function for getting the overall grade using $avg
export const grade = async (userId: string) => {
  try {
    const result = await User.aggregate([
      {
        $match: { _id: new ObjectId(userId) },
      },
      {
        $unwind: "$posts",
      },
      {
        $group: {
          _id: "$_id",
          overallGrade: { $avg: "$posts.score" }, // Calculate average score of posts
        },
      },
    ]);
    return result[0]?.overallGrade || 0;
  } catch (error) {
    throw new Error("Failed to calculate grade.");
  }
};

/**
 * GET All users /users
 * @returns an array of users
 */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    // Including headCount in the response
    const userObj = {
      users,
      headCount: await headCount(),
    };

    res.json(userObj);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Error retrieving users",
    });
  }
};

/**
 * GET user based on id /users/:id
 * @param string id
 * @returns a single user object
 */
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json({
        user,
        grade: await grade(userId), // Include grade calculation
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Error retrieving user",
    });
  }
};

/**
 * POST user /users
 * @param object user
 * @returns a single user object
 */
export const createuser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user); // Use 201 for resource creation
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Error creating user",
    });
  }
};

/**
 * DELETE user based on id /users/:id
 * @param string id
 * @returns string
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "No such user exists" });
    }

    // Remove user from all associated groups
    await Group.updateMany(
      { users: req.params.userId },
      { $pull: { users: req.params.userId } }
    );

    return res.json({ message: "User successfully deleted" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Error deleting user",
    });
  }
};

/**
 * POST Post based on /users/:userId/posts
 * @param string userId
 * @param object post
 * @returns object user
 */
export const addPost = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { posts: req.body } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID :(" });
    }

    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message || "Error adding post",
    });
  }
};

/**
 * DELETE Post based on /users/:userId/posts/:postId
 * @param string postId
 * @param string userId
 * @returns object user
 */
export const removePost = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { posts: { postId: req.params.postId } } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID :(" });
    }

    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({
      message: err.message || "Error removing post",
    });
  }
};
