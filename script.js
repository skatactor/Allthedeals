document.addEventListener("DOMContentLoaded", function () {
  function searchDeals(
    categoryNode = "",
    discount = "",
    keyword = "",
    extraFilters = "",
    sorting = "price-desc-rank"
  ) {
    const baseURL = "https://www.amazon.com/s?";
    const params = new URLSearchParams();

    // Keyword search
    if (keyword) {
      params.append("k", keyword);
    }

    // Build "rh" filters (Amazon uses this for category + Prime)
    const rh = [];

    if (categoryNode) {
      // Keep BOTH: bbn + rh n:node helps Amazon stay in-category
      params.append("bbn", categoryNode);
      rh.push(`n:${categoryNode}`);
    }

    // ✅ FIX: Use pct-off as a top-level param (works across departments like Electronics)
    // Instead of rh p_8 which is inconsistent outside Books
    if (discount) {
      params.append("pct-off", discount); // e.g., "70-99"
    }

    // Prime-only filter (kept as-is)
    if (document.getElementById("prime-only")?.checked) {
      rh.push("p_85:2470955011");
    }

    // Any extra filters passed in (kept as-is)
    if (extraFilters) {
      extraFilters.split("&").forEach((filter) => {
        const [key, value] = filter.split("=");
        if (key && value) params.append(key, value);
      });
    }

    if (rh.length > 0) {
      params.append("rh", rh.join(","));
    }

    // Sorting (kept as-is)
    params.append("s", sorting);

    // Affiliate tag (kept as-is)
    params.append("tag", "allthedisco04-20");

    const finalURL = baseURL + params.toString();
    console.log("🔗 Opening Amazon Search:", finalURL);
    window.open(finalURL, "_blank");
  }

  window.searchDealsByCategory = function (
    categoryNode,
    discount = "",
    extraFilters = "",
    sorting = "price-desc-rank"
  ) {
    if (!categoryNode) {
      console.error("❌ Error: Missing category node!");
      return;
    }

    document.querySelectorAll(".category").forEach((cat) => cat.classList.remove("active"));
    const categoryElement = document.querySelector(
      `[onclick="toggleSubcategories('${categoryNode}')"]`
    );
    if (categoryElement) {
      categoryElement.classList.add("active");
    }

    const keyword = document.getElementById("search-box").value.trim();
    console.log(`🔎 Category Search: ${keyword} | ${categoryNode} | ${discount}`);
    searchDeals(categoryNode, discount, keyword, extraFilters, sorting);
  };

  window.searchDealsFromBar = function () {
    const keyword = document.getElementById("search-box").value.trim();
    const discount = document.getElementById("discount").value;
    console.log(`🔎 General Search: ${keyword} | ${discount}`);

    searchDeals("", discount !== "all" ? discount : "", keyword, "", "price-desc-rank");
  };

  window.toggleSubcategories = function (categoryId) {
    const subcategoryList = document.getElementById(categoryId);
    const categoryElement = document.querySelector(
      `[onclick="toggleSubcategories('${categoryId}')"]`
    );

    if (!subcategoryList) {
      console.error(`❌ No subcategory list for: ${categoryId}`);
      return;
    }

    document.querySelectorAll(".category").forEach((cat) => cat.classList.remove("active"));

    if (subcategoryList.classList.contains("visible")) {
      subcategoryList.classList.remove("visible");
      if (categoryElement) categoryElement.classList.remove("active");
    } else {
      document.querySelectorAll(".subcategory-list").forEach((list) => list.classList.remove("visible"));
      subcategoryList.classList.add("visible");
      if (categoryElement) categoryElement.classList.add("active");
    }
  };
});
