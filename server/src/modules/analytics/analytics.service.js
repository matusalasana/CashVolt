import { sql } from "../../config/db.js";

export const getBudgetAnalyticsService = async (user_id, month) => {
  if (!month) {
    throw new Error("Month is required (YYYY-MM-01)");
  }

  const result = await sql`
    SELECT 
      b.category_id,
      c.name AS category_name,
      b.amount AS budget,

      COALESCE(SUM(t.amount), 0) AS spent,

      (b.amount - COALESCE(SUM(t.amount), 0)) AS remaining,

      CASE 
        WHEN COALESCE(SUM(t.amount), 0) > b.amount 
        THEN true 
        ELSE false 
      END AS overspent

    FROM budgets b

    JOIN categories c ON b.category_id = c.id

    LEFT JOIN transactions t 
      ON t.category_id = b.category_id
      AND t.user_id = b.user_id
      AND t.type = 'expense'
      AND DATE_TRUNC('month', t.transaction_date) = b.month

    WHERE b.user_id = ${user_id}
      AND b.month = ${month}

    GROUP BY b.category_id, c.name, b.amount
    ORDER BY c.name;
  `;

  return result;
};