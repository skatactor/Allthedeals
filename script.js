function toggleSubcategories(categoryId) {
    let subcategoryList = document.getElementById(categoryId);
    if (subcategoryList.style.display === "none" || subcategoryList.style.display === "") {
        subcategoryList.style.display = "block";
    } else {
        subcategoryList.style.display = "none";
    }
}

function searchDeals() {
    let query = document.getElementById('search-box').value;
    let category = document.getElementById('category').value;
    let discount = document.getElementById('discount').value;

    let amazonBaseURL = "https://www.amazon.com/s?";

    if (query) {
        amazonBaseURL += `k=${encodeURIComponent(query)}`;
    }

    if (category !== "all") {
        amazonBaseURL += `&rh=n%3A${category}`;
    }

    if (discount !== "all") {
        amazonBaseURL += `&rh=p_8%3A${discount}`;
    }

    amazonBaseURL += `&tag=allthedisco04-20`;
    window.open(amazonBaseURL, "_blank");
}
