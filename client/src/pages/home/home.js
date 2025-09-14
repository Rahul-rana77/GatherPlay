document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openMenuBtn = document.querySelector('.header__open-menu-btn');
    const closeMenuBtn = document.querySelector('.sidebar__close');
    const themeToggleBtn = document.querySelector('.header__theme-toggle');
    const sidebarThemeToggleBtn = document.querySelector('.sidebar__theme-toggle');
    
    // Check for mobile device
    const isMobile = window.innerWidth < 992;

    // Toggle sidebar visibility function - pure front-end functionality

    // Toggle sidebar visibility
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle dark/light theme
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    }

    // Apply saved theme preference
    function applySavedTheme() {
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }

    // Event Listeners
    // Only show open menu button on mobile devices
    if (isMobile) {
        openMenuBtn.parentElement.style.display = 'block';
    } else {
        openMenuBtn.parentElement.style.display = 'none';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const isMobileNow = window.innerWidth < 992;
        
        // Update menu visibility based on screen size
        if (isMobileNow) {
            openMenuBtn.parentElement.style.display = 'block';
        } else {
            openMenuBtn.parentElement.style.display = 'none';
            // Close sidebar if screen size changes to desktop
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    openMenuBtn.addEventListener('click', toggleSidebar);
    closeMenuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    
    themeToggleBtn.addEventListener('click', toggleTheme);
    sidebarThemeToggleBtn.addEventListener('click', toggleTheme);

    // Initialize
    applySavedTheme();

    // Add event listener to close sidebar when clicking on a menu item
    const sidebarMenuLinks = document.querySelectorAll('.sidebar__menu-link');
    sidebarMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default only for demo purposes
            e.preventDefault();
            toggleSidebar();
        });
    });
});