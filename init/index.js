const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require('../models/listing.js');

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(mongo_url);
}

const initDb = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"68a1c9906a03e7f9af7e6efd"}))
    await Listing.insertMany(initData.data);  // init data is a object
    console.log("data was initialized");
}

initDb();