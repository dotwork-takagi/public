// https://qiita.com/ryowta/items/5657438a4b2659dd11da
function AudioPlayer() {
    const obj = {}
    obj.ctxList = {}
    obj.load = function (id, url) {
        const ctxList = this.ctxList
        ctxList[id] = ctxList[id] ?? {}
        ctxList[id].audioCtx = new AudioContext()

        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => ctxList[id].audioCtx.decodeAudioData(arrayBuffer))
            .then(buffer => {
                ctxList[id].buffer = buffer
            })
    }
    obj.play = function (id) {
        const ctxList = this.ctxList
        ctxList[id] = ctxList[id] ?? {}
        if (ctxList[id].buffer != null) {
            const source = ctxList[id].audioCtx.createBufferSource()
            source.buffer = ctxList[id].buffer
            source.connect(ctxList[id].audioCtx.destination)
            source.start()
        }
    }
    return obj
}