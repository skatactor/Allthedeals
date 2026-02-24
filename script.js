/* ... [Previous CSS from before] ... */

.pct-grid { 
    display: grid; 
    grid-template-columns: repeat(4, 1fr); /* 4 buttons per row */
    gap: 8px; 
}

.pct-grid button {
    background: #ffffff; 
    border: 1px solid #ddd; 
    padding: 12px 0; 
    font-size: 0.85rem;
    font-weight: bold; 
    border-radius: 6px; 
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.pct-grid button:active { 
    background: var(--amazon-orange); 
    color: white; 
    border-color: #d48000;
}

.category-block {
    padding: 12px;
}
