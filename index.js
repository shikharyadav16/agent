const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const { connectToDb } = require("./Connection")
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const { restrictToLogin } = require("./middlewares/auth");

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", userRoutes);
app.use("/", restrictToLogin, mainRoutes);

const port = 3000 || process.env.PORT;
app.listen(port, ()=> {
    console.log("Server is running at port", port);
});

