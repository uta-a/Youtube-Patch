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
    requireJS('//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js',startupNotify);  /* Toastr.js */
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

/* ======================================================================= */
/* 初期設定 */
function startupNotify() {
    toastr.options = {
        "progressBar": true,
        "newestOnTop": true,
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

/* Notify Function */
function notify(title, text, color = 'white', pos = 'bottom') {
    toastr.options = {
        "newestOnTop": false,
        "positionClass": `toast-${pos}-right`,
    }
    toastr.info(`<patch style="font-size: 20px; font-weight: bold; color: ${color}">${text}</patch>`,`<patch style="font-size: 20px; font-weight: bold">${title}</patch>`);
}

/* input, textarea, textboxでのEventListenerを無効化 */
let preventKeys = false;
Array.from(document.getElementsByTagName('input')).forEach(e => {
    e.onfocus = function() {
        preventKeys = true;
    };
    e.onblur = function() {
        preventKeys = false;
    };
});
Array.from(document.getElementsByTagName('textarea')).forEach(e => {
    e.onfocus = function() {
        preventKeys = true;
    };
    e.onblur = function() {
        preventKeys = false;
    };
});
document.querySelectorAll('div[role="textbox"]').forEach(e => {
    e.onfocus = function() {
        preventKeys = true;
    };
    e.onblur = function() {
        preventKeys = false;
    };
});


/* ======================================================================= */

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
function loopCtrl() {
    document.addEventListener('keydown',e => {
        if(e.key == 'Shift' && e.location == 2) {
            const video = document.getElementsByClassName('html5-main-video')[0];
            if(video.getAttribute('loop') == '') {
                video.removeAttribute('loop');
                notify('[video]', 'Loop Disabled');
            }else {
                video.setAttribute('loop','');
                notify('[video]', 'Loop Enabled');
            }
        }
    })
}

/* icon */
function changeIcon() {
    const icon_mod = 'https://revancedextended.com/wp-content/uploads/2023/08/revanced-extended-youtube-icon-150x150.webp'; 
    const icon_def  = 'https://www.youtube.com/s/desktop/1d05d8a6/img/favicon_144x144.png';

    let icon_current = document.querySelectorAll(`link[rel="icon"]`)[0];
    if(icon_current == icon_def) {
        iconSrc(icon_mod);
    }
    else {
        iconSrc(icon_def);
    }


    function iconSrc(url) {
        const iconUrl = url;
        const icon1 = document.querySelector(`link[rel="shortcut icon"]`);
        const icon2 = document.querySelectorAll(`link[rel="icon"]`);
        if(icon1){ 
            icon1.setAttribute(`href`,iconUrl);
        }
        for (i = 0; i < icon2.length; i++) {
            icon2[i].setAttribute(`href`,iconUrl);
        }
    }
}