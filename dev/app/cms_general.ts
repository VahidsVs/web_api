import moment from 'jalali-moment';
import { CmsNotification } from './admin/notification';

const webUrl = '/web_api/php2json/';

export function getLanguage() {
    return sessionStorage.lcid;
}

export function getTranslate(key: string) {

    if(key == undefined || key == "") {
        return "";
    }

    let resources = JSON.parse(sessionStorage.translate);

    let resource = resources.find((p: any) => p.Key == key);

    return resource ? (resource.Translate != null ? resource.Translate : '[' + key + ']') : '[' + key + ']';
}

export function getDirectionFromLanguage(lcid: string) {
    let languages = JSON.parse(sessionStorage.language);

    let language = languages.find((p: any) => p.lcid == lcid);

    return language.isRTL == true ? "rtl" : "ltr";
}

export async function GetData(address: string, param: any, divId: string = "body") {
    let content: any;

    var divElement = $(divId);
    divElement.prepend(`
        <div class="spinnerModal" style="width: ${divElement.width()}px; height: ${divElement.height()}px;">
        </div>
    `);


    let uri = webUrl + address;

    if (param != null) {
        var queryString = '';
        for (var i = 0; i < Object.keys(param).length; i++) {
            queryString += Object.keys(param)[i] + "=" + Object.values(param)[i];
            if (i < Object.keys(param).length) {
                queryString += '&';
            }
        }
        uri += '?' + queryString;
        //console.log(queryString);
    }
    
    // let h = new Headers();
    // h.append('Access-Control-Allow-Headers', "*");
    // h.append('Authorization', GetToken());
    // h.append('Content-Type', 'application/json');
    // h.append('Accept', 'application/json');
    let h = {
        'Access-Control-Allow-Headers': '*',
        'Authorization': GetToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    let req = new Request(uri, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: h,
        credentials: 'same-origin', // include, *same-origin, omit
    });

    const response = await fetch(req);
    //console.log(response);


    if (!response.ok) {
        try {
            content = await response.json();

            AjaxErrorFunction({ status: response.status, message: content.message }, null);
        }
        catch {
            AjaxErrorFunction({ status: response.status, message: response.statusText }, null);
        }
    }
    else {
        content = await response.json();
        //console.log(content);
    }

    $(divId).find(".spinnerModal")[0].remove();


    return content;
}

export async function GetDataWithoutLoading(address: string, param: any) {
    let content: any;

    let uri = webUrl + address;

    if (param != null) {
        var queryString = '';
        for (var i = 0; i < Object.keys(param).length; i++) {
            queryString += Object.keys(param)[i] + "=" + Object.values(param)[i];
            if (i < Object.keys(param).length) {
                queryString += '&';
            }
        }
        uri += '?' + queryString;
        //console.log(queryString);
    }
    
    // let h = new Headers();
    // h.append('Access-Control-Allow-Headers', "*");
    // h.append('Authorization', GetToken());
    // h.append('Content-Type', 'application/json');
    // h.append('Accept', 'application/json');
    let h = {
        'Access-Control-Allow-Headers': '*',
        'Authorization': GetToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    let req = new Request(uri, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: h,
        credentials: 'same-origin', // include, *same-origin, omit
    });

    const response = await fetch(req);
    //console.log(response);


    if (!response.ok) {
        try {
            content = await response.json();

            AjaxErrorFunction({ status: response.status, message: content.message }, null);
        }
        catch {
            AjaxErrorFunction({ status: response.status, message: response.statusText }, null);
        }
    }
    else {
        content = await response.json();
        //console.log(content);
    }

    return content;
}

export async function PostDataForm(address: string, param: any, divId: string = "body") {
    let content: any;

    var divElement = $(divId);
    divElement.prepend(`
        <div class="spinnerModal" style="width: ${divElement.width()}px; height: ${divElement.height()}px;">
        </div>
    `);

    let uri = webUrl + address;

    var form_data = new FormData();

    for ( var key in param ) {
        form_data.append(key, param[key]);
    }
    
    // console.log(param);
    // let h = new Headers();
    // h.append('Authorization', GetToken());
    let h = {
        'Authorization': GetToken(),
    };

    // Default options are marked with *
    const response = await fetch(uri, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: h,
        //body: JSON.stringify(param) // body data type must match "Content-Type" header
        body: form_data
    });
    //console.log(response);

    content = await response.json();
    //console.log(content);

    $(divId).find(".spinnerModal")[0].remove();

    if (!response.ok) {
        AjaxErrorFunction({ status: response.status, message: content.message }, null);
    }

    return content;

}

export async function PostData(address: string, param: any, divId: string = "body") {
    let content: any;

    var divElement = $(divId);
    divElement.prepend(`
        <div class="spinnerModal" style="width: ${divElement.width()}px; height: ${divElement.height()}px;">
        </div>
    `);

    let uri = webUrl + address;

    // console.log(param);

    // let h = new Headers();
    // h.append('Authorization', GetToken());
    // h.append('Content-Type', 'application/json');
    // h.append('Accept', 'application/json');
    let h = {
        'Authorization': GetToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Default options are marked with *
    const response = await fetch(uri, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: h,
        //body: JSON.stringify(param) // body data type must match "Content-Type" header
        body: param
    });
    //console.log(response);

    content = await response.json();
    //console.log(content);

    $(divId).find(".spinnerModal")[0].remove();

    if (!response.ok) {
        AjaxErrorFunction({ status: response.status, message: content.message }, null);
    }

    return content;

}

export async function PostDataFile(address: string, param: any, divId: string = "body") {
    let content: any;

    var divElement = $(divId);
    divElement.prepend(`
        <div class="spinnerModal" style="width: ${divElement.width()}px; height: ${divElement.height()}px;">
        </div>
    `);

    let uri = webUrl + address;

    // console.log(param);
    // let h = new Headers();
    // h.append('Authorization', GetToken());
    let h = {
        'Authorization': GetToken(),
    };

    // Default options are marked with *
    const response = await fetch(uri, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: h,
        //body: JSON.stringify(param) // body data type must match "Content-Type" header
        body: param
    });
    //console.log(response);

    content = await response.json();
    //console.log(content);

    $(divId).find(".spinnerModal")[0].remove();

    if (!response.ok) {
        AjaxErrorFunction({ status: response.status, message: content.message }, null);
    }

    return content;

}

export function GetToken() {

    var token = getCookie("token");
    if (token !== "")
        return "CMS " + token;

    if (token === "" && window.localStorage.getItem("CMSToken") !== null) {
        document.cookie = "token=" + window.localStorage.getItem("CMSToken") + "; path=/";
        token = window.localStorage.getItem("CMSToken");
        return "CMS " + token;
    }
    return null;
}

export function getCookie(cname: string) {
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

export function AjaxSuccessFunction(msg: any, duration = 0) {
    var notification = document.querySelector<CmsNotification>("cms-notification");
    notification.showMessage("success", msg, duration);
}

export function AjaxWarningFunction(msg: any, duration = 0) {
    var notification = document.querySelector<CmsNotification>("cms-notification");
    notification.showMessage("warning", msg, duration);
}

export function AjaxDangerFunction(msg: any, duration = 0) {
    var notification = document.querySelector<CmsNotification>("cms-notification");
    notification.showMessage("danger", msg, duration);
}

function AjaxErrorFunction(data: any, divId: any) {
    //console.log(data);
    //unAuthorize
    if (data.status === 401 || data.status === 403) {
        window.location.href = "/access_denied.html";
    }
    //bad request validation or message
    else if (data.status === 400 && data.message !== undefined) {
        var msg = data.message;

        if (divId === null) {

            var notification = document.querySelector<CmsNotification>("cms-notification");
            notification.showMessage("danger", msg, 5000);

        } else {
            $("#" + divId)[0].innerHTML = msg;
        }
    }
    else {
        var msg = data.message;

        if (divId === null) {
            $("fdm-notification").attr({ "type": "error", "message": msg });

        } else {
            $("#" + divId)[0].innerHTML = msg;
        }
    }
}

/**
 * اضافه کردن ویرگول به اعداد بر اساس هزارگان
 * @param number
 */
export function numberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//export function persianDigitToEnglish(number: any) {
//    return number.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
//}

/**
 * متدی برای گرفتن پارامتر از کوئری استرینگ
 * @param name
 * @param url
 */
export function getParameterByName(name: string, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function GetCurrentDate(): string {
    var today = new Date();
    var jdate = moment(today, 'YYYY/MM/DD').locale('fa');
    return jdate.format("jYYYY/jMM/jDD");
}

//از این متد برای بررسی معتبر بودن تاریخ استفاده می شود
export function IsValidDate(date: any): boolean {
    var jdate = moment(date, 'jYYYY/jMM/jDD');
    return jdate.isValid();
}

//از این متد برای گرفتن ماه و سال استفاده می شود
export function GetNextMonthYear(addMonth: number): any {

    var today = new Date();
    var jnow = moment(today, 'YYYY/MM/DD').locale('fa');
    var jnextMonth = jnow.add(addMonth, 'jMonth');
    var ret = { Month: jnextMonth.format('MMMM'), Year: jnextMonth.jYear() };
    return ret;

}

//از این متد برای گرفتن ماه و سال استفاده می شود
export function GetCurrentMonthYear(): any {

    var today = new Date();
    var jnow = moment(today, 'YYYY/MM/DD').locale('fa');
    var ret = { Month: jnow.format('MMMM'), Year: jnow.jYear() };
    return ret;

}


/**ساخت رنگی رندم */
export function getColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

