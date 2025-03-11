// Toggle subcategories visibility
function toggleSubcategories(categoryId) {
    const subcategoryList = document.getElementById(categoryId);
    if (subcategoryList) {
        subcategoryList.classList.toggle('visible');
    }
}

// Search deals by category and discount range
function searchDealsByCategory(nodeId, discountRange) {
    const [minDiscount, maxDiscount] = discountRange.split('-');
    const url = `https://www.amazon.com/s?rh=n%3A${nodeId}%2Cp_n_pct-off-with-tax%3A${minDiscount}00-${minDiscount}99`;
    window.open(url, '_blank');
}

// Search deals from the search bar
function searchDealsFromBar() {
    const keyword = document.getElementById("search-box").value.trim();
    const discount = document.getElementById("discount").value;
    searchDeals("", discount !== "all" ? discount : "", keyword);
}

// Construct URL and open Amazon search results
function searchDeals(categoryNode = "", discount = "", keyword = "") {
    let baseURL = "https://www.amazon.com/s?";
    let params = new URLSearchParams();

    if (keyword) {
        params.append("k", keyword); // Add search keyword if entered
    }

    if (categoryNode) {
        params.append("n", categoryNode); // Use category node for filtering
    }

    if (discount) {
        params.append("rh", `p_n_pct-off-with-tax:${discount}00-${discount}99`); // Correct discount filter
    }

    let finalURL = baseURL + params.toString();
    window.open(finalURL, "_blank");
}
