const noteService = {
    // 모든 노트를 가져오기
    getNotes: async function(){
        const data = await fetch("http://localhost:3000/api/notes", {
            mode: "cors",
        }).then(response => response.json());
        return data;
    },
    // 새로운 노트 생성
    createNote: async function(){

    },
    // 기존 노트 수정
    updateNote: async function(){

    }
    // 기존 노트 삭제
    deleteNote: async function(){

    }
}