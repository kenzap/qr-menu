!function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,a=new Array(e);r<e;r++)a[r]=t[r];return a}function r(t,r){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=function(t,r){if(t){if("string"==typeof t)return e(t,r);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?e(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){a&&(t=a);var o=0,n=function(){};return{s:n,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,d=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return i=t.done,t},e:function(t){d=!0,c=t},f:function(){try{i||null==a.return||a.return()}finally{if(d)throw c}}}}var a="https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com",o="66432108790002",n=function(t){return(""+t).length<2?"0"+t:t},c=function(t){for(var e=t+"=",r=decodeURIComponent(document.cookie).split(";"),a=0;a<r.length;a++){for(var o=r[a];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e))return o.substring(e.length,o.length)}return""},i=function(t){t=d(t);var e=parseFloat(t).toFixed(2);switch(config.price.style){case"left":e=config.price.symbol+e;break;case"right":e+=config.price.symbol}return e},d=function(t){return t=""==t?0:t},s=function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz".split("");"number"!=typeof t&&(t=Math.floor(Math.random()*e.length_));for(var r="",a=0;a<t;a++)r+=e[Math.floor(Math.random()*e.length)];return r},l=function(t){return t.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")},u=function(){window.navigator&&window.navigator.vibrate&&navigator.vibrate(20)},p=function(t){var e=document.querySelector(".kUNwHA .snackbar");e.innerHTML=t,e.classList.add("show"),setTimeout((function(){e.className=e.className.replace("show","")}),2200)},m=function(t){for(var e=function(t,e){return e.forEach((function(e,r){t=t.replace("%"+(r+1)+"$",e)})),t},r=arguments.length,a=new Array(r>1?r-1:0),o=1;o<r;o++)a[o-1]=arguments[o];return void 0===i18n.state.locale.values[t]?e(t,a):e(i18n.state.locale.values[t],a)},y=function(t,e){switch(e){case"new":return'<div class="badge btn-warning text-dark fw-light">'+t("New")+"</div>";case"processing":return'<div class="badge btn-warning text-dark fw-light">'+t("Cooking")+"</div>";case"completed":return'<div class="badge btn-success text-dark fw-light">'+t("Served")+"</div>";default:return'<div class="badge btn-primary text-dark fw-light">'+t("Processing")+"</div>"}},v={state:{total:0,count:0,index:0,product:{variations:[]},order:{}},resetButton:function(){v.state.total=0,v.state.count=0},refreshButton:function(){v.state.product.qty=parseInt(document.querySelector(".kUNwHA .mdialog .qty").value),v.state.product.price=""==products[v.state.index].priced?parseFloat(products[v.state.index].price):parseFloat(products[v.state.index].priced),v.state.product.note=document.querySelector(".kUNwHA .mdialog .kp-note textarea").value;var t,e=r(document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox]"));try{for(e.s();!(t=e.n()).done;){var a=t.value;a.checked&&(v.state.product.price+=parseFloat(a.dataset.price))}}catch(t){e.e(t)}finally{e.f()}var o,n=r(document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio]"));try{for(n.s();!(o=n.n()).done;){var c=o.value;c.checked&&(v.state.product.price+=parseFloat(c.dataset.price))}}catch(t){n.e(t)}finally{n.f()}v.state.product.priceF=parseFloat(v.state.product.price*v.state.product.qty),document.querySelector(".kUNwHA .mdialog .add .price").innerHTML=i(v.state.product.priceF);var d=!1;for(var s in 0==v.state.product.priceF&&(d=!0),v.state.product.variations)0==v.state.product.variations[s].allow&&(d=!0);document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .add").style.background="","update"==v.state.product.type&&v.state.product.qty>0&&(document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .cta").innerHTML=m("Update")),"update"==v.state.product.type&&0==v.state.product.qty&&(document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .cta").innerHTML=m("Remove"),document.querySelector(".kUNwHA .mdialog .kp-add .btn .add")&&(document.querySelector(".kUNwHA .mdialog .kp-add .btn .add").style.background="#df1960"),d=!1),"new"==v.state.product.type&&(document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .cta").innerHTML=m("Add")),d?document.querySelector(".kUNwHA .mdialog .kp-add .mbtn").classList.add("dis"):document.querySelector(".kUNwHA .mdialog .kp-add .mbtn").classList.remove("dis")},refreshCheckoutButton:function(){var t=0;for(var e in v.state.order.items)t+=parseFloat(v.state.order.items[e].priceF);v.state.order.total=t,t>0?(document.querySelector("body").classList.add("cbtn"),h(1),document.querySelector(".kUNwHA .cta-btn .price").innerHTML=i(t)):(document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML=m("cart empty"),document.querySelector("body").classList.remove("cbtn"))},addToCart:function(){v.state.order.items.push(v.state.product),0==v.state.product.qty?v.removeFromCart(v.state.product.id):document.querySelector(".kUNwHA .kenzap-row[data-id='"+v.state.product.id+"'] .ctag").innerHTML=v.state.product.qty,localStorage.cart=JSON.stringify(v.state.order),v.refreshCheckoutButton()},removeFromCart:function(t){v.state.order.items=v.state.order.items.filter((function(e){return e.id!=t})),delete v.state.order.items[t],document.querySelector(".kUNwHA .kenzap-row[data-id='"+t+"'] .ctag").innerHTML="",localStorage.cart=JSON.stringify(v.state.order)},clearCart:function(){for(var t in v.state.order.items)document.querySelector(".kUNwHA .kenzap-row[data-id='"+v.state.order.items[t].id+"'] .ctag").innerHTML="";v.state.order={},v.state.order.created=Math.floor(Date.now()/1e3),v.state.order.items=[],localStorage.cart=JSON.stringify(v.state.order),v.refreshCheckoutButton(),window.history.replaceState({},document.title,config.domain)}},f=function(t,e){var r="";for(var a in e.variations){var o="";for(var n in e.variations[a].list)o+=e.variations[a].list[n].title+" ";r+="<div><b>"+e.variations[a].title+"</b> <span>"+o+"</span></div> ",void 0!==e.variations[a].note&&e.variations[a].note.length>0&&(r+="<div><b>"+m("Note")+"</b> "+e.variations[a].note+"</div> ")}return'<tr><td data-id="'+e.id+'" data-title="'+m(e.title)+'" class="checkt"><div>'+m(e.title)+"</div><div>"+r+'</div></td><td class="qty">'+e.qty+'</td><td class="price"><strong>'+i(e.price)+"</strong></td></tr>"},h=function(t){switch(document.querySelector(".kUNwHA .cta-btn").style.display="flex",t){case 1:v.state.order.step=t,document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML=m("Cart")+' <span class="price">s$0.00</span>';break;case 2:v.state.order.step=t,document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML=m("Continue");break;case 3:v.state.order.step=t,document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML=m("Checkout");break;case 4:v.state.order.step=t,document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML=m("Back to menu")}};const g=()=>{let t=new URLSearchParams(window.location.search);return t.get("sid")?t.get("sid"):""},k=t=>{let e=t+"=",r=decodeURIComponent(document.cookie).split(";");for(let t=0;t<r.length;t++){let a=r[t];for(;" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(e))return a.substring(e.length,a.length)}return""};k("kenzap_api_key"),k("locale")&&k("locale"),(()=>{let t=localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,e=window.location.hostname+"/"+g()+"/"+k("locale");e!=k("check")&&(t=0,console.log("refresh")),((t,e,r)=>{let a="";if(r){let t=new Date;t.setTime(t.getTime()+24*r*60*60*1e3),a=";expires="+t.toUTCString()}document.cookie=t+"="+(escape(e)||"")+a+";path=/;domain=.kenzap.cloud"})("check",e,5)})(),k("kenzap_token"),g();var w={state:0,last_state:0,state_prev:0,fp:0,el_id:"",direction:"",offsets:{},timer:null},S=function(){document.querySelector("body").classList.contains("kp-modal")&&(document.querySelector("body").style.height="100vh",document.querySelector("body").style.overflowY="hidden",document.querySelector(".kUNwHA .scrollable").style.height="100vh",document.querySelector(".kUNwHA .scrollable").style.overflowY="hidden",document.querySelector(".kUNwHA .mdialog-cnt").style.height=window.screen.availHeight-160+"px")},b=function(){document.querySelector(".kUNwHA .mdialog-cnt").style.display="none",document.querySelector(".kUNwHA .overlay").style.display="none",document.querySelector(".kUNwHA .scrollable").style.height="auto",document.querySelector(".kUNwHA .scrollable").style.overflowY="scroll",document.querySelector("body").style.overflowY="auto",document.querySelector("body").style.height="auto",setTimeout((function(){document.querySelector("body").classList.remove("kp-modal")}),300),document.documentElement.scrollTop=w.last_state,document.querySelector(".kUNwHA .cdialog-cnt").style.display="none",v.refreshCheckoutButton(),document.querySelector(".kUNwHA .cta-btn").style.display="flex",-1!=window.location.href.indexOf("#editing")&&history.pushState({pageID:"feed"},"Feed",window.location.pathname+window.location.search)},q=function(t){var e=document.querySelector(".kUNwHA .cdialog-cnt");e.style.display="block",document.querySelector(".kUNwHA .overlay").style.display="block",document.querySelector(".kUNwHA .cta-btn").style.display="none",document.querySelector("body").classList.add("kp-modal"),history.pushState({pageID:"feed"},"Feed",window.location.pathname+window.location.search+"#account"),S();var r='\n        <div class="account">\n            <h3>'.concat(m("Last order status"),' <span class="statusLast"></span></h3>\n            <p>').concat(m("View last order activity and updates."),'</p>\n            <div class="lottie-cont"></div>\n            ');"new"==t&&(r='\n            <div class="account">\n                <h3>'.concat(m("Order received!"),' <span class="statusLast"></span></h3>\n                <p>').concat(m("Thank you for placing your order. You can now close the window or return to the menu."),'</p>\n                <div class="lottie-cont"></div>\n                ')),r+="\n            <h4>".concat(m("Summary"),'</h4>\n            <div class="orders">'),A(r,e),r+="</div>",r+="</div>",e.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML=r},A=function(t,e){var a,o=[],n=Date.now()/1e3|0,c=r(function(){var t=[];try{t=JSON.parse(localStorage.orderIDs)}catch(t){}return t}());try{for(c.s();!(a=c.n()).done;){var i=a.value;i.time>n-2592e3&&o.push(i.id)}}catch(t){c.e(t)}finally{c.f()}fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+API_KEY,"Kenzap-Token":config.token,"Kenzap-Sid":localStorage.sid},body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:k("kenzap_token")},orders:{type:"find",key:"ecommerce-order",fields:["_id","status","items","created"],id:o,limit:10,sortby:{field:"created",order:"DESC"}}}})}).then((function(t){return t.json()})).then((function(t){if((()=>{let t=document.querySelector(".loader");t&&(t.style.display="none")})(),t.success){var a,o=!0,n="cooking",c='<ul class="accordion">',i=r(t.orders);try{for(i.s();!(a=i.n()).done;){var d=a.value;o&&(document.querySelector(".statusLast").innerHTML=y(m,d.status),"completed"==d.status&&(n="serving")),c+=H(d),o=!1}}catch(t){i.e(t)}finally{i.f()}switch(n){case"cooking":document.querySelector(".account .lottie-cont").innerHTML='<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_fefIZO.json" background="transparent" speed="1" class="lplayer" style="width: 300px; height: auto;" loop autoplay></lottie-player>';break;case"serving":document.querySelector(".account .lottie-cont").innerHTML='<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_thgy1p9c.json" background="transparent" speed="1" class="lplayer" style="width: 300px; height: auto;" loop autoplay></lottie-player>'}c+="</ul>",e.querySelector(".kUNwHA .orders").innerHTML=c,((t,e)=>{if(document.querySelector(t))for(let r of document.querySelectorAll(t))r.removeEventListener("click",e,!0),r.addEventListener("click",e,!0)})(".kUNwHA .accordion .toggle",(function(t){t.preventDefault(),t.currentTarget.classList.contains("active")?(t.currentTarget.classList.remove("active"),t.currentTarget.parentElement.querySelector(".inner").classList.remove("show"),t.currentTarget.parentElement.querySelector(".plusminus").classList.remove("active")):(t.currentTarget.classList.add("active"),t.currentTarget.parentElement.querySelector(".inner").classList.add("show"),t.currentTarget.parentElement.querySelector(".plusminus").classList.add("active"))})),document.querySelector(".kUNwHA .cta-btn").style.display="none"}else p(m("Please make your first order")),N()})).catch((function(t){(t=>{if(console.log(t),isNaN(t.code)){let e=t;try{e=JSON.stringify(e)}catch(t){}let r=new URLSearchParams;return r.append("cmd","report"),r.append("sid",g()),r.append("token",k("kenzap_token")),r.append("data",e),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:r}),void alert("Can not connect to Kenzap Cloud")}if(401===t.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(t.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(t.reason)})(t)}))},H=function(t){var e='<li>\n        <a class="toggle" href="#">\n            #'.concat(t._id.substr(0,5),' <span class="timago">').concat(function(t,e,r){var a=(e=parseInt(e))-(r=parseInt(r));if(a<60)return"moments ago";if(a<3600)return parseInt(a/60)+" minutes ago";if(a<86400)return parseInt(a/60/24)+" hours ago";var o=new Date(1e3*r),n=[t("Jan"),t("Feb"),t("Mar"),t("Apr"),t("May"),t("Jun"),t("Jul"),t("Aug"),t("Sep"),t("Oct"),t("Nov"),t("Dec")],c=o.getFullYear(),i=n[o.getMonth()],d=o.getDate();return o.getHours(),o.getMinutes(),o.getSeconds(),d+" "+i+" "+c}(m,Date.now()/1e3|0,t.created),"</span> ").concat(y(m,t.status),'<div class="plusminus"></div>\n        </a>\n        <div class="inner">\n            <table>\n                <tr><th><div class="me-1 me-sm-3">').concat(m("Product"),'</div></th><th class="qty"><div class="me-1 me-sm-3">').concat(m("Qty"),'</div></th><th class="price"><div class="me-1 me-sm-3">').concat(m("Total"),"</div></th><th></th></tr>");for(var r in t.items)e+=f(0,t.items[r]);return e+="</table>\n        </div>\n    </li>"},N=function(){document.querySelector(".kUNwHA .mdialog-cnt").style.display="none",document.querySelector(".kUNwHA .overlay").style.display="none",document.querySelector(".kUNwHA .scrollable").style.height="auto",document.querySelector(".kUNwHA .scrollable").style.overflowY="scroll",document.querySelector("body").style.overflowY="auto",document.querySelector("body").style.height="auto",setTimeout((function(){document.querySelector("body").classList.remove("kp-modal")}),300),document.documentElement.scrollTop=scroll.last_state,document.querySelector(".kUNwHA .cdialog-cnt").style.display="none",document.querySelector(".kUNwHA .cta-btn").style.display="flex","undefined"!=typeof cart&&cart.refreshCheckoutButton()},U="";document.addEventListener("DOMContentLoaded",(function(){config.moreButton&&(document.querySelector(".kUNwHA .cta-btn .mbtnMore").style.display="flex",document.querySelector(".kUNwHA .cta-btn .mbtnMore").addEventListener("click",(function(t){q("")}))),L(),function(){h(1);try{var t=localStorage.cart;void 0===(t=t?JSON.parse(t):{created:Math.floor(Date.now()/1e3)}).items&&(t.items=[]),t.created+3600<Math.floor(Date.now()/1e3)&&(t.items=[],t.created=Math.floor(Date.now()/1e3)),v.state.order=t}catch(t){v.state.order.created=Math.floor(Date.now()/1e3),v.state.order.items=[]}localStorage.idd||(localStorage.idd=s(8)+Math.floor(Date.now())),v.refreshCheckoutButton()}(),T();M((function(){console.log("processed")}),!1),document.addEventListener("scroll",z)}));var L=function(){var t=new URLSearchParams(window.location.search);U=t.get("table")?t.get("table"):""},T=function(){localStorage.sid=config.sid,function(){var t,e=settings.categories.split("\n"),o="",n="",c="",d=r(e);try{for(d.s();!(t=d.n()).done;){var s=t.value.split("|"),u=s[0].trim(),p=null==s[1]?"":s[1].trim();o+='<div class="slide" data-href="'+l(u)+'"><a href="#'+l(u)+'" class=" cl">'+m(u)+"</a></div>";var y=function(t){if(products[t].id=products[t]._id,void 0===products[t].cats)return"continue";if(null==products[t].cats)return"continue";if(!products[t].cats.includes(u))return"continue";var e;if(products[t].img[0]||"true"==products[t].img[0]){var r=new Image;r._id=products[t]._id,r.updated=products[t].updated,(e=r).onload=function(){document.querySelector(".kUNwHA .kenzap-row[data-id='"+e._id+"'] img").setAttribute("src",e.src)},e.src=a+"/S"+localStorage.sid+"/product-"+e._id+"-1-250.jpeg?"+e.updated}var o='<span class="tag ptag">'+i(products[t].price)+"</span>";""!=products[t].priced&&(o='<span class="ptagc">'+i(products[t].price)+'</span> <span class="tag ptag">'+i(products[t].priced)+"</span>");var d=v.state.order.items.find((function(e){return e.id==products[t]._id})),s=void 0===d?"":d.qty,y="";c!=u&&(y='<h2 id="'+l(c=u)+'">'+m(c)+'</h2><p class="subnote">'+m(p)+"</p>"),n+='            <div class="kenzap-row" data-index="'+t+'" data-id="'+products[t]._id+'">                '+y+'                <div class="info-box">                    <div class="kenzap-col-7">                        <div class="kp-content">                            <h3><span class="tag ctag">'+s+"</span>"+m(products[t].title)+"</h3>                            <p>"+m(products[t].sdesc)+"</p>                            "+o+'                        </div>                    </div>                    <div class="kenzap-col-5">                        <div class="kp-img">                            <img src="https://cdn.kenzap.com/loading.png" alt="'+products[t].title+'">                        </div>                    </div>                </div>                            </div>'};for(var f in products)y(f)}}catch(t){d.e(t)}finally{d.f()}var h=document.querySelector(".kUNwHA .slideset"),g=document.querySelector(".kUNwHA .kenzap-container");""==n?g.innerHTML=m("Please add products and specify categories first"):(h.innerHTML=o,g.innerHTML=n)}(),x(),function(){var e,o=r(document.querySelectorAll(".kUNwHA .kenzap-row"));try{for(o.s();!(e=o.n()).done;)e.value.addEventListener("click",(function(e){var o=e.currentTarget.dataset.index;v.state.index=o;var n=products[o].id,c=document.querySelector(".kUNwHA .mdialog-cnt");w.last_state=w.state,v.state.total=0,v.state.count=0;var s=v.state.order.items.find((function(t){return t.id==n}));v.state.product=void 0===s?{id:products[o].id,title:products[o].title,sdesc:products[o].sdesc,index:o,qty:0,note:"",variations:[]}:s,v.state.product.type=0==v.state.product.qty?"new":"update",document.querySelector("body").classList.add("kp-modal"),history.pushState({pageID:"feed"},"Feed",window.location.pathname+window.location.search+"#editing"),S();var l=products[o].img[0]?a+"/S"+localStorage.sid+"/product-"+products[o]._id+"-1-250.jpeg?"+products[o].updated:"https://cdn.kenzap.com/loading.png";document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-body > h2").innerHTML=m(v.state.product.title),document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-body > p").innerHTML=m(v.state.product.sdesc),document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-img img").setAttribute("src",l),document.querySelector(".kUNwHA .mdialog .qty").value=v.state.count=v.state.product.qty,document.querySelector(".kUNwHA .mdialog .kp-note textarea").value=v.state.product.note;var u,p=new Image;p._id=products[o]._id,p.updated=products[o].updated,(u=p).onload=function(){document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-img img").setAttribute("src",u.src)},u.src=a+"/S"+localStorage.sid+"/product-"+u._id+"-1-500.jpeg?"+u.updated;var y="";if(t("undefined"!==products[o].variations))for(var f in products[o].variations){var h="";for(var g in"checkbox"==products[o].variations[f].type&&(h="check"),"radio"==products[o].variations[f].type&&(h="radio"),void 0===v.state.product.variations[f]&&(v.state.product.variations[f]={title:products[o].variations[f].title,required:products[o].variations[f].required,allow:"1"!=products[o].variations[f].required}),y+="                <h3>"+m(products[o].variations[f].title)+("1"==products[o].variations[f].required?' <span class="tag">'+m("required")+"</span>":"")+'</h3>                <div class="kp-'+h+'">',products[o].variations[f].data){var k=!1;switch(void 0!==v.state.product.variations[f]&&void 0!==v.state.product.variations[f].list&&void 0!==v.state.product.variations[f].list["_"+g]&&(k=!0),products[o].variations[f].data[g].price=d(products[o].variations[f].data[g].price),h){case"check":y+='                            <label>                                <input type="checkbox" data-required="'+products[o].variations[f].required+'" data-indexv="'+f+'" data-index="'+g+'" data-title="'+products[o].variations[f].data[g].title+'" data-price="'+products[o].variations[f].data[g].price+'" '+(k?'checked="checked"':"")+'>                                <div class="checkbox">                                    <svg width="20px" height="20px" viewBox="0 0 20 20">                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>                                        <polyline points="4 11 8 15 16 6"></polyline>                                    </svg>                                </div>                                <span>'+m(products[o].variations[f].data[g].title)+'</span>                                <div class="price">+ '+i(products[o].variations[f].data[g].price)+"</div>                            </label>";break;case"radio":y+='                            <label>                                <input type="radio" data-required="'+products[o].variations[f].required+'" data-indexv="'+f+'" name="radio'+f+'" data-index="'+g+'" data-title="'+products[o].variations[f].data[g].title+'" data-price="'+products[o].variations[f].data[g].price+'" '+(k?'checked="checked"':"")+" />                                <span>"+m(products[o].variations[f].data[g].title)+'</span>                                <div class="price">+ '+i(products[o].variations[f].data[g].price)+"</div>                            </label>"}}y+="</div>"}document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-vars").innerHTML=y,v.refreshButton(),c.style.display="block",document.querySelector(".kUNwHA .overlay").style.display="block";var b,q=r(document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox]"));try{var A=function(){var t=b.value;t.addEventListener("change",(function(){var e=parseInt(t.dataset.indexv);v.state.product.variations[e].list={};var a,o=0,n=r(document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox][data-indexv='"+e+"']"));try{for(n.s();!(a=n.n()).done;){var c=a.value;"1"==t.dataset.required?o&&(v.state.product.variations[e].allow=!0):v.state.product.variations[e].allow=!0,c.checked&&(v.state.product.variations[e].list["_"+c.dataset.index]={title:c.dataset.title,price:parseFloat(c.dataset.price)},o+=1)}}catch(t){n.e(t)}finally{n.f()}v.refreshButton()}))};for(q.s();!(b=q.n()).done;)A()}catch(t){q.e(t)}finally{q.f()}var H,N=r(document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio]"));try{var U=function(){var t=H.value;t.addEventListener("change",(function(){var e=parseInt(t.dataset.indexv);v.state.product.variations[e].list={};var a,o=0,n=r(document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio][data-indexv='"+e+"']"));try{for(n.s();!(a=n.n()).done;){var c=a.value;c.checked&&(v.state.product.variations[e].list["_"+c.dataset.index]={title:c.dataset.title,price:parseFloat(c.dataset.price)},o+=1),"1"==t.dataset.required?o&&(v.state.product.variations[e].allow=!0):v.state.product.variations[e].allow=!0}}catch(t){n.e(t)}finally{n.f()}v.refreshButton()}))};for(N.s();!(H=N.n()).done;)U()}catch(t){N.e(t)}finally{N.f()}}))}catch(t){o.e(t)}finally{o.f()}var n=document.querySelector(".kUNwHA .mdialog .qty");document.querySelector(".kUNwHA .mdialog .plus").addEventListener("click",(function(t){v.state.count<config.cart.max_addition&&(v.state.count+=1),n.value=v.state.count,v.refreshButton(),u()})),document.querySelector(".kUNwHA .mdialog .minus").addEventListener("click",(function(t){v.state.count>0&&(v.state.count-=1),n.value=v.state.count,v.refreshButton(),u()})),document.querySelector(".kUNwHA .mdialog .add").addEventListener("click",(function(t){t.currentTarget.parentNode.classList.contains("dis")?alert(m("Please select required fields")):(v.addToCart(),b(),p(m("Cart updated")),u())}))}(),function(){var t,e=r(document.querySelectorAll(".kUNwHA .slideset .slide"));try{for(e.s();!(t=e.n()).done;){var a=t.value,o=a.offsetLeft;w.offsets[a.dataset.href]=o,a.addEventListener("click",(function(t){document.documentElement.scrollTop,setTimeout((function(t){var e,a=r(document.querySelectorAll(".kUNwHA .slide"));try{for(a.s();!(e=a.n()).done;)e.value.classList.remove("active")}catch(t){a.e(t)}finally{a.f()}t.classList.add("active")}),250,this)}))}}catch(t){e.e(t)}finally{e.f()}}(),document.querySelector(".kUNwHA .cta-btn .mbtn").addEventListener("click",(function(t){if(document.querySelector("body").classList.add("kp-modal"),history.pushState({pageID:"feed"},"Feed",window.location.pathname+window.location.search+"#checkout"),S(),1==v.state.order.step)return 0==v.state.order.total?void p(m("Cart is empty")):(_(),void h(2));if(2==v.state.order.step){if(0==v.state.order.total)return void p(m("Cart is empty"));var e="";return e='<div class="ptable">',e+='<label for="table" style="'+(U.length>0?"display:none;":"")+'">'+m("Table number")+"</label>",e+='<input type="number" value="'+U+'" name="table" style="'+(U.length>0?"display:none;":"")+'" autocomplete="off" class="table" size="4" pattern="" inputmode="">',e+='<label for="note">'+m("Note")+"</label>",e+='<textarea class="note" name="note" placeholder="'+m("leave a note for a kitchen")+'"></textarea>',e+="</div>",document.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML=e,document.querySelector(".kUNwHA .cdialog-cnt .ptable .table").focus(),void h(3)}if(3==v.state.order.step){var r=document.querySelector(".kUNwHA .cdialog-cnt .ptable .table").value,a=document.querySelector(".kUNwHA .cdialog-cnt .ptable .note").value;if(""==r)return void alert("Please enter table number");v.state.order.table=r,v.state.order.note=a,localStorage.cart=JSON.stringify(v.state.order),document.querySelector(".kUNwHA .cdialog-cnt").style.display="none",b();var n=config.domain;return-1==n.indexOf("checkout")&&(n+=(-1==n.indexOf("?")?"?":"&")+"checkout=1"),window.location.href="https://auth.kenzap.com/?app="+o+"&redirect="+encodeURIComponent(n),document.querySelector(".kUNwHA .overlay").style.display="block",void(document.querySelector(".kUNwHA .overlay .loader").style.display="block")}4!=v.state.order.step||b()}))},x=function(){document.querySelector(".kUNwHA .mdialog .close").addEventListener("click",(function(t){b()})),document.querySelector(".kUNwHA .cdialog .close").addEventListener("click",(function(t){document.querySelector(".kUNwHA .cdialog-cnt").style.display="none",h(1),b()})),window.addEventListener("resize",S),window.addEventListener("orientationchange",S),window.addEventListener("hashchange",(function(t){if(document.querySelector("body").classList.contains("kp-modal"))return t.preventDefault(),b(),!1}))},_=function t(){var e=document.querySelector(".kUNwHA .cdialog-cnt");S(),e.style.display="block",document.querySelector(".kUNwHA .overlay").style.display="block";var a='\n        <table class="cart-table">\n\n            <tr><th><div class="prod me-1 me-sm-3">'.concat(m("Product"),'</div></th><th class="qty"><div class="me-1 me-sm-3">').concat(m("Qty"),'</div></th><th class="price"><div class="me-1 me-sm-3">').concat(m("Total"),"</div></th><th></th></tr>");for(var o in v.state.order.items)a+=f(0,v.state.order.items[o]);a+=function(t,e,r){var a="";if(a+='<tr><td colspan="4"><div class="price" style="margin-top:16px;">'.concat(m("Amount:")," <b>").concat(i(r.total),"</b></div></td></tr>"),e.price.tax_calc){var o=r.total*(parseFloat(e.price.tax_rate)/100);t.state.order.total_tax=o,t.state.order.total_tax_rate=parseFloat(e.price.tax_rate),a+='<tr><td colspan="4"><div class="price ">'.concat(e.price.tax_display+" ("+e.price.tax_rate+"%):"," <b>").concat(i(o),"</b></div></td></tr>"),t.state.order.total_with_tax=o+r.total,a+='<tr><td colspan="4"><div class="price ">'.concat(m("Total:")," <b>").concat(i(o+r.total),"</b></div></td></tr>")}return a}(v,config,v.state.order),a+="\n        </table>",e.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML=a;var n,c=r(e.querySelectorAll(".kUNwHA .cdialog-cnt .kp-body .checkt"));try{for(c.s();!(n=c.n()).done;){n.value.addEventListener("click",(function(e){if(confirm("Remove "+e.currentTarget.dataset.title+"?")){if(document.querySelector(".kUNwHA .kenzap-row[data-id='"+e.currentTarget.dataset.id+"'] .ctag").innerHTML="",v.removeFromCart(e.currentTarget.dataset.id),v.refreshCheckoutButton(),0==Object.keys(v.state.order.items).length)return h(1),void b();t(),h(2)}}))}}catch(t){c.e(t)}finally{c.f()}},M=function(t,e){var r=new URLSearchParams(window.location.search),a=r.get("ott")?r.get("ott"):"",n=new URLSearchParams;n.append("cmd","get_state"),n.append("app",o),n.append("ott",a),n.append("token",c("kenzap_token")),config.token=c("kenzap_token"),fetch("https://api-v1.kenzap.cloud/auth/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:n}).then((function(t){return t.json()})).then((function(t){(r.get("checkout")?r.get("checkout"):"")&&(t.success?(t.token&&(config.token=t.token,function(t,e,r){var a="";if(r){var o=new Date;o.setTime(o.getTime()+24*r*60*60*1e3),a=";expires="+o.toUTCString()}document.cookie=t+"="+(escape(e)||"")+a+";path=/"}("kenzap_token",t.token,1),console.log("setting up token")),v.state.order.kid=t.kid,v.state.order.name=t.name,v.state.order.from=U+" - "+t.name,v.state.order.status="new",C()):alert("Oops, something went wrong. Please try checking out again."))})).catch((function(t){console.error("Error:",t)}))},C=function(){v.state.order.idd=localStorage.idd,v.state.order.sid=localStorage.sid,v.state.order.id=void 0===v.state.order.id?s(8)+Math.floor(Date.now()):v.state.order.id,localStorage.lastOrder=JSON.stringify(v.state.order);var t=new Date;v.state.order.created_ymd=t.getUTCFullYear()+""+n(t.getUTCMonth()+1)+n(t.getUTCDate()),v.state.order.created_ym=t.getUTCFullYear()+""+n(t.getUTCMonth()+1),v.state.order.created_y=t.getUTCFullYear()+"",fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+API_KEY,"Kenzap-Token":config.token,"Kenzap-Sid":localStorage.sid},body:JSON.stringify({query:{order:{type:"create",key:"ecommerce-order",sid:localStorage.sid,data:v.state.order}}})}).then((function(t){return t.json()})).then((function(t){t.success?(!function(t){var e=[];try{e=JSON.parse(localStorage.orderIDs)}catch(t){}var r=Date.now()/1e3|0,a=new Date(r),o={time:r,date:a.getFullYear()+""+(a.getMonth()+1)+a.getDate(),id:t};e.push(o),localStorage.orderIDs=JSON.stringify(e)}(t.order.id),q("new"),v.clearCart(),h(4)):alert("Error: "+JSON.stringify(t))})).catch((function(t){console.error("Error:",t)}))},z=function(){var t=document.querySelectorAll(".kUNwHA .kenzap-row h2"),e=0,a=0;w.state=document.documentElement.scrollTop;var o,n=r(t);try{for(n.s();!(o=n.n()).done;){var c=o.value;a=c.offsetTop-document.documentElement.scrollTop,w.direction="down",a<0&&e>a&&(a=e,w.el_id=c.id),e=a}}catch(t){n.e(t)}finally{n.f()}if(w.state_prev!=w.state&&(w.state_prev=w.state),""!=w.el_id){var i=document.querySelector(".kUNwHA .cata-sub-nav");w.timer&&clearTimeout(w.timer),w.timer=setTimeout((function(t){i.scrollTo({left:w.offsets[t],behavior:"smooth"});var e,a=r(document.querySelectorAll(".kUNwHA .slide"));try{for(a.s();!(e=a.n()).done;){e.value.classList.remove("active")}}catch(t){a.e(t)}finally{a.f()}document.querySelector(".kUNwHA [data-href='"+t+"']").classList.add("active")}),200,w.el_id)}w.el_id=""}}();
