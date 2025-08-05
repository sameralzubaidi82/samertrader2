// JavaScript for Samer Trader Prototype
// Handles navigation between pages and basic interactive elements.

// Show a given page by its ID and highlight the corresponding nav item.
function showPage(pageId) {
    // Explicitly list all page IDs so we can reliably hide and show each page.
    // This avoids any issues with querySelectorAll failing to match nodes due
    // to whitespace or DOM nesting. When new pages are added to the
    // prototype, append their IDs here as well.
    const pageIds = [
        'dashboard',
        'strategies',
        'strategy-builder',
        'validation',
        'optimization',
        'tasks',
        'reports',
        'features',
        'live-trading'
    ];

    // Hide all pages and remove the active class. Show and activate only
    // the selected page ID.
    pageIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === pageId) {
                // Use setProperty with priority to override any conflicting CSS
                el.style.setProperty('display', 'block', 'important');
                el.classList.add('active');
            } else {
                el.style.setProperty('display', 'none', 'important');
                el.classList.remove('active');
            }
        }
    });

    // Reset navigation highlighting. Then apply the active class to the
    // nav item whose onclick attribute references the selected page. This
    // method avoids constructing CSS selectors that could break on hyphens
    // and other special characters.
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        const attr = item.getAttribute('onclick');
        if (attr && attr.includes(pageId)) {
            item.classList.add('active');
        }
    });

    // Debug logging to trace navigation events during development.
    console.log(`Navigated to: ${pageId}`);

    // Always scroll to the top of the page when navigating to a new section.
    try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
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
