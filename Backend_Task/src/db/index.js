// import mongoose for database
// we need a function which connect tha db
// database is in other continent so it's take time
// error handling : what if conncection failed 
// export it to other files

import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

const connectDB = async() => {
    try {
        console.log("Attempting connect mongodb.")
        const connectMongoose = await mongoose.connect(process.env.DB_CONNECTION, {
            dbName: "taskmanager"
        })

        console.log(`✅ MongoDB Connected Successfully!`);
        console.log(`📊 Database: ${connectMongoose.connection.name}`);
        console.log(`🖥️ Host: ${connectMongoose.connection.host}`);

    } catch (error) {
        console.log("OOPS! Mongodb connection failed...", error)
        process.exit(1)
    }
}

export default connectDB;