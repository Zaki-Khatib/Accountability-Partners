const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const auth = require('../middleware/auth');
const User = require('../models/User');

const client = new OAuth2Client('900192583944-8anmvmd34145psnnh9ri5aco76mcbqfg.apps.googleusercontent.com');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET is missing from environment variables!');
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const generateTag = () => Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        user = new User({
            name,
            email,
            password,
            tag: generateTag(),
            photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    console.error('JWT Signing Error:', err);
                    return res.status(500).json({ msg: 'Token generation failure' });
                }
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('REGISTRATION ERROR STACK:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/me
// @desc    Get logged in user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/google
// @desc    Authenticate with Google
// @access  Public
router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '900192583944-8anmvmd34145psnnh9ri5aco76mcbqfg.apps.googleusercontent.com',
        });
        const payloadParams = ticket.getPayload();

        let user = await User.findOne({ email: payloadParams.email });

        const generateTag = () => Math.floor(1000 + Math.random() * 9000).toString();

        if (!user) {
            // Register them automatically
            user = new User({
                name: payloadParams.name,
                email: payloadParams.email,
                password: await bcrypt.hash(Date.now().toString(), 10), // Random placeholder password
                photoUrl: payloadParams.picture,
                tag: generateTag(),
                googleId: payloadParams.sub
            });
            await user.save();
        } else {
            // Ensure existing users have a 4-digit tag
            let updated = false;
            if (!user.tag || user.tag.length !== 4) {
                user.tag = generateTag();
                updated = true;
            }
            if (!user.googleId) {
                user.googleId = payloadParams.sub;
                updated = true;
            }
            if (!user.photoUrl || user.photoUrl.includes('dicebear')) {
                user.photoUrl = payloadParams.picture;
                updated = true;
            }
            if (updated) await user.save();
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, jwtToken) => {
                if (err) throw err;
                res.json({ token: jwtToken });
            }
        );
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.status(401).json({ msg: 'Google Auth failed' });
    }
});

module.exports = router;
