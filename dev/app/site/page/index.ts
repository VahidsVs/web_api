import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData } from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-index')
class CmsIndex extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    @state()
    slides: any = [];

    @state()
    slideButtons: any = [];

    @state()
    OrderText: any;

    constructor() {
        super();
    }

    firstUpdated(changedProperties: any) {
    }

    render() {
        return html`

        `;
    }
}