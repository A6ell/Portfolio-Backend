
import { Router } from "express";
import {
  createNews,
  getNewsById,
  updateNews,
  findAll, 
  deleteNews,
} from "./news.controller.js";

const router = Router();

// Create a new news article
router.post("/", createNews);

// Retrieve a specific news article by ID
router.get("/:id", getNewsById);

// Update a specific news article by ID
router.put("/:id", updateNews);

// Delete a specific news article by ID
router.delete("/:id", deleteNews);

// Retrieve all news article
router.get('/',findAll)

export default router;
