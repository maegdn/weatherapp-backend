var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

const OWM_API_KEY = 'ce7418650c86eae6629dfcfdda141c14';

router.post('/signup', (req, res) => {
//checks saisie post correcte
// if (!req.body.password || !req.body.email){
//    return  res.json( {result: false, error:'Missing or empty fields'} )
// }

if (!checkBody(req.body, ['name', 'email', 'password'])) {
    return  res.json( {result: false, error:'Missing or empty fields'})
}

    //checks user doesnt exist
User.findOne({email: req.body.email})
.then(data => {
if (data === null) { // adds user if not existing
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save()
    .then(() => {
        res.json({ result: true, message: "User has been created."}) //user added msg
    })
} else {
    res.json( {result: false, error:'User already exists '} ) // user already exists
}
})
})


router.post('/signin', (req, res) => {
    // if (!req.body.email || !req.body.password){
    //     return  res.json( {result: false, error:'Missing or empty fields '} )
    //  }

    if (!checkBody(req.body, ['email', 'password'])) {
        return  res.json( {result: false, error:'Missing or empty fields'})
    }

User.findOne({email: req.body.email, password: req.body.password})
.then(data => {
    if (!data) {
        res.json({result: false, error: 'user not found'})
    } else {
        res.json({result: true})

    }
})
})


module.exports = router;

// test ariane
// ariane test week8/weatherapp-part4