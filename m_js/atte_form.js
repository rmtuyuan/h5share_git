var atteRolu = {
    upload_img_ok: false,
    upload_img_src: null,
    login_uid: null, //uid 
    login_token: null, //token
    pic_id_front: null, //身份证正面
    pic_id_back: null, //身份证反面
    init: function () {
        //初始化
        this.login_uid = $.getUrlParam("login_uid");
        this.login_token = $.getUrlParam("login_token");
        this.conmitInput();
        this.phoneReg();
        this.getSmsCode();
        this.uploadImg();
        this.allSubmitClick();
    },
    conmitInput: function () {
        
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
           
            if (regu.test(age_val)) {
              
                 $(this).addClass("actived");
                $(this).removeClass("erroed");
                 $(this).css("color", "#333");
             

            } else {
                  //格式错误
                  showInfo("年龄格式错误");
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                 $(this).css("color", "#fe426f");
            }
        });
         $("#grend_input").blur(function () {
             
            var grend_val = $(this).val();
           
            if (grend_val=="男" || grend_val=="女") {
              
                 $(this).addClass("actived");
                $(this).removeClass("erroed");
                 $(this).css("color", "#333");

            } else {
                  //格式错误
                  showInfo("性别输入错误错误");
                $(this).removeClass("actived");
                $(this).addClass("erroed");
                 $(this).css("color", "#fe426f");
            }
        });


    },
    phoneReg: function () {
        //手机号验证
        var phone_reg = /^1[34578]\d{9}$/;
        $("#login_phone").blur(function () {
            var phone_val = $(this).val();
            if (!phone_reg.test(phone_val)) {
                //格式错误
                showInfo("手机号格式错误");
                $(this).removeClass("actived");
                $(this).addClass("erroed");

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

        
      

    },

    uploadImg: function () {
        //上传图片 显示图片
        $(".img-box-btn>input").change(function (e) {
            var imgPath = $(this).val();
            var ipt = $(this);
            if (imgPath == "") {
                showInfo('请选择上传图片!');
                //alert("请选择上传图片！");
                return;
            }
            //判断上传文件的后缀名
            var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' &&strExtension != 'jpeg' && strExtension != 'gif' &&
                strExtension != 'png' && strExtension != 'bmp' && strExtension != 'JPEG' &&strExtension != 'JPG' && strExtension != 'PNG') {
                showInfo('请选择图片文件!');
                // alert("请选择图片文件");
                return;
            } else {
                for (var n = 0; n < this.files.length; n++) {
                    var fileObj = this.files[n];
                    var imgUrl = window.URL.createObjectURL(this.files[n]);
                    var form_2 = new FormData();
                    // ipt.parent().siblings(".img-box").find("div").css("background", "url(" + imgUrl + ") no-repeat").css("background-size", "100% 100%").find("img").attr("src", imgUrl)
                    form_2.append("login_uid", atteRolu.login_uid);
                    form_2.append("login_token", atteRolu.login_token);
                    form_2.append("file", fileObj);
                  
                    fetch(server + "/file/upload", {
                        method: 'POST',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: form_2
                    }).then((response) => response.json()).then(function (data) {
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

                }
            }

        });
    },
    getSmsCode: function () {
        //获取验证码
        $(".atte-form-con-col").on("click", "a#get_sms_code.actived", function (e) {
            e.preventDefault();
            var a_get_sms = $(this)
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
                }).then((response) => response.json()).then(function (data) {

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
                                a_get_sms.addClass("actived").find('span').addClass("text-color-fe").html("获取验证码");
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
    imgSubmitClick: function () {
        // 上传图片提交
    },
    allSubmitClick: function () {
        //点击提交  判断是否都填写完成 
        $("#all_submit_btn").click(function (e) {
            e.preventDefault();
            // 判断是否都填写完成 

            if ($("input").length == $("input.actived").length) {
                //都填了 fetch   跳转
                var form_2 = new FormData();
                for (var j = 0; j < $(".atte-form-box input.actived").length; j++) {
                    var element = $($(".atte-form-box input.actived")[j]);
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
                }).then((response) => response.json()).then(function (data) {
                    if (data.code == 200) {
                        // 成功 跳转网页
                        alert("提交成功");
                        window.location.href = 'attestation_after.html?login_uid=' + atteRolu.login_uid + "&login_token=" + atteRolu.login_token;

                    } else if (data.code == 400) {
                        showInfo(data.message);
                    } else {
                        showInfo('当前网络不稳定,提交失败,请重新提交');
                    }

                });


            } else {
                //有没填 的 
                if ($($("input.erroed")[0]).hasClass("not-upload-info")) {
                    //图片没上传
                    showInfo($($("input.erroed")[0]).parent().siblings(".img-box-txt").html() + "没上传");

                } else {
                    //其他没填写
                    showInfo($($("input.erroed")[0]).siblings("p").html() + "没填写");
                }
            }

        });

    }
}
$(function () {
    atteRolu.init();
});