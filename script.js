document.addEventListener("DOMContentLoaded", function () {
    window.getKW = () => document.getElementById("search-box").value.trim();

    window.searchDeals = function(node = "", discount = "", keyword = "", department = "") {
        const baseURL = "https://www.amazon.com/s?";
        const params = new URLSearchParams();

        const minP = document.getElementById("min-price").value;
        const maxP = document.getElementById("max-price").value;
        const sort = document.getElementById("sort-order").value;

        // 1. Keyword handling
        if (keyword) params.append("k", keyword);
        
        // 2. Department 'i' is the broadest filter
        if (department) params.append("i", department);

        // 3. Stricter Refinement Chain
        let rhParts = [];
        
        // n:node locks the category so 'Spider-Man' stays in Books
        if (node) rhParts.push(`n:${node}`);

        // p_8 is the discount
        if (discount && discount !== "all") {
            const min = discount.split("-")[0];
            rhParts.push(`p_8:${min}-99`);
        }
        
        // p_85 is Prime
        if (document.getElementById("prime-only")?.checked) {
            rhParts.push("p_85:2470955011");
        }

        // Apply chained refinements
        if (rhParts.length > 0) {
            params.append("rh", rhParts.join(","));
        }

        // 4. Price & Sort
        if (minP) params.append("low-price", minP);
        if (maxP) params.append("high-price", maxP);
        params.append("s", sort);
        
        // Updated Tag
        params.append("tag", "allthedisco0b-20");

        const finalURL = baseURL + params.toString();
        window.open(finalURL, "_blank");
    };

    window.searchDealsFromBar = function() {
        const disc = document.getElementById("discount-main").value;
        searchDeals("", disc, getKW(), "aps");
    };

    window.resetFilters = function() {
        document.getElementById("search-box").value = "";
        document.getElementById("min-price").value = "";
        document.getElementById("max-price").value = "";
        document.getElementById("prime-only").checked = false;
        document.getElementById("discount-main").value = "50-99";
        document.getElementById("sort-order").value = "featured-rank";
    };
});
