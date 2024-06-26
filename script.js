document.addEventListener('DOMContentLoaded', () => {
    const spotForm = document.getElementById('spot-form');
    const spotsContainer = document.getElementById('spots-container');
    const spotImageInput = document.getElementById('spot-image');
    const spotNameInput = document.getElementById('spot-name');
    const spotRatingInput = document.getElementById('spot-rating');
    const spotReviewInput = document.getElementById('spot-review');
    const spotModal = document.getElementById('spot-modal');
    const spotModalContent = document.getElementById('spot-modal-content');

    let spots = JSON.parse(localStorage.getItem('spots')) || [];

    const saveSpotsToLocalStorage = () => {
        localStorage.setItem('spots', JSON.stringify(spots));
    };

    const renderSpots = () => {
        spotsContainer.innerHTML = '';
        spots.forEach((spot, index) => {
            const spotCard = document.createElement('div');
            spotCard.classList.add('spot-card');
            spotCard.innerHTML = `
                <img src="${spot.image}" alt="${spot.name}">
                <h3>${spot.name}</h3>
                <p>Rating: ${spot.rating}</p>
                <p>${spot.review.substring(0, 50)}...</p>
            `;
            spotCard.addEventListener('click', () => {
                openModal(spot);
            });
            spotsContainer.appendChild(spotCard);
        });
    };

    const openModal = (spot) => {
        spotModalContent.innerHTML = `
            <img src="${spot.image}" alt="${spot.name}">
            <h3>${spot.name}</h3>
            <p>Rating: ${spot.rating}</p>
            <p>${spot.review}</p>
            <span id="close-modal">Close</span>
        `;
        spotModal.style.display = 'flex';
        document.getElementById('close-modal').addEventListener('click', () => {
            spotModal.style.display = 'none';
        });
    };

    spotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            const newSpot = {
                image: reader.result,
                name: spotNameInput.value,
                rating: spotRatingInput.value,
                review: spotReviewInput.value,
            };
            spots.push(newSpot);
            saveSpotsToLocalStorage();
            renderSpots();
            spotForm.reset();
        };
        reader.readAsDataURL(spotImageInput.files[0]);
    });

    renderSpots();
});
