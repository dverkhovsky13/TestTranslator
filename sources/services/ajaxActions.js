import authService from "./authentication";

const BASE_API_URL = "http://localhost:3000/";

function parseError(xhr) {
	let message;
	switch (xhr.status) {
		case 404: {
			message = "Not found";
			webix.message({type: "error", text: message});
			break;
		}
		default: {
			try {
				let response = JSON.parse(xhr.response);
				message = response.message;
			}
			catch (e) {
				message = xhr.response;
				console.log("Not JSON response for request to " + xhr.responseURL);
			}
			webix.message({type: "error", text: message, expire: -1});
			break;
		}
	}
	return Promise.reject(xhr);
}

// webix.attachEvent("onBeforeAjax", (mode, url, data, request, headers, files, promise) => {
// 	headers["Girder-Token"] = authService.getToken();
// });

class AjaxActions {

	setTokenIntoUrl(token, symbol) {
		return token ? `${symbol}token=${token}` : "";
	}


	_ajax() {
		return webix.ajax();
	}

	_parseData(data) {
		return data ? data.json() : data;
	}

	login(sourceParams) {
		if (!sourceParams) {
			return;
		}
		const params = {
			login: sourceParams.login,
			password: sourceParams.password
		};
		return webix.ajax().post(`${BASE_API_URL}user/login`, params)
			.fail(parseError)
			.then(result => this._parseData(result));
	}

	postUser(sourceParams) {
		if (!sourceParams) {
			return;
		}
		const params = {
			login: sourceParams.login,
			email: sourceParams.email,
			firstName: sourceParams.firstName,
			lastName: sourceParams.lastName,
			password: sourceParams.password
		};
		return webix.ajax().post(`${BASE_API_URL}user`, params)
			.fail(parseError)
			.then(result => this._parseData(result));
	}

}

const instance = new AjaxActions();
export default instance;
