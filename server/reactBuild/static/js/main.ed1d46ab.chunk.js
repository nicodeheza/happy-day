(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,,,,,,function(e,t,n){},,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(11),s=n.n(c),i=n(3),o=n(1),l=n(0);function d(){var e,t=Object(a.useContext)(H),n=Object(a.useState)("logIn"),r=Object(i.a)(n,2),c=r[0],s=r[1],d=Object(a.useState)(""),j=Object(i.a)(d,2),u=j[0],b=j[1],m=Object(a.useState)("text"),h=Object(i.a)(m,2),O=h[0],p=h[1],f=Object(a.useState)({email:"",name:"",birthday:"",password:"",confirm:""}),v=Object(i.a)(f,2),x=v[0],g=v[1],y=Object(a.useState)({email:"",password:""}),N=Object(i.a)(y,2),w=N[0],C=N[1],S=Object(a.useState)(!0),k=Object(i.a)(S,2),E=k[0],D=k[1];return e="logIn"===c?Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n={email:w.email,password:w.password};fetch("http://localhost:4000/api/login",{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){if(401!==e.status)return e.json();b("The email address or password is incorrect.")})).then((function(e){e&&t(e.auth)})).catch((function(e){return console.log(e)}))},children:[Object(l.jsx)("input",{type:"email",placeholder:"Enter your Email",name:"emial",value:w.email,onChange:function(e){return C(Object(o.a)(Object(o.a)({},w),{},{email:e.target.value}))},required:!0}),Object(l.jsx)("input",{type:"password",placeholder:"Enter your Password",name:"password",value:w.password,onChange:function(e){return C(Object(o.a)(Object(o.a)({},w),{},{password:e.target.value}))},autoComplete:"on",required:!0}),u?Object(l.jsx)("p",{className:"alert-form",children:u}):null,Object(l.jsx)("button",{type:"submit",value:"Submit",children:"Log In"})]}):Object(l.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),x.password===x.confirm){D(!0);var n={email:x.email,name:x.name,birthday:x.birthday,password:x.password};fetch("http://localhost:4000/api/singup",{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){e.message?b(e.message):t(e.auth)})).catch((function(e){return console.log(e)}))}else D(!1)},children:[Object(l.jsx)("input",{type:"email",placeholder:"Enter your Email",name:"email",value:x.email,onChange:function(e){return g(Object(o.a)(Object(o.a)({},x),{},{email:e.target.value}))},required:!0}),Object(l.jsx)("input",{type:"text",placeholder:"Enter your Name",name:"name",value:x.name,onChange:function(e){return g(Object(o.a)(Object(o.a)({},x),{},{name:e.target.value}))},required:!0}),Object(l.jsx)("input",{type:O,onFocus:function(){return p("date")},onBlur:function(){return p("text")},placeholder:"Enter your Birthday",name:"birthday",value:x.birthday,onChange:function(e){return g(Object(o.a)(Object(o.a)({},x),{},{birthday:e.target.value}))},required:!0}),Object(l.jsx)("input",{type:"password",placeholder:"Enter your Password",name:"password",value:x.password,onChange:function(e){return g(Object(o.a)(Object(o.a)({},x),{},{password:e.target.value}))},required:!0,autoComplete:"off"}),Object(l.jsx)("input",{type:"password",placeholder:"Confirm Password",name:"confim",value:x.confirm,onChange:function(e){return g(Object(o.a)(Object(o.a)({},x),{},{confirm:e.target.value}))},required:!0,autoComplete:"off"}),E?Object(l.jsx)("p",{}):Object(l.jsx)("p",{className:"alert-form",children:"Passwords don't match"}),u?Object(l.jsx)("p",{className:"alert-form",children:u}):null,Object(l.jsx)("button",{type:"submit",children:"Sing Up"})]}),Object(l.jsxs)("div",{className:"form-container",children:[e,Object(l.jsx)("p",{children:"or"}),Object(l.jsx)("p",{className:"red",onClick:function(){s("logIn"===c?"singUp":"logIn")},children:"logIn"===c?"Sing Up":"Log In"})]})}n(17);function j(e){var t=e.setShowRecover,n=Object(a.useState)(""),r=Object(i.a)(n,2),c=r[0],s=r[1],o=Object(a.useState)(""),d=Object(i.a)(o,2),j=d[0],u=d[1];return Object(l.jsx)("div",{className:"recover-container",children:Object(l.jsxs)("div",{className:"recover",children:[Object(l.jsx)("img",{src:"img/exit.svg",alt:"close",onClick:function(){return t(!1)}}),Object(l.jsx)("h3",{children:"Enter your email to recover your password"}),Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),u("Loading..."),fetch("http://localhost:4000/recover",{method:"POST",body:JSON.stringify({email:c}),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){u(e.message)})),s("")},children:[Object(l.jsx)("input",{type:"email",placeholder:"Email",name:"email",value:c,onChange:function(e){return s(e.target.value)},required:!0}),Object(l.jsx)("button",{type:"submit",children:"Submit"})]}),Object(l.jsx)("p",{children:j}),Object(l.jsx)("p",{children:"You are going to receive an email with a link to recover your password, this link is valid for 24hs."})]})})}function u(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(l.jsxs)("div",{className:"main-container",children:[n?Object(l.jsx)(j,{setShowRecover:r}):null,Object(l.jsxs)("header",{style:{backgroundImage:"url(/img/header.svg)"},children:[Object(l.jsx)("img",{src:"img/logo1.svg",alt:"Happy Day"}),Object(l.jsx)("h2",{children:"Birthdays and Anniversaries Reminder"})]}),Object(l.jsxs)("main",{children:[Object(l.jsx)(d,{}),Object(l.jsxs)("div",{className:"card",children:[Object(l.jsx)("h3",{children:"Start in 3 simple steps:"}),Object(l.jsxs)("div",{className:"step",children:[Object(l.jsx)("div",{className:"num",children:"1"}),Object(l.jsx)("p",{children:"Sing up or log in."})]}),Object(l.jsxs)("div",{className:"step",children:[Object(l.jsx)("div",{className:"num",children:"2"}),Object(l.jsx)("p",{children:"Add the birthdays or anniversaries of your friends and family."})]}),Object(l.jsxs)("div",{className:"step",children:[Object(l.jsx)("div",{className:"num",children:"3"}),Object(l.jsx)("p",{children:"Allows the application to send notifications (You will also receive the reminders in your email)."})]})]})]}),Object(l.jsx)("footer",{style:{backgroundImage:"url(/img/footer.svg)"},children:Object(l.jsxs)("p",{children:["Forgot Your Password? ",Object(l.jsx)("span",{className:"red",onClick:function(){return r(!0)},children:"Recover it"})]})})]})}n(18);function b(){return Object(l.jsxs)("div",{className:"loading-container",children:[Object(l.jsx)("img",{src:"img/logo1.svg",alt:"Happy Day",className:"loading-logo"}),Object(l.jsxs)("div",{className:"wheel-container",children:[Object(l.jsx)("img",{src:"img/loading.svg",alt:"loading",className:"loading-wheel"}),Object(l.jsx)("p",{children:"Loading..."})]})]})}n(10);var m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function h(){var e=Object(a.useContext)(R),t=e.setUpdateCalendar,n=e.setMessage,r=Object(a.useState)({event:"birthday",type:"",day:"",month:m[0],year:"",personName:"",reminders:[{title:"The Same Day",date:""}]}),c=Object(i.a)(r,2),s=c[0],d=c[1],j=Object(a.useState)({timeBefore:"same-day",numBefore:""}),u=Object(i.a)(j,2),b=u[0],h=u[1];return Object(l.jsxs)("form",{className:"card-form",onSubmit:function(e){return function(e){e.preventDefault(),n("");var a={event:s.event,type:s.type,date:new Date("".concat(s.month," ").concat(s.day," ").concat(""===s.year?"9999":s.year)),personName:s.personName,reminders:[]},r=s.reminders.map((function(e){var t={title:e.title};if("The Same Day"===e.title)t.date=a.date;else{var n=e.title.split(" ",2),r=a.date.getTime(),c=864e5;"Days"===n[1]?t.date=new Date(r-c*n[0]):t.date=new Date(r-6048e5*n[0])}return t}));a=Object(o.a)(Object(o.a)({},a),{},{reminders:r}),fetch("http://localhost:4000/api/add",{method:"POST",body:JSON.stringify(a),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){n(e.message),t(!0)})).catch((function(e){return console.log(e)})),d({event:"birthday",type:"",day:"",month:m[0],year:"",personName:"",reminders:[{title:"The Same Day",date:""}]})}(e)},children:[Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"event",children:"Event"}),Object(l.jsxs)("select",{name:"event",id:"event",onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{event:e.target.value}))},value:s.event,required:!0,children:[Object(l.jsx)("option",{value:"birthday",children:"Birthday"}),Object(l.jsx)("option",{value:"anniversary",children:"Anniversary"})]})]}),"anniversary"===s.event?Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"type",children:"Type"}),Object(l.jsx)("input",{type:"text",name:"type",id:"type",onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{type:e.target.value}))},value:s.type})]}):null]}),Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"day",children:"Day"}),Object(l.jsx)("input",{className:"day",id:"day",type:"number",name:"day",min:"1",max:"31",step:"1",onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{day:e.target.value}))},value:s.day,required:!0})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"month",children:"Month"}),Object(l.jsx)("select",{name:"month",id:"month",onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{month:e.target.value}))},value:s.month,required:!0,children:m.map((function(e,t){return Object(l.jsx)("option",{value:e,children:e},t)}))})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"year",children:"Year"}),Object(l.jsx)("input",{className:"year",id:"year",type:"number",name:"year",placeholder:"any",max:"9999",onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{year:e.target.value}))},value:s.year})]})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"name",children:"Name"}),Object(l.jsx)("input",{type:"text",id:"name",name:"name",onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{personName:e.target.value}))},value:s.personName,required:!0})]}),Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsx)("label",{htmlFor:"time-before",children:"Add Reminders"}),Object(l.jsxs)("select",{name:"time-before",id:"time-before",onChange:function(e){return h(Object(o.a)(Object(o.a)({},b),{},{timeBefore:e.target.value}))},value:b.timeBefore,children:[Object(l.jsx)("option",{value:"same-day",children:"The Same Day"}),Object(l.jsx)("option",{value:"days-before",children:"Days Before"}),Object(l.jsx)("option",{value:"weeks-before",children:"Weeks Before"})]}),"same-day"!==b.timeBefore?Object(l.jsx)("input",{className:"a-r-n",type:"number",name:"num-before",min:"1",step:"1","data-testid":"numBefore",onChange:function(e){return h(Object(o.a)(Object(o.a)({},b),{},{numBefore:e.target.value}))},value:b.numBefore}):null,Object(l.jsx)("button",{className:"a-r-b",onClick:function(e){return function(e){e.preventDefault();var t={title:"",date:""};switch(b.timeBefore){case"same-day":t.title="The Same Day";break;case"days-before":t.title="".concat(b.numBefore," Days Before");break;case"weeks-before":t.title="".concat(b.numBefore," Weeks Before")}var n=s.reminders;n.push(t),d(Object(o.a)(Object(o.a)({},s),{},{reminders:n}))}(e)},children:"Add"})]}),Object(l.jsx)("ul",{className:"reminders",children:s.reminders.map((function(e,t){return Object(l.jsxs)("li",{children:[e.title," ",Object(l.jsx)("img",{src:"img/drop.svg",alt:"drop",onClick:function(){return function(e){var t=s.reminders;t.splice(e,1),d(Object(o.a)(Object(o.a)({},s),{},{reminders:t}))}(t)}})]},t)}))})]}),Object(l.jsx)("div",{className:"card-form-submit",children:Object(l.jsx)("button",{type:"submit",children:"Add Event"})})]})}var O=n(7),p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function f(){var e=Object(a.useContext)(R),t=e.setUpdateCalendar,n=e.edit,r=e.showCard,c=e.setShowCard,s=e.setMessage,d=Object(a.useState)({event:n.type,type:n.AnniversaryType,day:new Date(n.date).getDate(),month:p[new Date(n.date).getMonth()],year:new Date(n.date).getFullYear()>9e3?"":new Date(n.date).getFullYear(),personName:n.personName,reminders:n.reminders}),j=Object(i.a)(d,2),u=j[0],b=j[1];Object(a.useEffect)((function(){b({event:n.type,type:n.AnniversaryType,day:new Date(n.date).getDate(),month:p[new Date(n.date).getMonth()],year:new Date(n.date).getFullYear()>9e3?"":new Date(n.date).getFullYear(),personName:n.personName,reminders:n.reminders})}),[n,r]);var m=Object(a.useState)({timeBefore:"same-day",numBefore:""}),h=Object(i.a)(m,2),f=h[0],v=h[1];return Object(l.jsxs)("form",{className:"card-form",onSubmit:function(e){return function(e){e.preventDefault(),s("");var a={event:u.event,type:"birthday"===u.event?"":u.type,date:new Date("".concat(u.month," ").concat(u.day," ").concat(""===u.year?"9999":u.year)),personName:u.personName,reminders:[],removeReminders:u.removeReminders?u.removeReminders:[],_id:n._id},r=u.reminders.map((function(e){var t={name:e.name,event:n._id,date:e.date?e.date:null,_id:e._id?e._id:null};if(!t.date)if("The Same Day"===e.name)t.date=a.date;else{var r=e.name.split(" ",2),c=a.date.getTime(),s=864e5;"Days"===r[1]?t.date=new Date(c-s*r[0]):t.date=new Date(c-6048e5*r[0])}return t}));a=Object(o.a)(Object(o.a)({},a),{},{reminders:r}),fetch("http://localhost:4000/api/edit",{method:"PUT",body:JSON.stringify(a),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){s(e.message),"Event Edited"===e.message&&t(!0)})).catch((function(e){return console.log(e)})),c("none")}(e)},children:[Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"editEvent",children:"Event"}),Object(l.jsxs)("select",{name:"editEvent",id:"editEvent",onChange:function(e){return b(Object(o.a)(Object(o.a)({},u),{},{event:e.target.value}))},value:u.event,required:!0,children:[Object(l.jsx)("option",{value:"birthday",children:"Birthday"}),Object(l.jsx)("option",{value:"anniversary",children:"Anniversary"})]})]}),"anniversary"===u.event?Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"editType",children:"Type"}),Object(l.jsx)("input",{type:"text",name:"editType",id:"editType",onChange:function(e){return b(Object(o.a)(Object(o.a)({},u),{},{type:e.target.value}))},value:u.type})]}):null]}),Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"editDay",children:"Day"}),Object(l.jsx)("input",{className:"day",type:"number",name:"editDay",id:"editDay",min:"1",max:"31",step:"1",onChange:function(e){return b(Object(o.a)(Object(o.a)({},u),{},{day:e.target.value}))},value:u.day,required:!0})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"editMonth",children:"Month"}),Object(l.jsx)("select",{name:"editMonth",id:"editMonth",onChange:function(e){return b(Object(o.a)(Object(o.a)({},u),{},{month:e.target.value}))},value:u.month,required:!0,children:p.map((function(e,t){return Object(l.jsx)("option",{value:e,children:e},t)}))})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"editYear",children:"Year"}),Object(l.jsx)("input",{className:"year",type:"number",name:"editYear",id:"editYear",placeholder:"any",max:"9999",onChange:function(e){return b(Object(o.a)(Object(o.a)({},u),{},{year:e.target.value}))},value:u.year})]})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"editName",children:"Name"}),Object(l.jsx)("input",{type:"text",name:"editName",id:"editName",onChange:function(e){return b(Object(o.a)(Object(o.a)({},u),{},{personName:e.target.value}))},value:u.personName,required:!0})]}),Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsx)("label",{htmlFor:"time-before-edit",children:"Add Reminders"}),Object(l.jsxs)("select",{name:"time-before-edit",id:"time-before-edit",onChange:function(e){return v(Object(o.a)(Object(o.a)({},f),{},{timeBefore:e.target.value}))},value:f.timeBefore,children:[Object(l.jsx)("option",{value:"same-day",children:"The Same Day"}),Object(l.jsx)("option",{value:"days-before",children:"Days Before"}),Object(l.jsx)("option",{value:"weeks-before",children:"Weeks Before"})]}),"same-day"!==f.timeBefore?Object(l.jsx)("input",{className:"a-r-n",type:"number",name:"num-before",min:"1",step:"1","data-testid":"num-before-test",onChange:function(e){return v(Object(o.a)(Object(o.a)({},f),{},{numBefore:e.target.value}))},value:f.numBefore}):null,Object(l.jsx)("button",{className:"a-r-b",onClick:function(e){return function(e){e.preventDefault();var t={name:"",date:""};switch(f.timeBefore){case"same-day":t.name="The Same Day";break;case"days-before":t.name="".concat(f.numBefore," Days Before");break;case"weeks-before":t.name="".concat(f.numBefore," Weeks Before")}var n=Object(O.a)(u.reminders);n.push(t),b(Object(o.a)(Object(o.a)({},u),{},{reminders:n}))}(e)},children:"Add"})]}),Object(l.jsx)("ul",{className:"reminders",children:u.reminders.map((function(e,t){return Object(l.jsxs)("li",{children:[e.name," ",Object(l.jsx)("img",{src:"img/drop.svg",alt:"drop",onClick:function(){return function(e){var t=Object(O.a)(u.reminders),n=t.splice(e,1);if(u.removeReminders){var a=u.removeReminders;a.push(n[0]._id),b(Object(o.a)(Object(o.a)({},u),{},{reminders:t,removeReminders:a}))}else b(Object(o.a)(Object(o.a)({},u),{},{reminders:t,removeReminders:[n[0]._id]}))}(t)}})]},t)}))})]}),Object(l.jsxs)("div",{className:"card-form-submit drop",children:[Object(l.jsx)("button",{type:"submit",children:"Edit Event"}),Object(l.jsx)("button",{className:"btn-drop",onClick:function(e){return function(e){e.preventDefault(),s("");var a={eventId:n._id,remindersId:[]};n.reminders.forEach((function(e){a.remindersId.push(e._id)})),fetch("http://localhost:4000/api/delete",{method:"DELETE",body:JSON.stringify(a),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){s(e.message),t(!0)})).catch((function(e){return console.log(e)})),c("none")}(e)},children:Object(l.jsxs)("svg",{className:"btn-drop-img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 12.18 13.92",children:[Object(l.jsx)("defs",{}),Object(l.jsx)("title",{children:"drop"}),Object(l.jsx)("g",{id:"Layer_2","data-name":"Layer 2",children:Object(l.jsx)("g",{id:"Layer_2-2","data-name":"Layer 2",children:Object(l.jsx)("path",{className:"cls-1",d:"M.87,12.61a1.31,1.31,0,0,0,1.3,1.31H10a1.31,1.31,0,0,0,1.31-1.31h0V3.48H.87Zm7.39-7a.44.44,0,0,1,.44-.43.43.43,0,0,1,.43.43v6.09a.44.44,0,0,1-.43.44.44.44,0,0,1-.44-.44Zm-2.61,0a.44.44,0,0,1,.44-.43.43.43,0,0,1,.43.43v6.09a.44.44,0,0,1-.43.44.44.44,0,0,1-.44-.44ZM3,5.65a.44.44,0,0,1,.44-.43.43.43,0,0,1,.43.43v6.09a.44.44,0,0,1-.43.44A.44.44,0,0,1,3,11.74ZM11.74.87H8.48L8.23.36A.66.66,0,0,0,7.64,0H4.53A.66.66,0,0,0,4,.36L3.7.87H.43A.43.43,0,0,0,0,1.3v.87a.44.44,0,0,0,.43.44H11.74a.44.44,0,0,0,.44-.44V1.3A.44.44,0,0,0,11.74.87Z"})})})]})})]})]})}function v(){return Object(l.jsx)("div",{className:"card-form",children:Object(l.jsxs)("ul",{className:"help",children:[Object(l.jsx)("li",{children:"click on an event to edit it or delete it"}),Object(l.jsxs)("li",{children:["click on ",Object(l.jsx)("img",{src:"img/add.svg",alt:"add"})," to add a new event"]}),Object(l.jsxs)("li",{children:["click on ",Object(l.jsx)("img",{src:"img/search.svg",alt:"search"})," to search an event"]}),Object(l.jsxs)("li",{children:["click on ",Object(l.jsx)("img",{src:"img/settings.svg",alt:"settings"})," to edit notifications settings"]}),Object(l.jsx)("li",{children:"click on the months icons to go to a specific month"}),Object(l.jsxs)("li",{children:["click on ",Object(l.jsx)("img",{src:"img/logout.svg",alt:"logout"})," to logout"]})]})})}function x(){var e=Object(a.useContext)(R),t=e.setSearchFilters,n=e.setShowCard,r=Object(a.useState)({from:"",to:"",name:"",type:"any"}),c=Object(i.a)(r,2),s=c[0],d=c[1];return Object(l.jsxs)("form",{className:"card-form",onSubmit:function(e){return function(e){e.preventDefault(),t(s),n("none"),d({from:"",to:"",name:"",type:"any"})}(e)},children:[Object(l.jsxs)("div",{className:"grup",children:[Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"from",children:"From"}),Object(l.jsx)("input",{className:"form-to",id:"from",type:"text",placeholder:"mm/dd",pattern:"\\d{2}/\\d{2}",value:s.from,onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{from:e.target.value}))}})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"to",children:"To"}),Object(l.jsx)("input",{className:"form-to",type:"text",id:"to",placeholder:"mm/dd",pattern:"\\d{2}/\\d{2}",value:s.to,onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{to:e.target.value}))}})]})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"searchName",children:"Name"}),Object(l.jsx)("input",{type:"text",placeholder:"any",id:"searchName",value:s.name,onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{name:e.target.value}))}})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"searchType",children:"Type"}),Object(l.jsxs)("select",{name:"searchType",id:"searchType",value:s.type,onChange:function(e){return d(Object(o.a)(Object(o.a)({},s),{},{type:e.target.value}))},required:!0,children:[Object(l.jsx)("option",{value:"any",children:"Any"}),Object(l.jsx)("option",{value:"birthday",children:"Birthday"}),Object(l.jsx)("option",{value:"anniversary",children:"Anniversary"})]})]}),Object(l.jsx)("div",{className:"card-form-submit",children:Object(l.jsx)("button",{type:"submit",children:"Search"})})]})}var g=n(4),y=n.n(g),N=n(5),w="BKyP2ldVQRindSkOeqb8Sl-oZG3br49DaDCGYPGw4rEu9tFbF1t1rG9rEjRbBfbAPnFhZNHLTw8rZ0XzfyMQkqE";function C(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/-/g,"+").replace(/_/g,"/"),n=window.atob(t),a=new Uint8Array(n.length),r=0;r<n.length;++r)a[r]=n.charCodeAt(r);return a}function S(){return k.apply(this,arguments)}function k(){return(k=Object(N.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Notification.requestPermission();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){return D.apply(this,arguments)}function D(){return(D=Object(N.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.serviceWorker.ready;case 2:return t=e.sent,e.next=5,t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:C(w)});case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){return F.apply(this,arguments)}function F(){return(F=Object(N.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:4000/api/noti-sub",{method:"POST",body:JSON.stringify(t),headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){var e=Object(a.useContext)(R),t=e.emailNotification,n=e.setEmailNotification,r=e.setMessage,c=function(){var e=Object(N.a)(y.a.mark((function e(){var t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!("serviceWorker"in navigator)||!("PushManager"in window)){e.next=20;break}return navigator.serviceWorker.register("/sw.js"),e.next=5,S();case 5:if("granted"!==e.sent){e.next=17;break}return e.next=9,E();case 9:return t=e.sent,e.next=12,T(t);case 12:n=e.sent,r("Notifications Activated"),console.log(n),e.next=18;break;case 17:r("Something went wrong, check your browser's notification settings and try again");case 18:e.next=21;break;case 20:r("Notifications are not supported by your browser");case 21:e.next=26;break;case 23:e.prev=23,e.t0=e.catch(0),e.t0&&console.log(e.t0);case 26:case"end":return e.stop()}}),e,null,[[0,23]])})));return function(){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"card-form",children:[Object(l.jsxs)("div",{className:"label-st",children:[Object(l.jsx)("label",{htmlFor:"emialSettings",children:"Email Notifications"}),Object(l.jsxs)("div",{className:"switch-btn-container",children:[Object(l.jsx)("p",{children:"on/off"}),Object(l.jsx)("div",{className:"switch-btn",name:"emialSettings","data-testid":"emialSettings",onClick:function(){return n((function(e){return!e})),void fetch("http://localhost:4000/api/emailNotification",{method:"PUT",headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){})).catch((function(e){return console.log(e)}))},children:Object(l.jsx)("div",{className:t?"switch-btn-int":"switch-btn-int eOff"})})]})]}),Object(l.jsxs)("div",{className:"label",children:[Object(l.jsx)("label",{htmlFor:"browser",children:"Browser Notifications"}),Object(l.jsx)("button",{className:"a-r-b",style:{padding:"5px 10px"},onClick:function(){return c()},children:"Activate"})]})]})}function A(e){var t=e.showCard,n=e.setShowCard,r=Object(a.useState)(!1),c=Object(i.a)(r,2),s=c[0],o=c[1],d=Object(a.useState)(""),j=Object(i.a)(d,2),u=j[0],b=j[1],m=Object(a.useState)(Object(l.jsx)(h,{})),O=Object(i.a)(m,2),p=O[0],g=O[1];Object(a.useEffect)((function(){var e=document.getElementById("card"),n=window.getComputedStyle(e,null).transform;o((function(e){return!e})),"none"===n&&"none"!==t?(o(!1),setTimeout((function(){y(t),o(!0)}),500)):"none"!==n&&"none"!==t&&y(t),"none"===t&&o(!1)}),[t]);var y=function(e){switch(e){case"add":b("Add Event"),g(Object(l.jsx)(h,{}));break;case"search":b("Search Event"),g(Object(l.jsx)(x,{}));break;case"settings":b("Settings"),g(Object(l.jsx)(B,{}));break;case"help":b("Help"),g(Object(l.jsx)(v,{}));break;case"edit":b("Edit Event"),g(Object(l.jsx)(f,{}))}};return Object(l.jsxs)("div",{className:s?"toolbar-card":"toolbar-card off",id:"card",children:[Object(l.jsxs)("div",{className:"card-header",children:[Object(l.jsx)("h3",{children:u}),Object(l.jsx)("img",{src:"img/exit.svg",alt:"close card",onClick:function(){return n("none")}})]}),p]})}n(20);var M=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];function U(){var e=Object(a.useState)("alert"),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(l.jsxs)("header",{style:{backgroundImage:"url(/img/header.svg)"},className:"app-header",children:[Object(l.jsx)("img",{src:"img/logo2.svg",alt:"Happy Day Logo"}),Object(l.jsx)("div",{className:"month-btn-container",children:M.map((function(e,t){return Object(l.jsx)("div",{className:"month-btn "+e,onClick:function(){return function(e){var t=document.getElementById("month".concat(e));if(t){var n=window.pageYOffset||document.documentElement.scrollTop,a=t.getBoundingClientRect().top+n;window.scrollTo(0,a-200)}else r("show")}(t+1)},children:e},t)}))}),Object(l.jsx)("div",{className:n,onAnimationEnd:function(){return r("alert")},children:Object(l.jsx)("p",{children:"You don't have events this month"})})]})}n(21);function I(e){var t=e.setShowCard,n=Object(a.useContext)(H);return Object(l.jsxs)("footer",{className:"toolbar",children:[Object(l.jsx)("button",{className:"toolbar-btn",onClick:function(){return t("search")},children:Object(l.jsx)("img",{src:"img/search.svg",alt:"search icon"})}),Object(l.jsx)("button",{className:"toolbar-btn",onClick:function(){return t("add")},children:Object(l.jsx)("img",{src:"img/add.svg",alt:"add icon"})}),Object(l.jsx)("button",{className:"toolbar-btn",onClick:function(){return t("settings")},children:Object(l.jsx)("img",{src:"img/settings.svg",alt:"settings icon"})}),Object(l.jsx)("button",{className:"toolbar-btn",children:Object(l.jsx)("img",{src:"img/help.svg",alt:"help icon",onClick:function(){return t("help")}})}),Object(l.jsx)("button",{className:"toolbar-btn",onClick:function(){fetch("http://localhost:4000/api/logout",{method:"GET",headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){n(e.auth)})).catch((function(e){return console.log(e)}))},children:Object(l.jsx)("img",{src:"img/logout.svg",alt:"logout icon"})})]})}n(22),n(23);var J,P=["January","February","March","April","May","June","July","August","September","October","November","December"],q=["#216b8e","#27a3a3","#149e84","#00ae4d","#69d503","#d6df24","#edc01c","#faa818","#f19616","#fd6126","#9458a9","#6258a2"];function L(e){var t=e.setShowCard,n=e.showCard,r=Object(a.useState)({}),c=Object(i.a)(r,2),s=c[0],d=c[1],j=Object(a.useContext)(R),u=j.updateCalendar,b=j.setUpdateCalendar,m=j.setEdit,h=j.searchFilters,p=Object(a.useState)({}),f=Object(i.a)(p,2),v=f[0],x=f[1],g=Object(a.useState)(!0),y=Object(i.a)(g,2),N=y[0],w=y[1],C=function(){fetch("http://localhost:4000/api/events",{method:"GET",headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){d(e),w(!1)})).catch((function(e){return console.log(e)}))};Object(a.useEffect)((function(){C()}),[]),Object(a.useEffect)((function(){u&&(C(),b(!1))}),[u,b]),Object(a.useEffect)((function(){var e,t,n,a,r={};if(h.from){var c=h.from.split("/");e=parseInt(c[0]),t=parseInt(c[1])}else e=0,t=0;if(h.to){var i=h.to.split("/");n=parseInt(i[0]),a=parseInt(i[1])}else n=99,a=99;var l,d=0;for(var j in s)if(j>=e&&j<=n)if(l=j,1===++d)for(var u in r[j]={},s[j])u>=t&&(r[j][u]=Object(O.a)(s[j][u]));else r[j]=Object(o.a)({},s[j]);for(var b in r[l])b>a&&delete r[l][b];if(h.name)for(var m in r){for(var p in r[m]){var f=r[m][p].filter((function(e){return new RegExp(h.name.toLowerCase(),"ig").test(e.personName)}));0===f.length?delete r[m][p]:r[m][p]=f}0===Object.keys(r[m]).length&&delete r[m]}if("any"!==h.type&&h.type)for(var v in r){for(var g in r[v]){var y=r[v][g].filter((function(e){return e.type===h.type}));0===y.length?delete r[v][g]:r[v][g]=y}0===Object.keys(r[v]).length&&delete r[v]}x(r)}),[h,s]);var S=function(e){var t=Date.now()-new Date(e).getTime(),n=Math.floor(t/31536e6);return n>0?"(".concat(n," eyars)"):""};return Object(a.useEffect)((function(){"none"===n&&J&&(J.style.backgroundColor="transparent")}),[n]),Object(l.jsx)("div",{className:"calendar",children:Object.keys(s).length>0&&!N?Object.keys(v||s).map((function(e,n){return Object(l.jsxs)("div",{className:"month-container",id:"month"+e,children:[Object(l.jsx)("div",{className:"month-header",style:{backgroundColor:q[e-1]},children:Object(l.jsx)("h2",{children:P[e-1]})}),Object.keys(v?v[e]:s[e]).map((function(n,a){return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"day-constainer",children:[Object(l.jsx)("h2",{style:{color:q[e-1]},children:n}),Object(l.jsx)("div",{className:"events-container",children:(v?v[e][n]:s[e][n]).map((function(a,r){return Object(l.jsx)("div",{className:"event-container",id:"event-".concat(e,"-").concat(n,"-").concat(r),onClick:function(){return function(e,n){J&&(J.style.backgroundColor="transparent"),document.getElementById(e).style.backgroundColor="white",J=document.getElementById(e),t("edit"),m(n)}("event-".concat(e,"-").concat(n,"-").concat(r),a)},children:Object(l.jsx)("p",{children:"".concat(a.personName," ").concat(a.AnniversaryType," ").concat(a.type," ").concat(S(a.date))})},r)}))})]}),Object(l.jsx)("hr",{className:"divition"})]},a)}))]},n)})):N?Object(l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"loading-wheel claendar-wheel",viewBox:"0 0 117.49 124.88",width:"100",height:"100",children:[Object(l.jsx)("defs",{}),Object(l.jsx)("title",{children:"loading"}),Object(l.jsx)("g",{id:"Layer_2","data-name":"Layer 2",children:Object(l.jsx)("g",{id:"Layer_1-2","data-name":"Layer 1",children:Object(l.jsx)("path",{d:"M78.84,18.33a49.61,49.61,0,0,0-28.75-2.12A50.63,50.63,0,0,0,24.57,30.68,51.5,51.5,0,0,0,11.19,57.34a52.14,\r 52.14,0,0,0,3.75,30.08,53.12,53.12,0,0,0,20.17,23.31A54.11,54.11,0,0,0,65.32,119a55.21,55.21,0,0,0,50-35.61,\r 1.12,1.12,0,0,1,1.45-.65,1.14,1.14,0,0,1,.67,1.4,58.76,58.76,0,0,1-19.55,28A59.79,59.79,0,0,1,65.63,124.7a60.64,\r 60.64,0,0,1-34.29-7.6A61.34,61.34,0,0,1,6.71,91.36,62.19,62.19,0,0,1,.46,55.78,63.25,63.25,0,0,1,15.23,22.27,\r 64.12,64.12,0,0,1,46.56,2.37a64.82,64.82,0,0,1,37.61.88l.08,0a8,8,0,0,1-5,15.2Z"})})})]}):Object(l.jsx)("div",{className:"any-container",children:Object(l.jsxs)("div",{className:"any",children:[Object(l.jsx)("h2",{children:"You don't have any event"}),Object(l.jsx)("p",{children:"add one pressing "}),Object(l.jsx)("img",{src:"img/add.svg",alt:"add"})]})})})}var R=r.a.createContext();function Y(){var e=Object(a.useState)("none"),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(!1),s=Object(i.a)(c,2),o=s[0],d=s[1],j=Object(a.useState)({}),u=Object(i.a)(j,2),b=u[0],m=u[1],h=Object(a.useState)(""),O=Object(i.a)(h,2),p=O[0],f=O[1],v=Object(a.useState)({}),x=Object(i.a)(v,2),g=x[0],y=x[1],N=Object(a.useState)(!0),w=Object(i.a)(N,2),C=w[0],S=w[1],k=Object(a.useState)(!0),E=Object(i.a)(k,2),D=E[0],T=E[1];return Object(a.useEffect)((function(){D&&fetch("http://localhost:4000/api/emailNotification",{method:"GET",headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){S(e.mailNotification),T(!1)})).catch((function(e){return console.log(e)}))}),[D]),Object(l.jsx)(R.Provider,{value:{updateCalendar:o,setUpdateCalendar:d,edit:b,setEdit:m,showCard:n,setShowCard:r,setMessage:f,setSearchFilters:y,searchFilters:g,emailNotification:C,setEmailNotification:S},children:Object(l.jsxs)("div",{children:[Object(l.jsx)(U,{}),Object(l.jsxs)("div",{className:"tool-card",children:[Object(l.jsx)(A,{showCard:n,setShowCard:r}),Object(l.jsx)(I,{setShowCard:r})]}),Object(l.jsx)(L,{setShowCard:r,showCard:n}),Object(l.jsx)(_,{message:p})]})})}function _(e){var t=e.message,n=Object(a.useState)({display:"flex"}),r=Object(i.a)(n,2),c=r[0],s=r[1];return Object(a.useEffect)((function(){s(t?{display:"flex"}:{display:"none"})}),[t]),Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{className:"message",onAnimationEnd:function(){return s({display:"none"})},style:c,children:Object(l.jsx)("p",{children:t})})})}var H=r.a.createContext();var G=function(){var e=Object(a.useState)(void 0),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){void 0===n&&fetch("http://localhost:4000/api",{method:"GET",headers:{"Content-type":"application/json; charset=UTF-8"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){r(e.auth)})).catch((function(e){return console.log(e)}))})),Object(l.jsx)(H.Provider,{value:r,children:void 0===n?Object(l.jsx)(b,{}):n?Object(l.jsx)(Y,{}):Object(l.jsx)(u,{})})};s.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(G,{})}),document.getElementById("root"))}],[[24,1,2]]]);
//# sourceMappingURL=main.ed1d46ab.chunk.js.map