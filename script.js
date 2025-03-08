function searchDeals() {
    let query = document.getElementById('search-box').value;
    if (query) {
        let amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=allthedisco04-20`;
        let resultDiv = document.getElementById('results');
        resultDiv.innerHTML = `<p>Find on Amazon: <a href="${amazonLink}" target="_blank">${query} deals</a></p>`;
    }
}
