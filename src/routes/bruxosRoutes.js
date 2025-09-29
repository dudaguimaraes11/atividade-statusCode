import express from "express"; 
import { getAllBruxos, bruxosById, createBruxo, deleteBruxo, updateBruxo } from "../controllers/bruxosController.js"; 

const router = express.Router(); 

router.get("/", getAllBruxos);
router.get("/:id", bruxosById);
router.post ("/", createBruxo);
router.delete ("/:id", deleteBruxo);
router.put ("/:id", updateBruxo);

export default router; 