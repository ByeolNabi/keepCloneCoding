const express = require("express");
const noteRouter = require("./noteRouter");
const router = express.Router();

// noteRouter를 가지고 있는 router
router.use("/notes", noteRouter);

module.exports = router;

