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
const methodOverride = require("method-override")

//this is the session parameters passed into the app.use(session) it has the info about the secret the cookie and the db that sequlize will generate to store sessions
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
//this app.set will tell it which view engine it should be using
app.set("view engine", "handlebars");
app.set("views", "./views");
app.engine("handlebars", hbs.engine);
//this app.use is something i had to find online, it allows you to use put and delete methods on the form tag becacuse html normally only allows post and get
app.use(methodOverride('_method'))
app.use(session(sesh));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//this tells the app where to get css styling
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
app.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
      
    });
  } else {
    res.status(404);
  }
});
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
