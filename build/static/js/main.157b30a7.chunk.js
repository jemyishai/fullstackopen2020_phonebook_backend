(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{17:function(e,n,t){e.exports=t(40)},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(16),c=t.n(r),u=t(6),i=t(2),l=function(e){var n=e.filter,t=e.setFilter;return o.a.createElement("div",null,"filter shown with",o.a.createElement("input",{value:n,onChange:function(e){console.log(e.target.value);var n=e.target.value.replace(/[^\-a-zA-Z0-9' ]+/gi,"");t(n)}}))},f=function(e){var n=e.onSubmit,t=e.valueName,a=e.valueNumber,r=e.onChangeName,c=e.onChangeNumber;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,o.a.createElement("h2",null,"add a new"),"name: ",o.a.createElement("input",{value:t,onChange:r})," ",o.a.createElement("br",null),"number: ",o.a.createElement("input",{value:a,onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.person,t=e.deletion;return o.a.createElement("div",{key:n.name},n.name," ",n.number," ",o.a.createElement("button",{onClick:function(){return t(n.name)}},"delete"))},s=function(e){var n=e.persons,t=e.filterTest,a=e.deletion;return o.a.createElement("div",null,n.filter(t).map((function(e){return o.a.createElement(m,{key:e.name+1,person:e,deletion:a})})))},d=function(e){var n=e.message,t=e.styling;return null===n?null:o.a.createElement("div",{className:t},n)},b=t(4),h=t.n(b),v="/api/persons",p=function(){return h.a.get(v).then((function(e){return e.data}))},g=function(e){return h.a.post(v,e).then((function(e){return e.data}))},E=function(e,n){return h.a.put("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},j=function(e){return h.a.delete("".concat(v,"/").concat(e)).then((function(e){return e.status}))},O=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1];Object(a.useEffect)((function(){p().then((function(e){console.log(e),r(e)})).catch((function(e){console.error(e)}))}),[]);var c=Object(a.useState)(""),m=Object(i.a)(c,2),b=m[0],h=m[1],v=Object(a.useState)(""),O=Object(i.a)(v,2),w=O[0],N=O[1],k=Object(a.useState)(""),y=Object(i.a)(k,2),S=y[0],C=y[1],T=Object(a.useState)(null),x=Object(i.a)(T,2),A=x[0],D=x[1],F=Object(a.useState)("notice"),I=Object(i.a)(F,2),J=I[0],z=I[1],B=function(){h(""),N(""),p().then((function(e){r(e)})).catch((function(e){console.error(e)}))};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(d,{message:A,styling:J}),o.a.createElement(l,{filter:S,setFilter:C}),o.a.createElement(f,{onSubmit:function(e){e.preventDefault(),b&&w||(z("error"),D("Name & Number must be filled out"),setTimeout((function(){D(null),z("notice")}),5e3)),b&&w&&p().then((function(e){if(console.log("Going to run some checks"),e.every((function(e){return e.name!==b})))g({name:b,number:w}).then((function(e){r([].concat(Object(u.a)(t),[e]))})).catch((function(e){console.error(e)})),z("notice"),D("Added ".concat(b)),setTimeout((function(){D(null)}),5e3),B();else{if(window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var n=e.find((function(e){return e.name===b}));console.log(n),E(n.id,{name:b,number:w}).then((function(e){r([].concat(Object(u.a)(t.filter((function(e){return e.id!==n.id}))),[e])),D("Updated ".concat(b,"'s number")),setTimeout((function(){D(null)}),5e3)})).catch((function(e){z("error"),D("Information of ".concat(b," has already been removed from the server. The front-end is being updated")),setTimeout((function(){D(null),z("notice")}),5e3),console.error(e)}))}B()}})).catch((function(e){console.error(e)}))},valueName:b,valueNumber:w,onChangeName:function(e){h(e.target.value)},onChangeNumber:function(e){N(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(s,{persons:t,filterTest:function(e){var n=e.name;return new RegExp(S,"ig").test(n)},deletion:function(e){if(window.confirm("Delete ".concat(e," ?"))){var n=t.find((function(n){return n.name===e}));j(n.id).then((function(e){console.log("delete res here",e),r(t.filter((function(e){return e.id!==n.id})))})).catch((function(e){console.error(e)})),D("".concat(n.name," has been deleted")),r(t.filter((function(e){return e.id!==n.id}))),setTimeout((function(){D(null)}),5e3)}B()}}))};t(39);c.a.render(o.a.createElement(O,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.157b30a7.chunk.js.map