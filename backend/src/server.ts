import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
