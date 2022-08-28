const express = require("express");
const router = express.Router();
const {
  myPage,
  createMyPage,
  updateMyPage,
  deleteMyPage,
} = require("../controllers/pageController");

const { authProtect } = require("../middleware/authMiddleware");
const { pageProtect } = require("../middleware/pageMiddleware");

router.get("/", authProtect, pageProtect, myPage);
router.post("/create", authProtect, createMyPage);
router.patch("/update", authProtect, pageProtect, updateMyPage);
router.put("/delete", authProtect, pageProtect, deleteMyPage);

module.exports = router;
