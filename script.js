document.addEventListener("DOMContentLoaded", function () {
    
    // Globals to grab user input easily
    window.getKW = () => document.getElementById("search-box").value.trim();
    window.getDiscount = () => document.getElementById("discount").value;

    window.searchDeals = function(node = "", discount = "", keyword = "", department = "") {
        const baseURL = "https://www.amazon.com/s?";
        const params = new URLSearchParams();

        // 1. Keywords & Department Identification
        if (keyword) params.append("k", keyword);
        if (department) params.append("i", department);
        if (node) params.append("node", node);

        // 2. The Refinement Helper (rh)
        // This is crucial for Amazon to actually trigger the discount filter
        let rhParts = [];
        
        // Add Category Node to RH if present
        if (node) rhParts.push(`n:${node}`);

        // Add Discount (p_8)
        if (discount && discount !== "all") {
            const min = discount.split("-")[0];
            rhParts.push(`p_8:${min}-99`);
        }

        // Add Prime (p_85)
        if (document.getElementById("prime-only")?.checked) {
            rhParts.push("p_85:2470955011");
        }

        if (rhParts.length > 0) {
            params.append("rh", rhParts.join(","));
        }

        // 3. BEST SELLER SORTING
        // 'featured-rank' pulls the best-selling/trending items
        params.append("s", "featured-rank");

        // 4. Affiliate Tag
        params.append("tag", "allthedisco04-20");

        const finalURL = baseURL + params.toString();
        window.open(finalURL, "_blank");
    };

    // Generic search from top bar
    window.searchDealsFromBar = function() {
        const kw = getKW();
        const disc = getDiscount();
        // Uses 'aps' (All Product Search) for the general bar
        searchDeals("", disc !== "all" ? disc : "", kw, "aps");
    };
});
