import Model from "./model";
import View from "./view";
import Controller from "./controller";

const model = new Model();
const view = new View(model);
const controller = new Controller(model,view);

alert("If you are using the application for the first time, enter your login, password and click button" +
    " REGISTRATION, and" +
    " then click the ENTER button. If you have a login and password, just input your data and click ENTER");

controller.initApp();




