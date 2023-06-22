import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData } from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-aboutus')
class CmsAboutUs extends LitElement {
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
        
        `;
    }
}