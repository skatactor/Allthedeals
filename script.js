function toggleSubcategories(categoryId) {
    let subcategoryList = document.getElementById(categoryId);
    if (subcategoryList.style.display === "none" || subcategoryList.style.display === "") {
        subcategoryList.style.display = "block";
    } else {
        subcategoryList.style.display = "none";
    }
}