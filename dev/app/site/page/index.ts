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
<div class="container-fluid section1">
    <div class="sheet1 text-light">
        <img class="circle1" src="/images/circle.png">
        <div class="group1 d-flex">
            <div class="d-flex" style="flex-direction: column;justify-content: center;">
                <h1 class="text-center" style="font-weight: 400; font-size: 4rem;">Web Development Studio</h1>
                <p class="text-center" style="font-size: 1.25rem;">
                    IT-Outsourcing, Strong Design, Network & Webstie Security, Advantages, Low Price, High Speed, Support 24/7
                </p>
                <div class="border1"></div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid section2" style="background-color: #000000;">
    <div class="sheet2 text-light">
        <div class="group2 d-flex">
            <div class="d-flex" style="flex-direction: column;justify-content: center;">
                <h1 class="text-center" style="font-weight: 400; font-size: 4rem;">Internet Marketing</h1>
                <p class="text-center" style="font-size: 1.25rem;">
                    Get a winning strategy for promoting your business online, including SEO, advertising and branding
                </p>
            </div>
        </div>
    </div>
</div>
        `;
    }
}