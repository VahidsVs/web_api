import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage, 
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData, 
    PostDataForm } from '../../cms_general';
import * as ko from 'knockout';

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

        this.lcid = getLanguage();

        document.title = getTranslate('menu_admin_dashboard');
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