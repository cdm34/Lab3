function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show or load the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        if (!selectedSection.innerHTML) {
            // Dynamically load content from the corresponding HTML file
            fetch(`${sectionId}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${sectionId}.html`);
                    }
                    return response.text();
                })
                .then(html => {
                    selectedSection.innerHTML = html;
                    selectedSection.style.display = 'block';
                })
                .catch(error => console.error(error));
        } else {
            selectedSection.style.display = 'block';
        }
    } else {
        console.error('Section with ID', sectionId, 'not found.');
    }
}


// Set default section to display on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('main'); 
});

document.getElementById(sectionId).classList.remove('hidden');
