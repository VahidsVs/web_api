import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
 } from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-footer')
class CmsFooter extends LitElement {
    createRenderRoot() {
        return this;
    }

//    static get styles() {
//        return css`
//`;
//    }

    private lcid;

    private Model = {
        translate: {
            copyright: ko.observable(),
        },
    };

    constructor() {
        super();

        this.lcid = getLanguage();

        this.Model.translate.copyright(getTranslate('copyright'));
    }

    firstUpdated(changedProperties: any) {

        ko.applyBindings(this.Model, document.getElementById("pnlFooter"));

    }

    render() {
        return html`
    <div class="text-center" id="pnlFooter">
        <span data-bind="text: translate.copyright"></span>
    </div>
        `;
    }
}