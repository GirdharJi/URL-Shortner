const express = require("express");
const app = express();
const url = require("./routes/url");
const createDB = require("./config/db");

createDB.sync().then(()=>{
    console.log("DB is connected");
})

const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/urlapi', url);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})