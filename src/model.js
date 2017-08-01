
class User {
    constructor (newUserName, newUserPass) {

        this.newUserName = newUserName;
        this.newUserPass = newUserPass;
    }
}

class ToDo {
    constructor (userName, classNameElem, textInElem, checkBoxStatus, elemNumber){

        this.userName = userName;
        this.classNameElem = classNameElem;
        this.textInElem = textInElem;
        this.checkBoxStatus = checkBoxStatus;
        this.elemNumber = elemNumber;
    }
}

class Note extends ToDo {
    constructor (userName, classNameElem, textInElem, checkBoxStatus, elemNumber) {
        super(userName, classNameElem, textInElem, checkBoxStatus, elemNumber)
    }
}

class Model {
    constructor(dataToDo = [], dataNote = [], dataUser = [], indexEl, statusChacked, textInOurElement, userName, userPass) {

        this.dataToDo = dataToDo;
        this.dataNote = dataNote;
        this.dataUser = dataUser;

        this.indexEl = indexEl;
        this.statusChacked = statusChacked;
        this.textInOurElement = textInOurElement;

        this.userName = userName;
        this.userPass = userPass;
    }

    restoreAllData(){

        localStorage.objectUser;
        let arrOurUser = JSON.parse(localStorage.getItem("objectUser"));
        if (arrOurUser != null){ this.dataUser = arrOurUser};

        localStorage.objectToDo;
        let arrOurToDo = JSON.parse(localStorage.getItem("objectToDo"));
        if (arrOurToDo != null){ this.dataToDo = arrOurToDo};

        localStorage.objectNotes;
        let arrOurNotes = JSON.parse(localStorage.getItem("objectNotes"));
        if (arrOurToDo != null){ this.dataNote = arrOurNotes};
    }

    saveAllData(){
        let allUser = JSON.stringify(this.dataUser);
        let allToOo = JSON.stringify(this.dataToDo);
        let allNotes = JSON.stringify(this.dataNote);

        localStorage.setItem("objectUser", allUser);
        localStorage.setItem("objectToDo", allToOo);
        localStorage.setItem("objectNotes", allNotes);

        localStorage.objectUser;
        let arrOurUser = JSON.parse(localStorage.getItem("objectUser"));
        if (arrOurUser != null){ this.dataUser = arrOurUser};

        localStorage.objectToDo;
        let arrOurToDo = JSON.parse(localStorage.getItem("objectToDo"));
        if (arrOurToDo != null){ this.dataToDo = arrOurToDo};


        localStorage.objectNotes;
        let arrOurNotes = JSON.parse(localStorage.getItem("objectNotes"));
        if (arrOurToDo != null){ this.dataNote = arrOurNotes};
    }

    pushNewUser() {
        const inputUserName = document.getElementById("userName");
        const inputUserPass = document.getElementById("userPassword");

        if(inputUserName.value !="" && inputUserPass.value !="" ) {

            alert (`Hello ${inputUserName.value} :) your registration was successful to use the application, press the ENTER button.`)

            this.dataUser.push(new User(inputUserName.value, inputUserPass.value ));
        }
    }

    saveDataUser(){
        const inputUserName = document.getElementById("userName");
        const inputUserPass = document.getElementById("userPassword");

            this.dataUser.forEach(ourObject => {
                    if (ourObject.newUserName == inputUserName.value && ourObject.newUserPass == inputUserPass.value) {
                        this.userName = inputUserName.value;
                        this.userPass = inputUserPass.value;
                    }
                }
            );
        }

    saveData(userName, itemClassName, itemText, itemCheckBox, itemCreationNumber){

       if (itemClassName == "ToDo") {
           this.dataToDo.push(new ToDo(userName, itemClassName, itemText, itemCheckBox, itemCreationNumber));
            } else {
           this.dataNote.push(new Note(userName, itemClassName, itemText, itemCheckBox, itemCreationNumber));
         }
    }

    deleteInData(elem){
        let elemIndex = elem.dataset.creationnumber;
        let arrOfOurElement = (elem.className == "ToDoElement") ? this.dataToDo : this.dataNote ;

        arrOfOurElement.forEach( (ourElem, numberOurElemInArr) => {
            if (ourElem.elemNumber == elemIndex){this.indexEl = numberOurElemInArr} } ) ;

    arrOfOurElement.splice(this.indexEl, 1);
}

    changeChacked(elemCheckBox) {
        let elemIndex = elemCheckBox.parentNode.dataset.creationnumber;
        let arrOfOurElement = (elemCheckBox.parentNode.className == "ToDoElement") ? this.dataToDo : this.dataNote ;

        this.statusChacked = elemCheckBox.checked;

        arrOfOurElement.forEach( ourElem => {
            if (ourElem.elemNumber == elemIndex) {
                ourElem.checkBoxStatus = this.statusChacked;
              }
            }
        );
    }

    changeTextInElement(elemTextField){
        let elemIndex = elemTextField.parentNode.dataset.creationnumber;
        let arrOfOurElement = (elemTextField.parentNode.className == "ToDoElement") ? this.dataToDo : this.dataNote ;

        this.textInOurElement = elemTextField.innerHTML;

        arrOfOurElement.forEach( ourElem => {
            if (ourElem.elemNumber == elemIndex) {
                ourElem.textInElem = this.textInOurElement;
                }
            }
        );
    }
}

export default Model ;