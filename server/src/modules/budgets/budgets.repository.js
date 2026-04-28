import { sql } from "../../config/db.js";

// GET ALL budgets
export const getBudgetsRepo = async (
  user_id,
  month,
  year,
  sortBy,
  order
) => {

  const sortColumnMap = {
    created_at: "b.created_at",
    amount: "b.amount",
    spent: "COALESCE(SUM(t.amount), 0)::float"
  };

  const sortColumn = sortColumnMap[sortBy] || "b.created_at";
  const sortDirection = order === "ASC" ? "ASC" : "DESC";

  return await sql`
    SELECT 
      b.id,
      b.category_id,
      b.amount::float,
      b.month,
      b.year,
      b.created_at,
      b.updated_at,
      
      c.name AS category_name,
      COALESCE(SUM(t.amount), 0)::float AS spent,
      (b.amount - COALESCE(SUM(t.amount), 0))::float AS remaining
      
    FROM budgets b
    
    INNER JOIN categories c 
      ON b.category_id = c.id
      
    LEFT JOIN transactions t 
      ON t.category_id = b.category_id
      AND t.user_id = b.user_id
      AND EXTRACT(MONTH FROM t.transaction_date) = b.month
      AND EXTRACT(YEAR FROM t.transaction_date) = b.year
    
    WHERE 
      b.user_id = ${user_id}
      ${month !== undefined ? sql`AND b.month = ${month}` : sql``}
      ${year !== undefined ? sql`AND b.year = ${year}` : sql``}

    GROUP BY 
      b.id, 
      c.id, 
      c.name

    ORDER BY ${sql.unsafe(sortColumn)} ${sql.unsafe(sortDirection)};
  `;
};


// CREATE budget
export const createBudgetRepo = async (data, user_id) => {
  const { category_id, amount, month, year } = data;

  const result = await sql`
    INSERT INTO budgets (user_id, category_id, amount, month, year)
    VALUES (${user_id}, ${category_id}, ${amount}, ${month}, ${year})
    RETURNING *;
  `;
  return result[0]
};

// UPDATE budget
export const updateBudgetRepo = async (id, data, user_id) => {
  const { amount, category_id, month } = data;

  const result = await sql`
    UPDATE budgets
    SET amount = ${amount}, 
      category_id=${category_id}, 
      month=${month}, 
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// DELETE budget
export const deleteBudgetRepo = async (id, user_id) => {
  const result = await sql`
    DELETE FROM budgets
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;
  `;
  return result[0]
};

// GET SINGLE
export const getBudgetByIdRepo = async (id, user_id) => {
  const result = await sql`
    SELECT * FROM budgets
    WHERE id = ${id} AND user_id = ${user_id}
  `;
  return result[0];
};


// HELPERS
export const getCategoryByIdRepo = async (category_id, user_id) => {
  const result = await sql`
    SELECT * FROM categories 
    WHERE id = ${category_id} AND user_id = ${user_id}
  `;

  return result[0];
};