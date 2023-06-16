import $ from 'jquery';
global.$ = $;
window.$ = $;
window.jQuery = $;
import JSZip from 'jszip';//--> for export to excel kendo
window.JSZip = JSZip;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//ست کردن کد زبان 
let lcid = 'en'; // getCookie("lcid");
// if (!lcid) {
//     lcid = "fa";
//     document.cookie = "lcid=" + lcid + "; path=/;SameSite=None;Secure";
// }


if(lcid == "fa") {
    $("html").attr("lang", "fa").attr("dir", "rtl");
    $("#mainCss").remove();
    $("head").append(`<link id="mainCss" href="/bundle/site_rtl.css" type="text/css" rel="stylesheet" />`);
}
else {
    $("html").attr("lang", "en").attr("dir", "ltr");
    $("#mainCss").remove();
    $("head").append(`<link id="mainCss" href="/bundle/site_ltr.css" type="text/css" rel="stylesheet" />`);
}

require('../content/confirm.js');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('@majidh1/jalalidatepicker/dist/jalaliDatepicker.js');
