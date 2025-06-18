const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

//this funciton is going to use in mongoDB
main()
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "679b0e31abd6b78ba00a9e7d"}))
    await Listing.insertMany(initData.data); //initdata is a objects
    console.log("Database initialized with sample data");
}
initDB();