const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   PUT api/users/profile
// @desc    Update user profile (note, photoUrl, etc)
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { note, photoUrl, name, motto, focusArea } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (note !== undefined) profileFields.note = note;
    if (photoUrl) profileFields.photoUrl = photoUrl;
    if (motto !== undefined) profileFields.motto = motto;
    if (focusArea !== undefined) profileFields.focusArea = focusArea;

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/friends
// @desc    Get user's actual friends
// @access  Private
router.get('/friends', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', '-password');
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/search
// @desc    Search for users to add as friends by Name#1234
// @access  Private
router.get('/search', auth, async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.json([]);

        let filter = { _id: { $ne: req.user.id } };

        // Check if query contains '#'
        if (query.includes('#')) {
            const [namePart, tagPart] = query.split('#');
            if (namePart && tagPart && tagPart.length === 4) {
                filter = {
                    ...filter,
                    name: { $regex: new RegExp('^' + namePart.trim() + '$', 'i') },
                    tag: tagPart.trim()
                };
            } else {
                // If format is wrong (e.g. no tag after #), return empty to avoid confusion
                return res.json([]);
            }
        } else {
            // Just search by name if no hash provided
            filter.name = { $regex: query, $options: 'i' };
        }

        const users = await User.find(filter).select('-password').limit(10);
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users/friends/:id
// @desc    Add a user as a friend
// @access  Private
router.post('/friends/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friendId = req.params.id;

        // Use some() with toString() for robust comparison of ObjectIds
        const alreadyFriend = user.friends.some(id => id.toString() === friendId);

        if (!alreadyFriend) {
            user.friends.push(friendId);
            await user.save();
        }
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users/journals
// @desc    Add a new journal entry
// @access  Private
router.post('/journals', auth, async (req, res) => {
    const { text, date } = req.body;
    if (!text) {
        return res.status(400).json({ msg: 'Text is required' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const newEntry = {
            text,
            date: date ? new Date(date) : new Date()
        };

        user.journals.unshift(newEntry);
        await user.save();

        res.json(user.journals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

// Helper function to calculate and update progress
async function updateProgress(userId) {
    const user = await User.findById(userId);
    if (!user || user.tasks.length === 0) {
        if (user) {
            user.totalTasks = 0;
            user.tasksCompleted = 0;
            user.progress = 0;
            await user.save();
        }
        return;
    }

    const totalTasks = user.tasks.length;
    const tasksCompleted = user.tasks.filter(t => t.completed).length;
    const progress = Math.round((tasksCompleted / totalTasks) * 100);

    user.totalTasks = totalTasks;
    user.tasksCompleted = tasksCompleted;
    user.progress = progress;
    await user.save();
}

// @route   GET api/users/tasks
// @desc    Get user's tasks
// @access  Private
router.get('/tasks', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users/tasks
// @desc    Add a task
// @access  Private
router.post('/tasks', auth, async (req, res) => {
    try {
        const { text } = req.body;
        const user = await User.findById(req.user.id);
        user.tasks.push({ text });
        await user.save();
        await updateProgress(req.user.id);

        // Re-fetch to get updated user with metrics
        const updatedUser = await User.findById(req.user.id);
        res.json({
            tasks: updatedUser.tasks,
            progress: updatedUser.progress,
            tasksCompleted: updatedUser.tasksCompleted,
            totalTasks: updatedUser.totalTasks
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/tasks/:id
// @desc    Toggle task completion
// @access  Private
router.put('/tasks/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const task = user.tasks.id(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.completed = !task.completed;
        await user.save();
        await updateProgress(req.user.id);

        const updatedUser = await User.findById(req.user.id);
        res.json({
            tasks: updatedUser.tasks,
            progress: updatedUser.progress,
            tasksCompleted: updatedUser.tasksCompleted,
            totalTasks: updatedUser.totalTasks
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/users/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.tasks.pull(req.params.id);
        await user.save();
        await updateProgress(req.user.id);

        const updatedUser = await User.findById(req.user.id);
        res.json({
            tasks: updatedUser.tasks,
            progress: updatedUser.progress,
            tasksCompleted: updatedUser.tasksCompleted,
            totalTasks: updatedUser.totalTasks
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
