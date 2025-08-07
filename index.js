const express = require("express");
const path = require("path");
const app = express();

const { connectToDb } = require("./Connection")
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes")

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", mainRoutes);
app.use("/", userRoutes);

const port = 3000 || process.env.PORT;
app.listen(port, ()=> {
    console.log("Server is running at port", port);
});

