
var screenWidth = window.innerWidth;

var newWidth = screenWidth * 0.40;
var newsCardWidth = screenWidth * 0.90;


var newWidthInPx = Math.floor(newWidth) + 'px';
const newsCards = document.querySelector(".newsCards")
const newsContainer = document.querySelector(".newsContainer")

const rightBtn = document.getElementById("right")

const leftBtn = document.getElementById("left")


newsContainer.style.width = newsCardWidth + "px"
newsCards.style.width = newsCardWidth + "px"

let newsObjects = [
  { title: "Xəbər 1", text: "This is the text for news 1.", img: "./images/technology-trend-freepik-1647963838.jpg", date: "10/06/2023" },
  { title: "Xəbər 2", text: "This is the text for news 2.", img: "./images/Brad-Blog-Aus-Header-scaled.jpg", date: "10/06/2023" },
  { title: "Xəbər 3", text: "This is the text for news 3.", img: "./images/Tech_4x3_608.jpg", date: "8/06/2023" },
  { title: "Xəbər 4", text: "This is the text for news 4.", img: "./images/images.jpg", date: "10/06/2023" },
  { title: "Xəbər 5", text: "This is the text for news 5.", img: "./images/download.jpg", date: "9/06/2023" },
  { title: "Xəbər 6", text: "This is the text for news 6.", img: "./images/Surveillance-State_QBS_Drones-technology-and-apps_Featured.webp", date: "10/06/2023" },
];

newsObjects.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB;
});

newsObjects.reverse();


newsObjects.forEach((element) => {
  console.log(element);
  const newsDiv = document.createElement("div");
  newsDiv.className = "news";

  newsDiv.style.minWidth = newWidthInPx

  const newsImgDiv = document.createElement("img");
  newsImgDiv.className = "newsImg";
  newsImgDiv.src = element.img;

  const newsTextDiv = document.createElement("div");
  newsTextDiv.className = "newsText";

  const paragraph = document.createElement("p");
  paragraph.textContent = element.title; // Use the title from the newsObjects array

  // Append the paragraph to the newsTextDiv
  newsTextDiv.appendChild(paragraph);


  const newsDateDiv = document.createElement("div");
  newsDateDiv.className = "newsDate";
  newsDateDiv.textContent = "Date: " + element.date;

  // Append the newsImgDiv and newsTextDiv to the main newsDiv
  newsDiv.appendChild(newsImgDiv);
  newsDiv.appendChild(newsTextDiv);
  newsDiv.appendChild(newsDateDiv);

  // Append the main newsDiv to the body of the document
  newsCards.appendChild(newsDiv);
  // Attach the click event handler to the newsCards container


})

newsCards.addEventListener("click", (event) => {
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










let scrollInterval;

function scrollRight() {
  const elementRect = newsCards.getBoundingClientRect();
  const isVisible = elementRect.left < window.innerWidth && elementRect.right > 0;

  if (isVisible) {
    const scrollAmount = newsCards.scrollLeft + newWidth;

    if (scrollAmount >= newsCards.scrollWidth - newsCards.clientWidth) {
      newsCards.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      newsCards.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}


function scrollLeft() {
  const elementRect = newsCards.getBoundingClientRect();
  const isVisible = elementRect.right < window.innerWidth && elementRect.left > 0;

  if (isVisible) {
    const scrollAmount = newsCards.scrollLeft - newWidth;

    if (scrollAmount >= newsCards.scrollWidth - newsCards.clientWidth) {
      newsCards.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      newsCards.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}




rightBtn.addEventListener("click", () => {
  scrollRight()
})
leftBtn.addEventListener("click", () => {
  scrollLeft()
})

const observer = new IntersectionObserver((entries) => {
  const isVisible = entries[0].isIntersecting;
  if (isVisible) {
    clearInterval(scrollInterval);
    scrollInterval = setInterval(scrollRight, 5000);
  }
});

newsCards.addEventListener('scroll', () => {
  clearInterval(scrollInterval);
  scrollInterval = setInterval(scrollRight, 5000);
});

newsCards.addEventListener('click', () => {
  clearInterval(scrollInterval);
  scrollInterval = setInterval(scrollRight, 5000);
});

observer.observe(newsCards);

const maxIterations = 10;
let iterations = 0;

