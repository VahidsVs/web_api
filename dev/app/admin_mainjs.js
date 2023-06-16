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
let lcid = getCookie("lcid");
if (!lcid) {
    lcid = "en";
    document.cookie = "lcid=" + lcid + "; path=/;SameSite=None;Secure";
}

// require('../content/test.js');
// require('../content/multiselect.js');
// require('../content/combo.js');
// require('../content/confirm.js');
// require('../content/grid.rtl.js');

if(lcid == "fa") {
    $("html").attr("lang", "fa").attr("dir", "rtl");
    $("#mainCss").remove();
    $("head").append(`<link id="mainCss" href="/bundle/admin_rtl.css" type="text/css" rel="stylesheet" />`);
}
else {
    $("html").attr("lang", "en").attr("dir", "ltr");
    $("#mainCss").remove();
    $("head").append(`<link id="mainCss" href="/bundle/admin_ltr.css" type="text/css" rel="stylesheet" />`);
}

require('../content/confirm.js');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('@majidh1/jalalidatepicker/dist/jalaliDatepicker.js');

require('@progress/kendo-ui/js/kendo.core.js');
require('@progress/kendo-ui/js/kendo.grid.js');
require('@progress/kendo-ui/js/kendo.multiselect.js');
require('@progress/kendo-ui/js/kendo.combobox.js');
require('@progress/kendo-ui/js/kendo.tooltip.js');
if(lcid == 'fa') {
    require('@progress/kendo-ui/js/messages/kendo.messages.fa-IR.js');
}
else {

}