const express = require('express');
const fs = require("fs")


const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send(`<html><form id="form" action="/" method="POST" onsubmit="localStorage.setItem('name', document.getElementById('name').value)"><input type="text" name="name" id="name" placeholder="Your Name"><input type="submit" value="submit"></form></html> `);
});



router.get('/', (req, res, next) => {
    res.send('<h1>Welcome to the chat App<h1>');
});

router.post('/', (req, res, next) => {

    const data = req.body;
    const name = data.name;
    const message = data.message;
    
    let item = name + ': ' + message;
    if (message !== undefined) {
        console.log(item);
        fs.appendFile('message.txt', item + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    }

    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            data = ''; // Set data to an empty string if there's an error.
        }

        // const messages = data.split('\n');
        
        // const messageList = messages.map(message => `<li>${message}</li>`).join('');
        
        res.send(`
            <h1>Welcome to the chat App<h1>
            <p>${data}</p>
            <form action="/" method="POST" onsubmit="document.getElementById('name').value=localStorage.getItem('name')">
                <input type="text" name="message" id="message" placeholder="Your Message">
                <input type="hidden" name="name" id="name">
                <input type="submit" value="submit">
            </form>
        `);
    });
});

module.exports = router