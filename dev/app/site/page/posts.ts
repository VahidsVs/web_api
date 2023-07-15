import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-posts')
class CmsPosts extends LitElement {
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

        document.title = "Posts";
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            //@ts-ignore
            $(".owl-carousel").owlCarousel();
        })
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">Posts</h1>
    </div>
</div>
<!-- Page Header End -->

        `;
    }
}