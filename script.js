document.addEventListener("DOMContentLoaded", function() {
    function toggleSubcategories(categoryId) {
        let subcategoryList = document.getElementById(categoryId);
        if (!subcategoryList) return; // Prevent errors if category doesn't exist

        let isVisible = subcategoryList.style.display === "block";

        // Hide all other subcategories before showing the clicked one
        document.querySelectorAll(".subcategory-list").forEach(sub => {
            sub.style.display = "none";
        });

        // Toggle visibility: If it was hidden, show it; otherwise, hide it
        subcategoryList.style.display = isVisible ? "none" : "block";

        // Store expanded state in localStorage
        localStorage.setItem("expandedCategory", isVisible ? "" : categoryId);
    }

    // Ensure all subcategories start hidden when the page loads, except for the last expanded one
    document.querySelectorAll(".subcategory-list").forEach(sub => {
        sub.style.display = "none";
    });

    let expandedCategory = localStorage.getItem("expandedCategory");
    if (expandedCategory) {
        let expandedElement = document.getElementById(expandedCategory);
        if (expandedElement) {
            expandedElement.style.display = "block";
        }
    }

    // Attach toggle event to each category item
    document.querySelectorAll(".category").forEach(category => {
        category.addEventListener("click", function() {
            let categoryId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            toggleSubcategories(categoryId);
        });
    });

    function searchDeals(category = "", discount = "", keyword = "") {
        let baseURL = "https://www.amazon.com/s?";
        let params = new URLSearchParams();

        if (keyword) {
            params.append("k", keyword);
        }

        if (category) {
            params.append("i", category);
        }

        if (discount) {
            params.append("rh", `p_8:${discount}`);
        }

        let finalURL = baseURL + params.toString();
        window.open(finalURL, "_blank");
    }

    window.searchDealsByCategory = function(category, discount = "") {
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        let categoryElement = document.querySelector(`[onclick="toggleSubcategories('${category}')"]`);
        if (categoryElement) {
            categoryElement.classList.add("active");
        }
        let keyword = document.getElementById("search-box").value.trim();
        searchDeals(category, discount, keyword);
    };

    window.searchDealsFromBar = function() {
        let keyword = document.getElementById("search-box").value.trim();
        let discount = document.getElementById("discount").value;
        searchDeals("", discount !== "all" ? discount : "", keyword);
    };
});
