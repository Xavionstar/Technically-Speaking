const express = require('express');
const app = express();
const PORT = process.env.PORT || 1234;
const login = require('./routes/loginpage');
const dashboard = require('./routes/dashboard');
;

const handlebars = require('express-handlebars');
const hbs = handlebars.create();

app.set('view engine', 'handlebars');
app.set('views', './views' )
app.engine('handlebars', hbs.engine);

app.use('/loginpage', login);
app.use('/dashboard', dashboard);

app.use(express.static('styles'));


app.get('/', (req, res) => {
    res.render("homepage", {
        style: 'homepage.css'
    })
    });




    

app.listen(`${PORT}`);