const express = require("express");
const app = express();
const PORT = process.env.PORT || 1234;
const login = require("./routes/loginpage");
const dashboard = require("./routes/dashboard");
const blogposts = require("./routes/blogposts");
const sequelize = require("./config/connection");
const { BlogPosts } = require("./models");
const helpers = require('./util/helpers');
const session = require('express-session');
const handlebars = require("express-handlebars");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = handlebars.create({helpers});

const sesh = {
  secret: 'thisismysecret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", hbs.engine);

app.use(session(sesh));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("styles"));




app.use("/loginpage", login);
app.use("/dashboard", dashboard);
app.use("/blogposts", blogposts);



app.get("/", async (req, res) => {
  let postData = await BlogPosts.findAll();
  postData = postData.map((singlePostData) =>
    singlePostData.get({ plain: true })
  );

 
  res.render("homepage", {
    style: "homepage.css",
    posts: postData

  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
