﻿import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
import * as ko from 'knockout';
import {
    _addressText,
    _emailLink,
    _facebookLink,
    _instagramLink,
    _linkedinLink,
    _telLink,
    _telegramLink,
    _whatsappLink,
    _addressLink,
    _emailText,
    _telText
} from '../../social_network_config';

@customElement('cms-header')
class CmsHeader extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    @state()
    private PnlLoginItems: any = [];
    @state()
    private PnlLogin: any;

    private Model = {
        social: {
            FacebookLink: ko.observable(),
            WhatsappLink: ko.observable(),
            InstagramLink: ko.observable(),
            LinkedinLink: ko.observable(),
            TelegramLink: ko.observable(),
            EmailLink: ko.observable(),
            TelLink: ko.observable(),
            AddressLink: ko.observable(),
            EmailText: ko.observable(),
            TelText: ko.observable(),
            AddressText: ko.observable(),
        },
    }

    constructor() {
        super();

        this.lcid = getLanguage();

        this.Model.social.FacebookLink(_facebookLink);
        this.Model.social.WhatsappLink(_whatsappLink);
        this.Model.social.InstagramLink(_instagramLink);
        this.Model.social.LinkedinLink(_linkedinLink);
        this.Model.social.TelegramLink(_telegramLink);
        this.Model.social.EmailLink(_emailLink);
        this.Model.social.TelLink(_telLink);
        this.Model.social.AddressLink(_addressLink);
        this.Model.social.EmailText(_emailText);
        this.Model.social.TelText(_telText);
        this.Model.social.AddressText(_addressText);

        //بررسی لاگین بودن شخص
        GetData("user_account/authentication.php", null)
            .then(data => {
                if (data.isAnonymous === true) {

                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token= ; path=/;expires= Thu, 01 Jan 1970 00: 00: 00 UTC";

                    this.PnlLoginItems.push(html`
`);

                    this.requestUpdate();
                }
                else if (data.isAnonymous === false) {
                    var UserName = data.username;

                    var isInGroup = data.isInGroup;
                            if (isInGroup === true) {
                                this.PnlLoginItems.push(html`
<div class="nav-item dropdown">
    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">${UserName}</a>
    <div class="dropdown-menu rounded">
        <a href="/admin/index.html" class="dropdown-item"><span>${getTranslate('nav_link_admin_dashboard')}</span></a>
        <a href="/profile.html" class="dropdown-item"><span>${getTranslate('nav_link_profile')}</span></a>
        <a href="#" @click="${this.logout}" class="dropdown-item"><span>${getTranslate('nav_link_logout')}</span></a>
    </div>
</div>
`);
                            }
                            else {
                                this.PnlLoginItems.push(html`
<div class="nav-item dropdown">
    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">${UserName}</a>
    <div class="dropdown-menu rounded">
        <a href="/profile.html" class="dropdown-item"><span>${getTranslate('nav_link_profile')}</span></a>
        <a href="#" @click="${this.logout}" class="dropdown-item"><span>${getTranslate('nav_link_logout')}</span></a>
    </div>
</div>
`);
                            }

                            this.requestUpdate();
                }
                else {

                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token= ; path=/;expires= Thu, 01 Jan 1970 00: 00: 00 UTC";

                    this.PnlLoginItems.push(html`
`);
    
                    this.requestUpdate();
                }
            });

        this.PnlLogin = html`${this.PnlLoginItems}`;
    }

    async performUpdate() {

        super.performUpdate();
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            
        })

        ko.applyBindings(this.Model, document.getElementById("pnlHeader"));
    }

    updated(changedProperties: any) {
        super.updated(changedProperties);

        $(() => {
            
        })
    }

    // ChangeLanguage_Click(e: any) {
    //     let lcid = e.target.textContent;
    //     document.cookie = "lcid=" + lcid + "; path=/;SameSite=None;Secure";

    //     location.reload();
    // }

    logout(e: any) {
        e.preventDefault();
        PostData("user_account/logout.php", null)
            .then(data => {
                if (data.statusCode === 200) {
                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token=" + "" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                    window.location.href = "/login.html";
                }
            })
    }

    //<ul class="c-header-nav d-sm-down-none">
    //    <li class="c-header-nav-item px-2">
    //        <a class="c-header-nav-link" href="#">Dashboard</a>
    //    </li>
    //    <li class="c-header-nav-item px-2">
    //        <a class="c-header-nav-link" href="#">Users</a>
    //    </li>
    //</ul>

    render() {
        return html`
<div class="container-fluid bg-primary" id="pnlHeader">
    <div class="container">
        <nav class="navbar navbar-dark navbar-expand-lg py-0">
            <a class="navbar-brand" href="/">
                <img src="/images/logo.png" alt="" width="120" class="d-inline-block align-text-top">
            </a>
            <button type="button" class="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                <div class="navbar-nav ms-auto mx-xl-auto p-0">
                    <a href="/" class="nav-item nav-link">Home</a>
                    <a href="/contact_us.html" class="nav-item nav-link">Contact Us</a>
                    <a href="/about_us.html" class="nav-item nav-link">About Us</a>
                    <a href="/impressum.html" class="nav-item nav-link">Impressum</a>
                    ${this.PnlLogin}
                </div>
            </div>
            <div class="d-none d-xl-flex flex-shirink-0">
                <div id="phone-tada" class="d-flex align-items-center justify-content-center me-4">
                    <a href="tel:+4366499657071" class="position-relative animated tada infinite">
                        <i class="fa fa-phone-alt text-white fa-2x"></i>
                        <div class="position-absolute" style="top: -7px; left: 20px;">
                            <span><i class="fa fa-comment-dots text-secondary"></i></span>
                        </div>
                    </a>
                </div>
                <div class="d-flex flex-column pe-4">
                    <span class="text-white-50">Have any questions?</span>
                    <span class="text-secondary" data-bind="text: social.TelText"></span>
                </div>
            </div>
        </nav>
    </div>
</div>
        `;
    }
}