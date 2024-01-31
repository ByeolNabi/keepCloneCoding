// 데이터의 형태 Model
const { v4: uuidv4 } = require("uuid");

class Note{
    constructor(title, body, option){
        this.id = uuidv4();
        this.title = title;
        this.body = body;
        this.pinned = option.pinned;
        this.backgroundColor = option.backgoundColor;
        const currentTime = Math.floor(Date.now() / 1000)
        this.createAt = currentTime; // 밀리세컨드
        this.updatedAt = currentTime;
    }
}

module.exports = Note;