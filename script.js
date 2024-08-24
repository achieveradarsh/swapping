async function uploadImages() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
    const errorElem = document.getElementById('error');
    const morphedImage = document.getElementById('morphedImage');

    try {
        // Reset previous results
        errorElem.textContent = '';
        morphedImage.style.display = 'none';

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const imagePath = data.morphed_image;
            const imageUrl = `/uploads/${imagePath}`;
            morphedImage.src = imageUrl;
            morphedImage.style.display = 'block';
        } else {
            errorElem.textContent = data.error || 'An error occurred.';
        }
    } catch (error) {
        console.error('Error uploading images:', error);
        errorElem.textContent = 'An error occurred while processing the images.';
    }
}
