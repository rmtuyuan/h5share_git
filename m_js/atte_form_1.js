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

// 表单验证 上传图片
function showInfo(text) {
    $("body").addClass("overflow-hidden");
    $(".info-text").html(text);
    $(".modal-info").fadeIn(300);

    setTimeout(function () {
        $("body").removeClass("overflow-hidden");
        $(".modal-info").fadeOut(300);
    }, 1000);
}
$(".info-sure").click(function (e) {
    e.preventDefault();
    $("body").removeClass("overflow-hidden");
    $(".modal-info").hide();
});

function openHref(url) {
    $(".info-sure-2").click(function (e) {
        e.preventDefault();
        window.location.href = url;
    });
}
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
// var server = 'http://192.168.1.170:8080/qmzb';


//身份真个好
var aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
};

function isCardID(sId) {
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()) return "身份证上的出生日期非法";
    for (var i = 17; i >= 0; i--) {
        iSum += Math.pow(2, i) % 11 * parseInt(sId.charAt(17 - i), 11);
    }if (iSum % 11 != 1) return "你输入的身份证号非法";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
}

$(function () {
    //获取浏览器的userAgent,并转化为小写
    var ua = navigator.userAgent.toLowerCase();
    //判断是否是苹果手机，是则是true
    var isIos = ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1;
    if (isIos) {
        $("input:file").removeAttr("capture");
    };
});
$(".slide-upload-box").click(function (e) {
    e.preventDefault();
    if ($(this).hasClass("slide-upload-box-1")) {
        $(".form-nav").hide();
        $(".upload-img-nav").show();
        $(".atte-main-box").css("left", "-100vw");
    } else {
        $(".form-nav").show();
        $(".upload-img-nav").hide();
        $(".atte-main-box").css("left", "0");
    }
});
$(function () {
    $(".nav").css("visibility", "visible");
});
//加密 解密
function base64(strIn) {
    if (!strIn.length || strIn.length % 4) return null;
    var str64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var index64 = [];
    for (var i = 0; i < str64.length; i++) {
        index64[str64.charAt(i)] = i;
    }var c0, c1, c2, c3, b0, b1, b2;
    var len = strIn.length;
    var len1 = len;
    if (strIn.charAt(len - 1) == '=') len1 -= 4;
    var result = [];
    for (var i = 0, j = 0; i < len1; i += 4) {
        c0 = index64[strIn.charAt(i)];
        c1 = index64[strIn.charAt(i + 1)];
        c2 = index64[strIn.charAt(i + 2)];
        c3 = index64[strIn.charAt(i + 3)];
        b0 = c0 << 2 | c1 >> 4;
        b1 = c1 << 4 | c2 >> 2;
        b2 = c2 << 6 | c3;
        result.push(b0 & 0xff);
        result.push(b1 & 0xff);
        result.push(b2 & 0xff);
    }
    if (len1 != len) {
        c0 = index64[strIn.charAt(i)];
        c1 = index64[strIn.charAt(i + 1)];
        c2 = strIn.charAt(i + 2);
        b0 = c0 << 2 | c1 >> 4;
        result.push(b0 & 0xff);
        if (c2 != '=') {
            c2 = index64[c2];
            b1 = c1 << 4 | c2 >> 2;
            result.push(b1 & 0xff);
        }
    }
    return result;
}

var atteRolu = {
    upload_img_ok: false,
    upload_img_src: null,
    login_uid: null, //uid 
    login_token: null, //token
    pic_id_front: null, //身份证正面
    pic_id_back: null, //身份证反面
    init: function init() {
        //初始化
        this.login_uid = $.getUrlParam("login_uid");
        this.login_token = $.getUrlParam("login_token");
        this.conmitInput();
        this.phoneReg();
        this.getSmsCode();
        this.uploadImg();
        this.allSubmitClick();
    },
    conmitInput: function conmitInput() {

        $(".atte-form-box input").keyup(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });

        $(".atte-form-box input").blur(function () {

            if ($(this).val().length > 0) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
                $(this).css("color", "#333");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
            }
        });
        //图片是否上传 图片提交按钮

        $(".upload-submit-btn").click(function (e) {
            e.preventDefault();
            //判断两张图片是否都上传
            if (atteRolu.pic_id_front) {
                //正面上传
                if (atteRolu.pic_id_back) {
                    //都上传了
                    $(".form-nav").show();
                    $(".upload-img-nav").hide();
                    $(".atte-main-box").css("left", "0");
                } else {
                    showInfo("身份证国徽面没上传");
                }
            } else {
                showInfo("身份证正面没上传");
            }
        });

        $("#age_number_input").blur(function () {
            var regu = /^[1-9]\d*$/;
            var age_val = $(this).val();

            if (regu.test(age_val) && age_val < 120) {
                if (age_val > 10) {
                    $(this).addClass("actived");
                    $(this).removeClass("erroed");
                    $(this).css("color", "#333");
                } else {
                    showInfo("年龄得大于10岁");
                    $(this).val("");
                    $(this).css("color", "#fe426f");
                }
            } else {
                //格式错误

                if (age_val.length) {
                    showInfo("年龄格式错误");
                }

                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).css("color", "#fe426f");
                $(this).val("");
            }
        });
        $(".demo--radio").change(function () {
            if ($(this).is(":checked")) {
                $(this).addClass("actived").addClass("af-input");
                $(this).removeClass("erroed").parent().siblings("label").find(".demo--radio").addClass("erroed").removeClass("actived").removeClass("af-input");
            }
        });
    },
    phoneReg: function phoneReg() {
        //手机号验证
        var phone_reg = /^1[34578]\d{9}$/;
        $("#login_phone").blur(function () {
            var phone_val = $(this).val();
            if (!phone_reg.test(phone_val)) {
                //格式错误

                $(this).removeClass("actived");
                $(this).addClass("erroed");
                $(this).val("");
            } else {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
            }
        });
        $("#login_phone").keyup(function () {
            var phone_val = $(this).val();
            if (phone_val.length >= 11) {
                if (!phone_reg.test(phone_val)) {
                    $(this).removeClass("actived");
                    $(this).addClass("erroed");
                } else {
                    $(this).addClass("actived");
                    $(this).removeClass("erroed");
                }
            }
        });

        $(".af-id-number").blur(function () {
            var id_val = $(this).val();
            if (isCardID(id_val) == true) {
                $(this).addClass("actived");
                $(this).removeClass("erroed");
            } else {
                $(this).removeClass("actived");
                $(this).addClass("erroed");
            }
        });
    },

    uploadImg: function uploadImg() {

        //图片上传
        var filechooser = $(".img-box-btn>input");
        //    用于压缩图片的canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        //    瓦片canvas
        var tCanvas = document.createElement("canvas");
        var tctx = tCanvas.getContext("2d");
        var maxsize = 100 * 1024;
        $("#upload").on("click", function () {
            filechooser.click();
        }).on("touchstart", function () {
            $(this).addClass("touch");
        }).on("touchend", function () {
            $(this).removeClass("touch");
        });
        var ipt = null;
        filechooser.change(function () {
            ipt = $(this);
            if (!this.files.length) return;
            var files = Array.prototype.slice.call(this.files);
            if (files.length > 9) {
                alert("最多同时只可上传9张图片");
                return;
            }
            files.forEach(function (file, i) {
                if (!/\/(?:jpeg|png|jpg|gif)/i.test(file.type)) return;
                var reader = new FileReader();
                var li = document.createElement("li");
                //          获取图片大小
                var size = file.size / 1024 > 1024 ? ~~(10 * file.size / 1024 / 1024) / 10 + "MB" : ~~(file.size / 1024) + "KB";
                li.innerHTML = '<div class="progress"><span></span></div><div class="size">' + size + '</div>';
                // $(".img-list").append($(li));
                reader.onload = function () {
                    var result = this.result;
                    var img = new Image();
                    img.src = result;
                    $(li).css("background-image", "url(" + result + ")");
                    //如果图片大小小于100kb，则直接上传
                    if (result.length <= maxsize) {
                        img = null;
                        upload(result, file.type, $(li));
                        return;
                    }
                    //      图片加载完毕之后进行压缩，然后上传
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                    function callback() {
                        var data = compress(img);
                        upload(data, file.type, $(li));
                        img = null;
                    }
                };
                reader.readAsDataURL(file);
            });
        });
        //    使用canvas对大图片进行压缩
        var file_img = null;

        function compress(img) {
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            var ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            var count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //            计算每块瓦片的宽和高
                var nw = ~~(width / count);
                var nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            var ndata = canvas.toDataURL('image/jpeg', 0.1);
            // console.log('压缩前：' + initSize);
            // console.log('压缩后：' + ndata.length);
            // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

            return ndata;
        }
        //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
        function upload(basestr, type, $li) {
            var text = window.atob(basestr.split(",")[1]);
            var buffer = new Uint8Array(text.length);
            var pecent = 0,
                loop = null;
            for (var i = 0; i < text.length; i++) {
                buffer[i] = text.charCodeAt(i);
            }
            var blob = getBlob([buffer], type);

            var form_2 = new FormData();

            // ipt.parent().siblings(".img-box").find("div").css("background", "url(" + imgUrl + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", imgUrl)
            form_2.append("login_uid", atteRolu.login_uid);
            form_2.append("login_token", atteRolu.login_token);
            form_2.append("file", blob, "file_" + Date.parse(new Date()) + ".jpg");
            fetch(server + "/file/upload", {
                method: 'POST',
                //headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: form_2
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                //console.log(data);
                // atteRolu[ipt.attr("name")]=222;
                //  console.log(atteRolu.pic_id_front);
                if (data.code == 200) {
                    //添加图片 
                    ipt.parent().siblings(".img-box").find("div").css("background", "url(" + data.data.url + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", data.data.url);
                    ipt.addClass("actived").removeClass("erroed");
                    atteRolu[ipt.attr("name")] = data.data.url;
                } else {
                    ipt.addClass("erroed").removeClass("actived");
                    showInfo('当前网络不稳定,上传失败,请重新上传');
                }
            });

            //   formdata.append("login_uid", atteRolu.login_uid);
            //         formdata.append("login_token", atteRolu.login_token);
            //         formdata.append("file", blob);

            // xhr.open('post', server + "/file/upload");
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         var jsonData = JSON.parse(xhr.responseText);
            //         var imagedata = jsonData[0] || {};
            //         var text = imagedata.path ? '上传成功' : '上传失败';
            //         console.log(text + '：' + imagedata.path);
            //         clearInterval(loop);
            //         //当收到该消息时上传完毕

            //         if (!imagedata.path) return;
            //         $(".pic-list").append('<a href="' + imagedata.path + '">' + imagedata.name + '（' + imagedata.size + '）<img src="' + imagedata.path + '" /></a>');
            //     }
            // };
            // //数据发送进度，前50%展示该进度
            // xhr.upload.addEventListener('progress', function (e) {
            //     if (loop) return;
            //     pecent = ~~(100 * e.loaded / e.total) / 2;
            //     $li.find(".progress span").css('width', pecent + "%");
            //     if (pecent == 50) {
            //         mockProgress();
            //     }
            // }, false);
            // //数据后50%用模拟进度
            // function mockProgress() {
            //     if (loop) return;
            //     loop = setInterval(function () {
            //         pecent++;
            //         $li.find(".progress span").css('width', pecent + "%");
            //         if (pecent == 99) {
            //             clearInterval(loop);
            //         }
            //     }, 100)
            // }
            // xhr.send(formdata);
        }
        /**
         * 获取blob对象的兼容性写法
         * @param buffer
         * @param format
         * @returns {*}
         */
        function getBlob(buffer, format) {
            try {

                return new Blob(buffer, {
                    type: format
                });
            } catch (e) {
                var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)();
                buffer.forEach(function (buf) {
                    bb.append(buf);
                });

                return bb.getBlob(format);
            }
        }
        /**
         * 获取formdata
         */
        function getFormData() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome') && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
            return isNeedShim ? new FormDataShim() : new FormData();
        }
        /**
         * formdata 补丁, 给不支持formdata上传blob的android机打补丁
         * @constructor
         */
        function FormDataShim() {

            var o = this,
                parts = [],
                boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send;
            this.append = function (name, value, filename) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
                if (value instanceof Blob) {
                    parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                    parts.push(value);
                } else {
                    parts.push('\r\n\r\n' + value);
                }
                parts.push('\r\n');
            };
            // Override XHR send()
            XMLHttpRequest.prototype.send = function (val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');
                    // Create the blob
                    data = getBlob(parts);
                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function () {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function (err) {
                        throw err;
                    };
                    fr.readAsArrayBuffer(data);
                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                } else {
                    oldSend.call(this, val);
                }
            };
        }
        //图片上传结束

    },
    getSmsCode: function getSmsCode() {
        //获取验证码
        $(".atte-form-con-col").on("click", "a#get_sms_code.actived", function (e) {
            e.preventDefault();
            var a_get_sms = $(this);
            if ($("#login_phone").hasClass("actived")) {
                //手机号正确
                var form_2 = new FormData();
                form_2.append("mobile", $("#login_phone").val());
                fetch(server + "/sms/send", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {

                    if (data.code == 200) {
                        //成功后 
                        var time_num = 60;
                        a_get_sms.removeClass("actived");
                        a_get_sms.find('span').removeClass("text-color-fe").html(time_num + "s");
                        var timer = setInterval(function () {
                            a_get_sms.html(--time_num + "s");
                            if (time_num <= 0) {
                                clearInterval(timer);
                                timer = null;
                                a_get_sms.addClass("actived").html("<span class='text-color-fe'>获取验证码</span>");
                            }
                        }, 1000);
                    } else {

                        showInfo('当前网络不稳定,请重新获取');
                    }
                });
            } else {
                //手机号不正确
                showInfo("手机号格式错误");
            }
        });
    },
    imgSubmitClick: function imgSubmitClick() {
        // 上传图片提交
    },
    allSubmitClick: function allSubmitClick() {
        //点击提交  判断是否都填写完成 
        $("#all_submit_btn").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($("input.af-input").length == $("input.af-input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".atte-form-box input.af-input.actived").length; j++) {
                    var element = $($(".atte-form-box input.af-input.actived")[j]);
                    form_2.append(element.attr("name"), element.val()); // 
                }
                form_2.append("pic_id_front", atteRolu.pic_id_front); // 
                form_2.append("pic_id_back", atteRolu.pic_id_back); //
                form_2.append("login_uid", atteRolu.login_uid); // 
                form_2.append("login_token", atteRolu.login_token); //
                fetch(server + "/user/authentication", {
                    method: 'POST',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default',
                    body: form_2
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页

                        window.location.href = 'attestation_after.html?login_uid=' + atteRolu.login_uid + "&login_token=" + atteRolu.login_token;
                    } else if (data.code == 400) {
                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新提交');
                    }
                });
            } else {
                //有没填 的 
                if ($($("input.af-input.erroed")[0]).hasClass("login-phone-ipt")) {
                    if ($($("input.af-input.atte-upimg-ipt.erroed")).length > 0) {
                        showInfo($($("input.af-input.atte-upimg-ipt.erroed")[0]).parent().siblings(".img-box-txt").html() + "没上传");
                    } else {
                        showInfo($($("input.af-input.erroed")[0]).siblings("p").html() + "没填写");
                    }
                } else if ($($("input.af-input.erroed")[0]).hasClass("not-upload-info")) {
                    //图片没上传


                } else if ($($("input.af-input.erroed")[0]).hasClass("demo--radio")) {
                    showInfo("性别没选择");
                } else if ($($("input.af-input.erroed")[0]).hasClass("af-id-number")) {
                    //身份证号有问题
                    console.log(isCardID($($("input.af-input.erroed")[0]).val()));
                    if (isCardID($($("input.af-input.erroed")[0]).val()) != true) {
                        showInfo(isCardID($($("input.af-input.erroed")[0]).val()));
                    }
                } else {
                    //其他没填写
                    showInfo($($("input.af-input.erroed")[0]).siblings("p").html() + "没填写");
                }
            }
        });
    }
};
$(function () {
    atteRolu.init();
});

/***/ })
/******/ ]);