// Babel has deprecated @babel/polyfill, and the following two imports are used for polyfills instead.
import m from "mithril"
import { MainView } from "./MainView"

var Container = {
	view: function(){
		return m(".container",m(MainView))
	}
}

m.mount(document.body, Container);
