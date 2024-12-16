function main() { // メインの処理を行う関数
    const dotty = document.getElementById('dotty') // ドッティの画像を定数に参照

    let isPlaying = null // プレイ中かどうか
    let level = 0 // 現在のレベル

    let maxX = document.body.clientWidth - dotty.width // 画面の最大横幅
    let maxY = document.body.clientHeight - dotty.height // 画面の最大縦幅

    let x = 0 // 現在のドッティのX座標
    let y = 0 // 現在のドッティのY座標
    let z = 0 // 現在のドッティの回転
    let dx = 5 // 1フレームで変化するドッティのX座標
    let dy = 5 // 1フレームで変化するドッティのY座標
    let dz = 2.5 // 1フレームで変化するドッティの回転

    function SetBgcolorTimer(color) { // 背景色を一時的に変える関数
        document.body.style.backgroundColor = color // 背景色をcolorにする
        window.setTimeout(function () { // 2.5秒後に
            document.body.style.backgroundColor = 'white' // 背景色を白に戻す
        }, 250)
    }

    function drawGamepoint() { // gamepointを描画する関数
        document.getElementById('level').innerHTML = `レベル: ${level}回` // レベルを描画する
    }

    drawGamepoint() // gamepointを描画する

    function move() { // ドッティーを動かす処理
        if (isPlaying) { // プレイ中であれば
            x += dx
            y += dy
            z += dz
            if (x < 0 || x > maxX) {
                dx *= -1
            }
            if (y < 0 || y > maxY) {
                dy *= -1
            }
            dotty.style.left = x // ドッティのX座標を設定
            dotty.style.top = y // ドッティのY座標を設定
            dotty.style.transform = `rotate(${z}deg)` // ドッティの回転を設定
            requestAnimationFrame(move)
        }
    }

    function success() { // クリック成功した時
        const acceleration = 1.05 // 加速させる割合
        dx = dx * acceleration 
        dy = dy * acceleration
        level += 1
        drawGamepoint() // gamepointを描画する
        SetBgcolorTimer('#d1ffa3') // 背景色を薄い緑にしてから白に戻す
    }

    document.body.onmousedown = () => {
        if (isPlaying == null) {
            isPlaying = true
            dotty.style.display = 'block'
            move()
        } else if (isPlaying) {
            isPlaying = false
            alert('ミスしたのでゲーム終了です！')
            // SetBgcolor('#ffa3a3') // 背景色を薄い赤にする
        }
    }

    dotty.onmousedown = (e) => {
        if (isPlaying) { // プレイ中であれば
            success() // クリック成功時の処理
        }
        e.stopPropagation() // 親要素にイベントを伝搬しない
    }
}

window.onload = main // windowがロードされた時にmain関数を実行する