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

                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token= ; path=/;expires= Thu, 01 Jan 1970 00: 00: 00 UTC";

                    this.PnlLoginItems.push(html`
<li class="nav-item">
    <a name="translate" caption="nav_link_login" href="/login.html" class="nav-link"></a>
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

                    window.localStorage.removeItem("CMSToken");
                    document.cookie = "token= ; path=/;expires= Thu, 01 Jan 1970 00: 00: 00 UTC";

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
<div class="container-fluid bg-primary">
    <div class="container">
        <nav class="navbar navbar-dark navbar-expand-lg py-0">
            <a class="navbar-brand" href="/">
                <img src="/images/Logo.png" alt="" width="120" class="d-inline-block align-text-top">
            </a>
            <button type="button" class="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                <div class="navbar-nav ms-auto mx-xl-auto p-0">
                    <a href="/" class="nav-item nav-link">Home</a>
                    <a href="/admin/index.html" class="nav-item nav-link">مدیریت</a>
                    ${this.PnlLogin}
                </div>
            </div>
            <div class="d-none d-xl-flex flex-shirink-0">
                <div id="phone-tada" class="d-flex align-items-center justify-content-center me-4">
                    <a href="" class="position-relative animated tada infinite">
                        <i class="fa fa-phone-alt text-white fa-2x"></i>
                        <div class="position-absolute" style="top: -7px; left: 20px;">
                            <span><i class="fa fa-comment-dots text-secondary"></i></span>
                        </div>
                    </a>
                </div>
                <div class="d-flex flex-column pe-4">
                    <span class="text-white-50">Have any questions?</span>
                    <span class="text-secondary">Call: + 0123 456 7890</span>
                </div>
            </div>
        </nav>
    </div>
</div>
        `;
    }
}