/* cps回避 */
if(!trustedTypes.defaultPolicy) {
    trustedTypes.createPolicy('default', {
        createHTML: string => string,
        createScriptURL: string => string,
        createScript: string => string,
    });
}

/* Import JS Library */
requireJS('https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js', notifySetup); /* 通知ライブラリ */
requireCSS('https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css'); /* 通知ライブラリスタイル */

function requireJS(path, func = null) { /* 関数を指定してライブラリが読み込まれたときに実行できる */
    let elm = document.createElement('script');
    elm.src = path;
    document.head.appendChild(elm);
    elm.onload = func;
}
function requireCSS(path) {
    let elm = document.createElement('link');
    elm.rel = 'stylesheet';
    elm.href = path;
    document.head.appendChild(elm);
}


/* 初期設定 */
let notify;
function notifySetup() {
    notify = new Notyf({
        duration: 2000,
        position: {
        x: 'right',
        y: 'botton',
        },
        types: [
            {
                type: 'info',
                background: '#4CAF50',
            },
            {
                type: 'enable',
                background: '#4CAF50',
            },
            {
                type: 'disable',
                background: '#B0BEC5',
            }
        ]
    })

    /* 起動通知 */
    notify.open({
        type: 'success',
        dismissble: false,
        positon: {
            x:'right',
            y:'botton'
        },
        message: '<patch style="font-size: 20px">YOUTUBE PATCHが正常に読みこまれました。'
    })
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

/* Loopコントロール */
function loopCtrl() {
    document.addEventListener('keydown',e => {
        if(e.key == 'Shift' && e.location == 2) {
            const video = document.getElementsByClassName('html5-main-video')[0];
            if(!video.loop) {
                video.setAttribute('loop','');
                notify.open({
                    type: 'enable',
                    dismissble: false,
                    positon: {
                        x:'right',
                        y:'botton'
                    },
                    message: '<patch style="font-size: 20px">Loopが有効になりました。'
                })
            }
            else {
                video.removeAttribute('loop');
                notify.open({
                    type: 'disable',
                    dismissble: false,
                    positon: {
                        x:'right',
                        y:'botton'
                    },
                    message: '<patch style="font-size: 20px">Loopが無効になりました。'
                })
            }
        }
    })
}