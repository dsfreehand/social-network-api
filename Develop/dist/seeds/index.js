import db from "../config/connection.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import cleanDB from "./cleanDB.js";
import { getRandomName, getRandomPosts } from "./data.js";
try {
    await db();
    await cleanDB();
    // Define users array
    const users = [];
    const numUsers = 20;
    // Loop to create user data
    for (let i = 0; i < numUsers; i++) {
        const fullName = getRandomName();
        const firstName = fullName.split(" ")[0]; // Changed from 'first' to 'firstName'
        const lastName = fullName.split(" ")[1]; // Changed from 'last' to 'lastName'
        const username = `${firstName}${Math.floor(Math.random() * 99) + 18}`;
        // Add random posts to each user (Optional)
        const posts = getRandomPosts(3); // Add 3 random posts per user
        users.push({
            firstName,
            lastName,
            username,
            posts, // Assign posts to user
        });
    }
    // Create users in the database and await results
    const userData = await User.create(users);
    // Now, userData should contain user objects with their respective IDs
    console.log("User data saved:", userData); // Debugging
    // Create groups and assign users to each group randomly
    const groups = ["Nature Lovers", "Tech Enthusiasts", "Art Lovers"];
    for (const groupName of groups) {
        // Randomly select users for each group, ensuring at least 1 user in each group
        const randomUsers = userData
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * numUsers));
        // Debugging: Check which users are assigned to the group
        console.log(`Creating group "${groupName}" with users:`, randomUsers);
        // Create the group and assign the users (use _id)
        const group = await Group.create({
            name: groupName,
            inPerson: Math.random() < 0.5, // Randomize in-person or not
            users: randomUsers.map(({ _id }) => _id), // Use _id to reference users
        });
        console.log(`Group "${groupName}" created with users:`, group);
    }
    // Log out the seeded data to verify
    console.table(users);
    console.info("Seeding complete! 🌱");
    process.exit(0);
}
catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
}
