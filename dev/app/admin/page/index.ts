import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getCookie, GetData, PostData, PostDataForm } from '../../cms_general';
import * as ko from 'knockout';
import { getLangResources } from '../../admin_localization';

@customElement('cms-index')
class CmsIndex extends LitElement {
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
        data: {
            title: ko.observable(""),
        },
        errors: {
            title: ko.observable(),
        },
        setErrors: function (errors: any) {
            this.errors.title(errors ? errors.title : undefined);
        }
    };

    constructor() {
        super();

        this.lcid = getCookie('lcid');
        this.resources = getLangResources()[this.lcid];

        document.title = this.resources[window.location.pathname.toLowerCase()];
    }

    firstUpdated(changedProperties: any) {
    }

    render() {
        return html`
<div class="container-fluid">
    
</div>
        `;
    }
}