﻿import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
import * as ko from 'knockout';

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

    private Model = {
        translate: {
            msg_unauthorized: ko.observable(),
            msg_unauthorized_desc: ko.observable(),
            nav_link_login: ko.observable(),
        },
    };

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = getTranslate('menu_unauthorized');

        this.Model.translate.msg_unauthorized(getTranslate('msg_unauthorized'));
        this.Model.translate.msg_unauthorized_desc(getTranslate('msg_unauthorized_desc'));
        this.Model.translate.nav_link_login(getTranslate('nav_link_login'));
    }

    firstUpdated(changedProperties: any) {
        
        // window.localStorage.removeItem("CMSToken");
        // document.cookie = "token= ; path=/ ; expires= Thu, 01 Jan 1970 00: 00: 00 UTC;";

        ko.applyBindings(this.Model, document.getElementById("pnlAccessDenied"));

        $(() => {
            
        })

    }

    render() {
        return html`
<div class="container text-center p-5" id="pnlAccessDenied">
    <h1 data-bind="text: translate.msg_unauthorized" style="color: red;"></h1>
    <p data-bind="text: translate.msg_unauthorized_desc"></p>
    <a data-bind="text: translate.nav_link_login" href="/login.html"></a>
</div>
        `;
    }
}