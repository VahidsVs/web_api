import $ from 'jquery';
global.$ = $;
window.$ = $;
window.jQuery = $;
import JSZip from 'jszip';//--> for export to excel kendo
window.JSZip = JSZip;

import { GetDataWithoutLoading } from './cms_general';
import { getLangResources } from './admin_localization';

GetDataWithoutLoading("user_account/authentication.php", null)
    .then(data => {
        if(data.isAnonymous == false){
            if (typeof (Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
            } else {
                // Sorry! No Web Storage support..
                alert("Sorry! No Web Storage support... Please update your browser");
            }
            
            //ست کردن کد زبان 
            let lcid = sessionStorage.lcid;
            if (!lcid || (lcid != 'fa' && lcid != 'en')) {
                lcid = 'en';
                sessionStorage.lcid = lcid;
            }
            
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
            
            // require('../content/test.js');
            // require('../content/multiselect.js');
            // require('../content/combo.js');
            // require('../content/confirm.js');
            // require('../content/grid.rtl.js');
            
            if (lcid == "fa") {
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
            if (lcid == 'fa') {
                require('@progress/kendo-ui/js/messages/kendo.messages.fa-IR.js');
            }
            else {
            
            }
        }
    })

