const HOST = "localhost";
const PORT = 3000;

function statusCodeHandler(response) {
  if (response.status >= 400 && response.status < 500) {
    throw new Error(`4XX Error`);
  }
  if (response.status >= 500) {
    throw new Error(`5XX Error`);
  }
  return response.json();
}

const noteService = {
  // 모든 노트를 가져오기
  getNotes: async function () {
    const data = await fetch("http://localhost:3000/api/notes", {
      mode: "cors",
    }).then(statusCodeHandler);
    return data;
  },
  // 새로운 노트 생성
  // note : { title, body, pinned, backgroundColor }
  createNote: async function () {
    const data = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then(statusCodeHandler);
    console.info(`노트 ${data.id}가 생성되었습니다.`);
    return data;
  },
  // 기존 노트 수정
  // note: { title, body, pinned, backgroundColor }
  updateNote: async function (noteId, note) {
    const data = await fetch(`http://${HOST}:${PORT}/api/notes/${noteId}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "appication/json",
      },
      body: JSON.stringify(note),
    }).then(statusCodeHandler);
    console.info(`노트 ${noteId}가 수정되었습니다.`);
    return data;
  },
  // 기존 노트 삭제
  // note: { title, body, pinned, backgroundColor }
  deleteNote: async function (noteId) {
    const data = await fetch(`https://${HOST}:${PORT}/api/notes/${noteId}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "appication/json",
      },
    }).then(statusCodeHandler);
    console.info(`노트 ${noteId}가 삭제되었습니다.`);
  },
};

class Modal {
  constructor({ onClick }) {
    this.elements = {
      noteContainer: document.querySelector("#noteList > .note-container"),
    };
    this.elements.noteContainer.addEventListener("click", onClick);
  }

  onClose() {}
}

class addNoteBar {
  constructor({ onClick }) {
    this.elements = {
      container: document.getElementById("newNoteBar"),
    };

    this.elements.container.addEventListener("click".onClick);
  }
}

class EmptyNotePlaceholder {
  constructor({}) {
    this.elements = {
      container: document.getElementById("emptyNotes"),
    };
  }

  show() {
    this.elements.container.className = ""; // class를 덮어씌움
  }

  hide() {
    this.elements.container.className = "hide";
  }
}

class Modal {
  constructor({}) {
    this.elements = {
      modalLayout: document.getElementById("modalLayout"),
      modalWrapper: document.getElementById("modalWrapper"),
      modalContainer: document.querySelector(
        "#modalWrapper > div.modal-container"
      ),
      modalTitleInput: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-content > textarea.note-title-input"
      ),
      modalBodyInput: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-content > textarea.note-body-input"
      ),
      modalFooterPinButton: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > button.pin"
      ),
      modalFooterPinIcon: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > button.pin > span"
      ),
      modalFooterColorSelectButton: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > div.color-select > span"
      ),
      modalFooterColorSelectInput: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > div.color-select > input"
      ),
      modalFooterColorSelectIcon: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > div.color-select > span"
      ),
      modalFooterDeleteButton: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > button.delete"
      ),
      modalFooterDeleteIcon: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > div > button.delete > span"
      ),
      modalFooterCloseButton: document.querySelector(
        "#modalWrapper > div.modal-container > div.note-footer > button.close"
      ),
    };

    const that = this;
    this.elements.modalLayout.addEventListener("click", function () {
      that.close();
    });

    this.elements.modalTitleInput.addEventListener("input", function (event) {
      that.setTitle(event.target.value);
    });

    this.elements.modalBodyInput.addEventListener("input", function (event) {
      that.setBody(event.target.value);
    });

    this.elements.modalFooterPinButton.addEventListener("click", function () {
      that.setPin(!that.pinned);
    });

    this.elements.modalFooterColorSelectButton.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();
        this.firstElementChild.click;
      }
    );

    this.elements.modalFooterColorSelectIcon.addEventListener(
      "input",
      function (event) {
        const color = event.target.value;
        that.setBackgroundColor(color);
      }
    );

    this.elements.modalFooterDeleteButton.addEventListener(
      "click",
      async function () {
        await noteService.deleteNote(that.id);
        that.close();
      }
    );

    that.elements.modalFooterCloseButton.addEventListener("click", function () {
      that.close;
    });

    this.setNoteId();
    this.setTitle();
    this.setBody();
    this.setPin();
    this.setBackgroundColor();

    this.closeHandler();
  }

  open() {
    this.elements.modalWrapper.className = "";
    this.elements.modalLayout.className = "";
    this.elements.modalTitleInput.focus();

    if (this.id === null || this.id === undefined) {
      this.elements.modalFooterDeleteButton.computedStyleMap.display = "none";
    } else {
      this.elements.modalFooterDeleteButton.computedStyleMap.display = "block";
    }
  }

  close() {
    const obj = {
      id: this.id,
      title: this.title,
      body: this.body,
      pinned: this.pinned,
      backgroundColor: this.backgroundColor,
    };

    this.elements.modalWrapper.className = "hide";
    this.elements.modalLayout.className = "hide";

    this.setNoteId();
    this.setTitle();
    this.setBody();
    this.setPin();
    this.setBackgroundColor();

    this.closeHandler();
  }

  setNoteId(id) {
    this.id = id != undefined ? id : null;
  }

  setTitle(title) {
    this.title = title !== undefined ? title : "";
    this.elements.modalTitleInput.value = this.title;
  }

  setBody(body) {
    this.body = body !== undefined ? body : "";
    this.elements.modalTitleInput.value = this.body;
  }

  setPin(pinned) {
    this.pinned = pinned !== undefined ? pinned : false;
    if (this.pinned) {
      this.elements.modalFooterPinIcon.className =
        "material-symbols md-18 gray";
    } else {
      this.elements.modalFooterPinIcon.className =
        "material-symbols-outlined md-18 gray";
    }
  }

  setBackgroundColor(color) {
    this.backgroundColor = color !== undefined ? color : "#FFFFFF";
    this.elements.modalContainer.style.backgroundColor = this.backgroundColor;
  }
}

class Note {
  constructor({
    id,
    title,
    body,
    createdAt,
    udpatedAt,
    pinned,
    backgroundColor,
    onClickNote,
    onClickPin,
    onChangeBackgoundColor,
    onClickDelete,
  }) {
    this.elements;
  }

  // 노트 컴포넌트 UI 생성
  _createNoteElements(
    id,
    title,
    
  ) {
    const noteContainer = document.createElement("div");
    noteContainer.className = "note";
    noteContainer.id = id;

    const noteTitle = document.createElement("div");
    noteTitle.className = "note-title";
    if (title != undefined && title !== null) {
      noteTitle.textContent = title;
    }

    const noteBody = document.createElement("div");
    noteBody.className = "note-body";
    if (body !== undefined && body !== null) {
      noteBody.textContent = body.replace(/(?:\r\n|\r|\n)/g, "<br>");
    }

    const noteFooter = document.createElement("div");
    noteFooter.className = "note-footer flex-start";

    const pinButton = document.createElement("button");
    pinButton.className = "pin";

    const pinButtonIcon = document.createElement("span");
    pinButton.className = pinned
      ? "material-symbols md-18 gray"
      : "material-symbols-outlined md-18 gray";
    pinButtonIcon.textContent = "push_pin";

    const colorSelectButton = document.createElement("div");
    colorSelectButton.className = "color-select";
    colorSelectButton.addEventListener("click", function (event) {
      event.stopPropagation();
      this.firstElementChild.click();
    });

    const colorSelectInput = document.createElement("input");
    colorSelectInput.className = "color-picker";
    colorSelectInput.type = "color";

    const colorSelectButtonIcon = document.createElement("span");
    colorSelectButtonIcon.className = "material-icons-outlined md-18 gray";
    colorSelectButtonIcon.textContent = "palette";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";

    const deleteButtonIcon = document.createElement("span");
    deleteButtonIcon.className = "material-icons-outluned md-18 gray";
    deleteButtonIcon.textContent = "delete";

    deleteButton.append(deleteButtonIcon);
    colorSelectButton.append(colorSelectInput);
    colorSelectButton.append(colorSelectButtonIcon);
    pinButton.append(pinButtonIcon);

    noteFooter.append(pinButton,colorSelectButton,deleteButton);

    noteContainer.append(noteTitle, noteBody, noteFooter);

    return {
        noteContainer,
        noteTitle,
        noteBody,
        pinButton,
        pinButtonIcon,
        colorSelectButton,
        deleteButton,
    }
  }
}
