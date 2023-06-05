(function(){"use strict";var e={7218:function(e,s,t){var r=t(9963),o=t(6252);function a(e,s){const t=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(t)}var n=t(3744);const l={},i=(0,n.Z)(l,[["render",a]]);var u=i,c=t(2201),d=t(3577);const m={class:"all-container"},p={class:"left-container"},h={class:"chat-list"},g={class:"session-title"},f={class:"session-actions"},w=["onClick"],v={class:"right-container"},_={class:"content",ref:"content"},b=["disabled"],y=["innerHTML"],k={class:"input-area"},F={class:"button-area"};function x(e,s,t,a,n,l){return(0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("div",p,[(0,o._)("div",h,[(0,o._)("div",{class:"newchat",id:"newchat",onClick:s[0]||(s[0]=(...e)=>l.handleClick&&l.handleClick(...e))},"+ New Chat"),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.sessions,(e=>((0,o.wg)(),(0,o.iD)("div",{key:e.id,class:"session"},[(0,o._)("div",g,(0,d.zw)(e.title),1),(0,o._)("div",f,[(0,o._)("i",{class:"fa fa-trash",onClick:s=>l.deleteSession(e)},null,8,w)])])))),128))])]),(0,o._)("div",v,[(0,o._)("div",_,[(0,o._)("button",{disabled:this.loading,class:"loading",onClick:s[1]||(s[1]=(...e)=>l.loadMore&&l.loadMore(...e))},[(0,o._)("span",null,(0,d.zw)(this.loadtext),1)],8,b),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.historyMessage,((e,s)=>((0,o.wg)(),(0,o.iD)("div",{key:s,class:(0,d.C_)(e.role+"-message")},[(0,o._)("pre",{innerHTML:l.parseMarkdown(e.content)},null,8,y)],2)))),128))],512),(0,o._)("div",k,[(0,o.wy)((0,o._)("textarea",{"onUpdate:modelValue":s[2]||(s[2]=e=>n.currentMessage=e)},null,512),[[r.nr,n.currentMessage]]),(0,o._)("div",F,[(0,o._)("button",{onClick:s[3]||(s[3]=(...e)=>l.sendMessage&&l.sendMessage(...e))},"发 送")])])])])}t(7658),t(541);var $=t(7441),M=t(637),W={data(){return{historyMessage:[],currentMessage:"",page:0,loading:!1,loadtext:"显示之前的消息",is_stream:!1,is_history:!0,sessions:[{id:"session-1",title:"Session 1",history:[]},{id:"session-2",title:"Session 2",history:[]}]}},mounted(){this.getChatHistory()},methods:{parseMarkdown(e){const s=new $.TU.Renderer;return s.code=(e,s)=>{const t=M.Z.getLanguage(s)?s:"plaintext";return`<pre><code class="hljs ${t}">${M.Z.highlight(t,e).value}</code></pre>`},$.TU.setOptions({renderer:s,highlight:e=>M.Z.highlightAuto(e).value}),(0,$.TU)(e)},addMessage(e,s){this.historyMessage.push({role:s,content:e})},updateMessage(e){const s=this.historyMessage[this.historyMessage.length-1];s.content+=e},sendMessage(){const e=this.currentMessage.trim();this.addMessage(e,"user"),this.currentMessage="",this.$axios.post("/api/onechat/",{sid:0,input_text:e,is_history:this.is_history}).then((e=>{this.addMessage(e.data.answer,"bot")})).catch((e=>{this.$message.error(e.response.data[0])}))},getChatHistory(){this.$axios.get("/api/recentrecords",{params:{page:this.page}}).then((e=>{e.data.chat_history.length||(this.loading=!0,this.loadtext="没有更多了"),e.data.chat_history.forEach((e=>{this.historyMessage.unshift({role:"bot",content:e.fields.bot_output}),this.historyMessage.unshift({role:"user",content:e.fields.user_input})}))}))},loadMore(){console.log(111),this.page++,this.getChatHistory()},handleClick(){const e={id:`session-${this.sessions.length+1}`,title:`Session ${this.sessions.length+1}`,history:[]};this.sessions.push(e)},deleteSession(e){const s=this.sessions.indexOf(e);console.log(e),this.sessions.splice(s,1)}}};const C=(0,n.Z)(W,[["render",x]]);var V=C;const U={class:"box"},Z=(0,o._)("h3",null,"登录页面",-1),S={class:"item-button"},O={class:"toregister"},P={class:"to_left"};function D(e,s,t,r,a,n){const l=(0,o.up)("el-input"),i=(0,o.up)("el-form-item"),u=(0,o.up)("el-button"),c=(0,o.up)("router-link"),d=(0,o.up)("el-form");return(0,o.wg)(),(0,o.iD)("div",U,[Z,(0,o.Wm)(d,{model:a.ruleForm,"status-icon":"",rules:a.rules,ref:"ruleForm","label-width":"100px",class:"demo-ruleForm"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{label:"手机号",prop:"username"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"number",modelValue:a.ruleForm.username,"onUpdate:modelValue":s[0]||(s[0]=e=>a.ruleForm.username=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"密      码",prop:"pass"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"password",modelValue:a.ruleForm.password,"onUpdate:modelValue":s[1]||(s[1]=e=>a.ruleForm.password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o._)("div",S,[(0,o.Wm)(u,{type:"primary",onClick:s[2]||(s[2]=e=>n.submitForm("ruleForm"))},{default:(0,o.w5)((()=>[(0,o.Uk)("提交")])),_:1}),(0,o._)("div",O,[(0,o.Wm)(c,{to:"/register",class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("还没有账号？去注册")])),_:1})]),(0,o._)("div",P,[(0,o.Wm)(c,{to:"/newpass",class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("忘记密码")])),_:1})])])])),_:1},8,["model","rules"])])}var T={data(){return{ruleForm:{password:"",username:""},rules:{}}},methods:{submitForm(e){this.$refs[e].validate((e=>{e&&this.$axios.post("/api/login/",{username:this.ruleForm.username,password:this.ruleForm.password}).then((e=>{this.$message({type:"success",message:"登录成功"}),localStorage.setItem("elementToken","Bearer "+e.data.token),localStorage.setItem("refresh",e.data.refresh),localStorage.setItem("is_vip",e.data.is_vip),this.$router.push("/index")})).catch((e=>{console.log(e),this.$message.error(e.response.data.non_field_errors[0])}))}))}}};const j=(0,n.Z)(T,[["render",D]]);var A=j;const z={class:"box"},H=(0,o._)("h3",null,"注册页面",-1),E={class:"item-button"},I={class:"toregister"};function B(e,s,t,r,a,n){const l=(0,o.up)("el-input"),i=(0,o.up)("el-form-item"),u=(0,o.up)("el-button"),c=(0,o.up)("router-link"),d=(0,o.up)("el-form");return(0,o.wg)(),(0,o.iD)("div",z,[H,(0,o.Wm)(d,{model:a.ruleForm,"status-icon":"",rules:a.rules,ref:"ruleForm","label-width":"100px",class:"demo-ruleForm"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{label:"手机号",prop:"username"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"number",modelValue:a.ruleForm.username,"onUpdate:modelValue":s[0]||(s[0]=e=>a.ruleForm.username=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"密码",prop:"pass"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"password",modelValue:a.ruleForm.password,"onUpdate:modelValue":s[1]||(s[1]=e=>a.ruleForm.password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"确认密码",prop:"checkPass"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"password",modelValue:a.ruleForm.checkPass,"onUpdate:modelValue":s[2]||(s[2]=e=>a.ruleForm.checkPass=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o._)("div",E,[(0,o.Wm)(u,{type:"primary",onClick:s[3]||(s[3]=e=>n.submitForm("ruleForm"))},{default:(0,o.w5)((()=>[(0,o.Uk)("提交")])),_:1}),(0,o._)("div",I,[(0,o.Wm)(c,{to:"/login",class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("已有账号？去登录")])),_:1})])])])),_:1},8,["model","rules"])])}var q={data(){var e=(e,s,t)=>{""===s?t(new Error("请输入密码")):(""!==this.ruleForm.checkPass&&this.$refs.ruleForm.validateField("checkPass"),t())},s=(e,s,t)=>{""===s?t(new Error("请再次输入密码")):s!==this.ruleForm.password?t(new Error("两次输入密码不一致!")):t()};return{ruleForm:{password:"",checkPass:"",username:""},rules:{pass:[{validator:e,trigger:"blur"}],checkPass:[{validator:s,trigger:"blur"}]}}},methods:{submitForm(e){this.$refs[e].validate((e=>{e&&this.$axios.post("/api/newpass/",{username:this.ruleForm.username,password:this.ruleForm.password}).then((e=>{this.$message({type:"success",message:"密码重置成功"}),this.$router.push("/login")})).catch((e=>{this.$message.error(e.response.data[0])}))}))}}};const L=(0,n.Z)(q,[["render",B]]);var K=L;const N={class:"box"},R=(0,o._)("h3",null,"重置密码",-1),Y={class:"item-button"},J={class:"toregister"};function G(e,s,t,r,a,n){const l=(0,o.up)("el-input"),i=(0,o.up)("el-form-item"),u=(0,o.up)("el-button"),c=(0,o.up)("router-link"),d=(0,o.up)("el-form");return(0,o.wg)(),(0,o.iD)("div",N,[R,(0,o.Wm)(d,{model:a.ruleForm,"status-icon":"",rules:a.rules,ref:"ruleForm","label-width":"100px",class:"demo-ruleForm"},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{label:"手机号",prop:"phone_number"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"number",modelValue:a.ruleForm.username,"onUpdate:modelValue":s[0]||(s[0]=e=>a.ruleForm.username=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o.Wm)(i,{label:"密码",prop:"pass"},{default:(0,o.w5)((()=>[(0,o.Wm)(l,{type:"password",modelValue:a.ruleForm.password,"onUpdate:modelValue":s[1]||(s[1]=e=>a.ruleForm.password=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),(0,o._)("div",Y,[(0,o.Wm)(u,{type:"primary",onClick:s[2]||(s[2]=e=>n.submitForm("ruleForm"))},{default:(0,o.w5)((()=>[(0,o.Uk)("提交")])),_:1}),(0,o._)("div",J,[(0,o.Wm)(c,{to:"/register",class:"link"},{default:(0,o.w5)((()=>[(0,o.Uk)("已有账号？去登录")])),_:1})])])])),_:1},8,["model","rules"])])}var Q={data(){return{ruleForm:{password:"",username:""},rules:{}}},methods:{submitForm(e){this.$refs[e].validate((e=>{e&&this.$axios.post("/api/newpass/",{username:this.ruleForm.username,password:this.ruleForm.password}).then((e=>{this.$message({type:"success",message:"登录成功"}),localStorage.setItem("elementToken","Bearer "+e.data.token),localStorage.setItem("refresh",e.data.refresh),localStorage.setItem("is_vip",e.data.is_vip),this.$router.push("/index")})).catch((e=>{console.log(e.response),this.$message.error("账号密码不对！")}))}))}}};const X=(0,n.Z)(Q,[["render",G]]);var ee=X;const se={key:0},te={key:1};function re(e,s,t,r,a,n){return(0,o.wg)(),(0,o.iD)("div",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(a.chatContent,((e,s)=>((0,o.wg)(),(0,o.iD)("div",{key:s},["user"===e.role?((0,o.wg)(),(0,o.iD)("p",se,(0,d.zw)(e.content),1)):((0,o.wg)(),(0,o.iD)("p",te,(0,d.zw)(e.content),1))])))),128))])}var oe={data(){return{chatContent:[]}},mounted(){const e=new EventSource("http://localhost:8000/api/onechatstream/",{headers:{Authorization:localStorage.elementToken,"Content-Type":"text/event-stream"}});e.onmessage=e=>{const s=JSON.parse(e.data);this.chatContent.push(s)}}};const ae=(0,n.Z)(oe,[["render",re]]);var ne=ae;const le={class:"login"};function ie(e,s){return(0,o.wg)(),(0,o.iD)("div",le," 404 ")}const ue={},ce=(0,n.Z)(ue,[["render",ie]]);var de=ce;const me=[{path:"/",redirect:"/index",meta:{requiresAuth:!0}},{path:"/index",name:"Index",meta:{requiresAuth:!0},component:V},{path:"/login",name:"login",component:A},{path:"/newpass",name:"newpass",component:ee},{path:"/register",name:"Register",component:K},{path:"/:catchAll(.*)",name:"Not Found",component:de},{path:"/test",name:"test",component:ne,meta:{requiresAuth:!0}}],pe=(0,c.p7)({history:(0,c.PO)(),routes:me});var he=pe,ge=t(8174),fe=t(8538),we=(t(2834),t(6154));we.Z.defaults.baseURL="http://127.0.0.1:8000/";let ve=!1,_e=[];we.Z.interceptors.request.use((e=>(localStorage.elementToken&&(e.headers.Authorization=localStorage.elementToken),e))),we.Z.interceptors.response.use((e=>e),(e=>{const{config:s,response:t}=e,r=s;return 401!==t.status||r._retry||"/api/refresh/"===s.url?Promise.reject(e):ve?new Promise((e=>{_e.push((s=>{r.headers.Authorization=`Bearer ${s}`,e((0,we.Z)(r))}))})):(r._retry=!0,ve=!0,new Promise((e=>{const s=localStorage.refresh;we.Z.post("/api/refresh/",{refresh:s}).then((s=>{const t=s.data.access;localStorage.elementToken=`Bearer ${t}`,r.headers.Authorization=`Bearer ${t}`,e((0,we.Z)(r)),_e.forEach((e=>e(t))),_e=[]})).catch((e=>(he.push("/login"),Promise.reject(e)))).finally((()=>{ve=!1}))})))}));var be={install:e=>{e.config.globalProperties.$axios=we.Z}};(0,r.ri)(u).use(he).use(ge.Z,{locale:fe.Z}).use(be).mount("#app")}},s={};function t(r){var o=s[r];if(void 0!==o)return o.exports;var a=s[r]={exports:{}};return e[r].call(a.exports,a,a.exports,t),a.exports}t.m=e,function(){var e=[];t.O=function(s,r,o,a){if(!r){var n=1/0;for(c=0;c<e.length;c++){r=e[c][0],o=e[c][1],a=e[c][2];for(var l=!0,i=0;i<r.length;i++)(!1&a||n>=a)&&Object.keys(t.O).every((function(e){return t.O[e](r[i])}))?r.splice(i--,1):(l=!1,a<n&&(n=a));if(l){e.splice(c--,1);var u=o();void 0!==u&&(s=u)}}return s}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,o,a]}}(),function(){t.d=function(e,s){for(var r in s)t.o(s,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)}}(),function(){var e={143:0};t.O.j=function(s){return 0===e[s]};var s=function(s,r){var o,a,n=r[0],l=r[1],i=r[2],u=0;if(n.some((function(s){return 0!==e[s]}))){for(o in l)t.o(l,o)&&(t.m[o]=l[o]);if(i)var c=i(t)}for(s&&s(r);u<n.length;u++)a=n[u],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(c)},r=self["webpackChunkmychatweb"]=self["webpackChunkmychatweb"]||[];r.forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(7218)}));r=t.O(r)})();
//# sourceMappingURL=app.cf288319.js.map