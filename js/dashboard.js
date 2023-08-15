var e = e || {};
e.scope = {};
e.createTemplateTagFirstArg = function (a) {
  return a.raw = a;
};
e.createTemplateTagFirstArgWithRaw = function (b, c) {
  b.raw = c;
  return b;
};
e.ASSUME_ES5 = false;
e.ASSUME_NO_NATIVE_MAP = false;
e.ASSUME_NO_NATIVE_SET = false;
e.SIMPLE_FROUND_POLYFILL = false;
e.ISOLATE_POLYFILLS = false;
e.FORCE_POLYFILL_PROMISE = false;
e.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = false;
e.defineProperty = e.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function (c, d, a) {
  if (c == Array.prototype || c == Object.prototype) {
    return c;
  }
  c[d] = a.value;
  return c;
};
e.getGlobal = function (a) {
  a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof global == "object" && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
e.global = e.getGlobal(this);
e.IS_SYMBOL_NATIVE = typeof Symbol === "function" && typeof Symbol("x") === "symbol";
e.TRUST_ES6_POLYFILLS = !e.ISOLATE_POLYFILLS || e.IS_SYMBOL_NATIVE;
e.polyfills = {};
e.propertyToPolyfillSymbol = {};
e.POLYFILL_PREFIX = "$jscp$";
var a = function (c, d, a) {
  if (!a || c != null) {
    a = e.propertyToPolyfillSymbol[d];
    if (a == null) {
      return c[d];
    }
    a = c[a];
    if (a !== undefined) {
      return a;
    } else {
      return c[d];
    }
  }
};
e.polyfill = function (f, d, a, b) {
  if (d) {
    if (e.ISOLATE_POLYFILLS) {
      e.polyfillIsolated(f, d, a, b);
    } else {
      e.polyfillUnisolated(f, d, a, b);
    }
  }
};
e.polyfillUnisolated = function (a, b, c, f) {
  c = e.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var h = a[f];
    if (!(h in c)) {
      return;
    }
    c = c[h];
  }
  a = a[a.length - 1];
  f = c[a];
  b = b(f);
  if (b != f && b != null) {
    e.defineProperty(c, a, {
      configurable: true,
      writable: true,
      value: b
    });
  }
};
e.polyfillIsolated = function (a, b, c, d) {
  var f = a.split(".");
  a = f.length === 1;
  d = f[0];
  d = !a && d in e.polyfills ? e.polyfills : e.global;
  for (var g = 0; g < f.length - 1; g++) {
    var h = f[g];
    if (!(h in d)) {
      return;
    }
    d = d[h];
  }
  f = f[f.length - 1];
  c = e.IS_SYMBOL_NATIVE && c === "es6" ? d[f] : null;
  b = b(c);
  if (b != null) {
    if (a) {
      e.defineProperty(e.polyfills, f, {
        configurable: true,
        writable: true,
        value: b
      });
    } else if (b !== c) {
      if (e.propertyToPolyfillSymbol[f] === undefined) {
        c = Math.random() * 1000000000 >>> 0;
        e.propertyToPolyfillSymbol[f] = e.IS_SYMBOL_NATIVE ? e.global.Symbol(f) : e.POLYFILL_PREFIX + c + "$" + f;
      }
      e.defineProperty(d, e.propertyToPolyfillSymbol[f], {
        configurable: true,
        writable: true,
        value: b
      });
    }
  }
};
e.underscoreProtoCanBeSet = function () {
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
e.setPrototypeOf = e.TRUST_ES6_POLYFILLS && typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf : e.underscoreProtoCanBeSet() ? function (b, c) {
  b.__proto__ = c;
  if (b.__proto__ !== c) {
    throw new TypeError(b + " is not extensible");
  }
  return b;
} : null;
e.arrayIteratorImpl = function (b) {
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
e.arrayIterator = function (a) {
  return {
    next: e.arrayIteratorImpl(a)
  };
};
e.makeIterator = function (b) {
  var c = typeof Symbol != "undefined" && Symbol.iterator && b[Symbol.iterator];
  if (c) {
    return c.call(b);
  }
  if (typeof b.length == "number") {
    return e.arrayIterator(b);
  }
  throw Error(String(b) + " is not an iterable or ArrayLike");
};
e.generator = {};
e.generator.ensureIteratorResultIsObject_ = function (a) {
  if (!(a instanceof Object)) {
    throw new TypeError("Iterator result " + a + " is not an object");
  }
};
e.generator.Context = function () {
  this.isRunning_ = false;
  this.yieldAllIterator_ = null;
  this.yieldResult = undefined;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
e.generator.Context.prototype.start_ = function () {
  if (this.isRunning_) {
    throw new TypeError("Generator is already running");
  }
  this.isRunning_ = true;
};
e.generator.Context.prototype.stop_ = function () {
  this.isRunning_ = false;
};
e.generator.Context.prototype.jumpToErrorHandler_ = function () {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
e.generator.Context.prototype.next_ = function (a) {
  this.yieldResult = a;
};
e.generator.Context.prototype.throw_ = function (a) {
  this.abruptCompletion_ = {
    exception: a,
    isException: true
  };
  this.jumpToErrorHandler_();
};
e.generator.Context.prototype.return = function (a) {
  this.abruptCompletion_ = {
    return: a
  };
  this.nextAddress = this.finallyAddress_;
};
e.generator.Context.prototype.jumpThroughFinallyBlocks = function (a) {
  this.abruptCompletion_ = {
    jumpTo: a
  };
  this.nextAddress = this.finallyAddress_;
};
e.generator.Context.prototype.yield = function (b, c) {
  this.nextAddress = c;
  return {
    value: b
  };
};
e.generator.Context.prototype.yieldAll = function (f, d) {
  var a = e.makeIterator(f);
  var b = a.next();
  e.generator.ensureIteratorResultIsObject_(b);
  if (b.done) {
    this.yieldResult = b.value;
    this.nextAddress = d;
  } else {
    this.yieldAllIterator_ = a;
    return this.yield(b.value, d);
  }
};
e.generator.Context.prototype.jumpTo = function (a) {
  this.nextAddress = a;
};
e.generator.Context.prototype.jumpToEnd = function () {
  this.nextAddress = 0;
};
e.generator.Context.prototype.setCatchFinallyBlocks = function (b, c) {
  this.catchAddress_ = b;
  if (c != undefined) {
    this.finallyAddress_ = c;
  }
};
e.generator.Context.prototype.setFinallyBlock = function (a) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = a || 0;
};
e.generator.Context.prototype.leaveTryBlock = function (b, c) {
  this.nextAddress = b;
  this.catchAddress_ = c || 0;
};
e.generator.Context.prototype.enterCatchBlock = function (a) {
  this.catchAddress_ = a || 0;
  a = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return a;
};
e.generator.Context.prototype.enterFinallyBlock = function (c, d, a) {
  if (a) {
    this.finallyContexts_[a] = this.abruptCompletion_;
  } else {
    this.finallyContexts_ = [this.abruptCompletion_];
  }
  this.catchAddress_ = c || 0;
  this.finallyAddress_ = d || 0;
};
e.generator.Context.prototype.leaveFinallyBlock = function (c, d) {
  var a = this.finallyContexts_.splice(d || 0)[0];
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
    this.nextAddress = c;
  }
};
e.generator.Context.prototype.forIn = function (a) {
  return new e.generator.Context.PropertyIterator(a);
};
e.generator.Context.PropertyIterator = function (b) {
  this.object_ = b;
  this.properties_ = [];
  for (var c in b) {
    this.properties_.push(c);
  }
  this.properties_.reverse();
};
e.generator.Context.PropertyIterator.prototype.getNext = function () {
  for (; this.properties_.length > 0;) {
    var a = this.properties_.pop();
    if (a in this.object_) {
      return a;
    }
  }
  return null;
};
e.generator.Engine_ = function (a) {
  this.context_ = new e.generator.Context();
  this.program_ = a;
};
e.generator.Engine_.prototype.next_ = function (a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
  }
  this.context_.next_(a);
  return this.nextStep_();
};
e.generator.Engine_.prototype.return_ = function (b) {
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
e.generator.Engine_.prototype.throw_ = function (a) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.throw, a, this.context_.next_);
  }
  this.context_.throw_(a);
  return this.nextStep_();
};
e.generator.Engine_.prototype.yieldAllStep_ = function (f, d, a) {
  try {
    var b = f.call(this.context_.yieldAllIterator_, d);
    e.generator.ensureIteratorResultIsObject_(b);
    if (!b.done) {
      this.context_.stop_();
      return b;
    }
    var c = b.value;
  } catch (b) {
    this.context_.yieldAllIterator_ = null;
    this.context_.throw_(b);
    return this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  a.call(this.context_, c);
  return this.nextStep_();
};
e.generator.Engine_.prototype.nextStep_ = function () {
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
e.generator.Generator_ = function (b) {
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
e.generator.createGenerator = function (c, d) {
  var a = new e.generator.Generator_(new e.generator.Engine_(d));
  if (e.setPrototypeOf && c.prototype) {
    e.setPrototypeOf(a, c.prototype);
  }
  return a;
};
e.asyncExecutePromiseGenerator = function (d) {
  function c(b) {
    return d.next(b);
  }
  function a(b) {
    return d.throw(b);
  }
  return new Promise(function (b, g) {
    function e(f) {
      if (f.done) {
        b(f.value);
      } else {
        Promise.resolve(f.value).then(c, a).then(e, g);
      }
    }
    e(d.next());
  });
};
e.asyncExecutePromiseGeneratorFunction = function (a) {
  return e.asyncExecutePromiseGenerator(a());
};
e.asyncExecutePromiseGeneratorProgram = function (a) {
  return e.asyncExecutePromiseGenerator(new e.generator.Generator_(new e.generator.Engine_(a)));
};
window.onload = function () {
  function f() {
    var b = document.getElementById("console");
    (b.contentDocument || b.contentWindow.document).documentElement.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }
  function c() {
    var a = JSON.parse(localStorage.getItem("Session_ID"));
    i = new WebSocket(a.Websocket);
    i.onopen = function () {
      i.send(JSON.stringify({
        type: "check",
        Session_ID: a.Session_ID,
        TimeStamp: a.TimeStamp
      }));
      i.send(JSON.stringify({
        type: "All_logs"
      }));
      setInterval(function () {
        i.send(JSON.stringify({
          type: "ping",
          Session_ID: a.Session_ID,
          TimeStamp: a.TimeStamp
        }));
      }, 10000);
    };
    i.onmessage = function (c) {
      c = JSON.parse(c.data);
      var d = document.getElementById("console");
      if (c.Status == "Success") {
        d.contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">Connecting to server success</span><br>";
      }
      if (c.Type == "Console") {
        d.contentDocument.body.innerHTML += c.Data + "<br>";
        h++;
        if (h > 95) {
          d.contentDocument.body.innerHTML = "";
          i.send(JSON.stringify({
            type: "All_logs"
          }));
        }
      }
      if (c.Type == "ChangeAppState") {
        if (c.Data == 0) {
          alert("Change your appstate success");
        } else {
          d.contentDocument.body.innerHTML += c.Data + "<br>";
          alert("Change your appstate failed");
        }
        location.reload(true);
      }
      if (c.Status == 0 && [5, 4, 3].some(function (a) {
        return c.Code == a;
      })) {
        window.location.href = "check.html";
      }
      f();
    };
    i.onclose = function () {
      setTimeout(function () {
        console.log("Connecting...");
        c();
      }, 5000);
    };
  }
  var g = 0;
  var h = 0;
  var i;
  c();
  document.getElementById("restart").addEventListener("click", function () {
    var c;
    return e.asyncExecutePromiseGeneratorProgram(function (a) {
      if (a.nextAddress == 1) {
        c = document.getElementById("console");
        c.contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">Ready to restarting server after 3sec!</span><br>";
        f();
        return a.yield(new Promise(function (b) {
          return setTimeout(b, 3000);
        }), 2);
      }
      i.send(JSON.stringify({
        type: "Command",
        Data: "process.exit(1)"
      }));
      c.contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">Command Executed !</span><br>";
      f();
      a.jumpToEnd();
    });
  });
  document.getElementById("stop").addEventListener("click", function () {
    var b;
    var h;
    return e.asyncExecutePromiseGeneratorProgram(function (a) {
      if (a.nextAddress == 1) {
        if (g <= 2) {
          b = document.getElementById("console");
          b.contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">Are you sure to stop your server? pres again.</span><br>";
          f();
          setTimeout(function () {
            g = 0;
          }, 10000);
          return a.return(g += 1);
        }
        h = document.getElementById("console");
        h.contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">Ready to Stop server after 3sec!</span><br>";
        f();
        return a.yield(new Promise(function (b) {
          return setTimeout(b, 3000);
        }), 3);
      }
      i.send(JSON.stringify({
        type: "Command",
        Data: "Stop"
      }));
      h.contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">Command Executed!</span><br>";
      f();
      a.jumpToEnd();
    });
  });
  document.getElementById("reconnect").addEventListener("click", function () {
    c();
  });
  document.getElementById("fastconfigfca").addEventListener("click", function () {
    window.location.href = "../FastConfigFca.html";
  });
  document.getElementById("command").addEventListener("submit", function (b) {
    b.preventDefault();
    b = document.getElementsByName("command")[0];
    document.getElementById("console").contentDocument.body.innerHTML += "<span style=\"color: red; display: block; text-align: center;\">From Client To Server: " + b.value + " </span><br>";
    i.send(JSON.stringify({
      type: "Command",
      Data: b.value
    }));
    f();
    b.value = "";
  });
  document.getElementById("changeappstate").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
  });
  document.getElementById("cancel").addEventListener("click", function (b) {
    b.preventDefault();
    popup.style.display = "none";
  });
  document.getElementById("save").addEventListener("click", function (b) {
    b.preventDefault();
    b = document.getElementById("AppState").value;
    popup.style.display = "none";
    if (b) {
      i.send(JSON.stringify({
        type: "ChangeAppState",
        Data: b
      }));
      alert("Success");
    } else {
      return alert("You are missing the 'AppState'.");
    }
  });
  document.getElementById("fromFile").addEventListener("change", function (c) {
    if (c.currentTarget.files[0]) {
      if (c.currentTarget.files[0].type != "application/json") {
        alert("File is not in the correct format.");
      } else {
        var a = new FileReader();
        a.readAsText(c.currentTarget.files[0], "utf-8");
        a.onload = function (b) {
          i.send(JSON.stringify({
            type: "ChangeAppState",
            Data: b.target.result
          }));
        };
      }
    }
  });
};
