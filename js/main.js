// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileSidebar = document.getElementById('mobile-sidebar');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileSidebar.classList.remove('hidden');
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', function() {
            mobileSidebar.classList.add('hidden');
        });
    }

    // Close mobile menu when clicking outside
    mobileSidebar.addEventListener('click', function(e) {
        if (e.target === mobileSidebar) {
            mobileSidebar.classList.add('hidden');
        }
    });

    // Initialize tooltips
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
    });

    // Check URL for actions (like ?action=add)
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'add') {
        // This would open the appropriate modal based on the page
        if (window.location.pathname.includes('books.html')) {
            // Open add book modal
            const bookModal = document.getElementById('book-modal');
            if (bookModal) bookModal.classList.remove('hidden');
        } else if (window.location.pathname.includes('members.html')) {
            // Open add member modal
            const memberModal = document.getElementById('member-modal');
            if (memberModal) memberModal.classList.remove('hidden');
        } else if (window.location.pathname.includes('transactions.html')) {
            // Switch to appropriate tab
            if (action === 'issue') {
                document.getElementById('issue-tab').click();
            } else if (action === 'return') {
                document.getElementById('return-tab').click();
            }
        }
    }
});

// Tooltip functions
function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-50 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap';
    tooltip.textContent = tooltipText;
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - 30}px`;
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.transform = 'translateX(-50%)';
    
    this.appendChild(tooltip);
    this.tooltip = tooltip;
}

function hideTooltip() {
    if (this.tooltip) {
        this.removeChild(this.tooltip);
        this.tooltip = null;
    }
}

// Modal handling (generic for all modals)
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking X or cancel button
    const closeModalButtons = document.querySelectorAll('#close-modal, #cancel-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.fixed');
            if (modal) modal.classList.add('hidden');
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('.fixed.bg-opacity-50');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
});

// Tab switching for transactions page
if (document.getElementById('issue-tab')) {
    document.getElementById('issue-tab').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('issue-section').classList.remove('hidden');
        document.getElementById('return-section').classList.add('hidden');
        document.getElementById('history-section').classList.add('hidden');
        this.classList.add('border-blue-500', 'text-blue-600');
        this.classList.remove('border-transparent', 'text-gray-500');
        document.getElementById('return-tab').classList.add('border-transparent', 'text-gray-500');
        document.getElementById('return-tab').classList.remove('border-blue-500', 'text-blue-600');
        document.getElementById('history-tab').classList.add('border-transparent', 'text-gray-500');
        document.getElementById('history-tab').classList.remove('border-blue-500', 'text-blue-600');
    });

    document.getElementById('return-tab').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('return-section').classList.remove('hidden');
        document.getElementById('issue-section').classList.add('hidden');
        document.getElementById('history-section').classList.add('hidden');
        this.classList.add('border-blue-500', 'text-blue-600');
        this.classList.remove('border-transparent', 'text-gray-500');
        document.getElementById('issue-tab').classList.add('border-transparent', 'text-gray-500');
        document.getElementById('issue-tab').classList.remove('border-blue-500', 'text-blue-600');
        document.getElementById('history-tab').classList.add('border-transparent', 'text-gray-500');
        document.getElementById('history-tab').classList.remove('border-blue-500', 'text-blue-600');
    });

    document.getElementById('history-tab').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('history-section').classList.remove('hidden');
        document.getElementById('issue-section').classList.add('hidden');
        document.getElementById('return-section').classList.add('hidden');
        this.classList.add('border-blue-500', 'text-blue-600');
        this.classList.remove('border-transparent', 'text-gray-500');
        document.getElementById('issue-tab').classList.add('border-transparent', 'text-gray-500');
        document.getElementById('issue-tab').classList.remove('border-blue-500', 'text-blue-600');
        document.getElementById('return-tab').classList.add('border-transparent', 'text-gray-500');
        document.getElementById('return-tab').classList.remove('border-blue-500', 'text-blue-600');
    });
}

// Initialize date fields with today's date
const today = new Date().toISOString().split('T')[0];
const dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach(input => {
    if (!input.value) {
        input.value = today;
    }
});