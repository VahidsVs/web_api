import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
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

    private lcid;

    constructor() {
        super();

        this.lcid = getLanguage();
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            
        });
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">About Us</h1>
    </div>
</div>
<!-- Page Header End -->

<div class="container-fluid p-5">
    <p class="text-center">
        MegaTech is an IT company which works in the field of applications, newtork, web design, blockchain and AI. MegaTech is an innovative start-up company.
    </p>
    <h4 class="text-center">
        <b>MegaTech Activity Fields</b>
    </h4>
    <div>
        <img class="img-thumbnail" src="/images/megatech.png">
    </div>
</div>
        `;
    }
}