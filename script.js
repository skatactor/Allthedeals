document.addEventListener("DOMContentLoaded", function () {
    // Helper to grab the search box value
    window.getKW = () => document.getElementById("search-box").value.trim();

    // The primary engine for all searches
    window.searchDeals = function(node = "", discount = "", keyword = "", department = "", useP75 = false, extraRh = "") {
        const baseURL = "https://www.amazon.com/s?";
        const params = new URLSearchParams();

        const minP = document.getElementById("min-price").value;
        const maxP = document.getElementById("max-price").value;
        const sort = document.getElementById("sort-order").value;

        // Set Department and Keyword
        if (department) params.append("i", department);
        if (keyword) params.append("k", keyword);

        let rhParts = [];
        if (node) rhParts.push(`n:${node}`);
        if (extraRh) rhParts.push(extraRh);

        // SOLD BY AMAZON FILTER (EMI Parameter)
        if (document.getElementById("amazon-only") && document.getElementById("amazon-only").checked) {
            params.append("emi", "ATVPDKIKX0DER");
        }

        // DISCOUNT LOGIC
        if (discount && discount !== "all") {
            const min = discount.split("-")[0];
            const max = discount.split("-")[1] || "99";
            
            if (useP75) {
                // Hard filter for lifestyle/tech
                let currentRh = rhParts.join(",");
                params.append("rh", currentRh + `,p_75:${min}-${max}`);
            } else {
                // Soft filter for books/comics
                rhParts.push(`p_8:${min}-99`);
                params.append("rh", rhParts.join(","));
            }
        } else {
            if (rhParts.length > 0) params.append("rh", rhParts.join(","));
        }
        
        // PRIME FILTER
        if (document.getElementById("prime-only") && document.getElementById("prime-only").checked) {
            let currentRh = params.get("rh") || "";
            params.set("rh", currentRh + (currentRh ? "," : "") + "p_85:2470955011");
        }

        // PRICE & SORT
        if (minP) params.append("low-price", minP);
        if (maxP) params.append("high-price", maxP);
        params.append("s", sort);
        
        // AFFILIATE TAG
        params.append("tag", "allthedisco0b-20");

        const finalURL = baseURL + params.toString();
        window.open(finalURL, "_blank");
    };

    // Triggered by the main "Find My Deals" button
    window.searchDealsFromBar = function() {
        const disc = document.getElementById("discount-main").value;
        searchDeals("", disc, getKW(), "aps", false);
    };

    // Resets everything to default
    window.resetFilters = function() {
        document.getElementById("search-box").value = "";
        document.getElementById("min-price").value = "";
        document.getElementById("max-price").value = "";
        if(document.getElementById("prime-only")) document.getElementById("prime-only").checked = false;
        if(document.getElementById("amazon-only")) document.getElementById("amazon-only").checked = false;
        document.getElementById("discount-main").value = "50-99";
        document.getElementById("sort-order").value = "relevancerank";
    };

    // Web Share API for Mobile
    window.shareSite = function() {
        if (navigator.share) {
            navigator.share({
                title: 'All The Discounts',
                text: 'The best way to find hidden Amazon deals!',
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("Copy this link to share: " + window.location.href);
        }
    };
});
