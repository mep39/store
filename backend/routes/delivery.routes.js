import express from "express";
import { getCities } from "../services/novaposhta.js";

const router = express.Router();

router.get("/cities", async (_, res) => {
  const data = await getCities();
  res.json(data.data);
});

export default router;
