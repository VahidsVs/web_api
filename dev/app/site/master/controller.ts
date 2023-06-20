import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('cms-controller')
class CmsController extends LitElement {
    createRenderRoot() {
        return this;
    }

//    static get styles() {
//        return css`
//`;
//    }

    constructor() {
        super();
    }

    @property()
    ComponentName: string;

    @state()
    ModuleRender: any;

    async performUpdate() {

        switch (this.ComponentName) {
            case "cms-accessdenied":
                this.ModuleRender = html`<cms-accessdenied></cms-accessdenied>`
                break;
            case "cms-index":
                this.ModuleRender = html`<cms-index></cms-index>`
                break;
            case "cms-myhome":
                this.ModuleRender = html`<cms-myhome></cms-myhome>`
                break;
            case "cms-login":
                this.ModuleRender = html`<cms-login></cms-login>`
                break;
            case "cms-register":
                this.ModuleRender = html`<cms-register></cms-register>`
                break;
        }

        super.performUpdate();
    }

    firstUpdated(changedProperties: any) {

    }

    render() {
        return html`
<cms-notification></cms-notification>
<!-- Spinner Start -->
<div id="spinner" class="show position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
    <div class="spinner-grow text-primary" role="status"></div>
</div>
<!-- Spinner End -->

<!-- Topbar Start -->
<div class="container-fluid bg-dark py-2 d-none d-md-flex">
    <div class="container">
        <div class="d-flex justify-content-between topbar">
            <div class="top-info">
                <small class="me-3 text-white-50"><a href="#"><i class="fas fa-map-marker-alt me-2 text-secondary"></i></a>23 Ranking Street, New York</small>
                <small class="me-3 text-white-50"><a href="#"><i class="fas fa-envelope me-2 text-secondary"></i></a>Email@Example.com</small>
            </div>
            <div id="note" class="text-secondary d-none d-xl-flex"><small>Note : We help you to Grow your Business</small></div>
            <div class="top-link">
                <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-facebook-f text-primary"></i></a>
                <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-twitter text-primary"></i></a>
                <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-instagram text-primary"></i></a>
                <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle me-0"><i class="fab fa-linkedin-in text-primary"></i></a>
            </div>
        </div>
    </div>
</div>
<!-- Topbar End -->

<!-- Navbar Start -->
    <cms-header></cms-header>
<!-- Navbar End -->

<div class="" style="min-height: calc(100vh - 150px);">

    ${this.ModuleRender}

</div>

<!-- Footer Start -->
    <cms-footer></cms-footer>
<!-- Footer End -->
        `;
    }
}