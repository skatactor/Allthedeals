document.addEventListener("DOMContentLoaded", function () {
    function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "", sorting = "price-desc-rank") {
        let baseURL = "https://www.amazon.com/s?";
        let params = new URLSearchParams();

        if (keyword) {
            params.append("k", keyword);
        }

        if (categoryNode) {
            params.append("bbn", categoryNode);
        }

        let rh = "";

        if (discount) {
            let discountMin = discount.split("-")[0];
            rh += `p_8:${discountMin}-99`;
        }

        // ✅ Prime filter if checkbox checked
        const primeChecked = document.getElementById("prime-only")?.checked;
        if (primeChecked) {
            rh += rh ? `,p_85:2470955011` : `p_85:2470955011`;
        }

        if (rh) {
            params.append("rh", rh);
        }

        if (extraFilters) {
            extraFilters.split("&").forEach(filter => {
                let [key, value] = filter.split("=");
                params.append(key, value);
            });
        }

        params.append("s", sorting);

        const finalURL = baseURL + params.toString() + "&tag=allthedisco04-20";
        console.log("🔗 Opening Amazon Search:", finalURL);
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function (categoryNode, discount = "", extraFilters = "", sorting = "price-desc-rank") {
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
        searchDeals(categoryNode, discount, keyword, extraFilters, sorting);
    };

    window.searchDealsFromBar = function () {
        let keyword = document.getElementById("search-box").value.trim();
        let discount = document.getElementById("discount").value;
        const sorting = "price-desc-rank"; // ✅ Sort High to Low by default
        searchDeals("", discount !== "all" ? discount : "", keyword, "", sorting);
    };

    window.toggleSubcategories = function (categoryId) {
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
        } else {
            document.querySelectorAll(".subcategory-list").forEach(list => list.classList.remove("visible"));
            subcategoryList.classList.add("visible");
            categoryElement.classList.add("active");
        }
    };

    document.querySelectorAll(".discount-buttons-grid button").forEach(btn => {
        btn.addEventListener("click", e => e.stopPropagation());
    });
});
