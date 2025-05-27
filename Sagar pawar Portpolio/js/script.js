// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // For demonstration - in a real scenario, you'd send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'dark:text-blue-400');
            const href = link.getAttribute('href').substring(1);
            
            if (href === currentSection) {
                link.classList.add('text-blue-600', 'dark:text-blue-400');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // Initialize skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Dark mode toggle
    const darkModeToggle = document.querySelector('[x-data]');
    if (darkModeToggle) {
        // Check for saved theme preference or respect OS preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (localStorage.getItem('darkMode') === 'true' || (prefersDark && !localStorage.getItem('darkMode'))) {
            darkModeToggle.__x.$data.darkMode = true;
        }
        
        // Save preference when changed
        const darkModeWatcher = setInterval(() => {
            if (darkModeToggle.__x) {
                darkModeToggle.__x.$watch('darkMode', value => {
                    localStorage.setItem('darkMode', value);
                });
                clearInterval(darkModeWatcher);
            }
        }, 100);
    }
});