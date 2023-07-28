import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData,
    PostData,
    getParameterByName
} from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cms-posts')
class CmsPosts extends LitElement {
    createRenderRoot() {
        return this;
    }

    //    static get styles() {
    //        return css`
    //`;
    //    }

    private lcid;

    private NewsPosts: any = [];
    private Pagination: any = [];

    private currentPage = 1;

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = "Posts";

        let page = getParameterByName("page");
        if (page) {
            try {
                this.currentPage = parseInt(page);
            }
            catch {

            }
        }
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        this.ShowPosts();
    }

    ShowPosts() {
        let pageSize = 2;

        GetData("post/select_post_pagination.php", { pac: '18PrB1fS1RtyZ550c5QR5Q', pageSize: pageSize, page: this.currentPage })
            .then(item => {
                for (let i = 0; i < item.data.length; i++) {
                    const element = item.data[i];
                    this.NewsPosts.push(html`
<div class="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".7s">
    <div class="blog-item position-relative bg-light rounded h-100">
        <img src="${element.thumbnail_path}" class="img-fluid w-100 rounded-top" alt="">
        <span class="position-absolute px-4 py-3 bg-primary text-white rounded" style="top: -28px; right: 20px;">${element.cat_title}</span>
        <div class="blog-btn d-flex justify-content-center position-relative px-3" style="margin-top: -75px;">
            <div class="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
                <a href="/post.html?slug=${element.slug}" class="btn text-white ">Read More</a>
            </div>
        </div>
        <div class="blog-content text-center position-relative px-3" style="margin-top: -25px;">
            <img src="/images/avatar.png" class="img-fluid rounded-circle border border-4 border-white mb-3" alt="">
            <h5 class="">By ${element.fullname}</h5>
            <span class="text-secondary">${new Date(element.updated_at).toDateString()}</span>
            <p class="py-2">${element.summary}</p>
        </div>
    </div>
</div>
`)

                }

                this.Pagination.push(html`
<li class="page-item ${this.currentPage == 1 ? "disabled" : ""}">
    <a class="page-link" href="/posts.html?page=${this.currentPage - 1}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
    </a>
</li>
                    `);

                let totalData = item.total;
                let totalPages = Math.ceil(totalData / pageSize);

                for (let i = 1; i <= totalPages; i++) {
                    this.Pagination.push(html`
<li class="page-item ${this.currentPage == i ? "active" : ""}">
    <a class="page-link" href="/posts.html?page=${i}">${i}</a>
</li>
                    `);
                }

                this.Pagination.push(html`
<li class="page-item ${this.currentPage == totalPages ? "disabled" : ""}">
    <a class="page-link" href="/posts.html?page=${this.currentPage + 1}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
    </a>
</li>
                    `);

                this.requestUpdate();
            })
    }

    render() {
        return html`
<!-- Page Header Start -->
<div class="container-fluid page-header py-5">
    <div class="container text-center py-5">
        <h1 class="display-2 text-white mb-4 animated slideInDown">Posts</h1>
    </div>
</div>
<!-- Page Header End -->

<!-- Blog Start -->
<div class="container-fluid blog py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Blog</h5>
            <h1>Latest Blog & News</h1>
        </div>
        <div class="row g-5 justify-content-center p-2">
            ${html`${this.NewsPosts}`}
        </div>
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                ${this.Pagination}
            </ul>
        </nav>
    </div>
</div>
<!-- Blog End -->

        `;
    }
}