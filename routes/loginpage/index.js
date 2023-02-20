const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
res.render('loginpage', {
    style: 'loginpage.css'
})
});

// router.get('/:username', (req, res) => {
//     res.send(`<h1> ${req.params.username}'s Profile </h1>`);
// });

module.exports = router;