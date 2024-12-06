// Store a hashed version of the password (MD5 hash of 'Fall2024Lab3')
const hashedPassword = '6293099fbe7fed2ebee14aa4535003e0';

let authenticated = false;

// Function to hash the password using MD5 (requires md5.js library)
function hashPassword(password) {
    return md5(password); // Assuming md5.js is included
}

// Function to authenticate the user
function authenticate(callback) {
    if (authenticated) {
        callback();
        return;
    }

    const userPassword = prompt('Enter the password to access protected content:');
    if (!userPassword) {
        alert('Password cannot be empty.');
        return;
    }

    if (hashPassword(userPassword) === hashedPassword) {
        authenticated = true;
        alert('Access granted!');
        callback();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Function to navigate to a protected content section
function navigateToProtectedSection(sectionId) {
    const allSections = document.querySelectorAll('.content-section');

    // Hide all sections
    allSections.forEach(section => (section.style.display = 'none'));

    // Show the protected content section
    const protectedSection = document.getElementById(sectionId);
    if (protectedSection) {
        protectedSection.style.display = 'block';
    } else {
        console.error(`Section with ID "${sectionId}" not found.`);
    }
}

// Event listener for accessing protected content
document.querySelector('nav a[href="#protected-content"]').addEventListener('click', function (event) {
    event.preventDefault();
    authenticate(() => {
        navigateToProtectedSection('protected-content'); // Adjust section ID as needed
    });
});

// Handle sections dynamically
function showSection(sectionId) {
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
                    } else {
                        console.log('Successfully loaded');
                        return response.text();
                    }
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
        console.error(`Section with ID "${sectionId}" not found.`);
    }
}

// Set default section to display on page load
document.addEventListener('DOMContentLoaded', () => {
    const defaultSection = document.getElementById('main');
    if (defaultSection) {
        showSection('main'); // Default to main section
    } else {
        console.log('No main section to display on this page.');
    }
});

// Handle direct access to the protected page
if (document.title === "Protected Content") {
    authenticate(() => {
        console.log("User authenticated on the protected page");
        navigateToProtectedSection('protected-content');
    });
}
