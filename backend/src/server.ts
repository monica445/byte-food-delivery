import express from "express";
import authRoutes from "./routes/auth.routes";
import sellerMenuRoutes from "./routes/seller-menu.routes";
import menuRoutes from "./routes/menu.routes";
import shopRoutes from "./routes/shop.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerMenuRoutes);
app.use("/api", menuRoutes);
app.use("/api/shops", shopRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
