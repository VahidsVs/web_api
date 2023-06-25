import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getCookie } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../admin_localization';

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
    private resources: any = [];

    private Model = {
        translate: {
            copyright: ko.observable(),
        },
    };

    constructor() {
        super();

        this.lcid = getCookie('lcid');
        this.resources = getLangResources()[this.lcid];

        document.title = this.resources[window.location.pathname.toLowerCase()];

        this.Model.translate.copyright(this.resources['copyright']);
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