(this["webpackJsonpbonvies-pos"]=this["webpackJsonpbonvies-pos"]||[]).push([[14],{341:function(e,t,r){"use strict";r.r(t);var n=r(7),a=r(5),s=r(10),o=r(16),i=r(0),c=r(54),l=r(278),u=r(63),d=r(244),b=r(315),j=r(268),m=r(245),p=r(313),x=r(311),f=r.n(x),h=r(2);t.default=Object(c.b)((function(e){return{errorMessage:e.auth.errorMessage}}),{signin:u.b})((function(e){var t=e.signin,r=e.history,c=e.errorMessage,u=localStorage.getItem("xCust"),x=Object(i.useState)(Boolean(u)),O=Object(o.a)(x,2),g=O[0],v=O[1],C=function(){var e=Object(s.a)(Object(n.a)().mark((function e(s){var o;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=g?Object(a.a)(Object(a.a)({},s),{},{xCust:u}):s,e.next=3,t(o);case 3:if(e.sent){e.next=6;break}return e.abrupt("return");case 6:s.xCust&&window.localStorage.setItem("xCust",s.xCust),r.push("/");case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){v(!1)};return Object(h.jsx)(d.a,{id:"signin",sx:{width:"100vw",height:"calc(100vh - 2.5rem)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",bgcolor:"background.default"},children:Object(h.jsxs)(b.a,{sx:{p:"2rem 1.75rem 3rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:3},children:[Object(h.jsx)(j.a,{variant:"h1",sx:{mb:0,pb:"1rem",color:"#555555",fontSize:"2rem",fontWeight:"bold",letterSpacing:"0.05em"},children:"\u6703\u54e1\u767b\u5165"}),Object(h.jsx)(l.b,{onSubmit:C,validate:function(e){var t={};return e.userName||(t.userName="\u5fc5\u586b"),e.password||(t.password="\u5fc5\u586b"),u||e.xCust?u||4===e.xCust.length||(t.xCust="\u9577\u5ea6\u9808\u70ba\u56db\u500b\u5b57\u5143"):t.xCust="\u5fc5\u586b",t},initialValues:{},render:function(e){var t=e.handleSubmit,r=e.form,n=e.submitting,s=e.pristine;e.values;return Object(h.jsxs)(d.a,{component:"form",onSubmit:t,sx:{width:"90%",maxWidth:"300px","& label":{width:"100%",fontSize:"0.9rem",fontWeight:"bold",textAlign:"left",paddingBottom:"0.25em",color:"#aaaaaa"},"& input":{p:"0.25em 0.5em",width:"100%",border:"0.5px solid #c4c4c4",borderRadius:"0.125em",outlineColor:function(e){return e.palette.primary.main},"&:autofill":{bgcolor:"#222"}},"& .form-field":{p:"0.25rem 0",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"flex-start",position:"relative","& .error-span":{position:"absolute",top:"0.5rem",right:0,fontSize:"0.75rem",color:"error.light"},"& .MuiSvgIcon-root":{color:"text.disabled"}},"& .btn-field":{p:"2em 0 0",position:"relative",display:"flex",alignItems:"center",justifyContent:"center","& .error-massage":{position:"absolute",top:"0.125rem",left:"50%",transform:"translate(-50%, 0)",color:"#df6c3e",fontWeight:" bold",fontSize:"0.875rem"},"& button":{p:"0.5em 0",m:"0 0.75em",width:"6rem",color:"background.paper",letterSpacing:"0.075em",backgroundColor:function(e){return e.palette.primary.main},"&:disabled":{color:"#777777"},"&:hover":{backgroundColor:"#fabd5e"}}}},children:[Object(h.jsx)(l.a,{name:"userName",children:function(e){var t=e.input,r=e.meta;return Object(h.jsxs)("div",{className:"form-field",children:[Object(h.jsx)("label",{children:"\u4f7f\u7528\u8005\u540d\u7a31\u6216\u96fb\u5b50\u4fe1\u7bb1"}),Object(h.jsx)("input",Object(a.a)(Object(a.a)({},t),{},{type:"text",placeholder:"Username or Email"})),r.error&&r.touched&&Object(h.jsx)("span",{className:"error-span",children:r.error})]})}}),Object(h.jsx)(l.a,{name:"password",children:function(e){var t=e.input,r=e.meta;return Object(h.jsxs)("div",{className:"form-field",children:[Object(h.jsx)("label",{children:"\u5bc6\u78bc "}),Object(h.jsx)("input",Object(a.a)(Object(a.a)({},t),{},{type:"text",placeholder:"Password",autoComplete:"off"})),r.error&&r.touched&&Object(h.jsx)("span",{className:"error-span",children:r.error})]})}}),g?Object(h.jsx)(l.a,{name:"xCust",children:function(e){var t=e.input,r=e.meta;return Object(h.jsxs)("div",{className:"form-field",children:[Object(h.jsx)("label",{children:"Cust "}),Object(h.jsxs)(d.a,{sx:{width:"100%",position:"relative"},children:[Object(h.jsx)("input",Object(a.a)(Object(a.a)({},t),{},{disabled:!0,type:"text",placeholder:"Cust",autoComplete:"off",value:u})),r.error&&r.touched&&Object(h.jsx)("span",{className:"error-span",children:r.error}),Object(h.jsx)(m.a,{onClick:w,sx:{position:"absolute",top:"50%",right:0,transform:"translateY(-50%)"},children:Object(h.jsx)(f.a,{})})]})]})}}):Object(h.jsx)(l.a,{name:"xCust",children:function(e){var t=e.input,r=e.meta;return Object(h.jsxs)("div",{className:"form-field",children:[Object(h.jsx)("label",{children:"Cust "}),Object(h.jsx)("input",Object(a.a)(Object(a.a)({},t),{},{type:"text",placeholder:"Cust",autoComplete:"off"})),r.error&&r.touched&&Object(h.jsx)("span",{className:"error-span",children:r.error})]})}}),Object(h.jsxs)("div",{className:"btn-field",children:[Object(h.jsx)(d.a,{sx:{width:"100%",textAlign:"center"},className:"error-massage",children:c}),Object(h.jsx)(p.a,{type:"submit",disabled:n,children:"\u767b\u5165"}),Object(h.jsx)(p.a,{type:"Button",onClick:function(){return(0,r.reset)(),void w()},disabled:n||s,children:"\u6e05\u9664"})]})]})}})]})})}))}}]);
//# sourceMappingURL=14.d8524394.chunk.js.map