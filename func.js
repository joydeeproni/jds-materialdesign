window.heydays = {
    utils: {
      pickSource: function(e, t) {
        for (var n in e)
          if (n > t * window.devicePixelRatio) return e[n];
        return e[Object.keys(e)[Object.keys(e).length - 1]]
      },
      throttle: function(e, t) {
        var n = !1;
        return function() {
          n || (e.call(), n = !0, setTimeout(function() {
            n = !1
          }, t))
        }
      },
      raf: function(e) {
        var t = !1;
        return function() {
          t || (requestAnimationFrame(function() {
            e.call(), t = !1
          }), t = !0)
        }
      },
      loadBodymovin: function(e) {
        if (window.bodymovin) e(window.bodymovin);
        else {
          jQuery.getScript("https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.13.0/bodymovin.min.js", function(t, n, i, r) {
            e(window.bodymovin)
          })
        }
      },
      debounce: function(e, t, n) {
        var i;
        return function r() {
          function o() {
            n || e.apply(a, s), i = null
          }
          var a = this,
            s = arguments;
          i ? clearTimeout(i) : n && e.apply(a, s), i = setTimeout(o, t || 100)
        }
      },
      cookie: {
        set: function(e, t, n) {
          var i = new Date;
          i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
          var r = "expires=" + i.toUTCString();
          document.cookie = e + "=" + t + ";" + r + ";path=/"
        },
        get: function(e) {
          for (var t = e + "=", n = decodeURIComponent(document.cookie), i = n.split(";"), r = 0; r < i.length; r++) {
            for (var o = i[r];
              " " === o.charAt(0);) o = o.substring(1);
            if (0 === o.indexOf(t)) return o.substring(t.length, o.length)
          }
          return ""
        }
      }
    }
  }, window.addEventListener("touchstart", function e() {
    document.body.classList.add("user-is-touching"), window.USER_IS_TOUCHING = !0, window.removeEventListener("touchstart", e, !1)
  }, !1),
  function() {
    $("video").each(function() {
      var e = $(this),
        t = e.data("sources"),
        n = window.heydays.utils.pickSource(t, e.parent().outerWidth());
      if (n) {
        var i = '<source data-size="' + n.size + '" src="' + n.src + '" type="' + n.type + '">';
        e.html(i)
      }
    })
  }(),
  function(e, t, n) {
    "use strict";
    var i, r, o = e.lazySizes && lazySizes.cfg || e.lazySizesConfig,
      a = t.createElement("img"),
      s = "sizes" in a && "srcset" in a,
      u = /\s+\d+h/g,
      l = Array.prototype.forEach,
      c = function(e) {
        var t = e.getAttribute(lazySizesConfig.srcsetAttr);
        t && e.setAttribute(lazySizesConfig.srcsetAttr, t.replace(u, ""))
      };
    if (o || (o = {}, e.lazySizesConfig = o), o.supportsType || (o.supportsType = function(e) {
        return !e
      }), !(e.picturefill || e.respimage || o.pf)) {
      if (e.HTMLPictureElement && s) return t.msElementsFromPoint && (r = navigator.userAgent.match(/Edge\/(\d+)/)) && r[1] < 15 && t.addEventListener("lazybeforeunveil", function(e) {
        var t = e.target.parentNode;
        t && l.call(t.getElementsByTagName("source"), c), c(e.target)
      }), void(o.pf = function() {});
      o.pf = function(t) {
        var n, r;
        if (!e.picturefill && !e.respimage)
          for (n = 0, r = t.elements.length; n < r; n++) i(t.elements[n])
      }, i = function() {
        var n = function(e, t) {
            return e.w - t.w
          },
          r = /^\s*\d+px\s*$/,
          a = function(e) {
            var t, n, i = e.length,
              r = e[i - 1],
              o = 0;
            for (o; o < i; o++)
              if (r = e[o], r.d = r.w / e.w, r.d >= e.d) {
                !r.cached && (t = e[o - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (n = Math.pow(t.d - .6, 1.6), t.cached && (t.d += .15 * n), t.d + (r.d - e.d) * n > e.d && (r = t));
                break
              } return r
          },
          l = function() {
            var e, t = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
              n = /\s/,
              i = function(t, n, i, r) {
                e.push({
                  c: n,
                  u: i,
                  w: 1 * r
                })
              };
            return function(r) {
              return e = [], r = r.trim(), r.replace(u, "").replace(t, i), e.length || !r || n.test(r) || e.push({
                c: r,
                u: r,
                w: 99
              }), e
            }
          }(),
          c = function() {
            c.init || (c.init = !0, addEventListener("resize", function() {
              var e, n = t.getElementsByClassName("lazymatchmedia"),
                r = function() {
                  var e, t;
                  for (e = 0, t = n.length; e < t; e++) i(n[e])
                };
              return function() {
                clearTimeout(e), e = setTimeout(r, 66)
              }
            }()))
          },
          d = function(t, n) {
            var i, r = t.getAttribute("srcset") || t.getAttribute(o.srcsetAttr);
            !r && n && (r = t._lazypolyfill ? t._lazypolyfill._set : t.getAttribute("src") || t.getAttribute(o.srcAttr)), t._lazypolyfill && t._lazypolyfill._set == r || (i = l(r || ""), n && t.parentNode && (i.isPicture = "PICTURE" == t.parentNode.nodeName.toUpperCase(), i.isPicture && (e.matchMedia || e.Modernizr && Modernizr.mq) && (lazySizes.aC(t, "lazymatchmedia"), c())), i._set = r, Object.defineProperty(t, "_lazypolyfill", {
              value: i,
              writable: !0
            }))
          },
          f = function(t) {
            var n = e.devicePixelRatio || 1,
              i = lazySizes.getX && lazySizes.getX(t);
            return Math.min(i || n, 2.5, n)
          },
          p = function(t) {
            return e.matchMedia ? (p = function(e) {
              return !e || (matchMedia(e) || {}).matches
            })(t) : e.Modernizr && Modernizr.mq ? !t || Modernizr.mq(t) : !t
          },
          m = function(e) {
            var t, i, s, u, l, c, m, h;
            if (l = e, d(l, !0), c = l._lazypolyfill, c.isPicture)
              for (i = 0, t = e.parentNode.getElementsByTagName("source"), s = t.length; i < s; i++)
                if (o.supportsType(t[i].getAttribute("type"), e) && p(t[i].getAttribute("media"))) {
                  l = t[i], d(l), c = l._lazypolyfill;
                  break
                } return c.length > 1 ? (h = l.getAttribute("sizes") || "", h = r.test(h) && parseInt(h, 10) || lazySizes.gW(e, e.parentNode), c.d = f(e), (!c.w || c.w < h) && (c.w = h, m = a(c.sort(n)))) : m = c[0], m
          },
          h = function(e) {
            if (!s || !e.parentNode || "PICTURE" == e.parentNode.nodeName.toUpperCase()) {
              var t = m(e);
              t && t.u && e._lazypolyfill.cur != t.u && (e._lazypolyfill.cur = t.u, t.cached = !0, e.setAttribute(o.srcAttr, t.u), e.setAttribute("src", t.u))
            }
          };
        return h.parse = l, h
      }(), o.loadedClass && o.loadingClass && function() {
        var e = [];
        ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(t) {
          e.push(t + o.loadedClass), e.push(t + o.loadingClass)
        }), o.pf({
          elements: t.querySelectorAll(e.join(", "))
        })
      }()
    }
  }(window, document),
  function(e) {
    "use strict";
    var t, n = e.createElement("img");
    !("srcset" in n) || "sizes" in n || window.HTMLPictureElement || (t = /^picture$/i, e.addEventListener("lazybeforeunveil", function(n) {
      var i, r, o, a, s, u, l;
      !n.defaultPrevented && !lazySizesConfig.noIOSFix && (i = n.target) && (o = i.getAttribute(lazySizesConfig.srcsetAttr)) && (r = i.parentNode) && ((s = t.test(r.nodeName || "")) || (a = i.getAttribute("sizes") || i.getAttribute(lazySizesConfig.sizesAttr))) && (u = s ? r : e.createElement("picture"), i._lazyImgSrc || Object.defineProperty(i, "_lazyImgSrc", {
        value: e.createElement("source"),
        writable: !0
      }), l = i._lazyImgSrc, a && l.setAttribute("sizes", a), l.setAttribute(lazySizesConfig.srcsetAttr, o), i.setAttribute("data-pfsrcset", o), i.removeAttribute(lazySizesConfig.srcsetAttr), s || (r.insertBefore(u, i), u.appendChild(i)), u.insertBefore(l, i))
    }))
  }(document),
  function() {
    "use strict";
    if (window.addEventListener) {
      var e, t = /\s+/g,
        n = /\s*\|\s+|\s+\|\s*/g,
        i = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
        r = {
          contain: 1,
          cover: 1
        },
        o = window.requestAnimationFrame || setTimeout,
        a = function(e) {
          var t = e._bgsetReadCache && "width" in e._bgsetReadCache ? e._bgsetReadCache.width : lazySizes.gW(e, e.parentNode);
          return (!e._lazysizesWidth || t > e._lazysizesWidth) && (e._lazysizesWidth = t), e._lazysizesWidth
        },
        s = function(e) {
          var t;
          return e._bgsetReadCache ? t = e._bgsetReadCache.bgSize : (t = (getComputedStyle(e) || {
            getPropertyValue: function() {}
          }).getPropertyValue("background-size"), !r[t] && r[e.style.backgroundSize] && (t = e.style.backgroundSize)), t
        },
        u = function(e, o, a) {
          var u = document.createElement("picture"),
            l = o.getAttribute(lazySizesConfig.sizesAttr),
            c = o.getAttribute("data-ratio"),
            d = o.getAttribute("data-optimumx"),
            f = s(o);
          !r[f] || "auto" != l && l || (a.setAttribute("data-parent-fit", f), l = "auto"), o._lazybgset && o._lazybgset.parentNode == o && o.removeChild(o._lazybgset), Object.defineProperty(a, "_lazybgset", {
            value: o,
            writable: !0
          }), Object.defineProperty(o, "_lazybgset", {
            value: u,
            writable: !0
          }), e = e.replace(t, " ").split(n), u.style.display = "none", a.className = lazySizesConfig.lazyClass, 1 != e.length || l || (l = "auto"), e.forEach(function(e) {
            var t = document.createElement("source");
            l && "auto" != l && t.setAttribute("sizes", l), e.match(i) && (t.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1), RegExp.$2 && t.setAttribute("media", lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2)), u.appendChild(t)
          }), l && (a.setAttribute(lazySizesConfig.sizesAttr, l), o.removeAttribute(lazySizesConfig.sizesAttr), o.removeAttribute("sizes")), d && a.setAttribute("data-optimumx", d), c && a.setAttribute("data-ratio", c), u.appendChild(a), o.appendChild(u)
        },
        l = function(e) {
          if (e.target._lazybgset) {
            var t = e.target,
              n = t._lazybgset,
              i = t.currentSrc || t.src;
            i && (n.style.backgroundImage = "url(" + i + ")"), t._lazybgsetLoading && (lazySizes.fire(n, "_lazyloaded", {}, !1, !0), delete t._lazybgsetLoading)
          }
        };
      window.lazySizesConfig = window.lazySizesConfig || {}, e = window.lazySizesConfig.rC, window.lazySizesConfig.rC = function(t, n) {
        var i;
        return e && (n = e.apply(this, arguments) || n), t.getAttribute("data-bgset") && (i = s(t), (r[i] || t.getAttribute(lazySizesConfig.sizesAttr)) && (n = a(t)), t._bgsetReadCache = {
          bgSize: i,
          width: n
        }), t._bgsetReadCache && t._bgsetReadCache.width || n
      }, addEventListener("lazybeforeunveil", function(e) {
        var t, n, i;
        !e.defaultPrevented && (t = e.target.getAttribute("data-bgset")) && (i = e.target, n = document.createElement("img"), n.alt = "", n._lazybgsetLoading = !0, e.detail.firesLoad = !0, u(t, i, n), n._bgsetReadCache = i._bgsetReadCache, setTimeout(function() {
          lazySizes.loader.unveil(n), o(function() {
            lazySizes.fire(n, "_lazyloaded", {}, !0, !0), n.complete && l({
              target: n
            }), i._bgsetReadCache && delete i._bgsetReadCache, n._bgsetReadCache && delete n._bgsetReadCache
          })
        }))
      }), document.addEventListener("load", l, !0), document.documentElement.addEventListener("lazybeforesizes", function(e) {
        !e.defaultPrevented && e.target._lazybgset && (e.detail.width = a(e.target._lazybgset))
      })
    }
  }(),
  function(e, t) {
    "use strict";

    function n(e, n) {
      if (!r[e]) {
        var i = t.createElement(n ? "link" : "script"),
          o = t.getElementsByTagName("script")[0];
        n ? (i.rel = "stylesheet", i.href = e) : i.src = e, r[e] = !0, r[i.src || i.href] = !0, o.parentNode.insertBefore(i, o)
      }
    }
    var i, r = {};
    t.addEventListener && (i = function(e, n) {
      var i = t.createElement("img");
      i.onload = function() {
        i.onload = null, i.onerror = null, i = null, n()
      }, i.onerror = i.onload, i.src = e, i && i.complete && i.onload && i.onload()
    }, addEventListener("lazybeforeunveil", function(t) {
      var r, o, a, s;
      t.defaultPrevented || ("none" == t.target.preload && (t.target.preload = "auto"), r = t.target.getAttribute("data-link"), r && n(r, !0), r = t.target.getAttribute("data-script"), r && n(r), r = t.target.getAttribute("data-require"), r && e.require && require([r]), a = t.target.getAttribute("data-bg"), a && (t.detail.firesLoad = !0, o = function() {
        t.target.style.backgroundImage = "url(" + a + ")", t.detail.firesLoad = !1, lazySizes.fire(t.target, "_lazyloaded", {}, !0, !0)
      }, i(a, o)), (s = t.target.getAttribute("data-poster")) && (t.detail.firesLoad = !0, o = function() {
        t.target.poster = s, t.detail.firesLoad = !1, lazySizes.fire(t.target, "_lazyloaded", {}, !0, !0)
      }, i(s, o)))
    }, !1))
  }(window, document),
  function(e, t) {
    var n = t(e, e.document);
    e.lazySizes = n, "object" == typeof module && module.exports && (module.exports = n)
  }(window, function e(t, n) {
    "use strict";
    if (n.getElementsByClassName) {
      var i, r = n.documentElement,
        o = t.HTMLPictureElement && "sizes" in n.createElement("img"),
        a = "addEventListener",
        s = "getAttribute",
        u = t[a],
        l = t.setTimeout,
        c = t.requestAnimationFrame || l,
        d = /^picture$/i,
        f = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        m = Array.prototype.forEach,
        h = function(e, t) {
          return p[t] || (p[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), p[t].test(e[s]("class") || "") && p[t]
        },
        g = function(e, t) {
          h(e, t) || e.setAttribute("class", (e[s]("class") || "").trim() + " " + t)
        },
        v = function(e, t) {
          var n;
          (n = h(e, t)) && e.setAttribute("class", (e[s]("class") || "").replace(n, " "))
        },
        y = function(e, t, n) {
          var i = n ? a : "removeEventListener";
          n && y(e, t), f.forEach(function(n) {
            e[i](n, t)
          })
        },
        b = function(e, t, i, r, o) {
          var a = n.createEvent("CustomEvent");
          return a.initCustomEvent(t, !r, !o, i || {}), e.dispatchEvent(a), a
        },
        z = function(e, n) {
          var r;
          !o && (r = t.picturefill || i.pf) ? r({
            reevaluate: !0,
            elements: [e]
          }) : n && n.src && (e.src = n.src)
        },
        C = function(e, t) {
          return (getComputedStyle(e, null) || {})[t]
        },
        w = function(e, t, n) {
          for (n = n || e.offsetWidth; n < i.minSize && t && !e._lazysizesWidth;) n = t.offsetWidth, t = t.parentNode;
          return n
        },
        _ = function(e) {
          var n, i = 0,
            r = t.Date,
            o = function() {
              n = !1, i = r.now(), e()
            },
            a = function() {
              l(o)
            },
            s = function() {
              c(a)
            };
          return function() {
            if (!n) {
              var e = 125 - (r.now() - i);
              n = !0, e < 6 && (e = 6), l(s, e)
            }
          }
        },
        E = function() {
          var e, o, f, p, w, E, x, S, T, j, L, M, N, P, k, I = /^img$/i,
            R = /^iframe$/i,
            O = "onscroll" in t && !/glebot/.test(navigator.userAgent),
            B = 0,
            H = 0,
            W = 0,
            D = 0,
            F = function(e) {
              W--, e && e.target && y(e.target, F), (!e || W < 0 || !e.target) && (W = 0)
            },
            V = function(e, t) {
              var i, o = e,
                a = "hidden" == C(n.body, "visibility") || "hidden" != C(e, "visibility");
              for (T -= t, M += t, j -= t, L += t; a && (o = o.offsetParent) && o != n.body && o != r;)(a = (C(o, "opacity") || 1) > 0) && "visible" != C(o, "overflow") && (i = o.getBoundingClientRect(), a = L > i.left && j < i.right && M > i.top - 1 && T < i.bottom + 1);
              return a
            },
            q = function() {
              var t, n, a, u, l, c, d, p, m;
              if ((w = i.loadMode) && W < 8 && (t = e.length)) {
                n = 0, D++, null == P && ("expand" in i || (i.expand = r.clientHeight > 600 ? r.clientWidth > 600 ? 550 : 410 : 359), N = i.expand, P = N * i.expFactor), H < P && W < 1 && D > 3 && w > 2 ? (H = P, D = 0) : H = w > 1 && D > 2 && W < 6 ? N : 0;
                for (; n < t; n++)
                  if (e[n] && !e[n]._lazyRace)
                    if (O)
                      if ((p = e[n][s]("data-expand")) && (c = 1 * p) || (c = H), m !== c && (x = innerWidth + c * k, S = innerHeight + c, d = -1 * c, m = c), a = e[n].getBoundingClientRect(), (M = a.bottom) >= d && (T = a.top) <= S && (L = a.right) >= d * k && (j = a.left) <= x && (M || L || j || T) && (f && W < 3 && !p && (w < 3 || D < 4) || V(e[n], c))) {
                        if (K(e[n]), l = !0, W > 9) break
                      } else !l && f && !u && W < 4 && D < 4 && w > 2 && (o[0] || i.preloadAfterLoad) && (o[0] || !p && (M || L || j || T || "auto" != e[n][s](i.sizesAttr))) && (u = o[0] || e[n]);
                else K(e[n]);
                u && !l && K(u)
              }
            },
            U = _(q),
            Q = function(e) {
              g(e.target, i.loadedClass), v(e.target, i.loadingClass), y(e.target, G)
            },
            G = function(e) {
              e = {
                target: e.target
              }, c(function() {
                Q(e)
              })
            },
            X = function(e, t) {
              try {
                e.contentWindow.location.replace(t)
              } catch (n) {
                e.src = t
              }
            },
            Y = function(e) {
              var t, n, r = e[s](i.srcsetAttr);
              (t = i.customMedia[e[s]("data-media") || e[s]("media")]) && e.setAttribute("media", t), r && e.setAttribute("srcset", r), t && (n = e.parentNode, n.insertBefore(e.cloneNode(), e), n.removeChild(e))
            },
            J = function() {
              var e, t = [],
                n = function() {
                  for (; t.length;) t.shift()();
                  e = !1
                };
              return {
                add: function(i) {
                  t.push(i), e || (e = !0, c(n))
                },
                run: n
              }
            }(),
            K = function(e) {
              var t, n, r, o, a, u, C, w = I.test(e.nodeName),
                _ = w && (e[s](i.sizesAttr) || e[s]("sizes")),
                E = "auto" == _;
              (!E && f || !w || !e.src && !e.srcset || e.complete || h(e, i.errorClass)) && (E && (C = e.offsetWidth), e._lazyRace = !0, W++, i.rC && (C = i.rC(e, C) || C), J.add(function f() {
                (a = b(e, "lazybeforeunveil")).defaultPrevented || (_ && (E ? (A.updateElem(e, !0, C), g(e, i.autosizesClass)) : e.setAttribute("sizes", _)), n = e[s](i.srcsetAttr), t = e[s](i.srcAttr), w && (r = e.parentNode, o = r && d.test(r.nodeName || "")), u = a.detail.firesLoad || "src" in e && (n || t || o), a = {
                  target: e
                }, u && (y(e, F, !0), clearTimeout(p), p = l(F, 2500), g(e, i.loadingClass), y(e, G, !0)), o && m.call(r.getElementsByTagName("source"), Y), n ? e.setAttribute("srcset", n) : t && !o && (R.test(e.nodeName) ? X(e, t) : e.src = t), (n || o) && z(e, {
                  src: t
                })), c(function() {
                  e._lazyRace && delete e._lazyRace, v(e, i.lazyClass), u && !e.complete || (u ? F(a) : W--, Q(a))
                })
              }))
            },
            Z = function() {
              if (!f) {
                if (Date.now() - E < 999) return void l(Z, 999);
                var e, t = function() {
                  i.loadMode = 3, U()
                };
                f = !0, i.loadMode = 3, n.hidden ? (q(), J.run()) : U(), u("scroll", function() {
                  3 == i.loadMode && (i.loadMode = 2), clearTimeout(e), e = l(t, 99)
                }, !0)
              }
            };
          return {
            _: function() {
              E = Date.now(), e = n.getElementsByClassName(i.lazyClass), o = n.getElementsByClassName(i.lazyClass + " " + i.preloadClass), k = i.hFac, u("scroll", U, !0), u("resize", U, !0), t.MutationObserver ? new MutationObserver(U).observe(r, {
                childList: !0,
                subtree: !0,
                attributes: !0
              }) : (r[a]("DOMNodeInserted", U, !0), r[a]("DOMAttrModified", U, !0), setInterval(U, 999)), u("hashchange", U, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(e) {
                n[a](e, U, !0)
              }), /d$|^c/.test(n.readyState) ? Z() : (u("load", Z), n[a]("DOMContentLoaded", U), l(Z, 2e4)), U(e.length > 0)
            },
            checkElems: U,
            unveil: K
          }
        }(),
        A = function() {
          var e, t = function(e, t, n) {
              var i, r, o, a, s = e.parentNode;
              if (s && (n = w(e, s, n), a = b(e, "lazybeforesizes", {
                  width: n,
                  dataAttr: !!t
                }), !a.defaultPrevented && (n = a.detail.width) && n !== e._lazysizesWidth)) {
                if (e._lazysizesWidth = n, n += "px", e.setAttribute("sizes", n), d.test(s.nodeName || ""))
                  for (i = s.getElementsByTagName("source"), r = 0, o = i.length; r < o; r++) i[r].setAttribute("sizes", n);
                a.detail.dataAttr || z(e, a.detail)
              }
            },
            r = function() {
              var n, i = e.length;
              if (i)
                for (n = 0; n < i; n++) t(e[n])
            },
            o = _(r);
          return {
            _: function() {
              e = n.getElementsByClassName(i.autosizesClass), u("resize", o)
            },
            checkElems: o,
            updateElem: t
          }
        }(),
        x = function() {
          x.i || (x.i = !0, A._(), E._())
        };
      return function() {
        var e, n = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: !0,
          expFactor: 1.7,
          hFac: .8,
          loadMode: 2
        };
        i = t.lazySizesConfig || t.lazysizesConfig || {};
        for (e in n) e in i || (i[e] = n[e]);
        t.lazySizesConfig = i, l(function() {
          i.init && x()
        })
      }(), {
        cfg: i,
        autoSizer: A,
        loader: E,
        init: x,
        uP: z,
        aC: g,
        rC: v,
        hC: h,
        fire: b,
        gW: w
      }
    }
  }),
  function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.inView = t() : e.inView = t()
  }(this, function() {
    return function(e) {
      function t(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
          exports: {},
          id: i,
          loaded: !1
        };
        return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
      "use strict";

      function i(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var r = n(2),
        o = i(r);
      e.exports = o.default
    }, function(e, t) {
      function n(e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t)
      }
      e.exports = n
    }, function(e, t, n) {
      "use strict";

      function i(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(9),
        o = i(r),
        a = n(3),
        s = i(a),
        u = n(4),
        l = function() {
          if ("undefined" != typeof window) {
            var e = 100,
              t = ["scroll", "resize", "load"],
              n = {
                history: []
              },
              i = {
                offset: {},
                threshold: 0,
                test: u.inViewport
              },
              r = (0, o.default)(function() {
                n.history.forEach(function(e) {
                  n[e].check()
                })
              }, e);
            t.forEach(function(e) {
              return addEventListener(e, r)
            }), window.MutationObserver && addEventListener("DOMContentLoaded", function() {
              new MutationObserver(r).observe(document.body, {
                attributes: !0,
                childList: !0,
                subtree: !0
              })
            });
            var a = function(e) {
              if ("string" == typeof e) {
                var t = [].slice.call(document.querySelectorAll(e));
                return n.history.indexOf(e) > -1 ? n[e].elements = t : (n[e] = (0, s.default)(t, i), n.history.push(e)), n[e]
              }
            };
            return a.offset = function(e) {
              if (void 0 === e) return i.offset;
              var t = function(e) {
                return "number" == typeof e
              };
              return ["top", "right", "bottom", "left"].forEach(t(e) ? function(t) {
                return i.offset[t] = e
              } : function(n) {
                return t(e[n]) ? i.offset[n] = e[n] : null
              }), i.offset
            }, a.threshold = function(e) {
              return "number" == typeof e && e >= 0 && e <= 1 ? i.threshold = e : i.threshold
            }, a.test = function(e) {
              return "function" == typeof e ? i.test = e : i.test
            }, a.is = function(e) {
              return i.test(e, i)
            }, a.offset(0), a
          }
        };
      t.default = l()
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var i = t[n];
              i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
          }
          return function(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
          }
        }(),
        r = function() {
          function e(t, i) {
            n(this, e), this.options = i, this.elements = t, this.current = [], this.handlers = {
              enter: [],
              exit: []
            }, this.singles = {
              enter: [],
              exit: []
            }
          }
          return i(e, [{
            key: "check",
            value: function() {
              var e = this;
              return this.elements.forEach(function(t) {
                var n = e.options.test(t, e.options),
                  i = e.current.indexOf(t),
                  r = i > -1,
                  o = n && !r,
                  a = !n && r;
                o && (e.current.push(t), e.emit("enter", t)), a && (e.current.splice(i, 1), e.emit("exit", t))
              }), this
            }
          }, {
            key: "on",
            value: function(e, t) {
              return this.handlers[e].push(t), this
            }
          }, {
            key: "once",
            value: function(e, t) {
              return this.singles[e].unshift(t), this
            }
          }, {
            key: "emit",
            value: function(e, t) {
              for (; this.singles[e].length;) this.singles[e].pop()(t);
              for (var n = this.handlers[e].length; --n > -1;) this.handlers[e][n](t);
              return this
            }
          }]), e
        }();
      t.default = function(e, t) {
        return new r(e, t)
      }
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        var n = e.getBoundingClientRect(),
          i = n.top,
          r = n.right,
          o = n.bottom,
          a = n.left,
          s = n.width,
          u = n.height,
          l = {
            t: o,
            r: window.innerWidth - a,
            b: window.innerHeight - i,
            l: r
          },
          c = {
            x: t.threshold * s,
            y: t.threshold * u
          };
        return l.t > t.offset.top + c.y && l.r > t.offset.right + c.x && l.b > t.offset.bottom + c.y && l.l > t.offset.left + c.x
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.inViewport = n
    }, function(e, t) {
      (function(t) {
        var n = "object" == typeof t && t && t.Object === Object && t;
        e.exports = n
      }).call(t, function() {
        return this
      }())
    }, function(e, t, n) {
      var i = n(5),
        r = "object" == typeof self && self && self.Object === Object && self,
        o = i || r || Function("return this")();
      e.exports = o
    }, function(e, t, n) {
      function i(e, t, n) {
        function i(t) {
          var n = y,
            i = b;
          return y = b = void 0, E = t, C = e.apply(i, n)
        }

        function c(e) {
          return E = e, w = setTimeout(p, t), A ? i(e) : C
        }

        function d(e) {
          var n = e - _,
            i = e - E,
            r = t - n;
          return x ? l(r, z - i) : r
        }

        function f(e) {
          var n = e - _,
            i = e - E;
          return void 0 === _ || n >= t || n < 0 || x && i >= z
        }

        function p() {
          var e = o();
          return f(e) ? m(e) : void(w = setTimeout(p, d(e)))
        }

        function m(e) {
          return w = void 0, S && y ? i(e) : (y = b = void 0, C)
        }

        function h() {
          void 0 !== w && clearTimeout(w), E = 0, y = _ = b = w = void 0
        }

        function g() {
          return void 0 === w ? C : m(o())
        }

        function v() {
          var e = o(),
            n = f(e);
          if (y = arguments, b = this, _ = e, n) {
            if (void 0 === w) return c(_);
            if (x) return w = setTimeout(p, t), i(_)
          }
          return void 0 === w && (w = setTimeout(p, t)), C
        }
        var y, b, z, C, w, _, E = 0,
          A = !1,
          x = !1,
          S = !0;
        if ("function" != typeof e) throw new TypeError(s);
        return t = a(t) || 0, r(n) && (A = !!n.leading, x = "maxWait" in n, z = x ? u(a(n.maxWait) || 0, t) : z, S = "trailing" in n ? !!n.trailing : S), v.cancel = h, v.flush = g, v
      }
      var r = n(1),
        o = n(8),
        a = n(10),
        s = "Expected a function",
        u = Math.max,
        l = Math.min;
      e.exports = i
    }, function(e, t, n) {
      var i = n(6),
        r = function() {
          return i.Date.now()
        };
      e.exports = r
    }, function(e, t, n) {
      function i(e, t, n) {
        var i = !0,
          s = !0;
        if ("function" != typeof e) throw new TypeError(a);
        return o(n) && (i = "leading" in n ? !!n.leading : i, s = "trailing" in n ? !!n.trailing : s), r(e, t, {
          leading: i,
          maxWait: t,
          trailing: s
        })
      }
      var r = n(7),
        o = n(1),
        a = "Expected a function";
      e.exports = i
    }, function(e, t) {
      function n(e) {
        return e
      }
      e.exports = n
    }])
  }),
  function() {
    var e = $("body"),
      t = {
        init: function() {
          sessionStorage.getItem("intro_has_played") || (e.addClass("init-intro"), setTimeout(this.playIntro, 16), sessionStorage.setItem("intro_has_played", !0))
        },
        playIntro: function() {
          var t = 250;
          e.addClass("play-intro"), setTimeout(function() {
            $(".intro-logo").addClass("active"), $(".intro-title").addClass("active")
          }, 500), setTimeout(function() {
            e.addClass("intro-end")
          }, 750)
        }
      };
    $(".intro-logo").length && t.init()
  }(),
  function($, e, t, n) {
    $.fn.togglemenu = function(t, n) {
      var i = $("body"),
        r = $(e);
      return this.each(function() {
        function o() {
          g && clearTimeout(g), v && clearTimeout(v)
        }

        function a() {
          o(), f.removeClass(b), p.removeClass(b), m.removeClass(b), i.removeClass("has-menu"), r.scrollTop(z)
        }

        function s() {}

        function u() {
          a(), g = setTimeout(function() {
            m.css({
              display: ""
            })
          }, y), h = !1
        }

        function l() {
          o(), z = r.scrollTop(), f.addClass(b), m.css({
            display: "block"
          }), i.addClass("has-menu"), $(e.body).trigger("menu_before_open")
        }

        function c() {
          l(), g = setTimeout(function() {
            p.addClass(b), m.addClass(b)
          }, 16), v = setTimeout(s, y), h = !0
        }

        function d() {
          h ? u() : c()
        }
        var f = $(this),
          p = $(t),
          m = $(n),
          h = !1,
          g, v, y = 300,
          b = "is-active",
          z = 0;
        f.on("click", function(e) {
          d(), e.preventDefault()
        }), f.on("close", u)
      })
    }, $(".toggler").togglemenu("", ".main-menu-wrap"), $(e.body).on("content_added", function() {
      $(".toggler").trigger("close")
    })
  }(jQuery, document, window),
  function($, e, t, n) {
    ({
      init: function() {
        this.setupProjects(), this.setupFrames(), this.setupVideos()
      },
      setupVideos: function() {
        inView(".inview-play").on("enter", function(e) {
          "VIDEO" === e.nodeName && e.play()
        }).on("exit", function(e) {
          "VIDEO" === e.nodeName && e.pause()
        })
      },
      setupProjects: function() {
        inView(".project").on("enter", function(e) {
          $(e).addClass("in-view")
        }).on("exit", function(e) {
          $(e).removeClass("in-view")
        })
      },
      setupFrames: function() {}
    }).init()
  }(jQuery, document, window),
  function() {
    var e = {
      init: function() {
        var e = this;
        e.$doc = $(document), e.$crumbContainer = $(".breadcrumb"), e.setCrumbs(), e.$crumbs.length && ($(window).on("scroll", window.heydays.utils.throttle(e.updateCrumb, 50)), e.updateCrumb()), $(document).on("ajax_loaded", e.setCrumbs)
      },
      setFooterColor: function() {
        var t = e,
          n = $("#footer"),
          i = t.$crumbs.last(),
          r = !1;
        if (i.length) {
          var o = i.offset().top,
            a = i.outerHeight() + o,
            s = n.offset().top;
          s < a && s > o && i.hasClass("text-bright") && (r = !0)
        }
        n.toggleClass("text-bright", r)
      },
      setCrumbs: function() {
        var t = e;
        t.$crumbs = $("[data-breadcrumb], .pbuilder .section-wrap, .js-color-change"), t.updateCrumb()
      },
      extractProps: function(e) {
        var t = e.split("|"),
          n = {};
        return t.forEach(function(e) {
          var t = e.split(":");
          if (Array.isArray(t) && 2 === t.length) {
            var i = t[0],
              r = t[1];
            n[i] = r
          }
        }), $.isEmptyObject(n) && (n.text = e), n
      },
      updateCrumb: function() {
        var t = e;
        if (t.setFooterColor(), !(t.$doc.scrollTop() < 0)) {
          var n = t.$crumbContainer[0].getBoundingClientRect(),
            i = n.bottom,
            r = !1;
          t.$crumbs.each(function() {
            var e = $(this),
              n = this.getBoundingClientRect();
            if (n.top < i && n.bottom > i) {
              if (t.current !== this) {
                var o = {};
                void 0 !== e.data("breadcrumb") && (o = t.extractProps(e.data("breadcrumb")), t.$crumbContainer.html(o.text).addClass("has-crumb")), o.classels = "body", e.hasClass("text-bright") ? o.class = "nav-text-bright" : o.class = "", t.prevClass && t.prevClassels && $(t.prevClassels).removeClass(t.prevClass), o.class && o.classels && (t.prevClassels = o.classels, t.prevClass = o.class, $(o.classels).addClass(o.class)), t.$crumbs.find(".current-crumb").removeClass("current-crumb"), e.addClass("current-crumb"), $(".site-title").toggleClass("hide-name", e.hasClass("hide-title")), $("body").toggleClass("hide-nav-overlay", e.hasClass("hide-nav-overlay")).toggleClass("show-nav-overlay", !e.hasClass("hide-nav-overlay")), t.current = this
              }
              r = !0
            }
          }), r || void 0 === t.current || (t.current = void 0, t.$crumbs.find(".current-crumb").removeClass("current-crumb"), t.$crumbContainer.html("").removeClass("has-crumb"), t.prevClass && t.prevClassels && $(t.prevClassels).removeClass(t.prevClass), $(".site-title").removeClass("hide-name"), $("body").removeClass("hide-nav-overlay show-nav-overlay")), $(document.body).trigger("crumbChanged")
        }
      }
    };
    e.init()
  }(),
  function($, e, t, n) {
    var i = {
      init: function() {
        var e = this;
        e.$items = $(".bodymovin"), e.$items.length && t.heydays.utils.loadBodymovin(e.scriptLoaded)
      },
      scriptLoaded: function(e) {
        i.$items.each(function() {
          var t = this,
            n = $(this),
            i = e.loadAnimation({
              container: t,
              renderer: "svg",
              prerender: !0,
              loop: !0,
              autoplay: !1,
              path: n.data("path")
            });
          n.data("player", i)
        }), inView(".bodymovin").on("enter", function(e) {
          var t = $(e).data("player");
          t && t.play()
        }).on("exit", function(e) {
          var t = $(e).data("player");
          t && t.pause()
        })
      }
    };
    i.init()
  }(jQuery, document, window),
  function($, e, t, n) {
    var i = {
      init: function(e) {
        var n = sessionStorage.getItem("project_list");
        n && n.length || (n = t.data.projects, sessionStorage.setItem("project_list", n)), "string" == typeof n && (n = n.split(","), n = n.map(function(e) {
          return parseInt(e, 10)
        })), this.project_list = n, this.prepareNextProject(e)
      },
      prepareNextProject: function(e) {
        var n = i;
        e = parseInt(e), n.project_list = this.removeElement(n.project_list, e), sessionStorage.setItem("project_list", n.project_list);
        var r = n.project_list.shift();
        r ? n.loadNextProject(r) : n.init(t.data.project)
      },
      removeElement: function(e, t) {
        var n = e.indexOf(t);
        return n > -1 && e.splice(n, 1), e
      },
      loadNextProject: function(n) {
        var r = i;
        $.ajax({
          type: "GET",
          url: t.data.ajaxurl,
          data: {
            action: "get_next_project",
            post_id: n
          },
          success: function(t) {
            t.success ? $(".js-next-project").html(t.data) : t.data.false_id && r.prepareNextProject(t.data.false_id), $(e).trigger("ajax_loaded")
          },
          error: function(e, t, n) {
            console.log(e, t, n)
          }
        })
      }
    };
    t.data.project && i.init(t.data.project)
  }(jQuery, document, window),
  function() {
    var e = {
      init: function() {
        var e = this,
          t = $(".primary-menu"),
          n = t.find("a"),
          i = $(".bg-image-panel");
        e.duration = 500, e.default_image = i.data("default"), e.$panels = i, e.$loaders = n, t.on("mouseenter", function() {
          t.addClass("is-hover")
        }).on("mouseleave", function() {
          t.removeClass("is-hover"), e.setDefaultImage()
        }), $(document.body).on("menu_before_open", function() {
          e.setDefaultImage()
        })
      },
      setImage: function(e) {
        var t = this;
        if (t.prev_image !== e) {
          t.prev_image = e;
          var n = $('<div class="panel panel-top"></div>');
          t.$prev_panel && t.$prev_panel.removeClass("panel-top"), e && n.css({
            "background-image": "url(" + e + ")"
          }), n.appendTo(t.$panels), setTimeout(function() {
            n.addClass("active")
          }, 16), setTimeout(function() {
            t.$prev_panel && t.$prev_panel.remove(), t.$prev_panel = n
          }, t.duration + 16)
        }
      },
      setDefaultImage: function() {
        var e = window.heydays.utils.pickSource(this.default_image, $(window).width());
        this.setImage(e)
      },
      menuItemHover: function() {
        var t = e;
        if (window.USER_IS_TOUCHING) t.$loaders.off("mouseenter", t.menuItemHover).off("mouseleave", t.menuItemLeave);
        else {
          var n = $(this).addClass("active"),
            i = n.data("sources");
          if (i) {
            var r = window.heydays.utils.pickSource(i, $(window).width());
            t.setImage(r), console.log(i, r)
          }
        }
      },
      menuItemLeave: function() {
        $(this).removeClass("active")
      }
    };
    e.init()
  }(),
  function() {
    var e = {
      init: function() {
        this.$body = $("body"), this.$document = $(document), this.$window = $(window), this.threshold = 90, this.deltamax = 70, this.navHeight = 78, this.lastScrollTop = 0, this.$window.on("resize", window.heydays.utils.throttle(this.updateHeaderPosition, 50)).on("scroll", window.heydays.utils.throttle(this.updateHeaderPosition, 50))
      },
      isOffset: function(e) {
        var t = this,
          n = $(".pbuilder"),
          i = t.navHeight;
        return n.length && (n = n.first(), n.offset().top > t.navHeight && (i = n.offset().top - t.navHeight)), e > i
      },
      isRockBottom: function(e) {
        var t = this;
        return e > t.$document.height() - t.$window.height() - t.navHeight
      },
      shouldHideMenu: function(e) {
        var t = this;
        return !t.isBottom && (e > t.lastScrollTop && t.isOffset(e))
      },
      updateHeaderPosition: function() {
        var t = e,
          n = t.$document.scrollTop(),
          i = t.isOffset(n),
          r = Math.abs(t.lastScrollTop - n);
        if (t.isBottom = t.isRockBottom(n), t.navHeight = $(".site-title").outerHeight(), t.isBottom ? t.$body.removeClass("menu-is-offset") : t.$body.toggleClass("menu-is-offset", i), t.$body.toggleClass("is-bottom", t.isBottom), !(t.$body.hasClass("has-menu") || r <= t.deltamax)) {
          t.shouldHideMenu(n) ? t.$body.addClass("menu-is-hidden") : t.$body.removeClass("menu-is-hidden"), t.lastScrollTop = n
        }
      }
    };
    e.init()
  }(),
  function() {
    $.fn.videoControls = function() {
      return this.each(function() {
        function e() {
          u.addClass("controls-hidden")
        }

        function t() {
          l && clearTimeout(l), u.removeClass("controls-hidden"), l = setTimeout(e, 1500)
        }

        function n() {
          a.play()
        }

        function i() {
          a.pause()
        }

        function r() {
          s ? i() : n()
        }
        var o = $(this).wrap('<div class="custom-controls"/>'),
          a = this,
          s = !1,
          u = o.parent(),
          l, c = !1,
          d = !0,
          f = $('<input type="range" class="seek-bar" value="0">'),
          p = f[0],
          m = $('<button class="btn-play">Play</button>'),
          h = $('<button class="btn-pause">Pause</button>').hide();
        o.after(f).after(m).after(h), o.prop("controls", ""), a.addEventListener("timeupdate", function() {
          var e = 100 / a.duration * a.currentTime;
          p.value = e
        }), a.addEventListener("ended", function() {
          a.currentTime = 0, i()
        }), a.addEventListener("pause", function() {
          c || (d = !0, s = !1, m.show(), h.hide(), u.removeClass("playing").addClass("paused"), u.off("mousemove", t))
        }), a.addEventListener("play", function() {
          u.addClass("init"), c || (d = !1, s = !0, m.hide(), h.show(), u.addClass("playing").removeClass("paused"), u.on("mousemove", t))
        }), p.addEventListener("change", function() {
          var e = a.duration * (p.value / 100);
          a.currentTime = e
        }), p.addEventListener("mousedown", function() {
          c = !0, a.pause()
        }), p.addEventListener("mouseup", function() {
          d || a.play(), c = !1
        }), o.on("click", r), m.on("click", n), h.on("click", i)
      })
    }, $("video[controls]").videoControls()
  }(),
  function($, e, t, n) {
    function i() {
      history.replaceState("", e.title, t.location.pathname + t.location.search)
    }

    function r() {
      var t = $(".project-list");
      if (t.length) {
        var n = Math.round(t.offset().top);
        $(e).scrollTop(n)
      }
    }

    function o(e) {
      if (p.length) {
        if ($(t).width() < 1024) return void(e && p.css("transform", ""));
        var n = m.scrollTop();
        p.each(function() {
          var e = $(this);
          e.css("transform", "translateY(" + (n - e.offset().top) / 20 + "px)")
        })
      }
    }

    function a() {
      f.each(function() {
        var e = $(this),
          t = e.find(".inner"),
          n = t.position().left + t.outerWidth();
        e.toggleClass("hide-overflow", n > e.outerWidth())
      })
    }

    function s() {
      d.each(function() {
        var e = $(this),
          t = e.find(e.data("minheight")),
          n = parseInt(e.css("paddingTop"), 10),
          i = t.outerHeight() + 2 * n;
        e.css({
          "min-height": i
        })
      })
    }

    function u() {
      o()
    }

    function l() {
      a(), s(), o(!0)
    }
    var c = t.location.hash;
    c && "cases" === (c = c.substring(1)) && (r(), i()), $(e).on("click", ".js-projects", function(n) {
      var i = $(".project-list");
      if (i.length) {
        $(".toggler").trigger("close");
        var r = Math.round(i.offset().top);
        $(e).scrollTop(r)
      } else {
        var o = $(this).find("a").attr("href");
        t.location.href = o + "#cases"
      }
      n.preventDefault()
    });
    var d = $("[data-minheight]"),
      f = $(".site-title"),
      p = $(".parallax"),
      m = $(e);
    $(e.body).on("crumbChanged", a), $(t).on("resize", t.heydays.utils.throttle(l, 50)).on("scroll", t.heydays.utils.raf(u)), l()
  }(jQuery, document, window);
//# sourceMappingURL=./app-min.js.map
