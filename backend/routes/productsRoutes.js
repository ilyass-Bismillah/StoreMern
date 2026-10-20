import express from "express";
import { getProductById, getProducts, getHomeProducts } from "../controller/productController.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/home").get(getHomeProducts);
router.route("/:id").get(getProductById)

export default router;
