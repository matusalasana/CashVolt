import { sql } from "../config/db.js"

export const getAccounts = async ( req, res ) => {
  try {
    const  user = await sql`
      SELECT * FROM accounts JOIN users ON accounts.user_id = users.id
    `;
    if (!user){
      console.log("User with that account not found")
      res.status(500).json({message: "User with that account not found"})
    }
    
    const accounts = await sql`
      SELECT * FROM accounts LEFT JOIN users
      ON accounts.user_id = users.id
    `;
    res.status(200).json(accounts)
  }
}

export const getAccount = async ( req, res ) => {
  try{
    const { id } = req.params;
    const account = await sql`
      SELECT * FROM accounts WHERE id = ${id} ORDER BY name DESC
    `;
    res.status(200).json(account[0])
  }catch(err){
    console.log("Error getting an account:",err)
  }
}

export const addAccount = async ( req, res ) => {
  try{
    const { name, user_id } = req.body;
    const newAccount = await sql`
      INSERT INTO accounts ( name, user_id)
      VALUES ( ${name}, ${user_id})
    `;
    res.status.json(newAccount[0])
  } catch (err){
    console.log("Error adding new account:",err)
  }
}

export const updateAccount = async ( req, res ) => {
  try{
    const { name, user_id } = req.body;
    const updatedAccount = await sql`
      UPDATE accounts 
      SET name = ${name}, user_id = ${user_id}
      RETURNING *
    `;
    res.status.json(updatedAccount[0])
  } catch (err){
    console.log("Error updating the account:",err)
  }
}

export const deleteAccount = async ( req, res ) => {
  try{
    const { id } = req.params;
    const deletedAccount = await sql`
      DELETE FROM accounts WHERE id = ${id} RETURNING id
    `;
    res.status(200).json({message: "Account with id",id,"deleted"})
  } catch (err){
    console.log("Error deleting the account:",err)
  }
}