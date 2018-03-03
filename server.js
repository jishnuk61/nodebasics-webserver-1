const express= require('express');
const hbs = require('hbs');
var app =  express();
const fs = require('fs');
const port = process.env.PORT||3000;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamit',(text)=>{
    return text.toUpperCase();
});

app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
var now = new Date().toString();
var log =`${now}: ${req.method} :${req.url}`;
fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
        console.log('Unable to append to server.log');
    }
});
console.log(``);
next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{pageTitle:'Maintenance Page'});
// });
app.get('/',(request,response)=>{

    response.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to my website'
    });
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects Page'
    });
});

app.listen(port,()=>{console.log(`Server starting on port ${port} `)});