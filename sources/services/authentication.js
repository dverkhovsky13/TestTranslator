import state from "../models/state";
import ajaxActions from "./ajaxActions";

function login(params) {
	return ajaxActions.login(params).then((data) => {
		console.log(data)
		webix.storage.local.put("authToken", data[1]);
		webix.storage.local.put("user", data[2]);
		// trigger event
		state.app.callEvent("login");
		state.app.refresh();
	});
}

function logout() {
	webix.storage.local.remove("user");
	webix.storage.local.remove("authToken");
	state.app.refresh();
}

function getToken() {
	const authToken = webix.storage.local.get("authToken");
	if (!authToken) {
		return null;
	}
	return authToken.token;
}


function isLoggedIn() {
	return getToken() && getUserInfo();
}

function getUserInfo() {
	return webix.storage.local.get("user");
}

export default {
	login,
	logout,
	getToken,
	getUserInfo,
	isLoggedIn
};

