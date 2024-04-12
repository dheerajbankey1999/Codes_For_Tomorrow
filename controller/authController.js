import { User } from '../models/usermodel';
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

 export const AuthController = {
    signUp: async (req,res)=>{
        const {email,password}  = req.body;
        try{
             //hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            //create User
            const result = await User.createUser(email,hashedPassword);
            if(!result.success){
                return res.status(500).json({error: 'Failed to create user'});
            }
            res.status(201).json({message: 'User signed up successfully'});
        }
        catch(error){
            console.log('Erro signing up', error);
            res.status(500).json({Error:'Internal server error'});
        }
    },
 login: async(req,res)=>{
    const {email,password} = req.body;
    try{
        //Find user by email
        const user = User.findUserByEmail(email);
        if(!user){
            return res.status(401).json({error:'Invalid email or password'});
        }
        const passwordMatch = await bcrypt.compare(password,User.password);
        if(!passwordMatch){
            return res.status(401).json({error: ' Invalid email or password'});
        }
        const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn: '1h'});
        res.json({token});
    }
    //check password match
 catch(error){
console.error("Error logging in ",error);
res.status(500).json({error: 'Internal server error'});
 }
},
forgotPassword : async (req,res)=>{
    const {email} = req.body;
    try{
        //check if user with the given email exists
        const user = await User.findUserByEmail(email);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        const resetToken = "this is mocked reset token"
           res.json({message:' Reset password email sent successfully'});
    } 
    catch(error){
        console.error('Error sending reset password email', error);
        res.status(500).json({error: 'Internal server error'})
    }
},
resetPassword: async (req,res) =>{
    const {email,token,password,confirmpassword} = req.body;
    try{
         
       //validate password
       if(password !== confirmpassword){
        return res.status(400).json({error: 'Password do not match'});
       }
       //update user password
       const result = await User.updateUserPassword(email,password);
       if(!result.success){
        return res.status(500).json({error: 'Failed to update password'})
       }
       res.json({message: 'Password reset successfully'});
    }catch(error){
        console.error("Error resetting password",error);
        res.status(500).json({error: 'Interval server error'});
    }
}
}