import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    getCookie, 
    GetData, 
    GetDataWithoutLoading, 
    PostDataForm } from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-login')
class CmsLogin extends LitElement {
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
            username: ko.observable(""),
            password: ko.observable(""),
            captchaCode: ko.observable(""),
        },
        captcha: {
            captcha: ko.observable(),
        },
        translate: {
            title_login: ko.observable(),
            subtitle_login: ko.observable(),
            label_username: ko.observable(),
            label_password: ko.observable(),
            label_remember_me: ko.observable(),
            nav_link_login: ko.observable(),
            nav_link_register: ko.observable(),
            nav_link_forget_password: ko.observable(),
        },
        errors: {
            username: ko.observable(),
            password: ko.observable(),
            captchaCode: ko.observable(),
        },
        setErrors: (errors: any) => {
            this.Model.errors.username(errors ? getTranslate(errors.username) : undefined);
            this.Model.errors.password(errors ? getTranslate(errors.password) : undefined);
            this.Model.errors.captchaCode(errors ? getTranslate(errors.captchaCode) : undefined);
        }
    };

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = getTranslate('menu_login');

        this.Model.translate.title_login(getTranslate('title_login'));
        this.Model.translate.subtitle_login(getTranslate('subtitle_login'));
        this.Model.translate.label_username(getTranslate('label_username'));
        this.Model.translate.label_password(getTranslate('label_password'));
        this.Model.translate.label_remember_me(getTranslate('label_remember_me'));
        this.Model.translate.nav_link_login(getTranslate('nav_link_login'));
        this.Model.translate.nav_link_register(getTranslate('nav_link_register'));
        this.Model.translate.nav_link_forget_password(getTranslate('nav_link_forget_password'));
    }

    firstUpdated(changedProperties: any) {
        var myToken = getCookie("token");
        var myTokenStorage = window.localStorage.getItem("CMSToken");
        if (myToken !== '' || myTokenStorage !== null) {
            window.location.href = '/my-home.html';
        }

        ko.applyBindings(this.Model, document.getElementById("pnlLogin"));

        $('#txtUserName').focus();

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

    txtKeyPress(e: any) {
        if (e.keyCode === 13) {
            $("#btnLogin").focus();
            this.btnLogin();
        }
    }

    btnLogin() {

        PostDataForm("user_account/login.php", ko.toJS(this.Model.data), "#pnlLoading")
            .then(data => {
                if (data.errors === undefined && data.message === undefined) {
                    window.localStorage.removeItem("CMSToken");

                    if (($("#chRememberMe")[0] as HTMLInputElement).checked) {
                        window.localStorage.setItem("CMSToken", data.token);
                    }

                    document.cookie = "token=" + data.token + "; path=/;SameSite=None;Secure";
                    window.location.href = '/my-home.html';
                }
                this.Model.setErrors(data.errors);

                this.ShowCaptcha();
            })
    }

    render() {
        return html`


<div class="d-flex align-items-center p-4" id="pnlLogin">
    <div class="container flex-row align-items-center">
        <div class="row justify-content-center">
            <div class="col-md-5" id="pnlLoading">
                <div class="card-group">
                    <div class="card border-primary p-2">
                        <div class="card-body">
                            <div class="card-title">
                                <h3 data-bind="text: translate.title_login"></h3>
                                <p data-bind="text: translate.subtitle_login" class="text-muted"></p>
                            </div>
                            <hr />
                            <div class="mb-3">
                                <label data-bind="text: translate.label_username" class="form-label"></label>
                                <div class="input-group">
                                    <span class="input-group-text"><span class="fa fa-user"></span></span>
                                    <input type="email" data-bind="value: data.username" class="form-control" id="txtUserName" @keypress="${this.txtKeyPress}" />
                                </div>
                                <span data-bind="visible: errors.username, text: errors.username" class="invalid"></span>
                            </div>
                            <div class="mb-3">
                                <label data-bind="text: translate.label_password" class="form-label"></label>
                                <div class="input-group">
                                    <span class="input-group-text"><span class="fa fa-lock"></span></span>
                                    <input type="password" data-bind="value: data.password" class="form-control" id="txtPassword" @keypress="${this.txtKeyPress}" />
                                </div>
                                <span data-bind="visible: errors.password, text: errors.password" class="invalid"></span>
                            </div>
                            <div class="mb-3 text-center">
                                <img data-bind="attr:{ src: captcha.captcha }">
                                <button class="btn btn-default" @click="${this.ShowCaptcha}"><i class="fas fa-sync fa-spin"></i></button>
                                <input type="text" data-bind="value: data.captchaCode" class="form-control" id="txtCaptcha" @keypress="${this.txtKeyPress}" />
                                <span data-bind="visible: errors.captchaCode, text: errors.captchaCode" class="invalid"></span>
                            </div>
                            <div class="col-md-12 mb-3">
                                <input type="checkbox" id="chRememberMe" />&nbsp;<label data-bind="text: translate.label_remember_me" for="chRememberMe"></label>
                            </div>

                            <button id="btnLogin" type="button" class="btn btn-block btn-success" style="width: 100%" @click="${this.btnLogin}">
                                <span class="fa fa-sign-in"></span> <span data-bind="text: translate.nav_link_login"></span>
                            </button>

                            <hr />
                            <div class="row text-center">
                                <div class="col-md-6 d-grid">
                                    <a data-bind="text: translate.nav_link_register" class="btn btn-primary" href="/register.html"></a>
                                </div>
                                <div class="col-md-6 d-grid">
                                    <a data-bind="text: translate.nav_link_forget_password" class="btn btn-secondary" href="/forget-password.html"></a>
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