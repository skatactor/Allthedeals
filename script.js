function searchDeals() {
    let query = document.getElementById('search-box').value;
    let discount = document.getElementById('discount').value;
    let amazonBaseURL = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    
    if (discount !== "all") {
        amazonBaseURL += `&rh=p_8%3A${discount}`;
    }

    amazonBaseURL += `&tag=allthedisco04-20`;
    window.location.href = amazonBaseURL;
}
