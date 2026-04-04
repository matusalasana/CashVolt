import { sql } from "../config/db.js";

// GET ALL ACCOUNTS
export const getAccounts = async (req, res) => {
  try {
    const user_id = req.user.userId;
    if(!user_id){
      return res.status(400).json({message: "user_id is required "})
    }
    const accounts = await sql`
      SELECT * FROM accounts WHERE user_id = ${user_id} ORDER BY name DESC
    `;
    if (accounts.length === 0){
      return res.status(404).json({message: "Account not found "})
    }

    res.status(200).json(accounts);
  } catch (err) {
    console.log("Error fetching accounts:", err);
    res.status(500).json({ message: "Error fetching accounts" });
  }
};

// GET SINGLE ACCOUNT
export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id  = req.user.userId;
    
    if(!user_id){
      return res.status(400).json({message: "user_id is required "})
    }
    const account = await sql`
      SELECT * FROM accounts WHERE id = ${id} AND user_id = ${user_id}
    `;

    if (account.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }
  
    res.status(200).json(account[0]);
  } catch (err) {
    console.log("Error getting account:", err);
    res.status(500).json({ message: "Error getting account" });
  }
}

// CREATE ACCOUNT
export const addAccount = async (req, res) => {
  try {
    const { name } = req.body;
    const  user_id  = req.user.userId;

    const newAccount = await sql`
      INSERT INTO accounts (name, user_id)
      VALUES (${name}, ${user_id})
      RETURNING *
    `;

    res.status(201).json(newAccount[0]);
  } catch (err) {
    console.log("Error adding account:", err);
    res.status(500).json({ message: "Error adding account" });
  }
};

// UPDATE ACCOUNT
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user_id  = req.user.userId;

    if(!user_id){
      return res.status(400).json({message: "user_id is required "})
    }
    
    const updatedAccount = await sql`
      UPDATE accounts
      SET name = ${name}
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING *
    `;

    if (updatedAccount.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(updatedAccount[0]);
  } catch (err) {
    console.log("Error updating account:", err);
    res.status(500).json({ message: "Error updating account" });
  }
};

// DELETE ACCOUNT
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id  = req.user.userId;

    if(!user_id){
      return res.status(400).json({message: "user_id is required "})
    }
    
    const deletedAccount = await sql`
      DELETE FROM accounts
      WHERE id = ${id} AND user_id = ${user_id}
      RETURNING id
    `;

    if (deletedAccount.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: `Account with id ${id} deleted` });
  } catch (err) {
    console.log("Error deleting account:", err);
    res.status(500).json({ message: "Error deleting account" });
  }
};