/**
 * @module node-adodb
 * @author nuintun
 * @license MIT
 * @version 5.0.3
 * @description A Node.js JavaScript Client implementing the ADODB protocol.
 * @see https://github.com/nuintun/node-adodb#readme
 */
!(function () {
  "use strict";
  function t(t) {
    t.State && t.Close();
  }
  function e(t) {
    WScript.StdOut.Write(JSON.stringify(t));
  }
  function n(t) {
    var e,
      n = t.number,
      r = t.description;
    r ||
      (r =
        "Unspecified error, SQL may contain reserved words and symbols, surround it with brackets []"),
      (e = { code: n, message: r }),
      WScript.StdErr.Write(JSON.stringify(e));
  }
  function r(t) {
    return 7 === t || 64 === t || 133 === t || 134 === t || 135 === t;
  }
  function o(t) {
    return 128 === t || 204 === t || 205 === t;
  }
  function i(e) {
    var n = new ActiveXObject("ADODB.Stream");
    (n.Type = 1),
      n.Open(),
      (n.Position = 0),
      n.Write(e),
      (n.Position = 0),
      (n.Type = 2);
    var r = n.ReadText();
    return t(n), r;
  }
  function u(t) {
    var e = [],
      n = t.Fields;
    if (!t.BOF || !t.EOF) {
      var u,
        c,
        f,
        a,
        s,
        p = n.Count;
      for (t.MoveFirst(); !t.EOF; ) {
        for (c = {}, u = 0; u < p; u++)
          (a = (f = n.Item(u)).Type),
            (s = f.Value),
            r(a) ? (s = new Date(s)) : o(a) && (s = i(s)),
            (c[f.Name] = s);
        e.push(c), t.MoveNext();
      }
    }
    return e;
  }
  "object" != typeof JSON && (JSON = {}),
    (function () {
      var t,
        e,
        n,
        r,
        o = /^[\],:{}\s]*$/,
        i = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        u = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        c = /(?:^|:|,)(?:\s*\[)+/g,
        f =
          /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        a =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      function s(t) {
        return t < 10 ? "0" + t : t;
      }
      function p() {
        return this.valueOf();
      }
      function l(t) {
        return (
          (f.lastIndex = 0),
          f.test(t)
            ? '"' +
              t.replace(f, function (t) {
                var e = n[t];
                return "string" == typeof e
                  ? e
                  : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
            : '"' + t + '"'
        );
      }
      "function" != typeof Date.prototype.toJSON &&
        ((Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                "-" +
                s(this.getUTCMonth() + 1) +
                "-" +
                s(this.getUTCDate()) +
                "T" +
                s(this.getUTCHours()) +
                ":" +
                s(this.getUTCMinutes()) +
                ":" +
                s(this.getUTCSeconds()) +
                "Z"
            : null;
        }),
        (Boolean.prototype.toJSON = p),
        (Number.prototype.toJSON = p),
        (String.prototype.toJSON = p)),
        "function" != typeof JSON.stringify &&
          ((n = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
          }),
          (JSON.stringify = function (n, o, i) {
            var u;
            if (((t = ""), (e = ""), "number" == typeof i))
              for (u = 0; u < i; u += 1) e += " ";
            else "string" == typeof i && (e = i);
            if (
              ((r = o),
              o &&
                "function" != typeof o &&
                ("object" != typeof o || "number" != typeof o.length))
            )
              throw new Error("JSON.stringify");
            return (function c(n, o) {
              var i,
                u,
                f,
                a,
                s,
                p = t,
                O = o[n];
              switch (
                (O &&
                  "object" == typeof O &&
                  "function" == typeof O.toJSON &&
                  (O = O.toJSON(n)),
                "function" == typeof r && (O = r.call(o, n, O)),
                typeof O)
              ) {
                case "string":
                  return l(O);
                case "number":
                  return isFinite(O) ? String(O) : "null";
                case "boolean":
                case "null":
                  return String(O);
                case "object":
                  if (!O) return "null";
                  if (
                    ((t += e),
                    (s = []),
                    "[object Array]" === Object.prototype.toString.apply(O))
                  ) {
                    for (a = O.length, i = 0; i < a; i += 1)
                      s[i] = c(i, O) || "null";
                    return (
                      (f =
                        0 === s.length
                          ? "[]"
                          : t
                          ? "[\n" + t + s.join(",\n" + t) + "\n" + p + "]"
                          : "[" + s.join(",") + "]"),
                      (t = p),
                      f
                    );
                  }
                  if (r && "object" == typeof r)
                    for (a = r.length, i = 0; i < a; i += 1)
                      "string" == typeof r[i] &&
                        (f = c((u = r[i]), O)) &&
                        s.push(l(u) + (t ? ": " : ":") + f);
                  else
                    for (u in O)
                      Object.prototype.hasOwnProperty.call(O, u) &&
                        (f = c(u, O)) &&
                        s.push(l(u) + (t ? ": " : ":") + f);
                  return (
                    (f =
                      0 === s.length
                        ? "{}"
                        : t
                        ? "{\n" + t + s.join(",\n" + t) + "\n" + p + "}"
                        : "{" + s.join(",") + "}"),
                    (t = p),
                    f
                  );
              }
            })("", { "": n });
          })),
        "function" != typeof JSON.parse &&
          (JSON.parse = function (t, e) {
            var n;
            if (
              ((t = String(t)),
              (a.lastIndex = 0),
              a.test(t) &&
                (t = t.replace(a, function (t) {
                  return (
                    "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                  );
                })),
              o.test(t.replace(i, "@").replace(u, "]").replace(c, "")))
            )
              return (
                (n = new Function("return " + t)()),
                "function" == typeof e
                  ? (function r(t, n) {
                      var o,
                        i,
                        u = t[n];
                      if (u && "object" == typeof u)
                        for (o in u)
                          Object.prototype.hasOwnProperty.call(u, o) &&
                            ((i = r(u, o)) !== undefined
                              ? (u[o] = i)
                              : delete u[o]);
                      return e.call(t, n, u);
                    })({ "": n }, "")
                  : n
              );
            throw new SyntaxError("JSON.parse");
          });
    })();
  var c = {
      execute: function (r) {
        var o,
          i = [],
          c = !!r.scalar,
          f = new ActiveXObject("ADODB.Connection");
        c && (o = new ActiveXObject("ADODB.Recordset")), (f.CursorLocation = 3);
        try {
          f.Open(r.connection),
            f.Execute(r.sql),
            c && (o.Open(r.scalar, f, 0, 1), (i = u(o))),
            e(i);
        } catch (a) {
          n(a);
        }
        t(f), c && t(o);
      },
      query: function (r) {
        var o = new ActiveXObject("ADODB.Connection"),
          i = new ActiveXObject("ADODB.Recordset");
        o.CursorLocation = 3;
        try {
          o.Open(r.connection), i.Open(r.sql, o, 0, 1), e(u(i));
        } catch (c) {
          n(c);
        }
        t(i), t(o);
      },
      schema: function (r) {
        var o,
          i = new ActiveXObject("ADODB.Connection");
        i.CursorLocation = 3;
        try {
          i.Open(r.connection),
            e(
              u(
                (o = r.hasOwnProperty("id")
                  ? i.OpenSchema(r.type, r.criteria, r.id)
                  : r.hasOwnProperty("criteria")
                  ? i.OpenSchema(r.type, r.criteria)
                  : i.OpenSchema(r.type))
              )
            );
        } catch (c) {
          n(c);
        }
        t(o), t(i);
      },
    },
    f = WScript.Arguments(0),
    a = JSON.parse(WScript.StdIn.ReadAll());
  c[f](a);
})();
