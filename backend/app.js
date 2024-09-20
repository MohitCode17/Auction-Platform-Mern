import express from "express";

const app = express();

// TEST API
app.get("/test", (req, res) => {
  res.send("Run Pass.");
});

export default app;
