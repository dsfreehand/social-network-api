const names = [
    //TODO add names that can act as either a first or last name
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Jamie",
    "Riley",
    "Avery",
    "Cameron",
    "Skyler",
    "Quinn",
    "Peyton",
    "Drew",
    "Sage",
    "Emerson",
    "Finley",
    "Reese",
    "Rowan",
    "Dakota",
    "Hayden",
];
const posts = [
    //TODO: add possible things people would say or do on a social media app
    "Went on a hike!",
    "Just finished a great book!",
    "Had a delicious dinner at a new restaurant.",
    "Started a new workout routine.",
    "Visited a museum and learned something new.",
    "Caught up with an old friend over coffee.",
    "Tried a new recipe and it turned out amazing!",
    "Watched a movie that I can't stop thinking about.",
    "Attended a concert and it was incredible!",
    "Binge-watched a new series on Netflix.",
    "Went to a local farmers market and bought fresh produce.",
    "Took a spontaneous road trip to the beach.",
    "Joined a new class or workshop to learn something new.",
    "Started a new hobby or project at home.",
    "Went to a local event or festival and had a blast.",
    "Spent a relaxing day at the spa.",
    "Took a yoga or meditation class to unwind.",
    "Went for a long walk or run in nature.",
    "Visited a new city or town and explored.",
    "Had a fun game night with friends.",
    "Tried a new coffee shop and loved it.",
    "Went to a local art gallery and appreciated the work.",
    "Had a productive day at work or school.",
    "Spent time volunteering for a good cause.",
];
// Get a random item given an array
export const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Gets a random full name
export const getRandomName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
// Function to generate random assignments that we can add to student object.
export const getRandomPosts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            content: getRandomArrItem(posts), // now becomes the post or status
            timestamp: new Date(), // or use a randomized timestamp
        });
    }
    return results;
};
