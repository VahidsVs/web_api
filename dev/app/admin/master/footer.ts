import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('cms-footer')
class CmsFooter extends LitElement {
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

    firstUpdated(changedProperties: any) {

    }

    render() {
        return html`
    <div class="text-center">
        <span name="translate" caption="copyright"></span>
    </div>
        `;
    }
}