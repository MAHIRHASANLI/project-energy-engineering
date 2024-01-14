import { getAllPartners } from "../admin/api/partner_request.js";




const partnersSection = document.getElementById('slider-wrapper-partners')

const SwiperConfig = () => {
  new Swiper(".partners-slider", {
    slidesPerView: 4,
    spaceBetween: 50,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    speed: 2000,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      520: {
        slidesPerView: 2
      },
      950: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });

}


const addDateUI = (newPartner) => {
  partnersSection.innerHTML += `
  <div class="card swiper-slide">
    <div class="image-content">
      <img src=${newPartner.img} alt=${newPartner.name} class="card-img">
    </div>
    <div class="card-content">
     <a href="" class="name" title="click me">${newPartner.name}</a>
    </div>
  </div>`
};


// Get All Data
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await getAllPartners().then(async (res) => {
      res.forEach((newPartner) => {
        addDateUI(newPartner);
      })
      await SwiperConfig()
    });
  } catch (error) {
    console.error(error);
  }
})



