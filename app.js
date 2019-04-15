const express = require('express');
const app = express();
const fs = require('fs');
let students = [];
let events = [];
let freshman = [];
let sophmore = [];
let junior = [];
let senior = [];
let studentIndex;


fs.readFile('students.json', async (err, data) => {
    
students = await JSON.parse(data);

    
   // Clean Slate for Students Event choice
    
    /*for(let i =0;i<students.length;i++) {
        students[i].Event = "";
    }*/
    
    
    fs.readFile('events.json', async (err, data) => {
    
events = await JSON.parse(data);

    
   // Clean Slate for Students Event choice
    
    for(let i =0;i<events.length;i++) {
        events[i].Seniors = 0;
        events[i].Juniors = 0;
        events[i].Sophmores = 0;
        events[i].Freshmen = 0;
    }
    
    fs.writeFile('students.json',JSON.stringify(students),(err) => {
     
      if (err){
      console.warn(err);
      return;
      };
      console.log("file appended at line 21")
    });
  });     
});

fs.readFile('events.json', async (err, data) => {
events = await JSON.parse(data);

});

app.use(express.static('public'));
app.use(express.json());

  function gradeCheck() {
    let array = [];
    if (students[studentIndex].Grade_Level == 9) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Freshmen < events[i]["Per Grade"]) {
                array.push(events[i])
                
            }
        }
        console.log(array);
        return  array;
    }
        if (students[studentIndex].Grade_Level == 10) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Sophmores < events[i]["Per Grade"]) {
                array.push(events[i])
            }
        }
            console.log(array);
        return  array;
    }
        if (students[studentIndex].Grade_Level == 11) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Juniors < events[i]["Per Grade"]) {
                array.push(events[i])
            }
        }
            console.log(array);
        return  array;
    }
        if (students[studentIndex].Grade_Level == 12) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Seniors < events[i]["Per Grade"]) {
                array.push(events[i])
            }
        }
            
        return  array;
    }
}



 app.post('/answer',(req, res) => {
    
if (students.some(st => st['Student_Number'] == req.body.Student_Number && st['First_Name'] == req.body.First_Name && st['Last_Name'] == req.body.Last_Name && st['Grade_Level'] == req.body.Grade_Level )) {
    console.log("Successful");
   
    studentIndex = students.findIndex(student =>
     student.Student_Number == req.body.Student_Number
    )
                 gradeCheck();
                 
               /* console.log(students[studentIndex]);   */
                  res.send(events);

    
}
    else if (students.some(st => st['Student_Number'] != req.body.Student_Number && st['First_Name'] != req.body.First_Name && st['Last_Name'] != req.body.Last_Name && st['Grade_Level'] != req.body.Grade_Level )){
        console.log("Unsuccessful");
        
        res.status(404);
        res.send("bad info");
        
    }
    else {
    console.log(`${req.body.answer}`); 
    students.push(req.body.answer);
        
    }    
    

});
app.post('/event',(req, res) => {
    
    if (students[studentIndex].Event == ""){ 
    checkOpen()
    }
    else {
      checkOpen2()
    }
        
        
     function checkOpen() {
    
    if (students[studentIndex].Grade_Level == 9) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Freshmen < events[i]["Per Grade"]&& events[i].Event ==req.body.Event && students[studentIndex].Event != req.body.Event ) {
                events[i].Freshmen++;
                students[studentIndex].Event = req.body.Event;
                 console.log("Freshman");
            }
            else if (events[i].Freshmen >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
            
                }
        
    }
        if (students[studentIndex].Grade_Level == 10) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Sophmores < events[i]["Per Grade"]&& events[i].Event == req.body.Event && students[studentIndex].Event != req.body.Event ) {
                events[i].Sophmores++;
                students[studentIndex].Event = req.body.Event;
                console.log("Sophmore");
            }
            else if (events[i].Sophmores >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
        }
           
    }
        if (students[studentIndex].Grade_Level == 11) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Juniors < events[i]["Per Grade"]&& events[i].Event == req.body.Event && students[studentIndex].Event != req.body.Event ) {
                events[i].Juniors++;
                students[studentIndex].Event = req.body.Event;
                 console.log("Junior");
            }
            else if (events[i].Junior >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
        }
            
    }
        if (students[studentIndex].Grade_Level == 12) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].Seniors < events[i]["Per Grade"]&& events[i].Event == req.body.Event && students[studentIndex].Event != req.body.Event ) {
                events[i].Seniors++;
                students[studentIndex].Event = req.body.Event;
                 console.log("Senior");
            }
            else if (events[i].Junior >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
        }
            
       
    }
     }
     function checkOpen2() {
    
    if (students[studentIndex].Grade_Level == 9) {
        for (let i = 0; i < events.length; i++) {
            if (students[studentIndex].Event == events[i].Event ) {
                events[i].Freshmen--;
                
        
        for (let n = 0; n < events.length; n++) {
            
        if (events[n].Freshmen < events[n]["Per Grade"]&& events[n].Event ==req.body.Event && 
             students[studentIndex].Event != req.body.Event ) {
             events[n].Freshmen++;
                
            students[studentIndex].Event = req.body.Event;
            console.log("Freshman");
            }
            
        }
            }
            else if (events[i].Freshmen >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
            
                }
        
    
        if (students[studentIndex].Grade_Level == 10) {
        for (let i = 0; i < events.length; i++) {
            if (students[studentIndex].Event == events[i].Event ) {
                events[i].Sophmores--;
                        for (let n = 0; n < events.length; n++) {
            
        if (events[n].Sophmores < events[n]["Per Grade"]&& events[n].Event ==req.body.Event && 
             students[studentIndex].Event != req.body.Event ) {
             events[n].Sophmores++;
                
            students[studentIndex].Event = req.body.Event;
            console.log("Sophmores");
            }
            
        } 
            }
            else if (events[i].Sophmores >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
        }

    }
         
         
         
         
        if (students[studentIndex].Grade_Level == 11) {
        for (let i = 0; i < events.length; i++) {
            if (students[studentIndex].Event == events[i].Event ) {
                events[i].Juniors--;
               for (let n = 0; n < events.length; n++) {
            
        if (events[n].Juniors < events[n]["Per Grade"]&& events[n].Event ==req.body.Event && 
             students[studentIndex].Event != req.body.Event ) {
             events[n].Juniors++;
                
            students[studentIndex].Event = req.body.Event;
            console.log("Juniors");
            }
            
        }  
            }
            else if (events[i].Junior >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
        }
          
    }
       
         
         
         
         
        if (students[studentIndex].Grade_Level == 12) {
        for (let i = 0; i < events.length; i++) {
            if (students[studentIndex].Event == events[i].Event ) {
                events[i].Seniors--;
               for (let n = 0; n < events.length; n++) {
            
        if (events[n].Seniors < events[n]["Per Grade"]&& events[n].Event ==req.body.Event && 
             students[studentIndex].Event != req.body.Event ) {
             events[n].Seniors++;
                
            students[studentIndex].Event = req.body.Event;
            console.log("Seniors");
            }
            
        }  
            }
            else if (events[i].Junior >= events[i]["Per Grade"]){
                res.status(400).send();
            }
            
             else {
                res.status(401).send();
            }
        }
          
       
    }        
}
         
         
   
     }
fs.writeFile('events.json',JSON.stringify(events),(err) => {
});
    fs.writeFile('students.json',JSON.stringify(students),(err) => {
     
      if (err){
      console.warn(err);
      return;
      };
      console.log("file appended at line 158")
        
       console.log(students[studentIndex]); 
  });     
});

app.listen(3000, () => {
    console.log('Server started...');
});