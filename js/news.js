import { getAllNews } from "../admin/api/news_required.js";


const SwiperConfig = () => {
  new Swiper(".news-slider", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    speed: 1500,
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
      760: {
        slidesPerView: 2
      }
    }
  });

}

let newsObjects = [];

const sliderWrapperNews = document.getElementById('slider-wrapper-news')
const addDateUI = (news) => {
  sliderWrapperNews.innerHTML += `
  <div class="news swiper-slide">
  <img src=${news.img} alt=${news.title} class="newsImg">
  <div class="newsText">
     <p>${news.title}</p>
  </div>
  <div class="newsDate">${news.date}</div>
</div>`
};



// Get All Data
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await getAllNews().then(async (news) => {
      news.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      news.reverse();
      news.forEach((res) => {
        addDateUI(res);
        newsObjects.push(res)
      });
      await SwiperConfig();
    });
  } catch (error) {
    console.error(error);
  }
})

document.addEventListener("click", function (event) {
  const clickedNewsDiv = event.target.closest(".news");
  if (!clickedNewsDiv) {
    return;
  }

  const title = clickedNewsDiv.querySelector(".newsText p").textContent;
  const text = newsObjects.find((news) => news.title === title).text;
  const imgSrc = clickedNewsDiv.querySelector(".newsImg").src;
  const date = clickedNewsDiv.querySelector(".newsDate").textContent.replace("Date: ", "");

  const newsDetails = document.createElement("div");
  newsDetails.classList.add("details");


  const newsDetailsContainer = document.createElement("div");
  newsDetailsContainer.classList.add("newsDetailsContainer");

  const cancel = document.createElement("button");
  cancel.innerHTML = "X";

  const newsTextCont = document.createElement("div");
  newsTextCont.className = "newsTextCont";

  const detailsTitle = document.createElement("h2");
  detailsTitle.textContent = title;

  const detailsImg = document.createElement("img");
  detailsImg.src = imgSrc;

  const detailsText = document.createElement("p");
  detailsText.textContent = text;

  const detailsDate = document.createElement("div");
  detailsDate.className = "detailsDate";
  detailsDate.textContent = "Date: " + date;

  newsDetails.appendChild(cancel);
  newsDetailsContainer.appendChild(detailsImg);
  newsTextCont.appendChild(detailsTitle);
  newsTextCont.appendChild(detailsText);
  newsTextCont.appendChild(detailsDate); // Add the date to the detail page
  newsDetailsContainer.appendChild(newsTextCont)
  newsDetails.appendChild(newsDetailsContainer);
  document.body.appendChild(newsDetails);

  const htmlElement = document.documentElement;

  htmlElement.style.scrollbarWidth = "0"; // Firefox

  cancel.addEventListener("click", () => {
    if (newsDetails) {
      newsDetails.remove();
    }
  });
});