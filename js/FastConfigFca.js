var v = v || {};
v.scope = {};
v.createTemplateTagFirstArg = function (a) {
  return a.raw = a;
};
v.createTemplateTagFirstArgWithRaw = function (b, c) {
  b.raw = c;
  return b;
};
v.arrayIteratorImpl = function (b) {
  var c = 0;
  return function () {
    if (c < b.length) {
      return {
        done: false,
        value: b[c++]
      };
    } else {
      return {
        done: true
      };
    }
  };
};
v.arrayIterator = function (a) {
  return {
    next: v.arrayIteratorImpl(a)
  };
};
v.makeIterator = function (b) {
  var c = typeof Symbol != "undefined" && Symbol.iterator && b[Symbol.iterator];
  if (c) {
    return c.call(b);
  }
  if (typeof b.length == "number") {
    return v.arrayIterator(b);
  }
  throw Error(String(b) + " is not an iterable or ArrayLike");
};
v.arrayFromIterator = function (b) {
  for (var c, d = []; !(c = b.next()).done;) {
    d.push(c.value);
  }
  return d;
};
v.arrayFromIterable = function (a) {
  if (a instanceof Array) {
    return a;
  } else {
    return v.arrayFromIterator(v.makeIterator(a));
  }
};
v.ASSUME_ES5 = false;
v.ASSUME_NO_NATIVE_MAP = false;
v.ASSUME_NO_NATIVE_SET = false;
v.SIMPLE_FROUND_POLYFILL = false;
v.ISOLATE_POLYFILLS = false;
v.FORCE_POLYFILL_PROMISE = false;
v.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = false;
v.defineProperty = v.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function (d, c, a) {
  if (d == Array.prototype || d == Object.prototype) {
    return d;
  }
  d[c] = a.value;
  return d;
};
v.getGlobal = function (a) {
  a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof global == "object" && global];
  for (var b = 0; b < a.length; ++b) {
    var d = a[b];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
};
v.global = v.getGlobal(this);
v.IS_SYMBOL_NATIVE = typeof Symbol === "function" && typeof Symbol("x") === "symbol";
v.TRUST_ES6_POLYFILLS = !v.ISOLATE_POLYFILLS || v.IS_SYMBOL_NATIVE;
v.polyfills = {};
v.propertyToPolyfillSymbol = {};
v.POLYFILL_PREFIX = "$jscp$";
var a = function (d, c, a) {
  if (!a || d != null) {
    a = v.propertyToPolyfillSymbol[c];
    if (a == null) {
      return d[c];
    }
    a = d[a];
    if (a !== undefined) {
      return a;
    } else {
      return d[c];
    }
  }
};
v.polyfill = function (e, c, a, b) {
  if (c) {
    if (v.ISOLATE_POLYFILLS) {
      v.polyfillIsolated(e, c, a, b);
    } else {
      v.polyfillUnisolated(e, c, a, b);
    }
  }
};
v.polyfillUnisolated = function (a, b, d, g) {
  d = v.global;
  a = a.split(".");
  for (g = 0; g < a.length - 1; g++) {
    var i = a[g];
    if (!(i in d)) {
      return;
    }
    d = d[i];
  }
  a = a[a.length - 1];
  g = d[a];
  b = b(g);
  if (b != g && b != null) {
    v.defineProperty(d, a, {
      configurable: true,
      writable: true,
      value: b
    });
  }
};
v.polyfillIsolated = function (a, b, d, g) {
  var i = a.split(".");
  a = i.length === 1;
  g = i[0];
  g = !a && g in v.polyfills ? v.polyfills : v.global;
  for (var k = 0; k < i.length - 1; k++) {
    var n = i[k];
    if (!(n in g)) {
      return;
    }
    g = g[n];
  }
  i = i[i.length - 1];
  d = v.IS_SYMBOL_NATIVE && d === "es6" ? g[i] : null;
  b = b(d);
  if (b != null) {
    if (a) {
      v.defineProperty(v.polyfills, i, {
        configurable: true,
        writable: true,
        value: b
      });
    } else if (b !== d) {
      if (v.propertyToPolyfillSymbol[i] === undefined) {
        d = Math.random() * 1000000000 >>> 0;
        v.propertyToPolyfillSymbol[i] = v.IS_SYMBOL_NATIVE ? v.global.Symbol(i) : v.POLYFILL_PREFIX + d + "$" + i;
      }
      v.defineProperty(g, v.propertyToPolyfillSymbol[i], {
        configurable: true,
        writable: true,
        value: b
      });
    }
  }
};
v.underscoreProtoCanBeSet = function () {
  var b = {
    a: true
  };
  var c = {};
  try {
    c.__proto__ = b;
    return c.a;
  } catch (b) {}
  return false;
};
v.setPrototypeOf = v.TRUST_ES6_POLYFILLS && typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf : v.underscoreProtoCanBeSet() ? function (b, c) {
  b.__proto__ = c;
  if (b.__proto__ !== c) {
    throw new TypeError(b + " is not extensible");
  }
  return b;
} : null;
v.generator = {};
v.generator.ensureIteratorResultIsObject_ = function (a) {
  if (!(a instanceof Object)) {
    throw new TypeError("Iterator result " + a + " is not an object");
  }
};
v.generator.Context = function () {
  this.isRunning_ = false;
  this.yieldAllIterator_ = null;
  this.yieldResult = undefined;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
v.generator.Context.prototype.start_ = function () {
  if (this.isRunning_) {
    throw new TypeError("Generator is already running");
  }
  this.isRunning_ = true;
};
v.generator.Context.prototype.stop_ = function () {
  this.isRunning_ = false;
};
v.generator.Context.prototype.jumpToErrorHandler_ = function () {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
v.generator.Context.prototype.next_ = function (a) {
  this.yieldResult = a;
};
v.generator.Context.prototype.throw_ = function (a) {
  this.abruptCompletion_ = {
    exception: a,
    isException: true
  };
  this.jumpToErrorHandler_();
};
v.generator.Context.prototype.return = function (a) {
  this.abruptCompletion_ = {
    return: a
  };
  this.nextAddress = this.finallyAddress_;
};
v.generator.Context.prototype.jumpThroughFinallyBlocks = function (a) {
  this.abruptCompletion_ = {
    jumpTo: a
  };
  this.nextAddress = this.finallyAddress_;
};
v.generator.Context.prototype.yield = function (b, c) {
  this.nextAddress = c;
  return {
    value: b
  };
};
v.generator.Context.prototype.yieldAll = function (e, c) {
  var a = v.makeIterator(e);
  var b = a.next();
  v.generator.ensureIteratorResultIsObject_(b);
  if (b.done) {
    this.yieldResult = b.value;
    this.nextAddress = c;
  } else {
    this.yieldAllIterator_ = a;
    return this.yield(b.value, c);
  }
};
v.generator.Context.prototype.jumpTo = function (a) {
  this.nextAddress = a;
};
v.generator.Context.prototype.jumpToEnd = function () {
  this.nextAddress = 0;
};
v.generator.Context.prototype.setCatchFinallyBlocks = function (b, c) {
  this.catchAddress_ = b;
  if (c != undefined) {
    this.finallyAddress_ = c;
  }
};
v.generator.Context.prototype.setFinallyBlock = function (a) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = a || 0;
};
v.generator.Context.prototype.leaveTryBlock = function (b, c) {
  this.nextAddress = b;
  this.catchAddress_ = c || 0;
};
v.generator.Context.prototype.enterCatchBlock = function (a) {
  this.catchAddress_ = a || 0;
  a = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return a;
};
v.generator.Context.prototype.enterFinallyBlock = function (d, c, a) {
  if (a) {
    this.finallyContexts_[a] = this.abruptCompletion_;
  } else {
    this.finallyContexts_ = [this.abruptCompletion_];
  }
  this.catchAddress_ = d || 0;
  this.finallyAddress_ = c || 0;
};
v.generator.Context.prototype.leaveFinallyBlock = function (d, c) {
  var a = this.finallyContexts_.splice(c || 0)[0];
  if (a = this.abruptCompletion_ = this.abruptCompletion_ || a) {
    if (a.isException) {
      return this.jumpToErrorHandler_();
    }
    if (a.jumpTo != undefined && this.finallyAddress_ < a.jumpTo) {
      this.nextAddress = a.jumpTo;
      this.abruptCompletion_ = null;
    } else {
      this.nextAddress = this.finallyAddress_;
    }
  } else {
    this.nextAddress = d;
  }
};
v.generator.Context.prototype.forIn = function (a) {
  return new v.generator.Context.PropertyIterator(a);
};
v.generator.Context.PropertyIterator = function (b) {
  this.object_ = b;
  this.properties_ = [];
  for (var c in b) {
    this.properties_.push(c);
  }
  this.properties_.reverse();
};
v.generator.Context.PropertyIterator.prototype.getNext = function () {
  for (; this.properties_.length > 0;) {
    var a = this.properties_.pop();
    if (a in this.object_) {
      return a;
    }
  }
  return null;
};
v.generator.Engine_ = function (a) {
  this.context_ = new v.generator.Context();
  this.program_ = a;
};
v.generator.Engine_.prototype.next_ = function (a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
  }
  this.context_.next_(a);
  return this.nextStep_();
};
v.generator.Engine_.prototype.return_ = function (b) {
  this.context_.start_();
  var c = this.context_.yieldAllIterator_;
  if (c) {
    return this.yieldAllStep_("return" in c ? c.return : function (b) {
      return {
        value: b,
        done: true
      };
    }, b, this.context_.return);
  }
  this.context_.return(b);
  return this.nextStep_();
};
v.generator.Engine_.prototype.throw_ = function (a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.throw, a, this.context_.next_);
  }
  this.context_.throw_(a);
  return this.nextStep_();
};
v.generator.Engine_.prototype.yieldAllStep_ = function (f, c, a) {
  try {
    var b = f.call(this.context_.yieldAllIterator_, c);
    v.generator.ensureIteratorResultIsObject_(b);
    if (!b.done) {
      this.context_.stop_();
      return b;
    }
    var d = b.value;
  } catch (b) {
    this.context_.yieldAllIterator_ = null;
    this.context_.throw_(b);
    return this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  a.call(this.context_, d);
  return this.nextStep_();
};
v.generator.Engine_.prototype.nextStep_ = function () {
  for (; this.context_.nextAddress;) {
    try {
      var a = this.program_(this.context_);
      if (a) {
        this.context_.stop_();
        return {
          value: a.value,
          done: false
        };
      }
    } catch (b) {
      this.context_.yieldResult = undefined;
      this.context_.throw_(b);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    a = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (a.isException) {
      throw a.exception;
    }
    return {
      value: a.return,
      done: true
    };
  }
  return {
    value: undefined,
    done: true
  };
};
v.generator.Generator_ = function (b) {
  this.next = function (c) {
    return b.next_(c);
  };
  this.throw = function (c) {
    return b.throw_(c);
  };
  this.return = function (c) {
    return b.return_(c);
  };
  this[Symbol.iterator] = function () {
    return this;
  };
};
v.generator.createGenerator = function (d, c) {
  var a = new v.generator.Generator_(new v.generator.Engine_(c));
  if (v.setPrototypeOf && d.prototype) {
    v.setPrototypeOf(a, d.prototype);
  }
  return a;
};
v.asyncExecutePromiseGenerator = function (g) {
  function d(b) {
    return g.next(b);
  }
  function a(b) {
    return g.throw(b);
  }
  return new Promise(function (b, h) {
    function e(f) {
      if (f.done) {
        b(f.value);
      } else {
        Promise.resolve(f.value).then(d, a).then(e, h);
      }
    }
    e(g.next());
  });
};
v.asyncExecutePromiseGeneratorFunction = function (a) {
  return v.asyncExecutePromiseGenerator(a());
};
v.asyncExecutePromiseGeneratorProgram = function (a) {
  return v.asyncExecutePromiseGenerator(new v.generator.Generator_(new v.generator.Engine_(a)));
};
window.onload = function () {
  function h(c) {
    var a = document.getElementById("snackbar");
    a.addEventListener("click", function () {
      a.className = a.className.replace("show", "");
    });
    a.innerHTML = c;
    a.className = "show";
    setTimeout(function () {
      a.className = a.className.replace("show", "");
    }, 3000);
  }
  function i(a, b, f) {
    if (b.length === 0 && a != undefined) {
      return a;
    }
    if (a == undefined) {
      return f;
    }
    var g = b[0];
    if (g == undefined) {
      return f;
    }
    b = b.slice(1);
    return i(a[g], b, f++);
  }
  function j(b, a) {
    a = a === undefined ? [] : a;
    var f = [];
    var g;
    for (g in b) {
      if (typeof b[g] === "object") {
        f = f.concat(j(b[g], [].concat(v.arrayFromIterable(a), [g])));
      } else {
        f.push([].concat(v.arrayFromIterable(a), [g]));
      }
    }
    return f;
  }
  function a(b) {
    return Object.prototype.toString.call(b).slice(8, -1);
  }
  var c;
  var b;
  var d;
  return v.asyncExecutePromiseGeneratorProgram(function (e) {
    b = JSON.parse(localStorage.getItem("Session_ID"));
    c = new WebSocket(b.Websocket);
    c.onopen = function () {
      c.send(JSON.stringify({
        type: "getFastConfig"
      }));
      setInterval(function () {
        c.send(JSON.stringify({
          type: "ping",
          Session_ID: b.Session_ID,
          TimeStamp: b.TimeStamp
        }));
      }, 10000);
    };
    c.onmessage = function (b) {
      b = JSON.parse(b.data);
      if (b.Type == "Noti") {
        if (b.Action.includes("RestartRequired")) {
          h("Successful changes, a restart is required for the changes to take effect.");
        } else {
          h("Successful change !");
        }
      }
      if (b.Status == "Success") {
        d = b.Data;
        for (var e = [], f = [], g = [], l = [], m = JSON.parse(localStorage.getItem("Language")), q = v.makeIterator(Object.keys(d)), w = q.next(); !w.done; w = q.next()) {
          w = w.value;
          if (a(d[w]) == "Object") {
            e.push(w);
          } else if (a(d[w]) == "Boolean") {
            f.push({
              Status: d[w],
              Name: w
            });
          } else if (a(d[w]) == "Number") {
            g.push({
              Name: w,
              Data: d[w]
            });
          } else if (a(d[w]) == "String") {
            l.push({
              Data: d[w],
              Name: w
            });
          }
        }
        e = v.makeIterator(e);
        for (w = e.next(); !w.done; w = e.next()) {
          w = w.value;
          q = j(d[w]);
          var x = w;
          var y = v.makeIterator(q);
          for (w = y.next(); !w.done; w = y.next()) {
            w = w.value;
            var z = i(d[x], w, 0);
            var A = a(z);
            if (A == "Boolean") {
              f.push({
                Status: z,
                Name: w[0],
                Path: q,
                Main_Path: x
              });
            } else if (A == "String") {
              l.push({
                Data: z,
                Name: w[0],
                Path: q,
                Main_Path: x
              });
            }
          }
        }
        e = document.getElementsByClassName("boxes")[0];
        var E = document.querySelector(".popup");
        document.querySelector(".popup-back").addEventListener("click", function () {
          E.classList.remove("active");
        });
        q = {};
        f = v.makeIterator(f);
        for (w = f.next(); !w.done; q = {
          $jscomp$loop$prop$i$11$17: q.$jscomp$loop$prop$i$11$17
        }, w = f.next()) {
          q.$jscomp$loop$prop$i$11$17 = w.value;
          w = document.createElement("div");
          w.className = "box";
          x = document.createElement("h3");
          x.textContent = q.$jscomp$loop$prop$i$11$17.Name;
          x.onclick = function (b) {
            return function () {
              document.getElementById("Setting_Name").innerHTML = " <p>Name Setting: " + b.$jscomp$loop$prop$i$11$17.Name + "</p><p>Description: " + (m[b.$jscomp$loop$prop$i$11$17.Name] != undefined ? m[b.$jscomp$loop$prop$i$11$17.Name] : "Nothing To Show") + " </p>";
              E.classList.add("active");
            };
          }(q);
          w.appendChild(x);
          x = document.createElement("input");
          x.type = "checkbox";
          x.id = q.$jscomp$loop$prop$i$11$17.Name;
          x.className = "checkbox";
          if (q.$jscomp$loop$prop$i$11$17.Status == 1) {
            x.checked = true;
          } else {
            "";
          }
          x.addEventListener("change", function (d) {
            return function () {
              var a = document.getElementById(d.$jscomp$loop$prop$i$11$17.Name);
              c.send(JSON.stringify({
                type: "FastConfig_Change",
                Data: {
                  Name: d.$jscomp$loop$prop$i$11$17.Name,
                  Value: a.checked,
                  Path: d.$jscomp$loop$prop$i$11$17.Path,
                  Main_Path: d.$jscomp$loop$prop$i$11$17.Main_Path
                }
              }));
            };
          }(q));
          w.appendChild(x);
          x = document.createElement("label");
          x.htmlFor = q.$jscomp$loop$prop$i$11$17.Name;
          x.className = "toggle";
          w.appendChild(x);
          x = document.createElement("div");
          x.className = "box-wrapper";
          x.innerHTML = "<p>" + (m[q.$jscomp$loop$prop$i$11$17.Name] != undefined ? m[q.$jscomp$loop$prop$i$11$17.Name] : "Nothing To Show") + "</p>";
          w.appendChild(x);
          e.appendChild(w);
        }
        f = document.getElementsByClassName("box_string")[0];
        e = {};
        l = v.makeIterator(l);
        for (w = l.next(); !w.done; e = {
          $jscomp$loop$prop$i$12$19: e.$jscomp$loop$prop$i$12$19
        }, w = l.next()) {
          e.$jscomp$loop$prop$i$12$19 = w.value;
          w = document.createElement("div");
          w.className = "box";
          q = document.createElement("h3");
          q.innerHTML = e.$jscomp$loop$prop$i$12$19.Name;
          w.appendChild(q);
          q = document.createElement("p");
          q.textContent = m[e.$jscomp$loop$prop$i$12$19.Name];
          w.appendChild(q);
          q = document.createElement("input");
          q.readOnly = true;
          q.className = "default";
          q.value = "Example: " + (m.Example[e.$jscomp$loop$prop$i$12$19.Name] != undefined ? m.Example[e.$jscomp$loop$prop$i$12$19.Name] : "Nothing to show");
          w.appendChild(q);
          q = document.createElement("input");
          q.readOnly = true;
          q.className = "default";
          q.value = "Your Config: " + e.$jscomp$loop$prop$i$12$19.Data;
          w.appendChild(q);
          q = document.createElement("form");
          q.className = "modal";
          x = document.createElement("input");
          x.type = "text";
          x.name = e.$jscomp$loop$prop$i$12$19.Name;
          x.placeholder = "Enter data";
          q.appendChild(x);
          x = document.createElement("button");
          x.type = "submit";
          x.innerHTML = "Save";
          x.addEventListener("click", function (d) {
            return function (a) {
              a.preventDefault();
              a = document.getElementsByName(d.$jscomp$loop$prop$i$12$19.Name)[0];
              c.send(JSON.stringify({
                type: "FastConfig_Change",
                Data: {
                  Name: d.$jscomp$loop$prop$i$12$19.Name,
                  Value: a.value,
                  Path: d.$jscomp$loop$prop$i$12$19.Path,
                  Main_Path: d.$jscomp$loop$prop$i$12$19.Main_Path
                }
              }));
              d.$jscomp$loop$prop$i$12$19.input = "";
            };
          }(e));
          q.appendChild(x);
          w.appendChild(q);
          f.appendChild(w);
        }
        l = document.getElementsByClassName("box_number")[0];
        f = {};
        g = v.makeIterator(g);
        for (w = g.next(); !w.done; f = {
          $jscomp$loop$prop$i$14$21: f.$jscomp$loop$prop$i$14$21
        }, w = g.next()) {
          f.$jscomp$loop$prop$i$14$21 = w.value;
          w = document.createElement("div");
          w.className = "box";
          e = document.createElement("h3");
          e.innerHTML = f.$jscomp$loop$prop$i$14$21.Name;
          w.appendChild(e);
          e = document.createElement("p");
          e.textContent = m[f.$jscomp$loop$prop$i$14$21.Name];
          w.appendChild(e);
          e = document.createElement("input");
          e.readOnly = true;
          e.className = "default";
          e.value = "Example: " + (m.Example[f.$jscomp$loop$prop$i$14$21.Name] != undefined ? m.Example[f.$jscomp$loop$prop$i$14$21.Name] : "Nothing to show");
          w.appendChild(e);
          e = document.createElement("input");
          e.readOnly = true;
          e.className = "default";
          e.value = "Your Config: " + f.$jscomp$loop$prop$i$14$21.Data;
          w.appendChild(e);
          e = document.createElement("form");
          e.className = "modal";
          q = document.createElement("input");
          q.type = "number";
          q.placeholder = "Enter a number";
          q.name = f.$jscomp$loop$prop$i$14$21.Name;
          e.appendChild(q);
          q = document.createElement("button");
          q.type = "submit";
          q.textContent = "Save";
          q.addEventListener("click", function (d) {
            return function (a) {
              a.preventDefault();
              a = document.getElementsByName(d.$jscomp$loop$prop$i$14$21.Name)[0];
              c.send(JSON.stringify({
                type: "FastConfig_Change",
                Data: {
                  Name: d.$jscomp$loop$prop$i$14$21.Name,
                  Value: parseInt(a.value),
                  Path: d.$jscomp$loop$prop$i$14$21.Path,
                  Main_Path: d.$jscomp$loop$prop$i$14$21.Main_Path
                }
              }));
              d.$jscomp$loop$prop$i$14$21.input = "";
            };
          }(f));
          e.appendChild(q);
          w.appendChild(e);
          l.appendChild(w);
        }
      }
      if (b.Status == 0 && b.Code == 6) {
        alert("Đã hết quyền truy cập hoặc chưa đăng nhập !");
        window.location.href = "../check.html";
      }
    };
    c.onclose = function () {
      alert("Mất kết nối tới máy chủ!");
      window.location.href = "../check.html";
    };
    e.jumpToEnd();
  });
};
