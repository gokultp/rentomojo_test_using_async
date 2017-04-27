var htmlToJson			= require('html-to-json');


// define html parser for getting links


var linkParser          = htmlToJson.createParser(['a[href]', {
    'text': function ($a) {
                return $a.text();
            },
    'href': function ($a) {
                return $a.attr('href');
            }
 }]);

/**
 * extracts all links from html cotent
 * @param {String} strHtml the html string
 * @param {[Function]} cb callback function
 */
exports.parseHtml   = function (strHtml, cb) {

    linkParser.parse(strHtml).done(function (arrLinks) {
        cb(null, arrLinks)
    })
}
