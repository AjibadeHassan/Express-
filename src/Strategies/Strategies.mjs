import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/Constant.mjs";

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
   try {
    const findUser = mockUsers.find((user)=> user.id === id)
    if(!findUser) throw new Error('user not found')
    done(null, findUser)
   } catch (err) {
    console.log(err)
    done(err, null)
   }
})

export default passport.use(
    new Strategy((username, password, done)=>{
        try {
            const findUser = mockUsers.find((user)=> user.username === username)
            if(!findUser || findUser.password !== password) throw new Error('Invalid Credentials')

            done(null, findUser)
        } catch (error) {
            console.log(error)
            done(error, null)
        }
    })
)