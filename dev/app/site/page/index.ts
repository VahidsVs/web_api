import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { 
    getLanguage,
    getTranslate,
    getDirectionFromLanguage,
    GetData, 
    PostData } from '../../cms_general';
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

    constructor() {
        super();

        this.lcid = getLanguage();
    }

    firstUpdated(changedProperties: any) {

        $(() => {
            //@ts-ignore
            $(".owl-carousel").owlCarousel();
        })
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
<div class="container-fluid project py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Project</h5>
            <h1>Our Recently Completed Projects</h1>
        </div>
        <div class="row g-5">
            <div class="col-md-6 wow fadeIn" data-wow-delay=".5s">
                <div class="project-item">
                    <div class="project-img">
                        <img src="/images/project-2.jpg" class="img-fluid w-100 rounded" alt="">
                        <div class="project-content">
                            <a href="#" class="text-center">
                                <h4 class="text-secondary">Web design</h4>
                                <p class="m-0 text-white">Web Analysis</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 wow fadeIn" data-wow-delay=".5s">
                <div class="project-item">
                    <div class="project-img">
                        <img src="/images/project-1.jpg" class="img-fluid w-100 rounded" alt="">
                        <div class="project-content">
                            <a href="#" class="text-center">
                                <h4 class="text-secondary">Cyber Security</h4>
                                <p class="m-0 text-white">Cyber Security Core</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Project End -->

<!-- Testimonial Start -->
<div class="container-fluid testimonial py-5 mb-5">
    <div class="container">
        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style="max-width: 600px;">
            <h5 class="text-primary">Our Testimonial</h5>
            <h1>Our Client Saying!</h1>
        </div>
        <div class="owl-carousel testimonial-carousel wow fadeIn" data-wow-delay=".5s">
            <div class="testimonial-item border p-4">
                <div class="d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
            <div class="testimonial-item border p-4">
                <div class=" d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
            <div class="testimonial-item border p-4">
                <div class=" d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
            <div class="testimonial-item border p-4">
                <div class=" d-flex align-items-center">
                    <div class="">
                        <img src="/images/avatar.png" alt="">
                    </div>
                    <div class="ms-4">
                        <h4 class="text-secondary">Client Name</h4>
                        <p class="m-0 pb-3">Profession</p>
                        <div class="d-flex pe-5">
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                            <i class="fas fa-star me-1 text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="border-top mt-4 pt-3">
                    <!-- <p class="mb-0">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p> -->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Testimonial End -->
        `;
    }
}