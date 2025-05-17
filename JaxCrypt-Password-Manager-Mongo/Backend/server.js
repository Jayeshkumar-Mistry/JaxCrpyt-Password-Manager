const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')
dotenv.config()


const port = 3000
app.use(bodyParser.json());
app.use(cors())


// Step 2: Define your MongoDB URL
const url = 'mongodb://localhost:27017/'; // for local MongoDB

// Step 3: Create a client object
const client = new MongoClient(url);
client.connect();

// Get paswword
app.get('/', async (req, res) => {
    const db = client.db('JaxCrypt'); // create/use a database
    const collection = db.collection('passwords'); // create/use a collection
    const result = await collection.find().toArray();
    res.json(result);
})

// Save Password

app.post('/', async (req, res) => {
    let password = req.body
    const db = client.db('JaxCrypt'); // create/use a database
    const collection = db.collection('passwords'); // create/use a collection
    const result = await collection.insertOne(password);
    res.send(req.body);
})


app.delete('/', async (req, res) => {
    let password = req.body
    const db = client.db('JaxCrypt'); // create/use a database
    const collection = db.collection('passwords'); // create/use a collection
    const result = await collection.deleteOne(password);
    res.send({ "success": true });
})



app.listen(port, () => {
    console.log(`Example app ldistning  port http//localhost:${port}`)
})
