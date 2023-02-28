const express = require("express");
const router = express.Router();
const withAuth = require("../../util/auth");

const BlogPosts = require("../../models/BlogPosts");
//this route gets all o f the blogposts that belong to the user associated with the dashboard
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
    style: 'dashboard.css'
  });
});

router.post("/", withAuth, async (req, res) => {
  await BlogPosts.create({
    title: req.body.blogposttitle,
    contents: req.body.blogpostcontent,
    user_id: req.session.user_id,
  });
  res.redirect("back");
});
//this route will pull up the blogpost that you click edit on and the handlebar fills the text boxes with the previous blogpost 
router.get("/:id", withAuth, async (req, res) => {
  let post = await BlogPosts.findOne({
    where: {
      id: req.params.id,
    },
  });
  post = post.get({ plain: true });
  res.render("editblogposts", {
    post,
  });
});
// this route gives the ability to change the text and save it, which takes you back to the dashboard with the updated post displayed
router.put("/:id", withAuth, async (req, res) => {
  await BlogPosts.update(
    {
      title: req.body.blogposttitle,
      contents: req.body.blogpostcontent,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.redirect("/dashboard");
});
//this route simply lets you delete the post refreshing the page without the deleted post
router.delete('/:id', async (req, res) => {
    
     await BlogPosts.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect("/dashboard");
  });

module.exports = router;
