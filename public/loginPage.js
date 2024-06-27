"use strict";

const userForm = new UserForm();


// userForm.loginFormCallback = function (data) {
//     ApiConnector.login(data, response => {
//         if (!response.success) {
//             userForm.setLoginErrorMessage(response.error);
//         } else {
//             location.reload();
//         }
//     });
// };

// userForm.registerFormCallback = function (data) {
//     ApiConnector.register (data, response => {
//         if(!response.success) {
//             userForm.setRegisterErrorMessage(response.error);
//         } else {
//             location.reload();
//         }
//     });
// };

// with currying
let formHandler = (action, errors) => data => action(data, response => response.success ? location.reload() : errors(response.error));

userForm.loginFormCallback = formHandler(ApiConnector.login, userForm.setLoginErrorMessage.bind(userForm));
userForm.registerFormCallback = formHandler(ApiConnector.register, userForm.setRegisterErrorMessage.bind(userForm));