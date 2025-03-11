document.addEventListener("DOMContentLoaded", function () {
    // Function to search deals
    function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "") {
        let baseURL = "https://www.amazon.com/s?";
        let params = new URLSearchParams();

        // Add keyword if provided
        if (keyword) {
            params.append("k", keyword);
        }

        // Add category node if provided
        if (categoryNode) {
            params.append("n", categoryNode);
        }

        // Add discount range if provided
        if (discount) {
            let discountMin = parseInt(discount) * 100; // Convert 60 → 6000
            let discountMax = discountMin + 99; // Convert 6000 → 6099
            params.append("rh", `p_n_pct-off-with-tax:${discountMin}-${discountMax}`);
        }

        // Add extra filters if provided
        if (extraFilters) {
            extraFilters.split("&").forEach(filter => {
                let [key, value] = filter.split("=");
                params.append(key, value);
            });
        }

        // Construct the final URL
        let finalURL = baseURL + params.toString();
        console.log("🔗 Opening Amazon Search:", finalURL);
        window.open(finalURL, "_blank");
    }

    // Function to search deals by category
    window.searchDealsByCategory = function (categoryNode, discount = "", extraFilters = "") {
        if (!categoryNode) {
            console.error("❌ Error: Missing category node!");
            return;
        }

        // Remove active class from all categories
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));

        // Add active class to the selected category
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryNode}')"]`);
        if (categoryElement) {
            categoryElement.classList.add("active");
        }

        // Get the keyword from the search box
        let keyword = document.getElementById("search-box").value.trim();
        console.log(`🔎 Searching in Category: ${categoryNode} | Discount: ${discount} | Filters: ${extraFilters} | Keyword: ${keyword}`);

        // Call the searchDeals function
        searchDeals(categoryNode, discount, keyword, extraFilters);
    };

    // Function to search deals from the search bar
    window.searchDealsFromBar = function () {
        // Get the keyword and discount from the search bar
        let keyword = document.getElementById("search-box").value.trim();
        let discount = document.getElementById("discount").value;
        console.log(`🔎 Searching: Keyword: ${keyword} | Discount: ${discount}`);

        // Call the searchDeals function
        searchDeals("", discount !== "all" ? discount : "", keyword, "");
    };

    // Function to toggle subcategories
    window.toggleSubcategories = function (categoryId) {
        let subcategoryList = document.getElementById(categoryId);
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

        // Remove active class from all categories
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));

        // Toggle the visibility of the subcategory list
        if (subcategoryList.classList.contains("visible")) {
            subcategoryList.classList.remove("visible");
            categoryElement.classList.remove("active");
        } else {
            // Hide all other subcategory lists
            document.querySelectorAll(".subcategory-list").forEach(list => list.classList.remove("visible"));
            subcategoryList.classList.add("visible");
            categoryElement.classList.add("active");
        }
    };
});
