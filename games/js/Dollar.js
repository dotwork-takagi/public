function $(a) {
    if (a[0] == '<') {
        return document.createElement(a.replace('<', '').replace('>', ''))
    } else {
        return document.querySelector(a)
    }
}

function $$(a) {
    return document.querySelectorAll(a)
}

function $_GET(a, b) {
    if (!b) {
        return new URL(location).searchParams.get(a)
    } else {
        return new URL(location.href.replace('#','?')).searchParams.get(a)
    }
}