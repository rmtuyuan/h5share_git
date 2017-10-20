/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function ($) {
    //获取url参数的封装函数
    //decodeURI() 和 decodeURIComponent()
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    };
    $.mygetUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.hash.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    };
})(jQuery);

var server = 'http://139.199.23.160:8080/qmzb';

$(function () {

    var login_uid = $.getUrlParam("login_uid");
    var login_token = $.getUrlParam("login_token");

    var form_2 = new FormData();
    form_2.append("login_uid", login_uid);
    form_2.append("login_token", login_token);
    fetch(server + "/user/authentication_status", {
        method: 'POST',
        //headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: form_2
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.code == 200) {

            if (data.data.status == 0) {
                //0=未处理/1=已通过/-1=未通过/-2=未提交
                //审核中
                $(".atte-after-ing-info").css("display", "flex");
                //审核中的 图片 
            } else if (data.data.status == 1) {
                $(".atte-after-succ-info").css("display", "flex");
            } else if (data.data.status == -1) {
                $(".atte-after-erro-info-txt").html(data.data.refuse_reason);
                $(".atte-after-erro-info").css("display", "flex");
            } else {
                window.location.href = 'attestation_before.html?login_uid=' + login_uid + "&login_token=" + login_token;
            }
        } else {
            // window.location.href = "attestation_form.html";
            showInfo('当前网络不稳定,请刷新页面');
        }
    });

    $(".now-go-check").click(function (e) {
        e.preventDefault();
        window.location.href = 'attestation_form.html?login_uid=' + login_uid + "&login_token=" + login_token;
    });
});

function nowPlay() {}

function nowNotPlay() {}

/***/ })
/******/ ]);