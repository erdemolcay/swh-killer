chrome.storage.sync.get('replace', function (options) {
    var swhs = document.querySelectorAll('sup.ab > a[data-query="swh"]');

    for (var i = 0, len = swhs.length; i < len; i++) {
        var swh = swhs[i].parentElement;
        swh.replaceWith(options.replace);
    }
});