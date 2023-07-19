import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData,
    PostData
} from '../../cms_general';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

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

    private NewsPosts: any = [];
    private Projects: any = [];
    private Testimonials: any = [];

    constructor() {
        super();

        this.lcid = getLanguage();

        document.title = "Home";
    }

    firstUpdated(changedProperties: any) {

        $(() => {

        })

        this.ShowPosts();
        this.ShowProjects();
        this.ShowTestimonials();
    }

    ShowPosts() {
        GetData("post/select_post.php", { pac: encodeURIComponent('18PrB1fS1RtyZ550c5QR5Q'), limit: 3}, "#pnlNews")
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    this.NewsPosts.push(html`
<div class="col-lg-6 col-xl-4 wow fadeIn" data-wow-delay=".7s">
    <div class="blog-item position-relative bg-light rounded">
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

                this.requestUpdate();
            })
    }

    ShowProjects() {
        GetData("post/select_post.php", { pac: encodeURIComponent('Xe9dNreyFQIVzZbEfp9+xg=='), limit: 2}, "#pnlProjects")
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    this.Projects.push(html`
<div class="col-md-6 wow fadeIn" data-wow-delay=".5s">
    <div class="project-item">
        <div class="project-img">
            <img src="${element.thumbnail_path}" class="img-fluid w-100 rounded" alt="">
            <div class="project-content">
                <a href="${element.slug}" target="_blank" class="text-center">
                    <h4 class="text-secondary">${element.title}</h4>
                    <p class="m-0 text-white">${element.summary}</p>
                </a>
            </div>
        </div>
    </div>
</div>
`)
                }

                this.requestUpdate();
            })
    }

    ShowTestimonials() {
        GetData("post/select_post.php", { pac: encodeURIComponent('mQrpkmSlCzCsPPZpiGXSmw=='), limit: 6 }, "#pnlTestimonials")
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    this.Testimonials.push(html`
<div class="testimonial-item border p-4">
    <div class="d-flex align-items-center">
        <div class="">
            <img src="/images/avatar.png" alt="">
        </div>
        <div class="ms-4">
            <h4 class="text-secondary">${element.title}</h4>
            <!-- <p class="m-0 pb-3"></p> -->
        </div>
    </div>
    <div class="border-top mt-4 pt-3">
        <p class="mb-0">
        ${element.summary}
        </p>
    </div>
</div>
`)
                }

                this.Testimonials = html`
<div class="owl-carousel testimonial-carousel wow fadeIn" data-wow-delay=".5s">
    ${html`${this.Testimonials}`}
</div>
`

                this.requestUpdate();
            })
    }

    updated(changedProperties: any) {
        
        //@ts-ignore
        $(".owl-carousel").owlCarousel();
    }

    render() {
        return html`
<!-- Carousel Start -->
<div class="container-fluid px-0">
    <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true" aria-label="First slide"></li>
            <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <img src="/images/carousel-1.jpg" class="img-fluid" alt="First slide">
                <div class="carousel-caption">
                    <div class="container carousel-content">
                        <h6 class="text-secondary h4 animated fadeInUp">Best IT Solutions</h6>
                        <h1 class="text-white display-1 mb-4 animated fadeInRight">An Innovative IT Solutions Agency</h1>
                        <p class="mb-4 text-white fs-5 animated fadeInDown">
                            IT-Outsourcing, Strong Design, Network & Webstie Security, Advantages, Low Price, High Speed, Support 24/7
                        </p>
                        <a href="/about-us.html" class="me-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">About Us</button></a>
                        <a href="/contact-us.html" class="ms-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></a>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/images/carousel-2.jpg" class="img-fluid" alt="Second slide">
                <div class="carousel-caption">
                    <div class="container carousel-content">
                        <h6 class="text-secondary h4 animated fadeInUp">Best IT Solutions</h6>
                        <h1 class="text-white display-1 mb-4 animated fadeInLeft">Quality Digital Services You Really Need!</h1>
                        <p class="mb-4 text-white fs-5 animated fadeInDown">
                            IT-Outsourcing, Strong Design, Network & Webstie Security, Advantages, Low Price, High Speed, Support 24/7
                        </p>
                        <a href="/about-us.html" class="me-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">About Us</button></a>
                        <a href="/contact-us.html" class="ms-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></a>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>
<!-- Carousel End -->

<!-- Fact Start -->
<div class="container-fluid bg-secondary py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".1s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">99</h1>
                    <h5 class="text-white mt-1">Success in getting happy customer</h5>
                </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".3s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">25</h1>
                    <h5 class="text-white mt-1">Thousands of successful business</h5>
                </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".5s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">120</h1>
                    <h5 class="text-white mt-1">Total clients who love HighTech</h5>
                </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".7s">
                <div class="d-flex counter">
                    <h1 class="me-3 text-primary counter-value">5</h1>
                    <h5 class="text-white mt-1">Stars reviews given by satisfied clients</h5>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Fact End -->

<!-- Services Start -->
<div class="container-fluid services py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Services</h5>
            <h1>Services Built Specifically For Your Business</h1>
        </div>
        <div class="row g-5 services-inner">
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-code fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Web Design</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-file-code fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Web Development</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-external-link-alt fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">UI/UX Design</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fas fa-user-secret fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Web Security</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".5s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fa fa-envelope-open fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Digital Marketing</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".7s">
                <div class="services-item bg-light">
                    <div class="p-4 text-center services-content">
                        <div class="services-content-icon">
                            <i class="fas fa-laptop fa-7x mb-4 text-primary"></i>
                            <h4 class="mb-3">Programming</h4>
                            <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.</p> -->
                            <!-- <a href="" class="btn btn-secondary text-white px-5 py-3 rounded-pill">Read More</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Services End -->

<!-- Project Start -->
<div class="container-fluid project py-5 mb-5" id="pnlProjects">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Project</h5>
            <h1>Our Recently Completed Projects</h1>
        </div>
        <div class="row g-5">
            ${html`${this.Projects}`}
        </div>
    </div>
</div>
<!-- Project End -->

<!-- Blog Start -->
<div class="container-fluid blog py-5 mb-5" id="pnlNews">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Blog</h5>
            <h1>Latest Blog & News</h1>
        </div>
        <div class="row g-5 justify-content-center">
            ${html`${this.NewsPosts}`}
        </div>
        <div class="blog-btn d-flex justify-content-center position-relative px-3 wow fadeIn" data-wow-delay=".3s">
            <div class="blog-icon btn btn-secondary px-3 rounded-pill my-auto">
                <a href="/posts.html" class="btn text-white ">Read More</a>
            </div>
        </div>
    </div>
</div>
<!-- Blog End -->

<!-- Testimonial Start -->
<div class="container-fluid testimonial py-5 mb-5" id="pnlTestimonials">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Testimonial</h5>
            <h1>Our Client Saying!</h1>
        </div>
        ${this.Testimonials}
    </div>
</div>
<!-- Testimonial End -->
        `;
    }
}