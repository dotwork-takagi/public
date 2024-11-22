window.onload = main // ロード完了時にmain関数を実行する

function main() { // メインの処理を書く関数
    let isPlaying // プレイ中かどうか
    let score // クリック成功した回数
    let speed // フルーツの落ちるスピード

    const dotty = document.getElementById('dotty') // ドッティの画像
    const fruit = document.getElementById('fruit') // フルーツの画像

    const maxX = document.body.clientWidth // 画面の横幅
    const maxY = document.body.clientHeight // 画面の縦幅

    init() // 状態を初期化する

    function init() { // 状態を初期化する関数
        score = 0 // score変数の初期化
        speed = 4 // speed変数の初期化
        fruit.style.left = maxX / 2 // フルーツのX座標を初期位置に設定
        fruit.style.top = fruit.height * -1 // フルーツのY座標を初期位置に設定
        fruit.style.display = 'block' // フルーツの画像を表示
        drawScore() // スコアを描画
    }

    function drawScore() { // スコアを描画
        document.getElementById('score').innerHTML = `スコア: ${score}回`
    }

    setInterval(loop, 10) // 10msごとにloop関数を実行

    function loop() { // ループの処理を書く関数
        if (isPlaying == true) { // プレイ中であれば
            fruit.style.top = parseInt(fruit.style.top) + speed // X座標をspeed分進める

            if (detectCollision(dotty, fruit)) { // dottyとfruitの衝突を判定する
                score++ // スコアを1増やす
                speed += 0.2 // スピードを0.2増やす 
                fruit.style.left = getRandomInt(0, maxX) // フルーツの次のX座標を設定 
                fruit.style.top = fruit.height * -1 // フルーツの次のY座標を設定

                drawScore() // スコアを描画
            }

            if (parseInt(fruit.style.top) > maxY) { // フルーツが下の画面外に移動したら
                isPlaying = false // プレイ中ではないように設定
                alert(`ゲーム終了です。記録は${score}回でした。`) // メッセージを表示
            }

            // スコアによってフルーツの種類を変える
            if (score < 10) {
                fruit.src = 'img/fruit/0.png'
            } else if (score < 20) {
                fruit.src = 'img/fruit/1.png'
            } else if (score < 30) {
                fruit.src = 'img/fruit/2.png'
            } else if (score < 40) {
                fruit.src = 'img/fruit/3.png'
            } else if (score < 50) {
                fruit.src = 'img/fruit/4.png'
            } else {
                fruit.src = 'img/fruit/5.png'
            }
        }
    }

    document.body.onmousedown = play // 画面がクリックされたとき、プレイを開始

    function play() { // プレイを開始する処理を書く関数
        if (isPlaying != true) { // プレイ中でなければ
            isPlaying = true // プレイ中にする
            init() // 状態を初期化
        }
    }

    document.body.onmousemove = moveDotty // マウスを動かしたとき、ドッティを動かす

    function moveDotty(e) {
        dotty.style.left = e.clientX - dotty.width / 2 // ドッティの画像のX座標をマウスに追従
        dotty.style.top = maxY - dotty.height - dotty.height / 4 // ドッティの画像のY座標をマウスに追従
        dotty.style.display = 'block' // ドッティの画像を表示する
    }
}

function getRandomInt(min, max) { // ランダムな整数を生成
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function detectCollision(obj1, obj2) { // オブジェクトの衝突を判定
    let obj1X = parseInt(obj1.style.left)
    let obj1Y = parseInt(obj1.style.top)
    let obj2X = parseInt(obj2.style.left)
    let obj2Y = parseInt(obj2.style.top)

    if (
        obj1X + obj1.clientWidth > obj2X && obj1X < obj2X + obj2.clientWidth &&
        obj1Y + obj1.clientHeight > obj2Y && obj1Y < obj2Y + obj2.clientHeight
    ) {
        return true
    }
    return false
}

