"use strict";

let userForm = new UserForm();

// currying
let formHandler = (action, errors) => data => action(data, response => response.success ? location.reload() : errors("Данный пользователь не существует!"));

userForm.loginFormCallback = formHandler(ApiConnector.login, userForm.setLoginErrorMessage.bind(userForm));
userForm.registerFormCallback = formHandler(ApiConnector.register, userForm.setRegisterErrorMessage.bind(userForm));
