const regions = document.querySelectorAll('.region');
const popup = document.getElementById('popup');
const loreText = document.getElementById('region-lore');
const regionTitle = document.getElementById('region-title');
const closeBtn = document.getElementById('close-btn')

regions.forEach(region => {
    region.addEventListener('click', () => {
        const regionId = region.getAttribute('data-region');

        // get lore txt to display in popup
        fetch(`lore/${regionId}.txt`)
            .then(response => response.text())
            .then(data => {
                regionTitle.textContent = regionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                loreText.textContent = data;
                popup.classList.remove('hidden');
                popup.style.opacity = 0;
                
                // Fade in effect
                requestAnimationFrame(() => {
                    popup.style.transition = 'opacity 0.5s ease';
                    popup.style.opacity = 1;
                });
            })
            .catch(err => {
                console.error('Failed to load lore:', err);
                loreText.textContent = 'Lore could not be loaded.';
                popup.classList.remove('hidden');
            });
    });
});

closeBtn.addEventListener('click', () => {
    // Start fade out
    popup.style.opacity = 0;

    // After the fade duration, hide the element and reset content
    setTimeout(() => {
        popup.classList.add('hidden');
        regionTitle.textContent = '';
        loreText.textContent = '';
    }, 500); // This matches the CSS transition time (0.5s)
});;

