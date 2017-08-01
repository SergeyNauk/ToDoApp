class View {
    constructor(model, numberOfToDo, elemUserName, classNameElem, textInElem, checkBoxStatus, elemNumber, flag) {

        this.model = model;
        this.numberOfToDo = 0;

        this.elemUserName = elemUserName;
        this.classNameElem = classNameElem;
        this.textInElem = textInElem;
        this.checkBoxStatus = checkBoxStatus;
        this.elemNumber = elemNumber;
        this.flag = true;
    }

    clearScreen(userName, classNameElem){

        document.querySelector('.wrapper').innerHTML ='';

        this.rebuildElements(classNameElem);
        this.createElem(userName,classNameElem)
    }

    rebuildElements(classNameElem) {
        let rebuildElemArr = (classNameElem == "Notes") ? this.model.dataNote : this.model.dataToDo;

        if (rebuildElemArr != null) {
            rebuildElemArr.forEach(ourElement => {

                if (ourElement.userName == this.model.userName) {

                    this.elemUserName = ourElement.userName;
                    this.classNameElem = ourElement.classNameElem;
                    this.textInElem = ourElement.textInElem;
                    this.checkBoxStatus = ourElement.checkBoxStatus;
                    this.elemNumber = ourElement.elemNumber;
                    this.createElem(this.elemUserName, this.classNameElem, this.textInElem, this.checkBoxStatus, this.elemNumber, false)
                    }
               }
            );
        }
    }

    createElem(userName, elemClassName, textInTextField="",statusChacked = false, startNumber, flag = this.flag) {
        let elem = document.createElement("div");
        elem.className = elemClassName + "Element";

        document.querySelector('.wrapper').appendChild(elem);

        if (startNumber == undefined) {

            if (document.querySelector('.wrapper').children.length == 1) {
                startNumber = 0;
            } else {
                startNumber = parseInt(elem.previousElementSibling.dataset.creationnumber)+1;
        }
    }
            elem.setAttribute("data-creationnumber", startNumber);
            elem.setAttribute("data-userName", userName);

            let elemBtn = document.createElement("button");
            elemBtn.innerHTML = "delete";
            elemBtn.className = elemClassName + "Delete";
            elem.appendChild(elemBtn);

            let elemCheckBox = document.createElement("input");
            elemCheckBox.type = "checkbox";
            elemCheckBox.className = elemClassName + "Checkbox";
            elem.appendChild(elemCheckBox);
            elemCheckBox.checked = statusChacked;

            let elemTextField = document.createElement("div");
            elemTextField.className = elemClassName + "Text";
            elem.appendChild(elemTextField);
            elemTextField.setAttribute("contenteditable", "true");
            elemTextField.innerHTML = textInTextField;

            if (elemTextField.className == "ToDoText") {
            elemCheckBox.checked ? elemTextField.style.cssText = "text-decoration:" +
                " line-through" : elemTextField.style.cssText = "text-decoration: none";
            } else {
            elemCheckBox.checked ? elemTextField.style.cssText = "text-decoration:" +
                " underline; color:red " : elemTextField.style.cssText = "text-decoration: none; color:black";
            }

            if (flag == true) {
                this.model.saveData(userName, elemClassName, elemTextField.innerHTML, elemCheckBox.checked, elem.dataset.creationnumber);}

            this.elemListeners(elem, elemBtn, elemCheckBox, elemTextField);

    }

    elemListeners(elem, elemBtn, elemCheckBox, elemTextField) {

        elemBtn.addEventListener("click", () => this.removeElement(elem) );
        elemCheckBox.addEventListener("change", () => this.chackedElement(elemCheckBox));
        elemTextField.addEventListener("blur", () => this.model.changeTextInElement(elemTextField))
    }

    removeElement(elem){
        elem.parentNode.removeChild(elem);

        this.model.deleteInData(elem);

    }

    chackedElement(elemCheckBox) {
        let textField = elemCheckBox.parentNode.children[2];
        let thisCheckBox = elemCheckBox.parentNode.children[1];

        if (textField.className == "ToDoText") {

            thisCheckBox.checked ? textField.style.cssText = "text-decoration:" +
                " line-through" : textField.style.cssText = "text-decoration: none";
        } else {
            thisCheckBox.checked ? textField.style.cssText = "text-decoration:" +
                " underline; color:red " : textField.style.cssText = "text-decoration: none; color:black";
        }

        this.model.changeChacked(elemCheckBox);
    }
}

export default View;