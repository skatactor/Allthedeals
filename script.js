document.addEventListener("DOMContentLoaded", function() {
    function searchDeals(category = "", discount = "", keyword = "") {
        let baseURL = "https://www.amazon.com/s?";
        let params = new URLSearchParams();

        if (keyword) {
            params.append("k", keyword); // Add search keyword if entered
        }

        if (category) {
            params.append("i", category); // Filter by category if selected
        }

        if (discount) {
            params.append("rh", `p_8:${discount}`); // Apply discount filter
        }

        let finalURL = baseURL + params.toString();
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function(category, discount = "") {
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${category}')"]`);
        if (categoryElement) {
            categoryElement.classList.add("active");
        }
        let keyword = document.getElementById("search-box").value.trim();
        searchDeals(category, discount, keyword);
    };

    window.searchDealsFromBar = function() {
        let keyword = document.getElementById("search-box").value.trim();
        let discount = document.getElementById("discount").value;
        searchDeals("", discount !== "all" ? discount : "", keyword);
    };

    window.toggleSubcategories = function(categoryId) {
        let subcategoryList = document.getElementById(categoryId);
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));

        if (subcategoryList.style.display === "none" || subcategoryList.style.display === "") {
            subcategoryList.style.display = "block";
            categoryElement.classList.add("active");
        } else {
            subcategoryList.style.display = "none";
            categoryElement.classList.remove("active");
        }
    };
});
