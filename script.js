document.addEventListener("DOMContentLoaded", function () {
  function searchDeals(categoryNode = "", discount = "", keyword = "", extraFilters = "", sorting = "price-desc-rank") {
    let baseURL = "https://www.amazon.com/s?";
    let params = new URLSearchParams();

    if (keyword) {
      params.append("k", keyword);
    }

    if (categoryNode) {
      params.append("bbn", categoryNode); // Amazon Browse Node
    }

    if (discount) {
      let discountMin = discount.split("-")[0];
      params.append("rh", `p_8:${discountMin}-99`);
    }

    if (document.getElementById("prime-only").checked) {
      params.append("rh", params.get("rh") ? params.get("rh") + ",p_85:2470955011" : "p_85:2470955011");
    }

    if (extraFilters) {
      extraFilters.split("&").forEach(filter => {
        let [key, value] = filter.split("=");
        params.append(key, value);
      });
    }

    params.append("s", sorting); // Default sort High → Low
    params.append("tag", "allthedisco04-20"); // Your Amazon affiliate tag

    let finalURL = baseURL + params.toString();

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
    console.log(`🔎 Searching Category: ${categoryNode} | Discount: ${discount} | Keyword: ${keyword}`);

    searchDeals(categoryNode, discount, keyword, extraFilters, sorting);
  };

  window.searchDealsFromBar = function () {
    let keyword = document.getElementById("search-box").value.trim();
    let discount = document.getElementById("discount").value;
    console.log(`🔎 Searching Keyword: ${keyword} | Discount: ${discount}`);

    searchDeals("", discount !== "all" ? discount : "", keyword, "", "price-desc-rank");
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
});
