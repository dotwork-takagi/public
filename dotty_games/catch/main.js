window.onload = function () {

    let isPlaying = false

    let count = null
    let speed = null

    const body = document.body

    const dotty = $('#dotty')
    const fruit = $('#fruit')

    const maxX = body.clientWidth - fruit.width
    const maxY = body.clientHeight

    init()

    function init() {
        count = 0
        speed = 4
        fruit.style.left = maxX / 2
        fruit.style.top = -200
        fruit.style.display = 'block'
        drawGamepoint()
    }

    function drawGamepoint() {
        document.querySelector('#count').innerHTML = `スコア: ${count}回`

        const key = 'catch_best'
        let best = localStorage.getItem(key) ?? count
        if (best <= count) {
            best = count
            localStorage.setItem(key, best)
        }
        document.querySelector('#best').innerHTML = `ベスト: ${best}回`
    }

    setInterval(() => { // リンゴを描画する
        if (isPlaying == true) {
            fruit.style.top = parseInt(fruit.style.top, 10) + speed

            if (
                detectCollision(dotty, fruit)
            ) {
                count++
                speed += 0.2
                fruit.style.left = getRandomInt(0, maxX)
                fruit.style.top = -200
    
                drawGamepoint()
            }

            if(parseInt(fruit.style.top) > maxY) {
                isPlaying = false
                alert(`ゲーム終了です。記録は${count}回でした。`)
            }

            if (count < 10) {
                fruit.src = 'img/fruit/0.png'
            } else if (count < 20) {
                fruit.src = 'img/fruit/1.png'
            } else if (count < 30) {
                fruit.src = 'img/fruit/2.png'
            } else if (count < 40) {
                fruit.src = 'img/fruit/3.png'
            } else if (count < 50) {
                fruit.src = 'img/fruit/4.png'
            } else {
                fruit.src = 'img/fruit/5.png'
            }
        }
    }, 10)

    body.onmousedown = () => { // ゲームを開始する
        if (isPlaying == false) {
            init()
            isPlaying = true
        }
    }

    body.onmousemove = (e) => { // ドッティーを描画する
        dotty.style.left = e.clientX - dotty.width / 2
        dotty.style.top = maxY - dotty.height - dotty.height / 4
        dotty.style.display = 'block'
    }
}

// 共通

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