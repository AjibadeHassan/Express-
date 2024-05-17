import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../Mongoose/Schemas/User.mjs";
import { verifyPassword } from "../utils/Helpers.mjs";
// import { mockUsers } from "../utils/Constant.mjs";

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=>{
   try {
    const findUser = await User.findById(id)

   done(null, findUser)
   } catch (err) {
    console.log(err)
    done(err, null)
   }
})

export default passport.use(
    new Strategy(async (username, password, done)=>{
        try {
            const findUser = await User.findOne({ username })
            const verifiedPassword = await verifyPassword(findUser.password, password)
            if(!findUser || !verifiedPassword) throw new Error('Invalid Credentials')

            done(null, findUser)
        } catch (error) {
            console.log(error)
            done(error, null)
        }
    })
)