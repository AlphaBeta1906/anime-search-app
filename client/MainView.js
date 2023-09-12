import m from "mithril"
import {Nav,theme} from "./Nav"

var state = {
	query: "",
	data: [],
	loading:false,
	error:""
}

var Fetch = {
	fetch: function(){
		m.request({
			method: "GET",
			url: `https://api.jikan.moe/v4/search/anime?q=${state.query}`
		}).then(function(datas){
			state.data = datas["results"]
			state.loading=false
		}).catch(function(e){
			state.error = e.message			
		})
		
	}
}

var Card = {
	view: function(vnode){
		return m(".pure-u-3-8 pure-u-md-1-2 pure-u-lg-1-3",
					m("article.left",{style:"text-align:left;margin-right:15px;margin-left:15px"},
					   m("img.w-100",{src:vnode.attrs.image_url,style:"height:45%;width:100%",loading:"lazy"}),
					   m(".pt-3",
					 	 m("h4",vnode.attrs.title),
				         m("span",{style:"display: block !important;"},"airing status : ",m("span",vnode.attrs.airing?"airing":"finish"),
					     vnode.attrs.episodes > 1? m("span.d-block","episodes : ",vnode.attrs.episodes):m(""),
					     m("span",{style:"display: block !important;"},"type : ",vnode.attrs.type),
				         m("span",{style:"display: block !important;"},"score : ",vnode.attrs.score))
					  ),
					  m("footer",
					  	m("a.text-decoration-none",{href:vnode.attrs.url,target:"_blank"},"see at myanimelist > "))
					 )
				)
	}
}
var Content = {
	view: function(){
		return m(".row",
			state.loading?m("",{ "aria-busy":"true"},"loading")
			:
			 state.error?m("p",state.error):state.data.slice(0,9).map(function(anime){
				return m(Card,
							{
								title:anime.title,
								image:anime,
								image_url:anime.image_url,
								airing:anime.airing,
								episodes:anime.episodes,
								score:anime.score,
								type:anime.type,
								url:anime.url,
							})
			})			
		) 
	}
}
var Form = {
	view: function(){
		return m("form.grid",
				{
					style:"padding-top:5rem",
					onsubmit:function(e){
						state.loading = true
						Fetch.fetch()
						e.preventDefault()
					}
				},
				m("input",
						{	
							name: "title",
							type: "text",
							required:true,
							disabled:state.loading?true:false,
							autocomplete:"off",
							placeholder: "enter title of the anime",
							oninput: function(e){
							state.query = e.target.value
						}
				}),
				m("button",{type:"submit",style:"text-align:left;width:25%;"},"search",m("i.fas fa-search",{style:"padding-left:5px"}))
			)
	}
}

var MainView = {
	view: function(){
		return m("",
				 m(Nav),
				 m(Form),
				 m(Content))
	}
}

export {MainView,theme}
