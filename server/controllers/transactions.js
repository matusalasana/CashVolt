import { sql } from "../config/db.js";

export const getTransactions = async (req, res) => {
  try {
    const { type, user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    let transactions;

    if (type) {
      transactions = await sql`
        SELECT 
          u.first_name,
          u.last_name,
          a.name AS account_name,
          c.name AS category_name,
          c.type,
          t.amount,
          t.description,
          t.transaction_date
        FROM transactions t
        JOIN accounts a ON t.account_id = a.id
        JOIN users u ON u.id = a.user_id
        JOIN categories c ON t.category_id = c.id
        WHERE u.id = ${user_id}
        AND c.type = ${type}
      `;
    } else {
      transactions = await sql`
        SELECT 
          u.first_name,
          u.last_name,
          a.name AS account_name,
          c.name AS category_name,
          c.type,
          t.amount,
          t.description,
          t.transaction_date
        FROM transactions t
        JOIN accounts a ON t.account_id = a.id
        JOIN users u ON u.id = a.user_id
        JOIN categories c ON t.category_id = c.id
        WHERE u.id = ${user_id}
      `;
    }

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add transaction
export const addTransaction = async ( req, res ) => {
  try {
    const {
      amount,
      description,
      account_id,
      category_id,
      transaction_date
    } = req.body;

    // Validation
    if (!amount || !account_id || !category_id || !transaction_date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get account
    const account = await sql`
      SELECT * FROM accounts WHERE id = ${account_id}
    `;

    if (account.length === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Get category
    const category = await sql`
      SELECT * FROM categories WHERE id = ${category_id}
    `;

    if (category.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Prevent mismatch 
    if (account[0].user_id !== category[0].user_id) {
      return res.status(400).json({
        message: "Account and category must belong to the same user"
      });
    }

    // Insert transaction
    const result = await sql`
      INSERT INTO transactions (
        amount,
        description,
        account_id,
        category_id,
        transaction_date
      )
      VALUES (
        ${amount},
        ${description},
        ${account_id},
        ${category_id},
        ${transaction_date}
      )
      RETURNING *;
    `;

    res.status(201).json(result[0]);

  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific transaction 
export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      SELECT 
        t.*,
        a.name AS account_name,
        c.name AS category_name,
        c.type
      FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      JOIN categories c ON t.category_id = c.id
      WHERE t.id = ${id}
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Get One Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a specific transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      amount,
      description,
      account_id,
      category_id,
      transaction_date
    } = req.body;

    // Check account
    const account = await sql`
      SELECT * FROM accounts WHERE id = ${account_id}
    `;

    // Check category
    const category = await sql`
      SELECT * FROM categories WHERE id = ${category_id}
    `;

    if (!account.length || !category.length) {
      return res.status(404).json({ message: "Account or Category not found" });
    }

    // Prevent mismatch bug
    if (account[0].user_id !== category[0].user_id) {
      return res.status(400).json({
        message: "Account and category must belong to same user"
      });
    }

    const result = await sql`
      UPDATE transactions
      SET 
        amount = ${amount},
        description = ${description},
        account_id = ${account_id},
        category_id = ${category_id},
        transaction_date = ${transaction_date}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(result[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a specific transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM transactions
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};