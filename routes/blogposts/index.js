const express = require("express");
const router = express.Router();
const withAuth = require("../../util/auth");
const { BlogPosts, Users, Comment } = require("../../models");

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
  console.log(blogPost);

  res.render("blogposts", {
    blogPost,
    style: "blogposts.css",
  });
});

router.post("/:id", async (req, res) => {
  await Comment.create({
    contents: req.body.comment,
    user_id: req.session.user_id,
    blogpost_id: req.params.id,
  });
  res.redirect("back");
});


module.exports = router;
