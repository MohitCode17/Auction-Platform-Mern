import app from "./app.js";
import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";

const startServer = async () => {
  await connectDB();

  const PORT = config.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
