import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import initializePassportConfig from './passport-config.js';

const app = express();
const server = app.listen(8080,()=>console.log(`Listening on 8080`))
const connection  = mongoose.connect('AQUÍ VA TU BASE DE DATOS DE USUARIOS');

app.use(cors());
app.use(session({
    store:MongoStore.create({mongoUrl:'AQUI VA TU BASE DE DATOS PARA SESIONES'}),
    secret:"coderFacebook",
    resave:false,
    saveUninitialized:false
}))
app.use(express.static('public'))
app.use(express.json());
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}),(req,res)=>{

})
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    failureRedirect:'/paginadeFail'
}),(req,res)=>{
    res.send({message:"FINALMENTE, logueado :)"})
})

app.get('/',(req,res)=>{
    console.log("hola");
})

app.get('/logout',(req,res)=>{
    req.logout();
})