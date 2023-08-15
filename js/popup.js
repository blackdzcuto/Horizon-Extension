var h = h || {};
h.scope = {};
h.ASSUME_ES5 = false;
h.ASSUME_NO_NATIVE_MAP = false;
h.ASSUME_NO_NATIVE_SET = false;
h.SIMPLE_FROUND_POLYFILL = false;
h.ISOLATE_POLYFILLS = false;
h.FORCE_POLYFILL_PROMISE = false;
h.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = false;
h.defineProperty = h.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function (d, a, b) {
  if (d == Array.prototype || d == Object.prototype) {
    return d;
  }
  d[a] = b.value;
  return d;
};
h.getGlobal = function (d) {
  d = [typeof globalThis == "object" && globalThis, d, typeof window == "object" && window, typeof self == "object" && self, typeof global == "object" && global];
  for (var e = 0; e < d.length; ++e) {
    var f = d[e];
    if (f && f.Math == Math) {
      return f;
    }
  }
  throw Error("Cannot find global object");
};
h.global = h.getGlobal(this);
h.IS_SYMBOL_NATIVE = typeof Symbol === "function" && typeof Symbol("x") === "symbol";
h.TRUST_ES6_POLYFILLS = !h.ISOLATE_POLYFILLS || h.IS_SYMBOL_NATIVE;
h.polyfills = {};
h.propertyToPolyfillSymbol = {};
h.POLYFILL_PREFIX = "$jscp$";
var i = function (d, a, b) {
  if (!b || d != null) {
    b = h.propertyToPolyfillSymbol[a];
    if (b == null) {
      return d[a];
    }
    b = d[b];
    if (b !== undefined) {
      return b;
    } else {
      return d[a];
    }
  }
};
h.polyfill = function (e, a, b, c) {
  if (a) {
    if (h.ISOLATE_POLYFILLS) {
      h.polyfillIsolated(e, a, b, c);
    } else {
      h.polyfillUnisolated(e, a, b, c);
    }
  }
};
h.polyfillUnisolated = function (f, g, i, j) {
  i = h.global;
  f = f.split(".");
  for (j = 0; j < f.length - 1; j++) {
    var k = f[j];
    if (!(k in i)) {
      return;
    }
    i = i[k];
  }
  f = f[f.length - 1];
  j = i[f];
  g = g(j);
  if (g != j && g != null) {
    h.defineProperty(i, f, {
      configurable: true,
      writable: true,
      value: g
    });
  }
};
h.polyfillIsolated = function (i, j, k, l) {
  var m = i.split(".");
  i = m.length === 1;
  l = m[0];
  l = !i && l in h.polyfills ? h.polyfills : h.global;
  for (var n = 0; n < m.length - 1; n++) {
    var o = m[n];
    if (!(o in l)) {
      return;
    }
    l = l[o];
  }
  m = m[m.length - 1];
  k = h.IS_SYMBOL_NATIVE && k === "es6" ? l[m] : null;
  j = j(k);
  if (j != null) {
    if (i) {
      h.defineProperty(h.polyfills, m, {
        configurable: true,
        writable: true,
        value: j
      });
    } else if (j !== k) {
      if (h.propertyToPolyfillSymbol[m] === undefined) {
        k = Math.random() * 1000000000 >>> 0;
        h.propertyToPolyfillSymbol[m] = h.IS_SYMBOL_NATIVE ? h.global.Symbol(m) : h.POLYFILL_PREFIX + k + "$" + m;
      }
      h.defineProperty(l, h.propertyToPolyfillSymbol[m], {
        configurable: true,
        writable: true,
        value: j
      });
    }
  }
};
h.underscoreProtoCanBeSet = function () {
  var c = {
    a: true
  };
  var a = {};
  try {
    a.__proto__ = c;
    return a.a;
  } catch (a) {}
  return false;
};
h.setPrototypeOf = h.TRUST_ES6_POLYFILLS && typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf : h.underscoreProtoCanBeSet() ? function (c, a) {
  c.__proto__ = a;
  if (c.__proto__ !== a) {
    throw new TypeError(c + " is not extensible");
  }
  return c;
} : null;
h.arrayIteratorImpl = function (c) {
  var a = 0;
  return function () {
    if (a < c.length) {
      return {
        done: false,
        value: c[a++]
      };
    } else {
      return {
        done: true
      };
    }
  };
};
h.arrayIterator = function (b) {
  return {
    next: h.arrayIteratorImpl(b)
  };
};
h.makeIterator = function (c) {
  var a = typeof Symbol != "undefined" && Symbol.iterator && c[Symbol.iterator];
  if (a) {
    return a.call(c);
  }
  if (typeof c.length == "number") {
    return h.arrayIterator(c);
  }
  throw Error(String(c) + " is not an iterable or ArrayLike");
};
h.generator = {};
h.generator.ensureIteratorResultIsObject_ = function (b) {
  if (!(b instanceof Object)) {
    throw new TypeError("Iterator result " + b + " is not an object");
  }
};
h.generator.Context = function () {
  this.isRunning_ = false;
  this.yieldAllIterator_ = null;
  this.yieldResult = undefined;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
h.generator.Context.prototype.start_ = function () {
  if (this.isRunning_) {
    throw new TypeError("Generator is already running");
  }
  this.isRunning_ = true;
};
h.generator.Context.prototype.stop_ = function () {
  this.isRunning_ = false;
};
h.generator.Context.prototype.jumpToErrorHandler_ = function () {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
h.generator.Context.prototype.next_ = function (b) {
  this.yieldResult = b;
};
h.generator.Context.prototype.throw_ = function (b) {
  this.abruptCompletion_ = {
    exception: b,
    isException: true
  };
  this.jumpToErrorHandler_();
};
h.generator.Context.prototype.return = function (b) {
  this.abruptCompletion_ = {
    return: b
  };
  this.nextAddress = this.finallyAddress_;
};
h.generator.Context.prototype.jumpThroughFinallyBlocks = function (b) {
  this.abruptCompletion_ = {
    jumpTo: b
  };
  this.nextAddress = this.finallyAddress_;
};
h.generator.Context.prototype.yield = function (c, a) {
  this.nextAddress = a;
  return {
    value: c
  };
};
h.generator.Context.prototype.yieldAll = function (e, a) {
  var b = h.makeIterator(e);
  var c = b.next();
  h.generator.ensureIteratorResultIsObject_(c);
  if (c.done) {
    this.yieldResult = c.value;
    this.nextAddress = a;
  } else {
    this.yieldAllIterator_ = b;
    return this.yield(c.value, a);
  }
};
h.generator.Context.prototype.jumpTo = function (b) {
  this.nextAddress = b;
};
h.generator.Context.prototype.jumpToEnd = function () {
  this.nextAddress = 0;
};
h.generator.Context.prototype.setCatchFinallyBlocks = function (c, a) {
  this.catchAddress_ = c;
  if (a != undefined) {
    this.finallyAddress_ = a;
  }
};
h.generator.Context.prototype.setFinallyBlock = function (b) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = b || 0;
};
h.generator.Context.prototype.leaveTryBlock = function (c, a) {
  this.nextAddress = c;
  this.catchAddress_ = a || 0;
};
h.generator.Context.prototype.enterCatchBlock = function (b) {
  this.catchAddress_ = b || 0;
  b = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return b;
};
h.generator.Context.prototype.enterFinallyBlock = function (d, a, b) {
  if (b) {
    this.finallyContexts_[b] = this.abruptCompletion_;
  } else {
    this.finallyContexts_ = [this.abruptCompletion_];
  }
  this.catchAddress_ = d || 0;
  this.finallyAddress_ = a || 0;
};
h.generator.Context.prototype.leaveFinallyBlock = function (d, a) {
  var b = this.finallyContexts_.splice(a || 0)[0];
  if (b = this.abruptCompletion_ = this.abruptCompletion_ || b) {
    if (b.isException) {
      return this.jumpToErrorHandler_();
    }
    if (b.jumpTo != undefined && this.finallyAddress_ < b.jumpTo) {
      this.nextAddress = b.jumpTo;
      this.abruptCompletion_ = null;
    } else {
      this.nextAddress = this.finallyAddress_;
    }
  } else {
    this.nextAddress = d;
  }
};
h.generator.Context.prototype.forIn = function (b) {
  return new h.generator.Context.PropertyIterator(b);
};
h.generator.Context.PropertyIterator = function (c) {
  this.object_ = c;
  this.properties_ = [];
  for (var a in c) {
    this.properties_.push(a);
  }
  this.properties_.reverse();
};
h.generator.Context.PropertyIterator.prototype.getNext = function () {
  for (; this.properties_.length > 0;) {
    var b = this.properties_.pop();
    if (b in this.object_) {
      return b;
    }
  }
  return null;
};
h.generator.Engine_ = function (b) {
  this.context_ = new h.generator.Context();
  this.program_ = b;
};
h.generator.Engine_.prototype.next_ = function (b) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, b, this.context_.next_);
  }
  this.context_.next_(b);
  return this.nextStep_();
};
h.generator.Engine_.prototype.return_ = function (c) {
  this.context_.start_();
  var a = this.context_.yieldAllIterator_;
  if (a) {
    return this.yieldAllStep_("return" in a ? a.return : function (a) {
      return {
        value: a,
        done: true
      };
    }, c, this.context_.return);
  }
  this.context_.return(c);
  return this.nextStep_();
};
h.generator.Engine_.prototype.throw_ = function (b) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.throw, b, this.context_.next_);
  }
  this.context_.throw_(b);
  return this.nextStep_();
};
h.generator.Engine_.prototype.yieldAllStep_ = function (f, a, b) {
  try {
    var c = f.call(this.context_.yieldAllIterator_, a);
    h.generator.ensureIteratorResultIsObject_(c);
    if (!c.done) {
      this.context_.stop_();
      return c;
    }
    var d = c.value;
  } catch (a) {
    this.context_.yieldAllIterator_ = null;
    this.context_.throw_(a);
    return this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  b.call(this.context_, d);
  return this.nextStep_();
};
h.generator.Engine_.prototype.nextStep_ = function () {
  for (; this.context_.nextAddress;) {
    try {
      var b = this.program_(this.context_);
      if (b) {
        this.context_.stop_();
        return {
          value: b.value,
          done: false
        };
      }
    } catch (a) {
      this.context_.yieldResult = undefined;
      this.context_.throw_(a);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    b = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (b.isException) {
      throw b.exception;
    }
    return {
      value: b.return,
      done: true
    };
  }
  return {
    value: undefined,
    done: true
  };
};
h.generator.Generator_ = function (c) {
  this.next = function (a) {
    return c.next_(a);
  };
  this.throw = function (a) {
    return c.throw_(a);
  };
  this.return = function (a) {
    return c.return_(a);
  };
  this[Symbol.iterator] = function () {
    return this;
  };
};
h.generator.createGenerator = function (d, a) {
  var b = new h.generator.Generator_(new h.generator.Engine_(a));
  if (h.setPrototypeOf && d.prototype) {
    h.setPrototypeOf(b, d.prototype);
  }
  return b;
};
h.asyncExecutePromiseGenerator = function (g) {
  function a(a) {
    return g.next(a);
  }
  function b(a) {
    return g.throw(a);
  }
  return new Promise(function (c, d) {
    function e(f) {
      if (f.done) {
        c(f.value);
      } else {
        Promise.resolve(f.value).then(a, b).then(e, d);
      }
    }
    e(g.next());
  });
};
h.asyncExecutePromiseGeneratorFunction = function (b) {
  return h.asyncExecutePromiseGenerator(b());
};
h.asyncExecutePromiseGeneratorProgram = function (b) {
  return h.asyncExecutePromiseGenerator(new h.generator.Generator_(new h.generator.Engine_(b)));
};
window.onload = function () {
  function e(a) {
    var b = document.getElementById("snackbar");
    b.addEventListener("click", function () {
      b.className = b.className.replace("show", "");
    });
    b.innerHTML = a;
    b.className = "show";
    setTimeout(function () {
      b.className = b.className.replace("show", "");
    }, 3000);
  }
  var a = null;
  document.getElementById("submit").onclick = function () {
    var b = document.getElementById("username").value;
    var c = document.getElementById("password").value;
    var d = document.getElementById("address").value;
    if (b && c && d) {
      try {
        a = new WebSocket(d);
      } catch (a) {
        e("Invalid websocket address!");
      }
      a.onerror = function (a) {
        e("Connection error to the websocket server.");
      };
      a.onmessage = function (i) {
        var j;
        var l;
        return h.asyncExecutePromiseGeneratorProgram(function (f) {
          if (f.nextAddress == 1) {
            i = JSON.parse(i.data);
            if (i.Status == "Username&PassWord") {
              e("Sending information to the server!");
              return f.return(a.send(JSON.stringify({
                type: "login",
                username: b,
                password: c
              })));
            }
            if (i.Status != "Success") {
              return f.jumpTo(2);
            }
            j = i.Session_ID;
            l = i.TimeStamp;
            e("Login successful, redirecting in 3 seconds!");
            return f.yield(new Promise(function (a) {
              return setTimeout(a, 3000);
            }), 3);
          }
          if (f.nextAddress != 2) {
            localStorage.setItem("Session_ID", JSON.stringify({
              Session_ID: j,
              TimeStamp: l,
              Websocket: d
            }));
            window.open("../check.html");
          }
          if (i.Status == 0) {
            e("Incorrect password or account with code: " + i.Code);
          }
          f.jumpToEnd();
        });
      };
    } else {
      e("You need to enter the complete login information.");
    }
  };
};
