import {JetView} from "webix-jet";

export default class TranslatorView extends JetView {
	config() {
		const tranlatorTextArea = {
			view: "textarea",
			height: 150,
			value: "type here"
		};

		const translatorTemplate = {
			view: "template",
			css: {"background": "#E9E7E7"},
			autoheight: true,
			borderless: true
		};

		const switchButton = {
			view: "button",
			type: "icon",
			icon: "exchange",
			width: 30,
			height: 30,
			click: () => {
				console.log("here im")
			}
		};

		return {
			rows: [
				{},
				{
					cols: [
						{},
						tranlatorTextArea,
						{
							rows: [
								{},
								switchButton,
								{}
							]
						},
						translatorTemplate,
						{}
					]
				},
				{}
			]

		}
	}

	init() {

	}
}