
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

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */

  /**
   * @name setCookie
   * @description Set cookie by its name to all .kenzap.com subdomains
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
      d.cookie = name + "=" + (escape(value) || "") + expires + ";path=/;domain=.kenzap.com"; 
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

  var products = {};
  var scroll = {
    state: 0,
    last_state: 0,
    state_prev: 0,
    fp: 0,
    el_id: "",
    direction: "",
    offsets: {},
    timer: null
  };
  var table = '';
  var spaceID = '';
  var CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';
  var appID = '66432108790002';
  document.addEventListener("DOMContentLoaded", function () {
    setTable();
    initCart();
    getMenu();

    var cb = function cb() {
      console.log('processed');
    };

    authUser(cb, false);
    document.addEventListener("scroll", scrollEvents);
  });

  var setTable = function setTable() {
    var urlParams = new URLSearchParams(window.location.search);
    table = urlParams.get('table') ? urlParams.get('table') : "";
  };

  var toast = function toast(msg) {
    var t = document.querySelector(".kUNwHA .snackbar");
    t.innerHTML = msg;
    t.classList.add("show");
    setTimeout(function () {
      t.className = t.className.replace("show", "");
    }, 2200);
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
        order.items = {};
      }

      if (order.created + 3600 < Math.floor(Date.now() / 1000)) {
        order.items = {};
        order.created = Math.floor(Date.now() / 1000);
      }

      cart.state.order = order;
    } catch (e) {
      cart.state.order.created = Math.floor(Date.now() / 1000);
      cart.state.order.items = {};
    }

    if (!localStorage.idd) localStorage.idd = randomString(8) + Math.floor(Date.now());
    cart.refreshCheckoutButton();
  };

  var btnListeners = function btnListeners() {
    document.querySelector(".kUNwHA .cta-btn .mbtn").addEventListener('click', function (e) {
      document.querySelector("body").classList.add('kp-modal');
      refreshDialogView();

      if (cart.state.order.step == 1) {
        viewCheckoutModal();
        setBtnStep(2);
        return;
      }

      if (cart.state.order.step == 2) {
        var html = '';
        html = '<div class="ptable">';
        html += '<label for="table" style="' + (table.length > 0 ? 'display:none;' : '') + '">Table number</label>';
        html += '<input type="number" value="' + table + '" name="table" style="' + (table.length > 0 ? 'display:none;' : '') + '" autocomplete="off" class="table" size="4" pattern="" inputmode="">';
        html += '<label for="note">Note</label>';
        html += '<textarea class="note" name="note" placeholder="leave a note for a kitchen"></textarea>';
        html += '</div>';
        document.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML = html;
        document.querySelector(".kUNwHA .cdialog-cnt .ptable .table").focus();
        setBtnStep(3);
        return;
      }

      if (cart.state.order.step == 3) {
        var _table = document.querySelector(".kUNwHA .cdialog-cnt .ptable .table").value;
        var note = document.querySelector(".kUNwHA .cdialog-cnt .ptable .note").value;

        if (_table == "") {
          alert("Please enter table number");
          return;
        }

        cart.state.order.table = _table;
        cart.state.order.note = note;
        localStorage.cart = JSON.stringify(cart.state.order);
        var mdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
        mdialogCnt.style.display = "none";
        document.querySelector(".kUNwHA .cta-btn").style.display = "none";
        closeModal();
        var domain = config.domain;
        if (config.domain.indexOf('checkout') == -1) domain += (config.domain.indexOf('?') == -1 ? '?' : '&') + 'checkout=1';
        window.location.href = 'https://auth.kenzap.com/?app=' + appID + '&redirect=' + encodeURIComponent(domain);
        document.querySelector(".kUNwHA .overlay").style.display = "block";
        document.querySelector(".kUNwHA .overlay .loader").style.display = "block";
        return;
      }

      if (cart.state.order.step == 4) {
        closeModal();
        return;
      }
    });
  };

  var setBtnStep = function setBtnStep(step) {
    document.querySelector(".kUNwHA .cta-btn").style.display = "block";

    switch (step) {
      case 1:
        cart.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = 'View basket <span class="price">s$0.00</span>';
        break;

      case 2:
        cart.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = 'Continue';
        break;

      case 3:
        cart.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = 'Checkout';
        break;

      case 4:
        cart.state.order.step = step;
        document.querySelector(".kUNwHA .cta-btn .mbtn").innerHTML = "Back to menu";
        break;
    }
  };

  var getMenu = function getMenu() {
    var limit = 1000;
    var offset = 0;
    fetch('https://api-v1.kenzap.cloud/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + API_KEY
      },
      body: JSON.stringify({
        query: {
          items: {
            type: 'find',
            key: 'ecommerce-product',
            fields: ['_id', 'id', 'img', 'status', 'price', 'priced', 'title', 'cats', 'sdesc', 'ldesc', 'variations', 'updated'],
            limit: limit,
            offset: offset,
            sortby: {
              field: 'created',
              order: 'ASC'
            }
          },
          settings: {
            type: 'get',
            key: 'qrmenu-settings',
            fields: ['mode', 'palette', 'categories']
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        products = response;
        spaceID = response.sid;
        renderMenu();
        dialogListeners();
        menuListeners();
        sliderListeners();
        btnListeners();
        console.log(response);
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };

  var renderMenu = function renderMenu() {
    var rows = products.settings.categories.split('\n');
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
        console.log(note);
        html_slider += '<div class="slide" data-href="' + convertToSlug(cat) + '"><a href="#' + convertToSlug(cat) + '" class=" cl">' + cat + '</a></div>';

        for (var x in products['items']) {
          products['items'][x].id = products['items'][x]._id;
          if (typeof products['items'][x]['cats'] === 'undefined') continue;
          if (products['items'][x]['cats'] == null) continue;
          if (!products['items'][x]['cats'].includes(cat)) continue;
          var img = 'https://cdn.kenzap.com/loading.png';

          if (products['items'][x]['img'][0] || products['items'][x]['img'][0] == 'true') {
            var imgl = new Image();
            imgl._id = products['items'][x]['_id'];

            imgl.onload = function () {
              console.log('adding' + this.src);
              document.querySelector(".kUNwHA .kenzap-row[data-id='" + this._id + "'] img").setAttribute('src', this.src);
            };

            imgl.src = CDN + '/S' + spaceID + '/product-' + products['items'][x]['_id'] + '-1-250.jpeg?' + products['items'][x]['updated'];
          }

          var price = '<span class="tag ptag">' + priceFormat(products['items'][x]['price']) + '</span>';

          if (products['items'][x]['priced'] != '') {
            price = '<span class="ptagc">' + priceFormat(products['items'][x]['price']) + '</span> <span class="tag ptag">' + priceFormat(products['items'][x]['priced']) + '</span>';
          }

          var ctag = typeof cart.state.order.items[products['items'][x]['_id']] === 'undefined' ? "" : cart.state.order.items[products['items'][x]['_id']].qty;
          var show_heading = '';

          if (title != cat) {
            title = cat;
            show_heading = '<h2 id="' + convertToSlug(title) + '">' + title + '</h2><p class="subnote">' + note + '</p>';
          }

          html_menu += '\
            <div class="kenzap-row" data-index="' + x + '" data-id="' + products['items'][x]['_id'] + '">\
                ' + show_heading + '\
                <div class="info-box">\
                    <div class="kenzap-col-7">\
                        <div class="kp-content">\
                            <h3><span class="tag ctag">' + ctag + '</span>' + products['items'][x]['title'] + '</h3>\
                            <p>' + products['items'][x]['sdesc'] + '</p>\
                            ' + price + '\
                        </div>\
                    </div>\
                    <div class="kenzap-col-5">\
                        <div class="kp-img">\
                            <img src="' + img + '" alt="' + products['items'][x]['title'] + '">\
                        </div>\
                    </div>\
                </div>\
                \
            </div>';
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
      menu_container.innerHTML = "Please add products and specify categories first";
    } else {
      slider_container.innerHTML = html_slider;
      menu_container.innerHTML = html_menu;
    }
  };

  var dialogListeners = function dialogListeners() {
    var close = document.querySelector(".kUNwHA .mdialog .close");
    close.addEventListener('click', function (e) {
      closeModal();
    });
    var close2 = document.querySelector(".kUNwHA .cdialog .close");
    close2.addEventListener('click', function (e) {
      var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
      cdialogCnt.style.display = "none";
      setBtnStep(1);
      closeModal();
    });
    window.addEventListener("resize", refreshDialogView);
    window.addEventListener("orientationchange", refreshDialogView);
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
    cart.refreshCheckoutButton();
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

  var menuListeners = function menuListeners() {
    var row_list = document.querySelectorAll(".kUNwHA .kenzap-row");

    var _iterator2 = _createForOfIteratorHelper(row_list),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var row = _step2.value;
        row.addEventListener('click', function (e) {
          var x = this.dataset.index;
          cart.state.index = x;
          var product_id = products['items'][x].id;
          var mdialogCnt = document.querySelector(".kUNwHA .mdialog-cnt");
          scroll.last_state = scroll.state;
          cart.state.total = 0;
          cart.state.count = 0;
          cart.state.product = typeof cart.state.order.items[product_id] === 'undefined' ? {
            id: products['items'][x].id,
            title: products['items'][x].title,
            sdesc: products['items'][x].sdesc,
            index: x,
            qty: 0,
            note: "",
            variations: []
          } : cart.state.order.items[product_id];
          cart.state.product.type = cart.state.product.qty == 0 ? "new" : "update";
          document.querySelector("body").classList.add('kp-modal');
          refreshDialogView();
          var src = products['items'][x]['img'][0] ? CDN + '/S' + spaceID + '/product-' + products['items'][x]['_id'] + '-1-250.jpeg?' + products['items'][x]['updated'] : 'https://cdn.kenzap.com/loading.png';
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-body > h2").innerHTML = cart.state.product.title;
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-body > p").innerHTML = cart.state.product.sdesc;
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-img img").setAttribute('src', src);
          document.querySelector(".kUNwHA .mdialog .qty").value = cart.state.count = cart.state.product.qty;
          document.querySelector(".kUNwHA .mdialog .kp-note textarea").value = cart.state.product.note;
          var imgl = new Image();

          imgl.onload = function () {
            document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-img img").setAttribute('src', this.src);
          };

          imgl.src = CDN + '/S' + spaceID + '/product-' + products['items'][x]['_id'] + '-1-500.jpeg?' + products['items'][x]['updated'];
          var html_vars = '';
          if (_typeof(products['items'][x].variations !== 'undefined')) for (var _v in products['items'][x].variations) {
            var type = '';
            if (products['items'][x].variations[_v].type == 'checkbox') type = 'check';
            if (products['items'][x].variations[_v].type == 'radio') type = 'radio';
            if (typeof cart.state.product.variations[_v] === 'undefined') cart.state.product.variations[_v] = {
              title: products['items'][x].variations[_v].title,
              required: products['items'][x].variations[_v].required,
              allow: products['items'][x].variations[_v].required == '1' ? false : true
            };
            html_vars += '\
                <h3>' + products['items'][x].variations[_v].title + (products['items'][x].variations[_v].required == '1' ? ' <span class="tag">required</span>' : '') + '</h3>\
                <div class="kp-' + type + '">';

            for (var d in products['items'][x].variations[_v].data) {
              var checked = false;

              if (typeof cart.state.product.variations[_v] !== 'undefined' && typeof cart.state.product.variations[_v].list !== 'undefined' && typeof cart.state.product.variations[_v].list["_" + d] !== 'undefined') {
                checked = true;
              }

              switch (type) {
                case 'check':
                  html_vars += '\
                            <label>\
                                <input type="checkbox" data-required="' + products['items'][x].variations[_v].required + '" data-indexv="' + _v + '" data-index="' + d + '" data-title="' + products['items'][x].variations[_v].data[d]['title'] + '" data-price="' + products['items'][x].variations[_v].data[d]['price'] + '" ' + (checked ? 'checked="checked"' : '') + '>\
                                <div class="checkbox">\
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">\
                                        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>\
                                        <polyline points="4 11 8 15 16 6"></polyline>\
                                    </svg>\
                                </div>\
                                <span>' + products['items'][x].variations[_v].data[d]['title'] + '</span>\
                                <div class="price">+ ' + priceFormat(products['items'][x].variations[_v].data[d]['price']) + '</div>\
                            </label>';
                  break;

                case 'radio':
                  html_vars += '\
                            <label>\
                                <input type="radio" data-required="' + products['items'][x].variations[_v].required + '" data-indexv="' + _v + '" name="radio" data-index="' + d + '" data-title="' + products['items'][x].variations[_v].data[d]['title'] + '" data-price="' + products['items'][x].variations[_v].data[d]['price'] + '" ' + (checked ? 'checked="checked"' : '') + ' />\
                                <span>' + products['items'][x].variations[_v].data[d]['title'] + '</span>\
                                <div class="price">+ ' + priceFormat(products['items'][x].variations[_v].data[d]['price']) + '</div>\
                            </label>';
                  break;
              }
            }

            html_vars += '</div>';
          }
          document.querySelector(".kUNwHA .mdialog-cnt .mdialog .kp-vars").innerHTML = html_vars;
          cart.refreshButton();
          mdialogCnt.style.display = "block";
          document.querySelector(".kUNwHA .overlay").style.display = "block";
          var checkbox_list = document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox]");

          var _iterator3 = _createForOfIteratorHelper(checkbox_list),
              _step3;

          try {
            var _loop = function _loop() {
              var cb = _step3.value;
              cb.addEventListener('change', function () {
                console.log("call refreshButton");
                var v = parseInt(cb.dataset.indexv);
                cart.state.product.variations[v].list = {};
                var count = 0;

                var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox][data-indexv='" + v + "']")),
                    _step5;

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    var cbg = _step5.value;

                    if (cb.dataset.required == "1") {
                      if (count) cart.state.product.variations[v].allow = true;
                    } else {
                      cart.state.product.variations[v].allow = true;
                    }

                    if (cbg.checked) {
                      cart.state.product.variations[v].list["_" + cbg.dataset.index] = {
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

                cart.refreshButton();
              });
            };

            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _loop();
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
            var _loop2 = function _loop2() {
              var cb = _step4.value;
              cb.addEventListener('change', function () {
                console.log("call refreshButton");
                var v = parseInt(cb.dataset.indexv);
                cart.state.product.variations[v].list = {};
                var count = 0;

                var _iterator6 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio][data-indexv='" + v + "']")),
                    _step6;

                try {
                  for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                    var rag = _step6.value;

                    if (rag.checked) {
                      cart.state.product.variations[v].list["_" + rag.dataset.index] = {
                        title: rag.dataset.title,
                        price: parseFloat(rag.dataset.price)
                      };
                      count += 1;
                    }

                    if (cb.dataset.required == "1") {
                      if (count) cart.state.product.variations[v].allow = true;
                    } else {
                      cart.state.product.variations[v].allow = true;
                    }
                  }
                } catch (err) {
                  _iterator6.e(err);
                } finally {
                  _iterator6.f();
                }

                cart.refreshButton();
              });
            };

            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              _loop2();
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
      if (cart.state.count < config.cart.max_addition) cart.state.count += 1;
      qty.value = cart.state.count;
      cart.refreshButton();
      vibrate();
    });
    var minus = document.querySelector(".kUNwHA .mdialog .minus");
    minus.addEventListener('click', function (e) {
      if (cart.state.count > 0) cart.state.count -= 1;
      qty.value = cart.state.count;
      cart.refreshButton();
      vibrate();
    });
    var add = document.querySelector(".kUNwHA .mdialog .add");
    add.addEventListener('click', function (e) {
      if (this.parentNode.classList.contains("dis")) {
        alert("Please select required fields");
        return;
      }

      cart.addToCart();
      closeModal();
      toast("Cart updated");
      vibrate();
    });
  };

  var viewCheckoutModal = function viewCheckoutModal() {
    var cdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
    refreshDialogView();
    cdialogCnt.style.display = "block";
    document.querySelector(".kUNwHA .overlay").style.display = "block";
    var html = '<table>';
    var total = 0;

    for (var p in cart.state.order.items) {
      total += parseFloat(cart.state.order.items[p].priceF);
      html += '<tr><td data-id="' + cart.state.order.items[p].id + '" class="checkt">' + cart.state.order.items[p].qty + ' x ' + cart.state.order.items[p].title + '</td><td></td><td class="price"><strong>' + priceFormat(cart.state.order.items[p].price) + '</strong></td></tr>';
    }

    html += '<tr><td class="summ" colspan="3">Total <strong>' + priceFormat(total) + '</strong></td></tr>';
    html += '</table>';
    cdialogCnt.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML = html;

    var _iterator7 = _createForOfIteratorHelper(cdialogCnt.querySelectorAll(".kUNwHA .cdialog-cnt .kp-body .checkt")),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var td = _step7.value;
        td.addEventListener('click', function (e) {
          var c = confirm("Remove " + this.innerHTML + "?");

          if (c) {
            document.querySelector(".kUNwHA .kenzap-row[data-id='" + this.dataset.id + "'] .ctag").innerHTML = "";
            cart.removeFromCart(this.dataset.id);
            cart.refreshCheckoutButton();

            if (Object.keys(cart.state.order.items).length == 0) {
              setBtnStep(1);
              closeModal();
              return;
            }

            viewCheckoutModal();
            setBtnStep(2);
          }
        });
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  };

  var viewThankyouModal = function viewThankyouModal() {
    var tdialogCnt = document.querySelector(".kUNwHA .cdialog-cnt");
    refreshDialogView();
    tdialogCnt.style.display = "block";
    document.querySelector(".kUNwHA .overlay").style.display = "block";
    var html = '<div>';
    html += '<h3>Order received!</h3>';
    html += '<p>Thank you for your order, you can close the window or return to the menu.</p>';
    html += '<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_fefIZO.json"  background="transparent"  speed="1" class="lplayer" style="width: 300px; height: 300px;" loop  autoplay></lottie-player>';
    html += '</div>';
    tdialogCnt.querySelector(".kUNwHA .cdialog-cnt .kp-body").innerHTML = html;
  };

  var authUser = function authUser(cb, force) {
    var urlParams = new URLSearchParams(window.location.search);
    var ott = urlParams.get('ott') ? urlParams.get('ott') : "";
    var params = new URLSearchParams();
    params.append("cmd", "get_state");
    params.append("app", appID);
    params.append("ott", ott);
    params.append("token", getCookie('kenzap_token'));
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
      console.log(response);
      var checkout = urlParams.get('checkout') ? urlParams.get('checkout') : "";
      if (!checkout) return;

      if (response.success) {
        if (response.token) {
          setCookie('kenzap_token', response.token, 1);
          console.log('setting up token');
        }

        cart.state.order.kid = response.kid;
        cart.state.order.name = response.name;
        cart.state.order.from = table + ' - ' + response.name;
        cart.state.order.status = 'new';
        ajaxCheckout();
      } else {
        alert('Oops, something went wrong. Please try checking out again.');
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };

  var ajaxCheckout = function ajaxCheckout() {
    cart.state.order.idd = localStorage.idd;
    cart.state.order.sid = spaceID;
    cart.state.order.id = typeof cart.state.order.id === 'undefined' ? randomString(8) + Math.floor(Date.now()) : cart.state.order.id;
    fetch('https://api-v1.kenzap.cloud/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
        'Kenzap-Token': getCookie('kenzap_token'),
        'Kenzap-Sid': spaceID
      },
      body: JSON.stringify({
        query: {
          order: {
            type: 'create',
            key: 'ecommerce-order',
            sid: spaceID,
            data: cart.state.order
          }
        }
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.success) {
        viewThankyouModal();
        cart.clearCart();
        setBtnStep(4);
      } else {
        alert("Error occured. Please try again!");
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  };

  var vibrate = function vibrate() {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(20);
    }
  };

  var sliderListeners = function sliderListeners() {
    var slide_list = document.querySelectorAll(".kUNwHA .slideset .slide");

    var _iterator8 = _createForOfIteratorHelper(slide_list),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var slide = _step8.value;
        var scrollDiv = slide.offsetLeft;
        scroll.offsets[slide.dataset.href] = scrollDiv;
        slide.addEventListener('click', function (e) {
          var sto = document.documentElement.scrollTop;
          setTimeout(function (el) {
            var _iterator9 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .slide")),
                _step9;

            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var l = _step9.value;
                l.classList.remove("active");
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            el.classList.add("active");
          }, 250, this);
        });
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  };

  var scrollEvents = function scrollEvents() {
    var h_list = document.querySelectorAll(".kUNwHA .kenzap-row h2");
    var diff_prev = 0;
    var diff = 0;
    scroll.state = document.documentElement.scrollTop;

    var _iterator10 = _createForOfIteratorHelper(h_list),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var h = _step10.value;
        diff = h.offsetTop - document.documentElement.scrollTop;
        scroll.direction = "down";

        if (diff < 0) {
          if (diff_prev > diff) {
            diff = diff_prev;
            scroll.el_id = h.id;
          }
        }

        diff_prev = diff;
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    if (scroll.state_prev != scroll.state) scroll.state_prev = scroll.state;

    if (scroll.el_id != "") {
      var sc = document.querySelector(".kUNwHA .cata-sub-nav");
      if (scroll.timer) clearTimeout(scroll.timer);
      scroll.timer = setTimeout(function (el_id) {
        sc.scrollTo({
          left: scroll.offsets[el_id],
          behavior: 'smooth'
        });

        var _iterator11 = _createForOfIteratorHelper(document.querySelectorAll(".kUNwHA .slide")),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var l = _step11.value;
            l.classList.remove("active");
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        document.querySelector(".kUNwHA [data-href='" + el_id + "']").classList.add("active");
      }, 200, scroll.el_id);
    }

    scroll.el_id = "";
  };

  var convertToSlug = function convertToSlug(str) {
    return str.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  };

  var priceFormat = function priceFormat(price) {
    var priceF = parseFloat(price).toFixed(2);

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

  var cart = {
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
      this.state.total = 0;
      this.state.count = 0;
    },
    refreshButton: function refreshButton() {
      this.state.product.qty = parseInt(document.querySelector(".kUNwHA .qty").value);
      this.state.product.price = products['items'][this.state.index].priced == "" ? parseFloat(products['items'][this.state.index].price) : parseFloat(products['items'][this.state.index].priced);
      this.state.product.note = document.querySelector(".kUNwHA .kp-note textarea").value;
      var cb_count = 0;
      var checkbox_list = document.querySelectorAll(".kUNwHA .mdialog .kp-check input[type=checkbox]");

      var _iterator12 = _createForOfIteratorHelper(checkbox_list),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var cb = _step12.value;

          if (cb.checked) {
            cb_count++;
            this.state.product.price += parseFloat(cb.dataset.price);
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      var ra_count = 0;
      var radio_list = document.querySelectorAll(".kUNwHA .mdialog .kp-radio input[type=radio]");

      var _iterator13 = _createForOfIteratorHelper(radio_list),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var ra = _step13.value;

          if (ra.checked) {
            ra_count++;
            this.state.product.price += parseFloat(ra.dataset.price);
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      this.state.product.priceF = parseFloat(this.state.product.price * this.state.product.qty);
      document.querySelector(".kUNwHA .add .price").innerHTML = priceFormat(this.state.product.priceF);
      var dis = false;
      if (this.state.product.priceF == 0) dis = true;

      for (v in cart.state.product.variations) {
        if (cart.state.product.variations[v].allow == false) dis = true;
      }

      document.querySelector(".kUNwHA .kp-add .mbtn .add").style.background = "";

      if (cart.state.product.type == 'update' && this.state.product.qty > 0) {
        document.querySelector(".kUNwHA .kp-add .mbtn .cta").innerHTML = "Update";
      }

      if (cart.state.product.type == 'update' && this.state.product.qty == 0) {
        document.querySelector(".kUNwHA .kp-add .mbtn .cta").innerHTML = "Remove";
        document.querySelector(".kUNwHA .kp-add .btn .add").style.background = "#df1960";
        dis = false;
      }

      if (cart.state.product.type == 'new') {
        document.querySelector(".kUNwHA .kp-add .mbtn .cta").innerHTML = "Add";
      }

      if (dis) {
        document.querySelector(".kUNwHA .kp-add .mbtn").classList.add("dis");
      } else {
        document.querySelector(".kUNwHA .kp-add .mbtn").classList.remove("dis");
      }
    },
    refreshCheckoutButton: function refreshCheckoutButton() {
      var total = 0;

      for (var p in this.state.order.items) {
        total += parseFloat(this.state.order.items[p].priceF);
      }

      this.state.order.total = total;

      if (total > 0) {
        document.querySelector("body").classList.add("cbtn");
        setBtnStep(1);
        document.querySelector(".kUNwHA .cta-btn .price").innerHTML = priceFormat(total);
      } else {
        document.querySelector(".kUNwHA .cta-btn").style.display = "none";
        document.querySelector("body").classList.remove("cbtn");
      }
    },
    addToCart: function addToCart() {
      this.state.order.items[this.state.product.id] = this.state.product;
      console.log(this.state.order.items);

      if (this.state.product.qty == 0) {
        this.removeFromCart(this.state.product.id);
      } else {
        document.querySelector(".kUNwHA .kenzap-row[data-id='" + this.state.product.id + "'] .ctag").innerHTML = this.state.product.qty;
      }

      localStorage.cart = JSON.stringify(this.state.order);
      cart.refreshCheckoutButton();
    },
    removeFromCart: function removeFromCart(id) {
      delete this.state.order.items[id];
      document.querySelector(".kUNwHA .kenzap-row[data-id='" + id + "'] .ctag").innerHTML = "";
      localStorage.cart = JSON.stringify(this.state.order);
    },
    clearCart: function clearCart() {
      for (var i in cart.state.order.items) {
        document.querySelector(".kUNwHA .kenzap-row[data-id='" + cart.state.order.items[i].id + "'] .ctag").innerHTML = "";
      }

      cart.state.order = {};
      cart.state.order.created = Math.floor(Date.now() / 1000);
      cart.state.order.items = {};
      localStorage.cart = JSON.stringify(cart.state.order);
      this.refreshCheckoutButton();
      window.history.replaceState({}, document.title, config.domain);
    }
  };

})();
//# sourceMappingURL=index.js.map
