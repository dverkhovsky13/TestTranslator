import "./styles/app.css";
import {JetApp} from "webix-jet";
import state from "models/state";

webix.ready(() => {
	webix.CustomScroll.init();
	const app = new JetApp({
		id: APPNAME,
		version: VERSION,
		start: "/main",
	});

	app.render();

	app.attachEvent("app:error:resolve", function (name, error) {
		window.console.error(error);
	});

	state.app = app;

});