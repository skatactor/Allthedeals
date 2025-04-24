document.addEventListener("DOMContentLoaded", function () {
    function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "", sorting = "price-desc-rank") {
        const baseURL = "https://www.amazon.com/s?";
        const params = new URLSearchParams();

        if (keyword) {
            params.append("k", keyword);
        }

        let rh = "";

        // Discount filter
        if (discount) {
            const discountMin = discount.split("-")[0];
            rh += `p_8:${discountMin}-99`;
        }

        // Add category to lock results correctly
        if (categoryNode) {
            params.append("bbn", categoryNode); // Needed for Amazon category refinement
            rh += rh ? `,n:${categoryNode}` : `n:${categoryNode}`; // Category node required in rh
        }

        // Kindle exclusion for book-related categories
        const bookNodes = ["283155", "4366", "16272", "18", "4"];
        if (bookNodes.includes(categoryNode)) {
            rh += `,n:!154606011`; // Exclude Kindle
        }

        // Prime-only filter
        const primeChecked = document.getElementById("prime-only")?.checked;
        if (primeChecked) {
            rh += `,p_85:2470955011`; // Prime-only filter
        }

        // Extra filters
        if (extraFilters) {
            extraFilters.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                params.append(key, value);
            });
        }

        if (rh) params.append("rh", rh);
        params.append("s", sorting);

        const finalURL = `${baseURL}${params.toString()}&tag=allthedisco04-20`;

        console.log("🔗 Opening Amazon Search:", finalURL);
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function (categoryNode, discount = "", extraFilters = "", sorting = "price-desc-rank") {
        if (!categoryNode) {
            console.error("❌ Missing category node!");
            return;
        }

        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryNode}')"]`);
        if (categoryElement) categoryElement.classList.add("active");

        const keyword = document.getElementById("search-box").value.trim();
        searchDeals(categoryNode, discount, keyword, extraFilters, sorting);
    };

    window.searchDealsFromBar = function () {
        const keyword = document.getElementById("search-box").value.trim();
        const discount = document.getElementById("discount").value;
        const sorting = "price-desc-rank";
        searchDeals("", discount !== "all" ? discount : "", keyword, "", sorting);
    };

    window.toggleSubcategories = function (categoryId) {
        const subcategoryList = document.getElementById(categoryId);
        const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

        if (!subcategoryList) {
            console.error(`❌ No subcategory list found for: ${categoryId}`);
            return;
        }

        document.querySelectorAll(".subcategory-list").forEach(list => list.classList.remove("visible"));
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));

        const isVisible = subcategoryList.classList.contains("visible");
        if (!isVisible) {
            subcategoryList.classList.add("visible");
            if (categoryElement) categoryElement.classList.add("active");
        }
    };

    // Prevent button clicks from toggling subcategories
    document.querySelectorAll(".discount-buttons-grid button").forEach(btn => {
        btn.addEventListener("click", event => event.stopPropagation());
    });
});
