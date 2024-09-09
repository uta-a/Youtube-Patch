/* trusted回避 */
if(!trustedTypes.defaultPolicy) {
    trustedTypes.createPolicy('default', {
        createHTML: string => string,
        createScriptURL: string => string,
        createScript: string => string,
    });
}

/* Import JS Library */
requireJS('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',function() {

    /* jQuery Plugins */
    requireJS('//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js',startUpNotify);  /* Toastr.js */
    requireCSS('//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css'); /* Toastr.css */

});




function requireJS(path, func = null) { /* 関数を指定してライブラリが読み込まれたときに実行できる */
    let elm = document.createElement('script');
    elm.src = path;
    elm.onload = func;
    document.head.appendChild(elm);
}
function requireCSS(path) {
    let elm = document.createElement('link');
    elm.rel = 'stylesheet';
    elm.href = path;
    document.head.appendChild(elm);
}


/* 初期設定 */
function startUpNotify() {
    toastr.options = {
        "progressBar": true,
        "positionClass": "toast-top-right",
        "showDuration": "100",
        "hideDuration": "100",
        "timeOut": "3000",
        "showEasing": "swing",
        "hideEasing": "swing",
        "showMethod": "slideDown", 
        "hideMethod": "slideUp",
    }
    toastr.success('<patch style="font-size: 20px;">正常に読み込まれました</patch>','<patch style="font-size: 20px; font-weight: bold">Patch</patch>');
}


/* Skip Function */
function youtubeSkip() {
    setInterval(() => {
        const video = document.getElementsByClassName('html5-main-video')[0];

        /* Skip Buttonが存在する場合 */
        try {
            let skip_button = document.getElementsByClassName('ytp-skip-ad-button')[0];
            if(skip_button) {
                skip_button.click();
                console.log('広告のスキップボタンを押しました');
            }
        }
        catch {};

        /* ADmoduleが存在する場合 */
        try {
            let ad_module = document.getElementsByClassName('video-ads ytp-ad-module')[0];
            if(ad_module.hasChildNodes()) {
                video.currentTime = 99999;
                video.play();
                console.log('広告をスキップしました');
            }
        }
        catch {};

    }, 100);
}

/* Loop Function */
