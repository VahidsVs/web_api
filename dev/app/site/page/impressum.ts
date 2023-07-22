import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData,
    PostData
} from '../../cms_general';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-impressum')
class CmsImpressum extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    @state()
    private Content: any;

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = "Impressum";
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        });

        GetData("page/select_page.php", { slug: "impressum" })
            .then(data => {
                
                this.Content = html`${unsafeHTML(data[0].content)}`;

                var meta = document.createElement('meta');
                meta.name = "keywords";
                meta.content = data[0].meta_keyword;
                document.getElementsByTagName('head')[0].appendChild(meta);

                var meta = document.createElement('meta');
                meta.name = "description";
                meta.content = data[0].meta_description;
                document.getElementsByTagName('head')[0].appendChild(meta);
            })
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">Impressum</h1>
    </div>
</div>
<!-- Page Header End -->

<div class="container-fluid text-center p-5">

    ${this.Content}

</div>
        `;
    }
}