document.addEventListener("DOMContentLoaded", function () {
  function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "", sorting = "price-desc-rank") {
    const baseURL = "https://www.amazon.com/s?";
    const params = new URLSearchParams();

    if (keyword) {
      params.append("k", keyword);
    }

    let rh = [];

    if (categoryNode) {
      params.append("bbn", categoryNode);
      rh.push(`n:${categoryNode}`);
    }

    if (discount) {
      let discountMin = discount.split("-")[0];
      rh.push(`p_8:${discountMin}-99`);
    }

    if (document.getElementById("prime-only")?.checked) {
      rh.push("p_85:2470955011"); // Amazon Prime filter
    }

    if (extraFilters) {
      extraFilters.split("&").forEach(filter => {
        let [key, value] = filter.split("=");
        params.append(key, value);
      });
    }

    if (rh.length > 0) {
      params.append("rh", rh.join(","));
    }

    params.append("s", sorting);
    params.append("tag", "allthedisco04-20"); // Affiliate tag

    const finalURL = baseURL + params.toString();
    console.log("🔗 Opening Amazon Search:", finalURL);
    window.open(finalURL, "_blank");
  }

  window.searchDealsByCategory = function (categoryNode, discount = "", extraFilters = "", sorting = "price-desc-rank") {
    if (!categoryNode) {
      console.error("❌ Error: Missing category node!");
      return;
    }

    document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
    const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryNode}')"]`);
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
    const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

    if (!subcategoryList) {
      console.error(`❌ No subcategory list for: ${categoryId}`);
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
});
