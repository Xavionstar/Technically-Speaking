const express = require("express");
const app = express();
const PORT = process.env.PORT || 1234;
const login = require("./routes/loginpage");
const dashboard = require("./routes/dashboard");
const sequelize = require("./config/connection");
const { Posts, Users } = require("./models");
const handlebars = require("express-handlebars");
const { post } = require("./routes/loginpage");
const hbs = handlebars.create();

app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", hbs.engine);

app.use("/loginpage", login);
app.use("/dashboard", dashboard);

app.use(express.static("styles"));

app.get("/", async (req, res) => {
  let postData = await Posts.findAll();
  postData = postData.map((singlePostData) =>
    singlePostData.get({ plain: true })
  );
  
  console.log(postData)
  res.render("homepage", {
    style: "homepage.css",
    posts: postData

  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
