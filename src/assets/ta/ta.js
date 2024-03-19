/* eslint-disable */ (function () {
  var global = this;
  ('use strict');

  (function () {
    if (!this.require) {
      var modules = {},
        cache = {};

      var require = function require(name, root) {
        var path = expand(root, name),
          indexPath = expand(path, './index'),
          module,
          fn;
        module = cache[path] || cache[indexPath];
        if (module) {
          return module;
        } else if ((fn = modules[path] || modules[(path = indexPath)])) {
          module = { id: path, exports: {} };
          cache[path] = module.exports;
          fn(
            module.exports,
            function (name) {
              return require(name, dirname(path));
            },
            module
          );
          return (cache[path] = module.exports);
        } else {
          throw 'module ' + name + ' not found';
        }
      };

      var expand = function expand(root, name) {
        var results = [],
          parts,
          part;
        // If path is relative
        if (/^\.\.?(\/|$)/.test(name)) {
          parts = [root, name].join('/').split('/');
        } else {
          parts = name.split('/');
        }
        for (var i = 0, length = parts.length; i < length; i++) {
          part = parts[i];
          if (part == '..') {
            results.pop();
          } else if (part != '.' && part != '') {
            results.push(part);
          }
        }
        return results.join('/');
      };

      var dirname = function dirname(path) {
        return path.split('/').slice(0, -1).join('/');
      };

      this.require = function (name) {
        return require(name, '');
      };

      this.require.define = function (bundle) {
        for (var key in bundle) {
          modules[key] = bundle[key];
        }
      };

      this.require.modules = modules;
      this.require.cache = cache;
    }

    return this.require;
  }.call(global));
  ('use strict');

  var _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (obj) {
          return typeof obj;
        }
      : function (obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        };

  if (!window.JSON) {
    window.JSON = {
      parse: function parse(sJSON) {
        return eval('(' + sJSON + ')');
      },
      stringify: (function () {
        var toString = Object.prototype.toString;
        var isArray =
          Array.isArray ||
          function (a) {
            return toString.call(a) === '[object Array]';
          };
        var escMap = { '"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
        var escFunc = function escFunc(m) {
          return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
        };
        var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
        return function stringify(value) {
          if (value == null) {
            return 'null';
          } else if (typeof value === 'number') {
            return isFinite(value) ? value.toString() : 'null';
          } else if (typeof value === 'boolean') {
            return value.toString();
          } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            if (typeof value.toJSON === 'function') {
              return stringify(value.toJSON());
            } else if (isArray(value)) {
              var res = '[';
              for (var i = 0; i < value.length; i++) {
                res += (i ? ', ' : '') + stringify(value[i]);
              }
              return res + ']';
            } else if (toString.call(value) === '[object Object]') {
              var tmp = [];
              for (var k in value) {
                if (value.hasOwnProperty(k)) tmp.push(stringify(k) + ': ' + stringify(value[k]));
              }
              return '{' + tmp.join(', ') + '}';
            }
          }
          return '"' + value.toString().replace(escRE, escFunc) + '"';
        };
      })(),
    };
  }
  ('use strict');

  window.performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
  ('use strict');

  /**
 * Timing.js 1.2.0
 * Copyright 2016 Addy Osmani

 * Navigation Timing API helpers
 * timing.getTimes();
 **/
  window.timing = window.timing || {
    /**
     * Outputs extended measurements using Navigation Timing API
     * @param  Object opts Options (simple (bool) - opts out of full data view)
     * @return Object      measurements
     */
    getTimes: function getTimes(opts) {
      var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

      if (performance === undefined) {
        return false;
      }

      var timing = performance.timing;
      var api = {};
      opts = opts || {};

      if (timing) {
        if (opts && !opts.simple) {
          for (var k in timing) {
            // hasOwnProperty does not work because properties are
            // added by modifying the object prototype
            if (!isNaN(parseFloat(timing[k])) && isFinite(timing[k])) {
              api[k] = parseFloat(timing[k]);
            }
          }
        }

        // Time to first paint
        if (api.firstPaint === undefined) {
          // All times are relative times to the start time within the
          // same objects
          var firstPaint = 0;

          // Chrome
          if (window.chrome) {
            var paintMetrics = performance.getEntriesByType('paint');
            if (paintMetrics !== undefined && paintMetrics.length > 0) {
              var paintTimeMap = {};
              paintMetrics.forEach(function (paintMetric) {
                paintTimeMap[paintMetric.name] = paintMetric.startTime;
              });
              api.firstPaintTime = paintTimeMap['first-paint'];
              // api.firstContentfulPaintTime = paintTimeMap['first-contentful-paint'];
            } else if (window.chrome.loadTimes) {
              // Convert to ms
              firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
              api.firstPaintTime = firstPaint - timing.navigationStart;
            }
          } else if (typeof timing.msFirstPaint === 'number') {
            // IE
            firstPaint = timing.msFirstPaint;
            api.firstPaintTime = firstPaint - timing.navigationStart;
          }
          // Firefox
          // This will use the first times after MozAfterPaint fires
          //else if (timing.navigationStart && typeof InstallTrigger !== 'undefined') {
          //    api.firstPaint = timing.navigationStart;
          //    api.firstPaintTime = mozFirstPaintTime - timing.navigationStart;
          //}
          if (opts && !opts.simple) {
            api.firstPaint = firstPaint;
          }
        }

        // Total time from start to load
        api.loadTime = timing.loadEventEnd - timing.fetchStart;
        // Time spent constructing the DOM tree
        api.domReadyTime = timing.domComplete - timing.domInteractive;
        // Time consumed preparing the new page
        api.readyStart = timing.fetchStart - timing.navigationStart;
        // Time spent during redirection
        api.redirectTime = timing.redirectEnd - timing.redirectStart;
        // AppCache
        api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
        // Time spent unloading documents
        api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
        // DNS query time
        api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
        // TCP connection time
        api.connectTime = timing.connectEnd - timing.connectStart;
        // Time spent during the response
        api.reponseTime = timing.responseEnd - timing.responseStart;
        // Time spent during the request and response
        api.requestTime = timing.responseEnd - timing.requestStart;
        // Request to completion of the DOM loading
        api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
        // Time spent loading content resource
        api.scriptExecuteTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
        // Load event time
        api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
      }

      return api;
    },
  };
  this.require.define({
    'lib/app-data': function (exports, require, module) {
      'use strict';

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var _require = require('./send-data'),
        requestData = _require.requestData;

      // monitor_set_app_info

      function sendAppInfo(params) {
        var data = JSON.parse(params);
        requestData(
          _extends(
            {
              eventId: 'AppInfo',
            },
            data
          )
        );
      }

      function getAppInfoIOS() {
        var e = document.createElement('iframe');
        e.setAttribute('src', 'monitor://appinfo');
        document.documentElement.appendChild(e);
        e.parentNode.removeChild(e);
        e = null;
      }

      function getAppInfoAndroid() {
        if (typeof Monitor_APP_JS_Bridge == 'undefined') return;
        monitor_set_app_info(Monitor_APP_JS_Bridge.monitorAppInfo());
      }

      function getAppInfo() {
        getAppInfoAndroid();
        getAppInfoIOS();
      }

      module.exports = {
        getAppInfo: getAppInfo,
        sendAppInfo: sendAppInfo,
      };
    },
  });
  this.require.define({
    'lib/base-data': function (exports, require, module) {
      'use strict';

      /* global Cookies */

      var _ = require('./helpers');
      var domain = require('./domain');
      var uuid = require('./uuid');

      var _require = require('./'),
        browser = _require.browser,
        document = _require.document;

      var _require2 = require('./browser-info'),
        getBrowserBaseInfo = _require2.getBrowserBaseInfo;

      var dp = document.documentPathname();
      var ua = browser.userAgent();
      var dh = document.documentDomain();

      var _opts = {};

      module.exports = {
        init: function init(opts) {
          _opts = opts;
        },
        setUser: function setUser(uid) {
          var _opts2 = _opts,
            udata = _opts2.udata;

          udata.uid = uid;
        },
        getOpts: function getOpts() {
          // 加了个ck参数，如果用下面的get会每种类型都传这个参数
          return _.extend({}, _opts);
        },
        get: function get() {
          if (!Object.keys(_opts).length) {
            return;
          }
          var _opts3 = _opts,
            ak = _opts3.ak,
            vid = _opts3.vid,
            url = _opts3.url,
            udata = _opts3.udata;

          udata && (udata.domain = domain(_opts));
          var taid = global.Cookies.get('taid') || uuid();
          var browserInfo = getBrowserBaseInfo();
          return _.extend(
            { cid: taid, dp: dp, dh: dh, ua: ua, vid: vid, url: url, date: Date.now() },
            udata,
            ak ? { ak: ak } : {},
            browserInfo
          );
        },
      };
    },
  });
  this.require.define({
    'lib/browser-info': function (exports, require, module) {
      'use strict';

      exports.__esModule = true;
      // 获取操作系统
      var deviceInfo = navigator.userAgentData
        ? navigator.userAgentData.getHighEntropyValues([
            'architecture',
            'bitness',
            'model',
            'platform',
            'platformVersion',
            'uaFullVersion',
          ])
        : {};

      var graphicsCardInfo = (function () {
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl');
        if (gl) {
          return { GCM: '', GRE: '' };
        }
        var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return {
          GCM: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
          GRE: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        };
      })();

      var timing = performance.timing;

      var getScreenSize = (exports.getScreenSize = function getScreenSize(type) {
        var _window = window,
          screen = _window.screen;

        if (type === 'h') return screen.width;
        return screen.width + 'x' + screen.height;
      });
      var _window2 = window,
        screen = _window2.screen,
        devicePixelRatio = _window2.devicePixelRatio;

      var getBrowserBaseInfo = function getBrowserBaseInfo() {
        var _ref;

        var perfEntries = performance ? performance.getEntriesByType('navigation') : null;
        var entry = perfEntries ? perfEntries[0] : null;
        var navigationJson = entry
          ? entry.toJSON()
          : {
              responseEnd: 0,
              domInteractive: 0,
              requestStart: 0,
              connectEnd: 0,
              domainLookupEnd: 0,
              unloadEventEnd: 0,
              domComplete: 0,
              loadEventEnd: 0,
            };

        return (
          (_ref = {
            isCookieEnabled: navigator.cookieEnabled ? 1 : 0,
            screenColorDepth: window.screen.colorDepth + '-bit',

            // 设备信息
            pl: deviceInfo.platform, // 设备品牌 brand
            plv: deviceInfo.platformVersion, // 设备型号 model
            s: navigator.platform, // 操作系统名称 system
            sv: deviceInfo.platformVersion, // 操作系统版本 systemVersion
            dpr: window.document.documentElement.clientWidth + '*' + window.document.documentElement.clientHeight, // 屏幕分辨率 devicePixelRatio
            sr: screen.width + 'x' + screen.height, // 屏幕宽高
            pr: devicePixelRatio, // 像素比 pixelRatio
            GCM: graphicsCardInfo.GCM, // 显卡厂商 GCM
            GRE: graphicsCardInfo.GRE, // 显卡渲染引擎  GRE
            dm: navigator.deviceMemory, // 设备内存大小 device memory
            sc: window.screen.colorDepth, // 屏幕颜色 screenColor
            la: navigator.language, // 系统语言 language

            // 网络信息
            ne: '', // 网路错误日志 networkErrMsg
            h: location.host, // 域名 hosting
            dl: navigator.connection.downlink, // 下载速度 download
            ip: '', // 本地ip clientIp
            is: window.navigator.onLine,
          }),
          (_ref['pl'] = navigator.language),
          (_ref.pt = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
          (_ref.fz = document.body.currentStyle || document.defaultView.getComputedStyle(document.body, '').fontSize),
          (_ref.lt = Number(navigationJson.loadEventEnd.toFixed(2))),
          (_ref.drt = Number(navigationJson.domComplete.toFixed(2))),
          (_ref.rt = Number(navigationJson.unloadEventEnd.toFixed(2))),
          (_ref.ct = ''),
          (_ref.dt = Number(navigationJson.domainLookupEnd.toFixed(2))),
          (_ref.tt = Number(navigationJson.connectEnd.toFixed(2))),
          (_ref.rst = Number(navigationJson.responseEnd.toFixed(2))),
          (_ref.rqt = Number(navigationJson.requestStart.toFixed(2))),
          (_ref.dit = Number(navigationJson.domInteractive.toFixed(2))),
          (_ref.st = ''),
          (_ref.ut = Number(navigationJson.responseEnd.toFixed(2)) - Number(navigationJson.requestStart.toFixed(2))),
          (_ref.ul = window.location.href),
          (_ref.pn = window.document.title),
          (_ref.eid = 'Pageview'),
          _ref
        );
      };

      module.exports = { getBrowserBaseInfo: getBrowserBaseInfo };
    },
  });
  this.require.define({
    'lib/browser/flash-version': function (exports, require, module) {
      'use strict';

      // 获取浏览器的flash版本

      /* global document ActiveXObject navigator */

      module.exports = function () {
        var flashVersion = 0; // flash版本

        if (document.all) {
          try {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
              var VSwf = swf.GetVariable('$version');
              flashVersion = parseInt(VSwf.split(' ')[1].split(',')[0], 10);
            }
          } catch (e) {}
        } else if (navigator.plugins && navigator.plugins.length > 0) {
          var _swf = navigator.plugins['Shockwave Flash'];
          if (_swf) {
            var words = _swf.description.split(' ');
            for (var i = 0; i < words.length; ++i) {
              if (isNaN(parseInt(words[i], 10))) continue;
              flashVersion = parseInt(words[i], 10);
            }
          }
        }
        return flashVersion;
      };
    },
  });
  this.require.define({
    'lib/browser/is-cookie-enabled': function (exports, require, module) {
      'use strict';

      // 获取浏览器cookie是否启用
      module.exports = function () {
        return navigator.cookieEnabled ? 1 : 0;
      };
    },
  });
  this.require.define({
    'lib/browser/screen-color-depth': function (exports, require, module) {
      'use strict';

      // 获取浏览器色深
      module.exports = function () {
        return window.screen.colorDepth + '-bit';
      };
    },
  });
  this.require.define({
    'lib/browser/screen-size': function (exports, require, module) {
      'use strict';

      // 获取屏幕分辨率
      module.exports = function () {
        var _window = window,
          screen = _window.screen;

        return screen.width + 'x' + screen.height;
      };
    },
  });
  this.require.define({
    'lib/browser/user-agent': function (exports, require, module) {
      'use strict';

      // 获取浏览器ua
      module.exports = function () {
        return navigator.userAgent;
      };
    },
  });
  this.require.define({
    'lib/browser/user-language': function (exports, require, module) {
      'use strict';

      // 获取浏览器语言
      module.exports = function () {
        return navigator.language || navigator.userLanguage;
      };
    },
  });
  this.require.define({
    'lib/browser/window-size': function (exports, require, module) {
      'use strict';

      // 获取浏览器窗口大小
      module.exports = function () {
        var _document = document,
          body = _document.body,
          documentElement = _document.documentElement;

        var width = window.innerWidth || documentElement.clientWidth || body.clientWidth;
        var height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
        return width + 'x' + height;
      };
    },
  });
  this.require.define({
    'lib/document/document-character-set': function (exports, require, module) {
      'use strict';

      // 获取文档编码
      module.exports = function () {
        var d = document;
        return d.characterSet || d.charset || d.inputEncoding;
      };
    },
  });
  this.require.define({
    'lib/document/document-domain': function (exports, require, module) {
      'use strict';

      // 获取当前网站域名
      module.exports = function () {
        return document.domain;
      };
    },
  });
  this.require.define({
    'lib/document/document-keywords': function (exports, require, module) {
      'use strict';

      // 获取当前页面关键字
      module.exports = function () {
        var metas = document.getElementsByTagName('meta');
        var keywords = '';

        for (var i = 0; i < metas.length; i++) {
          if (metas[i].name === 'keywords') {
            keywords = metas[i].content;
            break;
          }
        }

        return keywords;
      };
    },
  });
  this.require.define({
    'lib/document/document-pathname': function (exports, require, module) {
      'use strict';

      // 获取当前页面路径
      module.exports = function () {
        return window.location.pathname;
      };
    },
  });
  this.require.define({
    'lib/document/document-referrer': function (exports, require, module) {
      'use strict';

      // 获取当前页面来源
      module.exports = function () {
        return document.referrer;
      };
    },
  });
  this.require.define({
    'lib/document/document-size': function (exports, require, module) {
      'use strict';

      // 获取当前文档大小

      /* global document */

      module.exports = function () {
        var _document = document,
          body = _document.body,
          documentElement = _document.documentElement;

        var width = Math.max(
          body.scrollWidth,
          body.offsetWidth,
          documentElement.clientWidth,
          documentElement.scrollWidth,
          documentElement.offsetWidth
        );
        var height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          documentElement.clientHeight,
          documentElement.scrollHeight,
          documentElement.offsetHeight
        );
        return width + 'x' + height;
      };
    },
  });
  this.require.define({
    'lib/document/document-title': function (exports, require, module) {
      'use strict';

      // 获取当前页面标题
      module.exports = function () {
        return document.title;
      };
    },
  });
  this.require.define({
    'lib/document/document-url': function (exports, require, module) {
      'use strict';

      // 获取当前页面url
      module.exports = function () {
        return document.URL;
      };
    },
  });
  this.require.define({
    'lib/domain': function (exports, require, module) {
      'use strict';

      // 获取一级域名，优先是用户自己填写的domain，然后才是算出来的
      module.exports = function (opts) {
        var domainArray = window.location.hostname.split('.');
        return (
          (opts.udata && opts.udata.domain) ||
          (domainArray.length >= 2 ? window.location.hostname.split('.').slice(-2).join('.') : window.location.hostname)
        );
      };
    },
  });
  this.require.define({
    'lib/events/click': function (exports, require, module) {
      'use strict';

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var _require = require('../send-data'),
        requestData = _require.requestData;

      var _ = require('../helpers');

      var customPrivateParams = {};

      var clickHandle = function clickHandle(e) {
        // 获取元素相对于document的位置，各种兼容一下ie8，否则可以只用pageX,pageY
        var d = document;
        var scrollX = d.documentElement.scrollLeft || d.body.scrollLeft;
        var scrollY = d.documentElement.scrollTop || d.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        requestData(
          _extends(
            {
              eventId: 'Click',
              // xp: _.getXPath(e.target || e.srcElement).join("/"),
              elementLocation: x + ',' + y, // 元素位置 elementLocation
              elementId: e.target.id,
            },
            customPrivateParams
          )
        );
      };

      module.exports = function (_customPrivateParams) {
        if ('Click' in _customPrivateParams) {
          customPrivateParams = _customPrivateParams.Click;
        }
        _.addEventListener(document, 'click', function (e) {
          return clickHandle(e);
        });
      };
    },
  });
  this.require.define({
    'lib/events/error': function (exports, require, module) {
      'use strict';

      var _require = require('../send-data'),
        requestData = _require.requestData;

      var _ = require('../helpers');

      var errorHandle = function errorHandle(e) {
        var target = e.target;
        var source = '';
        switch (target.nodeName) {
          case 'LINK':
            source = target.href;
            break;
          case 'SCRIPT':
          case 'IMG':
            source = target.src;
            break;
        }

        requestData({
          eventId: 'Error',
          erType: 'resource-error',
          erMsg: source,
          // xp: _.getXPath(target || e.srcElement).join("/"),
          // nn: target.nodeName,
          // sr: source,
        });
      };

      module.exports = errorHandle;
    },
  });
  this.require.define({
    'lib/events/init': function (exports, require, module) {
      'use strict';

      var _require = require('../send-data'),
        requestBrowser = _require.requestBrowser;
      /* global Cookies */

      module.exports = function () {
        var base = require('../base-data').get();
        var taid = global.Cookies.get('taid');

        if (!taid) {
          global.Cookies.set('taid', base.cid, { expires: 730, domain: base.domain });
          requestBrowser();
        }
      };
    },
  });
  this.require.define({
    'lib/events/location': function (exports, require, module) {
      'use strict';

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var _require = require('../send-data'),
        requestData = _require.requestData;

      var spaTiming = require('../performance/spa-timing');
      var ie = require('../ie-version');
      var _ = require('../helpers');

      /* global window */

      function patchHistoryEvent() {
        var _Event = Event;
        var isIE9to11 = ie.version && ie.version >= 9 && ie.version <= 11;
        if (isIE9to11) {
          // see: https://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
          var CustomEvent = function CustomEvent(event, params) {
            params = params || {
              bubbles: false,
              cancelable: false,
              detail: undefined,
            };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
          };

          CustomEvent.prototype = window.Event.prototype;
          _Event = CustomEvent;
        }

        var listen = function listen(type) {
          var historyFunc = window.history[type];
          return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var f = historyFunc.apply(this, args);
            var e = new _Event(type);
            e.arguments = args;
            window.dispatchEvent(e);
            return f;
          };
        };
        return listen;
      }

      module.exports = function (_customPrivateParams) {
        var supportSpa = window.history.pushState;
        if (!supportSpa) {
          return;
        }
        var supportMutation = window.MutationObserver;
        var listen = patchHistoryEvent();
        window.history.pushState = listen('pushState');
        window.history.replaceState = listen('replaceState');
        var enable = false;
        var location = window.location;
        var oldHref = location.href;
        var enterPageTs = Date.now();

        var pageViewParams = 'Pageview' in _customPrivateParams ? _customPrivateParams['Pageview'] : {};
        var pageLeaveParams = 'PageLeave' in _customPrivateParams ? _customPrivateParams['PageLeave'] : {};

        var handleStateChange = function handleStateChange() {
          if (supportMutation) {
            enable = true;
            spaTiming.onEventStart();
          } else {
            requestData(
              _extends(
                {
                  eventId: 'Pageview',
                  refPageURL: oldHref, // 前向页面URL
                  navigation: 0,
                },
                pageViewParams
              )
            );
            requestData(
              _extends(
                {
                  eventId: 'PageLeave',
                  offDuration: Date.now() - enterPageTs,
                },
                pageLeaveParams
              )
            );
            oldHref = location.href;
            enterPageTs = Date.now();
          }
        };
        _.addEventListener(window, 'pushState', handleStateChange);
        _.addEventListener(window, 'replaceState', handleStateChange);
        _.addEventListener(window, 'popstate', handleStateChange);

        if (supportMutation) {
          var MutationObserver = window.MutationObserver;
          var o = new MutationObserver(function () {
            if (enable) {
              var loadTime = spaTiming.onEventEnd();
              enable = false;
              requestData(
                _extends(
                  {
                    eventId: 'Pageview',
                    refPageURL: oldHref, // 前向页面URL
                    navigation: loadTime,
                  },
                  pageViewParams
                )
              );
              requestData(
                _extends(
                  {
                    eventId: 'PageLeave',
                    offDuration: Date.now() - enterPageTs,
                  },
                  pageLeaveParams
                )
              );
              oldHref = location.href;
              enterPageTs = Date.now();
            }
          });
          o.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
          });
        }
      };
    },
  });
  this.require.define({
    'lib/events/onload': function (exports, require, module) {
      'use strict';

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var _require = require('../send-data'),
        requestData = _require.requestData;

      var _ = require('../helpers');

      /* global window */

      module.exports = function (_customPrivateParams) {
        _.windowOnload(window, function () {
          setTimeout(function () {
            var perfEntries = performance ? performance.getEntriesByType('navigation') : null;
            var entry = perfEntries ? perfEntries[0] : null;
            var navigationJson = entry
              ? entry.toJSON()
              : {
                  responseEnd: 0,
                  domInteractive: 0,
                  requestStart: 0,
                  connectEnd: 0,
                  domainLookupEnd: 0,
                  unloadEventEnd: 0,
                  domComplete: 0,
                  loadEventEnd: 0,
                };

            var customPrivateParams = 'AppStart' in _customPrivateParams ? _customPrivateParams['AppStart'] : {};

            requestData(
              _extends(
                {
                  eventId: 'AppStart', // 事件Id
                  loadTime: Number(navigationJson.loadEventEnd.toFixed(2)), // 页面加载时间
                  DomReadyTime: Number(navigationJson.domContentLoadedEventEnd.toFixed(2)), // DOM ready 时间
                  redirectTime: Number((navigationJson.redirectEnd - navigationJson.redirectStart).toFixed(2)), // 跳转响应时间
                  cacheTime: Number((navigationJson.domainLookupStart - navigationJson.fetchStart).toFixed(2)), // 缓存时间
                  DNSTime: Number((navigationJson.domainLookupEnd - navigationJson.domainLookupStart).toFixed(2)), // DNS 时间
                  connectTime: Number((navigationJson.connectEnd - navigationJson.connectStart).toFixed(2)), // TCP连接时间
                  responseTime: Number((navigationJson.responseEnd - navigationJson.responseStart).toFixed(2)), // 服务器返回时间 responseTime
                  requestTime: Number((navigationJson.responseStart - navigationJson.requestStart).toFixed(2)), // 服务器响应时间 requestTime
                  domInteractiveTime: Number(navigationJson.domInteractive.toFixed(2)), // DOM 可交互 时间
                  scriptExecutionTime: Number(
                    (navigationJson.loadEventEnd - navigationJson.domContentLoadedEventStart).toFixed(2)
                  ), // 脚本执行时间 大概
                  devicePixelRatio:
                    window.document.documentElement.clientWidth + '*' + window.document.documentElement.clientHeight, // 屏幕分辨率
                  pixelRatio: window.devicePixelRatio, // 像素比
                  language: navigator.language, // 语言
                  cookieEnabled: navigator.cookieEnabled ? 1 : 0, // 是否禁用cookie
                  trackEnabled: 0, // 是否禁用跟踪
                  adBlockingEnabled: 0,
                },
                customPrivateParams
              )
            );
          }, 0);
        });
      };
    },
  });
  this.require.define({
    'lib/events/unload': function (exports, require, module) {
      'use strict';

      var _ = require('../helpers');

      var _require = require('../send-data'),
        requestDocument = _require.requestDocument;

      /* global window */

      module.exports = function () {
        var onLoadTime = void 0;

        _.windowOnload(window, function () {
          setTimeout(function () {
            onLoadTime = Date.now();
          }, 0);
        });

        _.addEventListener(window, 'beforeunload', function () {
          var tp = Math.round((Date.now() - onLoadTime) / 1000);
          requestDocument({ tp: tp, lc: 0 });
        });
      };
    },
  });
  this.require.define({
    'lib/finger-print': function (exports, require, module) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (obj) {
              return typeof obj;
            }
          : function (obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      /**
       * FingerprintJS v3.3.0 - Copyright (c) FingerprintJS, Inc, 2021 (https://fingerprintjs.com)
       * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
       *
       * This software contains code from open-source projects:
       * MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
       */

      var FingerprintJS = (function (e) {
        'use strict';

        var _t = function t() {
          return (_t =
            Object.assign ||
            function (e) {
              for (var t, n = 1, r = arguments.length; n < r; n++) {
                for (var a in (t = arguments[n])) {
                  Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                }
              }
              return e;
            }).apply(this, arguments);
        };
        function n(e, t, n, r) {
          return new (n || (n = Promise))(function (a, o) {
            function i(e) {
              try {
                u(r.next(e));
              } catch (t) {
                o(t);
              }
            }
            function c(e) {
              try {
                u(r.throw(e));
              } catch (t) {
                o(t);
              }
            }
            function u(e) {
              var t;
              e.done
                ? a(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(i, c);
            }
            u((r = r.apply(e, t || [])).next());
          });
        }
        function r(e, t) {
          var n,
            r,
            a,
            o,
            i = {
              label: 0,
              sent: function sent() {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: c(0), throw: c(1), return: c(2) }),
            'function' == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function c(o) {
            return function (c) {
              return (function (o) {
                if (n) throw new TypeError('Generator is already executing.');
                for (; i; ) {
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (a = 2 & o[0] ? r.return : o[0] ? r.throw || ((a = r.return) && a.call(r), 0) : r.next) &&
                        !(a = a.call(r, o[1])).done)
                    )
                      return a;
                    switch (((r = 0), a && (o = [2 & o[0], a.value]), o[0])) {
                      case 0:
                      case 1:
                        a = o;
                        break;
                      case 4:
                        return i.label++, { value: o[1], done: !1 };
                      case 5:
                        i.label++, (r = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = i.ops.pop()), i.trys.pop();
                        continue;
                      default:
                        if (!((a = i.trys), (a = a.length > 0 && a[a.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                          i = 0;
                          continue;
                        }
                        if (3 === o[0] && (!a || (o[1] > a[0] && o[1] < a[3]))) {
                          i.label = o[1];
                          break;
                        }
                        if (6 === o[0] && i.label < a[1]) {
                          (i.label = a[1]), (a = o);
                          break;
                        }
                        if (a && i.label < a[2]) {
                          (i.label = a[2]), i.ops.push(o);
                          break;
                        }
                        a[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    o = t.call(e, i);
                  } catch (c) {
                    (o = [6, c]), (r = 0);
                  } finally {
                    n = a = 0;
                  }
                }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, c]);
            };
          }
        }
        function a() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++) {
            e += arguments[t].length;
          }
          var r = Array(e),
            a = 0;
          for (t = 0; t < n; t++) {
            for (var o = arguments[t], i = 0, c = o.length; i < c; i++, a++) {
              r[a] = o[i];
            }
          }
          return r;
        }
        function o(e, t) {
          return new Promise(function (n) {
            return setTimeout(n, e, t);
          });
        }
        function i(e, t) {
          try {
            var n = e();
            (r = n) && 'function' == typeof r.then
              ? n.then(
                  function (e) {
                    return t(!0, e);
                  },
                  function (e) {
                    return t(!1, e);
                  }
                )
              : t(!0, n);
          } catch (a) {
            t(!1, a);
          }
          var r;
        }
        function c(e, t, a) {
          return (
            void 0 === a && (a = 16),
            n(this, void 0, void 0, function () {
              var n, i, c;
              return r(this, function (r) {
                switch (r.label) {
                  case 0:
                    (n = Date.now()), (i = 0), (r.label = 1);
                  case 1:
                    return i < e.length
                      ? (t(e[i], i), (c = Date.now()) >= n + a ? ((n = c), [4, o(0)]) : [3, 3])
                      : [3, 4];
                  case 2:
                    r.sent(), (r.label = 3);
                  case 3:
                    return ++i, [3, 1];
                  case 4:
                    return [2];
                }
              });
            })
          );
        }
        function u(e, t) {
          (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
            (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
          var n = [0, 0, 0, 0];
          return (
            (n[3] += e[3] + t[3]),
            (n[2] += n[3] >>> 16),
            (n[3] &= 65535),
            (n[2] += e[2] + t[2]),
            (n[1] += n[2] >>> 16),
            (n[2] &= 65535),
            (n[1] += e[1] + t[1]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[0] += e[0] + t[0]),
            (n[0] &= 65535),
            [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
          );
        }
        function s(e, t) {
          (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]]),
            (t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]);
          var n = [0, 0, 0, 0];
          return (
            (n[3] += e[3] * t[3]),
            (n[2] += n[3] >>> 16),
            (n[3] &= 65535),
            (n[2] += e[2] * t[3]),
            (n[1] += n[2] >>> 16),
            (n[2] &= 65535),
            (n[2] += e[3] * t[2]),
            (n[1] += n[2] >>> 16),
            (n[2] &= 65535),
            (n[1] += e[1] * t[3]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[1] += e[2] * t[2]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[1] += e[3] * t[1]),
            (n[0] += n[1] >>> 16),
            (n[1] &= 65535),
            (n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0]),
            (n[0] &= 65535),
            [(n[0] << 16) | n[1], (n[2] << 16) | n[3]]
          );
        }
        function l(e, t) {
          return 32 === (t %= 64)
            ? [e[1], e[0]]
            : t < 32
            ? [(e[0] << t) | (e[1] >>> (32 - t)), (e[1] << t) | (e[0] >>> (32 - t))]
            : ((t -= 32), [(e[1] << t) | (e[0] >>> (32 - t)), (e[0] << t) | (e[1] >>> (32 - t))]);
        }
        function d(e, t) {
          return 0 === (t %= 64) ? e : t < 32 ? [(e[0] << t) | (e[1] >>> (32 - t)), e[1] << t] : [e[1] << (t - 32), 0];
        }
        function f(e, t) {
          return [e[0] ^ t[0], e[1] ^ t[1]];
        }
        function h(e) {
          return (
            (e = f(e, [0, e[0] >>> 1])),
            (e = f((e = s(e, [4283543511, 3981806797])), [0, e[0] >>> 1])),
            (e = f((e = s(e, [3301882366, 444984403])), [0, e[0] >>> 1]))
          );
        }
        function v(e, t) {
          t = t || 0;
          var n,
            r = (e = e || '').length % 16,
            a = e.length - r,
            o = [0, t],
            i = [0, t],
            c = [0, 0],
            v = [0, 0],
            p = [2277735313, 289559509],
            m = [1291169091, 658871167];
          for (n = 0; n < a; n += 16) {
            (c = [
              (255 & e.charCodeAt(n + 4)) |
                ((255 & e.charCodeAt(n + 5)) << 8) |
                ((255 & e.charCodeAt(n + 6)) << 16) |
                ((255 & e.charCodeAt(n + 7)) << 24),
              (255 & e.charCodeAt(n)) |
                ((255 & e.charCodeAt(n + 1)) << 8) |
                ((255 & e.charCodeAt(n + 2)) << 16) |
                ((255 & e.charCodeAt(n + 3)) << 24),
            ]),
              (v = [
                (255 & e.charCodeAt(n + 12)) |
                  ((255 & e.charCodeAt(n + 13)) << 8) |
                  ((255 & e.charCodeAt(n + 14)) << 16) |
                  ((255 & e.charCodeAt(n + 15)) << 24),
                (255 & e.charCodeAt(n + 8)) |
                  ((255 & e.charCodeAt(n + 9)) << 8) |
                  ((255 & e.charCodeAt(n + 10)) << 16) |
                  ((255 & e.charCodeAt(n + 11)) << 24),
              ]),
              (c = l((c = s(c, p)), 31)),
              (o = u((o = l((o = f(o, (c = s(c, m)))), 27)), i)),
              (o = u(s(o, [0, 5]), [0, 1390208809])),
              (v = l((v = s(v, m)), 33)),
              (i = u((i = l((i = f(i, (v = s(v, p)))), 31)), o)),
              (i = u(s(i, [0, 5]), [0, 944331445]));
          }
          switch (((c = [0, 0]), (v = [0, 0]), r)) {
            case 15:
              v = f(v, d([0, e.charCodeAt(n + 14)], 48));
            case 14:
              v = f(v, d([0, e.charCodeAt(n + 13)], 40));
            case 13:
              v = f(v, d([0, e.charCodeAt(n + 12)], 32));
            case 12:
              v = f(v, d([0, e.charCodeAt(n + 11)], 24));
            case 11:
              v = f(v, d([0, e.charCodeAt(n + 10)], 16));
            case 10:
              v = f(v, d([0, e.charCodeAt(n + 9)], 8));
            case 9:
              (v = s((v = f(v, [0, e.charCodeAt(n + 8)])), m)), (i = f(i, (v = s((v = l(v, 33)), p))));
            case 8:
              c = f(c, d([0, e.charCodeAt(n + 7)], 56));
            case 7:
              c = f(c, d([0, e.charCodeAt(n + 6)], 48));
            case 6:
              c = f(c, d([0, e.charCodeAt(n + 5)], 40));
            case 5:
              c = f(c, d([0, e.charCodeAt(n + 4)], 32));
            case 4:
              c = f(c, d([0, e.charCodeAt(n + 3)], 24));
            case 3:
              c = f(c, d([0, e.charCodeAt(n + 2)], 16));
            case 2:
              c = f(c, d([0, e.charCodeAt(n + 1)], 8));
            case 1:
              (c = s((c = f(c, [0, e.charCodeAt(n)])), p)), (o = f(o, (c = s((c = l(c, 31)), m))));
          }
          return (
            (o = u((o = f(o, [0, e.length])), (i = f(i, [0, e.length])))),
            (i = u(i, o)),
            (o = u((o = h(o)), (i = h(i)))),
            (i = u(i, o)),
            ('00000000' + (o[0] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (o[1] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (i[0] >>> 0).toString(16)).slice(-8) +
              ('00000000' + (i[1] >>> 0).toString(16)).slice(-8)
          );
        }
        function p(e) {
          return parseInt(e);
        }
        function m(e) {
          return parseFloat(e);
        }
        function g(e, t) {
          return 'number' == typeof e && isNaN(e) ? t : e;
        }
        function b(e) {
          return e.reduce(function (e, t) {
            return e + (t ? 1 : 0);
          }, 0);
        }
        function w(e, t) {
          if ((void 0 === t && (t = 1), Math.abs(t) >= 1)) return Math.round(e / t) * t;
          var n = 1 / t;
          return Math.round(e * n) / n;
        }
        function y(e) {
          return e && 'object' == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && 'message' in e
            ? e
            : { message: e };
        }
        function k(e, t, a) {
          var u = Object.keys(e).filter(function (e) {
              return !(function (e, t) {
                for (var n = 0, r = e.length; n < r; ++n) {
                  if (e[n] === t) return !0;
                }
                return !1;
              })(a, e);
            }),
            s = Array(u.length);
          return (
            c(u, function (n, r) {
              s[r] = (function (e, t) {
                var n = function n(e) {
                    return 'function' != typeof e;
                  },
                  r = new Promise(function (r) {
                    var a = Date.now();
                    i(e.bind(null, t), function () {
                      for (var e = [], t = 0; t < arguments.length; t++) {
                        e[t] = arguments[t];
                      }
                      var o = Date.now() - a;
                      if (!e[0])
                        return r(function () {
                          return { error: y(e[1]), duration: o };
                        });
                      var c = e[1];
                      if (n(c))
                        return r(function () {
                          return { value: c, duration: o };
                        });
                      r(function () {
                        return new Promise(function (e) {
                          var t = Date.now();
                          i(c, function () {
                            for (var n = [], r = 0; r < arguments.length; r++) {
                              n[r] = arguments[r];
                            }
                            var a = o + Date.now() - t;
                            if (!n[0]) return e({ error: y(n[1]), duration: a });
                            e({ value: n[1], duration: a });
                          });
                        });
                      });
                    });
                  });
                return function () {
                  return r.then(function (e) {
                    return e();
                  });
                };
              })(e[n], t);
            }),
            function () {
              return n(this, void 0, void 0, function () {
                var e, t, n, a, i, l;
                return r(this, function (d) {
                  switch (d.label) {
                    case 0:
                      for (e = {}, t = 0, n = u; t < n.length; t++) {
                        (a = n[t]), (e[a] = void 0);
                      }
                      (i = Array(u.length)),
                        (l = function l() {
                          var t;
                          return r(this, function (n) {
                            switch (n.label) {
                              case 0:
                                return (
                                  (t = !0),
                                  [
                                    4,
                                    c(u, function (n, r) {
                                      i[r] ||
                                        (s[r]
                                          ? (i[r] = s[r]().then(function (t) {
                                              return (e[n] = t);
                                            }))
                                          : (t = !1));
                                    }),
                                  ]
                                );
                              case 1:
                                return n.sent(), t ? [2, 'break'] : [4, o(1)];
                              case 2:
                                return n.sent(), [2];
                            }
                          });
                        }),
                        (d.label = 1);
                    case 1:
                      return [5, l()];
                    case 2:
                      if ('break' === d.sent()) return [3, 4];
                      d.label = 3;
                    case 3:
                      return [3, 1];
                    case 4:
                      return [4, Promise.all(i)];
                    case 5:
                      return d.sent(), [2, e];
                  }
                });
              });
            }
          );
        }
        function C() {
          var e = window,
            t = navigator;
          return (
            b([
              'MSCSSMatrix' in e,
              'msSetImmediate' in e,
              'msIndexedDB' in e,
              'msMaxTouchPoints' in t,
              'msPointerEnabled' in t,
            ]) >= 4
          );
        }
        function A() {
          var e = window,
            t = navigator;
          return b(['msWriteProfilerMark' in e, 'MSStream' in e, 'msLaunchUri' in t, 'msSaveBlob' in t]) >= 3 && !C();
        }
        function S() {
          var e = window,
            t = navigator;
          return (
            b([
              'webkitPersistentStorage' in t,
              'webkitTemporaryStorage' in t,
              0 === t.vendor.indexOf('Google'),
              'webkitResolveLocalFileSystemURL' in e,
              'BatteryManager' in e,
              'webkitMediaStream' in e,
              'webkitSpeechGrammar' in e,
            ]) >= 5
          );
        }
        function x() {
          var e = window,
            t = navigator;
          return (
            b([
              'ApplePayError' in e,
              'CSSPrimitiveValue' in e,
              'Counter' in e,
              0 === t.vendor.indexOf('Apple'),
              'getStorageUpdates' in t,
              'WebKitMediaKeys' in e,
            ]) >= 4
          );
        }
        function M() {
          var e = window;
          return (
            b(['safari' in e, !('DeviceMotionEvent' in e), !('ongestureend' in e), !('standalone' in navigator)]) >= 3
          );
        }
        function P() {
          var e,
            t,
            n = window;
          return (
            b([
              'buildID' in navigator,
              'MozAppearance' in
                (null !== (t = null === (e = document.documentElement) || void 0 === e ? void 0 : e.style) &&
                void 0 !== t
                  ? t
                  : {}),
              'MediaRecorderErrorEvent' in n,
              'mozInnerScreenX' in n,
              'CSSMozDocumentRule' in n,
              'CanvasCaptureMediaStream' in n,
            ]) >= 4
          );
        }
        function T() {
          var e = document;
          return (
            e.fullscreenElement || e.msFullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement || null
          );
        }
        function _() {
          var e = S(),
            t = P();
          if (!e && !t) return !1;
          var n = window;
          return (
            b([
              'onorientationchange' in n,
              'orientation' in n,
              e && 'SharedWorker' in n,
              t && /android/i.test(navigator.appVersion),
            ]) >= 2
          );
        }
        function E(e) {
          var t = new Error(e);
          return (t.name = e), t;
        }
        function D(e, t, a) {
          var i, c, u;
          return (
            void 0 === a && (a = 50),
            n(this, void 0, void 0, function () {
              var n, s;
              return r(this, function (r) {
                switch (r.label) {
                  case 0:
                    (n = document), (r.label = 1);
                  case 1:
                    return n.body ? [3, 3] : [4, o(a)];
                  case 2:
                    return r.sent(), [3, 1];
                  case 3:
                    (s = n.createElement('iframe')), (r.label = 4);
                  case 4:
                    return (
                      r.trys.push([4, , 10, 11]),
                      [
                        4,
                        new Promise(function (e, r) {
                          (s.onload = e), (s.onerror = r);
                          var a = s.style;
                          a.setProperty('display', 'block', 'important'),
                            (a.position = 'absolute'),
                            (a.top = '0'),
                            (a.left = '0'),
                            (a.visibility = 'hidden'),
                            t && 'srcdoc' in s ? (s.srcdoc = t) : (s.src = 'about:blank'),
                            n.body.appendChild(s);
                          var o = function o() {
                            var t, n;
                            'complete' ===
                            (null === (n = null === (t = s.contentWindow) || void 0 === t ? void 0 : t.document) ||
                            void 0 === n
                              ? void 0
                              : n.readyState)
                              ? e()
                              : setTimeout(o, 10);
                          };
                          o();
                        }),
                      ]
                    );
                  case 5:
                    r.sent(), (r.label = 6);
                  case 6:
                    return (
                      null === (c = null === (i = s.contentWindow) || void 0 === i ? void 0 : i.document) ||
                      void 0 === c
                        ? void 0
                        : c.body
                    )
                      ? [3, 8]
                      : [4, o(a)];
                  case 7:
                    return r.sent(), [3, 6];
                  case 8:
                    return [4, e(s, s.contentWindow)];
                  case 9:
                    return [2, r.sent()];
                  case 10:
                    return null === (u = s.parentNode) || void 0 === u || u.removeChild(s), [7];
                  case 11:
                    return [2];
                }
              });
            })
          );
        }
        function L(e) {
          for (
            var t = (function (e) {
                for (
                  var t,
                    n,
                    r = "Unexpected syntax '" + e + "'",
                    a = /^\s*([a-z-]*)(.*)$/i.exec(e),
                    o = a[1] || void 0,
                    i = {},
                    c = /([.:#][\w-]+|\[.+?\])/gi,
                    u = function u(e, t) {
                      (i[e] = i[e] || []), i[e].push(t);
                    };
                  ;

                ) {
                  var s = c.exec(a[2]);
                  if (!s) break;
                  var l = s[0];
                  switch (l[0]) {
                    case '.':
                      u('class', l.slice(1));
                      break;
                    case '#':
                      u('id', l.slice(1));
                      break;
                    case '[':
                      var d = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(l);
                      if (!d) throw new Error(r);
                      u(d[1], null !== (n = null !== (t = d[4]) && void 0 !== t ? t : d[5]) && void 0 !== n ? n : '');
                      break;
                    default:
                      throw new Error(r);
                  }
                }
                return [o, i];
              })(e),
              n = t[0],
              r = t[1],
              a = document.createElement(null != n ? n : 'div'),
              o = 0,
              i = Object.keys(r);
            o < i.length;
            o++
          ) {
            var c = i[o];
            a.setAttribute(c, r[c].join(' '));
          }
          return a;
        }
        var I = ['monospace', 'sans-serif', 'serif'],
          B = [
            'sans-serif-thin',
            'ARNO PRO',
            'Agency FB',
            'Arabic Typesetting',
            'Arial Unicode MS',
            'AvantGarde Bk BT',
            'BankGothic Md BT',
            'Batang',
            'Bitstream Vera Sans Mono',
            'Calibri',
            'Century',
            'Century Gothic',
            'Clarendon',
            'EUROSTILE',
            'Franklin Gothic',
            'Futura Bk BT',
            'Futura Md BT',
            'GOTHAM',
            'Gill Sans',
            'HELV',
            'Haettenschweiler',
            'Helvetica Neue',
            'Humanst521 BT',
            'Leelawadee',
            'Letter Gothic',
            'Levenim MT',
            'Lucida Bright',
            'Lucida Sans',
            'Menlo',
            'MS Mincho',
            'MS Outlook',
            'MS Reference Specialty',
            'MS UI Gothic',
            'MT Extra',
            'MYRIAD PRO',
            'Marlett',
            'Meiryo UI',
            'Microsoft Uighur',
            'Minion Pro',
            'Monotype Corsiva',
            'PMingLiU',
            'Pristina',
            'SCRIPTINA',
            'Segoe UI Light',
            'Serifa',
            'SimHei',
            'Small Fonts',
            'Staccato222 BT',
            'TRAJAN PRO',
            'Univers CE 55 Medium',
            'Vrinda',
            'ZWAdobeF',
          ];
        function F(e) {
          return e.rect(0, 0, 10, 10), e.rect(2, 2, 6, 6), !e.isPointInPath(5, 5, 'evenodd');
        }
        function z(e, t) {
          (e.width = 240),
            (e.height = 60),
            (t.textBaseline = 'alphabetic'),
            (t.fillStyle = '#f60'),
            t.fillRect(100, 1, 62, 20),
            (t.fillStyle = '#069'),
            (t.font = '11pt "Times New Roman"');
          var n = 'Cwm fjordbank gly ' + String.fromCharCode(55357, 56835);
          return (
            t.fillText(n, 2, 15),
            (t.fillStyle = 'rgba(102, 204, 0, 0.2)'),
            (t.font = '18pt Arial'),
            t.fillText(n, 4, 45),
            G(e)
          );
        }
        function O(e, t) {
          (e.width = 122), (e.height = 110), (t.globalCompositeOperation = 'multiply');
          for (
            var n = 0,
              r = [
                ['#f2f', 40, 40],
                ['#2ff', 80, 40],
                ['#ff2', 60, 80],
              ];
            n < r.length;
            n++
          ) {
            var a = r[n],
              o = a[0],
              i = a[1],
              c = a[2];
            (t.fillStyle = o), t.beginPath(), t.arc(i, c, 40, 0, 2 * Math.PI, !0), t.closePath(), t.fill();
          }
          return (
            (t.fillStyle = '#f9c'),
            t.arc(60, 60, 60, 0, 2 * Math.PI, !0),
            t.arc(60, 60, 20, 0, 2 * Math.PI, !0),
            t.fill('evenodd'),
            G(e)
          );
        }
        function G(e) {
          return e.toDataURL();
        }
        var R, j;
        function W() {
          var e = this;
          return (
            (function () {
              if (void 0 === j) {
                var e = function e() {
                  var t = U();
                  N(t) ? (j = setTimeout(e, 2500)) : ((R = t), (j = void 0));
                };
                e();
              }
            })(),
            function () {
              return n(e, void 0, void 0, function () {
                var e;
                return r(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return N((e = U()))
                        ? R
                          ? [2, a(R)]
                          : T()
                          ? [
                              4,
                              ((n = document),
                              (
                                n.exitFullscreen ||
                                n.msExitFullscreen ||
                                n.mozCancelFullScreen ||
                                n.webkitExitFullscreen
                              ).call(n)),
                            ]
                          : [3, 2]
                        : [3, 2];
                    case 1:
                      t.sent(), (e = U()), (t.label = 2);
                    case 2:
                      return N(e) || (R = e), [2, e];
                  }
                  var n;
                });
              });
            }
          );
        }
        function U() {
          var e = screen;
          return [
            g(m(e.availTop), null),
            g(m(e.width) - m(e.availWidth) - g(m(e.availLeft), 0), null),
            g(m(e.height) - m(e.availHeight) - g(m(e.availTop), 0), null),
            g(m(e.availLeft), null),
          ];
        }
        function N(e) {
          for (var t = 0; t < 4; ++t) {
            if (e[t]) return !1;
          }
          return !0;
        }
        var H = {},
          q = Object.keys(H);
        function J(e) {
          var t;
          return n(this, void 0, void 0, function () {
            var n, a, i, c, u, s, l;
            return r(this, function (r) {
              switch (r.label) {
                case 0:
                  for (
                    n = document, a = n.createElement('div'), i = new Array(e.length), c = {}, V(a), l = 0;
                    l < e.length;
                    ++l
                  ) {
                    (u = L(e[l])), V((s = n.createElement('div'))), s.appendChild(u), a.appendChild(s), (i[l] = u);
                  }
                  r.label = 1;
                case 1:
                  return n.body ? [3, 3] : [4, o(50)];
                case 2:
                  return r.sent(), [3, 1];
                case 3:
                  n.body.appendChild(a);
                  try {
                    for (l = 0; l < e.length; ++l) {
                      i[l].offsetParent || (c[e[l]] = !0);
                    }
                  } finally {
                    null === (t = a.parentNode) || void 0 === t || t.removeChild(a);
                  }
                  return [2, c];
              }
            });
          });
        }
        function V(e) {
          e.style.setProperty('display', 'block', 'important');
        }
        function $(e) {
          return matchMedia('(inverted-colors: ' + e + ')').matches;
        }
        function K(e) {
          return matchMedia('(forced-colors: ' + e + ')').matches;
        }
        function X(e) {
          return matchMedia('(prefers-contrast: ' + e + ')').matches;
        }
        function Y(e) {
          return matchMedia('(prefers-reduced-motion: ' + e + ')').matches;
        }
        function Z(e) {
          return matchMedia('(dynamic-range: ' + e + ')').matches;
        }
        var Q = Math,
          ee = function ee() {
            return 0;
          },
          te = Q.acos || ee,
          ne = Q.acosh || ee,
          re = Q.asin || ee,
          ae = Q.asinh || ee,
          oe = Q.atanh || ee,
          ie = Q.atan || ee,
          ce = Q.sin || ee,
          ue = Q.sinh || ee,
          se = Q.cos || ee,
          le = Q.cosh || ee,
          de = Q.tan || ee,
          fe = Q.tanh || ee,
          he = Q.exp || ee,
          ve = Q.expm1 || ee,
          pe = Q.log1p || ee,
          me = function me(e) {
            return Q.pow(Q.PI, e);
          },
          ge = function ge(e) {
            return Q.log(e + Q.sqrt(e * e + 1));
          },
          be = function be(e) {
            return Q.log((1 + e) / (1 - e)) / 2;
          },
          we = function we(e) {
            return Q.exp(e) - 1 / Q.exp(e) / 2;
          },
          ye = function ye(e) {
            return (Q.exp(e) + 1 / Q.exp(e)) / 2;
          },
          ke = function ke(e) {
            return Q.exp(e) - 1;
          },
          Ce = function Ce(e) {
            return (Q.exp(2 * e) - 1) / (Q.exp(2 * e) + 1);
          },
          Ae = function Ae(e) {
            return Q.log(1 + e);
          };
        var Se = {
          default: [],
          apple: [{ font: '-apple-system-body' }],
          serif: [{ fontFamily: 'serif' }],
          sans: [{ fontFamily: 'sans-serif' }],
          mono: [{ fontFamily: 'monospace' }],
          min: [{ fontSize: '1px' }],
          system: [{ fontFamily: 'system-ui' }],
        };
        var xe = {
          fonts: function fonts() {
            return D(function (e, t) {
              var n = t.document,
                r = n.body;
              r.style.fontSize = '48px';
              var a = n.createElement('div'),
                o = {},
                i = {},
                c = function c(e) {
                  var t = n.createElement('span'),
                    r = t.style;
                  return (
                    (r.position = 'absolute'),
                    (r.top = '0'),
                    (r.left = '0'),
                    (r.fontFamily = e),
                    (t.textContent = 'mmMwWLliI0O&1'),
                    a.appendChild(t),
                    t
                  );
                },
                u = I.map(c),
                s = (function () {
                  for (
                    var e = {},
                      t = function t(_t2) {
                        e[_t2] = I.map(function (e) {
                          return (function (e, t) {
                            return c("'" + e + "'," + t);
                          })(_t2, e);
                        });
                      },
                      n = 0,
                      r = B;
                    n < r.length;
                    n++
                  ) {
                    t(r[n]);
                  }
                  return e;
                })();
              r.appendChild(a);
              for (var l = 0; l < I.length; l++) {
                (o[I[l]] = u[l].offsetWidth), (i[I[l]] = u[l].offsetHeight);
              }
              return B.filter(function (e) {
                return (
                  (t = s[e]),
                  I.some(function (e, n) {
                    return t[n].offsetWidth !== o[e] || t[n].offsetHeight !== i[e];
                  })
                );
                var t;
              });
            });
          },
          domBlockers: function domBlockers(e) {
            var t = (void 0 === e ? {} : e).debug;
            return n(this, void 0, void 0, function () {
              var e, n, a;
              return r(this, function (r) {
                switch (r.label) {
                  case 0:
                    return x() || _()
                      ? [
                          4,
                          J(
                            (a = []).concat.apply(
                              a,
                              q.map(function (e) {
                                return H[e];
                              })
                            )
                          ),
                        ]
                      : [2, void 0];
                  case 1:
                    return (
                      (e = r.sent()),
                      t &&
                        (function (e) {
                          for (var t = 'DOM blockers debug:\n```', n = 0, r = q; n < r.length; n++) {
                            var a = r[n];
                            t += '\n' + a + ':';
                            for (var o = 0, i = H[a]; o < i.length; o++) {
                              var c = i[o];
                              t += '\n  ' + c + ' ' + (e[c] ? '🚫' : '➡️');
                            }
                          }
                          console.log(t + '\n```');
                        })(e),
                      (n = q.filter(function (t) {
                        var n = H[t];
                        return (
                          b(
                            n.map(function (t) {
                              return e[t];
                            })
                          ) >
                          0.6 * n.length
                        );
                      })).sort(),
                      [2, n]
                    );
                }
              });
            });
          },
          fontPreferences: function fontPreferences() {
            return (function (e, t) {
              void 0 === t && (t = 4e3);
              return D(function (n, r) {
                var o = r.document,
                  i = o.body,
                  c = i.style;
                (c.width = t + 'px'),
                  (c.webkitTextSizeAdjust = c.textSizeAdjust = 'none'),
                  S() ? (i.style.zoom = '' + 1 / r.devicePixelRatio) : x() && (i.style.zoom = 'reset');
                var u = o.createElement('div');
                return (
                  (u.textContent = a(Array((t / 20) << 0))
                    .map(function () {
                      return 'word';
                    })
                    .join(' ')),
                  i.appendChild(u),
                  e(o, i)
                );
              }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">');
            })(function (e, t) {
              for (var n = {}, r = {}, a = 0, o = Object.keys(Se); a < o.length; a++) {
                var i = o[a],
                  c = Se[i],
                  u = c[0],
                  s = void 0 === u ? {} : u,
                  l = c[1],
                  d = void 0 === l ? 'mmMwWLliI0fiflO&1' : l,
                  f = e.createElement('span');
                (f.textContent = d), (f.style.whiteSpace = 'nowrap');
                for (var h = 0, v = Object.keys(s); h < v.length; h++) {
                  var p = v[h],
                    m = s[p];
                  void 0 !== m && (f.style[p] = m);
                }
                (n[i] = f), t.appendChild(e.createElement('br')), t.appendChild(f);
              }
              for (var g = 0, b = Object.keys(Se); g < b.length; g++) {
                r[(i = b[g])] = n[i].getBoundingClientRect().width;
              }
              return r;
            });
          },
          audio: function audio() {
            var e = window,
              t = e.OfflineAudioContext || e.webkitOfflineAudioContext;
            if (!t) return -2;
            if (
              x() &&
              !M() &&
              !(function () {
                var e = window;
                return (
                  b([
                    'DOMRectList' in e,
                    'RTCPeerConnectionIceEvent' in e,
                    'SVGGeometryElement' in e,
                    'ontransitioncancel' in e,
                  ]) >= 3
                );
              })()
            )
              return -1;
            var n = new t(1, 5e3, 44100),
              r = n.createOscillator();
            (r.type = 'triangle'), (r.frequency.value = 1e4);
            var a = n.createDynamicsCompressor();
            (a.threshold.value = -50),
              (a.knee.value = 40),
              (a.ratio.value = 12),
              (a.attack.value = 0),
              (a.release.value = 0.25),
              r.connect(a),
              a.connect(n.destination),
              r.start(0);
            var o = (function (e) {
                var t = 3,
                  n = 500,
                  r = 500,
                  a = 5e3,
                  o = function o() {};
                return [
                  new Promise(function (i, c) {
                    var u = !1,
                      s = 0,
                      l = 0;
                    e.oncomplete = function (e) {
                      return i(e.renderedBuffer);
                    };
                    var d = function d() {
                        setTimeout(function () {
                          return c(E('timeout'));
                        }, Math.min(r, l + a - Date.now()));
                      },
                      f = function f() {
                        try {
                          switch ((e.startRendering(), e.state)) {
                            case 'running':
                              (l = Date.now()), u && d();
                              break;
                            case 'suspended':
                              document.hidden || s++, u && s >= t ? c(E('suspended')) : setTimeout(f, n);
                          }
                        } catch (r) {
                          c(r);
                        }
                      };
                    f(),
                      (o = function o() {
                        u || ((u = !0), l > 0 && d());
                      });
                  }),
                  o,
                ];
              })(n),
              i = o[0],
              c = o[1],
              u = i.then(
                function (e) {
                  return (function (e) {
                    for (var t = 0, n = 0; n < e.length; ++n) {
                      t += Math.abs(e[n]);
                    }
                    return t;
                  })(e.getChannelData(0).subarray(4500));
                },
                function (e) {
                  if ('timeout' === e.name || 'suspended' === e.name) return -3;
                  throw e;
                }
              );
            return (
              u.catch(function () {}),
              function () {
                return c(), u;
              }
            );
          },
          screenFrame: function screenFrame() {
            var e = this,
              t = W();
            return function () {
              return n(e, void 0, void 0, function () {
                var e, n;
                return r(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [4, t()];
                    case 1:
                      return (
                        (e = r.sent()),
                        [
                          2,
                          [
                            (n = function n(e) {
                              return null === e ? null : w(e, 10);
                            })(e[0]),
                            n(e[1]),
                            n(e[2]),
                            n(e[3]),
                          ],
                        ]
                      );
                  }
                });
              });
            };
          },
          osCpu: function osCpu() {
            return navigator.oscpu;
          },
          languages: function languages() {
            var e,
              t = navigator,
              n = [],
              r = t.language || t.userLanguage || t.browserLanguage || t.systemLanguage;
            if ((void 0 !== r && n.push([r]), Array.isArray(t.languages)))
              (S() &&
                b([
                  !('MediaSettingsRange' in (e = window)),
                  'RTCEncodedAudioFrame' in e,
                  '' + e.Intl == '[object Intl]',
                  '' + e.Reflect == '[object Reflect]',
                ]) >= 3) ||
                n.push(t.languages);
            else if ('string' == typeof t.languages) {
              var a = t.languages;
              a && n.push(a.split(','));
            }
            return n;
          },
          colorDepth: function colorDepth() {
            return window.screen.colorDepth;
          },
          deviceMemory: function deviceMemory() {
            return g(m(navigator.deviceMemory), void 0);
          },
          screenResolution: function screenResolution() {
            var e = screen,
              t = function t(e) {
                return g(p(e), null);
              },
              n = [t(e.width), t(e.height)];
            return n.sort().reverse(), n;
          },
          hardwareConcurrency: function hardwareConcurrency() {
            return g(p(navigator.hardwareConcurrency), void 0);
          },
          timezone: function timezone() {
            var e,
              t = null === (e = window.Intl) || void 0 === e ? void 0 : e.DateTimeFormat;
            if (t) {
              var n = new t().resolvedOptions().timeZone;
              if (n) return n;
            }
            var r,
              a =
                ((r = new Date().getFullYear()),
                -Math.max(m(new Date(r, 0, 1).getTimezoneOffset()), m(new Date(r, 6, 1).getTimezoneOffset())));
            return 'UTC' + (a >= 0 ? '+' : '') + Math.abs(a);
          },
          sessionStorage: function sessionStorage() {
            try {
              return !!window.sessionStorage;
            } catch (e) {
              return !0;
            }
          },
          localStorage: function localStorage() {
            try {
              return !!window.localStorage;
            } catch (e) {
              return !0;
            }
          },
          indexedDB: function indexedDB() {
            if (!C() && !A())
              try {
                return !!window.indexedDB;
              } catch (e) {
                return !0;
              }
          },
          openDatabase: function openDatabase() {
            return !!window.openDatabase;
          },
          cpuClass: function cpuClass() {
            return navigator.cpuClass;
          },
          platform: function platform() {
            var e = navigator.platform;
            return 'MacIntel' === e && x() && !M()
              ? (function () {
                  if ('iPad' === navigator.platform) return !0;
                  var e = screen,
                    t = e.width / e.height;
                  return (
                    b(['MediaSource' in window, !!Element.prototype.webkitRequestFullscreen, t > 2 / 3 && t < 1.5]) >= 2
                  );
                })()
                ? 'iPad'
                : 'iPhone'
              : e;
          },
          plugins: function plugins() {
            var e = navigator.plugins;
            if (e) {
              for (var t = [], n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r) {
                  for (var a = [], o = 0; o < r.length; ++o) {
                    var i = r[o];
                    a.push({ type: i.type, suffixes: i.suffixes });
                  }
                  t.push({ name: r.name, description: r.description, mimeTypes: a });
                }
              }
              return t;
            }
          },
          canvas: function canvas() {
            var e = (function () {
                var e = document.createElement('canvas');
                return (e.width = 1), (e.height = 1), [e, e.getContext('2d')];
              })(),
              t = e[0],
              n = e[1];
            return (function (e, t) {
              return !(!t || !e.toDataURL);
            })(t, n)
              ? { winding: F(n), geometry: O(t, n), text: z(t, n) }
              : { winding: !1, geometry: '', text: '' };
          },
          touchSupport: function touchSupport() {
            var e,
              t = navigator,
              n = 0;
            void 0 !== t.maxTouchPoints
              ? (n = p(t.maxTouchPoints))
              : void 0 !== t.msMaxTouchPoints && (n = t.msMaxTouchPoints);
            try {
              document.createEvent('TouchEvent'), (e = !0);
            } catch (r) {
              e = !1;
            }
            return {
              maxTouchPoints: n,
              touchEvent: e,
              touchStart: 'ontouchstart' in window,
            };
          },
          vendor: function vendor() {
            return navigator.vendor || '';
          },
          vendorFlavors: function vendorFlavors() {
            for (
              var e = [],
                t = 0,
                n = [
                  'chrome',
                  'safari',
                  '__crWeb',
                  '__gCrWeb',
                  'yandex',
                  '__yb',
                  '__ybro',
                  '__firefox__',
                  '__edgeTrackingPreventionStatistics',
                  'webkit',
                  'oprt',
                  'samsungAr',
                  'ucweb',
                  'UCShellJava',
                  'puffinDevice',
                ];
              t < n.length;
              t++
            ) {
              var r = n[t],
                a = window[r];
              a && 'object' == (typeof a === 'undefined' ? 'undefined' : _typeof(a)) && e.push(r);
            }
            return e.sort();
          },
          cookiesEnabled: function cookiesEnabled() {
            var e = document;
            try {
              e.cookie = 'cookietest=1; SameSite=Strict;';
              var t = -1 !== e.cookie.indexOf('cookietest=');
              return (e.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'), t;
            } catch (n) {
              return !1;
            }
          },
          colorGamut: function colorGamut() {
            for (var e = 0, t = ['rec2020', 'p3', 'srgb']; e < t.length; e++) {
              var n = t[e];
              if (matchMedia('(color-gamut: ' + n + ')').matches) return n;
            }
          },
          invertedColors: function invertedColors() {
            return !!$('inverted') || (!$('none') && void 0);
          },
          forcedColors: function forcedColors() {
            return !!K('active') || (!K('none') && void 0);
          },
          monochrome: function monochrome() {
            if (matchMedia('(min-monochrome: 0)').matches) {
              for (var e = 0; e <= 100; ++e) {
                if (matchMedia('(max-monochrome: ' + e + ')').matches) return e;
              }
              throw new Error('Too high value');
            }
          },
          contrast: function contrast() {
            return X('no-preference')
              ? 0
              : X('high') || X('more')
              ? 1
              : X('low') || X('less')
              ? -1
              : X('forced')
              ? 10
              : void 0;
          },
          reducedMotion: function reducedMotion() {
            return !!Y('reduce') || (!Y('no-preference') && void 0);
          },
          hdr: function hdr() {
            return !!Z('high') || (!Z('standard') && void 0);
          },
          math: function math() {
            return {
              acos: te(0.12312423423423424),
              acosh: ne(1e308),
              acoshPf: ((e = 1e154), Q.log(e + Q.sqrt(e * e - 1))),
              asin: re(0.12312423423423424),
              asinh: ae(1),
              asinhPf: ge(1),
              atanh: oe(0.5),
              atanhPf: be(0.5),
              atan: ie(0.5),
              sin: ce(-1e300),
              sinh: ue(1),
              sinhPf: we(1),
              cos: se(10.000000000123),
              cosh: le(1),
              coshPf: ye(1),
              tan: de(-1e300),
              tanh: fe(1),
              tanhPf: Ce(1),
              exp: he(1),
              expm1: ve(1),
              expm1Pf: ke(1),
              log1p: pe(10),
              log1pPf: Ae(10),
              powPI: me(-100),
            };
            var e;
          },
        };
        function Me(e) {
          if (_()) return 0.4;
          if (x()) return M() ? 0.5 : 0.3;
          var t = e.platform.value || '';
          return /^Win/.test(t) ? 0.6 : /^Mac/.test(t) ? 0.5 : 0.7;
        }
        function Pe(e) {
          return w(0.99 + 0.01 * e, 1e-4);
        }
        function Te(e) {
          return JSON.stringify(
            e,
            function (e, n) {
              return n instanceof Error
                ? _t(
                    {
                      name: (r = n).name,
                      message: r.message,
                      stack: null === (a = r.stack) || void 0 === a ? void 0 : a.split('\n'),
                    },
                    r
                  )
                : n;
              var r, a;
            },
            2
          );
        }
        function _e(e) {
          return v(
            (function (e) {
              for (var t = '', n = 0, r = Object.keys(e).sort(); n < r.length; n++) {
                var a = r[n],
                  o = e[a],
                  i = o.error ? 'error' : JSON.stringify(o.value);
                t += (t ? '|' : '') + a.replace(/([:|\\])/g, '\\$1') + ':' + i;
              }
              return t;
            })(e)
          );
        }
        function Ee(e) {
          var t;
          return {
            get visitorId() {
              return void 0 === t && (t = _e(this.components)), t;
            },
            set visitorId(e) {
              t = e;
            },
            confidence: (function (e) {
              var t = Me(e),
                n = Pe(t);
              return {
                score: t,
                comment: '$ if upgrade to Pro: https://fpjs.dev/pro'.replace(/\$/g, '' + n),
              };
            })(e),
            components: e,
            version: '3.3.0',
          };
        }
        function De(e) {
          return (
            void 0 === e && (e = 50),
            (function (e, t) {
              void 0 === t && (t = 1 / 0);
              var n = window.requestIdleCallback;
              return n
                ? new Promise(function (e) {
                    return n.call(
                      window,
                      function () {
                        return e();
                      },
                      { timeout: t }
                    );
                  })
                : o(Math.min(e, t));
            })(e, 2 * e)
          );
        }
        function Le(e, t) {
          var a = Date.now();
          return {
            get: function get(o) {
              return n(this, void 0, void 0, function () {
                var n, i, c;
                return r(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (n = Date.now()), [4, e()];
                    case 1:
                      return (
                        (i = r.sent()),
                        (c = Ee(i)),
                        (t || (null == o ? void 0 : o.debug)) &&
                          console.log(
                            'Copy the text below to get the debug data:\n\n```\nversion: ' +
                              c.version +
                              '\nuserAgent: ' +
                              navigator.userAgent +
                              '\ntimeBetweenLoadAndGet: ' +
                              (n - a) +
                              '\nvisitorId: ' +
                              c.visitorId +
                              '\ncomponents: ' +
                              Te(i) +
                              '\n```'
                          ),
                        [2, c]
                      );
                  }
                });
              });
            },
          };
        }
        function Ie(e) {
          var t = void 0 === e ? {} : e,
            a = t.delayFallback,
            o = t.debug;
          return n(this, void 0, void 0, function () {
            return r(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, De(a)];
                case 1:
                  return e.sent(), [2, Le(k(xe, { debug: o }, []), o)];
              }
            });
          });
        }
        var Be = { load: Ie, hashComponents: _e, componentsToDebugString: Te },
          Fe = v;
        return (
          (e.componentsToDebugString = Te),
          (e.default = Be),
          (e.getFullscreenElement = T),
          (e.getProConfidenceScore = function () {
            for (var e = [], t = 0; t < arguments.length; t++) {
              e[t] = arguments[t];
            }
            return Pe(Me.apply(void 0, e));
          }),
          (e.getScreenFrame = W),
          (e.hashComponents = _e),
          (e.isAndroid = _),
          (e.isChromium = S),
          (e.isDesktopSafari = M),
          (e.isEdgeHTML = A),
          (e.isGecko = P),
          (e.isTrident = C),
          (e.isWebKit = x),
          (e.load = Ie),
          (e.loadSources = k),
          (e.murmurX64Hash128 = Fe),
          (e.prepareForSources = De),
          (e.sources = xe),
          e
        );
      })({});

      module.exports = FingerprintJS;
    },
  });
  this.require.define({
    'lib/helpers': function (exports, require, module) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (obj) {
              return typeof obj;
            }
          : function (obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      var _ = {};
      // All **ECMAScript 5** native function implementations that we hope to use
      // are declared here.
      var nativeKeys = Object.keys;
      var ObjProto = Object.prototype;
      var hasOwnProperty = ObjProto.hasOwnProperty;

      var property = function property(key) {
        return function (obj) {
          return obj == null ? void 0 : obj[key];
        };
      };

      var getLength = property('length');
      var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
      var isArrayLike = function isArrayLike(collection) {
        var length = getLength(collection);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
      };

      // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
      // IE 11 (#1621), and in Safari 8 (#1929).
      if (
        typeof /./ !== 'function' &&
        (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) !== 'object'
      ) {
        _.isFunction = function (obj) {
          return typeof obj === 'function' || false;
        };
      }

      var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
      var nonEnumerableProps = [
        'valueOf',
        'isPrototypeOf',
        'toString',
        'propertyIsEnumerable',
        'hasOwnProperty',
        'toLocaleString',
      ];

      function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

        // Constructor is a special case.
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

        while (nonEnumIdx--) {
          prop = nonEnumerableProps[nonEnumIdx];
          if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
            keys.push(prop);
          }
        }
      }

      // An internal function for creating assigner functions.
      var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
        return function () {
          for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
            objs[_key] = arguments[_key];
          }

          var length = objs.length;
          var obj = objs[0] || null;
          if (length < 2 || obj == null) return obj;
          for (var index = 1; index < length; index++) {
            var source = objs[index];
            var keys = keysFunc(source);
            var l = keys.length;
            for (var i = 0; i < l; i++) {
              var key = keys[i];
              if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
            }
          }
          return obj;
        };
      };

      // Retrieve all the property names of an object.
      _.allKeys = function (obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) {
          keys.push(key);
        } // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
      };

      // Extend a given object with all the properties in passed-in object(s).
      _.extend = createAssigner(_.allKeys);

      // Is the given value `NaN`? (NaN is the only number which does not equal itself).
      _.isNaN = function (obj) {
        return typeof obj === 'number' && obj !== +obj;
      };

      // Retrieve the values of an object's properties.
      _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
          values[i] = obj[keys[i]];
        }
        return values;
      };

      // Determine if the array or object contains a given item (using `===`).
      // Aliased as `includes` and `include`.
      _.contains =
        _.includes =
        _.include =
          function (obj, item, fromIndex, guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            if (typeof fromIndex !== 'number' || guard) fromIndex = 0;
            return _.indexOf(obj, item, fromIndex) >= 0;
          };

      // Retrieve the names of an object's own properties.
      // Delegates to **ECMAScript 5**'s native `Object.keys`
      _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) {
          if (_.has(obj, key)) keys.push(key);
        } // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
      };

      // Is a given letiable an object?
      _.isObject = function (obj) {
        var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        return type === 'function' || (type === 'object' && !!obj);
      };

      // Shortcut function for checking if an object has a given property directly
      // on itself (in other words, not on a prototype).
      _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
      };

      // addEventListener cross browser
      _.addEventListener = function (obj, type, fun, useCapture) {
        document.attachEvent ? obj.attachEvent('on' + type, fun) : obj.addEventListener(type, fun, useCapture);
      };

      _.windowOnload = function (w, cb) {
        var d = w.document;
        // 判断是不是已经加载完成了，如果加载完成则立即执行，否则监听onload事件
        if (d.readyState && d.readyState === 'complete') {
          cb();
        } else {
          _.addEventListener(w, 'load', cb);
        }
      };

      var base64Reg = /^data:.*?\;base64\,.*?==$/i;
      _.isBase64 = function (url) {
        return base64Reg.test(url);
      };

      var getXPath = function getXPath(node, path) {
        var count = 0;
        path = path || [];

        if (node.parentNode) {
          path = getXPath(node.parentNode, path);
        }

        if (node.previousSibling) {
          // 获取祖先元素
          count = 1;
          var sibling = node.previousSibling;
          do {
            if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
              count++;
            }
            sibling = sibling.previousSibling;
          } while (sibling);
          if (count === 1) {
            count = null;
          }
        } else if (node.nextSibling) {
          // 获取子元素
          var _sibling = node.nextSibling;
          do {
            if (_sibling.nodeType === 1 && _sibling.nodeName === node.nodeName) {
              count = 1;
              _sibling = null;
            } else {
              count = null;
              _sibling = _sibling.previousSibling;
            }
          } while (_sibling);
        }

        if (node.nodeType === 1) {
          var attr = '';

          if (node.id) {
            // 判断是否有id属性
            attr += "[@id='" + node.id + "']";
          }

          if (node.getAttribute('class') !== null) {
            // 判断class属性
            attr += "[@class='" + node.getAttribute('class') + "']";
          }

          attr += count > 0 ? '[' + count + ']' : ''; // 判断当前元素index位置

          path.push(node.nodeName.toLowerCase() + attr);
        }

        return path;
      };

      _.getXPath = getXPath;

      module.exports = _;
    },
  });
  this.require.define({
    'lib/ie-version': function (exports, require, module) {
      'use strict';

      /* global window */

      // from: https://github.com/gagle/js-ie-version/blob/master/lib/ie-version.js

      var win = window;
      var doc = win.document;
      var input = doc.createElement('input');
      var ie = (function () {
        // "!win.ActiveXObject" is evaluated to true in IE11
        if (win.ActiveXObject === undefined) return null;
        if (!win.XMLHttpRequest) return 6;
        if (!doc.querySelector) return 7;
        if (!doc.addEventListener) return 8;
        if (!win.atob) return 9;
        // "!doc.body.dataset" is faster but the body is null when the DOM is not
        // ready. Anyway, an input tag needs to be created to check if IE is being
        // emulated
        if (!input.dataset) return 10;
        return 11;
      })();

      var emulated = false;
      if (ie && doc.documentMode) {
        try {
          input.style.behavior = 'url(#default#clientcaps)';
          emulated =
            doc.documentMode !==
            win.parseInt(input.getComponentVersion('{45EA75A0-A269-11D1-B5BF-0000F8051515}', 'componentid'));
        } catch (e) {
          // getComponentVersion() is not available in IE11+ and if a lower version
          // is emulated, it also doesn't exist
          // "if(input.getComponentVersion)" cannot be used
        }
      }

      module.exports = {
        version: ie,
        emulated: !!ie && emulated,
      };
    },
  });
  this.require.define({
    'lib/index': function (exports, require, module) {
      'use strict';

      module.exports = {
        browser: {
          isCookieEnabled: require('./browser/is-cookie-enabled'),
          userAgent: require('./browser/user-agent'),
          userLanguage: require('./browser/user-language'),
          windowSize: require('./browser/window-size'),
          screenSize: require('./browser/screen-size'),
          screenColorDepth: require('./browser/screen-color-depth'),
          flashVersion: require('./browser/flash-version'),
        },
        document: {
          documentSize: require('./document/document-size'),
          documentTitle: require('./document/document-title'),
          documentReferrer: require('./document/document-referrer'),
          documentUrl: require('./document/document-url'),
          documentCharacterSet: require('./document/document-character-set'),
          documentPathname: require('./document/document-pathname'),
          documentDomain: require('./document/document-domain'),
          documentKeywords: require('./document/document-keywords'),
        },
        performance: {
          navigationTiming: require('./performance/navigation-timing'),
          resourceTiming: require('./performance/resource-timing'),
        },
      };
    },
  });
  this.require.define({
    'lib/log/log-ajax': function (exports, require, module) {
      'use strict';

      var _require = require('../send-data'),
        requestAjax = _require.requestAjax;

      var uuidv1 = require('../uuid');

      /* global window XMLHttpRequest */

      module.exports = function () {
        var hackOpen = XMLHttpRequest.prototype.open;
        var hackSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function () {
          for (var _len = arguments.length, param = Array(_len), _key = 0; _key < _len; _key++) {
            param[_key] = arguments[_key];
          }

          this.method = param[0].toLowerCase(); // 设置 ajax method
          this.url = param[1]; // 设置 ajax url

          hackOpen.apply(this, param);

          this.setRequestHeader('terminus-request-id', uuidv1());
        };

        XMLHttpRequest.prototype.send = function () {
          var _this = this;

          for (var _len2 = arguments.length, body = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            body[_key2] = arguments[_key2];
          }

          this.startTime = Date.now(); // 设置ajax起始时间

          var readyStateChangeHook = function readyStateChangeHook() {
            if (_this.readyState === 2) {
              // 服务器接收完数据
              _this.sendTime = Date.now();
            }

            if (_this.readyState === 3) {
              // 开始接收返回值
              _this.loadTime = Date.now();
            }

            if (_this.readyState === 4) {
              // 开始接收返回值
              var endTime = Date.now(); // 设置结束时间

              requestAjax({
                // 发送埋点请求
                tt: endTime - _this.startTime,
                url: _this.url,
                st: _this.status,
                me: _this.method,
                req: JSON.stringify(body || '').length / 1024,
                res: JSON.stringify(_this.response || _this.reponseText || '').length / 1024,
              });
            }
          };

          if (typeof window.addEventListener === 'function') {
            this.addEventListener('readystatechange', readyStateChangeHook);
          } else {
            // this.onreadystatechange = readyStateChangeHook
          }

          hackSend.apply(this, body);
        };
      };
    },
  });
  this.require.define({
    'lib/log/log-exec': function (exports, require, module) {
      'use strict';

      var _require = require('../send-data'),
        requestData = _require.requestData;
      /* global window */

      module.exports = function (msg, source, lineno, colno, error) {
        // 没有URL不上报！上报也不知道错误
        // msg 为 script error 是被安全限制过滤了，保证脚本同源
        if (msg === 'Script error.' || !source) {
          return false;
        }
        // 采用异步的方式
        // 我遇到过在window.onunload进行ajax的堵塞上报
        // 由于客户端强制关闭webview导致这次堵塞上报有Network Error
        // 我猜测这里window.onerror的执行流在关闭前是必然执行的
        // 而离开文章之后的上报对于业务来说是可丢失的
        // 所以我把这里的执行流放到异步事件去执行
        // 脚本的异常数降低了10倍
        setTimeout(function () {
          for (var _len = arguments.length, agrus = Array(_len), _key = 0; _key < _len; _key++) {
            agrus[_key] = arguments[_key];
          }

          // 不一定所有浏览器都支持colno参数
          colno = colno || (window.event && window.event.errorCharacter) || 0;

          var stack = '';

          if (!!error && !!error.stack) {
            // 如果浏览器有堆栈信息
            // 直接使用
            stack = error.stack.toString();
          } else if (!!agrus.callee) {
            // 尝试通过callee拿堆栈信息
            var ext = [];
            var f = agrus.callee.caller;
            var c = 3;

            // 这里只拿三层堆栈信息
            while (f && --c > 0) {
              ext.push(f.toString());
              if (f === f.caller) {
                break; // 如果有环
              }
              f = f.caller;
            }
            ext = ext.join(',');
            stack = ext;
          }

          // 把data上报到后台！
          requestData({
            eventId: 'Error',
            erType: 'runtime error',
            erMsg: msg,
            // ers: source,
            // erm: msg,
            // erl: lineno,
            // erc: colno,
            // sta: stack,
          });
        }, 0);

        return false;
      };
    },
  });
  this.require.define({
    'lib/performance/navigation-timing': function (exports, require, module) {
      'use strict';

      var unility = require('./utility');

      /* global window */

      module.exports = function () {
        return unility.compressNavigationTiming(window.timing.getTimes());
      };
    },
  });
  this.require.define({
    'lib/performance/resource-timing': function (exports, require, module) {
      'use strict';

      var unility = require('./utility');

      /* global window */

      module.exports = function () {
        if (window.performance && window.performance.getEntriesByType) {
          return unility.compressResourceTiming(window.performance.getEntriesByType('resource'));
        }
        return {};
      };
    },
  });
  this.require.define({
    'lib/performance/spa-timing': function (exports, require, module) {
      'use strict';

      var spaTiming = {};

      module.exports = {
        onEventStart: function onEventStart() {
          spaTiming.startTime = Date.now();
        },
        onEventEnd: function onEventEnd() {
          spaTiming.endTime = Date.now();
          var loadTime = spaTiming.endTime - spaTiming.startTime;
          return loadTime;
        },
      };
    },
  });
  this.require.define({
    'lib/performance/utility': function (exports, require, module) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (obj) {
              return typeof obj;
            }
          : function (obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      var _ = require('../helpers');
      /**
       * Converts entries to a Trie:
       * http://en.wikipedia.org/wiki/Trie
       *
       * Assumptions:
       * 1) All entries have unique keys
       * 2) Keys cannot have "|" in their name.
       * 3) All key's values are strings
       *
       * Leaf nodes in the tree are the key's values.
       *
       * If key A is a prefix to key B, key A will be suffixed with "|"
       *
       * @param {object} entries Performance entries
       * @returns {object} A trie
       */
      var convertToTrie = function convertToTrie(entries) {
        var trie = {};
        var value = void 0,
          letters = void 0,
          letter = void 0,
          cur = void 0,
          node = void 0;

        _.keys(entries).forEach(function (url) {
          if (!entries.hasOwnProperty(url)) {
            return;
          }

          // 过滤太长的，避免嵌套太深超过浏览器循环限制
          if (url.length > 150) {
            return;
          }

          value = entries[url];
          letters = url.split('');
          cur = trie;

          for (var i = 0; i < letters.length; i++) {
            letter = letters[i];
            node = cur[letter];

            if (typeof node === 'undefined') {
              // nothing exists yet, create either a leaf if this is the end of the word,
              // or a branch if there are letters to go
              cur = cur[letter] = i === letters.length - 1 ? value : {};
            } else if (typeof node === 'string') {
              // this is a leaf, but we need to go further, so convert it into a branch
              cur = cur[letter] = { '|': node };
            } else if (i === letters.length - 1) {
              // this is the end of our key, and we've hit an existing node.  Add our timings.
              cur[letter]['|'] = value;
            } else {
              // continue onwards
              cur = cur[letter];
            }
          }
        });

        return trie;
      };

      var optimizeTrie = function optimizeTrie(cur, top) {
        var num = 0,
          node = void 0,
          ret = void 0,
          topNode = void 0;

        // capture trie keys first as we'll be modifying it
        var keys = [];

        _.keys(cur).forEach(function (k) {
          if (cur.hasOwnProperty(k)) {
            keys.push(k);
          }
        });

        for (var i = 0; i < keys.length; i++) {
          node = keys[i];
          if (_typeof(cur[node]) === 'object') {
            // optimize children
            ret = optimizeTrie(cur[node], false);
            if (ret) {
              // swap the current leaf with compressed one
              delete cur[node];
              node += ret.name;
              cur[node] = ret.value;
            }
          }
          num++;
        }

        if (num === 1) {
          // compress single leafs
          if (top) {
            // top node gets special treatment so we're not left with a {node:,value:} at top
            topNode = {};
            topNode[node] = cur[node];
            return topNode;
          }
          // other nodes we return name and value separately
          return { name: node, value: cur[node] };
        } else if (top) {
          // top node with more than 1 child, return it as-is
          return cur;
        }
        // more than two nodes and not the top, we can't compress any more
        return false;
      };

      var toBase36 = function toBase36(n) {
        if (typeof n === 'number' && n !== 0) {
          return n.toString(36);
        }
        return typeof n === 'string' ? n : '';
      };

      var arrayToBase36 = function arrayToBase36(arr) {
        var results = [];
        for (var i = 0; i < arr.length; i++) {
          results.push(toBase36(arr[i]));
        }
        return results;
      };

      var INITIATOR_TYPES = {
        other: 0,
        img: 1,
        link: 2,
        script: 3,
        css: 4,
        xmlhttprequest: 5,
        iframe: 6,
        image: 7, // image element inside a svg
      };

      var trimTiming = function trimTiming(time, startTime) {
        if (typeof time !== 'number') {
          time = 0;
        }

        if (typeof startTime !== 'number') {
          startTime = 0;
        }

        var timeMs = Math.round(time);

        var startTimeMs = Math.round(startTime);

        return timeMs === 0 ? 0 : timeMs - startTimeMs;
      };

      var compressResourceTiming = function compressResourceTiming(entries) {
        var results = {};
        for (var i = 0; i < entries.length; i++) {
          var _entries$i = entries[i],
            name = _entries$i.name,
            initiatorType = _entries$i.initiatorType,
            startTime = _entries$i.startTime,
            responseEnd = _entries$i.responseEnd,
            responseStart = _entries$i.responseStart,
            requestStart = _entries$i.requestStart,
            connectEnd = _entries$i.connectEnd,
            secureConnectionStart = _entries$i.secureConnectionStart,
            connectStart = _entries$i.connectStart,
            domainLookupEnd = _entries$i.domainLookupEnd,
            domainLookupStart = _entries$i.domainLookupStart,
            redirectEnd = _entries$i.redirectEnd,
            redirectStart = _entries$i.redirectStart;

          if (_.isBase64(name)) {
            continue;
          }
          if (results[name]) {
            continue;
          }
          var iType = INITIATOR_TYPES[initiatorType] || 0;

          var data =
            iType +
            arrayToBase36([
              trimTiming(startTime),
              trimTiming(responseEnd, startTime),
              trimTiming(responseStart, startTime),
              trimTiming(requestStart, startTime),
              trimTiming(connectEnd, startTime),
              trimTiming(secureConnectionStart, startTime),
              trimTiming(connectStart, startTime),
              trimTiming(domainLookupEnd, startTime),
              trimTiming(domainLookupStart, startTime),
              trimTiming(redirectEnd, startTime),
              trimTiming(redirectStart, startTime),
            ])
              .join(',')
              .replace(/,+$/, '');
          results[name] = data;
        }
        results = optimizeTrie(convertToTrie(results), true);
        return results;
      };

      var compressNavigationTiming = function compressNavigationTiming(timing) {
        var loadTime = timing.loadTime,
          readyStart = timing.readyStart,
          domReadyTime = timing.domReadyTime,
          scriptExecuteTime = timing.scriptExecuteTime,
          requestTime = timing.requestTime,
          reponseTime = timing.reponseTime,
          initDomTreeTime = timing.initDomTreeTime,
          loadEventTime = timing.loadEventTime,
          unloadEventTime = timing.unloadEventTime,
          appcacheTime = timing.appcacheTime,
          connectTime = timing.connectTime,
          lookupDomainTime = timing.lookupDomainTime,
          redirectTime = timing.redirectTime;

        return arrayToBase36([
          loadTime,
          readyStart,
          domReadyTime,
          scriptExecuteTime,
          requestTime,
          reponseTime,
          initDomTreeTime,
          loadEventTime,
          unloadEventTime,
          appcacheTime,
          connectTime,
          lookupDomainTime,
          redirectTime,
        ])
          .join(',')
          .replace(/,+$/, '');
      };

      module.exports = {
        compressResourceTiming: compressResourceTiming,
        compressNavigationTiming: compressNavigationTiming,
      };
    },
  });
  this.require.define({
    'lib/polyfill': function (exports, require, module) {
      'use strict';

      module.exports = function () {
        if (!Array.prototype.forEach) {
          Array.prototype.forEach = function (fun) {
            var len = this.length;

            if (typeof fun !== 'function') {
              throw new TypeError();
            }

            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
              if (i in this) {
                fun.call(thisp, this[i], i, this);
              }
            }
          };
        }
      };
    },
  });
  this.require.define({
    'lib/public-params': function (exports, require, module) {
      'use strict';

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var fingerPrint = require('./finger-print');
      var uuid = require('./uuid');

      var fpCache = null;
      var uuidCache = null;

      var customPublicParams = {};

      function setCustomPublicParams(params) {
        customPublicParams = params || {};
      }

      navigator.sayswho = (function () {
        var ua = navigator.userAgent;
        var tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
      })();

      function findIP() {
        return new Promise(function (resolve, reject) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              resolve(this.responseText);
            }
          };
          xhttp.open('GET', '//api.ipify.org?format=json', true);
          xhttp.send();
        });
      }

      var findIPPromise = findIP();

      function getPublicParams() {
        return new Promise(function (resolve) {
          return getFp().then(function (fp) {
            fpCache = fp;
            var uuidStr = uuidCache;
            if (!uuidStr) {
              uuidCache = uuid();
              uuidStr = uuidCache;
            }
            deviceInfo.then(function (dInfo) {
              findIPPromise.then(function (ip) {
                var _extends2;

                var data = _extends(
                  ((_extends2 = {
                    cid: uuidCache,
                    // 用户标示
                    deviceId: fp.visitorId, // 设备指纹
                    distinctId: uuidStr, // 用户唯一标示
                    // 应用信息
                    appPlatform: 'WEB-WEB', // 应用平台 写死
                    // 埋点SDK属性
                    lib: 'js', // SDK类型 写死
                    libVersion: window.$sdkVersion || '1.0.0', // SDK版本 平台提供
                    libMethod: '全埋点', // 埋点触发方法 先写死混合埋点
                    // 事件信息
                    dateTime: Date.now(), // 事件上报时间
                    time: Date.now(), // 事件发生时间
                    sessionId: '', // 事件会话ID 拿不到
                    pageURL: window.location.href, // 事件发生页面URL
                    pageTitle: document.title, // 事件发生页面标题
                    // 设备信息
                    system: dInfo.platform || navigator.platform, // 操作系统
                    systemVersion: dInfo.platformVersion || '', // 系统版本
                    screenHeight: window.screen.height, // 屏幕高度
                    screenWidth: window.screen.width, // 屏幕宽度
                    // version: '',
                    // environment: '1',
                    browserLanguage: navigator.language || navigator.userLanguage,
                    browserVersion: navigator.sayswho,
                    screenResolution:
                      window.document.documentElement.clientWidth + '*' + window.document.documentElement.clientHeight,
                    clientIp: ip,
                  }),
                  (_extends2['sessionId'] = uuidCache),
                  _extends2),
                  customPublicParams
                );
                resolve(data);
              });
            });
          });
        });
      }

      var getFp = function getFp() {
        if (fpCache) {
          return Promise.resolve(fpCache);
        }
        var fpObjPromise = fingerPrint.load();
        return fpObjPromise.then(function (fpObj) {
          var fp = fpObj.get();
          return fp;
        });
      };

      // 获取操作系统
      var deviceInfo = navigator.userAgentData
        ? navigator.userAgentData.getHighEntropyValues([
            'architecture',
            'bitness',
            'model',
            'platform',
            'platformVersion',
            'uaFullVersion',
          ])
        : Promise.resolve({});

      module.exports = {
        getPublicParams: getPublicParams,
        setCustomPublicParams: setCustomPublicParams,
      };
    },
  });
  this.require.define({
    'lib/request': function (exports, require, module) {
      'use strict';

      var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (obj) {
              return typeof obj;
            }
          : function (obj) {
              return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
            };

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      function _objectWithoutProperties(obj, keys) {
        var target = {};
        for (var i in obj) {
          if (keys.indexOf(i) >= 0) continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          target[i] = obj[i];
        }
        return target;
      }

      var _ = require('./helpers');
      var ie = require('./ie-version');

      var _require = require('./public-params'),
        getPublicParams = _require.getPublicParams;

      /* global navigator document window ActiveXObject Blob XMLHttpRequest */

      // Added for IE support

      if (typeof window.XMLHttpRequest === 'undefined') {
        window.XMLHttpRequest = function () {
          var versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1'];
          for (var i = 0; i < versions.length; i++) {
            try {
              var version = versions[i] + '.XMLHTTP';
              return new ActiveXObject(version);
            } catch (e) {}
          }
        };
      }

      var originOpen = XMLHttpRequest.prototype.open;
      var originSend = XMLHttpRequest.prototype.send;
      var en = encodeURIComponent;

      var sysConfig = {};
      var fetchingPromise = null;

      var makeQueryString = function makeQueryString(queries) {
        var ret = [];
        _.keys(queries).forEach(function (k) {
          ret.push(en(k) + '=' + en(queries[k]));
        });
        return ret.join('&');
      };

      var PostData = function PostData(url, params) {
        var d = document;
        var iframe = d.createElement('iframe');
        var uniqueString = 'terminus-analytics-' + Date.now();
        d.body.appendChild(iframe);
        iframe.style.display = 'none';
        iframe.contentWindow.name = uniqueString;

        var form = d.createElement('form');
        form.target = uniqueString;
        form.style.display = 'none';
        form.action = url;
        form.method = 'POST';

        _.keys(params).forEach(function (k) {
          var input = d.createElement('input');
          input.type = 'hidden';
          input.name = k;
          input.value = params[k];
          form.appendChild(input);
        });

        d.body.appendChild(form);
        form.submit();
        _.addEventListener(iframe, 'load', function () {
          d.body.removeChild(form);
          d.body.removeChild(iframe);
        });
      };

      var send = function send(url, body, contentType) {
        if (navigator.sendBeacon && Blob) {
          // log detail for easy test
          // console.table(decodeURIComponent(decodeURIComponent(body)).slice(5).split('&').reduce((obj, k)=>{var a=k.split('=');obj[a.shift()] = a.join('=');return obj;}, {}))
          var blob = new Blob([body], { type: contentType });
          navigator.sendBeacon(url, blob);
        } else {
          var xhr = new XMLHttpRequest();
          originOpen.call(xhr, 'POST', url, true);
          xhr.setRequestHeader('Content-type', contentType);
          originSend.call(xhr, body);
        }
      };

      var sendRequest = function sendRequest(data) {
        var url = sysConfig.collectorUrl || '';
        if (!url) {
          console.error('未发现注入收集器地址');
        }
        var publicParams = getPublicParams();
        publicParams.then(function (publicData) {
          var body = _extends({}, publicData, data);

          var cid = body.cid,
            _body$uid = body.uid,
            uid = _body$uid === undefined ? 0 : _body$uid,
            rest = _objectWithoutProperties(body, ['cid', 'uid']);

          if (ie.version && ie.version < 10) {
            // ie < 10 无法进行 ajax 跨域请求
            PostData(url, body);
          } else {
            send(
              url,
              makeQueryString({
                data: makeQueryString(_extends({}, rest, { appName: sysConfig.appName, appKey: sysConfig.appKey })),
                cid: cid,
                ak: sysConfig.appKey,
                uid: uid,
              }),
              'application/x-www-form-urlencoded; charset=UTF-8'
            );
          }
        });
      };

      var doRequest = function doRequest(data) {
        // init config if not found
        if (!fetchingPromise && !Object.keys(sysConfig).length) {
          fetchingPromise = new Promise(function (resolve) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                try {
                  sysConfig = JSON.parse(request.responseText);
                  sendRequest(data);
                  resolve();
                  fetchingPromise = null;
                } catch (error) {
                  console.error('parse config failed', error);
                }
              }
            };
            request.open('GET', window.$configUrl || '/config.json', true);
            request.send();
          });
        } else if (fetchingPromise) {
          fetchingPromise.then(function () {
            return sendRequest(data);
          });
        } else {
          sendRequest(data);
        }
      };

      module.exports = {
        requestCustom: function requestCustom(params) {
          var data = params.data,
            others = _objectWithoutProperties(params, ['data']);

          var ret = makeQueryString(others).split('&');
          _.keys(data).forEach(function (prefix) {
            var part = data[prefix];
            if (_.isObject(part)) {
              _.keys(part).forEach(function (k) {
                if (['string', 'number', 'boolean'].indexOf(_typeof(part[k])) > -1) {
                  ret.push(prefix + '=' + en(k) + '=' + en(part[k]));
                }
              });
            }
          });
          doRequest(ret.join('&'));
        },
        requestData: function requestData(params) {
          doRequest(params);
        },
      };
    },
  });
  this.require.define({
    'lib/send-data': function (exports, require, module) {
      'use strict';

      var _ = require('./helpers');

      var _require = require('./'),
        browser = _require.browser,
        document = _require.document;
      // const { requestData, requestCustom } = require("./request")

      var _require2 = require('./request'),
        requestData = _require2.requestData;

      module.exports = {
        requestData: requestData,
        // requestDocument(data = {}) {
        //   requestData({
        //     t: "document",
        //     dt: document.documentTitle(),
        //     ds: document.documentSize(),
        //     dr: document.documentReferrer(),
        //     dl: document.documentUrl(),
        //     de: document.documentCharacterSet(),
        //     dp: document.documentPathname(),
        //     dh: document.documentDomain(),
        //     dk: document.documentKeywords(),
        //     lc: 1, // if location href change, 1=changed, 0=unchanged
        //     ...data
        //   })
        // },

        // requestBrowser() {
        //   requestData({
        //     t: "browser",
        //     ce: browser.isCookieEnabled(),
        //     vp: browser.windowSize(),
        //     ua: browser.userAgent(),
        //     ul: browser.userLanguage(),
        //     sr: browser.screenSize(),
        //     sd: browser.screenColorDepth(),
        //     fl: browser.flashVersion()
        //   })
        // },

        // requestTiming(data = {}) {
        //   requestData({
        //     t: "timing",
        //     ...data,
        //   })
        // },

        // requestEvent(data = {}) {
        //   requestData({
        //     t: "event",
        //     ...data,
        //   })
        // },

        // requestLoadError(data = {}) {
        //   requestData({
        //     t: "loadError",
        //     ...data,
        //   })
        // },

        // requestAjax(data = {}) {
        //   requestData({
        //     t: "request",
        //     ...data,
        //   })
        // },

        // requestAjaxError(data = {}) {
        //   requestData({
        //     t: "error",
        //     ...data,
        //   })
        // },

        // requestMetric(n, data = {}) {
        //   requestCustom({
        //     t: "metric",
        //     n,
        //     date: Date.now(),
        //     data,
        //   })
        // },
      };
    },
  });
  this.require.define({
    'lib/uuid': function (exports, require, module) {
      'use strict';

      // from https://www.npmjs.com/package/uuidv1 1.6.14
      module.exports = function () {
        var now = new Date();
        function P(str, length) {
          return ('0000000000000000' + str).slice(-length);
        }

        function R() {
          return P((~~(Math.random() * 0x1000)).toString(16), 3);
        }
        var time = P(
          (10000 * (+new Date(now.getTime() - now.getTimezoneOffset() * 60000) + 12219292800000)).toString(16),
          16
        );
        return (
          time.slice(8, 16) +
          '-' +
          time.slice(4, 8) +
          '-1' +
          time.slice(1, 4) +
          '-8' +
          R() +
          '-' +
          R() +
          R() +
          R() +
          R()
        );
      };
    },
  });
  ('use strict');

  /*!
   * JavaScript Cookie v2.1.2
   * https://github.com/js-cookie/js-cookie
   *
   * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
   * Released under the MIT license
   */
  (function (factory) {
    global.Cookies = factory();
  })(function () {
    function extend() {
      var i = 0;
      var result = {};
      for (; i < arguments.length; i++) {
        var attributes = arguments[i];
        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }
      return result;
    }

    function init(converter) {
      function api(key, value, attributes) {
        var result;
        if (typeof document === 'undefined') {
          return;
        }

        // Write

        if (arguments.length > 1) {
          attributes = extend(
            {
              path: '/',
            },
            api.defaults,
            attributes
          );

          if (typeof attributes.expires === 'number') {
            var expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e5);
            attributes.expires = expires;
          }

          try {
            result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
              value = result;
            }
          } catch (e) {}

          if (!converter.write) {
            value = encodeURIComponent(String(value)).replace(
              /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
              decodeURIComponent
            );
          } else {
            value = converter.write(value, key);
          }

          key = encodeURIComponent(String(key));
          key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
          key = key.replace(/[\(\)]/g, escape);

          return (document.cookie = [
            key,
            '=',
            value,
            attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            attributes.path ? '; path=' + attributes.path : '',
            attributes.domain ? '; domain=' + attributes.domain : '',
            attributes.secure ? '; secure' : '',
          ].join(''));
        }

        // Read

        if (!key) {
          result = {};
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling "get()"
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var rdecode = /(%[0-9A-Z]{2})+/g;
        var i = 0;

        for (; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var cookie = parts.slice(1).join('=');

          if (cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }

          try {
            var name = parts[0].replace(rdecode, decodeURIComponent);
            cookie = converter.read
              ? converter.read(cookie, name)
              : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

            if (this.json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {}
            }

            if (key === name) {
              result = cookie;
              break;
            }

            if (!key) {
              result[name] = cookie;
            }
          } catch (e) {}
        }

        return result;
      }

      api.set = api;
      api.get = function (key) {
        return api.call(api, key);
      };
      api.getJSON = function () {
        return api.apply(
          {
            json: true,
          },
          [].slice.call(arguments)
        );
      };
      api.defaults = {};

      api.remove = function (key, attributes) {
        api(
          key,
          '',
          extend(attributes, {
            expires: -1,
          })
        );
      };

      api.withConverter = init;

      return api;
    }

    return init(function () {});
  });
  ('use strict');

  window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  this.require.define({
    ta: function (exports, require, module) {
      'use strict';

      var _extends =
        Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var _ = require('./lib/helpers');
      var ie = require('./lib/ie-version');

      var _require = require('./lib/public-params'),
        setCustomPublicParams = _require.setCustomPublicParams;

      var _require2 = require('./lib/send-data'),
        requestData = _require2.requestData;

      function ta(customPublicParams, customPrivateParams) {
        if (ie.version && ie.version < 8) {
          return;
        }
        var _customPrivateParams = customPrivateParams || {};
        setCustomPublicParams(customPublicParams);
        require('./lib/polyfill')();
        // require("./lib/base-data").init();
        // require("./lib/events/init")(options);
        // require("./lib/events/unload")(options);
        require('./lib/events/click')(_customPrivateParams);
        // require("./lib/log/log-ajax")(options);
        require('./lib/events/onload')(_customPrivateParams);
        require('./lib/events/location')(_customPrivateParams);
      }

      function sendTracking(eventId, data) {
        requestData(
          _extends(
            {
              eventId: eventId,
              libMethod: '自定义埋点',
            },
            data
          )
        );
      }

      module.exports = ta;
      module.exports.sendTracking = sendTracking;
    },
  });
  ('use strict');

  (function () {
    var require = global.require;
    var toArray = function toArray(me) {
      return Array.prototype.slice.call(me);
    };
    var self = {
      start: function start() {
        require('ta').apply(null, arguments);
      },
      sendTracking: function sendTracking() {
        require('ta').sendTracking.apply(null, arguments);
      },
      setUser: function setUser() {
        require('lib/base-data').setUser.apply(null, arguments);
      },
      sendError: function sendError() {
        require('lib/events/error').apply(null, arguments);
      },
      sendExecError: function sendExecError() {
        require('lib/log/log-exec').apply(null, arguments);
      },
      send: function send() {
        // require("lib/send-data").requestMetric.apply(null, arguments)
      },
      getAppInfo: function getAppInfo() {
        require('lib/app-data').getAppInfo.apply();
      },
      sendAppInfo: function sendAppInfo() {
        require('lib/app-data').sendAppInfo.apply(null, arguments);
      },
    };

    var _mq = $ta.q;
    var execute = function execute(args) {
      var params = toArray(args);
      var method = params.shift(); // remove the method from the first item
      self[method].apply(self, params);
    };

    var init = function init() {
      _mq.forEach(execute);
      _mq.length = 0; // clean the queue
      _mq.push = execute;
    };

    _mq.push = function (args) {
      if (args[0] === 'start') {
        _mq.unshift(args);
        init();
      } else {
        Array.prototype.push.call(_mq, args);
      }
    };

    var startIndex = -1;

    for (var i = 0; i < _mq.length; i++) {
      if (_mq[i][0] === 'start') {
        startIndex = i;
        break;
      }
    }

    if (startIndex > -1) {
      // move start to first
      var st = _mq.splice(startIndex, 1)[0];
      _mq.push(st);
      init();
    }
  }.call());
}.call({}));
