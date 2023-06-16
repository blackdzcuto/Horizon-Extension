var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};
$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if("number"==typeof a.length)return $jscomp.arrayIterator(a);throw Error(String(a)+" is not an iterable or ArrayLike");};$jscomp.arrayFromIterator=function(a){for(var b,d=[];!(b=a.next()).done;)d.push(b.value);return d};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};$jscomp.ASSUME_ES5=!1;
$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){if(a==Array.prototype||a==Object.prototype)return a;a[b]=d.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var d=a[b];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b,d){if(!d||null!=a){d=$jscomp.propertyToPolyfillSymbol[b];if(null==d)return a[b];d=a[d];return void 0!==d?d:a[b]}};$jscomp.polyfill=function(a,b,d,g){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,d,g):$jscomp.polyfillUnisolated(a,b,d,g))};
$jscomp.polyfillUnisolated=function(a,b,d,g){d=$jscomp.global;a=a.split(".");for(g=0;g<a.length-1;g++){var k=a[g];if(!(k in d))return;d=d[k]}a=a[a.length-1];g=d[a];b=b(g);b!=g&&null!=b&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,d,g){var k=a.split(".");a=1===k.length;g=k[0];g=!a&&g in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var r=0;r<k.length-1;r++){var p=k[r];if(!(p in g))return;g=g[p]}k=k[k.length-1];d=$jscomp.IS_SYMBOL_NATIVE&&"es6"===d?g[k]:null;b=b(d);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,k,{configurable:!0,writable:!0,value:b}):b!==d&&(void 0===$jscomp.propertyToPolyfillSymbol[k]&&(d=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[k]=$jscomp.IS_SYMBOL_NATIVE?
$jscomp.global.Symbol(k):$jscomp.POLYFILL_PREFIX+d+"$"+k),$jscomp.defineProperty(g,$jscomp.propertyToPolyfillSymbol[k],{configurable:!0,writable:!0,value:b})))};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(d){}return!1};
$jscomp.setPrototypeOf=$jscomp.TRUST_ES6_POLYFILLS&&"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;$jscomp.generator={};$jscomp.generator.ensureIteratorResultIsObject_=function(a){if(!(a instanceof Object))throw new TypeError("Iterator result "+a+" is not an object");};
$jscomp.generator.Context=function(){this.isRunning_=!1;this.yieldAllIterator_=null;this.yieldResult=void 0;this.nextAddress=1;this.finallyAddress_=this.catchAddress_=0;this.finallyContexts_=this.abruptCompletion_=null};$jscomp.generator.Context.prototype.start_=function(){if(this.isRunning_)throw new TypeError("Generator is already running");this.isRunning_=!0};$jscomp.generator.Context.prototype.stop_=function(){this.isRunning_=!1};
$jscomp.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_};$jscomp.generator.Context.prototype.next_=function(a){this.yieldResult=a};$jscomp.generator.Context.prototype.throw_=function(a){this.abruptCompletion_={exception:a,isException:!0};this.jumpToErrorHandler_()};$jscomp.generator.Context.prototype["return"]=function(a){this.abruptCompletion_={"return":a};this.nextAddress=this.finallyAddress_};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks=function(a){this.abruptCompletion_={jumpTo:a};this.nextAddress=this.finallyAddress_};$jscomp.generator.Context.prototype.yield=function(a,b){this.nextAddress=b;return{value:a}};$jscomp.generator.Context.prototype.yieldAll=function(a,b){var d=$jscomp.makeIterator(a),g=d.next();$jscomp.generator.ensureIteratorResultIsObject_(g);if(g.done)this.yieldResult=g.value,this.nextAddress=b;else return this.yieldAllIterator_=d,this.yield(g.value,b)};
$jscomp.generator.Context.prototype.jumpTo=function(a){this.nextAddress=a};$jscomp.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0};$jscomp.generator.Context.prototype.setCatchFinallyBlocks=function(a,b){this.catchAddress_=a;void 0!=b&&(this.finallyAddress_=b)};$jscomp.generator.Context.prototype.setFinallyBlock=function(a){this.catchAddress_=0;this.finallyAddress_=a||0};$jscomp.generator.Context.prototype.leaveTryBlock=function(a,b){this.nextAddress=a;this.catchAddress_=b||0};
$jscomp.generator.Context.prototype.enterCatchBlock=function(a){this.catchAddress_=a||0;a=this.abruptCompletion_.exception;this.abruptCompletion_=null;return a};$jscomp.generator.Context.prototype.enterFinallyBlock=function(a,b,d){d?this.finallyContexts_[d]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_];this.catchAddress_=a||0;this.finallyAddress_=b||0};
$jscomp.generator.Context.prototype.leaveFinallyBlock=function(a,b){var d=this.finallyContexts_.splice(b||0)[0];if(d=this.abruptCompletion_=this.abruptCompletion_||d){if(d.isException)return this.jumpToErrorHandler_();void 0!=d.jumpTo&&this.finallyAddress_<d.jumpTo?(this.nextAddress=d.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=a};$jscomp.generator.Context.prototype.forIn=function(a){return new $jscomp.generator.Context.PropertyIterator(a)};
$jscomp.generator.Context.PropertyIterator=function(a){this.object_=a;this.properties_=[];for(var b in a)this.properties_.push(b);this.properties_.reverse()};$jscomp.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var a=this.properties_.pop();if(a in this.object_)return a}return null};$jscomp.generator.Engine_=function(a){this.context_=new $jscomp.generator.Context;this.program_=a};
$jscomp.generator.Engine_.prototype.next_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_.next,a,this.context_.next_);this.context_.next_(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.return_=function(a){this.context_.start_();var b=this.context_.yieldAllIterator_;if(b)return this.yieldAllStep_("return"in b?b["return"]:function(d){return{value:d,done:!0}},a,this.context_["return"]);this.context_["return"](a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.throw_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"],a,this.context_.next_);this.context_.throw_(a);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.yieldAllStep_=function(a,b,d){try{var g=a.call(this.context_.yieldAllIterator_,b);$jscomp.generator.ensureIteratorResultIsObject_(g);if(!g.done)return this.context_.stop_(),g;var k=g.value}catch(r){return this.context_.yieldAllIterator_=null,this.context_.throw_(r),this.nextStep_()}this.context_.yieldAllIterator_=null;d.call(this.context_,k);return this.nextStep_()};
$jscomp.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var a=this.program_(this.context_);if(a)return this.context_.stop_(),{value:a.value,done:!1}}catch(b){this.context_.yieldResult=void 0,this.context_.throw_(b)}this.context_.stop_();if(this.context_.abruptCompletion_){a=this.context_.abruptCompletion_;this.context_.abruptCompletion_=null;if(a.isException)throw a.exception;return{value:a["return"],done:!0}}return{value:void 0,done:!0}};
$jscomp.generator.Generator_=function(a){this.next=function(b){return a.next_(b)};this["throw"]=function(b){return a.throw_(b)};this["return"]=function(b){return a.return_(b)};this[Symbol.iterator]=function(){return this}};$jscomp.generator.createGenerator=function(a,b){var d=new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));$jscomp.setPrototypeOf&&a.prototype&&$jscomp.setPrototypeOf(d,a.prototype);return d};
$jscomp.asyncExecutePromiseGenerator=function(a){function b(g){return a.next(g)}function d(g){return a["throw"](g)}return new Promise(function(g,k){function r(p){p.done?g(p.value):Promise.resolve(p.value).then(b,d).then(r,k)}r(a.next())})};$jscomp.asyncExecutePromiseGeneratorFunction=function(a){return $jscomp.asyncExecutePromiseGenerator(a())};$jscomp.asyncExecutePromiseGeneratorProgram=function(a){return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))};
window.onload=function(){function a(q){var l=document.getElementById("snackbar");l.addEventListener("click",function(){l.className=l.className.replace("show","")});l.innerHTML=q;l.className="show";setTimeout(function(){l.className=l.className.replace("show","")},3E3)}function b(q,l,f){if(0===l.length&&void 0!=q)return q;if(void 0==q)return f;var m=l[0];if(void 0==m)return f;l=l.slice(1);return b(q[m],l,f++)}function d(q,l){l=void 0===l?[]:l;var f=[],m;for(m in q)"object"===typeof q[m]?f=f.concat(d(q[m],
[].concat($jscomp.arrayFromIterable(l),[m]))):f.push([].concat($jscomp.arrayFromIterable(l),[m]));return f}function g(q){return Object.prototype.toString.call(q).slice(8,-1)}var k,r,p;return $jscomp.asyncExecutePromiseGeneratorProgram(function(q){r=JSON.parse(localStorage.getItem("Session_ID"));k=new WebSocket(r.Websocket);k.onopen=function(){k.send(JSON.stringify({type:"getFastConfig"}));setInterval(function(){k.send(JSON.stringify({type:"ping",Session_ID:r.Session_ID,TimeStamp:r.TimeStamp}))},1E4)};
k.onmessage=function(l){l=JSON.parse(l.data);"Noti"==l.Type&&(l.Action.includes("RestartRequired")?a("Successful changes, a restart is required for the changes to take effect."):a("Successful change !"));if("Success"==l.Status){p=l.Data;for(var f=[],m=[],w=[],v=[],t=JSON.parse(localStorage.getItem("Language")),e=$jscomp.makeIterator(Object.keys(p)),c=e.next();!c.done;c=e.next())c=c.value,"Object"==g(p[c])?f.push(c):"Boolean"==g(p[c])?m.push({Status:p[c],Name:c}):"Number"==g(p[c])?w.push({Name:c,Data:p[c]}):
"String"==g(p[c])&&v.push({Data:p[c],Name:c});f=$jscomp.makeIterator(f);for(c=f.next();!c.done;c=f.next()){c=c.value;e=d(p[c]);var h=c,y=$jscomp.makeIterator(e);for(c=y.next();!c.done;c=y.next()){c=c.value;var x=b(p[h],c,0),z=g(x);"Boolean"==z?m.push({Status:x,Name:c[0],Path:e,Main_Path:h}):"String"==z&&v.push({Data:x,Name:c[0],Path:e,Main_Path:h})}}f=document.getElementsByClassName("boxes")[0];var A=document.querySelector(".popup");document.querySelector(".popup-back").addEventListener("click",function(){A.classList.remove("active")});
e={};m=$jscomp.makeIterator(m);for(c=m.next();!c.done;e={$jscomp$loop$prop$i$11$17:e.$jscomp$loop$prop$i$11$17},c=m.next())e.$jscomp$loop$prop$i$11$17=c.value,c=document.createElement("div"),c.className="box",h=document.createElement("h3"),h.textContent=e.$jscomp$loop$prop$i$11$17.Name,h.onclick=function(n){return function(){document.getElementById("Setting_Name").innerHTML=" <p>Name Setting: "+n.$jscomp$loop$prop$i$11$17.Name+"</p><p>Description: "+(void 0!=t[n.$jscomp$loop$prop$i$11$17.Name]?t[n.$jscomp$loop$prop$i$11$17.Name]:
"Nothing To Show")+" </p>";A.classList.add("active")}}(e),c.appendChild(h),h=document.createElement("input"),h.type="checkbox",h.id=e.$jscomp$loop$prop$i$11$17.Name,h.className="checkbox",1==e.$jscomp$loop$prop$i$11$17.Status?h.checked=!0:"",h.addEventListener("change",function(n){return function(){var u=document.getElementById(n.$jscomp$loop$prop$i$11$17.Name);k.send(JSON.stringify({type:"FastConfig_Change",Data:{Name:n.$jscomp$loop$prop$i$11$17.Name,Value:u.checked,Path:n.$jscomp$loop$prop$i$11$17.Path,
Main_Path:n.$jscomp$loop$prop$i$11$17.Main_Path}}))}}(e)),c.appendChild(h),h=document.createElement("label"),h.htmlFor=e.$jscomp$loop$prop$i$11$17.Name,h.className="toggle",c.appendChild(h),h=document.createElement("div"),h.className="box-wrapper",h.innerHTML="<p>"+(void 0!=t[e.$jscomp$loop$prop$i$11$17.Name]?t[e.$jscomp$loop$prop$i$11$17.Name]:"Nothing To Show")+"</p>",c.appendChild(h),f.appendChild(c);m=document.getElementsByClassName("box_string")[0];f={};v=$jscomp.makeIterator(v);for(c=v.next();!c.done;f=
{$jscomp$loop$prop$i$12$19:f.$jscomp$loop$prop$i$12$19},c=v.next())f.$jscomp$loop$prop$i$12$19=c.value,c=document.createElement("div"),c.className="box",e=document.createElement("h3"),e.innerHTML=f.$jscomp$loop$prop$i$12$19.Name,c.appendChild(e),e=document.createElement("p"),e.textContent=t[f.$jscomp$loop$prop$i$12$19.Name],c.appendChild(e),e=document.createElement("input"),e.readOnly=!0,e.className="default",e.value="Example: "+(void 0!=t.Example[f.$jscomp$loop$prop$i$12$19.Name]?t.Example[f.$jscomp$loop$prop$i$12$19.Name]:
"Nothing to show"),c.appendChild(e),e=document.createElement("input"),e.readOnly=!0,e.className="default",e.value="Your Config: "+f.$jscomp$loop$prop$i$12$19.Data,c.appendChild(e),e=document.createElement("form"),e.className="modal",h=document.createElement("input"),h.type="text",h.name=f.$jscomp$loop$prop$i$12$19.Name,h.placeholder="Enter data",e.appendChild(h),h=document.createElement("button"),h.type="submit",h.innerHTML="Save",h.addEventListener("click",function(n){return function(u){u.preventDefault();
u=document.getElementsByName(n.$jscomp$loop$prop$i$12$19.Name)[0];k.send(JSON.stringify({type:"FastConfig_Change",Data:{Name:n.$jscomp$loop$prop$i$12$19.Name,Value:u.value,Path:n.$jscomp$loop$prop$i$12$19.Path,Main_Path:n.$jscomp$loop$prop$i$12$19.Main_Path}}));n.$jscomp$loop$prop$i$12$19.input=""}}(f)),e.appendChild(h),c.appendChild(e),m.appendChild(c);v=document.getElementsByClassName("box_number")[0];m={};w=$jscomp.makeIterator(w);for(c=w.next();!c.done;m={$jscomp$loop$prop$i$14$21:m.$jscomp$loop$prop$i$14$21},
c=w.next())m.$jscomp$loop$prop$i$14$21=c.value,c=document.createElement("div"),c.className="box",f=document.createElement("h3"),f.innerHTML=m.$jscomp$loop$prop$i$14$21.Name,c.appendChild(f),f=document.createElement("p"),f.textContent=t[m.$jscomp$loop$prop$i$14$21.Name],c.appendChild(f),f=document.createElement("input"),f.readOnly=!0,f.className="default",f.value="Example: "+(void 0!=t.Example[m.$jscomp$loop$prop$i$14$21.Name]?t.Example[m.$jscomp$loop$prop$i$14$21.Name]:"Nothing to show"),c.appendChild(f),
f=document.createElement("input"),f.readOnly=!0,f.className="default",f.value="Your Config: "+m.$jscomp$loop$prop$i$14$21.Data,c.appendChild(f),f=document.createElement("form"),f.className="modal",e=document.createElement("input"),e.type="number",e.placeholder="Enter a number",e.name=m.$jscomp$loop$prop$i$14$21.Name,f.appendChild(e),e=document.createElement("button"),e.type="submit",e.textContent="Save",e.addEventListener("click",function(n){return function(u){u.preventDefault();u=document.getElementsByName(n.$jscomp$loop$prop$i$14$21.Name)[0];
k.send(JSON.stringify({type:"FastConfig_Change",Data:{Name:n.$jscomp$loop$prop$i$14$21.Name,Value:parseInt(u.value),Path:n.$jscomp$loop$prop$i$14$21.Path,Main_Path:n.$jscomp$loop$prop$i$14$21.Main_Path}}));n.$jscomp$loop$prop$i$14$21.input=""}}(m)),f.appendChild(e),c.appendChild(f),v.appendChild(c)}0==l.Status&&6==l.Code&&(alert("\u0110\u00e3 h\u1ebft quy\u1ec1n truy c\u1eadp ho\u1eb7c ch\u01b0a \u0111\u0103ng nh\u1eadp !"),window.location.href="../check.html")};k.onclose=function(){alert("M\u1ea5t k\u1ebft n\u1ed1i t\u1edbi m\u00e1y ch\u1ee7!");
window.location.href="../check.html"};q.jumpToEnd()})};
