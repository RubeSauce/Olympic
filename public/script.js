$(document).ready(function(){


$("#eventChoice").hide();
    $("#options").hide();
    $("#answer").hide();


$("input#submit").click(function(e){
    
    e.preventDefault();
     
if ( $("#FirstName").val()== "" ||  $("#LastName").val() == "" ||  $("#Grade").val() == ""||  $("#ID").val() == "") {
                 alert("Please Fill out the Fields");
                       
              } else {
                 // check make sure it checks for the data in the array
                  let  firstName = $("#FirstName").val();
                  let lastName = $("#LastName").val();
                 let grade = $("#Grade").val();
                  let id = $("#ID").val();
                  
                   
                 axios.post('/answer',{
            "First_Name":firstName,
            "Last_Name":lastName,
            "Grade_Level":grade,
            "Student_Number":id         
                     
                     
        })
        .then(function(response) {
     console.log(response.data);
                     response.data.events.true
              
                    $("#eventChoice").show();
                    $("#options").show();
                    $("#answer").show();
                                      
        let $eventList = $("#options"); 
        let $events = []; 
         response.data.forEach(event => $events.push($("<option></option>").text(event.Event)));
       $eventList.append($events);
                   
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        }); 
                 
             };
 });
});