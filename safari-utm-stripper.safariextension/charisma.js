
(function() {
var url = window.location.href;

var queryStringIndex = url.indexOf('?');

if (url.indexOf('utm_') > queryStringIndex) {
    var stripped = url.replace(
        /([\?\&]utm_(source|medium|term|campaign|content)=[^&#]+)/ig,
        '');
    if (stripped.charAt(queryStringIndex) === '&') {
        stripped = stripped.substr(0, queryStringIndex) + '?' +
            stripped.substr(queryStringIndex + 1)
    }
    if (stripped != url) {
        history.replaceState(null, window.title, stripped);
    }
}

})();
