document.addEventListener("DOMContentLoaded", function() {
    // Ensure all subcategories start hidden when the page loads
    document.querySelectorAll(".subcategory-list").forEach(sub => {
        sub.style.display = "none";
    });

    // Add click event listeners to all category elements
    document.querySelectorAll(".category").forEach(category => {
        category.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent event bubbling
            
            // Extract the category ID from the element
            const categoryId = this.querySelector("ul").id;
            
            // Toggle the subcategory visibility
            toggleSubcategory(categoryId, this);
        });
    });
    
    // Add click event listeners to all subcategory elements
    document.querySelectorAll(".subcategory-list li").forEach(subCategory => {
        subCategory.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent triggering parent category click
        });
    });

    // Function to toggle subcategory visibility
    function toggleSubcategory(categoryId, categoryElement) {
        const subcategoryList = document.getElementById(categoryId);
        if (!subcategoryList) return;
        
        const isVisible = subcategoryList.style.display === "block";
        
        // Hide all subcategories first
        document.querySelectorAll(".subcategory-list").forEach(sub => {
            sub.style.display = "none";
        });
        
        // Remove active class from all categories
        document.querySelectorAll(".category").forEach(cat => {
            cat.classList.remove("active");
        });
        
        // If it was hidden, show it and add active class
        if (!isVisible) {
            subcategoryList.style.display = "block";
            categoryElement.classList.add("active");
        }
    }

    // Function to search deals
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

    // Attach click handlers to all discount buttons
    document.querySelectorAll(".discount-buttons-grid button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent category toggling when clicking buttons
            
            // Extract category ID and discount from the original onclick attribute
            const originalOnClick = this.getAttribute("onclick");
            const matches = originalOnClick.match(/searchDealsByCategory\('([^']+)',\s*'([^']+)'\)/);
            
            if (matches && matches.length === 3) {
                const category = matches[1];
                const discount = matches[2];
                searchDealsByCategory(category, discount);
            }
        });
    });

    // Make these functions globally accessible
    window.searchDealsByCategory = function(category, discount = "") {
        document.querySelectorAll(".category").forEach(cat => cat.classList.remove("active"));
        
        let categoryElement = document.querySelector(`[onclick*="'${category}'"]`);
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
