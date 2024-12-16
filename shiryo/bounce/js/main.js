function main() { // メインの処理を行う関数
    const dotty = document.getElementById('dotty') // ドッティの画像を参照

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
            x += dx // xをdxだけ変化させる
            y += dy // yをdyだけ変化させる
            z += dz // zをdzだけ変化させる
            if (x < 0 || x > maxX) { // xがスクリーンの外に出たら
                dx *= -1 // dxを反転する
            }
            if (y < 0 || y > maxY) { // yがスクリーンの外に出たら
                dy *= -1 // dyを反転する
            }
            dotty.style.left = x // ドッティのX座標を設定
            dotty.style.top = y // ドッティのY座標を設定
            dotty.style.transform = `rotate(${z}deg)` // ドッティの回転を設定
            requestAnimationFrame(move) // 次のフレームでmove関数を呼び出す
        }
    }

    document.body.onmousedown = () => { // 画面がクリックされた時の処理
        if (isPlaying == null) { // プレイ前であれば
            isPlaying = true // プレイ中にする
            dotty.style.display = 'block' // ドッティの画像を表示する
            move()
        } else if (isPlaying) { // プレイ中であれば
            isPlaying = false // プレイ後にする
            alert('ミスしたのでゲーム終了です！') // メッセージを表示する
        }
    }

    dotty.onmousedown = (e) => { // ドッティがクリックされた時の処理
        if (isPlaying) { // プレイ中であれば
            const acceleration = 1.05 // 加速させる割合
            dx = dx * acceleration // X座標の変化量を増やす
            dy = dy * acceleration // Y座標の変化量を増やす
            level += 1
            drawGamepoint() // gamepointを描画する
            SetBgcolorTimer('#d1ffa3') // 背景色を薄い緑にしてから白に戻す
        }
        e.stopPropagation() // 親要素にイベントを伝搬しない
    }
}

window.onload = main // windowがロードされた時にmain関数を実行する