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

    <header class="myHeader">

        <cms-header></cms-header>

    </header>
    <div class="p-2" style="min-height: calc(100vh - 150px);">

        ${this.ModuleRender}

    </div>
    <footer>

        <cms-footer></cms-footer>

    </footer>
        `;
    }
}