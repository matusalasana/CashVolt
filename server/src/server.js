import { PORT } from "./config/env.js";
import app from "./app.js";
import { testDBConnection } from "./config/db.js";

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await testDBConnection();
});