const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function migrateTags() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({
            $or: [
                { tag: { $exists: false } },
                { tag: null },
                { tag: { $regex: /^.{0,3}$/ } },
                { tag: { $regex: /^.{5,}$/ } }
            ]
        });

        console.log(`Found ${users.length} users with invalid or missing tags.`);

        for (const user of users) {
            const oldTag = user.tag;
            user.tag = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            await user.save();
            console.log(`Updated user ${user.name}: ${oldTag} -> ${user.tag}`);
        }

        console.log('Migration completed.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrateTags();
