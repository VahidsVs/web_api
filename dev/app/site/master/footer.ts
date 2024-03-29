﻿import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData } from '../../cms_general';
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

@customElement('cms-footer')
class CmsFooter extends LitElement {
    createRenderRoot() {
        return this;
    }

    private Model = {
        data: {
            CurrentDate: ko.observable(),
        },
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

        this.Model.data.CurrentDate(new Date().getFullYear());

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

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        ko.applyBindings(this.Model, document.getElementById("pnlFooter"));
    }

    render() {
        return html`
<div class="container-fluid footer bg-dark wow fadeIn" data-wow-delay=".3s" id="pnlFooter">
    <div class="container pt-5 pb-4">
        <div class="row g-5">
            <div class="col-lg-4 col-md-6">
                <a href="/">
                    <img src="/images/logo.png" alt="" width="120" class="d-inline-block align-text-top">
                </a>
                <p class="mt-4 text-light">
                    MegaTech is an IT company which works in the field of applications, newtork, web design, blockchain and AI. MegaTech is an innovative start-up company.
                </p>
                <div class="d-flex hightech-link">
                    <a data-bind="attr: { href: social.FacebookLink }" href="" target="_blank" class="btn-light nav-fill btn btn-square rounded-circle me-2">
                        <i class="fab fa-facebook-f text-primary"></i>
                    </a>
                    <a data-bind="attr: { href: social.WhatsappLink }" href="" target="_blank" class="btn-light nav-fill btn btn-square rounded-circle me-2">
                        <i class="fab fa-whatsapp text-primary"></i>
                    </a>
                    <a data-bind="attr: { href: social.InstagramLink }" href="" target="_blank" class="btn-light nav-fill btn btn-square rounded-circle me-2">
                        <i class="fab fa-instagram text-primary"></i>
                    </a>
                    <a data-bind="attr: { href: social.LinkedinLink }" href="" target="_blank" class="btn-light nav-fill btn btn-square rounded-circle me-0">
                        <i class="fab fa-linkedin-in text-primary"></i>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <span class="h3 text-secondary">Short Link</span>
                <div class="mt-4 d-flex flex-column short-link">
                    <a href="/" class="mb-2 text-white">
                        <i class="fas fa-angle-right text-secondary me-2"></i>Home
                    </a>
                    <a href="/contact_us.html" class="mb-2 text-white">
                        <i class="fas fa-angle-right text-secondary me-2"></i>Contact Us
                    </a>
                    <a href="/about_us.html" class="mb-2 text-white">
                        <i class="fas fa-angle-right text-secondary me-2"></i>About Us
                    </a>
                    <a href="/impressum.html" class="mb-2 text-white">
                        <i class="fas fa-angle-right text-secondary me-2"></i>Impressum
                    </a>
                    <a href="/login.html" class="mb-2 text-white">
                        <i class="fas fa-angle-right text-secondary me-2"></i>Login
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <span class="h3 text-secondary">Contact Us</span>
                <div class="text-white mt-4 d-flex flex-column contact-link">
                    <a data-bind="attr: { href: social.AddressLink }" href="" target="_blank" class="pb-3 text-light border-bottom border-primary">
                        <i class="fas fa-map-marker-alt text-secondary me-2"></i> <span data-bind="text: social.AddressText"></span>
                    </a>
                    <a data-bind="attr: { href: social.TelLink }" href="" class="py-3 text-light border-bottom border-primary">
                        <i class="fas fa-phone-alt text-secondary me-2"></i> <span data-bind="text: social.TelText"></span>
                    </a>
                    <a data-bind="attr: { href: social.EmailLink }" href="" class="py-3 text-light border-bottom border-primary">
                        <i class="fas fa-envelope text-secondary me-2"></i> <span data-bind="text: social.EmailText"></span>
                    </a>
                </div>
            </div>
        </div>
        <hr class="text-light mt-5 mb-4">
        <div class="row">
            <div class="col-md-6 text-center text-md-start">
                <span class="text-light"><i class="fas fa-copyright text-secondary me-2"></i><span data-bind="text: data.CurrentDate"></span>, <a href="https://megatechapp.com" class="text-secondary">MegaTech</a> All right reserved.</span>
            </div>
            <div class="col-md-6 text-center text-md-end">
                <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                
            </div>
        </div>
    </div>
</div>

<!-- Back to Top -->
<a href="#" class="btn btn-secondary btn-square rounded-circle back-to-top"><i class="fa fa-arrow-up text-white"></i></a>
        `;
    }
}