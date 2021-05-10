const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    // used the below lines to remove the deprication error
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection successful");
}).catch((err) => console.log("no connection"));