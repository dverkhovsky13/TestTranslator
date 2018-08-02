export default class HeaderService {
	constructor(view, authWindow, loginPanel, logoutPanel, loginButton, signUpButton) {
		this._view = view;
		this._authWindow = authWindow;
		this._loginPanel = loginPanel;
		this._logoutPanel = logoutPanel;
		this._loginButton = loginButton;
		this._signUpButton = signUpButton;
		this._init();
	}

	_init() {
		this._view.$scope.on(this._view.$scope.app, "login", () => {
			this.showLogoutPanel();
		});

		this._view.$scope.on(this._view.$scope.app, "logout", () => {
			this._loginPanel.show();
		});

		this._loginButton.attachEvent("onItemClick", (id) => {
			console.log(id);
			this._authWindow.showAuthWindow("login");
		});

		this._signUpButton.attachEvent("onItemClick", (id) => {
			console.log(id);
			this._authWindow.showAuthWindow("signUp");
		});
	}


	showLogoutPanel() {
		this._logoutPanel.show(false, false);
	}
}