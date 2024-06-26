"use strict";

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

let callbackFunction = method => response => (response.success) && method(response.data);

function updateTable(data) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data);
}

let updateStocks = () => ApiConnector.getStocks(callbackFunction(updateTable));

logoutButton.action = () => ApiConnector.logout(callbackFunction(window.location.reload.bind(window.location)));
ApiConnector.current(callbackFunction(ProfileWidget.showProfile));
ApiConnector.getFavorites(callbackFunction(updateFavorites));
updateStocks();
setInterval(updateStocks, 60000);

function updateFavorites(data) {
    favoritesWidget.clearTable(data);
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
}

let handler = (showFunc, errorBox, method, message) => data => method(data, response => {
    if (response.success) {
        showFunc(response.data);
        let fullMessage = response.data.created_at ? `${response.data.created_at}, ${response.data.login}: ` + message : message;
        errorBox.setMessage(response.success, fullMessage);
    } else {
        errorBox.setMessage(response.success, "Ошибка при выполнении операции");
    }
});

moneyManager.addMoneyCallback = handler(ProfileWidget.showProfile, moneyManager, ApiConnector.addMoney, 'Баланс успешно пополнен!');
moneyManager.conversionMoneyCallback = handler(ProfileWidget.showProfile, moneyManager, ApiConnector.convertMoney, 'Конвертация успешно выполнена!');
moneyManager.sendMoneyCallback = handler(ProfileWidget.showProfile, moneyManager, ApiConnector.transferMoney, 'Перевод успешно выполнен');
favoritesWidget.addUserCallback = handler(updateFavorites, favoritesWidget, ApiConnector.addUserToFavorites, 'Пользователь успешно добавлен!');
favoritesWidget.removeUserCallback = handler(updateFavorites, favoritesWidget, ApiConnector.removeUserFromFavorites, 'Пользователь успешно удален!');


