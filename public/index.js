
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

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
  const initHeader = (response) => {

      // cache header from backend
      if(response.header) localStorage.setItem('header', response.header);
    
      // load header to html if not present
      if(!document.querySelector("#k-script")){
    
          let child = document.createElement('div');
          child.innerHTML = localStorage.getItem('header');
          child = child.firstChild;
          document.body.prepend(child);
    
          // run header scripts
          Function(document.querySelector("#k-script").innerHTML).call('test');
      }
    
      // load locales if present
      if(response.locale) window.i18n.init(response.locale); 
  };

  /**
   * @name showLoader
   * @description Initiates full screen three dots loader.
   */
  const showLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'block';
  };

  /**
   * @name hideLoader
   * @description Removes full screen three dots loader.
   */
  const hideLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'none';
  };

  /**
   * @name initFooter
   * @description Removes full screen three dots loader.
   * @param {string} left - Text or html code to be present on the left bottom side of screen
   * @param {string} right - Text or html code to be present on the left bottom side of screen
   */
  const initFooter = (left, right) => {

      document.querySelector("footer .row").innerHTML = `
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${left}</span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${right}</span>
    </div>`;
  };

  /**
   * @name link
   * @description Handles Cloud navigation links between extensions and its pages. Takes care of custom url parameters.
   * @param {string} slug - Any inbound link
   * 
   * @returns {string} link - Returns original link with kenzp cloud space ID identifier.
   */
  const link = (slug) => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

      let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

      return slug + postfix;
  };

  /**
   * @name getSiteId
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
  const getSiteId = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
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
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
  const parseApiError = (data) => {
   
      switch(data.code){

          // unauthorized
          case 401:

              // dev mode
              if(window.location.href.indexOf('localhost')){ 

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
   * @name initBreadcrumbs
   * @description Render ui breadcrumbs.
   * @param {array} data - List of link objects containing link text and url. If url is missing then renders breadcrumb as static text. Requires html holder with .bc class.
   */
  const initBreadcrumbs = (data) => {

      let html = '<ol class="breadcrumb mt-2 mb-0">';
      for(let bc of data){
          
          if(typeof(bc.link) === 'undefined'){

              html += `<li class="breadcrumb-item">${ bc.text }</li>`;
          }else {

              html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
          }
      }
      html += '</ol>';
      
      document.querySelector(".bc").innerHTML = html;
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

  /**
   * @name onChange
   * @description One row change event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onChange = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('change', fn, true);
          e.addEventListener('change', fn, true);
      }
  };

  /**
   * @name simulateClick
   * @description Trigger on click event without user interaction.
   * @param {string} elem - HTML selector, id, class, etc.
   */
   const simulateClick = (elem) => {

  	// create our event (with options)
  	let evt = new MouseEvent('click', {
  		bubbles: true,
  		cancelable: true,
  		view: window
  	});

  	// if cancelled, don't dispatch the event
  	!elem.dispatchEvent(evt);
  };

  /**
   * @name toast
   * @description Triggers toast notification. Adds toast html to the page if missing.
   * @param {string} text - Toast notification.
   */
   const toast = (text) => {

      // only add once
      if(!document.querySelector(".toast")){

          let html = `
        <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
                <div class="d-flex">
                    <div class="toast-body"></div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>`;
          if(document.querySelector('body > div')) document.querySelector('body > div').insertAdjacentHTML('afterend', html);
      }

      let toast = new bootstrap.Toast(document.querySelector('.toast'));
      document.querySelector('.toast .toast-body').innerHTML = text;  
      toast.show();
  };

  var HTMLContent = function HTMLContent(__) {
    return "\n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n                <div>\n                    <a style=\"margin-right:16px;\" class=\"preview-link nounderline\" target=\"_blank\" href=\"#\">".concat(__('preview'), "<i class=\"mdi mdi-monitor\"></i></a>\n                    <button class=\"btn btn-primary btn-publish\" type=\"button\">").concat(__('Publish menu'), "</button>\n                </div>\n            </div>\n            <div class=\"row\">\n\n                <div class=\"col-lg-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm\">\n                        <div class=\"card-body\">\n                        <h4 class=\"card-title\">").concat(__('Settings'), "</h4>\n                        <p class=\"form-text\">\n                            ").concat(__('Go to <a href="' + link('https://ecommerce.kenzap.cloud/product-list/') + '">ecommerce</a></code> dashboard to populate menu products.'), "\n                        </p>\n   \n                        <div class=\"qr-list mb-5 \">\n                            <div class=\"row table_number_cont d-none\">\n                                <div class=\"col-lg-4\">\n                                    <select id=\"table_number\" class=\"form-select inp\" data-type=\"select\" aria-label=\"Table number picker\">\n                                        <option selected>Table 1</option>\n                                    </select>\n                                    <p class=\"form-text\">").concat(__('Pick table number to download the QR-code sticker.'), "</p>\n                                </div>\n                            </div>\n                            <div id=\"qr-main\" class=\"qr-cnt form-group mr-2\">\n                                <a href=\"#\" class=\"qr-download mb-3\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"currentColor\" class=\"bi bi-cloud-download\" viewBox=\"0 0 16 16\">\n                                        <path d=\"M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z\"/>\n                                        <path d=\"M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z\"/>\n                                    </svg>\n                                </a>\n                                <div class=\"qr-preview\"> </div>\n                                <div class=\"qr-note text-danger d-none\" style=\"\">").concat(__('* qr-code updated'), "</div>\n                            </div>\n                        </div>\n\n                        <a href='data:image/svg+xml;utf8,<svg viewBox=\"0 0 20 20\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"10\" r=\"10\"></circle></svg>' download=\"qr-menu.svg\" class=\"d-none d-link\">download</a>\n\n                        <div class=\"form-group mb-4\">\n                            <h5 class=\"card-title \">").concat(__('Table selection'), "</h5>\n                            <p class=\"form-text mb-3\" style=\"\">").concat(__('After changing table selection setting, please update your QR-code prints.'), "</p>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-publish form-label\">\n                                            <input type=\"radio\" class=\"form-check-input inp\" data-type=\"radio\" name=\"mode\" id=\"mode0\" value=\"0\" checked=\"true\"> ").concat(__('Manual'), "\n                                            <p class=\"form-text\">").concat(__('Force users to pick up table number upon checkout.'), "</p>\n                                        </label>\n                                    </div>\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-publish form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" data-type=\"radio\" name=\"mode\" id=\"mode1\" value=\"1\"> ").concat(__('Automatic'), "\n                                            <p class=\"form-text\">").concat(__('Link table number directly with the QR-code sticker.'), "</p>\n\n                                            <div class=\"total_tables_cont d-none\">\n                                                <input id=\"total_tables\" class=\"form-control inp\" data-type=\"number\" type=\"number\" placeholder=\"").concat(__('Total number of tables'), "\" value=\"10\" aria-label=\"total number of tables\">\n                                                <p class=\"form-text\">").concat(__('Total number of tables. Each table has individual QR-code sticker.'), "</p>\n                                            </div>\n                                        </label>\n                                    </div>\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-publish form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" data-type=\"radio\" name=\"mode\" id=\"mode2\" value=\"2\"> ").concat(__('No table mode'), "\n                                            <p class=\"form-text\">").concat(__('Do not ask users for table number upon checkout.'), "</p>\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n                            \n                        </div>\n\n                        <div class=\"form-group mb-5\">\n                            <h5 class=\"card-title mb-3\">").concat(__('Color palette'), "</h5>\n                            <div class=\"row\">\n                                <div class=\"col-lg-10\">\n                                    <ul id=\"palette\" class=\"palette inp\" data-type=\"palette\">\n                                        <li ><input type=\"text\" maxlength=\"7\" data-key=\"baseColorA\" value=\"#1941df\" style=\"background: #1941df;\"></li>\n                                        <li ><input type=\"text\" maxlength=\"7\" data-key=\"bgColorA\" value=\"#000000\" style=\"background: #000000;\"></li>\n                                        <li ><input type=\"text\" maxlength=\"7\" data-key=\"bgColorB\" value=\"#494949\" style=\"background: #494949;\"></li>\n                                        <li ><input type=\"text\" maxlength=\"7\" data-key=\"txtColorB\" value=\"#b8b8b8\" style=\"background: #b8b8b8;\"></li>\n                                        <li ><input type=\"text\" maxlength=\"7\" data-key=\"txtColorC\" value=\"#ffffff\" style=\"background: #ffffff;\"></li>\n                                        <li ><input type=\"text\" maxlength=\"7\" data-key=\"txtColorA\" value=\"#ffffff\" style=\"background: #ffffff;\"></li>\n                                    </ul> \n                                </div>\n                            </div>\n                        </div>\n                    \n                        <div class=\"form-group mb-4\">\n                            <h5 class=\"card-title mb-3\">").concat(__('Menu categories'), "</h5>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <textarea class=\"form-control inp\" id=\"categories\" data-type=\"textarea\" rows=\"8\"></textarea>\n                                    <p class=\"form-text\">").concat(__('Provide one menu category per line. Categories are case-sensitive.'), " <a href=\"").concat(link('https://ecommerce.kenzap.cloud/product-list/'), "\">Available categories</a>.</p>\n                                </div>\n                            </div> \n                        </div>\n\n                        <div class=\"form-group mb-3\">\n                            <h5 class=\"card-title mb-3\">").concat(__('Public link'), "</h5>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <div class=\"input-group\">\n                                        <div class=\"input-group input-group-lg\">\n                                            <input id=\"slug\" type=\"text\" data-type=\"text\" style=\"text-align:right;\" class=\"form-control val-tld inp\" aria-label=\"\">\n                                            <button class=\"btn btn-sm btn-outline-primary dropdown-toggle btn-tld\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">.kenzap.site</button>\n                                            <ul class=\"dropdown-menu dropdown-menu-end domain-list\">\n                                                <li><a class=\"dropdown-item\" href=\"#\" data-key='.kenzap.site'>.kenzap.site</a></li>\n                                                <li><a class=\"dropdown-item d-none\" href=\"#\" data-key='.warung.menu'>.warung.menu</a></li>\n                                                <li><a class=\"dropdown-item d-none\" href=\"#\" data-key='.kenzap.tech'>.kenzap.tech</a></li>\n                                                <li><hr class=\"dropdown-divider\"></li>\n                                                <li><a class=\"dropdown-item\" href=\"#\" data-key='custom'>My domain</a></li>\n                                            </ul>\n                                        </div>\n                                        <p class=\"form-text\">").concat(__('Public link where users can preview your menu. Ex.: myresto.kenzap.site. For branded link visit '), " <a href=\"").concat(link('https://dashboard.kenzap.cloud/domain/'), "\">").concat(__('domain dashboard'), "</a>.</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group mb-3 d-none\">\n                            <h5 class=\"card-title mb-3\">").concat(__('Public link'), "</h5>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <div class=\"input-group input-group-lg\">\n                                        <span class=\"input-group-text\" id=\"space-domain\">").concat('http://menu' + getSiteId() + '.kenzap.site/', "</span>\n                                        <input type=\"text\" class=\"form-control d-none\" data-type=\"text\" aria-label=\"Menu link\" aria-describedby=\"inputGroup-sizing-lg\">\n                                    </div>\n                                    <p class=\"form-text\">").concat(__('Public link where users can preview your menu. For branded link visit '), " <a href=\"").concat(link('https://dashboard.kenzap.cloud/domain/'), "\">domain dashboard</a></p>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group mb-4\">\n                            <h5 class=\"card-title mb-3\">").concat(__('Cart addition'), "</h5>\n                            <div class=\"row\">\n                                <div class=\"col-lg-6\">\n                                    <input id=\"max_addition\" type=\"range\" data-type=\"range\" value=\"0\" class=\"form-range inp\" min=\"0\" max=\"100\" >\n                                    <p class=\"form-text\">").concat(__('Maximum number of items per cart. If set to 0 cart addition is disabled. Currently '), "<span id=\"max_addition_val\">0</span>.</p>\n                                </div>\n                            </div> \n                        </div>\n\n                        <div class=\"table-responsive d-none\">\n                            <table class=\"table table-hover table-borderless align-middle table-striped table-p-list\" style=\"min-width: 800px;\">\n                                <thead>\n                                    <tr>\n                                    <th>").concat(__('ID'), "</th>\n                                    <th>").concat(__('Title'), "</th>\n                                    <th style=\"display:none;\">Zones</th>\n                                    <th style=\"display:none;\">Seats</th>\n                                    <th style=\"text-align:right;\"></th>\n                                    </tr>\n                                </thead>\n                                <tbody class=\"layout_list\">\n                                    <tr>\n                                    <td></td><td></td><td></td><td></td><td></td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"modal\" tabindex=\"-1\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\"></h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n                    <div class=\"modal-body\">\n\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n            <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n                aria-atomic=\"true\" data-bs-delay=\"3000\">\n                <div class=\"d-flex\">\n                    <div class=\"toast-body\"></div>\n                    <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"\n                        aria-label=\"Close\"></button>\n                </div>\n            </div>\n        </div>\n        \n    ");
  };

  /**
   *
   * <table width="100%">
   *     <tr>
   *         <td>
   *             <a href="https://github.com/rendaw/qrcode-generator-es6"><img src="https://raw.githubusercontent.com/primer/octicons/master/lib/svg/mark-github.svg?sanitize=true"> Github</a>
   *         </td>
   *         <td>
   *             <a href="https://circleci.com/gh/rendaw/qrcode-generator-es6"><img alt="Build Status" src="https://circleci.com/gh/rendaw/qrcode-generator-es6.svg?style=svg"></a>
   *         </td>
   * </table>
   *
   * ### How to use:
   *
   * First run:
   *
   * ```
   * npm install --save qrcode-generator-es6
   * ```
   *
   * Then use it in your code like:
   *
   * ```
   * import qrcode from './qrcode.js';
   *
   * const qr = new qrcode(0, 'H');
   * qr.addData('This is my data');
   * qr.make();
   * my_element.innerHTML = qr.createSvgTag({});
   * ```
   *
   * @module qrcode-generator-es6
   */
  //---------------------------------------------------------------------
  //
  // QR Code Generator for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //	http://www.opensource.org/licenses/mit-license.php
  //
  // The word 'QR Code' is registered trademark of
  // DENSO WAVE INCORPORATED
  //	http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  const PAD0 = 0xec;
  const PAD1 = 0x11;

  /**
   * Displays a QR code. Set the code data with `addData` and, call `make` and then call `createSvgTag` or `createImgTag`.
   *
   * See `gallery.html` for an example.
   *
   * @param {integer} typeNumber The minimum QR code type number from 1 to 40.  Using 0 allows any QR code type number.
   * @param {String} errorCorrectionLevel 'L','M','Q','H'
   */
  class qrcode {
    constructor(typeNumber, errorCorrectionLevel) {
      this._typeNumber = typeNumber;
      this._errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
      this._modules = null;
      this._moduleCount = 0;
      this._dataCache = null;
      this._dataList = [];

      this.makeImpl = (test, maskPattern) => {
        this._moduleCount = this._typeNumber * 4 + 17;
        this._modules = (function(moduleCount) {
          let modules = new Array(moduleCount);
          for (let row = 0; row < moduleCount; row += 1) {
            modules[row] = new Array(moduleCount);
            for (let col = 0; col < moduleCount; col += 1) {
              modules[row][col] = null;
            }
          }
          return modules;
        })(this._moduleCount);

        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this._moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this._moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);

        if (this._typeNumber >= 7) {
          this.setupTypeNumber(test);
        }

        if (this._dataCache == null) {
          this._dataCache = this.createData(
            this._typeNumber,
            this._errorCorrectionLevel,
            this._dataList
          );
        }

        this.mapData(this._dataCache, maskPattern);
      };

      this.setupPositionProbePattern = (row, col) => {
        for (let r = -1; r <= 7; r += 1) {
          if (row + r <= -1 || this._moduleCount <= row + r) continue;

          for (let c = -1; c <= 7; c += 1) {
            if (col + c <= -1 || this._moduleCount <= col + c) continue;

            if (
              (0 <= r && r <= 6 && (c == 0 || c == 6)) ||
              (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
              (2 <= r && r <= 4 && 2 <= c && c <= 4)
            ) {
              this._modules[row + r][col + c] = true;
            } else {
              this._modules[row + r][col + c] = false;
            }
          }
        }
      };

      this.getBestMaskPattern = () => {
        let minLostPoint = 0;
        let pattern = 0;

        for (let i = 0; i < 8; i += 1) {
          this.makeImpl(true, i);

          let lostPoint = QRUtil.getLostPoint(this);

          if (i == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i;
          }
        }

        return pattern;
      };

      this.setupTimingPattern = () => {
        for (let r = 8; r < this._moduleCount - 8; r += 1) {
          if (this._modules[r][6] != null) {
            continue;
          }
          this._modules[r][6] = r % 2 == 0;
        }

        for (let c = 8; c < this._moduleCount - 8; c += 1) {
          if (this._modules[6][c] != null) {
            continue;
          }
          this._modules[6][c] = c % 2 == 0;
        }
      };

      this.setupPositionAdjustPattern = () => {
        let pos = QRUtil.getPatternPosition(this._typeNumber);

        for (let i = 0; i < pos.length; i += 1) {
          for (let j = 0; j < pos.length; j += 1) {
            let row = pos[i];
            let col = pos[j];

            if (this._modules[row][col] != null) {
              continue;
            }

            for (let r = -2; r <= 2; r += 1) {
              for (let c = -2; c <= 2; c += 1) {
                if (
                  r == -2 ||
                  r == 2 ||
                  c == -2 ||
                  c == 2 ||
                  (r == 0 && c == 0)
                ) {
                  this._modules[row + r][col + c] = true;
                } else {
                  this._modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      };

      this.setupTypeNumber = test => {
        let bits = QRUtil.getBCHTypeNumber(this._typeNumber);

        for (let i = 0; i < 18; i += 1) {
          const mod = !test && ((bits >> i) & 1) == 1;
          this._modules[Math.floor(i / 3)][
            (i % 3) + this._moduleCount - 8 - 3
          ] = mod;
        }

        for (let i = 0; i < 18; i += 1) {
          const mod = !test && ((bits >> i) & 1) == 1;
          this._modules[(i % 3) + this._moduleCount - 8 - 3][
            Math.floor(i / 3)
          ] = mod;
        }
      };

      this.setupTypeInfo = (test, maskPattern) => {
        let data = (this._errorCorrectionLevel << 3) | maskPattern;
        let bits = QRUtil.getBCHTypeInfo(data);

        // vertical
        for (let i = 0; i < 15; i += 1) {
          const mod = !test && ((bits >> i) & 1) == 1;

          if (i < 6) {
            this._modules[i][8] = mod;
          } else if (i < 8) {
            this._modules[i + 1][8] = mod;
          } else {
            this._modules[this._moduleCount - 15 + i][8] = mod;
          }
        }

        // horizontal
        for (let i = 0; i < 15; i += 1) {
          const mod = !test && ((bits >> i) & 1) == 1;

          if (i < 8) {
            this._modules[8][this._moduleCount - i - 1] = mod;
          } else if (i < 9) {
            this._modules[8][15 - i - 1 + 1] = mod;
          } else {
            this._modules[8][15 - i - 1] = mod;
          }
        }

        // fixed module
        this._modules[this._moduleCount - 8][8] = !test;
      };

      this.mapData = (data, maskPattern) => {
        let inc = -1;
        let row = this._moduleCount - 1;
        let bitIndex = 7;
        let byteIndex = 0;
        let maskFunc = QRUtil.getMaskFunction(maskPattern);

        for (let col = this._moduleCount - 1; col > 0; col -= 2) {
          if (col == 6) col -= 1;

          while (true) {
            for (let c = 0; c < 2; c += 1) {
              if (this._modules[row][col - c] == null) {
                let dark = false;

                if (byteIndex < data.length) {
                  dark = ((data[byteIndex] >>> bitIndex) & 1) == 1;
                }

                let mask = maskFunc(row, col - c);

                if (mask) {
                  dark = !dark;
                }

                this._modules[row][col - c] = dark;
                bitIndex -= 1;

                if (bitIndex == -1) {
                  byteIndex += 1;
                  bitIndex = 7;
                }
              }
            }

            row += inc;

            if (row < 0 || this._moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      };

      this.createBytes = (buffer, rsBlocks) => {
        let offset = 0;

        let maxDcCount = 0;
        let maxEcCount = 0;

        let dcdata = new Array(rsBlocks.length);
        let ecdata = new Array(rsBlocks.length);

        for (let r = 0; r < rsBlocks.length; r += 1) {
          let dcCount = rsBlocks[r].dataCount;
          let ecCount = rsBlocks[r].totalCount - dcCount;

          maxDcCount = Math.max(maxDcCount, dcCount);
          maxEcCount = Math.max(maxEcCount, ecCount);

          dcdata[r] = new Array(dcCount);

          for (let i = 0; i < dcdata[r].length; i += 1) {
            dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
          }
          offset += dcCount;

          let rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
          let rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

          let modPoly = rawPoly.mod(rsPoly);
          ecdata[r] = new Array(rsPoly.getLength() - 1);
          for (let i = 0; i < ecdata[r].length; i += 1) {
            let modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
          }
        }

        let totalCodeCount = 0;
        for (let i = 0; i < rsBlocks.length; i += 1) {
          totalCodeCount += rsBlocks[i].totalCount;
        }

        let data = new Array(totalCodeCount);
        let index = 0;

        for (let i = 0; i < maxDcCount; i += 1) {
          for (let r = 0; r < rsBlocks.length; r += 1) {
            if (i < dcdata[r].length) {
              data[index] = dcdata[r][i];
              index += 1;
            }
          }
        }

        for (let i = 0; i < maxEcCount; i += 1) {
          for (let r = 0; r < rsBlocks.length; r += 1) {
            if (i < ecdata[r].length) {
              data[index] = ecdata[r][i];
              index += 1;
            }
          }
        }

        return data;
      };

      this.createData = (typeNumber, errorCorrectionLevel, dataList) => {
        let rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

        let buffer = qrBitBuffer();

        for (let i = 0; i < dataList.length; i += 1) {
          let data = dataList[i];
          buffer.put(data.getMode(), 4);
          buffer.put(
            data.getLength(),
            QRUtil.getLengthInBits(data.getMode(), typeNumber)
          );
          data.write(buffer);
        }

        // calc num max data.
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i += 1) {
          totalDataCount += rsBlocks[i].dataCount;
        }

        if (buffer.getLengthInBits() > totalDataCount * 8) {
          throw "code length overflow. (" +
            buffer.getLengthInBits() +
            ">" +
            totalDataCount * 8 +
            ")";
        }

        // end code
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
          buffer.put(0, 4);
        }

        // padding
        while (buffer.getLengthInBits() % 8 != 0) {
          buffer.putBit(false);
        }

        // padding
        while (true) {
          if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
          }
          buffer.put(PAD0, 8);

          if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
          }
          buffer.put(PAD1, 8);
        }

        return this.createBytes(buffer, rsBlocks);
      };
    }

    addData(data, mode) {
      mode = mode || "Byte";

      let newData = null;

      switch (mode) {
        case "Numeric":
          newData = qrNumber(data);
          break;
        case "Alphanumeric":
          newData = qrAlphaNum(data);
          break;
        case "Byte":
          newData = qr8BitByte(data);
          break;
        case "Kanji":
          newData = qrKanji();
          break;
        default:
          throw "mode:" + mode;
      }

      this._dataList.push(newData);
      this._dataCache = null;
    }

    /**
     * @returns {boolean} true if the module at `row, col` is dark.
     */
    isDark(row, col) {
      if (
        row < 0 ||
        this._moduleCount <= row ||
        col < 0 ||
        this._moduleCount <= col
      ) {
        throw row + "," + col;
      }
      return this._modules[row][col];
    }

    /**
     * @returns {integer} The module count in one dimension of the QR code.  The total number of modules is the square of this value.
     */
    getModuleCount() {
      return this._moduleCount;
    }

    /**
     * Call this when done adding data before getting the generated QR code image.
     */
    make() {
      if (this._typeNumber < 1) {
        let typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          let rsBlocks = QRRSBlock.getRSBlocks(
            typeNumber,
            this._errorCorrectionLevel
          );
          let buffer = qrBitBuffer();

          for (let i = 0; i < this._dataList.length; i++) {
            let data = this._dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(
              data.getLength(),
              QRUtil.getLengthInBits(data.getMode(), typeNumber)
            );
            data.write(buffer);
          }

          let totalDataCount = 0;
          for (let i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        this._typeNumber = typeNumber;
      }

      this.makeImpl(false, this.getBestMaskPattern());
    }

    /**
     * @param {Object} args
     * @param {function} [args.drawCell] A callback with arguments `column, row, x, y` to draw a cell.  `x, y` are the coordinates to draw it at.  `c, y` are the QR code module indexes.  Returns the svg element child string for the cell.
     * @param {function} [args.cellColor] A callback which returns the color for the cell.  By default, a function that returns `black`.  Unused if `drawCell` is provided.
     * @param {integer} [args.margin] The margin to draw around the QR code, by number of cells.
     * @param {Object} [args.bg] The background. White by default.
     * @param {boolean} args.bg.enabled Draw a background
     * @param {String} args.bg.fill Fill color of the background
     * @param {Object} [args.obstruction] An image to place in the center of the QR code.
     * @param {integer} args.obstruction.width Width of the obstruction as a percentage of QR code width.
     * @param {integer} args.obstruction.height Height of the obstruction as a percentage of QR code height.
     * @param {String} args.obstruction.path The path of the obstruction image. Exclusive with svgData.
     * @param {String} args.obstruction.svgData The SVG data to embed as an obstruction. Must start with `<svg`. Exclusive with path.
     * @returns {String} An svg tag as a string.
     */
    createSvgTag({ drawCell, cellColor, cellSize, margin, bg, obstruction }) {
      drawCell =
        drawCell ||
        ((c, r, x, y) =>
          "<rect " +
          'width="' +
          cellSize +
          '" ' +
          'height="' +
          cellSize +
          '" ' +
          'x="' +
          x +
          '" ' +
          'y="' +
          y +
          '" ' +
          'fill="' +
          cellColor(c, r) +
          '" ' +
          'shape-rendering="crispEdges" ' +
          " />");
      cellColor = cellColor || (() => "black");
      cellSize = cellSize || 2;
      margin = typeof margin == "undefined" ? cellSize * 4 : margin;
      let size = this.getModuleCount() * cellSize + margin * 2;
      let qrSvg = "";

      qrSvg += '<svg version="1.1"';
      qrSvg += ' xmlns="http://www.w3.org/2000/svg"';
      qrSvg += ' xmlns:xlink="http://www.w3.org/1999/xlink"';
      qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet">';
      if (!bg) {
        bg = {
          enabled: true,
          fill: "white"
        };
      }
      if (bg.enabled) {
        qrSvg +=
          '<rect width="100%" height="100%" fill="' + bg.fill + '" x="0" y="0"/>';
      }

      const modCount = this.getModuleCount();
      const totalSize = modCount * cellSize + margin * 2;
      let obstructionCRStart, obstructionCREnd;
      if (obstruction) {
        const { width, height } = obstruction;
        const spans = [Math.ceil(width * modCount), Math.ceil(height * modCount)];
        obstructionCRStart = spans.map(s => Math.floor(modCount / 2 - s / 2));
        obstructionCREnd = spans.map(s => Math.ceil(modCount / 2 + s / 2));
      }

      for (let r = 0; r < modCount; r += 1) {
        const mr = r * cellSize + margin;
        for (let c = 0; c < modCount; c += 1) {
          const mc = c * cellSize + margin;
          if (
            obstruction &&
            c >= obstructionCRStart[0] &&
            c < obstructionCREnd[0] &&
            r >= obstructionCRStart[1] &&
            r < obstructionCREnd[1]
          ) {
            if (c == obstructionCRStart[0] && r == obstructionCRStart[1]) {
              const img_attrs =
                'x="' +
                (totalSize * (1.0 - obstruction.width) * 0.5).toFixed(3) +
                '" ' +
                'y="' +
                (totalSize * (1.0 - obstruction.height) * 0.5).toFixed(3) +
                '" ' +
                'width="' +
                (totalSize * obstruction.width).toFixed(3) +
                '" ' +
                'height="' +
                (totalSize * obstruction.height).toFixed(3) +
                '" ' +
                'preserveAspectRatio="xMidYMid meet" ';
              if (obstruction.path) {
                qrSvg +=
                  "<image " +
                  img_attrs +
                  'xlink:href="' +
                  obstruction.path +
                  '" />';
              } else {
                qrSvg += "<svg " + img_attrs + obstruction.svgData.substring(4);
              }
            }
          } else if (this.isDark(r, c)) {
            qrSvg += drawCell(c, r, mc, mr);
          }
        }
      }

      qrSvg += "</svg>";

      return qrSvg;
    }

    /**
     * @param {integer} cellSize The size of a module in pixels.
     * @param {integer} margin The margin to draw around the QR code in pixels.
     * @returns {String} An img tag as a string.
     */
    createImgTag(cellSize, margin) {
      cellSize = cellSize || 2;
      margin = typeof margin == "undefined" ? cellSize * 4 : margin;

      let size = this.getModuleCount() * cellSize + margin * 2;
      let min = margin;
      let max = size - margin;
      let self = this;

      return createImgTag(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          let c = Math.floor((x - min) / cellSize);
          let r = Math.floor((y - min) / cellSize);
          return self.isDark(r, c) ? 0 : 1;
        } else {
          return 1;
        }
      });
    }
  }

  /**
   *
   */
  const stringToBytesFuncs = {
    default: function(s) {
      let bytes = [];
      for (let i = 0; i < s.length; i += 1) {
        let c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  /**
   *
   */
  const stringToBytes = stringToBytesFuncs["default"];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   *
   */
  const QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3
  };

  /**
   *
   */
  const QRErrorCorrectionLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  };

  /**
   *
   */
  const QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  const QRUtil = (function() {
    const PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    const G15 =
      (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    const G18 =
      (1 << 12) |
      (1 << 11) |
      (1 << 10) |
      (1 << 9) |
      (1 << 8) |
      (1 << 5) |
      (1 << 2) |
      (1 << 0);
    const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    let _this = {};

    let getBCHDigit = function(data) {
      let digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      let d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= G15 << (getBCHDigit(d) - getBCHDigit(G15));
      }
      return ((data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      let d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= G18 << (getBCHDigit(d) - getBCHDigit(G18));
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return function(i, j) {
            return (i + j) % 2 == 0;
          };
        case QRMaskPattern.PATTERN001:
          return function(i, _) {
            return i % 2 == 0;
          };
        case QRMaskPattern.PATTERN010:
          return function(i, j) {
            return j % 3 == 0;
          };
        case QRMaskPattern.PATTERN011:
          return function(i, j) {
            return (i + j) % 3 == 0;
          };
        case QRMaskPattern.PATTERN100:
          return function(i, j) {
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
          };
        case QRMaskPattern.PATTERN101:
          return function(i, j) {
            return ((i * j) % 2) + ((i * j) % 3) == 0;
          };
        case QRMaskPattern.PATTERN110:
          return function(i, j) {
            return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
          };
        case QRMaskPattern.PATTERN111:
          return function(i, j) {
            return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
          };

        default:
          throw "bad maskPattern:" + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      let a = qrPolynomial([1], 0);
      for (let i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {
      if (1 <= type && type < 10) {
        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw "mode:" + mode;
        }
      } else if (type < 27) {
        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw "mode:" + mode;
        }
      } else if (type < 41) {
        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw "mode:" + mode;
        }
      } else {
        throw "type:" + type;
      }
    };

    _this.getLostPoint = function(qrcode) {
      let moduleCount = qrcode.getModuleCount();

      let lostPoint = 0;

      // LEVEL1

      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
          let sameCount = 0;
          let dark = qrcode.isDark(row, col);

          for (let r = -1; r <= 1; r += 1) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (let c = -1; c <= 1; c += 1) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c)) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (let row = 0; row < moduleCount - 1; row += 1) {
        for (let col = 0; col < moduleCount - 1; col += 1) {
          let count = 0;
          if (qrcode.isDark(row, col)) count += 1;
          if (qrcode.isDark(row + 1, col)) count += 1;
          if (qrcode.isDark(row, col + 1)) count += 1;
          if (qrcode.isDark(row + 1, col + 1)) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount - 6; col += 1) {
          if (
            qrcode.isDark(row, col) &&
            !qrcode.isDark(row, col + 1) &&
            qrcode.isDark(row, col + 2) &&
            qrcode.isDark(row, col + 3) &&
            qrcode.isDark(row, col + 4) &&
            !qrcode.isDark(row, col + 5) &&
            qrcode.isDark(row, col + 6)
          ) {
            lostPoint += 40;
          }
        }
      }

      for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount - 6; row += 1) {
          if (
            qrcode.isDark(row, col) &&
            !qrcode.isDark(row + 1, col) &&
            qrcode.isDark(row + 2, col) &&
            qrcode.isDark(row + 3, col) &&
            qrcode.isDark(row + 4, col) &&
            !qrcode.isDark(row + 5, col) &&
            qrcode.isDark(row + 6, col)
          ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      let darkCount = 0;

      for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col)) {
            darkCount += 1;
          }
        }
      }

      let ratio =
        Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  })();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  let QRMath = (function() {
    let EXP_TABLE = new Array(256);
    let LOG_TABLE = new Array(256);

    // initialize tables
    for (let i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (let i = 8; i < 256; i += 1) {
      EXP_TABLE[i] =
        EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
    }
    for (let i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i]] = i;
    }

    let _this = {};

    _this.glog = function(n) {
      if (n < 1) {
        throw "glog(" + n + ")";
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {
      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  })();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {
    if (typeof num.length == "undefined") {
      throw num.length + "/" + shift;
    }

    let _num = (function() {
      let offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      let _num = new Array(num.length - offset + shift);
      for (let i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    })();

    let _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {
      let num = new Array(_this.getLength() + e.getLength() - 1);

      for (let i = 0; i < _this.getLength(); i += 1) {
        for (let j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(
            QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j))
          );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {
      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      let ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));

      let num = new Array(_this.getLength());
      for (let i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (let i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  }

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  const QRRSBlock = (function() {
    let RS_BLOCK_TABLE = [
      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    let qrRSBlock = function(totalCount, dataCount) {
      let _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    let _this = {};

    let getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case QRErrorCorrectionLevel.L:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectionLevel.M:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectionLevel.Q:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectionLevel.H:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
      let rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == "undefined") {
        throw "bad rs block @ typeNumber:" +
          typeNumber +
          "/errorCorrectionLevel:" +
          errorCorrectionLevel;
      }

      let length = rsBlock.length / 3;

      let list = [];

      for (let i = 0; i < length; i += 1) {
        let count = rsBlock[i * 3 + 0];
        let totalCount = rsBlock[i * 3 + 1];
        let dataCount = rsBlock[i * 3 + 2];

        for (let j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount));
        }
      }

      return list;
    };

    return _this;
  })();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  let qrBitBuffer = function() {
    let _buffer = [];
    let _length = 0;

    let _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      let bufIndex = Math.floor(index / 8);
      return ((_buffer[bufIndex] >>> (7 - (index % 8))) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (let i = 0; i < length; i += 1) {
        _this.putBit(((num >>> (length - i - 1)) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {
      let bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= 0x80 >>> _length % 8;
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  let qrNumber = function(data) {
    let _mode = QRMode.MODE_NUMBER;
    let _data = data;

    let _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(_) {
      return _data.length;
    };

    _this.write = function(buffer) {
      let data = _data;

      let i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3)), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1)), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2)), 7);
        }
      }
    };

    const strToNum = function(s) {
      let num = 0;
      for (let i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i));
      }
      return num;
    };

    const chatToNum = function(c) {
      if ("0" <= c && c <= "9") {
        return c.charCodeAt(0) - "0".charCodeAt(0);
      }
      throw "illegal char :" + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  const qrAlphaNum = function(data) {
    let _mode = QRMode.MODE_ALPHA_NUM;
    let _data = data;

    let _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(_) {
      return _data.length;
    };

    _this.write = function(buffer) {
      let s = _data;

      let i = 0;

      while (i + 1 < s.length) {
        buffer.put(getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i)), 6);
      }
    };

    const getCode = function(c) {
      if ("0" <= c && c <= "9") {
        return c.charCodeAt(0) - "0".charCodeAt(0);
      } else if ("A" <= c && c <= "Z") {
        return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
      } else {
        switch (c) {
          case " ":
            return 36;
          case "$":
            return 37;
          case "%":
            return 38;
          case "*":
            return 39;
          case "+":
            return 40;
          case "-":
            return 41;
          case ".":
            return 42;
          case "/":
            return 43;
          case ":":
            return 44;
          default:
            throw "illegal char :" + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  const qr8BitByte = function(data) {
    let _mode = QRMode.MODE_8BIT_BYTE;
    let _bytes = stringToBytes(data);

    let _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(_) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (let i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  const qrKanji = function(data) {
    {
      throw "sjis not supported.";
    }

    let _this = {};
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  let byteArrayOutputStream = function() {
    let _bytes = [];

    let _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (let i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (let i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i));
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      let s = "";
      s += "[";
      for (let i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ",";
        }
        s += _bytes[i];
      }
      s += "]";
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  let base64EncodeOutputStream = function() {
    let _buffer = 0;
    let _buflen = 0;
    let _length = 0;
    let _base64 = "";

    let _this = {};

    let writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f));
    };

    const encode = function(n) {
      if (n < 0) ; else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw "n:" + n;
    };

    _this.writeByte = function(n) {
      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6));
        _buflen -= 6;
      }
    };

    _this.flush = function() {
      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen));
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        let padlen = 3 - (_length % 3);
        for (let i = 0; i < padlen; i += 1) {
          _base64 += "=";
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  let gifImage = function(width, height) {
    let _width = width;
    let _height = height;
    let _data = new Array(width * height);

    let _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {
      //---------------------------------
      // GIF Signature

      out.writeString("GIF87a");

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(",");
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      let lzwMinCodeSize = 2;
      let raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      let offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(";");
    };

    let bitOutputStream = function(out) {
      let _out = out;
      let _bitLength = 0;
      let _bitBuffer = 0;

      let _this = {};

      _this.write = function(data, length) {
        if (data >>> length != 0) {
          throw "length over";
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ((data << _bitLength) | _bitBuffer));
          length -= 8 - _bitLength;
          data >>>= 8 - _bitLength;
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    const getLZWRaster = function(lzwMinCodeSize) {
      let clearCode = 1 << lzwMinCodeSize;
      let endCode = (1 << lzwMinCodeSize) + 1;
      let bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      let table = lzwTable();

      for (let i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i));
      }
      table.add(String.fromCharCode(clearCode));
      table.add(String.fromCharCode(endCode));

      let byteOut = byteArrayOutputStream();
      let bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      let dataIndex = 0;

      let s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {
        let c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c)) {
          s = s + c;
        } else {
          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {
            if (table.size() == 1 << bitLength) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    const lzwTable = function() {
      let _map = {};
      let _size = 0;

      let _this = {};

      _this.add = function(key) {
        if (_this.contains(key)) {
          throw "dup key:" + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != "undefined";
      };

      return _this;
    };

    return _this;
  };

  const createImgTag = function(width, height, getPixel, alt) {
    let gif = gifImage(width, height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y));
      }
    }

    let b = byteArrayOutputStream();
    gif.write(b);

    let base64 = base64EncodeOutputStream();
    let bytes = b.toByteArray();
    for (let i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    let img = "";
    img += "<img";
    img += '\u0020src="';
    img += "data:image/gif;base64,";
    img += base64;
    img += '"';
    img += '\u0020width="';
    img += width;
    img += '"';
    img += '\u0020height="';
    img += height;
    img += '"';
    if (alt) {
      img += '\u0020alt="';
      img += alt;
      img += '"';
    }
    img += "/>";

    return img;
  };

  // multibyte support
  stringToBytesFuncs["UTF-8"] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      let utf8 = [];
      for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(
            0xe0 | (charcode >> 12),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f)
          );
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode =
            0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
          utf8.push(
            0xf0 | (charcode >> 18),
            0x80 | ((charcode >> 12) & 0x3f),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f)
          );
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

  var _this = {
    state: {
      firstLoad: true,
      html: '',
      data: {},
      tldType: '.kenzap.site',
      newQR: false,
      baseURL: '',
      downloadName: 'qr-menu.svg',
      ajaxQueue: 0
    },
    init: function init() {
      _this.getData();

      _this.getQRHTML();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
          'Kenzap-Header': localStorage.hasOwnProperty('header'),
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': getSiteId()
        },
        body: JSON.stringify({
          query: {
            locale: {
              type: 'locale',
              id: getCookie('lang')
            },
            settings: {
              type: 'get',
              key: 'qrmenu-settings',
              fields: ['mode', 'palette', 'categories', 'max_addition', 'slug', 'total_tables', 'table_number', 'updated']
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          initHeader(response);

          _this.loadHomeStructure();

          _this.renderPage(response);

          _this.initListeners();

          _this.initFooter();

          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    getQRHTML: function getQRHTML() {
      console.log('getQRHTML');
      fetch('/feed/index.html', {
        method: 'get',
        headers: {}
      }).then(function (response) {
        return response.text();
      }).then(function (response) {
        _this.state.html = response;
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    renderPage: function renderPage(response) {
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud?launcher=qr-menu'),
        text: __('Dashboard')
      }, {
        text: __('QR menu')
      }]);
      _this.state.data = response.settings;

      for (var field in response.settings) {
        if (typeof response.settings[field] === "undefined") continue;
        if (response.settings[field] == "") continue;
        if (document.querySelector("#" + field)) switch (document.querySelector("#" + field).dataset.type) {
          case 'text':
          case 'email':
          case 'emails':
          case 'number':
          case 'select':
          case 'textarea':
            document.querySelector("#" + field).value = response.settings[field];
            break;

          case 'range':
            document.querySelector("#" + field).value = response.settings[field];
            document.querySelector("#" + field + '_val').innerHTML = response.settings[field];
            break;

          case 'palette':
            for (var p in response.settings[field]) {
              document.querySelector('[data-key="' + p + '"]').value = response.settings[field][p];
              document.querySelector('[data-key="' + p + '"]').style.backgroundColor = response.settings[field][p];
            }

            break;
        }

        if (document.querySelector('[name="' + field + '"]')) {
          document.querySelector("#" + field + response.settings[field]).setAttribute('checked', true);
        }
      }

      _this.listeners.modeRefresh();

      hideLoader();
    },
    initListeners: function initListeners() {
      console.log('initListeners ');
      onClick('.rename-layout', _this.listeners.renameLayout);
      onClick('.duplicate-layout', _this.listeners.duplicateLayout);
      onClick('.remove-layout', _this.listeners.removeLayout);
      onClick('.qr-download', _this.listeners.qrDownload);
      onChange('.palette input', _this.listeners.paletteRefresh);
      onChange('#max_addition', _this.listeners.maxAdditionRange);
      onChange('#total_tables', _this.listeners.totalTablesRefresh);
      onChange('#table_number', _this.listeners.tableNumberRefresh);
      onChange('[name="mode"]', _this.listeners.modeRefresh);
      if (!_this.state.firstLoad) return;
      onClick('.btn-publish', _this.listeners.publish);
      onClick('.domain-list li a', _this.listeners.domainChange);
      onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    },
    listeners: {
      publish: function publish(e) {
        e.preventDefault();

        if (document.querySelector('#slug').value.length < 4) {
          alert(__('Please provide a longer public link'));
          return;
        }

        showLoader();
        var data = {};

        var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.inp')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var s = _step.value;

            switch (s.dataset.type) {
              case 'text':
              case 'email':
              case 'emails':
              case 'number':
              case 'select':
              case 'textarea':
                data[s.id] = s.value;
                break;

              case 'range':
                data[s.id] = s.value;
                break;

              case 'radio':
                data[s.getAttribute('name')] = s.parentElement.parentElement.parentElement.querySelector('input:checked').value;
                break;

              case 'palette':
                if (data[s.id] == null) data[s.id] = {};

                var _iterator2 = _createForOfIteratorHelper(s.querySelectorAll('input')),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var p = _step2.value;
                    data[s.id][p.dataset.key] = p.value;
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (_this.state.data.mode != data.mode) _this.state.newQR = true;
        _this.state.data = data;

        _this.preProcessHTML();

        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
            'Kenzap-Token': getCookie('kenzap_token'),
            'Kenzap-Sid': getSiteId()
          },
          body: JSON.stringify({
            query: {
              settings: {
                type: 'set',
                key: 'qrmenu-settings',
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            toast('Changes applied');

            if (_this.state.newQR) {
              _this.refreshURL();

              document.querySelector('.qr-note').classList.remove('d-none');
            }

            hideLoader();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          console.error('Error:', error);
        });
      },
      paletteRefresh: function paletteRefresh(e) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = e.currentTarget.value;
      },
      maxAdditionRange: function maxAdditionRange(e) {
        document.querySelector('#max_addition_val').innerHTML = e.currentTarget.value;
      },
      totalTablesRefresh: function totalTablesRefresh(e) {
        _this.listeners.genTableSelect();
      },
      tableNumberRefresh: function tableNumberRefresh(e) {
        _this.refreshURL();
      },
      modeRefresh: function modeRefresh(e) {
        var mode = parseInt(document.querySelector('[name="mode"]').parentElement.parentElement.parentElement.querySelector('input:checked').value);

        if (mode == 1) {
          document.querySelector('.total_tables_cont').classList.remove('d-none');
          document.querySelector('.table_number_cont').classList.remove('d-none');

          _this.listeners.genTableSelect();
        } else {
          document.querySelector('.total_tables_cont').classList.add('d-none');
          document.querySelector('.table_number_cont').classList.add('d-none');
        }

        _this.refreshURL();
      },
      genTableSelect: function genTableSelect(e) {
        var total_tables = document.querySelector('#total_tables').value;
        if (total_tables == '') total_tables = 1;
        var options = "<option value=\"1\" selected>".concat(__('Table'), " #1</option>");

        for (var i = 1; i < total_tables; i++) {
          options += "<option value=\"".concat(i + 1, "\">").concat(__('Table'), " #").concat(i + 1, "</option>");
        }

        document.querySelector('#table_number').innerHTML = options;
      },
      qrDownload: function qrDownload(e) {
        e.preventDefault();
        var qr_svg = e.currentTarget.parentNode.querySelector('.qr-preview').innerHTML;
        var svg_data_uri = 'data:image/svg+xml;utf8,' + qr_svg;
        var link = document.querySelector('.d-link');
        link.setAttribute('href', svg_data_uri);
        link.setAttribute('download', _this.state.downloadName);
        simulateClick(link);
      },
      domainChange: function domainChange(e) {
        e.preventDefault();
        var btn = document.querySelector('.btn-tld');
        btn.innerHTML = e.currentTarget.innerHTML;
        _this.state.tldType = e.currentTarget.dataset.key;
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    preProcessHTML: function preProcessHTML() {
      var customizer = "\n            <!-- Customizer start -->\n            <style>\n                :root {\n                    --txtColorA: ".concat(_this.state.data.palette.txtColorA, ";;\n                    --txtColorB: ").concat(_this.state.data.palette.txtColorB, ";\n                    --txtColorC: ").concat(_this.state.data.palette.txtColorC, ";\n                    --bgColorA: ").concat(_this.state.data.palette.bgColorA, ";\n                    --bgColorB: ").concat(_this.state.data.palette.bgColorB, ";\n                    --bgColorC: #000000;\n                    --linkColorA: #1941DF;\n                    --linkColorB: #1941dfd0;\n                    --baseColorA: ").concat(_this.state.data.palette.baseColorA, ";\n                    --baseColorB: #1941df;\n                    --accColorA: #1941df;\n                    --accColorB: #1941df;\n                    --grayColorA: #F7F7F7;\n                    --grayColorB: #c0c0c0;\n                    --grayColorC: #818181;\n                }\n            </style>\n            <script>\n                const API_KEY = 'bJJ04G0y1HGpOtT8KczDRej20iWOnaauA2Y2UkI8QJxQDQ0AnkfYnm2t4KHuou9c';\n                let config = {\"price\":{\"currency\":\"SGD\",\"symbol\":\"S$\",\"style\":\"left\"},\"cart\":{\"max_addition\":").concat(_this.state.data.max_addition, "},\"PREFIX\":\"/menu\",\"domain\":\"").concat(_this.state.baseURL, "\"};\n            </script>");

      var html = _this.state.html.substring(0, _this.state.html.indexOf('<!-- Customizer start -->')) + customizer + _this.state.html.substring(_this.state.html.indexOf('<!-- Customizer end -->'), _this.state.html.length);

      _this.publishHTML(html);
    },
    publishHTML: function publishHTML(html) {
      var d = document;
      var data = {};
      data.domain = d.querySelector('#slug').value + _this.state.tldType;
      data.files = [{
        type: 'raw',
        data: html,
        name: 'index.html'
      }, {
        type: 'github',
        url: 'https://raw.githubusercontent.com/kenzap/qr-menu/main/public/feed/index.js'
      }, {
        type: 'github',
        url: 'https://raw.githubusercontent.com/kenzap/qr-menu/main/public/feed/styles.css'
      }];
      var params = new URLSearchParams();
      params.append("cmd", "publish_site");
      params.append("key", "qrmenu");
      params.append("data", JSON.stringify(data));
      params.append("html", html);
      params.append("sid", getSiteId());
      params.append("token", getCookie('kenzap_token'));
      fetch('https://siteapi.kenzap.cloud/v1/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: params
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();
        console.log('publishHTML response');

        if (response.success) ; else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    genQR: function genQR(sel, domain) {
      var qr = new qrcode(0, 'H');
      qr.addData(domain);
      qr.make();
      document.querySelector(sel).innerHTML = qr.createSvgTag({});
    },
    refreshURL: function refreshURL() {
      var mode = parseInt(document.querySelector('[name="mode"]').parentElement.parentElement.parentElement.querySelector('input:checked').value);
      var tn = document.querySelector('#table_number').value;
      if (tn == '') tn = 1;
      var postfix = '';
      _this.state.downloadName = 'qr-menu.svg';

      switch (mode) {
        case 0:
          break;

        case 1:
          postfix = '?table=' + tn;
          _this.state.downloadName = 'qr-menu-table-' + tn + '.svg';
          break;

        case 2:
          postfix = '?table=0';
          _this.state.downloadName = 'qr-menu-no-table-mode.svg';
          break;
      }

      _this.state.baseURL = 'http://' + _this.state.data.slug + _this.state.tldType + postfix;
      document.querySelector('.preview-link').setAttribute('href', _this.state.baseURL);

      _this.genQR('.qr-preview', _this.state.baseURL);
    },
    loadHomeStructure: function loadHomeStructure() {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    initFooter: function initFooter$1() {
      initFooter(__('Copyright © ' + new Date().getFullYear() + ' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('Kenzap Cloud Services - Dashboard'));
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
