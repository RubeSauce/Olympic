const express = require('express');
const app = express();
const fs = require('fs');
let students = [];
let events = [];

fs.readFile('students.json', async (err, data) => {
students = await JSON.parse(data);
});

fs.readFile('events.json', async (err, data) => {
events = await JSON.parse(data);
});



app.use(express.static('public'));
app.use(express.json());

app.post('/answer',(req, res) => {
    
 let events = {
     "true":true,
     "event":"event"
 }
    
if (students.some(st => st['Student_Number'] == req.body.Student_Number && st['First_Name'] == req.body.First_Name && st['Last_Name'] == req.body.Last_Name && st['Grade_Level'] == req.body.Grade_Level )) {
    console.log("yeet");
    
    res.send(events);

    
}
    else if (students.some(st => st['Student_Number'] != req.body.Student_Number && st['First_Name'] != req.body.First_Name && st['Last_Name'] != req.body.Last_Name && st['Grade_Level'] != req.body.Grade_Level )){
        console.log("not yeet");
        
        
        
    }
    else {
    console.log(`${req.body.answer}`); 
    students.push(req.body.answer);
    console.log(movies);
        
    }    
    

});

app.listen(3000, () => {
    console.log('Server started...');
});