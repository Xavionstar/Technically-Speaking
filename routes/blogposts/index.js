const express = require("express");
const router = express.Router();
const withAuth = require("../../util/auth");
const { BlogPosts, Users, Comment } = require("../../models");
//this route will pull up one blogpost by the user id
router.get("/:id", withAuth, async (req, res) => {
  let blogPost = await BlogPosts.findOne({
    include: [
      Users,
      {
        model: Comment,
        include: Users,
      },
    ],
    where: {
      id: req.params.id,
    },
  });

  blogPost = blogPost.get({ plain: true });
//the res.render tells the route to display the handlebar data, in this case the main layout, everything in the specific blogpost body, the blogpost variable defined above and the css styling
    res.render("blogposts", {
    blogPost,
    style: "blogposts.css",
  });
});
//this route creates a new blogpost and tells it where to get the information it needs to do so, the req.body, the session or the params, and the redirects back to the page to show the new post
router.post("/:id", async (req, res) => {
  await Comment.create({
    contents: req.body.comment,
    user_id: req.session.user_id,
    blogpost_id: req.params.id,
  });
  res.redirect("back");
});



module.exports = router;
