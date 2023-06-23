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

    private lcid;
    private resources: any = [];

    constructor() {
        super();

        this.lcid = 'en';
        this.resources = getLangResources()[this.lcid];
    }

    firstUpdated(changedProperties: any) {
        
        // window.localStorage.removeItem("CMSToken");
        // document.cookie = "token= ; path=/ ; expires= Thu, 01 Jan 1970 00: 00: 00 UTC;";

        $(() => {
            
        })

    }

    render() {
        return html`
<div class="container text-center p-5">
    <h1 name="translate" caption="msg_unauthorized" style="color: red;"></h1>
    <p name="translate" caption="msg_unauthorized_desc"></p>
    <a name="translate" caption="nav_link_login" href="/login.html"></a>
</div>
        `;
    }
}