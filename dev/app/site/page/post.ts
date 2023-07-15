import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-post')
class CmsPost extends LitElement {
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

        document.title = "Post";
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            
        })
    }

    render() {
        return html`


        `;
    }
}