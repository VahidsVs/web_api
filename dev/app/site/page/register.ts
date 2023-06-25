import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AjaxSuccessFunction, PostDataForm, GetDataWithoutLoading } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../site_localization';

@customElement('cms-register')
class CmsRegister extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;
    private resources: any = [];

    private Model = {
        data: {
            username: ko.observable(""),
            password: ko.observable(""),
            passwordConfirm: ko.observable(""),
            firstname: ko.observable(""),
            lastname: ko.observable(""),
            mobile: ko.observable(""),
            email: ko.observable(""),
            captchaCode: ko.observable(""),
        },
        captcha: {
            captcha: ko.observable(),
        },
        translate: {
            nav_link_register: ko.observable(),
            label_username: ko.observable(),
            label_password: ko.observable(),
            label_password_confirm: ko.observable(),
            label_firstname: ko.observable(),
            label_lastname: ko.observable(),
            label_mobile: ko.observable(),
            label_email: ko.observable(),
        },
        errors: {
            username: ko.observable(""),
            password: ko.observable(""),
            passwordConfirm: ko.observable(""),
            firstname: ko.observable(""),
            lastname: ko.observable(""),
            mobile: ko.observable(""),
            email: ko.observable(""),
            captchaCode: ko.observable(""),
        },
        setErrors: (errors: any) => {
            let resources = this.resources;
            this.Model.errors.username(errors ? resources[errors.username] : undefined);
            this.Model.errors.password(errors ? resources[errors.password] : undefined);
            this.Model.errors.passwordConfirm(errors ? resources[errors.passwordConfirm] : undefined);
            this.Model.errors.firstname(errors ? resources[errors.firstname] : undefined);
            this.Model.errors.lastname(errors ? resources[errors.lastname] : undefined);
            this.Model.errors.mobile(errors ? resources[errors.mobile] : undefined);
            this.Model.errors.email(errors ? resources[errors.email] : undefined);
            this.Model.errors.captchaCode(errors ? resources[errors.captchaCode] : undefined);
        }
    };

    ClearScr() {
        this.Model.data.username("");
        this.Model.data.password("");
        this.Model.data.passwordConfirm("");
        this.Model.data.firstname("");
        this.Model.data.lastname("");
        this.Model.data.mobile("");
        this.Model.data.email("");
        this.Model.data.captchaCode("");

        this.Model.errors.username("");
        this.Model.errors.password("");
        this.Model.errors.passwordConfirm("");
        this.Model.errors.firstname("");
        this.Model.errors.lastname("");
        this.Model.errors.mobile("");
        this.Model.errors.email("");
        this.Model.errors.captchaCode("");
    }

    constructor() {
        super();

        this.lcid = 'en';
        this.resources = getLangResources()[this.lcid];

        document.title = this.resources[window.location.pathname.toLowerCase()];
        
        this.Model.translate.nav_link_register(this.resources['nav_link_register']);
        this.Model.translate.label_username(this.resources['label_username']);
        this.Model.translate.label_password(this.resources['label_password']);
        this.Model.translate.label_password_confirm(this.resources['label_password_confirm']);
        this.Model.translate.label_firstname(this.resources['label_firstname']);
        this.Model.translate.label_lastname(this.resources['label_lastname']);
        this.Model.translate.label_mobile(this.resources['label_mobile']);
        this.Model.translate.label_email(this.resources['label_email']);
    }

    firstUpdated(changedProperties: any) {
        ko.applyBindings(this.Model, document.getElementById("pnlRegister"));
    
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

    btnRegister_Click() {

        PostDataForm("user_account/register.php", ko.toJS(this.Model.data), "#pnlLoading")
            .then(data => {
                if (data.errors === undefined && data.message === undefined) {
                    this.ClearScr();
                    AjaxSuccessFunction(this.resources[data.msg], 3000);
                }
                this.Model.setErrors(data.errors);

                this.ShowCaptcha();
            })
    }

    render() {
        return html`


<div class="d-flex align-items-center p-4" id="pnlRegister">
    <div class="container flex-row align-items-center">
        <div class="row justify-content-center">
            <div class="col-md-10" id="pnlLoading">
                <div class="card-group">
                    <div class="card border-primary p-2">
                        <div class="card-body">
                            <div class="card-title">
                                <h3 data-bind="text: translate.nav_link_register"></h3>
                            </div>
                            <hr />
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_username" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="text" class="form-control" data-bind="value: data.username">
                                        <span class="invalid" data-bind="text: errors.username"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_password" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="password" class="form-control" data-bind="value: data.password">
                                        <span class="invalid" data-bind="text: errors.password"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_password_confirm" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="password" class="form-control" data-bind="value: data.passwordConfirm">
                                        <span class="invalid" data-bind="text: errors.passwordConfirm"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_firstname" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="text" class="form-control" data-bind="value: data.firstname">
                                        <span class="invalid" data-bind="text: errors.firstname"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_lastname" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="text" class="form-control" data-bind="value: data.lastname">
                                        <span class="invalid" data-bind="text: errors.lastname"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_mobile" class="form-label"></label>
                                        <input type="text" class="form-control" data-bind="value: data.mobile">
                                        <span class="invalid" data-bind="text: errors.mobile"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label data-bind="text: translate.label_email" class="form-label"></label>
                                        <input type="email" dir="ltr" class="form-control" data-bind="value: data.email">
                                        <span class="invalid" data-bind="text: errors.email"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <img data-bind="attr:{ src: captcha.captcha }">
                                        <button class="btn btn-default" @click="${this.ShowCaptcha}"><i class="fas fa-sync fa-spin"></i></button>
                                        <input type="text" data-bind="value: data.captchaCode" class="form-control" id="txtCaptcha" />
                                        <span data-bind="visible: errors.captchaCode, text: errors.captchaCode" class="invalid"></span>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div class="row text-center">
                                <div class="col-md-12 d-grid">
                                    <button data-bind="text: translate.nav_link_register" class="btn btn-primary" @click="${this.btnRegister_Click}"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        `;
    }
}