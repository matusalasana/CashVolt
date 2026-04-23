import { sql } from "../../config/db.js"

export const getBudgetAnalyticsService = async (user_id, month, year) => {
  if (user_id == null || month == null || year == null) {
    throw new Error("missing required fields");
  }

  const result = await sql`
    SELECT
      b.id,
      b.user_id,
      b.category_id,
      b.amount,
      b.month,
      b.year,
      c.name AS category_name,

      COALESCE(SUM(t.amount), 0) AS spent,
      (b.amount - COALESCE(SUM(t.amount), 0)) AS remaining

    FROM budgets b
    INNER JOIN categories c 
      ON b.category_id = c.id

    LEFT JOIN transactions t 
      ON t.category_id = b.category_id
      AND t.user_id = b.user_id
      AND EXTRACT(MONTH FROM t.transaction_date) = b.month
      AND EXTRACT(YEAR FROM t.transaction_date) = b.year

    WHERE b.user_id = ${user_id}
      AND b.month = ${month}
      AND b.year = ${year}

    GROUP BY
      b.id,
      b.user_id,
      b.category_id,
      b.amount,
      b.month,
      b.year,
      c.name

    ORDER BY c.name;
  `;

  return result;
};

export const getOverviewAnalyticsService = async (user_id, month, year) => {
  if (user_id == null || month == null || year == null) {
    throw new Error("missing required fields");
  }

  const result = await sql`
    SELECT 
      COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) AS total_income,

      COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS total_expense,

      COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0)
      -
      COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0)
      AS total_balance,

      (
        SELECT COALESCE(SUM(b.amount), 0)
        FROM budgets b
        WHERE b.user_id = ${user_id}
          AND b.month = ${month}
          AND b.year = ${year}
      ) AS total_budget

    FROM transactions t
    WHERE t.user_id = ${user_id}
      AND EXTRACT(MONTH FROM t.transaction_date) = ${month}
      AND EXTRACT(YEAR FROM t.transaction_date) = ${year};
  `;

  return result[0];
};


export const getYearlyAnalyticsService = async (user_id, year) => {
  const result = await sql`
    SELECT 
      EXTRACT(MONTH FROM transaction_date) AS month,

      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,

      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,

      (
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END)
        -
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)
      ) AS total_balance

    FROM transactions
    WHERE 
      user_id = ${user_id}
      AND EXTRACT(YEAR FROM transaction_date) = ${year}

    GROUP BY month
    ORDER BY month;
  `;

  return result;
};