// Function to handle search bar
function searchDeals() {
    const query = document.getElementById('search-box').value.trim();
    const discount = document.getElementById('discount').value;
    const selectedCategory = document.querySelector('.category.active');

    if (!query) {
        alert("Please enter a product name.");
        return;
    }

    let url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=allthedisco04-20`;

    // Add discount filter if selected
    if (discount !== "all") {
        url += `&rh=p_8%3A${discount}`;
    }

    // Add category filter if a category is selected
    if (selectedCategory) {
        const categoryName = selectedCategory.querySelector('span').textContent.toLowerCase();
        url += `&node=${getCategoryNode(categoryName)}`;
    }

    window.open(url, "_blank");
}

// Function to get the Amazon node ID for a category
function getCategoryNode(categoryName) {
    const categoryNodes = {
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
        "video games": "468642"
    };

    return categoryNodes[categoryName] || "";
}

// Function to toggle subcategories and highlight the selected category
function toggleSubcategories(categoryId) {
    const subcategoryList = document.getElementById(categoryId);
    const discountButtons = document.getElementById(`${categoryId}-buttons`);
    const categoryElement = document.querySelector(`[onclick="toggleSubcategories('${categoryId}')"]`);

    // Remove active class from all categories
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));

    // Toggle the clicked category
    if (subcategoryList.style.display === "none" || subcategoryList.style.display === "") {
        subcategoryList.style.display = "block";
        discountButtons.style.display = "grid";
        categoryElement.classList.add('active');
    } else {
        subcategoryList.style.display = "none";
        discountButtons.style.display = "none";
        categoryElement.classList.remove('active');
    }
}