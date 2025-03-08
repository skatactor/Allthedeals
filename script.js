function searchDeals() {
    let query = document.getElementById('search-box').value;
    if (query) {
        let amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=allthedisco04-20`;
        window.location.href = amazonLink;
    }
}
