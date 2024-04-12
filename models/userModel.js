const pool = require('../config/database.js');
 
  export const User = {
       createUser : async (firstname, fastname ,email,password)=>{
        const connection = await pool.getConnection();
        try{
            await connection.query(` INSERT INTO USERS (firstname,lastname, email, password)   VALUES (?,?),[firstname, lastname, email,password]`);
            return {success:true}
        }catch(error){
            console.log("Error creating user", error);
        }
        finally {
            connection.release();
        }
       },
       findUserByEmail : async (email) =>{
         const connection = await pool.getConnection();
         try{
            const [rows] = await connection.query(`SELECT * FROM WHERE email = ?`, [email])
            return rows;
         }catch(error){
            console.log('Error finding user by email', error);
            return null;
         }
         finally{
            connection.release();
         }
       },
    updateUserPassword: async (email,password) =>{
        const connection = await pool.getConnection();
        try{
            await connection.query(`UPDATE users SET password = ? WHERE email = ? `,[password,email]);
            return { success:success};
        }
        catch(error){
            console.log('Error when updating the password', error);
            return {success: false, error};
        }
    }
}
 