import { updateViewsWebSite } from "../admin/api/dashboard_request.js";



document.addEventListener("DOMContentLoaded", async () => {
    try {
        await updateViewsWebSite();
    } catch (error) {
        console.error(error);
    }
})