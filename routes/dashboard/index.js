const express = require("express");
const router = express.Router();
const withAuth = require('../../util/auth');

const BlogPosts = require("../../models/BlogPosts");

router.get("/", withAuth, async (req, res) => {

  let postData = await BlogPosts.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  postData = postData.map((singlePostData) =>
    singlePostData.get({ plain: true })
  );

  res.render("dashboard", {
    postData,
  });
});

module.exports = router;
