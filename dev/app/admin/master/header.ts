import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData,
    GetDataWithoutLoading, 
    PostDataForm,
    getCookie } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../admin_localization';

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

    MenuItems: any[];

    @state()
    Menu: any;

    private Model = {
        translate: {
            nav_link_home: ko.observable(),
        },
    };

    constructor() {
        super();

        this.lcid = getLanguage();
        
        this.Model.translate.nav_link_home(getTranslate('nav_link_home'));

        GetData("user_account/authentication.php", null)
            .then(data => {
                if (data.isAnonymous === true) {
                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token= ; path=/;expires= Thu, 01 Jan 1970 00: 00: 00 UTC";

                    this.PnlLoginItems.push(html`
<li class="nav-item">
    <a href="/login.html" class="nav-link">${getTranslate('nav_link_login')}</a>
</li>`);

                    this.requestUpdate();
                }
                else if (data.isAnonymous === false) {
                    var UserName = data.username;

                    var isInGroup = data.isInGroup;
                    if (isInGroup === true) {
                        this.PnlLoginItems.push(html`
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span>${UserName}</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li class="">
            <a href="/admin/index.html" class="dropdown-item" target="_blank"><span class="fa fa-dashboard"></span> <span>${getTranslate('nav_link_admin_dashboard')}</span></a>
        </li>
        <li class="">
            <a href="/profile.html" class="dropdown-item"><span class="fa fa-user"></span> <span>${getTranslate('nav_link_profile')}</span></a>
        </li>
        <li class="">
            <a href="#" class="dropdown-item" @click="${this.logout}"><span class="fa fa-sign-out"></span> <span>${getTranslate('nav_link_logout')}</span></a>
        </li>
    </ul>
</li>`);
                    }
                    else {
                        this.PnlLoginItems.push(html`
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span>${UserName}</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li class="">
            <a href="/profile.html" class="dropdown-item"><span class="fa fa-user"></span> <span>${getTranslate('nav_link_profile')}</span></a>
        </li>
        <li class="">
            <a href="#" class="dropdown-item" @click="${this.logout}"><span class="fa fa-sign-out"></span> <span>${getTranslate('nav_link_logout')}</span></a>
        </li>
    </ul>
</li>`);
                    }

                    this.requestUpdate();
                }
                else {

                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token= ; path=/;expires= Thu, 01 Jan 1970 00: 00: 00 UTC";

                    this.PnlLoginItems.push(html`
    <li class="nav-item">
        <a href="/login.html" class="nav-link">${getTranslate('nav_link_login')}</a>
    </li>`);

                    this.requestUpdate();
                }
            });



        this.PnlLogin = html`${this.PnlLoginItems}`;
    }

    AddMenu(menuItem: any): any {

        //آیا این منو فرزند دارد یا خیر
        let children = this.MenuItems.filter(p => p.ParentIndex == menuItem.MenuIndex);
        if (children.length != 0) {
            let menuItems: any = [];
            for (var i = 0; i < children.length; i++) {
                menuItems.push(this.AddMenu(children[i]));
            }

            if (menuItem.ParentIndex == null) {
                return (html`
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">
        ${menuItem.Title}
    </a>
    <ul class="dropdown-menu shadow" style="background-color: #364b6d !important;">
        ${menuItems}
    </ul>
</li>`);
            }
            else {
                return (html`
<li class="dropend">
    <a class="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">
        ${menuItem.Title}
    </a>
    <ul class="dropdown-menu shadow" style="background-color: #364b6d !important;">
        ${menuItems}
    </ul>
</li>`);
            }
        } else {
            if (menuItem.ParentIndex != null) {
                return (html`
<li>
    <a class="dropdown-item" href="${menuItem.Url}">${menuItem.Title}</a>
</li>`);
            }
            else {
                return (html`
<li class="nav-item">
    <a class="nav-link" href="${menuItem.Url}">${menuItem.Title}</a>
</li>
`);
            }
        }
    }

    async performUpdate() {
        // میتوانستیم از این روش استفاده نکنیم و تمام موارد این قسمت را در fristUpdated بیاوریم
        // با این تفاوت که باید await را حذف کنیم
        await GetDataWithoutLoading("user_account/menu.php", null)
            .then(data => {
                this.MenuItems = data;

                // let parents = this.MenuItems.filter(p => p.ParentIndex == null);

                // let menuItems: any = [];
                // for (var i = 0; i < parents.length; i++) {
                //     menuItems.push(this.AddMenu(parents[i]));
                // }

                // this.Menu = html`${menuItems}`;
            });

        super.performUpdate();
    }

    firstUpdated(changedProperties: any) {

        ko.applyBindings(this.Model, document.getElementById("pnlHeader"));

        $(() => {
            
        })

        $("#" + this.lcid + "Lang").addClass("active");
    }

    updated(changedProperties: any) {
        super.updated(changedProperties);

        $(() => {
            
        })
    }

    ChangeLanguage_Click(e: any) {
        let lcid = e.target.textContent;
        sessionStorage.lcid = lcid;
        sessionStorage.translate = JSON.stringify(getLangResources(lcid));

        location.reload();
    }

    logout(e: any) {
        e.preventDefault();
        PostDataForm("user_account/logout.php", null)
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
<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #0d6efd" id="pnlHeader">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="/images/logo.png" alt="" width="60" class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 my-lg-0">
                <li class="nav-item">
                    <a data-bind="text: translate.nav_link_home" class="nav-link" aria-current="page" href="/"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/admin/permission-level-management.html">مدیریت سطوح دسترسی</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/admin/contact-us.html">ارتباط با ما</a>
                </li>
            </ul>
            
            <div class="btn-group btn-group-sm">
                <button class="btn btn-dark" id="faLang" @click="${this.ChangeLanguage_Click}">fa</button>
                <button class="btn btn-dark" id="enLang" @click="${this.ChangeLanguage_Click}">en</button>
            </div>
    
            <ul class="navbar-nav d-flex">
                ${this.PnlLogin}
            </ul>

        </div>
    </div>
</nav>
        `;
    }
}