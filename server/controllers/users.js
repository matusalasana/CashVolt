import { sql } from "../config/db.js"

export const getUsers = async ( req, res ) => {
  try{
    const users = await sql`
      SELECT * FROM users ORDER BY first_name DESC;
    `;
    res.status(200).json(users)
  }catch(err){
    console.log("Error fetching users:",err)
    res.status(500).json(err)
  }
}

export const getUser = async ( req, res ) => {
  try{
    const { id } = req.params;
    const user = await sql`
      SELECT * FROM users WHERE id = ${id}
    `;
    res.status(200).json(user[0])
  }catch(err){
    console.log("Error getting a transaction:",err)
  }
}

export const addUser = async ( req, res ) => {
  try {
    const { first_name, last_name, email, password } = req.body
    
    const newUser = await sql`
      INSERT INTO users (
        first_name, last_name, email, password
      )
      VALUES (
        ${first_name}, ${last_name}, ${email}, ${password}
      )
      RETURNING first_name, last_name, email
    `;
    res.status(201).json(newUser[0])
  }catch(err){
    console.log("Error adding user:",err)
  }
}

export const updateUser = async ( req, res ) => {
  
}

export const deleteUser = async ( req, res ) => {
  
}