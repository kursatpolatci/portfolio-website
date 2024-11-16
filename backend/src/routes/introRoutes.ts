import express from "express"
import { getIntro } from "../controllers/introController"

const router = express.Router()

router.get("/", getIntro)
// router.put("/update", )

export default router