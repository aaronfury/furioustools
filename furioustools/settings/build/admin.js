/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-dom/client.js"
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ },

/***/ "./src/components/index.js"
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* reexport safe */ _settings_page__WEBPACK_IMPORTED_MODULE_0__.SettingsPage)
/* harmony export */ });
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-page */ "./src/components/settings-page.jsx");


/***/ },

/***/ "./src/components/notices.jsx"
/*!************************************!*\
  !*** ./src/components/notices.jsx ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Notices: () => (/* binding */ Notices)
/* harmony export */ });
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const Notices = () => {
  const {
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_0__.store);
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select(_wordpress_notices__WEBPACK_IMPORTED_MODULE_0__.store).getNotices());
  if (notices.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.NoticeList, {
    notices: notices,
    onRemove: removeNotice
  });
};


/***/ },

/***/ "./src/components/settings-page.jsx"
/*!******************************************!*\
  !*** ./src/components/settings-page.jsx ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _notices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notices */ "./src/components/notices.jsx");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks */ "./src/hooks/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const SaveButton = ({
  onClick
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
  variant: "primary",
  type: "submit",
  onClick: onClick,
  __next40pxDefaultSize: true,
  children: "Save Settings"
});
const SettingsPage = () => {
  const {
    cleanupWpCrud,
    setCleanupWpCrud,
    addCustomCrud,
    setAddCustomCrud,
    customCrud,
    setCustomCrud,
    latestJquery,
    setLatestJquery,
    removeJqueryMigrate,
    setRemoveJqueryMigrate,
    trackUserLastLogin,
    setTrackUserLastLogin,
    searchSlug,
    setSearchSlug,
    customReadmore,
    setCustomReadmore,
    customReadmoreText,
    setCustomReadmoreText,
    bypassHttpValidateUrl,
    setBypassHttpValidateUrl,
    removeAttWidth,
    setRemoveAttWidth,
    styleOutboundLinks,
    setStyleOutboundLinks,
    styleOutboundLinksOnlyInContent,
    setStyleOutboundLinksOnlyInContent,
    snapScrolling,
    setSnapScrolling,
    snapScrollingForceFullPages,
    setSnapScrollingForceFullPages,
    smoothScrolling,
    setSmoothScrolling,
    randomTagline,
    setRandomTagline,
    randomTaglineBodyOnly,
    setRandomTaglineBodyOnly,
    randomTaglineList,
    setRandomTaglineList,
    skipHomepage,
    setSkipHomepage,
    skipHomepageShowonce,
    setSkipHomepageShowonce,
    skipHomepageTarget,
    setSkipHomepageTarget,
    redirectOnLogin,
    setRedirectOnLogin,
    redirectOnLoginTarget,
    setRedirectOnLoginTarget,
    hideLoginForm,
    setHideLoginForm,
    saveSettings,
    isDirty
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handler = e => {
      if (!isDirty) return;
      const message = 'You have unsaved changes. Are you sure you want to leave?';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
      children: "Furious Tools Settings"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, {
      gap: 4,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardHeader, {
          children: "Headers and Libraries"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Cleanup WP crud",
            checked: cleanupWpCrud,
            onChange: value => setCleanupWpCrud(value),
            help: "This option removes some unnecessary things from the wp_head() function.",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Add custom crud",
            checked: addCustomCrud,
            onChange: value => setAddCustomCrud(value),
            help: "Add your own data to the <code><head></code> section. Useful for like Graph metadata or other things your theme doesn't provide. Use with caution!",
            __nextHasNoMarginBottom: true
          }), addCustomCrud && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextareaControl, {
            label: "Custom crud to add",
            value: customCrud,
            onChange: value => setCustomCrud(value),
            help: "This text will be inserted directly into the <code><head></code> section of every page. Don't break nuffin'",
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            className: "left-indent"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Use Latest jQuery",
            checked: latestJquery,
            onChange: value => setLatestJquery(value),
            help: "Unloads the default version of jQuery included in WordPress and replace it with the latest version (currently 3.7.1)",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Remove jQuery Migrate",
            checked: removeJqueryMigrate,
            onChange: value => setRemoveJqueryMigrate(value),
            help: "Removes the jQuery Migrate script that is included with WordPress by default.",
            __nextHasNoMarginBottom: true
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardHeader, {
          children: "Miscellaneous Settings"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Track User Last Login",
            checked: trackUserLastLogin,
            onChange: value => setTrackUserLastLogin(value),
            help: "Enable this option to track the last time a user logged in. This information is displayed in the Users list, and can also be accessed using `get_user_meta($user_id, 'last_login', true)`",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Hide Login Form",
            checked: hideLoginForm,
            onChange: value => setHideLoginForm(value),
            help: "Hides the default WordPress login form located at /wp-login.php. Useful if you are using a custom login page or plugin. When enabled, can be overridden by appending '?showloginform' to the wp-login.php URL.",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Include /search slug in search URLs",
            checked: searchSlug,
            onChange: value => setSearchSlug(value),
            help: "If enabled, search URLs will include '/search' slug (e.g., example.com/search/query). If disabled, it will be example.com/?s=query.",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Custom 'Read more' Text",
            checked: customReadmore,
            onChange: value => setCustomReadmore(value),
            help: "Enable this option to replace the default 'Read more..' text at the end of excerpts with your own custom text.",
            __nextHasNoMarginBottom: true
          }), customReadmore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: "Custom Readmore Text",
            value: customReadmoreText,
            onChange: value => setCustomReadmoreText(value),
            help: "Replace the 'Read more..' at the end of excerpts with the custom text you provide. Leave blank to use the default text.",
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            className: "left-indent"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Bypass HTTP URL Validation",
            checked: bypassHttpValidateUrl,
            onChange: value => setBypassHttpValidateUrl(value),
            help: "Disables the built-in check that a request is not coming from the localhost. This is a useful security feature and should only be temporarily bypassed for specific situations, such as same-host site import/export.",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Remove Image Width/Height Attributes",
            checked: removeAttWidth,
            onChange: value => setRemoveAttWidth(value),
            help: "For images and other blocks added in the editor, WordPress automatically sets a fixed-with value on the item in the DOM. This will remove that value.",
            __nextHasNoMarginBottom: true
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardHeader, {
          children: "Frontend Enhancements"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Redirect on Login",
            checked: redirectOnLogin,
            onChange: value => setRedirectOnLogin(value),
            help: "Redirect users to a specific URL after they log in.",
            __nextHasNoMarginBottom: true
          }), redirectOnLogin && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: "Redirect on Login Target URL",
            value: redirectOnLoginTarget,
            onChange: value => setRedirectOnLoginTarget(value),
            help: "The URL to which users will be redirected after logging in.",
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            className: "left-indent"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Style Outbound Links",
            checked: styleOutboundLinks,
            onChange: value => setStyleOutboundLinks(value),
            help: "If a link (<a>) has an <em>href</em> value that links to an external website, apply specific styling to it.",
            __nextHasNoMarginBottom: true
          }), styleOutboundLinks && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Only Style Outbound Links in Content",
            checked: styleOutboundLinksOnlyInContent,
            onChange: value => setStyleOutboundLinksOnlyInContent(value),
            help: "If enabled, only links within the post/page content will be styled as outbound links. Links in widgets, menus, and other areas will not be affected.",
            __nextHasNoMarginBottom: true,
            className: "left-indent"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Enable Snap Scrolling",
            checked: snapScrolling,
            onChange: value => setSnapScrolling(value),
            help: "(Coming soon) Enables snap scrolling behavior, where the viewport snaps to the nearest section when scrolling.",
            disabled: true,
            __nextHasNoMarginBottom: true
          }), snapScrolling && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Force Full Page Snaps",
            checked: snapScrollingForceFullPages,
            onChange: value => setSnapScrollingForceFullPages(value),
            help: "When enabled, the snap scrolling will always snap to full page sections, even if the content is shorter than the viewport height.",
            __nextHasNoMarginBottom: true,
            className: "left-indent"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Enable Smooth Scrolling",
            checked: smoothScrolling,
            onChange: value => setSmoothScrolling(value),
            help: "Enables smooth scrolling behavior for anchor links and general page scrolling.",
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Enable Random Tagline",
            checked: randomTagline,
            onChange: value => setRandomTagline(value),
            help: "Replaces the default site tagline with a random tagline from your custom list on each page load.",
            __nextHasNoMarginBottom: true
          }), randomTagline && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Random Tagline in HTML Body Only",
            checked: randomTaglineBodyOnly,
            onChange: value => setRandomTaglineBodyOnly(value),
            help: "Only replace the tagline in the body of the site, not in the <head> section. It is recommended to enable this to avoid SEO issues.",
            __nextHasNoMarginBottom: true,
            className: "left-indent"
          }), randomTagline && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextareaControl, {
            label: "Random Tagline List",
            value: randomTaglineList,
            onChange: value => setRandomTaglineList(value),
            help: "Enter one tagline per line. These will be randomly selected and displayed as the site tagline.",
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            className: "left-indent"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardHeader, {
          children: "Skip Homepage Settings"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            label: "Enable Skip Homepage",
            checked: skipHomepage,
            onChange: value => setSkipHomepage(value),
            help: "Uses a small cookie and Javascript to skip the home page and automatically redirect the visitor to a different page",
            __nextHasNoMarginBottom: true
          }), skipHomepage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
              label: "Show Homepage Only Once",
              checked: skipHomepageShowonce,
              onChange: value => setSkipHomepageShowonce(value),
              help: "Enabling this will show the front page once, then skip on subsequent visits. If this setting is disabled, the front page will never be shown. This setting uses a client-side cookie; if the user has disabled cookies or clears their browser cache, the front page will be shown again.",
              __nextHasNoMarginBottom: true,
              className: "left-indent"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
              label: "Skip Homepage Target URL",
              value: skipHomepageTarget,
              onChange: value => setSkipHomepageTarget(value),
              help: "The URL to which visitors will be redirected when skipping the homepage.",
              __nextHasNoMarginBottom: true,
              __next40pxDefaultSize: true,
              className: "left-indent"
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalSpacer, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(SaveButton, {
      onClick: saveSettings
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalSpacer, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_notices__WEBPACK_IMPORTED_MODULE_2__.Notices, {})]
  });
};


/***/ },

/***/ "./src/hooks/index.js"
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSettings: () => (/* reexport safe */ _use_settings__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _use_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-settings */ "./src/hooks/use-settings.js");


/***/ },

/***/ "./src/hooks/use-settings.js"
/*!***********************************!*\
  !*** ./src/hooks/use-settings.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);




const useSettings = () => {
  const [cleanupWpCrud, setCleanupWpCrud] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [addCustomCrud, setAddCustomCrud] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [customCrud, setCustomCrud] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [latestJquery, setLatestJquery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [removeJqueryMigrate, setRemoveJqueryMigrate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [trackUserLastLogin, setTrackUserLastLogin] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [searchSlug, setSearchSlug] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [customReadmore, setCustomReadmore] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [customReadmoreText, setCustomReadmoreText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [bypassHttpValidateUrl, setBypassHttpValidateUrl] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [removeAttWidth, setRemoveAttWidth] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [styleOutboundLinks, setStyleOutboundLinks] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [styleOutboundLinksOnlyInContent, setStyleOutboundLinksOnlyInContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [snapScrolling, setSnapScrolling] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [snapScrollingForceFullPages, setSnapScrollingForceFullPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [smoothScrolling, setSmoothScrolling] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [skipHomepage, setSkipHomepage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [skipHomepageShowonce, setSkipHomepageShowonce] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [skipHomepageTarget, setSkipHomepageTarget] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [hideLoginForm, setHideLoginForm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [hideAdminBar, setHideAdminBar] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [randomTagline, setRandomTagline] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [randomTaglineBodyOnly, setRandomTaglineBodyOnly] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [randomTaglineList, setRandomTaglineList] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [redirectOnLogin, setRedirectOnLogin] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [redirectOnLoginTarget, setRedirectOnLoginTarget] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [isDirty, setIsDirty] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const initialSettingsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    createSuccessNotice,
    createErrorNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_2__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/settings'
    }).then(settings => {
      setCleanupWpCrud(settings.furious_tools.cleanup_wp_crud || false);
      setAddCustomCrud(settings.furious_tools.add_custom_crud || false);
      setCustomCrud(settings.furious_tools.custom_crud || '');
      setLatestJquery(settings.furious_tools.latest_jquery || false);
      setRemoveJqueryMigrate(settings.furious_tools.remove_jquery_migrate || false);
      setTrackUserLastLogin(settings.furious_tools.track_user_last_login || false);
      setSearchSlug(settings.furious_tools.search_slug || false);
      setCustomReadmore(settings.furious_tools.custom_readmore || false);
      setCustomReadmoreText(settings.furious_tools.custom_readmore_text || '');
      setBypassHttpValidateUrl(settings.furious_tools.bypass_http_validate_url || false);
      setRemoveAttWidth(settings.furious_tools.remove_att_width || false);
      setStyleOutboundLinks(settings.furious_tools.style_outbound_links || false);
      setStyleOutboundLinksOnlyInContent(settings.furious_tools.style_outbound_links_only_in_content || false);
      setSnapScrolling(settings.furious_tools.snap_scrolling || false);
      setSnapScrollingForceFullPages(settings.furious_tools.snap_scrolling_force_full_pages || false);
      setSmoothScrolling(settings.furious_tools.smooth_scrolling || false);
      setSkipHomepage(settings.furious_tools.skip_homepage || false);
      setSkipHomepageShowonce(settings.furious_tools.skip_homepage_showonce || false);
      setSkipHomepageTarget(settings.furious_tools.skip_homepage_target || '');
      setHideLoginForm(settings.furious_tools.hide_login_form || false);
      setHideAdminBar(settings.furious_tools.hide_admin_bar || false);
      setRandomTagline(settings.furious_tools.random_tagline || false);
      setRandomTaglineBodyOnly(settings.furious_tools.random_tagline_body_only || true);
      setRandomTaglineList(settings.furious_tools.random_tagline_list || '');
      setRedirectOnLogin(settings.furious_tools.redirect_on_login || false);
      setRedirectOnLoginTarget(settings.furious_tools.redirect_on_login_target || '');

      // Capture initial loaded settings for dirty checking
      initialSettingsRef.current = {
        cleanup_wp_crud: settings.furious_tools.cleanup_wp_crud || false,
        add_custom_crud: settings.furious_tools.add_custom_crud || false,
        custom_crud: settings.furious_tools.custom_crud || '',
        latest_jquery: settings.furious_tools.latest_jquery || false,
        remove_jquery_migrate: settings.furious_tools.remove_jquery_migrate || false,
        track_user_last_login: settings.furious_tools.track_user_last_login || false,
        search_slug: settings.furious_tools.search_slug || false,
        custom_readmore: settings.furious_tools.custom_readmore || false,
        custom_readmore_text: settings.furious_tools.custom_readmore_text || '',
        bypass_http_validate_url: settings.furious_tools.bypass_http_validate_url || false,
        remove_att_width: settings.furious_tools.remove_att_width || false,
        style_outbound_links: settings.furious_tools.style_outbound_links || false,
        style_outbound_links_only_in_content: settings.furious_tools.style_outbound_links_only_in_content || false,
        snap_scrolling: settings.furious_tools.snap_scrolling || false,
        snap_scrolling_force_full_pages: settings.furious_tools.snap_scrolling_force_full_pages || false,
        smooth_scrolling: settings.furious_tools.smooth_scrolling || false,
        skip_homepage: settings.furious_tools.skip_homepage || false,
        skip_homepage_showonce: settings.furious_tools.skip_homepage_showonce || false,
        skip_homepage_target: settings.furious_tools.skip_homepage_target || '',
        hide_login_form: settings.furious_tools.hide_login_form || false,
        hide_admin_bar: settings.furious_tools.hide_admin_bar || false,
        random_tagline: settings.furious_tools.random_tagline || false,
        random_tagline_body_only: settings.furious_tools.random_tagline_body_only || true,
        random_tagline_list: settings.furious_tools.random_tagline_list || '',
        redirect_on_login: settings.furious_tools.redirect_on_login || false,
        redirect_on_login_target: settings.furious_tools.redirect_on_login_target || ''
      };
    });
  }, []);

  // mark dirty when current values differ from initial snapshot
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!initialSettingsRef.current) {
      return;
    }
    const current = {
      cleanup_wp_crud: cleanupWpCrud,
      add_custom_crud: addCustomCrud,
      custom_crud: customCrud,
      latest_jquery: latestJquery,
      remove_jquery_migrate: removeJqueryMigrate,
      track_user_last_login: trackUserLastLogin,
      search_slug: searchSlug,
      custom_readmore: customReadmore,
      custom_readmore_text: customReadmoreText,
      bypass_http_validate_url: bypassHttpValidateUrl,
      remove_att_width: removeAttWidth,
      style_outbound_links: styleOutboundLinks,
      style_outbound_links_only_in_content: styleOutboundLinksOnlyInContent,
      snap_scrolling: snapScrolling,
      snap_scrolling_force_full_pages: snapScrollingForceFullPages,
      smooth_scrolling: smoothScrolling,
      skip_homepage: skipHomepage,
      skip_homepage_showonce: skipHomepageShowonce,
      skip_homepage_target: skipHomepageTarget,
      hide_login_form: hideLoginForm,
      hide_admin_bar: hideAdminBar,
      random_tagline: randomTagline,
      random_tagline_body_only: randomTaglineBodyOnly,
      random_tagline_list: randomTaglineList,
      redirect_on_login: redirectOnLogin,
      redirect_on_login_target: redirectOnLoginTarget
    };

    // simple shallow comparison via JSON; adequate for primitive values here
    const dirty = JSON.stringify(current) !== JSON.stringify(initialSettingsRef.current);
    setIsDirty(dirty);
  }, [cleanupWpCrud, addCustomCrud, customCrud, latestJquery, removeJqueryMigrate, trackUserLastLogin, searchSlug, customReadmore, customReadmoreText, bypassHttpValidateUrl, removeAttWidth, styleOutboundLinks, styleOutboundLinksOnlyInContent, snapScrolling, snapScrollingForceFullPages, smoothScrolling, skipHomepage, skipHomepageShowonce, skipHomepageTarget, hideLoginForm, hideAdminBar, randomTagline, randomTaglineBodyOnly, randomTaglineList, redirectOnLogin, redirectOnLoginTarget]);
  const saveSettings = () => {
    // TODO: Add validation as needed for empty text fields when their parent setting is enabled

    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/settings',
      method: 'POST',
      data: {
        furious_tools: {
          cleanup_wp_crud: cleanupWpCrud,
          add_custom_crud: addCustomCrud,
          custom_crud: customCrud,
          latest_jquery: latestJquery,
          remove_jquery_migrate: removeJqueryMigrate,
          track_user_last_login: trackUserLastLogin,
          search_slug: searchSlug,
          custom_readmore: customReadmore,
          custom_readmore_text: customReadmoreText,
          bypass_http_validate_url: bypassHttpValidateUrl,
          remove_att_width: removeAttWidth,
          style_outbound_links: styleOutboundLinks,
          style_outbound_links_only_in_content: styleOutboundLinksOnlyInContent,
          snap_scrolling: snapScrolling,
          snap_scrolling_force_full_pages: snapScrollingForceFullPages,
          smooth_scrolling: smoothScrolling,
          skip_homepage: skipHomepage,
          skip_homepage_showonce: skipHomepageShowonce,
          skip_homepage_target: skipHomepageTarget,
          hide_login_form: hideLoginForm,
          hide_admin_bar: hideAdminBar,
          random_tagline: randomTagline,
          random_tagline_body_only: randomTaglineBodyOnly,
          random_tagline_list: randomTaglineList,
          redirect_on_login: redirectOnLogin,
          redirect_on_login_target: redirectOnLoginTarget
        }
      }
    }).then(() => {
      if (initialSettingsRef.current) {
        initialSettingsRef.current = JSON.parse(JSON.stringify({
          cleanup_wp_crud: cleanupWpCrud,
          add_custom_crud: addCustomCrud,
          custom_crud: customCrud,
          latest_jquery: latestJquery,
          remove_jquery_migrate: removeJqueryMigrate,
          track_user_last_login: trackUserLastLogin,
          search_slug: searchSlug,
          custom_readmore: customReadmore,
          custom_readmore_text: customReadmoreText,
          bypass_http_validate_url: bypassHttpValidateUrl,
          remove_att_width: removeAttWidth,
          style_outbound_links: styleOutboundLinks,
          style_outbound_links_only_in_content: styleOutboundLinksOnlyInContent,
          snap_scrolling: snapScrolling,
          snap_scrolling_force_full_pages: snapScrollingForceFullPages,
          smooth_scrolling: smoothScrolling,
          skip_homepage: skipHomepage,
          skip_homepage_showonce: skipHomepageShowonce,
          skip_homepage_target: skipHomepageTarget,
          hide_login_form: hideLoginForm,
          hide_admin_bar: hideAdminBar,
          random_tagline: randomTagline,
          random_tagline_body_only: randomTaglineBodyOnly,
          random_tagline_list: randomTaglineList,
          redirect_on_login: redirectOnLogin,
          redirect_on_login_target: redirectOnLoginTarget
        }));
      }
      setIsDirty(false);
      createSuccessNotice('Settings saved successfully.', {
        type: 'snackbar'
      });
    }).catch(() => {
      createErrorNotice('Error saving settings.', {
        type: 'snackbar'
      });
    });
  };
  return {
    cleanupWpCrud,
    setCleanupWpCrud,
    addCustomCrud,
    setAddCustomCrud,
    customCrud,
    setCustomCrud,
    latestJquery,
    setLatestJquery,
    removeJqueryMigrate,
    setRemoveJqueryMigrate,
    trackUserLastLogin,
    setTrackUserLastLogin,
    searchSlug,
    setSearchSlug,
    customReadmore,
    setCustomReadmore,
    customReadmoreText,
    setCustomReadmoreText,
    bypassHttpValidateUrl,
    setBypassHttpValidateUrl,
    removeAttWidth,
    setRemoveAttWidth,
    styleOutboundLinks,
    setStyleOutboundLinks,
    styleOutboundLinksOnlyInContent,
    setStyleOutboundLinksOnlyInContent,
    snapScrolling,
    setSnapScrolling,
    snapScrollingForceFullPages,
    setSnapScrollingForceFullPages,
    smoothScrolling,
    setSmoothScrolling,
    skipHomepage,
    setSkipHomepage,
    skipHomepageShowonce,
    setSkipHomepageShowonce,
    skipHomepageTarget,
    setSkipHomepageTarget,
    redirectOnLogin,
    setRedirectOnLogin,
    redirectOnLoginTarget,
    setRedirectOnLoginTarget,
    hideLoginForm,
    setHideLoginForm,
    hideAdminBar,
    setHideAdminBar,
    randomTagline,
    setRandomTagline,
    randomTaglineBodyOnly,
    setRandomTaglineBodyOnly,
    randomTaglineList,
    setRandomTaglineList,
    saveSettings,
    isDirty
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSettings);

/***/ },

/***/ "./src/index.scss"
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/dom-ready"
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["domReady"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/notices"
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["notices"];

/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  const rootElement = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(document.getElementById('furious-tools-settings-root'));
  rootElement.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components__WEBPACK_IMPORTED_MODULE_2__.SettingsPage, {}));
});
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map