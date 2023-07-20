import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData } from '../../cms_general';

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
            case "cms-index":
                this.ModuleRender = html`<cms-index></cms-index>`
                break;
            case "cms-permissionlevelmanagement":
                this.ModuleRender = html`<cms-permissionlevelmanagement></cms-permissionlevelmanagement>`
                break;
            case "cms-contactus":
                this.ModuleRender = html`<cms-contactus></cms-contactus>`
                break;
            case "cms-postmanagement":
                this.ModuleRender = html`<cms-postmanagement></cms-postmanagement>`
                break;
            case "cms-mediamanagement":
                this.ModuleRender = html`<cms-mediamanagement></cms-mediamanagement>`
                break;
            case "cms-pagemanagement":
                this.ModuleRender = html`<cms-pagemanagement></cms-pagemanagement>`
                break;
        }

        super.performUpdate();
    }

    firstUpdated(changedProperties: any) {

    }

    render() {
        return html`
<cms-notification></cms-notification>

    <header class="myHeader">

        <cms-header></cms-header>

    </header>
    <div class="p-2" style="min-height: calc(100vh - 96px);">

        ${this.ModuleRender}

    </div>
    <footer>

        <cms-footer></cms-footer>

    </footer>
        `;
    }
}