// ============================================
// DROPDOWN MENU FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize dropdowns
    const dropdownButtons = document.querySelectorAll('[data-dropdown]');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            
            const dropdownType = this.getAttribute('data-dropdown');
            const dropdownMenu = document.getElementById(dropdownType + 'Dropdown');
            
            // Close all other menus
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('active');
                }
            });
            
            // Toggle current menu
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('[data-dropdown]')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // Close dropdowns when clicking on a dropdown item
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        });
    });
});

// ============================================
// BOOKMARK FUNCTIONALITY
// ============================================

const bookmarkBtn = document.getElementById('bookmarkBtn');
let isBookmarked = false;

bookmarkBtn.addEventListener('click', function () {
    isBookmarked = !isBookmarked;
    
    // Visual feedback
    if (isBookmarked) {
        bookmarkBtn.style.fill = '#FF6B35';
        bookmarkBtn.style.color = '#FF6B35';
        bookmarkBtn.style.transform = 'scale(1.2)';
        showNotification('Added to bookmarks!');
    } else {
        bookmarkBtn.style.fill = 'none';
        bookmarkBtn.style.color = '#b0b0b0';
        bookmarkBtn.style.transform = 'scale(1)';
        showNotification('Removed from bookmarks');
    }
    
    // Reset transform
    setTimeout(() => {
        bookmarkBtn.style.transform = 'scale(1)';
    }, 200);
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B35, #FF8E62);
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just '#' or empty
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// HEADER SCROLL EFFECT
// ============================================

let lastScroll = 0;
const header = document.querySelector('.stove-header');

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease';
    } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// BUTTON CLICK HANDLERS
// ============================================

// Install STOVE button
document.querySelector('.install-btn')?.addEventListener('click', function () {
    showNotification('Starting STOVE launcher download...');
    console.log('Install button clicked');
});

// Download button
document.querySelector('.download-btn')?.addEventListener('click', function () {
    showNotification('Starting Crossfire download...');
    console.log('Download button clicked');
});

// Register button
document.querySelector('.register-btn')?.addEventListener('click', function () {
    showNotification('Redirecting to registration...');
    // window.location.href = 'https://accounts.onstove.com/signup';
});

// Login button
document.querySelector('.login-btn')?.addEventListener('click', function () {
    showNotification('Redirecting to login...');
    // window.location.href = 'https://accounts.onstove.com/login';
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function (e) {
    // Escape key closes dropdowns
    if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
    
    // Alt + B for bookmark
    if (e.altKey && e.key === 'b') {
        e.preventDefault();
        bookmarkBtn.click();
    }
});

// ============================================
// ANIMATION KEYFRAMES (CSS IN JS)
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #FF6B35;
    }
`;
document.head.appendChild(style);

// ============================================
// LOCAL STORAGE FOR BOOKMARKS
// ============================================

function saveBookmarkState() {
    localStorage.setItem('stoveBookmarked', JSON.stringify(isBookmarked));
}

function loadBookmarkState() {
    const saved = localStorage.getItem('stoveBookmarked');
    if (saved !== null) {
        isBookmarked = JSON.parse(saved);
        if (isBookmarked) {
            bookmarkBtn.style.fill = '#FF6B35';
            bookmarkBtn.style.color = '#FF6B35';
        }
    }
}

// Load bookmark state on page load
loadBookmarkState();

// Save bookmark state when it changes
bookmarkBtn.addEventListener('click', saveBookmarkState);

// ============================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ============================================

const themeToggle = document.getElementById('themeToggle');
const sunIcon = themeToggle.querySelector('.sun-icon');
const moonIcon = themeToggle.querySelector('.moon-icon');
const html = document.documentElement;

// Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
}

// Set theme
function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'dark');
    }
}

// Get current theme
function getCurrentTheme() {
    return document.body.classList.contains('light-mode') ? 'light' : 'dark';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showNotification(`Switched to ${newTheme} mode`);
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);
if (document.readyState !== 'loading') {
    initializeTheme();
}

// ============================================
// DEBUG & ANALYTICS
// ============================================

console.log('STOVE Header Initialized Successfully');
console.log('Features: Dropdowns, Bookmarks, Smooth Scroll, Keyboard Shortcuts, Theme Toggle');
