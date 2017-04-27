var htmlToJson			= require('html-to-json');

var linkParser          = htmlToJson.createParser(['a[href]', {
    'text': function ($a) {
                return $a.text();
            },
    'href': function ($a) {
                return $a.attr('href');
            }
 }]);


exports.parseHtml   = function (strHtml, cb) {
    

    linkParser.parse(strHtml).done(function (arrLinks) {
        cb(null, arrLinks)
    })
}
