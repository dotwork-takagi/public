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

function detectCollision(obj1, obj2) {
    let obj1X = parseInt(obj1.style.left, 10) || 0
    let obj1Y = parseInt(obj1.style.top, 10) || 0
    let obj2X = parseInt(obj2.style.left, 10) || 0
    let obj2Y = parseInt(obj2.style.top, 10) || 0

    if (
        obj1X + obj1.clientWidth > obj2X &&
        obj1X < obj2X + obj2.clientWidth &&
        obj1Y + obj1.clientHeight > obj2Y &&
        obj1Y < obj2Y + obj2.clientHeight
    ) {
        return true
    }
    return false
}