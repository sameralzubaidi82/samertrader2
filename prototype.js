// JavaScript for Samer Trader Prototype
// Handles navigation between pages and basic interactive elements.

// Show a given page by its ID and highlight the corresponding nav item.
function showPage(pageId) {
        // Hide all pages by setting their display to none and removing the
        // active class. Explicitly manipulating the style attribute avoids
        // conflicts with other CSS rules that might override the display
        // property via specificity. Removing the active class keeps the
        // semantic class state in sync.
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });

    // Remove active class from all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

        // Show the selected page if it exists. Set its display back to
        // block in addition to adding the active class to ensure it
        // becomes visible regardless of other CSS rules.
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
            selectedPage.style.display = 'block';
        }

        // Highlight the navigation item that triggers this page.
        // Instead of using a CSS selector that may break on hyphens or other
        // special characters in the pageId, iterate over all nav items and
        // compare their inline onclick attributes. This avoids invalid
        // selector errors and is more resilient if additional nav items are
        // introduced.
        try {
            const navItemsList = document.querySelectorAll('.nav-item');
            navItemsList.forEach(item => {
                // Ensure we clear any existing active class
                item.classList.remove('active');
                const onclickAttr = item.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes(pageId)) {
                    item.classList.add('active');
                }
            });
        } catch (e) {
            console.error('Failed to highlight nav item:', e);
        }

    // Log the page change to the console for debugging.
    console.log(`Navigated to: ${pageId}`);

        // Scroll the window to the top whenever a new page is shown.
        // Without this, pages that start lower down the document may appear blank
        // until the user scrolls. Smooth scrolling improves the user experience.
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            // Fallback for browsers that don't support smooth scrolling
            window.scrollTo(0, 0);
        }
}

// Display a simple alert with the provided message.
function showAlert(message) {
    alert(message);
}

// Strategy Builder: simulate running validation tests.
function simulateValidation() {
    const statusDiv = document.getElementById('validation-status');
    const resultsDiv = document.getElementById('validation-results');

    // Show a running status
    statusDiv.innerHTML = '<div style="color: #3b82f6;">🔄 Running validation tests... Please wait</div>';
    statusDiv.style.display = 'block';
    resultsDiv.style.display = 'none';

    // Simulate a delay and then show results
    setTimeout(() => {
        statusDiv.style.display = 'none';
        resultsDiv.style.display = 'block';
        showAlert('✅ Validation completed! Strategy passed all tests.');
    }, 3000);
}

// Optimization: selected method tracker and UI helper.
let selectedOptimizationMethod = 'genetic';

function selectOptimizationMethod(method) {
    // Reset all cards
    document.querySelectorAll('#genetic-card, #bruteforce-card, #ml-card').forEach(card => {
        card.style.border = '2px solid transparent';
    });

    // Highlight selected card and record the selection
    const card = document.getElementById(method + '-card');
    if (card) {
        card.style.border = '2px solid #3b82f6';
        selectedOptimizationMethod = method;
    }

    showAlert(`Selected optimization method: ${method}`);
}

// Start the optimization progress simulation.
function startOptimization() {
    const progressDiv = document.getElementById('optimization-progress');
    const resultsDiv = document.getElementById('optimization-results');
    progressDiv.style.display = 'block';
    resultsDiv.style.display = 'none';

    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const bestPerformance = document.getElementById('best-performance');
    const improvement = document.getElementById('improvement');
    const timeRemaining = document.getElementById('time-remaining');

    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + '%';
        progressText.textContent = `${Math.floor(progress * 10)} / 1000 iterations`;

        const currentSharpe = 1.24 + (progress / 100) * 1.23;
        bestPerformance.textContent = `Sharpe: ${currentSharpe.toFixed(2)}`;

        const improvementPercent = ((currentSharpe - 1.24) / 1.24 * 100);
        improvement.textContent = `Improvement: +${improvementPercent.toFixed(1)}%`;

        const remainingTime = Math.floor((100 - progress) / 5 * 2);
        timeRemaining.textContent = `~${remainingTime} minutes`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressDiv.style.display = 'none';
                resultsDiv.style.display = 'block';
                showAlert('🎉 Optimization completed! Found significant improvements.');
            }, 1000);
        }
    }, 500);
}

// Stop the optimization simulation.
function stopOptimization() {
    showAlert('⏹️ Optimization stopped by user');
    const progressDiv = document.getElementById('optimization-progress');
    if (progressDiv) {
        progressDiv.style.display = 'none';
    }
}

// Refresh the tasks list and simulate progress bar updates.
function refreshTasks() {
    showAlert('🔄 Task list refreshed');
    // Simulate updating progress bars
    const progressBars = document.querySelectorAll('#active-tasks .progress-bar');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width) || 0;
        bar.style.width = Math.min(currentWidth + 5, 100) + '%';
    });
}

// Notify the user that tasks have been filtered.
function filterTasks() {
    showAlert('🔍 Tasks filtered based on selected criteria');
}

// Toggle the deployment panel.
function deployStrategy() {
    const panel = document.getElementById('deployment-panel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

// Confirm deployment and hide the panel.
function confirmDeployment() {
    showAlert('🚀 Strategy deployed successfully to live trading!');
    const panel = document.getElementById('deployment-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

// Start a forward test and periodically update the P&L display.
function startForwardTest() {
    showAlert('🧪 Forward test initiated. Monitoring live performance...');
    const pnlElement = document.querySelector('#forward-test-results .metric-value');
    if (pnlElement) {
        setInterval(() => {
            // Extract numeric P&L, ignoring currency symbols and commas
            const currentPnL = parseFloat(pnlElement.textContent.replace(/[+$,]/g, '')) || 0;
            // Random change to simulate real-time fluctuation
            const change = (Math.random() - 0.5) * 100;
            const newPnL = currentPnL + change;
            // Update the display with sign and two decimal precision
            pnlElement.textContent = (newPnL >= 0 ? '+' : '') + newPnL.toFixed(2);
        }, 2000);
    }
}

    // Ensure the dashboard page is visible by default once the script loads.
    // If the DOM has already loaded by the time this script runs,
    // the 'DOMContentLoaded' event will not fire for new listeners.
    // Calling showPage immediately ensures the dashboard is displayed.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            showPage('dashboard');
        });
    } else {
        showPage('dashboard');
    }
