import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/create", createContact);
router.get("/all", getAllContacts);
router.delete("/:id", deleteContact);

export default router;
