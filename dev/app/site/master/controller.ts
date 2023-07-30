import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

@customElement('cms-controller')
class CmsController extends LitElement {
    createRenderRoot() {
        return this;
    }

//    static get styles() {
//        return css`
//`;
//    }

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
    }

    @property()
    ComponentName: string;

    @state()
    ModuleRender: any;

    async performUpdate() {

        switch (this.ComponentName) {
            case "cms-accessdenied":
                this.ModuleRender = html`<cms-accessdenied></cms-accessdenied>`
                break;
            case "cms-index":
                this.ModuleRender = html`<cms-index></cms-index>`
                break;
            case "cms-myhome":
                this.ModuleRender = html`<cms-myhome></cms-myhome>`
                break;
            case "cms-profile":
                this.ModuleRender = html`<cms-profile></cms-profile>`
                break;
            case "cms-login":
                this.ModuleRender = html`<cms-login></cms-login>`
                break;
            case "cms-register":
                this.ModuleRender = html`<cms-register></cms-register>`
                break;
            case "cms-contactus":
                this.ModuleRender = html`<cms-contactus></cms-contactus>`
                break;
            case "cms-aboutus":
                this.ModuleRender = html`<cms-aboutus></cms-aboutus>`
                break;
            case "cms-impressum":
                this.ModuleRender = html`<cms-impressum></cms-impressum>`
                break;

            case "cms-posts":
                this.ModuleRender = html`<cms-posts></cms-posts>`
                break;
            case "cms-post":
                this.ModuleRender = html`<cms-post></cms-post>`
                break;
        }

        super.performUpdate();
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        ko.applyBindings(this.Model, document.getElementById("pnlTopbar"));
    }

    render() {
        return html`
<cms-notification></cms-notification>

<!-- Topbar Start -->
<div class="container-fluid bg-dark py-2 d-none d-md-flex" id="pnlTopbar">
    <div class="container">
        <div class="d-flex justify-content-between topbar">
            <div class="top-info">
                <small class="me-3 text-white-50"><a href="#"><i class="fas fa-map-marker-alt me-2 text-secondary"></i></a><span data-bind="text: social.AddressText"></span></small>
                <small class="me-3 text-white-50"><a href="#"><i class="fas fa-envelope me-2 text-secondary"></i></a><span data-bind="text: social.EmailText"></span></small>
            </div>
            <div id="note" class="text-secondary d-none d-xl-flex"><small>Note : We help you to Grow your Business</small></div>
            <div class="top-link">
                <a data-bind="attr: { href: social.FacebookLink }" href="" target="_blank" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-facebook-f text-primary"></i></a>
                <a data-bind="attr: { href: social.WhatsappLink }" href="" target="_blank" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-whatsapp text-primary"></i></a>
                <a data-bind="attr: { href: social.InstagramLink }" href="" target="_blank" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-instagram text-primary"></i></a>
                <a data-bind="attr: { href: social.LinkedinLink }" href="" target="_blank" class="bg-light nav-fill btn btn-sm-square rounded-circle me-0"><i class="fab fa-linkedin-in text-primary"></i></a>
            </div>
        </div>
    </div>
</div>
<!-- Topbar End -->

<!-- Navbar Start -->
    <cms-header></cms-header>
<!-- Navbar End -->

<div class="" style="min-height: calc(100vh - 140px);">

    ${this.ModuleRender}

</div>

<!-- Footer Start -->
    <cms-footer></cms-footer>
<!-- Footer End -->
        `;
    }
}