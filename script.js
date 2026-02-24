document.addEventListener("DOMContentLoaded", function () {
    window.getKW = () => document.getElementById("search-box").value.trim();

    window.searchDeals = function(node = "", discount = "", keyword = "", department = "") {
        const baseURL = "https://www.amazon.com/s?";
        const params = new URLSearchParams();

        const minP = document.getElementById("min-price").value;
        const maxP = document.getElementById("max-price").value;
        const sort = document.getElementById("sort-order").value;

        if (keyword) params.append("k", keyword);
        if (department) params.append("i", department);

        let rhParts = [];
        if (node) rhParts.push(`n:${node}`);

        // Handle Discount (p_8)
        if (discount && discount !== "all") {
            const min = discount.split("-")[0];
            rhParts.push(`p_8:${min}-99`);
        }
        
        // Handle Prime
        if (document.getElementById("prime-only")?.checked) {
            rhParts.push("p_85:2470955011");
        }

        if (rhParts.length > 0) {
            params.append("rh", rhParts.join(","));
        }

        if (minP) params.append("low-price", minP);
        if (maxP) params.append("high-price", maxP);
        params.append("s", sort);
        params.append("tag", "allthedisco04-20");

        window.open(baseURL + params.toString(), "_blank");
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
    };
});
