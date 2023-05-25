const express = require('express');
const router = express.Router();

// Placeholder arrays for data
let users = [];
let thoughts = [];

// Create a user
router.post('/users', (req, res) => {
  const { username } = req.body;
  const newUser = { id: users.length + 1, username, thoughts: [] };
  users.push(newUser);
  res.json(newUser);
});

// Get all users
router.get('/users', (req, res) => {
  res.json(users);
});

// Create a thought
router.post('/thoughts', (req, res) => {
  const { userId, thoughtText } = req.body;
  const newThought = { id: thoughts.length + 1, userId, thoughtText };
  thoughts.push(newThought);
  // Add the thought to the user's thoughts array
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.thoughts.push(newThought);
  }
  res.json(newThought);
});

// Get all thoughts
router.get('/thoughts', (req, res) => {
  res.json(thoughts);
});

// Add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', (req, res) => {
  const { thoughtId } = req.params;
  const { reaction } = req.body;
  const thought = thoughts.find((thought) => thought.id === parseInt(thoughtId));
  if (thought) {
    thought.reaction = reaction;
    res.json(thought);
  } else {
    res.status(404).json({ message: 'Thought not found' });
  }
});

// Add a friend
router.post('/users/:userId/friends', (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;
  const user = users.find((user) => user.id === parseInt(userId));
  if (user) {
    user.friends.push(friendId);
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;