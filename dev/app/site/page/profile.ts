import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../site_localization';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-profile')
class CmsProfile extends LitElement {
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
            pk_user: ko.observable(),
            username: ko.observable(),
            firstname: ko.observable(),
            lastname: ko.observable(),
            mobile: ko.observable(),
            email: ko.observable(),
            password: ko.observable(),
            passwordConfirm: ko.observable(),
        },
        errors: {
            username: ko.observable(""),
            firstname: ko.observable(""),
            lastname: ko.observable(""),
            mobile: ko.observable(""),
            email: ko.observable(""),
            password: ko.observable(""),
            passwordConfirm: ko.observable(""),
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
        }
    };

    ClearScr() {
        this.Model.data.pk_user("");
        this.Model.data.username("");
        this.Model.data.firstname("");
        this.Model.data.lastname("");
        this.Model.data.mobile("");
        this.Model.data.email("");
        this.Model.data.password("");
        this.Model.data.passwordConfirm("");

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

        ko.applyBindings(this.Model, document.getElementById("pnlProfile"));

        $(() => {
            
        })

        GetData("user_account/profile.php", null, "#tab1-pane")
            .then(data => {
                if(data[0]) {
                    let dataItem = data[0];
                    this.Model.data.pk_user(dataItem.pk_user);
                    this.Model.data.username(dataItem.username);
                    this.Model.data.firstname(dataItem.firstname);
                    this.Model.data.lastname(dataItem.lastname);
                    this.Model.data.mobile(dataItem.mobile);
                    this.Model.data.email(dataItem.email);
                }
            })
    }

    btnEditProfile_Click() {

    }

    btnResetPassword_Click() {

    }

    render() {
        return html`
<div class="container-fluid p-5" id="pnlProfile">
<div class="fade-in">
        <h1><span name="translate" caption="/profile.html"></span></h1>
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" data-bs-target="#tab1-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_editprofile"></span>
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" data-bs-target="#tab2-pane" data-bs-toggle="tab">
                <span name="translate" caption="tab_title_resetpassword"></span>
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tab1-pane">
            <div class="container-fluid p-2">
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label name="translate" caption="label_username" class="form-label"></label><span class="invalid"> *</span>
                            <p data-bind="text: data.username"></p>
                            <span class="invalid" data-bind="text: errors.username"></span>
                        </div>
                    </div>
                    <div class="col-md-6">
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
                </div>

                <div class="row p-2">
                    <div class="col-md-12">
                        <button name="translate" caption="btn_edit" class="btn btn-primary" @click="${this.btnEditProfile_Click}"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab2-pane">
            <div class="container-fluid p-2">
                <div class="row p-2">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label name="translate" caption="label_currentpassword" class="form-label"></label><span class="invalid"> *</span>
                            <input type="password" class="form-control" data-bind="value: data.password">
                            <span class="invalid" data-bind="text: errors.password"></span>
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
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label name="translate" caption="label_password_confirm" class="form-label"></label><span class="invalid"> *</span>
                            <input type="password" class="form-control" data-bind="value: data.passwordConfirm">
                            <span class="invalid" data-bind="text: errors.passwordConfirm"></span>
                        </div>
                    </div>
                </div>

                <div class="row p-2">
                    <div class="col-md-12">
                        <button name="translate" caption="btn_submit" class="btn btn-primary" @click="${this.btnResetPassword_Click}"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        `;
    }
}