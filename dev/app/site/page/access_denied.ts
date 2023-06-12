import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getCookie, GetData, PostData } from '../../cms_general';
import { getLangResources } from '../../site_localization';

@customElement('cms-accessdenied')
class CmsAccessDenied extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    constructor() {
        super();
    }

    firstUpdated(changedProperties: any) {
        
        window.localStorage.removeItem("CMSToken");
        document.cookie = "token= ; path=/";
        document.cookie = "expires= Thu, 01 Jan 1970 00: 00: 00 UTC; path = /";

        let lcid = getCookie("lcid");

        $(() => {
            this.ChangeLanguage(lcid);
        })

    }

    ChangeLanguage(lcid: string) {

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

        $("#faLang").removeClass("active");
        $("#enLang").removeClass("active");
        $("#" + lcid + "Lang").addClass("active");
        
        var resources = getLangResources()[lcid];
        
        document.title = resources[window.location.pathname.toLowerCase()];

        $("[name='translate']").each(function(i, elt){
            $(elt).text(resources[$(elt).attr("caption")]);
        });
    }

    render() {
        return html`
<div class="container text-center">
    <h1 name="translate" caption="msg_unauthorized" style="color: red;"></h1>
    <p name="translate" caption="msg_unauthorized_desc"></p>
    <a name="translate" caption="nav_link_login" href="/login.html"></a>
</div>
        `;
    }
}