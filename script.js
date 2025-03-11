document.addEventListener("DOMContentLoaded", function() {
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

    window.searchDealsByCategory = function(categoryNode, discount = "") {
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryNode}')"]`);
        if (categoryElement) {
            categoryElement.classList.add("active");
        }
        let keyword = document.getElementById("search-box").value.trim();
        searchDeals(categoryNode, discount, keyword);
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

        if (subcategoryList.classList.contains("visible")) {
            subcategoryList.classList.remove("visible");
            categoryElement.classList.remove("active");
        } else {
            document.querySelectorAll(".subcategory-list").forEach(list => list.classList.remove("visible"));
            subcategoryList.classList.add("visible");
            categoryElement.classList.add("active");
        }
    };
});
