document.addEventListener("DOMContentLoaded", function () {
    function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "", sorting = "price-desc-rank") {
        const baseURL = "https://www.amazon.com/s?";
        const params = new URLSearchParams();

        if (keyword) params.append("k", keyword);
        if (categoryNode) params.append("bbn", categoryNode);
        if (discount) {
            const discountMin = discount.split("-")[0];
            params.append("rh", `p_8:${discountMin}-99`);
        }
        if (extraFilters) {
            extraFilters.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                params.append(key, value);
            });
        }

        params.append("s", sorting);
        const finalURL = `${baseURL}${params.toString()}&tag=allthedisco04-20`;

        console.log("🔗 Opening Amazon Search:", finalURL);
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function (categoryNode, discount = "", extraFilters = "", sorting = "price-asc-rank") {
        if (!categoryNode) {
            console.error("❌ Missing category node!");
            return;
        }

        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryNode}')"]`);
        if (categoryElement) categoryElement.classList.add("active");

        const keyword = document.getElementById("search-box").value.trim();
        console.log(`🔎 Category: ${categoryNode} | Discount: ${discount} | Keyword: ${keyword}`);
        searchDeals(categoryNode, discount, keyword, extraFilters, sorting);
    };

    window.searchDealsFromBar = function () {
        const keyword = document.getElementById("search-box").value.trim();
        const discount = document.getElementById("discount").value;
        console.log(`🔎 Bar Search | Keyword: ${keyword} | Discount: ${discount}`);
        searchDeals("", discount !== "all" ? discount : "", keyword, "", "price-asc-rank");
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

    // 🔒 Prevent button clicks from toggling subcategories
    document.querySelectorAll(".discount-buttons-grid button").forEach(btn => {
        btn.addEventListener("click", event => {
            event.stopPropagation();
        });
    });
});
