// Get all counter number elements
const counters = document.querySelectorAll('.counter-number');

// Function to animate the counter
function animateCounter(counter, appendPlus = false) {
    const target = parseInt(counter.textContent.replace(/\D/g, '')); // Extract only numbers
    let start = 0;
    const increment = target / 100;

    const intervalId = setInterval(() => {
        start += increment;
        const formattedNumber = Math.ceil(start);
        counter.textContent = formattedNumber >= target 
            ? `${target}${appendPlus ? '+' : ''}` 
            : `${formattedNumber}${appendPlus ? '+' : ''}`;

        if (start >= target) {
            clearInterval(intervalId);
            counter.textContent = `${target}${appendPlus ? '+' : ''}`; // Ensure it ends correctly
        }
    }, 20); // Smooth timing
}

// Trigger animation when section comes into view
const options = {
    root: null,
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const appendPlus = entry.target.parentElement.querySelector('.counter-label').textContent.includes('Properties');
            animateCounter(entry.target, appendPlus);
            observer.unobserve(entry.target);
        }
    });
}, options);

counters.forEach(counter => {
    observer.observe(counter);
});





let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showTestimonials(index) {
    const total = testimonials.length;

    // Hide all testimonials
    testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(-${100 * index}%)`;
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) dot.classList.add('active');
    });
}

// Automatic testimonial transition
setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonials(currentIndex);
}, 5000);

// Dots click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        showTestimonials(currentIndex);
    });
});

// Initial display
showTestimonials(currentIndex);


// Detect when an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Function to handle the scroll animation
function handleScroll() {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        if (isInViewport(icon)) {
            icon.classList.add('visible'); // Add the visible class to trigger animation
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Initial check in case the page is already loaded
handleScroll();


// JavaScript to add the 'visible' class when scrolled into view
document.addEventListener('DOMContentLoaded', function () {
    const placeLists = document.querySelectorAll('.place-list');

    // Function to check if an element is in the viewport
    function isInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Add 'visible' class to elements in view
    function handleScroll() {
        placeLists.forEach((placeList) => {
            if (isInView(placeList)) {
                placeList.classList.add('visible');
            }
        });
    }

    // Call on page load and scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});


document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.counter-section');
    const counterItems = document.querySelectorAll('.counter-item');

    // Observer options
    const options = {
        root: null, // Relative to the viewport
        threshold: 0.5 // Trigger when 50% of the element is in view
    };

    // Create the observer callback function
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    };

    // Create an intersection observer instance
    const observer = new IntersectionObserver(callback, options);

    // Observe the section and counter items
    observer.observe(section);
    counterItems.forEach(item => observer.observe(item));
});


