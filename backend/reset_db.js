const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function resetData() {
    try {
        console.log('Connecting to MongoDB:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            console.log(`Dropping collection: ${collection.collectionName}`);
            await collection.drop();
        }

        console.log('Success: All data erased.');
        process.exit(0);
    } catch (err) {
        console.error('Error during reset:', err);
        process.exit(1);
    }
}

resetData();
