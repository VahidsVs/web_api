import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GetData } from '../../cms_general';
import * as ko from 'knockout';

@customElement('cms-footer')
class CmsFooter extends LitElement {
    createRenderRoot() {
        return this;
    }

    private Model = {
        data: {
            CurrentDate: ko.observable(),
        },
    }

    constructor() {
        super();

        this.Model.data.CurrentDate(new Date().getFullYear());
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        ko.applyBindings(this.Model, document.getElementById("pnlFooter"));
    }

    render() {
        return html`
<div class="container-fuild text-center" id="pnlFooter">
    <!-- <span name="translate" caption="copyright"></span> -->
    Ⓒ <span data-bind="text: data.CurrentDate"></span> , <a href="https://megatechapp.com">MegaTech</a> All right reserved. 
</div>
        `;
    }
}