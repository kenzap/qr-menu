
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';
  var appID = '66432108790002';
  var mt = function mt(val) {
    return ("" + val).length < 2 ? "0" + val : val;
  };
  var getPrice = function getPrice(product) {
    var price = {
      html: null,
      priced: null
    };
    price.html = '<span class="tag ptag">' + priceFormat(product['price']) + '</span>';

    if (product['priced'] != '') {
      price.html = '<span class="ptagc">' + priceFormat(product['price']) + '</span> <span class="tag ptag">' + priceFormat(product['priced']) + '</span>';
      price.priced = product['priced'];
    }

    if (product['discounts']) {
      var discounted = false;
      var d = new Date();
      var month = mt(d.getMonth() + 1);
      var day = mt(d.getDate());
      var year = mt(d.getFullYear());
      product['discounts'].forEach(function (el) {
        switch (el.availability) {
          case 'always':
            discounted = true;
            break;

          case 'weekly':
            if (el.dow[d.getDay() - 1]) {
              discounted = true;
            } else {
              break;
            }

          case 'hourly':
            var from = new Date(month + "/" + day + "/" + year + ' ' + el.hours.from + ':00').getTime();
            var to = new Date(month + "/" + day + "/" + year + ' ' + el.hours.to + ':00').getTime();

            if (from > Date.now() / 1000 | 0 > to) {
              discounted = true;
            }

            break;
        }

        if (discounted) {
          if (el.type == 'percent') {
            price.priced = makeNumber(product['price']) * ((100 - el.percent) / 100);
          } else if (el.type == 'value') {
            price.priced = el.value;
          }

          price.html = "<span class=\"ptagc\">".concat(priceFormat(product['price']), "</span> <span class=\"tag ptag\">").concat(priceFormat(price.priced), "</span>");
          if (el.note) price.html += "<div class=\"pricenote\">".concat(el.note, "</div>");
        }
      });
    }

    return price;
  };
  var setCookie$1 = function setCookie(name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = ";expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/";
  };
  var getCookie$1 = function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  };
  var priceNorm = function priceNorm(price) {
    price = makeNumber(price);
    var priceF = (Math.round(parseFloat(price) * 100) / 100).toFixed(2);
    return priceF;
  };
  var priceFormat = function priceFormat(price) {
    price = makeNumber(price);
    var priceF = priceNorm(price);

    switch (config.price.style) {
      case 'left':
        priceF = config.price.symbol + priceF;
        break;

      case 'right':
        priceF = priceF + config.price.symbol;
        break;
    }

    return priceF;
  };
  var makeNumber = function makeNumber(price) {
    price = price == "" ? 0 : price;
    return price;
  };
  var randomString = function randomString(length_) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

    if (typeof length_ !== "number") {
      length_ = Math.floor(Math.random() * chars.length_);
    }

    var str = '';

    for (var i = 0; i < length_; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }

    return str;
  };
  var convertToSlug = function convertToSlug(str) {
    return str.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  };
  var vibrate = function vibrate() {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(20);
    }
  };
  var toast = function toast(msg) {
    var t = document.querySelector(".kUNwHA .snackbar");
    t.innerHTML = msg;
    t.classList.add("show");
    setTimeout(function () {
      t.className = t.className.replace("show", "");
    }, 2200);
  };
  var __ = function __(text) {
    var match = function match(input, pa) {
      pa.forEach(function (p, i) {
        input = input.replace('%' + (i + 1) + '$', p);
      });
      return input;
    };

    for (var _len = arguments.length, p = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      p[_key - 1] = arguments[_key];
    }

    if (i18n.state.locale.values[text] === undefined) return match(text, p);
    return match(i18n.state.locale.values[text], p);
  };
  var renderStatus = function renderStatus(__, status) {
    switch (status) {
      case 'new':
        return '<div class="badge btn-warning text-dark fw-light">' + __('New') + '</div>';

      case 'processing':
        return '<div class="badge btn-warning text-dark fw-light">' + __('Cooking') + '</div>';

      case 'paid':
        return '<div class="badge btn-warning text-dark fw-light">' + __('New') + '</div>';

      case 'completed':
        return '<div class="badge btn-success text-dark fw-light">' + __('Served') + '</div>';

      case 'canceled':
        return '<div class="badge btn-secondary text-dark fw-light">' + __('Canceled') + '</div>';

      case 'refunded':
        return '<div class="badge btn-secondary text-dark fw-light">' + __('Refunded') + '</div>';

      case 'failed':
        return '<div class="badge btn-secondary text-dark fw-light">' + __('Failed') + '</div>';

      default:
        return '<div class="badge btn-primary text-dark fw-light">' + __('Processing') + '</div>';
    }
  };
  var timeConverterAgo = function timeConverterAgo(__, now, time) {
    now = parseInt(now);
    time = parseInt(time);
    var past = now - time;
    if (past < 60) return 'moments ago';
    if (past < 3600) return parseInt(past / 60) + ' minutes ago';
    if (past < 86400) return parseInt(past / 60 / 24) + ' hours ago';
    var a = new Date(time * 1000);
    var months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    a.getHours();
    a.getMinutes();
    a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
  };

  var cart$1 = {
    state: {
      total: 0,
      count: 0,
      index: 0,
      product: {
        variations: []
      },
      order: {}
    },
    resetButton: function resetButton() {
      cart$1.state.total = 0;
      cart$1.state.count = 0;
    },
    refreshButton: function refreshButton() {
      products[cart$1.state.index].priced = getPrice(products[cart$1.state.index]).priced;
      cart$1.state.product.qty = parseInt(document.querySelector(".kUNwHA .mdialog .qty").value);
      cart$1.state.product.price = products[cart$1.state.index].priced ? parseFloat(products[cart$1.state.index].priced) : parseFloat(products[cart$1.state.index].price);
      cart$1.state.product.note = document.querySelector(".kUNwHA .mdialog .kp-note textarea").value;
      var cb_count = 0;
      var checkbox_list = document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox]");

      var _iterator = _createForOfIteratorHelper(checkbox_list),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cb = _step.value;

          if (cb.checked) {
            cb_count++;
            cart$1.state.product.price += parseFloat(cb.dataset.price);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var ra_count = 0;
      var radio_list = document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio]");

      var _iterator2 = _createForOfIteratorHelper(radio_list),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var ra = _step2.value;

          if (ra.checked) {
            ra_count++;
            cart$1.state.product.price += parseFloat(ra.dataset.price);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      cart$1.state.product.priceF = parseFloat(cart$1.state.product.price * cart$1.state.product.qty);
      document.querySelector(".kUNwHA .mdialog .add .price").innerHTML = priceFormat(cart$1.state.product.priceF);
      var dis = false;
      if (cart$1.state.product.priceF == 0) dis = true;

      for (var v in cart$1.state.product.variations) {
        if (cart$1.state.product.variations[v].allow == false) dis = true;
      }

      document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .add").style.background = "";

      if (cart$1.state.product.type == 'update' && cart$1.state.product.qty > 0) {
        document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .cta").innerHTML = __("Update");
      }

      if (cart$1.state.product.type == 'update' && cart$1.state.product.qty == 0) {
        document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .cta").innerHTML = __("Remove");
        if (document.querySelector(".kUNwHA .mdialog .kp-add .btn .add")) document.querySelector(".kUNwHA .mdialog .kp-add .btn .add").style.background = "#df1960";
        dis = false;
      }

      if (cart$1.state.product.type == 'new') {
        document.querySelector(".kUNwHA .mdialog .kp-add .mbtn .cta").innerHTML = __("Add");
      }

      if (dis) {
        document.querySelector(".kUNwHA .mdialog .kp-add .mbtn").classList.add("dis");
      } else {
        document.querySelector(".kUNwHA .mdialog .kp-add .mbtn").classList.remove("dis");
      }
    },
    refreshCheckoutButton: function refreshCheckoutButton() {
      var total = 0;

      for (var p in cart$1.state.order.items) {
        total += parseFloat(cart$1.state.order.items[p].priceF);
      }

      cart$1.state.order.total = total;

      if (total > 0) {
        document.querySelector("body").classList.add("cbtn");
        setBtnStep(1);
        document.querySelector(".kUNwHA .cta-btn .price").innerHTML = priceFormat(total);
      } else {
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = __("cart empty");
        document.querySelector("body").classList.remove("cbtn");
      }
    },
    addToCart: function addToCart() {
      cart$1.state.order.items = cart$1.state.order.items.filter(function (el) {
        return el.id != cart$1.state.product.id;
      });
      cart$1.state.order.items.push(cart$1.state.product);

      if (cart$1.state.product.qty == 0) {
        cart$1.removeFromCart(cart$1.state.product.id);
      } else {
        document.querySelector(".kUNwHA .kenzap-row[data-id='" + cart$1.state.product.id + "'] .ctag").innerHTML = cart$1.state.product.qty;
      }

      localStorage.cart = JSON.stringify(cart$1.state.order);
      cart$1.refreshCheckoutButton();
    },
    removeFromCart: function removeFromCart(id) {
      cart$1.state.order.items = cart$1.state.order.items.filter(function (el) {
        return el.id != id;
      });
      delete cart$1.state.order.items[id];
      document.querySelector(".kUNwHA .kenzap-row[data-id='" + id + "'] .ctag").innerHTML = "";
      localStorage.cart = JSON.stringify(cart$1.state.order);
    },
    clearCart: function clearCart() {
      for (var i in cart$1.state.order.items) {
        document.querySelector(".kUNwHA .kenzap-row[data-id='" + cart$1.state.order.items[i].id + "'] .ctag").innerHTML = "";
      }

      cart$1.state.order = {};
      cart$1.state.order.created = Math.floor(Date.now() / 1000);
      cart$1.state.order.items = [];
      localStorage.cart = JSON.stringify(cart$1.state.order);
      cart$1.refreshCheckoutButton();
      window.history.replaceState({}, document.title, config.domain);
    }
  };
  var addOrderHistory = function addOrderHistory(id) {
    var pastOrders = [];

    try {
      pastOrders = JSON.parse(localStorage.orderIDs);
    } catch (e) {}

    var timestamp = Date.now() / 1000 | 0;
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var obj = {
      time: timestamp,
      date: year + '' + month + '' + day,
      id: id
    };
    pastOrders.push(obj);
    localStorage.orderIDs = JSON.stringify(pastOrders);
  };
  var initCart = function initCart() {
    setBtnStep(1);

    try {
      var order = localStorage.cart;

      if (!order) {
        order = {
          created: Math.floor(Date.now() / 1000)
        };
      } else {
        order = JSON.parse(order);
      }

      if (typeof order.items === 'undefined') {
        order.items = [];
      }

      if (order.created + 3600 < Math.floor(Date.now() / 1000)) {
        order.items = [];
        order.created = Math.floor(Date.now() / 1000);
      }

      cart$1.state.order = order;
    } catch (e) {
      cart$1.state.order.created = Math.floor(Date.now() / 1000);
      cart$1.state.order.items = [];
    }

    if (!localStorage.idd) localStorage.idd = randomString(8) + Math.floor(Date.now());
    cart$1.refreshCheckoutButton();
  };
  var structOrderRow = function structOrderRow(type, row) {
    var vars = '';

    for (var v in row.variations) {
      var list = '';

      for (var l in row.variations[v].list) {
        list += row.variations[v].list[l].title + " ";
      }

      vars += '<div><b>' + row.variations[v].title + "</b> <span>" + list + "</span></div> ";
      if (row.variations[v].note !== undefined && row.variations[v].note.length > 0) vars += "<div><b>" + __('Note') + "</b> " + row.variations[v].note + "</div> ";
    }

    return '<tr><td data-id="' + row.id + '" data-title="' + __(row.title) + '" class="checkt"><div>' + __(row.title) + '</div><div>' + vars + '</div></td><td class="qty">' + row.qty + '</td><td class="price"><strong>' + priceFormat(row.price) + '</strong></td></tr>';
  };
  var structOrderTotals = function structOrderTotals(cart, settings, order) {
    var html = "",
        grand_total_temp = parseFloat(order.total);
    cart.state.order.price = {
      grand_total: 0,
      total: parseFloat(order.total),
      discount_percent: 0,
      discount_total: 0,
      fee_total: 0,
      tax_total: 0,
      tax_percent: 0
    };
    html += "<tr><td colspan=\"4\"><div class=\"price\" style=\"margin-top:16px;\">".concat(__('Subtotal'), " <b>").concat(priceFormat(cart.state.order.price.total), "</b></div></td></tr>");

    if (settings.price.fee_calc) {
      cart.state.order.price.fee_total = parseFloat(settings.price.fee_percent * cart.state.order.price.total) / 100;
      cart.state.order.price.fee_percent = settings.price.fee_percent;
      html += "<tr><td colspan=\"4\"><div class=\"price\" >".concat(__(settings.price.fee_display), " <b>").concat(priceFormat(cart.state.order.price.fee_total), "</b></div></td></tr>");
      grand_total_temp += cart.state.order.price.fee_total;
    }

    if (settings.price.tax_calc) {
      cart.state.order.price.tax_total = (cart.state.order.price.fee_total + cart.state.order.price.total) * parseFloat(settings.price.tax_percent) / 100;
      cart.state.order.price.tax_percent = settings.price.tax_percent;
      html += "<tr><td colspan=\"4\"><div class=\"price \">".concat(settings.price.tax_display, " <b>").concat(priceFormat(cart.state.order.price.tax_total), "</b></div></td></tr>");
      grand_total_temp += cart.state.order.price.tax_total;
    }

    cart.state.order.price.grand_total = priceNorm(grand_total_temp);
    html += "<tr><td colspan=\"4\"><div class=\"price \" style=\"font-size:19px;font-weight:700;\">".concat(__('Total'), " <b>").concat(priceFormat(cart.state.order.price.grand_total), "</b></div></td></tr>");
    return html;
  };
  var setBtnStep = function setBtnStep(step) {
    document.querySelector(".kUNwHA .cta-btn").style.display = "flex";

    switch (step) {
      case 1:
        cart$1.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = __('Cart') + ' <span class="price">s$0.00</span>';
        break;

      case 2:
        cart$1.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = __('Continue');
        break;

      case 3:
        cart$1.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = __('Checkout');
        break;

      case 4:
        cart$1.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = __('Back to menu');
        break;
    }
  };

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */

  /**
   * @name hideLoader
   * @description Removes full screen three dots loader.
   */
  const hideLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'none';
  };

  /**
   * @name spaceID
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
   const spaceID = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name setCookie
   * @description Set cookie by its name to all .kenzap.cloud subdomains
   * @param {string} name - Cookie name.
   * @param {string} value - Cookie value.
   * @param {string} days - Number of days when cookie expires.
   */
   const setCookie = (name, value, days) => {

      let expires = "";
      if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = ";expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/;domain=.kenzap.cloud"; 
  };

  /**
   * @name getCookie
   * @description Read cookie by its name.
   * @param {string} cname - Cookie name.
   * 
   * @returns {string} value - Cookie value.
   */
  const getCookie = (cname) => {

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  };

  /**
   * @name checkHeader
   * @description This function tracks UI updates, creates header version checksum and compares it after every page reload
   * @param {object} object - API response.
   */
   const checkHeader = () => {

      let version = (localStorage.hasOwnProperty('header') && localStorage.hasOwnProperty('header-version')) ? localStorage.getItem('header-version') : 0;
      let check = window.location.hostname + '/' + spaceID() + '/' + getCookie('locale');
      if(check != getCookie('check')){ version = 0; console.log('refresh'); }
      
      setCookie('check', check, 5);

      return version
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries. 
   * @param {object} headers
   */
   ({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': checkHeader(),
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': spaceID(),
  });

  /**
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
   const parseApiError = (data) => {

      // outout to frontend console
      console.log(data);

      // unstructured failure
      if(isNaN(data.code)){
      
          // structure failure data
          let log = data;
          try{ log = JSON.stringify(log); }catch(e){ }

          let params = new URLSearchParams();
          params.append("cmd", "report");
          params.append("sid", spaceID());
          params.append("token", getCookie('kenzap_token'));
          params.append("data", log);
          
          // report error
          fetch('https://api-v1.kenzap.cloud/error/', { method: 'post', headers: { 'Accept': 'application/json', 'Content-type': 'application/x-www-form-urlencoded', }, body: params });

          alert('Can not connect to Kenzap Cloud');  
          return;
      }
      
      // handle cloud error codes
      switch(data.code){

          // unauthorized
          case 401:

              // dev mode
              if(window.location.href.indexOf('localhost')!=-1){ 

                  alert(data.reason); 
                  return; 
              }

              // production mode
              location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href; break;
          
          // something else
          default:

              alert(data.reason); 
              break;
      }
  };

  /**
   * @name onClick
   * @description One row click event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onClick = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
      }
  };

  var scroll$1 = {
    state: 0,
    last_state: 0,
    state_prev: 0,
    fp: 0,
    el_id: "",
    direction: "",
    offsets: {},
    timer: null
  };
  var renderMenu = function renderMenu() {
    var rows = settings.categories.split('\n');
    var html_slider = '';
    var html_menu = '';
    var title = '';

    var _iterator = _createForOfIteratorHelper(rows),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        var val = c.split('|');
        var cat = val[0].trim();
        var note = val[1] == null ? '' : val[1].trim();
        html_slider += '<div class="slide" data-href="' + convertToSlug(cat) + '"><a href="#' + convertToSlug(cat) + '" class=" cl">' + __(cat) + '</a></div>';

        var _loop = function _loop(x) {
          products[x].id = products[x]._id;
          if (typeof products[x]['cats'] === 'undefined') return "continue";
          if (products[x]['cats'] == null) return "continue";
          if (!products[x]['cats'].includes(cat)) return "continue";
          var img = 'https://cdn.kenzap.com/loading.png';

          if (products[x]['img'][0] || products[x]['img'][0] == 'true') {
            var imgl = new Image();
            imgl._id = products[x]['_id'];
            imgl.updated = products[x]['updated'];

            (function (i) {
              i.onload = function () {
                document.querySelector(".kUNwHA .kenzap-row[data-id='" + i._id + "'] img").setAttribute('src', i.src);
              };

              i.src = CDN + '/S' + localStorage.sid + '/product-' + i._id + '-1-250.jpeg?' + i.updated;
            })(imgl);
          }

          var info = '';
          if (products[x]['stock']) if (products[x]['stock']['management']) if (parseInt(products[x]['stock']['qty']) == 0) {
            info = __('sold out');
          }
          var item_cart = cart$1.state.order.items.find(function (el) {
            return el.id == products[x]['_id'];
          });
          var ctag = typeof item_cart === 'undefined' ? "" : item_cart.qty;
          var show_heading = '';

          if (title != cat) {
            title = cat;
            show_heading = '<h2 id="' + convertToSlug(title) + '">' + __(title) + '</h2><p class="subnote">' + __(note) + '</p>';
          }

          html_menu += "\n            <div class=\"kenzap-row\" data-nostock=\"".concat(info ? true : false, "\" data-index=\"").concat(x, "\" data-id=\"").concat(products[x]['_id'], "\">\n                ").concat(show_heading, "\n                <div class=\"info-box\">\n                    <div class=\"kenzap-col-7\">\n                        <div class=\"kp-content\">\n                            <h3><span class=\"tag ctag\">").concat(ctag, "</span>").concat(__(products[x]['title']), "</h3>\n                            <p>").concat(__(products[x]['sdesc']), "</p>\n                            ").concat(info ? '<span class="tag ptag">' + __('sold out') + '</span>' : getPrice(products[x]).html, "\n                        </div>\n                    </div>\n                    <div class=\"kenzap-col-5\">\n                        <div class=\"kp-img\">\n                            <img src=\"").concat(img, "\" alt=\"").concat(products[x]['title'], "\">\n                            <div class=\"kp-info\">").concat(info, "</div>\n                        </div>\n                    </div>\n                </div>\n            </div> ");
        };

        for (var x in products) {
          var _ret = _loop(x);

          if (_ret === "continue") continue;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var slider_container = document.querySelector(".kUNwHA .slideset");
    var menu_container = document.querySelector(".kUNwHA .kenzap-container");

    if (html_menu == '') {
      menu_container.innerHTML = __("Please add products and specify categories first");
    } else {
      slider_container.innerHTML = html_slider;
      menu_container.innerHTML = html_menu;
    }
  };
  var menuListeners = function menuListeners() {
    var row_list = document.querySelectorAll(".kUNwHA .kenzap-row");

    var _iterator2 = _createForOfIteratorHelper(row_list),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var row = _step2.value;
        row.addEventListener('click', function (e) {
          if (e.currentTarget.dataset.nostock == 'true') {
            alert(__('Product sold out'));
            return false;
          }

          var x = e.currentTarget.dataset.index;
          cart$1.state.index = x;
          var product_id = products[x].id;
          var mdialogCnt = document.querySelector(".kUNwHA .mdialog-cnt");
          scroll$1.last_state = scroll$1.state;
          cart$1.state.total = 0;
          cart$1.state.count = 0;
          var item_cart = cart$1.state.order.items.find(function (el) {
            return el.id == product_id;
          });
          cart$1.state.product = typeof item_cart === 'undefined' ? {
            id: products[x].id,
            title: products[x].title,
            sdesc: products[x].sdesc,
            index: x,
            qty: 0,
            note: "",
            variations: []
          } : item_cart;
          cart$1.state.product.type = cart$1.state.product.qty == 0 ? "new" : "update";
          document.querySelector("body").classList.add('kp-modal');
          history.pushState({
            pageID: 'feed'
          }, 'Feed', window.location.pathname + window.location.search + "#editing");
          refreshDialogView();
          var src = products[x]['img'][0] ? CDN + '/S' + localStorage.sid + '/product-' + products[x]['_id'] + '-1-250.jpeg?' + products[x]['updated'] : 'https://cdn.kenzap.com/loading.png';
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-body > h2").innerHTML = __(cart$1.state.product.title);
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-body > p").innerHTML = __(cart$1.state.product.sdesc);
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-img img").setAttribute('src', src);
          document.querySelector(".kUNwHA .mdialog .qty").value = cart$1.state.count = cart$1.state.product.qty;
          document.querySelector(".kUNwHA .mdialog .kp-note textarea").value = cart$1.state.product.note;
          var imgl = new Image();
          imgl._id = products[x]['_id'];
          imgl.updated = products[x]['updated'];

          (function (i) {
            i.onload = function () {
              document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-img img").setAttribute('src', i.src);
            };

            i.src = CDN + '/S' + localStorage.sid + '/product-' + i._id + '-1-500.jpeg?' + i.updated;
          })(imgl);

          var html_vars = '';
          if (_typeof(products[x].variations !== 'undefined')) for (var v in products[x].variations) {
            var type = '';
            if (products[x].variations[v].type == 'checkbox') type = 'check';
            if (products[x].variations[v].type == 'radio') type = 'radio';
            if (typeof cart$1.state.product.variations[v] === 'undefined') cart$1.state.product.variations[v] = {
              title: products[x].variations[v].title,
              required: products[x].variations[v].required,
              allow: products[x].variations[v].required == '1' ? false : true
            };
            html_vars += '\
                <h3>' + __(products[x].variations[v].title) + (products[x].variations[v].required == '1' ? ' <span class="tag">' + __('required') + '</span>' : '') + '</h3>\
                <div class="kp-' + type + '">';

            for (var d in products[x].variations[v].data) {
              var checked = false;

              if (typeof cart$1.state.product.variations[v] !== 'undefined' && typeof cart$1.state.product.variations[v].list !== 'undefined' && typeof cart$1.state.product.variations[v].list["_" + d] !== 'undefined') {
                checked = true;
              }

              products[x].variations[v].data[d]['price'] = makeNumber(products[x].variations[v].data[d]['price']);

              switch (type) {
                case 'check':
                  html_vars += "\n                                <label>\n                                    <input type=\"checkbox\" data-required=\"".concat(products[x].variations[v].required, "\" data-indexv=\"").concat(v, "\" data-index=\"").concat(d, "\" data-title=\"").concat(products[x].variations[v].data[d]['title'], "\" data-price=\"").concat(products[x].variations[v].data[d]['price'], "\" ").concat(checked ? 'checked="checked"' : '', ">\n                                    <div class=\"checkbox\">\n                                        <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\">\n                                            <path d=\"M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z\"></path>\n                                            <polyline points=\"4 11 8 15 16 6\"></polyline>\n                                        </svg>\n                                    </div>\n                                    <span>").concat(__(products[x].variations[v].data[d]['title']), "</span>\n                                    <div class=\"price\">+ ").concat(priceFormat(products[x].variations[v].data[d]['price']), "</div>\n                                </label>");
                  break;

                case 'radio':
                  html_vars += "\n                                <label>\n                                    <input type=\"radio\" data-required=\"".concat(products[x].variations[v].required, "\" data-indexv=\"").concat(v, "\" name=\"radio").concat(v, "\" data-index=\"").concat(d, "\" data-title=\"").concat(products[x].variations[v].data[d]['title'], "\" data-price=\"").concat(products[x].variations[v].data[d]['price'], "\" ").concat(checked ? 'checked="checked"' : '', " />\n                                    <span>").concat(__(products[x].variations[v].data[d]['title']), "</span>\n                                    <div class=\"price\">+ ").concat(priceFormat(products[x].variations[v].data[d]['price']), "</div>\n                                </label>");
                  break;
              }
            }

            html_vars += '</div>';
          }
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-vars").innerHTML = html_vars;
          cart$1.refreshButton();
          mdialogCnt.style.display = "block";
          document.querySelector(".kUNwHA .overlay").style.display = "block";
          var checkbox_list = document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox]");

          var _iterator3 = _createForOfIteratorHelper(checkbox_list),
              _step3;

          try {
            var _loop2 = function _loop2() {
              var cb = _step3.value;
              cb.addEventListener('change', function () {
                var v = parseInt(cb.dataset.indexv);
                cart$1.state.product.variations[v].list = {};
                var count = 0;

                var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox][data-indexv='" + v + "']")),
                    _step5;

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var cbg = _step5.value;

                    if (cb.dataset.required == "1") {
                      if (count) cart$1.state.product.variations[v].allow = true;
                    } else {
                      cart$1.state.product.variations[v].allow = true;
                    }

                    if (cbg.checked) {
                      cart$1.state.product.variations[v].list["_" + cbg.dataset.index] = {
                        title: cbg.dataset.title,
                        price: parseFloat(cbg.dataset.price)
                      };
                      count += 1;
                    }
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }

                cart$1.refreshButton();
              });
            };

            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          var radio_list = document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio]");

          var _iterator4 = _createForOfIteratorHelper(radio_list),
              _step4;

          try {
            var _loop3 = function _loop3() {
              var cb = _step4.value;
              cb.addEventListener('change', function () {
                var v = parseInt(cb.dataset.indexv);
                cart$1.state.product.variations[v].list = {};
                var count = 0;

                var _iterator6 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio][data-indexv='" + v + "']")),
                    _step6;

                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    var rag = _step6.value;

                    if (rag.checked) {
                      cart$1.state.product.variations[v].list["_" + rag.dataset.index] = {
                        title: rag.dataset.title,
                        price: parseFloat(rag.dataset.price)
                      };
                      count += 1;
                    }

                    if (cb.dataset.required == "1") {
                      if (count) cart$1.state.product.variations[v].allow = true;
                    } else {
                      cart$1.state.product.variations[v].allow = true;
                    }
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }

                cart$1.refreshButton();
              });
            };

            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              _loop3();
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var qty = document.querySelector(".kUNwHA .mdialog .qty");
    var plus = document.querySelector(".kUNwHA .mdialog .plus");
    plus.addEventListener('click', function (e) {
      if (cart$1.state.count < config.cart.max_addition) cart$1.state.count += 1;
      qty.value = cart$1.state.count;
      cart$1.refreshButton();
      vibrate();
    });
    var minus = document.querySelector(".kUNwHA .mdialog .minus");
    minus.addEventListener('click', function (e) {
      if (cart$1.state.count > 0) cart$1.state.count -= 1;
      qty.value = cart$1.state.count;
      cart$1.refreshButton();
      vibrate();
    });
    var add = document.querySelector(".kUNwHA .mdialog .add");
    add.addEventListener('click', function (e) {
      if (e.currentTarget.parentNode.classList.contains("dis")) {
        alert(__("Please select required fields"));
        return;
      }

      cart$1.addToCart();
      closeModal$1();
      toast(__("Cart updated"));
      vibrate();
    });
  };
  var sliderListeners = function sliderListeners() {
    var slide_list = document.querySelectorAll(".kUNwHA .slideset .slide");

    var _iterator7 = _createForOfIteratorHelper(slide_list),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var slide = _step7.value;
        var scrollDiv = slide.offsetLeft;
        scroll$1.offsets[slide.dataset.href] = scrollDiv;
        slide.addEventListener('click', function (e) {
          var sto = document.documentElement.scrollTop;
          setTimeout(function (el) {
            var _iterator8 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .slide")),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var l = _step8.value;
                l.classList.remove("active");
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            el.classList.add("active");
          }, 250, this);
        });
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  };
  var refreshDialogView = function refreshDialogView() {
    if (document.querySelector("body").classList.contains('kp-modal')) {
      document.querySelector("body").style.height = '100vh';
      document.querySelector("body").style.overflowY = 'hidden';
      document.querySelector(".kUNwHA .scrollable").style.height = '100vh';
      document.querySelector(".kUNwHA .scrollable").style.overflowY = 'hidden';
      document.querySelector(".kUNwHA .mdialog-cnt").style.height = window.screen.availHeight - 160 + "px";
    }
  };
  var closeModal$1 = function closeModal() {
    var mdialogCnt = document.querySelector(".kUNwHA .mdialog-cnt");
    mdialogCnt.style.display = "none";
    document.querySelector(".kUNwHA .overlay").style.display = "none";
    document.querySelector(".kUNwHA .scrollable").style.height = 'auto';
    document.querySelector(".kUNwHA .scrollable").style.overflowY = 'scroll';
    document.querySelector("body").style.overflowY = 'auto';
    document.querySelector("body").style.height = 'auto';
    setTimeout(function () {
      document.querySelector("body").classList.remove('kp-modal');
    }, 300);
    document.documentElement.scrollTop = scroll$1.last_state;
    var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
    cdialogCnt.style.display = "none";
    cart$1.refreshCheckoutButton();
    document.querySelector(".kUNwHA .cta-btn").style.display = "flex";
    if (window.location.href.indexOf("#editing") == -1) return;
    history.pushState({
      pageID: 'feed'
    }, 'Feed', window.location.pathname + window.location.search);
  };

  var account = {
    initModal: function initModal(t) {
      var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
      cdialogCnt.style.display = "block";
      document.querySelector(".kUNwHA .overlay").style.display = "block";
      document.querySelector(".kUNwHA .cta-btn").style.display = "none";
      document.querySelector("body").classList.add('kp-modal');
      history.pushState({
        pageID: 'feed'
      }, 'Feed', window.location.pathname + window.location.search + "#account");
      refreshDialogView();
      var html = "\n        <div class=\"account\">\n            <h3><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"bell\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n            <path d=\"M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z\"></path>\n            </svg>".concat(__('Order received'), " <span class=\"statusLast\"></span></h3>\n            <p>").concat(__('You can track your order from the table below or click on the bell to call waiter.'), "</p>\n            <div class=\"lottie-cont\"></div>\n            ");

      if (t == 'new') {
        html = "\n            <div class=\"account\">\n                <h3><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"bell\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n                <path d=\"M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z\"></path>\n                </svg>".concat(__('Order received!'), " <span class=\"statusLast\"></span></h3>\n                <p>").concat(__('Thank you for placing your order. You can track your order from the table below or click on the bell to call waiter.'), "</p>\n                <div class=\"lottie-cont\"></div>\n                ");
      }

      html += "\n            <h4>".concat(__('Orders'), "</h4>\n            <div class=\"orders\">");
      loadOrders(html, cdialogCnt);
      html += '</div>';
      html += '</div>';
      cdialogCnt.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML = html;
      onClick('.kUNwHA .bell', function (e) {
        var c = confirm(__('Call waiter?'));
        if (!c) return;
        document.querySelector('.kUNwHA .bell').classList.add('dn');
        var urlParams = new URLSearchParams(window.location.search);
        var table = urlParams.get('table') ? urlParams.get('table') : "";
        fetch('https://api-v1.kenzap.cloud/ecommerce/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + API_KEY,
            'Kenzap-Token': config.token,
            'Kenzap-Sid': localStorage.sid
          },
          body: JSON.stringify({
            query: {
              notify: {
                type: 'notify',
                key: 'ecommerce-message',
                sid: localStorage.sid,
                data: {
                  channel: "waiter",
                  idd: localStorage.idd,
                  msg: "table " + table + " is calling",
                  color: "danger"
                }
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            toast(__("Calling, please wait a moment!"));
          } else {
            document.querySelector('.kUNwHA .bell').classList.remove('dn');
            toast(__("Oops, please try again"));
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      });
    }
  };

  var loadOrders = function loadOrders(html, cdialogCnt) {
    var term = localStorage.idd;
    fetch('https://api-v1.kenzap.cloud/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + API_KEY,
        'Kenzap-Token': config.token,
        'Kenzap-Sid': localStorage.sid
      },
      body: JSON.stringify({
        query: {
          user: {
            type: 'authenticate',
            fields: ['avatar'],
            token: getCookie('kenzap_token')
          },
          orders: {
            type: 'find',
            key: 'ecommerce-order',
            fields: ['id', '_id', 'status', 'items', 'created'],
            term: term != '' ? 'idd=\'' + term + '\'' : '',
            limit: 10,
            sortby: {
              field: 'created',
              order: 'DESC'
            }
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      hideLoader();

      if (response.success) {
        var first = true;
        var lottie = 'cooking';
        var ohtml = '<ul class="accordion">';

        var _iterator = _createForOfIteratorHelper(response.orders),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var order = _step.value;

            if (first) {
              document.querySelector('.statusLast').innerHTML = renderStatus(__, order.status);

              if (order.status == 'completed') {
                lottie = 'serving';
              }
            }

            ohtml += structOrders(first, order);
            first = false;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        switch (lottie) {
          case 'cooking':
            document.querySelector('.account .lottie-cont').innerHTML = '<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_fefIZO.json" background="transparent" speed="1" class="lplayer" style="width: 300px; height: auto;" loop autoplay></lottie-player>';
            break;

          case 'serving':
            document.querySelector('.account .lottie-cont').innerHTML = '<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_thgy1p9c.json" background="transparent" speed="1" class="lplayer" style="width: 300px; height: auto;" loop autoplay></lottie-player>';
            break;
        }

        ohtml += '</ul>';
        cdialogCnt.querySelector(".kUNwHA .orders").innerHTML = ohtml;
        onClick('.kUNwHA .accordion .cancel-order', function (e) {
          e.preventDefault();

          if (!confirm(__('Cancel order?'))) {
            return false;
          }

          var el = e.currentTarget;
          fetch('https://api-v1.kenzap.cloud/ecommerce/', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + API_KEY,
              'Kenzap-Token': config.token,
              'Kenzap-Sid': localStorage.sid
            },
            body: JSON.stringify({
              query: {
                status: {
                  type: 'update-order-status',
                  id: el.dataset._id,
                  status: "canceled"
                }
              }
            })
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            hideLoader();

            if (response.success) {
              el.parentElement.parentElement.querySelector('.badge').innerHTML = __('Canceled');
              toast(__("Order #" + el.dataset.id + " canceled"));
              el.remove();
              closeModal();
            }
          })["catch"](function (error) {
            parseApiError(error);
          });
        });
        onClick('.kUNwHA .accordion .toggle', function (e) {
          e.preventDefault();

          if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
            e.currentTarget.parentElement.querySelector('.inner').classList.remove('show');
            e.currentTarget.parentElement.querySelector('.plusminus').classList.remove('active');
          } else {
            e.currentTarget.classList.add('active');
            e.currentTarget.parentElement.querySelector('.inner').classList.add('show');
            e.currentTarget.parentElement.querySelector('.plusminus').classList.add('active');
          }
        });
        document.querySelector(".kUNwHA .cta-btn").style.display = "none";
      } else {
        toast(__("Please make your first order"));
        closeModal();
      }
    })["catch"](function (error) {
      parseApiError(error);
    });
  };

  var structOrders = function structOrders(first, order) {
    var html = "<li>\n        <a class=\"toggle ".concat(first ? 'active' : '', " \" href=\"#\">\n            #").concat(order.id, " <span class=\"timago\">").concat(timeConverterAgo(__, Date.now() / 1000 | 0, order.created), "</span> ").concat(renderStatus(__, order.status), "<div class=\"plusminus ").concat(first ? 'active' : '', "\"></div>\n        </a>\n        <div class=\"inner ").concat(first ? 'show' : '', "\">\n            <table>\n                <tr><th><div class=\"me-1 me-sm-3\">").concat(__('Product'), "</div></th><th class=\"qty\"><div class=\"me-1 me-sm-3\">").concat(__('Qty'), "</div></th><th class=\"price\"><div class=\"me-1 me-sm-3\">").concat(__('Total'), "</div></th><th></th></tr>");

    for (var item in order.items) {
      html += structOrderRow('history', order.items[item]);
    }

    html += "</table> \n            <div class=\"tag cancel-order ".concat(order.status != 'new' ? 'dn' : '', "\" data-id=\"").concat(order.id, "\" data-_id=\"").concat(order._id, "\">").concat(__('Cancel order'), "</div>\n        </div>\n    </li>");
    return html;
  };
  var closeModal = function closeModal() {
    var mdialogCnt = document.querySelector(".kUNwHA .mdialog-cnt");
    mdialogCnt.style.display = "none";
    document.querySelector(".kUNwHA .overlay").style.display = "none";
    document.querySelector(".kUNwHA .scrollable").style.height = 'auto';
    document.querySelector(".kUNwHA .scrollable").style.overflowY = 'scroll';
    document.querySelector("body").style.overflowY = 'auto';
    document.querySelector("body").style.height = 'auto';
    setTimeout(function () {
      document.querySelector("body").classList.remove('kp-modal');
    }, 300);
    document.documentElement.scrollTop = scroll.last_state;
    var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
    cdialogCnt.style.display = "none";
    document.querySelector(".kUNwHA .cta-btn").style.display = "flex";
    if (typeof cart === 'undefined') return;
    cart.refreshCheckoutButton();
  };

  var table = '';

  var getData = function getData() {
    var limit = 1000;
    var offset = 0;
    var query = {
      products: {
        type: 'get-products',
        key: 'ecommerce-product',
        fields: ['_id', 'img', 'status', 'price', 'priced', 'title', 'cats', 'sdesc', 'ldesc', 'stock', 'discounts', 'variations', 'updated'],
        limit: limit,
        offset: offset,
        sortby: {
          field: 'created',
          order: 'ASC'
        }
      }
    };
    fetch('https://api-v1.kenzap.cloud/ecommerce/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
        'Kenzap-Sid': config.sid
      },
      body: JSON.stringify({
        query: query
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        products = response.products;
        setTable();
        initCart();
        getMenu();

        authUser();
        document.addEventListener("scroll", scrollEvents);
      } else {
        alert(__('Oops, something went wrong. Please try again.'));
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };

  getData();
  document.addEventListener("DOMContentLoaded", function () {
    if (config.moreButton) {
      document.querySelector('.kUNwHA .cta-btn .mbtnMore').style.display = "flex";
      document.querySelector(".kUNwHA .cta-btn .mbtnMore").addEventListener('click', function (e) {
        account.initModal('');
      });
    }
  });

  var setTable = function setTable() {
    var urlParams = new URLSearchParams(window.location.search);
    table = urlParams.get('table') ? urlParams.get('table') : "";
  };

  var btnListeners = function btnListeners() {
    document.querySelector(".kUNwHA .cta-btn .mbtn").addEventListener('click', function (e) {
      document.querySelector("body").classList.add('kp-modal');
      history.pushState({
        pageID: 'feed'
      }, 'Feed', window.location.pathname + window.location.search + "#checkout");
      refreshDialogView();

      if (cart$1.state.order.step == 1) {
        if (cart$1.state.order.total == 0) {
          toast(__("Cart is empty"));
          return;
        }

        viewCheckoutModal();
        setBtnStep(2);
        return;
      }

      if (cart$1.state.order.step == 2) {
        if (cart$1.state.order.total == 0) {
          toast(__("Cart is empty"));
          return;
        }

        if (config.fast_checkout == "2") {
          var urlParams = new URLSearchParams(window.location.search);
          cart$1.state.order.kid = "0";
          cart$1.state.order.name = "dine-in";
          cart$1.state.order.from = urlParams.get('table') ? "table " + urlParams.get('table') : "dine-in";
          cart$1.state.order.status = 'new';
          closeModal$1();
          toast(__("Checking out"));
          ajaxCheckout();
          return;
        }

        var html = '';
        html = '<div class="ptable">';
        html += '<label for="table" style="' + (table.length > 0 ? 'display:none;' : '') + '">' + __('Table number') + '</label>';
        html += '<input type="number" value="' + table + '" name="table" style="' + (table.length > 0 ? 'display:none;' : '') + '" autocomplete="off" class="table" size="4" pattern="" inputmode="">';
        html += '<label for="note">' + __('Note') + '</label>';
        html += '<textarea class="note" name="note" placeholder="' + __('leave a note for a kitchen') + '"></textarea>';
        html += '</div>';
        document.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML = html;
        document.querySelector(".kUNwHA .cdialog-cnt .ptable .table").focus();
        setBtnStep(3);
        return;
      }

      if (cart$1.state.order.step == 3) {
        var _table = document.querySelector(".kUNwHA .cdialog-cnt .ptable .table").value;
        var note = document.querySelector(".kUNwHA .cdialog-cnt .ptable .note").value;

        if (_table == "") {
          alert("Please enter table number");
          return;
        }

        cart$1.state.order.table = _table;
        cart$1.state.order.note = note;
        localStorage.cart = JSON.stringify(cart$1.state.order);
        var mdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
        mdialogCnt.style.display = "none";
        closeModal$1();
        var origin = config.domain;
        if (origin.indexOf('checkout') == -1) origin += (origin.indexOf('?') == -1 ? '?' : '&') + 'checkout=1';
        window.location.href = 'https://auth.kenzap.com/?app=' + appID + '&redirect=' + encodeURIComponent(origin);
        document.querySelector(".kUNwHA .overlay").style.display = "block";
        document.querySelector(".kUNwHA .overlay .loader").style.display = "block";
        return;
      }

      if (cart$1.state.order.step == 4) {
        closeModal$1();
        return;
      }
    });
  };

  var getMenu = function getMenu() {
    localStorage.sid = config.sid;
    renderMenu();
    dialogListeners();
    menuListeners();
    sliderListeners();
    btnListeners();
  };

  var dialogListeners = function dialogListeners() {
    var close = document.querySelector(".kUNwHA .mdialog .close");
    close.addEventListener('click', function (e) {
      closeModal$1();
    });
    var close2 = document.querySelector(".kUNwHA .cdialog .close");
    close2.addEventListener('click', function (e) {
      var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
      cdialogCnt.style.display = "none";
      setBtnStep(1);
      closeModal$1();
    });
    window.addEventListener("resize", refreshDialogView);
    window.addEventListener("orientationchange", refreshDialogView);
    window.addEventListener("hashchange", function (e) {
      if (document.querySelector('body').classList.contains('kp-modal')) {
        e.preventDefault();
        closeModal$1();
        return false;
      }
    });
  };

  var viewCheckoutModal = function viewCheckoutModal() {
    var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
    refreshDialogView();
    cdialogCnt.style.display = "block";
    document.querySelector(".kUNwHA .overlay").style.display = "block";
    var html = "\n        <table class=\"cart-table\">\n\n            <tr><th><div class=\"prod me-1 me-sm-3\">".concat(__('Product'), "</div></th><th class=\"qty\"><div class=\"me-1 me-sm-3\">").concat(__('Qty'), "</div></th><th class=\"price\"><div class=\"me-1 me-sm-3\">").concat(__('Total'), "</div></th><th></th></tr>");

    for (var p in cart$1.state.order.items) {
      html += structOrderRow('cart', cart$1.state.order.items[p]);
    }

    html += structOrderTotals(cart$1, config, cart$1.state.order);
    html += "\n        </table>";
    cdialogCnt.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML = html;

    var _iterator = _createForOfIteratorHelper(cdialogCnt.querySelectorAll(".kUNwHA .cdialog-cnt .kp-body .checkt")),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var td = _step.value;
        td.addEventListener('click', function (e) {
          var c = confirm("Remove " + e.currentTarget.dataset.title + "?");

          if (c) {
            document.querySelector(".kUNwHA .kenzap-row[data-id='" + e.currentTarget.dataset.id + "'] .ctag").innerHTML = "";
            cart$1.removeFromCart(e.currentTarget.dataset.id);
            cart$1.refreshCheckoutButton();

            if (Object.keys(cart$1.state.order.items).length == 0) {
              setBtnStep(1);
              closeModal$1();
              return;
            }

            viewCheckoutModal();
            setBtnStep(2);
          }
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var authUser = function authUser(cb, force) {
    console.log(cart$1.state.order);
    var urlParams = new URLSearchParams(window.location.search);
    var ott = urlParams.get('ott') ? urlParams.get('ott') : "";
    var params = new URLSearchParams();
    params.append("cmd", "get_state");
    params.append("app", appID);
    params.append("ott", ott);
    params.append("token", getCookie$1('kenzap_token'));
    config.token = getCookie$1('kenzap_token');
    fetch('https://api-v1.kenzap.cloud/auth/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: params
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      var checkout = urlParams.get('checkout') ? urlParams.get('checkout') : "";
      if (!checkout) return;

      if (response.success) {
        if (response.token) {
          config.token = response.token;
          setCookie$1('kenzap_token', response.token, 1);
          console.log('setting up token');
        }

        cart$1.state.order.kid = response.kid;
        cart$1.state.order.name = response.name;
        cart$1.state.order.from = table + ' - ' + response.name;
        cart$1.state.order.status = 'new';
        ajaxCheckout();
      } else {
        alert(__('Oops, something went wrong. Please try checking out again.'));
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };

  var ajaxCheckout = function ajaxCheckout() {
    cart$1.state.order.idd = localStorage.idd;
    cart$1.state.order.sid = localStorage.sid;
    cart$1.state.order.id = typeof cart$1.state.order.id === 'undefined' ? randomString(8) + Math.floor(Date.now()) : cart$1.state.order.id;
    localStorage.lastOrder = JSON.stringify(cart$1.state.order);
    var dateObj = new Date();
    cart$1.state.order['created_ymd'] = dateObj.getUTCFullYear() + '' + mt(dateObj.getUTCMonth() + 1) + '' + mt(dateObj.getUTCDate());
    cart$1.state.order['created_ym'] = dateObj.getUTCFullYear() + '' + mt(dateObj.getUTCMonth() + 1);
    cart$1.state.order['created_y'] = dateObj.getUTCFullYear() + '';
    fetch('https://api-v1.kenzap.cloud/ecommerce/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + API_KEY,
        'Kenzap-Token': config.token,
        'Kenzap-Sid': localStorage.sid
      },
      body: JSON.stringify({
        query: {
          order: {
            type: 'create-order',
            key: 'ecommerce-order',
            sid: localStorage.sid,
            data: cart$1.state.order
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        addOrderHistory(response.order.id);
        account.initModal('new');
        cart$1.clearCart();
        setBtnStep(4);
      } else {
        alert('Error: ' + JSON.stringify(response));
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };

  var scrollEvents = function scrollEvents() {
    var h_list = document.querySelectorAll(".kUNwHA .kenzap-row h2");
    var diff_prev = 0;
    var diff = 0;
    scroll$1.state = document.documentElement.scrollTop;

    var _iterator2 = _createForOfIteratorHelper(h_list),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var h = _step2.value;
        diff = h.offsetTop - document.documentElement.scrollTop;
        scroll$1.direction = "down";

        if (diff < 0) {
          if (diff_prev > diff) {
            diff = diff_prev;
            scroll$1.el_id = h.id;
          }
        }

        diff_prev = diff;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (scroll$1.state_prev != scroll$1.state) scroll$1.state_prev = scroll$1.state;

    if (scroll$1.el_id != "") {
      var sc = document.querySelector(".kUNwHA .cata-sub-nav");
      if (scroll$1.timer) clearTimeout(scroll$1.timer);
      scroll$1.timer = setTimeout(function (el_id) {
        sc.scrollTo({
          left: scroll$1.offsets[el_id],
          behavior: 'smooth'
        });

        var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .slide")),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var l = _step3.value;
            l.classList.remove("active");
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        document.querySelector(".kUNwHA [data-href='" + el_id + "']").classList.add("active");
      }, 200, scroll$1.el_id);
    }

    scroll$1.el_id = "";
  };

})();
//# sourceMappingURL=index.js.map
