const correctPassword = "test"; // Default password

// Event listener for accessing protected content
const protectedLink = document.getElementById('access-protected-content');
if (protectedLink) {
    protectedLink.addEventListener('click', function (event) {
        event.preventDefault();
        console.log("Access Protected Content clicked");

        const userInput = prompt("Enter the password:");
        console.log("User input:", userInput);

        if (userInput === correctPassword) {
            console.log("Authentication successful");
            window.location.href = "protected-content.html"; // Redirect after successful login
        } else {
            console.log("Authentication failed");
            alert("Incorrect password.");
        }
    });
}

// Handle protected content access
if (document.title === "Protected Content") {
    const userInput = prompt("Enter the password:");
    console.log("User input on protected content:", userInput);

    if (userInput !== correctPassword) {
        console.log("Authentication failed on protected page");
        alert("Incorrect password. Redirecting to home page.");
        window.location.href = "index.html"; // Redirect back to the home page
    } else {
        console.log("Authentication successful on protected page");
    }
}

// Handle sections dynamically
function showSection(sectionId) {
    // Ensure the page has the sections before attempting to manipulate them
    const sections = document.querySelectorAll('.content-section');
    if (!sections.length) {
        console.error('No sections found on this page.');
        return;
    }

    // Hide all sections
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
    if (document.getElementById('main')) {
        showSection('main'); // Default to main section
    } else {
        console.log('No main section to display on this page.');
    }
});
