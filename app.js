const express = require('express');
const app = express();
let students = [];

fs.readFile('students.json',(err, data) => {
    students = JSON.parse(data);
})


/*if ( $("#username").val()== "" ||  $("#lastname").val() == "" ||  $("#grade").val() == "" {
                 alert("Please Fill out the Fields");
                       
              } else {
                 // check make sure it checks for the data in the array
                    First Name = $("#firstname").val();
                   Last Name = $("#lastname").val();
                  Grade = $("#grade").val();
                  
                  
                 students =  JSON.parse(localStorage.getItem("students"))
                  
                  students.push({
                     FirstName: FirstName,
                     LastName: LastName,
                     Grade: Grade,
                     
                  });
                 
             })
       ;   
     */
































 fs.writeFile('students.json',JSON.stringify(students),(err) => {
        console.log(students)
        console.warn(err);
        })






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