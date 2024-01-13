import { getViewsWebSite } from '../api/dashboard_request.js';


// Get All Data
const totalDay = document.querySelector(".total-viewing-day");
const totalMonth = document.querySelector(".total-viewing-month");

getViewsWebSite().then((statistic) => {
    totalDay.textContent += statistic.view;
    totalMonth.textContent = statistic.view * 3;
});



