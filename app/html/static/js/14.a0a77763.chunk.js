(this["webpackJsonpbonvies-pos"]=this["webpackJsonpbonvies-pos"]||[]).push([[14],{337:function(e,t,r){"use strict";r.r(t);var n=r(7),a=r.n(n),s=r(4),o=r(10),i=r(19),c=r(0),l=r(60),u=r(271),d=r(71),b=r(233),j=r(313),m=r(259),p=r(234),x=r(311),f=r(308),h=r.n(f),O=r(1);t.default=Object(l.b)((function(e){return{errorMessage:e.auth.errorMessage}}),{signin:d.b})((function(e){var t=e.signin,r=e.history,n=e.errorMessage,l=localStorage.getItem("xCust"),d=Object(c.useState)(Boolean(l)),f=Object(i.a)(d,2),g=f[0],v=f[1],C=function(){var e=Object(o.a)(a.a.mark((function e(n){var o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=g?Object(s.a)(Object(s.a)({},n),{},{xCust:l}):n,e.next=3,t(o);case 3:if(e.sent){e.next=6;break}return e.abrupt("return");case 6:n.xCust&&window.localStorage.setItem("xCust",n.xCust),r.push("/");case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){v(!1)};return Object(O.jsx)(b.a,{id:"signin",sx:{width:"100vw",height:"calc(100vh - 2.5rem)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",bgcolor:"background.default"},children:Object(O.jsxs)(j.a,{sx:{p:"2rem 1.75rem 3rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:3},children:[Object(O.jsx)(m.a,{variant:"h1",sx:{mb:0,pb:"1rem",color:"#555555",fontSize:"2rem",fontWeight:"bold",letterSpacing:"0.05em"},children:"\u6703\u54e1\u767b\u5165"}),Object(O.jsx)(u.b,{onSubmit:C,validate:function(e){var t={};return e.userName||(t.userName="\u5fc5\u586b"),e.password||(t.password="\u5fc5\u586b"),l||e.xCust?l||4===e.xCust.length||(t.xCust="\u9577\u5ea6\u9808\u70ba\u56db\u500b\u5b57\u5143"):t.xCust="\u5fc5\u586b",t},initialValues:{},render:function(e){var t=e.handleSubmit,r=e.form,a=e.submitting,o=e.pristine;e.values;return Object(O.jsxs)(b.a,{component:"form",onSubmit:t,sx:{width:"90%",maxWidth:"300px","& label":{width:"100%",fontSize:"0.9rem",fontWeight:"bold",textAlign:"left",paddingBottom:"0.25em",color:"#aaaaaa"},"& input":{p:"0.25em 0.5em",width:"100%",border:"0.5px solid #c4c4c4",borderRadius:"0.125em",outlineColor:function(e){return e.palette.primary.main},"&:autofill":{bgcolor:"#222"}},"& .form-field":{p:"0.25rem 0",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"flex-start",position:"relative","& .error-span":{position:"absolute",top:"0.5rem",right:0,fontSize:"0.75rem",color:"error.light"},"& .MuiSvgIcon-root":{color:"text.disabled"}},"& .btn-field":{p:"2em 0 0",position:"relative",display:"flex",alignItems:"center",justifyContent:"center","& .error-massage":{position:"absolute",top:"0.125rem",left:"50%",transform:"translate(-50%, 0)",color:"#df6c3e",fontWeight:" bold",fontSize:"0.875rem"},"& button":{p:"0.5em 0",m:"0 0.75em",width:"6rem",color:"background.paper",letterSpacing:"0.075em",backgroundColor:function(e){return e.palette.primary.main},"&:disabled":{color:"#777777"},"&:hover":{backgroundColor:"#fabd5e"}}}},children:[Object(O.jsx)(u.a,{name:"userName",children:function(e){var t=e.input,r=e.meta;return Object(O.jsxs)("div",{className:"form-field",children:[Object(O.jsx)("label",{children:"\u4f7f\u7528\u8005\u540d\u7a31\u6216\u96fb\u5b50\u4fe1\u7bb1"}),Object(O.jsx)("input",Object(s.a)(Object(s.a)({},t),{},{type:"text",placeholder:"Username or Email"})),r.error&&r.touched&&Object(O.jsx)("span",{className:"error-span",children:r.error})]})}}),Object(O.jsx)(u.a,{name:"password",children:function(e){var t=e.input,r=e.meta;return Object(O.jsxs)("div",{className:"form-field",children:[Object(O.jsx)("label",{children:"\u5bc6\u78bc "}),Object(O.jsx)("input",Object(s.a)(Object(s.a)({},t),{},{type:"text",placeholder:"Password",autoComplete:"off"})),r.error&&r.touched&&Object(O.jsx)("span",{className:"error-span",children:r.error})]})}}),g?Object(O.jsx)(u.a,{name:"xCust",children:function(e){var t=e.input,r=e.meta;return Object(O.jsxs)("div",{className:"form-field",children:[Object(O.jsx)("label",{children:"Cust "}),Object(O.jsxs)(b.a,{sx:{width:"100%",position:"relative"},children:[Object(O.jsx)("input",Object(s.a)(Object(s.a)({},t),{},{disabled:!0,type:"text",placeholder:"Cust",autoComplete:"off",value:l})),r.error&&r.touched&&Object(O.jsx)("span",{className:"error-span",children:r.error}),Object(O.jsx)(p.a,{onClick:w,sx:{position:"absolute",top:"50%",right:0,transform:"translateY(-50%)"},children:Object(O.jsx)(h.a,{})})]})]})}}):Object(O.jsx)(u.a,{name:"xCust",children:function(e){var t=e.input,r=e.meta;return Object(O.jsxs)("div",{className:"form-field",children:[Object(O.jsx)("label",{children:"Cust "}),Object(O.jsx)("input",Object(s.a)(Object(s.a)({},t),{},{type:"text",placeholder:"Cust",autoComplete:"off"})),r.error&&r.touched&&Object(O.jsx)("span",{className:"error-span",children:r.error})]})}}),Object(O.jsxs)("div",{className:"btn-field",children:[Object(O.jsx)(b.a,{sx:{width:"100%",textAlign:"center"},className:"error-massage",children:n}),Object(O.jsx)(x.a,{type:"submit",disabled:a,children:"\u767b\u5165"}),Object(O.jsx)(x.a,{type:"Button",onClick:function(){return(0,r.reset)(),void w()},disabled:a||o,children:"\u6e05\u9664"})]})]})}})]})})}))}}]);
//# sourceMappingURL=14.a0a77763.chunk.js.map