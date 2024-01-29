const express = require("express");
const { Note } = require("../model");
const store = require("../store");

const router = express.Router();

router.get("/", (req,res) => {
    res.json(Array.from(store.notes, ([_, value]) => value));
});

// http get: 특정 id의 노트를 반환
router.get(":/id", (req, res) =>{
    const { id } = req.params;
    const note = store.notes.get(id);

    // 찾는 노트가 없는 경우 예외처리
    if (note === undefined){
        res.status(400).json({
            msg: `노트(ID: ${id})를 찾을 수 없습니다`,
        });
        return;
    }

    // 배열 형식으로 반환
    res.json(note);
})