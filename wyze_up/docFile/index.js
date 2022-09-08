const express = require("express");

const cors = require("cors");

const app = express();
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const podcastsRoute = require("./routes/podcasts");
const articleRoute = require("./routes/articles");
const careerRoute = require("./routes/careers");
const subscriptionRoute = require("./routes/subscriptions");
const saveRoute = require("./routes/saves");

app.set("port", process.env.PORT || 6000);
app.use(express.json());
app.use(express.static("Public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/" + "public/index.html");
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
})

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/careers", careerRoute);
app.use("/podcasts", podcastsRoute);
app.use("/articles", articleRoute);
app.use("/subscriptions", subscriptionRoute);
app.use("/saves", saveRoute)

app.use(cors({
    origin: ["http://10.0.0.44:8080/", "http://localhost:8080/"], credentials: true,
}));

app.listen(app.get("port"), () => {
    console.log(`Awaiting the call on(${PORT})`);
    console.log("Press CTRL+C to exit the Server");
    credentials: "include"
});

module.exports = {devServer: {Proxy: "*"}};