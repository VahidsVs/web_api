import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData, PostData, PostDataForm } from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-index')
class CmsIndex extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

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