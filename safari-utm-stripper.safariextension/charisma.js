function getStrippedUrl(url) {
    var queryStringIndex = url.indexOf('?');

    if (url.indexOf('utm_') > queryStringIndex) {
        url = url.replace(
            /([\?\&]utm_(reader|source|medium|term|campaign|content)=[^&#]+)/ig,
            '');
    }

    // Strip MailChimp parameters
    if((url.indexOf('mc_eid') > url.indexOf('?')) || 
       (url.indexOf('mc_cid') > url.indexOf('?')) ) {
        url = url.replace(/([\?\&](mc_cid|mc_eid)=[^&#]+)/ig, '');
    }

    // Strip YouTube parameters
    if((url.indexOf('http://www.youtube.com/watch') === 0) ||
       (url.indexOf('https://www.youtube.com/watch') === 0) ) {
        url = url.replace(/([\?\&](feature|app|ac)=[^&#]*)/ig, '');
    }

    if (url.charAt(queryStringIndex) === '&') {
        url = url.substr(0, queryStringIndex) + '?' +
            url.substr(queryStringIndex + 1);
    }

    return url;
}

(function() {

    var url = getStrippedUrl(window.location.href);

    if(url !== window.location.href) {
        history.replaceState(null, null, url);
    }
    else {
        return;
    }

})();
