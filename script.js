
// Function to handle search based on category and discount
function searchDeals() {
    const query = document.getElementById('search-box').value.trim();
    const discount = document.getElementById('discount').value;
    const selectedCategory = document.querySelector('.category.active');

    let url = "https://www.amazon.com/s?";

    // If a search term is provided, search all of Amazon
    if (query) {
        url += `k=${encodeURIComponent(query)}`;
    }

    // If a category is selected, filter within that category
    if (selectedCategory) {
        const categoryNode = getCategoryNode(selectedCategory);
        const categoryIndex = getCategoryIndex(selectedCategory);

        if (categoryIndex) {
            url += `&i=${categoryIndex}`;
        } else if (categoryNode) {
            url += `&node=${categoryNode}`;
        }
    }

    // Apply the correct discount filter dynamically
    if (discount !== "all") {
        const discountFilter = getDiscountFilter(selectedCategory);
        url += `&rh=${discountFilter}%3A${discount}`;
    }

    url += "&tag=allthedisco04-20"; // Affiliate tag

    console.log(`Opening URL: ${url}`); // Debugging log
    window.open(url, "_blank");
}

// Function to get the Amazon node ID for a category
function getCategoryNode(categoryElement) {
    const categoryName = categoryElement.querySelector('span').textContent.toLowerCase();
    const categoryNodes = {
        "graphic novels": "4366",
        "baby": "165796011",
        "beauty": "3760911",
        "books": "283155",
        "cell phones": "2335752011",
        "men's clothing": "1040658",
        "women's clothing": "1040660",
        "kids' clothing": "1040664",
        "men's shoes": "679255011",
        "women's shoes": "679337011",
        "computers": "565108",
        "electronics": "172282",
        "home & kitchen": "1055398",
        "amazon devices": "2102313011",
        "luggage & travel": "9479199011",
        "movies & tv": "2625373011",
        "musical instruments": "11091801",
        "office products": "1064954",
        "patio, lawn & garden": "2972638011",
        "pet supplies": "2619533011",
        "sports & outdoors": "3375251",
        "tools & home improvement": "228013",
        "toys & games": "165793011",
        "video games": "468642",
        "men's fashion": "7147441011" // Added Men's Fashion node
    };

    return categoryNodes[categoryName] || null;
}

// Function to get the Amazon index for a category (i=)
function getCategoryIndex(categoryElement) {
    const categoryName = categoryElement.querySelector('span').textContent.toLowerCase();
    const categoryIndexes = {
        "books": "stripbooks",
        "baby": "baby-products",
        "electronics": "electronics",
        "beauty": "beauty",
        "home & kitchen": "home-garden"
    };

    return categoryIndexes[categoryName] || null;
}

// Function to determine the correct discount filter parameter dynamically
function getDiscountFilter(selectedCategory) {
    const categoryIndex = selectedCategory ? getCategoryIndex(selectedCategory) : null;
    const categoriesUsingP75 = ["stripbooks", "baby-products", "beauty", "home-garden"];
    
    if (categoryIndex && categoriesUsingP75.includes(categoryIndex)) {
        return "p_75";
    }
    return "p_8"; // Default to p_8 for most categories
}

// Function to toggle subcategories and highlight the selected category
function toggleSubcategories(categoryId) {
    const subcategoryList = document.getElementById(categoryId);
    const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

    // Remove active class from all categories
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));

    // Toggle the clicked category
    if (subcategoryList.style.display === "none" || subcategoryList.style.display === "") {
        subcategoryList.style.display = "block";
        categoryElement.classList.add('active');
    } else {
        subcategoryList.style.display = "none";
        categoryElement.classList.remove('active');
    }
}
