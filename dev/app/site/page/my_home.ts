import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData } from '../../cms_general';
import { getLangResources } from '../../site_localization';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-myhome')
class CmsMyHome extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;
    private resources: any = [];

    constructor() {
        super();

        this.lcid = 'en';
        this.resources = getLangResources()[this.lcid];
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            
        });
    }

    render() {
        return html`
<div class="container-fluid p-5">
    
</div>
        `;
    }
}