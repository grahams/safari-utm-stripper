function getStrippedUrl(url) {
    var queryStringIndex = url.indexOf('?');

    // Google Analytics (Urchin Tracking Monitor/UTM)
    if (url.indexOf('utm_') > queryStringIndex) {
        url = url.replace(
            /([\?\&]utm_(reader|source|medium|term|campaign|content)=[^&#]+)/ig,
            '');
    }

    // Strip MailChimp parameters
    if((url.indexOf('mc_eid') > queryStringIndex) ||
       (url.indexOf('mc_cid') > queryStringIndex) ) {
        url = url.replace(/([\?\&](mc_cid|mc_eid)=[^&#]+)/ig, '');
    }

    // Strip YouTube parameters
    if((url.indexOf('http://www.youtube.com/watch') === 0) ||
       (url.indexOf('https://www.youtube.com/watch') === 0) ) {
        url = url.replace(/([\?\&](feature|app|ac|src_vid|annotation_id)=[^&#]*)/ig, '');
    }

    // Strip Yandex openstat parameters
    if (url.indexOf('_openstat') > url.indexOf('?')) {
        url = url.replace(/([\?\&]_openstat=[^&#]+)/ig, '');
    }

    // Strip HubSpot parameters
    if((url.indexOf('_hsenc') > url.indexOf('?')) || 
       (url.indexOf('_hsmi') > url.indexOf('?')) ) {
        url = url.replace(/([\?\&](_hsenc|_hsmi)=[^&#]+)/ig, '');
    }

    if (url.charAt(queryStringIndex) === '&') {
        url = url.substr(0, queryStringIndex) + '?' +
            url.substr(queryStringIndex + 1);
    }

    return url;
}

(function(window) {
    safari.application.addEventListener("beforeNavigate", function (e) {
        var originalURL = e.url;

        if(!originalURL) {
            return;
        }

        var url = getStrippedUrl(originalURL);

        if(url !== originalURL) {
            e.preventDefault();
            e.target.url = url;
        }
        else {
            return;
        }
    }, false);
})(this);
