require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./config/db");
connection();

app.use(express.json());
app.use(cors());

app.use("/pethub", require("./router"));

// User
app.use("/pethub/admin", require("./router/user/admin"));
app.use("/pethub/employee", require("./router/user/employee"));

// Shop หรือ Stock
app.use("/pethub/shop", require("./router/shop/index"));

// Product
app.use("/pethub/product", require("./router/product/index"));

const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`\n-- Listening on port ${port}  --\n`)
});