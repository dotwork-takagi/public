window.onload = function () {

    let currentLevel = 0
    let isPlaying = null

    const body = document.body
    const img = document.querySelector('img')

    let maxX = body.clientWidth - img.width
    let maxY = body.clientHeight - img.height

    let x = 0
    let y = 0
    let z = 0
    let dx = 5
    let dy = 5
    let dz = 2.5

    drawGamepoint()

    body.onmousedown = () => {
        if (isPlaying == null) {
            isPlaying = true
            img.style.display = 'block'
            move()
        } else if (isPlaying) {
            isPlaying = false
            alert('ミスしたのでゲーム終了です！')
            // SetBgcolor('#ffa3a3') // 背景色を薄い赤にする
        }
    }

    img.onmousedown = (e) => {
        if (isPlaying) {
            success() // クリック成功
        }
        e.stopPropagation()
    }

    function move() { // ドッティーを動かす処理
        if (isPlaying) {
            x += dx
            y += dy
            z += dz
            if (x < 0 || x > maxX) {
                dx *= -1
            }
            if (y < 0 || y > maxY) {
                dy *= -1
            }
            img.style.left = x
            img.style.top = y
            img.style.transform = `rotate(${z}deg)`
            requestAnimationFrame(move)
        }
    }

    function success() { // クリック成功した時
        const acceleration = 1.05 // 加速
        dx = dx * acceleration
        dy = dy * acceleration
        currentLevel += 1
        drawGamepoint()
        SetBgcolorTimer('#d1ffa3') // 背景色を薄い緑にする
    }

    function drawGamepoint() { // gamepointを描画する
        document.querySelector('#current-level').innerHTML = `スコア: ${currentLevel}回`
    }
}

function SetBgcolorTimer(color) { // 背景色を変える
    document.body.style.backgroundColor = color
    window.setTimeout(function () {
        document.body.style.backgroundColor = 'white'
    }, 250)
}