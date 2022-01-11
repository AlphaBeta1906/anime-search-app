import m from "mithril"
import $ from "jquery"

const theme = localStorage.getItem("theme") === null ? "ligth" : localStorage.getItem("theme")


const Nav = {
  view: function () {
    return m("nav",
      m("ul",
        m("li", m("h3", "Logo"))
      ),
      m("ul",
        m("li",
          m("label", { for: "check" }),
          m("i.fas fa-sun", { style: "padding-right:2px" }),
          m("input", {
            id: "check",
            type: "checkbox",
            role: "switch",
            oninput: function () {
              $("html").attr("data-theme", this.checked ? "dark" : "light")
              $(this.checked ? "#light" : "#dark").attr("disabled", "disabled")
              $(this.checked ? "#dark" : "#light").removeAttr("disabled")
              localStorage.setItem("theme", this.checked ? "dark" : "light")
            },
            checked: $("html").attr("data-theme") != "light"
          }),
          m("i.fas fa-moon")
        )
      )
    )
  }
}

const Footer = {
  view: function () {
    return 	m("footer", { style: "position:relative;bottom:0;" },
      m("hr"),
      m("p.font-thin", "© Copyright 2021 alfarizi")
    )
  }
}

export { Nav, Footer, theme }
