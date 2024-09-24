function SetBgcolorTimer(color) { // 背景色を変える
    document.body.style.backgroundColor = color
    window.setTimeout(function () {
        document.body.style.backgroundColor = 'white'
    }, 250)
}

function SetBgcolor(color) { // 背景色を変える
    document.body.style.backgroundColor = color
}

function getRandomInt(min, max) { // ランダムな整数を取得する
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}