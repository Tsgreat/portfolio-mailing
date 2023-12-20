const express = require("express")
const cors = require("cors")
const mail = require("nodemailer")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())


app.listen(process.env.port,()=>{
    console.log(`server is running port: ${process.env.port}`);
    
})


function Create(item) {
    let mailtransporter = mail.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Auth_mail,
            pass: process.env.Auth_pass
        }
    });

    let malingdetail = {
        from:process.env.Auth_mail,
        to:"nitinthakur12390@gmail.com",
        subject:"Portfolio Results",
        text:`user is interested 
        name : ${item.name}
        E-mail : ${item.email}   
        message : ${item.message} `
    };
    mailtransporter.sendMail(malingdetail,function(err,data){
        if(err){
            console.log(err.message)
        }else(
            console.log("mail send")
        )
    })
}



app.post("/user",(req,res)=>{
    const data = req.body;
    try{
        Create(data)
        return res.status(200).json({
            message:"Message Sent"
        })
        
    } catch (err){
        console.log(err.message);
    }
    })

