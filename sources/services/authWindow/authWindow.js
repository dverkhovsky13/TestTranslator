import authService from "../authentication";
import ajaxActions from "../ajaxActions";

export default class authWindow {
	constructor(view, form, timesButton, loginOrRegistorButton, cancelButton, headerTemplate) {
		this._view = view;
		this._form = form;
		this._timesButton = timesButton;
		this._loginOrRegistorButton = loginOrRegistorButton;
		this._cancelButton = cancelButton;
		this._headerTemplate = headerTemplate;
		this._init();
	}

	_init() {
		webix.extend(this._view, webix.ProgressBar);

		this._timesButton.attachEvent("onItemClick", () => {
			this._cancelLogic();
		});

		this._loginOrRegistorButton.attachEvent("onItemClick", () => {
			if (this._form.validate()) {
				let buttonValue = this._loginOrRegistorButton.getValue();
				if (buttonValue === "Login") {
					this._loginButtonClick();
				} else if (buttonValue === "Register") {
					this._registerButtonClick();
				}
			}
		});

		this._cancelButton.attachEvent("onItemClick", () => this._cancelLogic());

	}

	_showAuthWindow(authWindowKey) {
		this._view.show();
		if (authWindowKey === "login") {
			this._form.showBatch("login");
			this._headerTemplate.define("template", "Login");
			this._headerTemplate.refresh();
			this._loginOrRegistorButton.define("value", "Login");
			this._loginOrRegistorButton.refresh();
		} else if (authWindowKey === "signUp") {
			this._form.showBatch("signup");
			this._headerTemplate.define("template", "Register");
			this._headerTemplate.refresh();
			this._loginOrRegistorButton.define("value", "Register");
			this._loginOrRegistorButton.refresh();
		}
	}

	_loginButtonClick() {
		this._view.showProgress();
		if (this._form.validate()) {
			authService.login(this._form.getValues())
				.then(() => {
					this._form.clear();
					this._form.elements["error-label"].hide();
					this._view.hideProgress();
					this._cancelLogic();
				})
				.fail((xhr) => {
					if (xhr.status === 401) {
						const errorLabel = this._form.elements["error-label"];
						errorLabel.setValue("Login failed");
						errorLabel.show();
					}
					this._view.hideProgress();
				});
		}
		else {
			this._view.hideProgress();
		}
	}

	_registerButtonClick() {
		const values = this._form.getValues();
		console.log(values);
		ajaxActions.postUser(values).then((data) => {
			webix.message("User has been registered. Please, log in");
			this._form.clear();
			this._cancelLogic();
		});
	}

	_cancelLogic() {
		this._view.hide();
		this._form.elements["error-label"].hide();
	}
}