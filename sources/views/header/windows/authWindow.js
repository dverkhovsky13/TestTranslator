import {JetView} from "webix-jet";
import "./passwordInput";
import AuthWindowService from "../../../services/authWindow/authWindow";
import "../../../utils/activeComponents";
import authService from "../../../services/authentication";

export default class AuthWindowView extends JetView {
	config() {
		const errorLabel = {
			view: "label",
			batch: "login",
			name: "error-label",
			label: "",
			align: "center",
			hidden: true
		};

		const loginField = {
			view: "text",
			name: "login",
			label: "Login",
			placeholder: "Enter Login",
			invalidMessage: "Enter Login"
		};

		const emailField = {
			view: "text",
			name: "email",
			label: "Email",
			placeholder: "Enter your email",
			invalidMessage: "Enter your email",
			batch: "signup"
		};

		const firsNameField = {
			view: "text",
			name: "firstName",
			label: "First name",
			placeholder: "Enter your first name",
			invalidMessage: "Enter your first name",
			batch: "signup"
		};

		const lastNameField = {
			view: "text",
			name: "lastName",
			label: "Last name",
			placeholder: "Enter your last name",
			invalidMessage: "Enter your last name",
			batch: "signup"
		};

		const passwordField = {
			view: "passwordInput",
			name: "password",
			label: "Password",
			placeholder: "Enter password",
			invalidMessage: "Enter password"
		};

		const confirmPasswordField = {
			view: "passwordInput",
			name: "confirmPassword",
			label: "Retype password",
			placeholder: "Confirm password",
			invalidMessage: "Passwords do not match",
			batch: "signup"
		};

		const cancelButton = {
			view: "button",
			width: 80,
			name: "cancelButtonName",
			value: "Cancel",
		};

		const loginOrRegisterButton = {
			view: "button",
			width: 80,
			name: "loginOrRegisterButtonName",
			hotkey: "enter",
		};

		const loginForm = {
			view: "form",
			width: 600,
			visibleBatch: "login",
			rules: {
				login: webix.rules.isNotEmpty,
				email: webix.rules.isEmail,
				firstName: webix.rules.isNotEmpty,
				lastName: webix.rules.isNotEmpty,
				password: webix.rules.isNotEmpty,
				confirmPassword(value) {
					const password = this.getValues().password;
					return password === value;
				}
			}, //init in authWindow service
			elements: [
				errorLabel,
				loginField,
				emailField,
				firsNameField,
				lastNameField,
				passwordField,
				confirmPasswordField,
				{
					cols: [
						{},
						cancelButton,
						{width: 10},
						loginOrRegisterButton
					]
				}
			], // init in authWindow service
			elementsConfig: {
				labelWidth: 120
			}
		};

		const loginWindow = {
			view: "window",
			modal: true,
			position: "center",
			headHeight: 30,
			move: true,
			head: {
				view: "toolbar",
				borderless: true,
				type: "clean",
				height: 32,
				cols: [
					{
						view: "template",
						template: "Login",
						name: "headerTemplateName",
						borderless: true,
						autoheight: true
					},
					{
						view: "button",
						name: "timesIconButtonName",
						type: "icon",
						icon: "times-circle-o",
						width: 30,
						align: "right"
					},
					{width: 5}
				]
			},
			body: loginForm
		};

		return loginWindow;
	}

	init(view) {
		this.form = this.getRoot().queryView({view: "form"});
		this.timesButton = this.getRoot().queryView({name: "timesIconButtonName"});
		this.loginOrRegisterButton = this.getRoot().queryView({name: "loginOrRegisterButtonName"});
		this.cancelButton = this.getRoot().queryView({name: "cancelButtonName"});
		this.headerTemplate = this.getRoot().queryView({name: "headerTemplateName"});
		this.authWindowService = new AuthWindowService(
			view,
			this.form,
			this.timesButton,
			this.loginOrRegisterButton,
			this.cancelButton,
			this.headerTemplate
		)
	}

	showAuthWindow(authKey) {
		this.authWindowService._showAuthWindow(authKey)
	}

}
