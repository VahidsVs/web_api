import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData, 
    GetDataWithoutLoading, 
    PostDataForm, 
    AjaxSuccessFunction } from '../../cms_general';
import * as ko from 'knockout';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-contactus')
class CmsContactUs extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    private Model = {
        data: {
            name: ko.observable(""),
            email: ko.observable(""),
            mobile: ko.observable(""),
            subject: ko.observable(""),
            message: ko.observable(""),
            captchaCode: ko.observable(""),
        },
        captcha: {
            captcha: ko.observable(),
        },
        errors: {
            name: ko.observable(),
            email: ko.observable(),
            mobile: ko.observable(),
            subject: ko.observable(),
            message: ko.observable(),
            captchaCode: ko.observable(),
        },
        setErrors: (errors: any) => {
            this.Model.errors.name(errors ? getTranslate(errors.name) : undefined);
            this.Model.errors.email(errors ? getTranslate(errors.email) : undefined);
            this.Model.errors.mobile(errors ? getTranslate(errors.mobile) : undefined);
            this.Model.errors.subject(errors ? getTranslate(errors.subject) : undefined);
            this.Model.errors.message(errors ? getTranslate(errors.message) : undefined);
            this.Model.errors.captchaCode(errors ? getTranslate(errors.captchaCode) : undefined);
        }
    };

    ClearScr() {
        this.Model.data.name("");
        this.Model.data.email("");
        this.Model.data.mobile("");
        this.Model.data.subject("");
        this.Model.data.message("");
        this.Model.data.captchaCode("");

        this.Model.errors.name("");
        this.Model.errors.email("");
        this.Model.errors.mobile("");
        this.Model.errors.subject("");
        this.Model.errors.message("");
        this.Model.errors.captchaCode("");
    }

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = "Contact Us";
    }

    firstUpdated(changedProperties: any) {
        ko.applyBindings(this.Model, document.getElementById("pnlContactUs"));

        this.ShowCaptcha();

        $(() => {
            
        });
    }

    ShowCaptcha() {
        GetDataWithoutLoading("captcha/get_captcha.php", null)
            .then(data => {
                this.Model.captcha.captcha("data:image/png;base64," + data.base64Captcha);
            })
    }

    SendMessage_Click() {
        PostDataForm("contact_us/insert_contact_us.php", ko.toJS(this.Model.data))
            .then(data => {
                if(data.errors === undefined && data.message === undefined) {
                    AjaxSuccessFunction(data.msg, 3000);

                    this.ClearScr();
                }
                this.Model.setErrors(data.errors);

                this.ShowCaptcha();
            })
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">Contact Us</h1>
    </div>
</div>
<!-- Page Header End -->

<!-- Contact Start -->
<div class="container-fluid py-5 mt-5" id="pnlContactUs">
    <div class="container py-5">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Get In Touch</h5>
            <h1 class="mb-3">Contact for any query</h1>
            <p class="mb-2">
                MegaTech is an IT company which works in the field of applications, newtork, web design, blockchain and AI. MegaTech is an innovative start-up company.
            </p>
        </div>
        <div class="contact-detail position-relative p-5">
            <div class="row g-5 mb-5 justify-content-center">
                <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".3s">
                    <div class="d-flex bg-light p-3 rounded">
                        <div class="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
                            <i class="fas fa-map-marker-alt text-white"></i>
                        </div>
                        <div class="ms-3">
                            <h4 class="text-primary">Address</h4>
                            <a href="https://goo.gl/maps/e9B3Ns14DApVZXqv8" target="_blank" class="h5">Weiz, Austria</a>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".5s">
                    <div class="d-flex bg-light p-3 rounded">
                        <div class="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
                            <i class="fa fa-phone text-white"></i>
                        </div>
                        <div class="ms-3">
                            <h4 class="text-primary">Call Us</h4>
                            <a class="h5" href="tel:+4366499657071" target="_blank">+43 664 99657071</a>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".7s">
                    <div class="d-flex bg-light p-3 rounded">
                        <div class="flex-shrink-0 btn-square bg-secondary rounded-circle" style="width: 64px; height: 64px;">
                            <i class="fa fa-envelope text-white"></i>
                        </div>
                        <div class="ms-3">
                            <h4 class="text-primary">Email Us</h4>
                            <a class="h5" href="mailto:admin@megatechapp.at" target="_blank">admin@megatechapp.at</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5">
                <div class="col-lg-6 wow fadeIn" data-wow-delay=".3s">
                    <div class="p-5 h-100 rounded contact-map">
                        <iframe class="rounded w-100 h-100" 
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2715.3758315622863!2d15.6808056!3d47.111305599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDfCsDA2JzQwLjciTiAxNcKwNDAnNTAuOSJF!5e0!3m2!1sen!2s!4v1688572594976!5m2!1sen!2s"
                        style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div class="col-lg-6 wow fadeIn" data-wow-delay=".5s">
                    <div class="p-5 rounded contact-form">
                        <div class="mb-4">
                            <input type="text" class="form-control border-0 py-3" data-bind="value: data.name" placeholder="Your Name">
                            <span data-bind="visible: errors.name, text: errors.name" class="invalid"></span>
                        </div>
                        <div class="mb-4">
                            <input type="email" class="form-control border-0 py-3" data-bind="value: data.email" placeholder="Your Email">
                            <span data-bind="visible: errors.email, text: errors.email" class="invalid"></span>
                        </div>
                        <div class="mb-4">
                            <input type="text" class="form-control border-0 py-3" data-bind="value: data.mobile" placeholder="Your Mobile">
                            <span data-bind="visible: errors.mobile, text: errors.mobile" class="invalid"></span>
                        </div>
                        <div class="mb-4">
                            <input type="text" class="form-control border-0 py-3" data-bind="value: data.subject" placeholder="Subject">
                            <span data-bind="visible: errors.subject, text: errors.subject" class="invalid"></span>
                        </div>
                        <div class="mb-4">
                            <textarea class="w-100 form-control border-0 py-3" data-bind="value: data.message" rows="6" cols="10" placeholder="Message"></textarea>
                            <span data-bind="visible: errors.message, text: errors.message" class="invalid"></span>
                        </div>
                        <div class="mb-4">
                            <img data-bind="attr:{ src: captcha.captcha }">
                            <button class="btn btn-default" @click="${this.ShowCaptcha}"><i class="fas fa-sync fa-spin"></i></button>
                            <input type="text" data-bind="value: data.captchaCode" class="form-control" id="txtCaptcha" />
                            <span data-bind="visible: errors.captchaCode, text: errors.captchaCode" class="invalid"></span>
                        </div>
                        <div class="text-start">
                            <button class="btn bg-primary text-white py-3 px-5" type="button" @click="${this.SendMessage_Click}">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>
<!-- Contact End -->
        `;
    }
}