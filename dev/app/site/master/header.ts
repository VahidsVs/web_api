import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getCookie, GetData, PostData } from '../../cms_general';
import { getLangResources } from '../../site_localization';
import * as ko from 'knockout';

@customElement('cms-header')
class CmsHeader extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    @state()
    private PnlLoginItems: any = [];
    @state()
    private PnlLogin: any;

    constructor() {
        super();

        //بررسی لاگین بودن شخص
        GetData("user_account/authentication.php", null)
            .then(data => {
                if (data.isAnonymous === true) {
                    this.PnlLoginItems.push(html`
<li class="nav-item">
    <a name="translate" caption="nav_link_login" href="/login.html" class="nav-link"></a>
</li>`);

                    this.requestUpdate();
                }
                else if (data.isAnonymous === false) {
                    var UserName = data.username;

                    var isInRole = data.isInRole;
                            if (isInRole === true) {
                                this.PnlLoginItems.push(html`
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span>${UserName}</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
        <li class="">
            <a href="/admin/index.html" class="dropdown-item" target="_blank"><span class="fa fa-dashboard"></span> <span name="translate" caption="nav_link_admin_dashboard"></span></a>
        </li>
        <li class="">
            <a href="#" class="dropdown-item" @click="${this.logout}"><span class="fa fa-sign-out"></span> <span name="translate" caption="nav_link_logout"></span></a>
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
            <a href="#" class="dropdown-item" @click="${this.logout}"><span class="fa fa-sign-out"></span> <span name="translate" caption="nav_link_logout"></span></a>
        </li>
    </ul>
</li>`);
                            }

                            this.requestUpdate();
                }
                else {
                    this.PnlLoginItems.push(html`
    <li class="nav-item">
        <a name="translate" caption="nav_link_login" href="/login.html" class="nav-link"></a>
    </li>`);
    
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
    }

    updated(changedProperties: any) {
        super.updated(changedProperties);

        let lcid = 'en';//getCookie("lcid");

        $(() => {
            this.ChangeLanguage(lcid);
        })
    }

    ChangeLanguage(lcid: string) {

        $("#faLang").removeClass("active");
        $("#enLang").removeClass("active");
        $("#" + lcid + "Lang").addClass("active");
        
        var resources = getLangResources()[lcid];
        
        document.title = resources[window.location.pathname.toLowerCase()];

        $("[name='translate']").each(function(i, elt){
            $(elt).text(resources[$(elt).attr("caption")]);
        });
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
<div class="container">
    <div class="row" style="padding-top: 20px;">
        <div class="col-sm-3">
            <a class="navbar-brand" href="/">
                <img src="/images/Logo.png" alt="" width="120" class="d-inline-block align-text-top">
            </a>
        </div>
        <div class="col-sm-9">
            <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #282634">
                <div class="container-fluid">
                
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 my-lg-0">
                            
                        </ul>
                
                        <ul class="navbar-nav d-flex" style="font-weight: bold !important; margin-top: 50px; margin-bottom: 10px;">
                            <li class="nav-item">
                                <a name="translate" caption="nav_link_home" class="nav-link" aria-current="page" href="/"></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/admin/index.html">مدیریت</a>
                            </li>
                            ${this.PnlLogin}
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    </div>
</div>
        `;
    }
}