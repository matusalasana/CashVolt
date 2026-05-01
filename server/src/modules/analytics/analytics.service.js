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

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  const result = await sql`
    SELECT
      -- CURRENT MONTH
      COALESCE(SUM(CASE 
        WHEN t.type = 'income' 
        AND EXTRACT(MONTH FROM t.transaction_date) = ${month}
        AND EXTRACT(YEAR FROM t.transaction_date) = ${year}
      THEN t.amount END), 0)::float AS total_income,
    
      COALESCE(SUM(CASE 
        WHEN t.type = 'expense' 
        AND EXTRACT(MONTH FROM t.transaction_date) = ${month}
        AND EXTRACT(YEAR FROM t.transaction_date) = ${year}
      THEN t.amount END), 0)::float AS total_expense,
    
      COALESCE(SUM(CASE 
        WHEN t.type = 'savings' 
        AND EXTRACT(MONTH FROM t.transaction_date) = ${month}
        AND EXTRACT(YEAR FROM t.transaction_date) = ${year}
      THEN t.amount END), 0)::float AS total_savings,

      -- LAST MONTH
      COALESCE(SUM(CASE 
        WHEN t.type = 'income' 
        AND EXTRACT(MONTH FROM t.transaction_date) = ${prevMonth}
        AND EXTRACT(YEAR FROM t.transaction_date) = ${prevYear}
      THEN t.amount END), 0)::float AS last_month_income,
    
      COALESCE(SUM(CASE 
        WHEN t.type = 'expense' 
        AND EXTRACT(MONTH FROM t.transaction_date) = ${prevMonth}
        AND EXTRACT(YEAR FROM t.transaction_date) = ${prevYear}
      THEN t.amount END), 0)::float AS last_month_expense,
    
      COALESCE(SUM(CASE 
        WHEN t.type = 'savings' 
        AND EXTRACT(MONTH FROM t.transaction_date) = ${prevMonth}
        AND EXTRACT(YEAR FROM t.transaction_date) = ${prevYear}
      THEN t.amount END), 0)::float AS last_month_savings,

      -- BUDGET (scalar subqueries)
      (
        SELECT COALESCE(SUM(amount), 0)
        FROM budgets 
        WHERE user_id = ${user_id}
        AND month = ${month}
        AND year = ${year}
      )::float AS total_budget,

      (
        SELECT COALESCE(SUM(amount), 0)
        FROM budgets 
        WHERE user_id = ${user_id}
        AND month = ${prevMonth}
        AND year = ${prevYear}
      )::float AS last_month_budget

    FROM transactions t
    WHERE t.user_id = ${user_id};
  `;

  return result[0];
};


export const getYearlyAnalyticsService = async (user_id, year) => {
  const result = await sql`
    SELECT 
      EXTRACT(MONTH FROM transaction_date)::float AS month,

      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END)::float AS total_income,

      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)::float AS total_expense

    FROM transactions
    WHERE 
      user_id = ${user_id}
      AND EXTRACT(YEAR FROM transaction_date) = ${year}

    GROUP BY month
    ORDER BY month;
  `;

  return result;
};