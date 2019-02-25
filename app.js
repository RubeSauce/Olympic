const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/',(req, res) => {
    res.send('Hello!');
});

app.post('/answer',(req, res) => {
    res.send("Thank you for your answer!");
    console.log(`IP address ${req.ip} voted for ${req.body.tvShow}`);    
})

app.listen(3000, () => {
    console.log('Server started...');
});