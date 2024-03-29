﻿import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData, 
    getParameterByName} from '../../cms_general';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

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

        this.ShowPosts();
    }

    @state()
    Title: any = null;
    
    @state()
    Summary: any = null;
    
    @state()
    Content: any = null;

    firstUpdated(changedProperties: any) {

        $(() => {
            
        })
    }

    ShowPosts() {

        let slug = getParameterByName('slug');

        GetData("post/select_post.php", { pac: '18PrB1fS1RtyZ550c5QR5Q', slug: slug})
            .then(data => {
                if(data.length == 1) {

                    document.title = data[0].title;

                    this.Title = data[0].title;
                    this.Summary = data[0].summary;
                    this.Content = html`${unsafeHTML(data[0].content)}`;

                    var meta = document.createElement('meta');
                    meta.name = "keywords";
                    meta.content = data[0].meta_keyword;
                    document.getElementsByTagName('head')[0].appendChild(meta);

                    var meta = document.createElement('meta');
                    meta.name = "description";
                    meta.content = data[0].meta_description;
                    document.getElementsByTagName('head')[0].appendChild(meta);
                }
            })
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">${this.Title}</h1>
        <div class="breadcrumb justify-content-center mb-0">
            <p>${this.Summary}</p>
        </div>
    </div>
</div>
<!-- Page Header End -->

<div class="container-fluid">
    <div class="row col-md-12 p-5">
        ${this.Content}
    </div>
</div>
        `;
    }
}