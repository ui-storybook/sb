/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(306);


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	__webpack_require__(307);

	var _helper = __webpack_require__(309);

	var _helper2 = _interopRequireDefault(_helper);

	var _helper3 = __webpack_require__(330);

	var _helper4 = _interopRequireDefault(_helper3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _module = angular.module('helper', ['ngSanitize']);

	_module.directive('compile', _helper4.default);

	_module.component('previewHelper', {
	    controller: _helper2.default,
	    template: '<div compile="vm.template"></div>',
	    controllerAs: 'vm'
	});

	exports.default = _module.name;

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(308);
	module.exports = 'ngSanitize';


/***/ },

/***/ 308:
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.5.8
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular) {'use strict';

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *     Any commits to this file should be reviewed with security in mind.  *
	 *   Changes to this file can potentially create security vulnerabilities. *
	 *          An approval from 2 Core members with history of modifying      *
	 *                         this file is required.                          *
	 *                                                                         *
	 *  Does the change somehow allow for arbitrary javascript to be executed? *
	 *    Or allows for someone to change the prototype of built-in objects?   *
	 *     Or gives undesired access to variables likes document or window?    *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var $sanitizeMinErr = angular.$$minErr('$sanitize');
	var bind;
	var extend;
	var forEach;
	var isDefined;
	var lowercase;
	var noop;
	var htmlParser;
	var htmlSanitizeWriter;

	/**
	 * @ngdoc module
	 * @name ngSanitize
	 * @description
	 *
	 * # ngSanitize
	 *
	 * The `ngSanitize` module provides functionality to sanitize HTML.
	 *
	 *
	 * <div doc-module-components="ngSanitize"></div>
	 *
	 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
	 */

	/**
	 * @ngdoc service
	 * @name $sanitize
	 * @kind function
	 *
	 * @description
	 *   Sanitizes an html string by stripping all potentially dangerous tokens.
	 *
	 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
	 *   then serialized back to properly escaped html string. This means that no unsafe input can make
	 *   it into the returned string.
	 *
	 *   The whitelist for URL sanitization of attribute values is configured using the functions
	 *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider
	 *   `$compileProvider`}.
	 *
	 *   The input may also contain SVG markup if this is enabled via {@link $sanitizeProvider}.
	 *
	 * @param {string} html HTML input.
	 * @returns {string} Sanitized HTML.
	 *
	 * @example
	   <example module="sanitizeExample" deps="angular-sanitize.js">
	   <file name="index.html">
	     <script>
	         angular.module('sanitizeExample', ['ngSanitize'])
	           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
	             $scope.snippet =
	               '<p style="color:blue">an html\n' +
	               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
	               'snippet</p>';
	             $scope.deliberatelyTrustDangerousSnippet = function() {
	               return $sce.trustAsHtml($scope.snippet);
	             };
	           }]);
	     </script>
	     <div ng-controller="ExampleController">
	        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
	       <table>
	         <tr>
	           <td>Directive</td>
	           <td>How</td>
	           <td>Source</td>
	           <td>Rendered</td>
	         </tr>
	         <tr id="bind-html-with-sanitize">
	           <td>ng-bind-html</td>
	           <td>Automatically uses $sanitize</td>
	           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
	           <td><div ng-bind-html="snippet"></div></td>
	         </tr>
	         <tr id="bind-html-with-trust">
	           <td>ng-bind-html</td>
	           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
	           <td>
	           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
	&lt;/div&gt;</pre>
	           </td>
	           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
	         </tr>
	         <tr id="bind-default">
	           <td>ng-bind</td>
	           <td>Automatically escapes</td>
	           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
	           <td><div ng-bind="snippet"></div></td>
	         </tr>
	       </table>
	       </div>
	   </file>
	   <file name="protractor.js" type="protractor">
	     it('should sanitize the html snippet by default', function() {
	       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
	         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
	     });

	     it('should inline raw snippet if bound to a trusted value', function() {
	       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).
	         toBe("<p style=\"color:blue\">an html\n" +
	              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
	              "snippet</p>");
	     });

	     it('should escape snippet without any filter', function() {
	       expect(element(by.css('#bind-default div')).getInnerHtml()).
	         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
	              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
	              "snippet&lt;/p&gt;");
	     });

	     it('should update', function() {
	       element(by.model('snippet')).clear();
	       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
	       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
	         toBe('new <b>text</b>');
	       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(
	         'new <b onclick="alert(1)">text</b>');
	       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(
	         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
	     });
	   </file>
	   </example>
	 */


	/**
	 * @ngdoc provider
	 * @name $sanitizeProvider
	 *
	 * @description
	 * Creates and configures {@link $sanitize} instance.
	 */
	function $SanitizeProvider() {
	  var svgEnabled = false;

	  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
	    if (svgEnabled) {
	      extend(validElements, svgElements);
	    }
	    return function(html) {
	      var buf = [];
	      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
	        return !/^unsafe:/.test($$sanitizeUri(uri, isImage));
	      }));
	      return buf.join('');
	    };
	  }];


	  /**
	   * @ngdoc method
	   * @name $sanitizeProvider#enableSvg
	   * @kind function
	   *
	   * @description
	   * Enables a subset of svg to be supported by the sanitizer.
	   *
	   * <div class="alert alert-warning">
	   *   <p>By enabling this setting without taking other precautions, you might expose your
	   *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned
	   *   outside of the containing element and be rendered over other elements on the page (e.g. a login
	   *   link). Such behavior can then result in phishing incidents.</p>
	   *
	   *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg
	   *   tags within the sanitized content:</p>
	   *
	   *   <br>
	   *
	   *   <pre><code>
	   *   .rootOfTheIncludedContent svg {
	   *     overflow: hidden !important;
	   *   }
	   *   </code></pre>
	   * </div>
	   *
	   * @param {boolean=} flag Enable or disable SVG support in the sanitizer.
	   * @returns {boolean|ng.$sanitizeProvider} Returns the currently configured value if called
	   *    without an argument or self for chaining otherwise.
	   */
	  this.enableSvg = function(enableSvg) {
	    if (isDefined(enableSvg)) {
	      svgEnabled = enableSvg;
	      return this;
	    } else {
	      return svgEnabled;
	    }
	  };

	  //////////////////////////////////////////////////////////////////////////////////////////////////
	  // Private stuff
	  //////////////////////////////////////////////////////////////////////////////////////////////////

	  bind = angular.bind;
	  extend = angular.extend;
	  forEach = angular.forEach;
	  isDefined = angular.isDefined;
	  lowercase = angular.lowercase;
	  noop = angular.noop;

	  htmlParser = htmlParserImpl;
	  htmlSanitizeWriter = htmlSanitizeWriterImpl;

	  // Regular Expressions for parsing tags and attributes
	  var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
	    // Match everything outside of normal chars and " (quote character)
	    NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;


	  // Good source of info about elements and attributes
	  // http://dev.w3.org/html5/spec/Overview.html#semantics
	  // http://simon.html5.org/html-elements

	  // Safe Void Elements - HTML5
	  // http://dev.w3.org/html5/spec/Overview.html#void-elements
	  var voidElements = toMap("area,br,col,hr,img,wbr");

	  // Elements that you can, intentionally, leave open (and which close themselves)
	  // http://dev.w3.org/html5/spec/Overview.html#optional-tags
	  var optionalEndTagBlockElements = toMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
	      optionalEndTagInlineElements = toMap("rp,rt"),
	      optionalEndTagElements = extend({},
	                                              optionalEndTagInlineElements,
	                                              optionalEndTagBlockElements);

	  // Safe Block Elements - HTML5
	  var blockElements = extend({}, optionalEndTagBlockElements, toMap("address,article," +
	          "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +
	          "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul"));

	  // Inline Elements - HTML5
	  var inlineElements = extend({}, optionalEndTagInlineElements, toMap("a,abbr,acronym,b," +
	          "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +
	          "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));

	  // SVG Elements
	  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
	  // Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.
	  // They can potentially allow for arbitrary javascript to be executed. See #11290
	  var svgElements = toMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph," +
	          "hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline," +
	          "radialGradient,rect,stop,svg,switch,text,title,tspan");

	  // Blocked Elements (will be stripped)
	  var blockedElements = toMap("script,style");

	  var validElements = extend({},
	                                     voidElements,
	                                     blockElements,
	                                     inlineElements,
	                                     optionalEndTagElements);

	  //Attributes that have href and hence need to be sanitized
	  var uriAttrs = toMap("background,cite,href,longdesc,src,xlink:href");

	  var htmlAttrs = toMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
	      'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
	      'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
	      'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
	      'valign,value,vspace,width');

	  // SVG attributes (without "id" and "name" attributes)
	  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
	  var svgAttrs = toMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
	      'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
	      'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
	      'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
	      'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
	      'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
	      'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
	      'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
	      'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
	      'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
	      'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
	      'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
	      'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
	      'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
	      'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);

	  var validAttrs = extend({},
	                                  uriAttrs,
	                                  svgAttrs,
	                                  htmlAttrs);

	  function toMap(str, lowercaseKeys) {
	    var obj = {}, items = str.split(','), i;
	    for (i = 0; i < items.length; i++) {
	      obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = true;
	    }
	    return obj;
	  }

	  var inertBodyElement;
	  (function(window) {
	    var doc;
	    if (window.document && window.document.implementation) {
	      doc = window.document.implementation.createHTMLDocument("inert");
	    } else {
	      throw $sanitizeMinErr('noinert', "Can't create an inert html document");
	    }
	    var docElement = doc.documentElement || doc.getDocumentElement();
	    var bodyElements = docElement.getElementsByTagName('body');

	    // usually there should be only one body element in the document, but IE doesn't have any, so we need to create one
	    if (bodyElements.length === 1) {
	      inertBodyElement = bodyElements[0];
	    } else {
	      var html = doc.createElement('html');
	      inertBodyElement = doc.createElement('body');
	      html.appendChild(inertBodyElement);
	      doc.appendChild(html);
	    }
	  })(window);

	  /**
	   * @example
	   * htmlParser(htmlString, {
	   *     start: function(tag, attrs) {},
	   *     end: function(tag) {},
	   *     chars: function(text) {},
	   *     comment: function(text) {}
	   * });
	   *
	   * @param {string} html string
	   * @param {object} handler
	   */
	  function htmlParserImpl(html, handler) {
	    if (html === null || html === undefined) {
	      html = '';
	    } else if (typeof html !== 'string') {
	      html = '' + html;
	    }
	    inertBodyElement.innerHTML = html;

	    //mXSS protection
	    var mXSSAttempts = 5;
	    do {
	      if (mXSSAttempts === 0) {
	        throw $sanitizeMinErr('uinput', "Failed to sanitize html because the input is unstable");
	      }
	      mXSSAttempts--;

	      // strip custom-namespaced attributes on IE<=11
	      if (window.document.documentMode) {
	        stripCustomNsAttrs(inertBodyElement);
	      }
	      html = inertBodyElement.innerHTML; //trigger mXSS
	      inertBodyElement.innerHTML = html;
	    } while (html !== inertBodyElement.innerHTML);

	    var node = inertBodyElement.firstChild;
	    while (node) {
	      switch (node.nodeType) {
	        case 1: // ELEMENT_NODE
	          handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
	          break;
	        case 3: // TEXT NODE
	          handler.chars(node.textContent);
	          break;
	      }

	      var nextNode;
	      if (!(nextNode = node.firstChild)) {
	      if (node.nodeType == 1) {
	          handler.end(node.nodeName.toLowerCase());
	        }
	        nextNode = node.nextSibling;
	        if (!nextNode) {
	          while (nextNode == null) {
	            node = node.parentNode;
	            if (node === inertBodyElement) break;
	            nextNode = node.nextSibling;
	          if (node.nodeType == 1) {
	              handler.end(node.nodeName.toLowerCase());
	            }
	          }
	        }
	      }
	      node = nextNode;
	    }

	    while (node = inertBodyElement.firstChild) {
	      inertBodyElement.removeChild(node);
	    }
	  }

	  function attrToMap(attrs) {
	    var map = {};
	    for (var i = 0, ii = attrs.length; i < ii; i++) {
	      var attr = attrs[i];
	      map[attr.name] = attr.value;
	    }
	    return map;
	  }


	  /**
	   * Escapes all potentially dangerous characters, so that the
	   * resulting string can be safely inserted into attribute or
	   * element text.
	   * @param value
	   * @returns {string} escaped text
	   */
	  function encodeEntities(value) {
	    return value.
	      replace(/&/g, '&amp;').
	      replace(SURROGATE_PAIR_REGEXP, function(value) {
	        var hi = value.charCodeAt(0);
	        var low = value.charCodeAt(1);
	        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
	      }).
	      replace(NON_ALPHANUMERIC_REGEXP, function(value) {
	        return '&#' + value.charCodeAt(0) + ';';
	      }).
	      replace(/</g, '&lt;').
	      replace(/>/g, '&gt;');
	  }

	  /**
	   * create an HTML/XML writer which writes to buffer
	   * @param {Array} buf use buf.join('') to get out sanitized html string
	   * @returns {object} in the form of {
	   *     start: function(tag, attrs) {},
	   *     end: function(tag) {},
	   *     chars: function(text) {},
	   *     comment: function(text) {}
	   * }
	   */
	  function htmlSanitizeWriterImpl(buf, uriValidator) {
	    var ignoreCurrentElement = false;
	    var out = bind(buf, buf.push);
	    return {
	      start: function(tag, attrs) {
	        tag = lowercase(tag);
	        if (!ignoreCurrentElement && blockedElements[tag]) {
	          ignoreCurrentElement = tag;
	        }
	        if (!ignoreCurrentElement && validElements[tag] === true) {
	          out('<');
	          out(tag);
	          forEach(attrs, function(value, key) {
	            var lkey = lowercase(key);
	            var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
	            if (validAttrs[lkey] === true &&
	              (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
	              out(' ');
	              out(key);
	              out('="');
	              out(encodeEntities(value));
	              out('"');
	            }
	          });
	          out('>');
	        }
	      },
	      end: function(tag) {
	        tag = lowercase(tag);
	        if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {
	          out('</');
	          out(tag);
	          out('>');
	        }
	        if (tag == ignoreCurrentElement) {
	          ignoreCurrentElement = false;
	        }
	      },
	      chars: function(chars) {
	        if (!ignoreCurrentElement) {
	          out(encodeEntities(chars));
	        }
	      }
	    };
	  }


	  /**
	   * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare
	   * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
	   * to allow any of these custom attributes. This method strips them all.
	   *
	   * @param node Root element to process
	   */
	  function stripCustomNsAttrs(node) {
	    if (node.nodeType === window.Node.ELEMENT_NODE) {
	      var attrs = node.attributes;
	      for (var i = 0, l = attrs.length; i < l; i++) {
	        var attrNode = attrs[i];
	        var attrName = attrNode.name.toLowerCase();
	        if (attrName === 'xmlns:ns1' || attrName.lastIndexOf('ns1:', 0) === 0) {
	          node.removeAttributeNode(attrNode);
	          i--;
	          l--;
	        }
	      }
	    }

	    var nextNode = node.firstChild;
	    if (nextNode) {
	      stripCustomNsAttrs(nextNode);
	    }

	    nextNode = node.nextSibling;
	    if (nextNode) {
	      stripCustomNsAttrs(nextNode);
	    }
	  }
	}

	function sanitizeText(chars) {
	  var buf = [];
	  var writer = htmlSanitizeWriter(buf, noop);
	  writer.chars(chars);
	  return buf.join('');
	}


	// define ngSanitize module and register $sanitize service
	angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);

	/**
	 * @ngdoc filter
	 * @name linky
	 * @kind function
	 *
	 * @description
	 * Finds links in text input and turns them into html links. Supports `http/https/ftp/mailto` and
	 * plain email address links.
	 *
	 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
	 *
	 * @param {string} text Input text.
	 * @param {string} target Window (`_blank|_self|_parent|_top`) or named frame to open links in.
	 * @param {object|function(url)} [attributes] Add custom attributes to the link element.
	 *
	 *    Can be one of:
	 *
	 *    - `object`: A map of attributes
	 *    - `function`: Takes the url as a parameter and returns a map of attributes
	 *
	 *    If the map of attributes contains a value for `target`, it overrides the value of
	 *    the target parameter.
	 *
	 *
	 * @returns {string} Html-linkified and {@link $sanitize sanitized} text.
	 *
	 * @usage
	   <span ng-bind-html="linky_expression | linky"></span>
	 *
	 * @example
	   <example module="linkyExample" deps="angular-sanitize.js">
	     <file name="index.html">
	       <div ng-controller="ExampleController">
	       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
	       <table>
	         <tr>
	           <th>Filter</th>
	           <th>Source</th>
	           <th>Rendered</th>
	         </tr>
	         <tr id="linky-filter">
	           <td>linky filter</td>
	           <td>
	             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
	           </td>
	           <td>
	             <div ng-bind-html="snippet | linky"></div>
	           </td>
	         </tr>
	         <tr id="linky-target">
	          <td>linky target</td>
	          <td>
	            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
	          </td>
	          <td>
	            <div ng-bind-html="snippetWithSingleURL | linky:'_blank'"></div>
	          </td>
	         </tr>
	         <tr id="linky-custom-attributes">
	          <td>linky custom attributes</td>
	          <td>
	            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"&gt;<br>&lt;/div&gt;</pre>
	          </td>
	          <td>
	            <div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"></div>
	          </td>
	         </tr>
	         <tr id="escaped-html">
	           <td>no filter</td>
	           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
	           <td><div ng-bind="snippet"></div></td>
	         </tr>
	       </table>
	     </file>
	     <file name="script.js">
	       angular.module('linkyExample', ['ngSanitize'])
	         .controller('ExampleController', ['$scope', function($scope) {
	           $scope.snippet =
	             'Pretty text with some links:\n'+
	             'http://angularjs.org/,\n'+
	             'mailto:us@somewhere.org,\n'+
	             'another@somewhere.org,\n'+
	             'and one more: ftp://127.0.0.1/.';
	           $scope.snippetWithSingleURL = 'http://angularjs.org/';
	         }]);
	     </file>
	     <file name="protractor.js" type="protractor">
	       it('should linkify the snippet with urls', function() {
	         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
	             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
	                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
	         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
	       });

	       it('should not linkify snippet without the linky filter', function() {
	         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
	             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
	                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
	         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
	       });

	       it('should update', function() {
	         element(by.model('snippet')).clear();
	         element(by.model('snippet')).sendKeys('new http://link.');
	         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
	             toBe('new http://link.');
	         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
	         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
	             .toBe('new http://link.');
	       });

	       it('should work with the target property', function() {
	        expect(element(by.id('linky-target')).
	            element(by.binding("snippetWithSingleURL | linky:'_blank'")).getText()).
	            toBe('http://angularjs.org/');
	        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
	       });

	       it('should optionally add custom attributes', function() {
	        expect(element(by.id('linky-custom-attributes')).
	            element(by.binding("snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}")).getText()).
	            toBe('http://angularjs.org/');
	        expect(element(by.css('#linky-custom-attributes a')).getAttribute('rel')).toEqual('nofollow');
	       });
	     </file>
	   </example>
	 */
	angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
	  var LINKY_URL_REGEXP =
	        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
	      MAILTO_REGEXP = /^mailto:/i;

	  var linkyMinErr = angular.$$minErr('linky');
	  var isDefined = angular.isDefined;
	  var isFunction = angular.isFunction;
	  var isObject = angular.isObject;
	  var isString = angular.isString;

	  return function(text, target, attributes) {
	    if (text == null || text === '') return text;
	    if (!isString(text)) throw linkyMinErr('notstring', 'Expected string but received: {0}', text);

	    var attributesFn =
	      isFunction(attributes) ? attributes :
	      isObject(attributes) ? function getAttributesObject() {return attributes;} :
	      function getEmptyAttributesObject() {return {};};

	    var match;
	    var raw = text;
	    var html = [];
	    var url;
	    var i;
	    while ((match = raw.match(LINKY_URL_REGEXP))) {
	      // We can not end in these as they are sometimes found at the end of the sentence
	      url = match[0];
	      // if we did not match ftp/http/www/mailto then assume mailto
	      if (!match[2] && !match[4]) {
	        url = (match[3] ? 'http://' : 'mailto:') + url;
	      }
	      i = match.index;
	      addText(raw.substr(0, i));
	      addLink(url, match[0].replace(MAILTO_REGEXP, ''));
	      raw = raw.substring(i + match[0].length);
	    }
	    addText(raw);
	    return $sanitize(html.join(''));

	    function addText(text) {
	      if (!text) {
	        return;
	      }
	      html.push(sanitizeText(text));
	    }

	    function addLink(url, text) {
	      var key, linkAttributes = attributesFn(url);
	      html.push('<a ');

	      for (key in linkAttributes) {
	        html.push(key + '="' + linkAttributes[key] + '" ');
	      }

	      if (isDefined(target) && !('target' in linkAttributes)) {
	        html.push('target="',
	                  target,
	                  '" ');
	      }
	      html.push('href="',
	                url.replace(/"/g, '&quot;'),
	                '">');
	      addText(text);
	      html.push('</a>');
	    }
	  };
	}]);


	})(window, window.angular);


/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(310);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(311);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HelperController = function () {
	    function HelperController($scope) {
	        (0, _classCallCheck3.default)(this, HelperController);

	        this.$scope = $scope;

	        // Allowed events from parrent iFrame
	        this.events = {
	            'component': this.loadComponent,
	            'model': this.loadModel
	        };
	    }

	    (0, _createClass3.default)(HelperController, [{
	        key: '$onInit',
	        value: function $onInit() {
	            var _this = this;

	            // Tell sb that helper already loaded;
	            window.parent.sb.contact();

	            // Register lissener for render new component
	            this.postMessageListener = window.addEventListener('message', function (event) {
	                event.data && _this.events[event.data.type].call(_this, event.data.data);
	            }, false);
	        }
	    }, {
	        key: '$onDestroy',
	        value: function $onDestroy() {
	            this.postMessageListener();
	        }
	    }, {
	        key: 'loadModel',
	        value: function loadModel(model) {
	            if (model) {
	                for (var k in model) {
	                    this[k] = model[k];
	                }
	            }
	            this.$scope.$apply();
	        }
	    }, {
	        key: 'loadComponent',
	        value: function loadComponent(component) {
	            this.template = component.template;
	            if (component.model) {
	                for (var k in component.model) {
	                    this[k] = component.model[k];
	                }
	            }
	            this.$scope.$apply();
	        }
	    }]);
	    return HelperController;
	}();

	exports.default = HelperController;

/***/ },

/***/ 310:
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(312);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(313), __esModule: true };

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(314);
	var $Object = __webpack_require__(317).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(315);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(325), 'Object', {defineProperty: __webpack_require__(321).f});

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(316)
	  , core      = __webpack_require__(317)
	  , ctx       = __webpack_require__(318)
	  , hide      = __webpack_require__(320)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },

/***/ 316:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 317:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(319);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },

/***/ 319:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(321)
	  , createDesc = __webpack_require__(329);
	module.exports = __webpack_require__(325) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(322)
	  , IE8_DOM_DEFINE = __webpack_require__(324)
	  , toPrimitive    = __webpack_require__(328)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(325) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(323);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ 323:
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(325) && !__webpack_require__(326)(function(){
	  return Object.defineProperty(__webpack_require__(327)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(326)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 326:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(323)
	  , document = __webpack_require__(316).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(323);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },

/***/ 329:
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ 330:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function ($compile) {
	    return function (scope, element, attrs) {
	        scope.$watch(function (scope) {
	            return scope.$eval(attrs.compile);
	        }, function (value) {
	            element.html(value);
	            $compile(element.contents())(scope);
	        });
	    };
	};

/***/ }

/******/ });