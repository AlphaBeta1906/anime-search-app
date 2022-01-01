import m from "mithril"
import u from "umbrellajs"

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
			url: `https://api.jikan.moe/v3/search/anime?q=${state.query}`
		}).then(function(datas){
			state.data = datas["results"]
			state.loading=false
			u("input").val("")
		}).catch(function(e){
			state.error = e.message			
		})
		
	}
}

var Card = {
	view: function(vnode){
		return m(".col-lg-4 col-md-5 col-sm-6 py-1",
					m("article.left",{style:"text-align:left;"},
					   m("img.w-100",{src:vnode.attrs.image_url,style:"height:45%;",loading:"lazy"}),
					   m(".pt-3",
					 	 m("h4",vnode.attrs.title),
				         m("span.d-block","airing status : ",m("span",vnode.attrs.airing?"airing":"finish"),
					     vnode.attrs.episodes > 1? m("span.d-block","episodes : ",vnode.attrs.episodes):m(""),
					     m("span.d-block","type : ",vnode.attrs.type),
				         m("span.d-block","score : ",vnode.attrs.score))
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
				m("button",{type:"submit",style:"text-align:left;width:25%"},"search")
			)
	}
}

var MainView = {
	view: function(){
		return m("",m(Form),m(Content))
	}
}

export {MainView}
