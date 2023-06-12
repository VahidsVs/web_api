import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData } from '../../cms_general';

@customElement('cms-footer')
class CmsFooter extends LitElement {
    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
    }

    firstUpdated(changedProperties: any) {

        
    }

    render() {
        return html`
<div class="container-fuild text-center">
    <span name="translate" caption="copyright"></span>
</div>
        `;
    }
}