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
app.use("/pethub/member", require("./router/user/member"));

// Product
app.use("/pethub/product", require("./router/product/index"));
app.use("/pethub/product/store", require("./router/product/product.store"));
// Brand
app.use("/pethub/brand", require("./router/brand/index"));

// Shop
app.use("/pethub/shop", require("./router/shop/index"));
// Stock
app.use("/pethub/stock", require("./router/shop/stock"));

// Order
app.use("/pethub/order", require("./router/pos/order"));

// POS
app.use("/pethub/preorder/shop", require("./router/pos/preorder.shop"));
app.use("/pethub/invoice-tax", require("./router/pos/invoice.tax"));

const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`\n-- Listening on port ${port}  --\n`)
});