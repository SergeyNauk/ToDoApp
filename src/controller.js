
class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

    }

    initApp(){
        this.model.restoreAllData();

        window.onbeforeunload = () => {this.model.saveAllData(); return true;};

        const btnReg = document.getElementById("registration");
        const btnEnter = document.getElementById("enter");
        const inputUserName = document.getElementById("userName");
        const inputUserPass = document.getElementById("userPassword");

        btnReg.addEventListener("click", () => this.model.pushNewUser());
        btnEnter.addEventListener("click", () => {
            if(inputUserName.value !="" &&  inputUserPass.value !="" ) {
                this.model.saveDataUser();
            }

            if (this.model.userName != undefined || this.model.userPass != undefined) {
                this.initCreation(this.model.userName);
            } else {
                alert("Login or password is" +
                    " wrong," +
                    " enter the correct data and press ENTER or register");

                inputUserName.value = "";
                inputUserPass.value = "";

                this.initApp();
                }
            }
        );
    }

    initCreation(userName){
        const btnCreateToDo = document.getElementById("CreateToDo");
        const btnCreateNotes =  document.getElementById("CreateNotes");

        btnCreateToDo.style.cssText = "opacity: 1; transition: opacity 1s;";
        btnCreateNotes.style.cssText = "opacity: 1; transition: opacity 1s;";

        btnCreateToDo.onclick = () => this.view.clearScreen(userName, "ToDo");
        btnCreateNotes.onclick = () => this.view.clearScreen(userName,"Notes");
    }
}

export default Controller ;