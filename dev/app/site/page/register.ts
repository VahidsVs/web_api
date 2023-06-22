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

    private lcid = 'fa';
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
        },
        captcha: {
            captcha: ko.observable(),
        },
        errors: {
            username: ko.observable(""),
            password: ko.observable(""),
            passwordConfirm: ko.observable(""),
            firstname: ko.observable(""),
            lastname: ko.observable(""),
            mobile: ko.observable(""),
            email: ko.observable(""),
        },
        setErrors: function (errors: any) {
            let lcid = 'en';
            let resources = getLangResources()[lcid];
            this.errors.username(errors ? resources[errors.username] : undefined);
            this.errors.password(errors ? resources[errors.password] : undefined);
            this.errors.passwordConfirm(errors ? resources[errors.passwordConfirm] : undefined);
            this.errors.firstname(errors ? resources[errors.firstname] : undefined);
            this.errors.lastname(errors ? resources[errors.lastname] : undefined);
            this.errors.mobile(errors ? resources[errors.mobile] : undefined);
            this.errors.email(errors ? resources[errors.email] : undefined);
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

        this.Model.errors.username("");
        this.Model.errors.password("");
        this.Model.errors.passwordConfirm("");
        this.Model.errors.firstname("");
        this.Model.errors.lastname("");
        this.Model.errors.mobile("");
        this.Model.errors.email("");
    }

    constructor() {
        super();

        this.lcid = 'en';
        this.resources = getLangResources()[this.lcid];
    }

    firstUpdated(changedProperties: any) {
        ko.applyBindings(this.Model, document.getElementById("pnlRegister"));
    
        this.ShowCaptcha();
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
                                <h3 name="translate" caption="nav_link_register"></h3>
                            </div>
                            <hr />
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_username" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="text" class="form-control" data-bind="value: data.username">
                                        <span class="invalid" data-bind="text: errors.username"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_password" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="password" class="form-control" data-bind="value: data.password">
                                        <span class="invalid" data-bind="text: errors.password"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_password_confirm" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="password" class="form-control" data-bind="value: data.passwordConfirm">
                                        <span class="invalid" data-bind="text: errors.passwordConfirm"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_firstname" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="text" class="form-control" data-bind="value: data.firstname">
                                        <span class="invalid" data-bind="text: errors.firstname"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_lastname" class="form-label"></label><span class="invalid"> *</span>
                                        <input type="text" class="form-control" data-bind="value: data.lastname">
                                        <span class="invalid" data-bind="text: errors.lastname"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_mobile" class="form-label"></label>
                                        <input type="text" class="form-control" data-bind="value: data.mobile">
                                        <span class="invalid" data-bind="text: errors.mobile"></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label name="translate" caption="label_email" class="form-label"></label>
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
                                    <button name="translate" caption="nav_link_register" class="btn btn-primary" @click="${this.btnRegister_Click}"></button>
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