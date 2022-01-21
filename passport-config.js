import passport from 'passport';
import fbStrategy from 'passport-facebook';
import { users } from './model/User.js';
const FacebookStrategy = fbStrategy.Strategy;


const initializePassportConfig = () =>{
    passport.use('facebook',new FacebookStrategy({
        clientID:'ID de cliente de Facebook',
        clientSecret:'Secret que viene a la derecha',
        callbackURL:'Callback generado con Ngrok + /auth/facebook/callback',
        profileFields:['emails']
    },async (accessToken,refreshToken,profile,done)=>{
        try{
            console.log(accessToken);
            console.log(profile);
            let user = await users.findOne({email:profile.emails[0].value})
            done(null,user);
        }catch(error){
            done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        users.findById(id,done);
    })
}

export default initializePassportConfig;