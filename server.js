const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import the padham service
const { calculatePadham } = require('./padhamService');

// Import the models
const Vaaramu = require('./models/Vaaramu.model');
const Tithi = require('./models/Tithi.model');
const Nakshatramu = require('./models/Nakshatramu.model');
const Aayam = require('./models/Aayam.model');
const Amsa = require('./models/Amsa.model');
const Dikhpati = require('./models/Dikhpati.model');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://harshavignyan:Aharshav%259@atlascluster.9lqzz.mongodb.net/SVJ?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB Atlas');

        // Test connection for each collection
        const testCollectionConnection = async (model, collectionName) => {
            try {
                const sampleDoc = await model.findOne({}).exec();
                if (!sampleDoc) {
                    console.log(`Connected to ${collectionName}, but no documents found.`);
                }
            } catch (error) {
                console.error(`Error fetching from ${collectionName}:`, error);
            }
        };

        await testCollectionConnection(Vaaramu, 'Vaaramu');
        await testCollectionConnection(Tithi, 'Tithi');
        await testCollectionConnection(Nakshatramu, 'Nakshatramu');
        await testCollectionConnection(Aayam, 'Aayam');
        await testCollectionConnection(Amsa, 'Amsa');
        await testCollectionConnection(Dikhpati, 'Dikhpati');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Function to fetch corresponding values from a single document in MongoDB collections
const fetchDocumentValue = async (model, key, collectionName) => {
    try {
        const document = await model.findOne({ [`${key}`]: { $exists: true } }).exec();
        if (document) {
            const value = document[key];
            return { key, value: value || null };  // Return key and value
        }
        return { key, value: null };
    } catch (error) {
        console.error(`Error fetching from ${collectionName}:`, error);
        return { key, value: null };
    }
};

// Route for calculating padham and fetching from collections
app.post("/padham", async (req, res) => {
    const { lengthFeet, lengthInches, widthFeet, widthInches } = req.body;

    // Use the padham service to calculate values
    const result = calculatePadham(lengthFeet, lengthInches, widthFeet, widthInches);

    try {
        // Fetch corresponding values from MongoDB collections using the DB values
        const vaaramuResult = await fetchDocumentValue(Vaaramu, result._vaaramuDB.toString(), 'Vaaramu');
        const tithiResult = await fetchDocumentValue(Tithi, result._tithiDB.toString(), 'Tithi');
        const nakshatramuResult = await fetchDocumentValue(Nakshatramu, result._nakshatramuDB.toString(), 'Nakshatramu');
        const aayamResult = await fetchDocumentValue(Aayam, result._aayamDB.toString(), 'Aayam');
        const amsaResult = await fetchDocumentValue(Amsa, result._amsaDB.toString(), 'Amsa');
        const dikhpatiResult = await fetchDocumentValue(Dikhpati, result._dikhpatiDB.toString(), 'Dikhpati');

        // Prepare response with display values and fetched data
        const response = {
            ...result,
            vaaramu: { ...vaaramuResult, key: result.vaaramu }, // Use display value for key
            tithi: { ...tithiResult, key: result.tithi },
            nakshatramu: { ...nakshatramuResult, key: result.nakshatramu },
            aayam: { ...aayamResult, key: result.aayam },
            amsa: { ...amsaResult, key: result.amsa },
            dikhpati: { ...dikhpatiResult, key: result.dikhpati }
        };

        // Remove the DB lookup fields from the response
        delete response._vaaramuDB;
        delete response._tithiDB;
        delete response._nakshatramuDB;
        delete response._aayamDB;
        delete response._amsaDB;
        delete response._dikhpatiDB;

        res.json(response);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
