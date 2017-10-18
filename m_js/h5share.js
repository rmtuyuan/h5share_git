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
    }
    $.mygetUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.hash.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
})(jQuery);

// 获取信息 ajax  fetch



function showInfo(text) {
    $("body").addClass("overflow-hidden");
    $(".info-text").html(text);
    $(".modal-info").fadeIn(300);
    setTimeout(function () {  

          $("body").removeClass("overflow-hidden");
    $(".modal-info").fadeOut(300);
    },2000);
   

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


$(window).load(function () {
    var server = 'http://139.199.23.160:8080/qmzb';
    var uid = $.getUrlParam("uid");
    if (uid) {
    //     var form = new FormData();
    //     form.append("uid", uid); // 

    //     fetch(server + "/user/my_info", {
    //         method: 'POST',
    // //         headers: { 'Accept': 'application/json',
    // // 'Content-Type': 'application/json'},
    //         mode: 'cors',
    //         cache: 'default',
    //         body: form
    //     }).then((response) => response.json()).then(function (data) {
    //         //console.log(data);
    //         if (data.code == 200) {
    //             console.log(data);
    //         }
    //     });
    } else {
       // alert('页面丢失')
    }



    var video = document.getElementById('video');
    var h = $(".video-container").css("height").slice(0, -2);
    var w = $(".video-container").css("width").slice(0, -2);
    // video.height = h;
    //  video.width = w;

    if (video.paused) {
        $('.video-tip-pause').show();

    } else {
        $('.video-tip-pause').hide();
        $(".video-container").css("height", '93vh')
    }

    video.addEventListener("timeupdate", function () {

        var now_time = this.currentTime;

        if (now_time && !this.paused) {
            $('.video-tip-pause').hide();
            $(".video-container").css("height", '93vh')
        } else {
            $('.video-tip-pause').show();
        }
    });
    //点击暂停 开始
    $(".video-tip-btn").click(function () {
        if (video.paused) {
            video.play();
            $(".video-container").css("height", '93vh')
            $('.video-tip-pause').hide();

        } else {

            video.pause();
            $('.video-tip-pause').show();
        }
    });
    video.addEventListener("loadedmetadata", function () {
        video.play();
    });

});
var ua = navigator.userAgent;
document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {

    if (ua.indexOf("iPhone") > 0) {
        setTimeout(function () {
            $("#video")[0].play();

        }, 3000);
    } else if (ua.indexOf("Android") > 0) {
        var vi = $("#video");

        vi[0].play();
        if (vi[0].currentTime) {
            vi[0].pause();
            //这里的定时器你可以不需要，也可以变成你需要的事件，而且也不一定在这个位置，主要是里面的play
            setTimeout(function () {
                vi[0].play();

            }, 3000)
        }
    }
});

//喜欢 点亮红心
// $(".video-tip-btm").on("click touch", ".video-tip-btm-2", function () {
//     if ($(this).hasClass("actived")) {
//         $(this).removeClass("actived");
//     } else {
//         $(this).addClass("actived");
//     }

// });

document.addEventListener("WeixinJSBridgeReady", function () {
    var video = document.getElementById('video');
    video.play();

}, false);

video.addEventListener('timeupdate', function () {
    //当视频的currentTime大于0.1时表示黑屏时间已过，已有视频画面，可以移除浮层（.pagestart的div元素）
    if (!video.isPlayed && this.currentTime > 0.1) {
        $('.pagestart').fadeOut(500);
        video.isPlayed = !0;
    }
});


//点击视频上 的其他东西 提示要下载 
$(".video-tip-").on("click touch", "a", function (e) {
    e.preventDefault();
});
$(".video-container").on("click touch", "div", function () {
    if ($(this).hasClass("video-tip")) {
        // alert("请下载app");
        showInfo("请下载APP");
     
        //window.location.href='下载app的链接 ';


    }
});