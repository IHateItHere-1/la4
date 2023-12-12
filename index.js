const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
require('canvas-confetti');

var app = express();
app.set("view engine", "ejs");

let notes = [];
notes.push({
    text: "aaaa",
    color: "Red",
    UID: crypto.randomUUID()
});

notes.push({
    text: "aaaa",
    color: "Red",
    UID: crypto.randomUUID()
});

notes.push({
    text: "aaaa",
    color: "Red",
    UID: crypto.randomUUID()
});

app.post('/add/:text/:col', (req, res) => 
{
    notes.push({
        text: req.params.text,
        color: req.params.col,
        UID: crypto.randomUUID()});
})

app.post('/del/:UID', (req, res) => 
{
    notes.pop(notes.find(x => x.UID == req.params.UID));
})

app.get('/rel', (req, res) => {
    res.redirect('/')
  })

app.get('/getMeme', async (req, res) => {

        console.log("await")
        const response = await axios.get('https://api.imgflip.com/get_memes');
        
        console.log(response)
        const mama = response.data.data.memes;  
        const randomIndex = Math.floor(Math.random() * mama.length);
        const randomMeme = mama[randomIndex];    
        //console.log('Random Coding Meme:', randomMeme.url);
        res.set('Content-Type', 'text/html');
        res.send(randomMeme.url)
     
})

app.get('/', (req, res) => {
    res.render('index', { data: notes})
  })

app.listen(8080);