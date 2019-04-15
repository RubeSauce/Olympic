$(document).ready(function(){


$("#eventChoice").hide();
    $("#options").hide();
    $("#answer").hide();
let eventChoice = $("#options option:selected").text();

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
      
                    
                     $("#eventChoice").show();
                    $("#options").show();
                    $("#answer").show();
                    
     
              
                   
                                      
        let $eventList = $("#options"); 
        let $events = []; 
         response.data.forEach(event => $events.push($("<option></option>").text(event.Event)));
       $eventList.append($events);
                   
            console.log(response);
        }).catch(function(error) {
                     
                    if (error.response.status == 404){
                         console.log(error);
                    $("#eventChoice").hide();
                    $("#options").hide();
                    $("#answer").hide();
                    alert("Incorrect Information");
     
                        }
                     if (error.response.status == 401){
                         console.log(error);
                         alert("Event Already Chosen");
                     }
                     if (error.response.status == 400){
                         console.log(error);
                         alert("Event is Full");
                     }
     
                 
        }); 
                  
                  
                 
             };
 });
    
    $("button#answer").click(function(e){
        let eventChoice = $("#options option:selected").text();
       
        axios.post('/event',{ 
        "Event":eventChoice
   
   })
    });
   
});