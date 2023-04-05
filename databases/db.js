const mongoose = require('mongoose');
const MONGO_URL  = process.env.DATABASE;
// const MONGO_URL = 'mongodb://192.168.150.227:27017/db_login'


const connectDB = async () => {
    try {
        mongoose.set("debug", true);
        mongoose.set('strictQuery', true);
        console.log("DB::::", MONGO_URL)
        await mongoose.connect(MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log("Successfully connected to database");
    } catch (err) {

        console.log("Error connecting to databases:", err)
        process.exit(1)
    }
}

// const connectDB = async () => {
//     mongoose.set("debug", true);
//     mongoose.set('strictQuery', true);
//     const conn = await mongoose.connect(
//         'mongodb://127.0.0.1/Mydb', {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,

//       })
//       .then(() => {
//           console.log("Successfully connected to database");
//       })
//       .catch(error => {
//           console.log("Error connecting to databases:",error)
//       });


// };

module.exports = connectDB