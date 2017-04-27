var async               = require('async');
var request             = require('request');
var parser              = require('./lib/parser')
var fs                  = require('fs');
var url                 = require('url');

// the max no of parallel executions
const CONCURRENCY       = 5;

// filename to save output
const FILE_NAME         = 'links.csv';

var objUrlHashMap       = new Object();

var Queue               = async.queue(function (data, cb) {
   makeRequest(data.href, function (err, body) {
       if(err){
        //    ignore errors
           cb(null)
       }
       else {
           parser.parseHtml(body, cb);
       }
   });
}, CONCURRENCY)


/**
 * makes get request to provided url and return html string
 * @param {String} url the url to be requested
 * @param {[Function]} cb callback function
 */

function makeRequest(url, cb) {
    request(url, function (err, res, body) {
        if(err){
            cb(err);
        }
        else{
            cb(null, body);
        }
    });
}

fs.appendFile(FILE_NAME, '"text","href"\r\n', function () {
    
});

/**
 * scrapes url recursively like a spider
 * @param {Object} data the url data to start scrape
 */
function startScrape(data) {
    Queue.push(data, function (err, res) {
        console.log('scraped----->', data.href);

        if(res){
            res.forEach(function(element) {

                element.href        = fixLink(element.href, data.href);
                element.text        = fixText(element.text);

                    // checking whether link is already scraped or not
                if(element.href && !objUrlHashMap[element.href]){
                    objUrlHashMap[element.href]    = 1;
                    fs.appendFile(FILE_NAME, '"'+ element.text+ '","'+ element.href+'"\r\n', function (err) {
                        
                    });
                    // scrape each of the links
                    startScrape(element)
                }
            });
        }
        
    });
    
    return
}


/**
 * replace all new line characters
 * @param {String} txt the link text
 */

function fixText(txt){
    return txt.replace(/\n/g, ' ').replace(/\r/g, ' ');
}

/**
 *  some urls will not have host for eg: for sin in it will be just '/signin'
 * so here we have to take host from parent page and append with it
 * here a library called url is used for that purpose.
 * @param {String} elementUrl the url of the current object
 * @param {String} parentPageUrl the url of the page from which we got the elemetUrl
 */

function fixLink(elementUrl, parentPageUrl) {
    // some urls will not have host for eg: for sin in it will be just '/signin'
    // so here we have to take host from parent page and append with it
    // here a library called url is used for that purpose.
    
    var currentUrl  = url.parse(elementUrl);
    if(currentUrl.host){
        return elementUrl;
    }
    var parentUrl   = url.parse(parentPageUrl);
    return parentUrl.resolve(elementUrl);
}


startScrape({href: 'https://medium.com'});







