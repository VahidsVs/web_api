﻿import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getCookie, PostDataForm } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../site_localization';

@customElement('cms-login')
class CmsLogin extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private Model = {
        data: {
            username: ko.observable(""),
            password: ko.observable("")
        },
        errors: {
            username: ko.observable(),
            password: ko.observable()
        },
        setErrors: function (errors: any) {
            let lcid = getCookie("lcid");
            let resources = getLangResources()[lcid];
            this.errors.username(errors ? resources[errors.username] : undefined);
            this.errors.password(errors ? resources[errors.password] : undefined);
        }
    };

    constructor() {
        super();
    }

    firstUpdated(changedProperties: any) {
        var myToken = getCookie("token");
        var myTokenStorage = window.localStorage.getItem("CMSToken");
        if (myToken !== '' || myTokenStorage !== null) {
            window.location.href = '/my-home.html';
        }

        ko.applyBindings(this.Model, document.getElementById("pnlLogin"));

        $('#txtUserName').focus();
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
                                <h3 name="translate" caption="title_login"></h3>
                                <p name="translate" caption="subtitle_login" class="text-muted"></p>
                            </div>
                            <hr />
                            <div class="mb-3">
                                <label name="translate" caption="label_username" class="form-label"></label>
                                <div class="input-group">
                                    <span class="input-group-text"><span class="fa fa-user"></span></span>
                                    <input type="text" data-bind="value: data.username" class="form-control" id="txtUserName" @keypress="${this.txtKeyPress}" />
                                </div>
                                <span data-bind="visible: errors.username, text: errors.username" class="invalid"></span>
                            </div>
                            <div class="mb-3">
                                <label name="translate" caption="label_password" class="form-label"></label>
                                <div class="input-group">
                                    <span class="input-group-text"><span class="fa fa-lock"></span></span>
                                    <input type="password" data-bind="value: data.password" class="form-control" id="txtPassword" @keypress="${this.txtKeyPress}" />
                                </div>
                                <span data-bind="visible: errors.password, text: errors.password" class="invalid"></span>
                            </div>
                            <div class="mb-3">
                                <img src="">
                            </div>
                            <div class="col-md-12 mb-3">
                                <input type="checkbox" id="chRememberMe" />&nbsp;<label name="translate" caption="label_remember_me" for="chRememberMe"></label>
                            </div>

                            <button id="btnLogin" type="button" class="btn btn-block btn-success" style="width: 100%" @click="${this.btnLogin}">
                                <span class="fa fa-sign-in"></span> <span name="translate" caption="nav_link_login"></span>
                            </button>

                            <hr />
                            <div class="row text-center">
                                <div class="col-md-6 d-grid">
                                    <a name="translate" caption="nav_link_register" class="btn btn-primary" href="/register.html"></a>
                                </div>
                                <div class="col-md-6 d-grid">
                                    <a name="translate" caption="nav_link_forget_password" class="btn btn-secondary" href="/forget-password.html"></a>
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