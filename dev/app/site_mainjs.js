import $ from 'jquery';
global.$ = $;
window.$ = $;
window.jQuery = $;
import JSZip from 'jszip';//--> for export to excel kendo
window.JSZip = JSZip;

import { getLangResources } from './site_localization';

if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
} else {
    // Sorry! No Web Storage support..
    alert("Sorry! No Web Storage support... Please update your browser");
}

//ست کردن کد زبان 
let lcid = 'en';
// if (!lcid || (lcid != 'fa' && lcid != 'en')) {
sessionStorage.lcid = lcid;
// }

if (!sessionStorage.translate) {
    sessionStorage.translate = JSON.stringify(getLangResources(lcid));
} else if (sessionStorage.translate != JSON.stringify(getLangResources(lcid))) {
    sessionStorage.translate = JSON.stringify(getLangResources(lcid));
}
if (!sessionStorage.language) {
    sessionStorage.language = JSON.stringify([
        { lcid: 'fa', isRTL: true },
        { lcid: 'en', isRTL: false },
    ]);
}


// if(lcid == "fa") {
//     $("html").attr("lang", "fa").attr("dir", "rtl");
//     $("#mainCss").remove();
//     $("head").append(`<link id="mainCss" href="/bundle/site_rtl.css" type="text/css" rel="stylesheet" />`);
// }
// else {
    $("html").attr("lang", "en").attr("dir", "ltr");
    $("#mainCss").remove();
    $("head").append(`<link id="mainCss" href="/bundle/site_ltr.css" type="text/css" rel="stylesheet" />`);
// }

require('../content/confirm.js');
require('bootstrap/dist/js/bootstrap.bundle.js');
global.WOW = require('../content/lib/wow/wow.min.js');
require('../content/lib/easing/easing.min.js');
require('../content/lib/waypoints/waypoints.min.js');
require('../content/site.js');
