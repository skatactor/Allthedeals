// Function to handle search bar
function searchDeals() {
    const query = document.getElementById('search-box').value;
    const discount = document.getElementById('discount').value;
    let url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=allthedisco04-20`;

    if (discount !== "all") {
        url += `&rh=p_8%3A${discount}`;
    }

    window.open(url, "_blank");
}

// Function to toggle subcategories
function toggleSubcategories(categoryId) {
    const subcategoryList = document.getElementById(categoryId);
    const discountButtons = document.getElementById(`${categoryId}-buttons`);

    if (subcategoryList.style.display === "none" || subcategoryList.style.display === "") {
        subcategoryList.style.display = "block";
        discountButtons.style.display = "grid";
    } else {
        subcategoryList.style.display = "none";
        discountButtons.style.display = "none";
    }
}