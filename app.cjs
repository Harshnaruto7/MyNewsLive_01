const express= require("express");
// const bodyParser = require("body-parser");s
const request = require("request");
const listId = "7a15f3392b";
require('dotenv').config()



const mailchimp  = require("@mailchimp/mailchimp_marketing");





const app=express();




app.use(express.static(__dirname));            


app.use(express.urlencoded());




mailchimp.setConfig({
  apiKey:process.env.API_key,
  server: "us21",
});




  app.get("/", function(req,res){
    res.sendFile(__dirname +"/signup.html");
  })




  app.post("/", function(req, res) {
    
    const subscribingUser = {
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email
    };
    async function run() {
      try{
        var response = await mailchimp.lists.addListMember(listId, {

          // firstName: req.body.fName,
          // lastName: req.body.lName,
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
             FNAME: subscribingUser.firstName, 
          LNAME: subscribingUser.lastName,
           }
        });


        console.log(response);
         res.sendFile(__dirname + "/success.html");
      }catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
      }
        


  

            }
  
        run();
     } )


     app.post("/failure",function(req,res){
      res.redirect("/")
     })

     
  
app.listen(3000,function(){
    console.log("The server is running on the port 3000");
});









