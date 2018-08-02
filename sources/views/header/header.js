import {JetView} from "webix-jet";
import AuthWindow from "./windows/authWindow";
import LogoutPanel from "./parts/logoutPanel";
import HeaderService from "../../services/header/header";
import authService from "../../services/authentication";

export default class HeaderView extends JetView {
	config() {

		const logo = {
			template: "Test translator",
			css: "logoTemplate",
			borderless: true,
			width: 200,
		};

		const loginButton = {
			view: "button",
			name: "loginButtonName",
			width: 80,
			value: "Log in"
		};

		const signInButton = {
			view: "button",
			name: "signUpButtonName",
			width: 80,
			value: "Sign up"
		};

		const loginPanel = {
			name: "loginPanelName",
			cols: [
				{},
				loginButton,
				signInButton
			]
		};

		const logoutPanel = {
			name: "logoutPanelName",
			cols: [
				LogoutPanel
			]
		};

		const userPanel = {
			view: "multiview",
			cells: [
				loginPanel,
				logoutPanel
			]
		};

		const header = {
			view: "toolbar",
			height: 50,
			cols: [
				{},
				logo,
				{},
				userPanel,
				{}
			]
		};

		return header;
	}

	init(view) {
		this.loginWindow = this.ui(AuthWindow);
		this.loginPanel = this.getRoot().queryView({name: "loginPanelName"});
		this.logoutPanel = this.getRoot().queryView({name: "logoutPanelName"});
		this.loginButton = this.getRoot().queryView({name: "loginButtonName"});
		this.signInButton = this.getRoot().queryView({name: "signUpButtonName"});

		this.headerService = new HeaderService(
			view,
			this.loginWindow,
			this.loginPanel,
			this.logoutPanel,
			this.loginButton,
			this.signInButton
		);

		if (authService.isLoggedIn()) {
			this.headerService.showLogoutPanel();
		}
	}
}