import {JetView} from "webix-jet";
import Header from "./header/header";
import Translator from "./translator/tranlator";

export default class MainView extends JetView {
	config() {
		return {
			rows: [
				Header,
				Translator
			]
		}
	}
}