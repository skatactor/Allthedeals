document.addEventListener("DOMContentLoaded", function () {
    function searchDeals(category = "", discount = "", keyword = "") {
        let baseURL = "https://www.amazon.com/s?";
        let params = new URLSearchParams();

        if (keyword) {
            params.append("k", keyword); // Add search keyword if entered
        }

        if (category) {
            params.append("bbn", category); // Filter by category using Browse Node ID
        }

        if (discount) {
            params.append("rh", `p_8:${discount}`); // Apply discount filter
        }

        params.append("tag", "allthedisco04-20"); // Amazon affiliate tracking
        params.append("s", "price-desc-rank"); // Sort by highest discount

        let finalURL = baseURL + params.toString();
        console.log(`🔗 Opening Amazon Search: ${finalURL}`);
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function (category, discount = "") {
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${category}')"]`);
        if (categoryElement) {
            categoryElement.classList.add("active");
        }
        let keyword = document.getElementById("search-box").value.trim();
        searchDeals(category, discount, keyword);
    };

    window.searchDealsFromBar = function () {
        let keyword = document.getElementById("search-box").value.trim();
        let discount = document.getElementById("discount").value;
        searchDeals("", discount !== "all" ? discount : "", keyword);
    };

    window.toggleSubcategories = function (categoryId) {
        // Hide all subcategories before opening a new one
        document.querySelectorAll(".subcategory-list").forEach(list => {
            if (list.id !== categoryId) {
                list.classList.remove("visible");
                list.style.display = "none";
            }
        });

        let subcategoryList = document.getElementById(categoryId);
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

        if (!subcategoryList) {
            console.error(`❌ No subcategory list found for: ${categoryId}`);
            return;
        }

        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));

        if (subcategoryList.classList.contains("visible")) {
            subcategoryList.classList.remove("visible");
            categoryElement.classList.remove("active");
            subcategoryList.style.display = "none";
        } else {
            subcategoryList.classList.add("visible");
            categoryElement.classList.add("active");
            subcategoryList.style.display = "block";
        }
    };
});
