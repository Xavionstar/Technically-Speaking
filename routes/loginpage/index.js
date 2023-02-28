const express = require('express');
const { Users } = require('../../models');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
res.render('loginpage', {
    style: 'loginpage.css'
})
});
//this route will allow them to log in if their email and password are in the users database , if not they will get the incorrect email/pw message
router.post('/', async (req, res) => {
    
    try {
        
      const userData = await Users.findOne({
         where: { 
            email: req.body.email 
        } 
    });
   
      if (!userData) {
        res.status(400).json(
            { 
                message: 'Incorrect email or password, please try again' 
            }
            );
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
       
      if (!validPassword) {
        res
          .status(400)
          .json(
            { 
                message: 'Incorrect email or password, please try again' 
            }
            );
        return;
      }
  //this saves the session so they arent challenged each time they change pages
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.redirect('/dashboard');
      });
  
    } catch (err) {
        console.error(err)
      res.status(400).json(err);
    }
  });
//this route will create a new user with the email and password 
  router.post("/user", async (req, res) => {
    
    let newUser = await Users.create({
      email: req.body.signUpEmail,
      password: await bcrypt.hash(req.body.signUpPassword, 10)
    });
    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
    
    res.redirect("/dashboard");
  })
});
  
  
  
  

module.exports = router;