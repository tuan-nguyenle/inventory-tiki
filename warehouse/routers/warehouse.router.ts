import "express-async-errors";
import express from "express";
// import { body } from "express-validator";

const router = express.Router();

// get list api
router.get("/api/warehouse/pallets", (req, res) => {
    res.send({ "1": 2 });
});

export { router as warehouse };
