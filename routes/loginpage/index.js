const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
res.render('loginpage', {
    style: 'loginpage.css'
})
});



module.exports = router;