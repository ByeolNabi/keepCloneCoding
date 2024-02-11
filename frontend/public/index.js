const HOST = "localhost";
const PORT = 3000;

function statusCodeHandler(response){
    if (response.status >= 400 && response.status < 500){
        throw new Error(`4XX Error`);
    }
    if (response.status >= 500){
        throw new Error(`5XX Error`);
    }
    return response.json();
}

const noteService = {
    // 모든 노트를 가져오기
    getNotes: async function(){
        const data = await fetch("http://localhost:3000/api/notes", {
            mode: "cors",
        }).then(statusCodeHandler);
        return data;
    },
    // 새로운 노트 생성
    // note : { title, body, pinned, backgroundColor }
    createNote: async function(){
        const data = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            mode:"cors",
            cache: "no-cache",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(note),
        }).then(statusCodeHandler);
        console.info(`노트 ${data.id}가 생성되었습니다.`);
        return data;
    },
    // 기존 노트 수정
    // note: { title, body, pinned, backgroundColor }
    updateNote: async function(noteId, note){
        const data = await fetch(`http://${HOST}:${PORT}/api/notes/${noteId}`,{
            method:"PUT",
            mode: "cors",
            cache: "no-cache",
            headers:{
                "Content-Type": "appication/json",
            },
            body: JSON.stringify(note),
        }).then(statusCodeHandler);
        console.info(`노트 ${noteId}가 수정되었습니다.`);
        return data;
    },
    // 기존 노트 삭제
    deleteNote: async function(){
        const data = await fetch(`https://${HOST}:${PORT}/api/notes/${noteId}`,{
            method: "PUT",
            mode: "cors",
            cache:"no-cache",
            headers: {
                "Content-Type" : "appication/json",
            },
        }).then(statusCodeHandler);
        console.info(`노트 ${noteId}가 삭제되었습니다.`)
    },
}