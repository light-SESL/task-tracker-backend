import express from "express";
import connect from "./db/db";
import cors from "cors";
import { errors } from "celebrate";
import router from "./routes";

const app = express();
app.use(cors());
connect();
app.use(express.json());
app.use(router);

app.use((req, res) => {
  return res.status(404).json({
    message: "Resource not found",
    status: false,
  });
});
app.use(errors());
const { PORT } = process.env || 4000;
app.listen(PORT, () =>
  console.log(`server running on port:http://localhost:${PORT}`)
);

export default app;
