(window["webpackJsonpswagger-to-graphql-blog"]=window["webpackJsonpswagger-to-graphql-blog"]||[]).push([[0],{124:function(e,t,n){e.exports=n(193)},129:function(e,t,n){},161:function(e,t){},170:function(e,t){},172:function(e,t){},193:function(e,t,n){"use strict";n.r(t);var r=n(8),a=n.n(r),c=n(113),o=n.n(c),u=(n(129),n(74),n(49)),s=n.n(u),l=n(79),i=n(85),p=n(114),f=n(115);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach((function(t){Object(p.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e){return h.apply(this,arguments)}function h(){return(h=Object(l.a)(s.a.mark((function e(t){var n,r,a,c,o,u,l,i,p,f;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.requestOptions,r=n.method,a=n.body,c=n.baseUrl,o=n.path,u=n.query,l=n.headers,i="".concat(c).concat(o,"?").concat(new URLSearchParams(u)),e.next=4,fetch(i,{method:r,headers:m({"Content-Type":"application/json"},l),body:JSON.stringify(a)});case 4:return p=e.sent,e.next=7,p.text();case 7:if(f=e.sent,!(200<=p.status&&p.status<300)){e.next=16;break}return e.prev=9,e.abrupt("return",JSON.parse(f));case 13:return e.prev=13,e.t0=e.catch(9),e.abrupt("return",f);case 16:throw new Error("Response: ".concat(p.status," - ").concat(f));case 17:case"end":return e.stop()}}),e,null,[[9,13]])})))).apply(this,arguments)}var b=function(e){return Object(f.createSchema)({swaggerSchema:e,callBackend:d})},v=n(29),E=n(52),y=n(123),w=n(122);function O(e){return new E.a({cache:new y.a,link:new w.a({schema:e})})}var j=function(e){var t=e.children,n=Object(r.useState)({type:"loading"}),c=Object(i.a)(n,2),o=c[0],u=c[1];switch(Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b("https://petstore.swagger.io/v2/swagger.json");case 3:t=e.sent,u({type:"resolved",client:O(t)}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),u({type:"error",message:e.t0.message});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),o.type){case"error":return a.a.createElement(a.a.Fragment,null,"Error ",o.message);case"loading":return a.a.createElement(a.a.Fragment,null,"Loading schema...");case"resolved":return a.a.createElement(v.a,{client:o.client},t);default:return a.a.createElement(a.a.Fragment,null,'Expected a different state than "',JSON.stringify(o,null,2),'"')}},S=function(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"PetStore"),t)},P=n(90),k=n(91),x=n.n(k),N=n(84);function F(){var e=Object(P.a)(['\n  query FindPets {\n    findPetsByStatus(status: ["available", "pending"]) {\n      id\n      category {\n        name\n      }\n      status\n    }\n  }\n']);return F=function(){return e},e}function I(){var e=Object(P.a)(["\n  query PetDetails($petId: String!) {\n    getPetById(petId: $petId) {\n      name\n      tags {\n        name\n      }\n      photoUrls\n    }\n  }\n"]);return I=function(){return e},e}var B=x()(I()),J=x()(F());var q=function(e){var t=e.pet,n=t.id,c=t.category,o=t.status,u=Object(r.useState)(!1),s=Object(i.a)(u,2),l=s[0],p=s[1];if(!n)throw new Error('Pet should have an id got: "'.concat(n,'"'));var f=Object(N.a)(B,{variables:{petId:n.toString()},skip:!l}),g=f.loading,m=f.error,d=f.data;return a.a.createElement("li",null,a.a.createElement("button",{onClick:function(e){e.preventDefault(),p(!l)}},n," (",o,")",c&&c.name&&" category: ".concat(c.name)),l&&(g?a.a.createElement("p",null,"Loading pet details..."):m?a.a.createElement("p",null,"Error loading pets: ",m.message):d?a.a.createElement("pre",null,function(e){var t=e.name,n=e.tags,r=e.photoUrls;return JSON.stringify({name:t,tags:n&&n.map((function(e){return e.name})),photoUrls:r},null,2)}(d.getPetById)):a.a.createElement("p",null,"Expected data, got ",JSON.stringify(d))))};function D(e){var t=e.id;if(!t)throw new Error('Pet should have an id got: "'.concat(t,'"'));var n=Number(t);return Number.MIN_SAFE_INTEGER<=n&&n<=Number.MAX_SAFE_INTEGER}var U=function(e){var t=e.pets;return a.a.createElement("ul",null,t.filter(D).map((function(e,t){return a.a.createElement(q,{key:t,pet:e})})))},L=function(){var e=Object(N.a)(J),t=e.loading,n=e.error,r=e.data;return t?a.a.createElement(a.a.Fragment,null,"Loading pets..."):n?a.a.createElement(a.a.Fragment,null,"Error loading pets: ",n.message):r?a.a.createElement(U,{pets:r.findPetsByStatus}):a.a.createElement(a.a.Fragment,null,"Expected error, loading or data")},R=function(){return a.a.createElement(S,null,a.a.createElement(j,null,a.a.createElement(L,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},74:function(e,t,n){}},[[124,1,2]]]);
//# sourceMappingURL=main.7663ec17.chunk.js.map