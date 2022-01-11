import m from "mithril"
import $ from "jquery"
import { MainView,theme } from "./MainView"


$("html").attr("data-theme", theme)
$(theme == "dark" ? "#light" : "#dark").attr("disabled", "disabled")

var Container = {
	view: function(){
		return m(".container",m(MainView))
	}
}

m.mount(document.body, Container);
