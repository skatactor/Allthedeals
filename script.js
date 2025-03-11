document.addEventListener("DOMContentLoaded", function() {
    function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "") {
        let baseURL = "https://www.amazon.com/s?";
        let params = new URLSearchParams();

        if (keyword) {
            params.append("k", keyword);
        }

        if (categoryNode) {
            params.append("n", categoryNode);
        }

        if (discount) {
            params.append("rh", `p_8:${discount}-99`); // Fix: Use `p_8` for discount filtering
        }

        if (extraFilters) {
            extraFilters.split("&").forEach(filter => {
                let [key, value] = filter.split("=");
                params.append(key, value);
            });
        }

        let finalURL = baseURL + params.toString();
        console.log("🔗 Opening Amazon Search:", finalURL);
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function(categoryNode, discount = "", extraFilters = "") {
        if (!categoryNode) {
            console.error("❌ Error: Missing category node!");
            return;
        }

        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryNode}')"]`);
        if (categoryElement) {
            categoryElement.classList.add("active");
        }

        let keyword = document.getElementById("search-box").value.trim();
        console.log(`🔎 Searching in Category: ${categoryNode} | Discount: ${discount} | Filters: ${extraFilters} | Keyword: ${keyword}`);

        searchDeals(categoryNode, discount, keyword, extraFilters);
    };

    window.searchDealsFromBar = function() {
        let keyword = document.getElementById("search-box").value.trim();
        let discount = document.getElementById("discount").value;
        console.log(`🔎 Searching: Keyword: ${keyword} | Discount: ${discount}`);
        searchDeals("", discount !== "all" ? discount : "", keyword, "");
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
