<script setup>
import { themeColor } from "../config.js";
import { BootstrapArrowLeft, BootstrapArrowRight } from "../helper/icons_generator.js";

const heading = "Testimonials";
const subHeading = "Our Customers Feedbck";
const testimonials = [
  {
    name: "James Anderson",
    designation: "Facebook, Product Lead",
    quote:
      '"Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."',
    photo: "images/person_1.jpg",
  },
  {
    name: "James Anderson",
    designation: "Facebook, Product Lead",
    quote:
      '"Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."',
    photo: "images/person_2.jpg",
  },
  {
    name: "James Anderson",
    designation: "Facebook, Product Lead",
    quote:
      '"Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."',
    photo: "images/person_3.jpg",
  },
];
</script>

<template>
  <div class="untree_co-section" id="testimonials-section">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-4 mb-5 text-center text-lg-left mb-lg-0"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <div class="mb-4">
            <span class="caption" :style="[{ color: themeColor }]">{{
              heading
            }}</span>
            <h2 class="heading">{{ subHeading }}</h2>
          </div>
          <div>
            <a
              href="#"
              class="js-custom-prev-v2 cusotm-slider-nav custom-prev"
              style="margin-right: 5px"
            >
              <span>
                <BootstrapArrowLeft class="bi bi-arrow-left" width="1em" height="1em" />
              </span>
            </a>
            <a href="#" class="js-custom-next-v2 cusotm-slider-nav custom-next">
              <span>
                <BootstrapArrowRight class="bi bi-arrow-right" width="1em" height="1em" />
              </span>
            </a>
          </div>
        </div>
        <div class="col-lg-8" data-aos="fade" data-aos-delay="200">
          <div class="owl-2-slider owl-carousel">
            <div class="item">
              <div class="untree_co-testimonial d-flex">
                <div class="text">
                  <blockquote>
                    {{ testimonials[0].quote }}
                  </blockquote>
                  <div class="author d-flex">
                    <div class="pic mr-3">
                      <img
                        :src="testimonials[0].photo"
                        alt="Image"
                        class="img-fluid"
                      />
                    </div>
                    <div>
                      <strong class="d-block">{{ testimonials[0].name }}</strong
                      ><span class="d-block">{{
                        testimonials[0].designation
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="untree_co-testimonial d-flex">
                <div class="text">
                  <blockquote>
                    {{ testimonials[1].quote }}
                  </blockquote>
                  <div class="author d-flex">
                    <div class="pic mr-3">
                      <img
                        :src="testimonials[1].photo"
                        alt="Image"
                        class="img-fluid"
                      />
                    </div>
                    <div>
                      <strong class="d-block">{{ testimonials[1].name }}</strong
                      ><span class="d-block">{{
                        testimonials[1].designation
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="untree_co-testimonial d-flex">
                <div class="text">
                  <blockquote>
                    {{ testimonials[2].quote }}
                  </blockquote>
                  <div class="author d-flex">
                    <div class="pic mr-3">
                      <img
                        :src="testimonials[2].photo"
                        alt="Image"
                        class="img-fluid"
                      />
                    </div>
                    <div>
                      <strong class="d-block">{{ testimonials[2].name }}</strong
                      ><span class="d-block">{{
                        testimonials[2].designation
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
