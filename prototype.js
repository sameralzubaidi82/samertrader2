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

    // When navigating to certain pages, automatically fetch data from the backend
    // using the API functions defined below. This begins the integration
    // between the frontend prototype and the FastAPI backend.  For example,
    // when the Strategies page is shown, we request the user's saved
    // strategies from the backend and log the response.  You can extend
    // this conditional logic for other pages as API endpoints become
    // available.
    if (typeof api !== 'undefined') {
        if (pageId === 'strategies') {
            api.listStrategies()
                .then(data => {
                    console.log('Fetched strategies:', data);
                    // TODO: populate strategy cards dynamically using data
                })
                .catch(err => console.error('Error fetching strategies', err));
        }
        // Additional page-specific API calls can be added here.
    }

    // Always scroll to the top of the page when navigating to a new section.
    try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
        window.scrollTo(0, 0);
    }
}

/*
 * API client for the Samer Trader backend
 *
 * This object encapsulates functions for interacting with the backend
 * FastAPI service. It handles constructing request URLs, attaching
 * authorization headers when needed and parsing JSON responses.  During
 * Phase 1, these functions provide the wiring between the prototype
 * frontend and the backend endpoints defined in backend/main.py.  As
 * more endpoints are implemented, extend this object with additional
 * methods.
 */
const API_BASE_URL = 'http://localhost:8000';

// Hold the current access token once the user logs in.  In a more
// robust implementation this would be stored in secure browser storage
// (e.g. HttpOnly cookies or sessionStorage) and automatically refreshed.
let _accessToken = null;

const api = {
    /**
     * Register a new user.
     * @param {Object} user - { username, password, full_name?, email? }
     * @returns {Promise<Object>} the created user record
     */
    async register(user) {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error(`Register failed: ${response.statusText}`);
        return response.json();
    },

    /**
     * Log in and obtain an access token.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<string>} the access token
     */
    async login(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        const response = await fetch(`${API_BASE_URL}/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });
        if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
        const data = await response.json();
        _accessToken = data.access_token;
        return _accessToken;
    },

    /**
     * Get the current logged in user's profile.
     */
    async me() {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            headers: { Authorization: `Bearer ${_accessToken}` },
        });
        if (!response.ok) throw new Error(`Get current user failed: ${response.statusText}`);
        return response.json();
    },

    /**
     * List strategies belonging to the current user.
     */
    async listStrategies() {
        const response = await fetch(`${API_BASE_URL}/strategies`, {
            headers: { Authorization: `Bearer ${_accessToken}` },
        });
        if (!response.ok) throw new Error(`List strategies failed: ${response.statusText}`);
        return response.json();
    },

    /**
     * Create a new strategy.
     * @param {Object} strategy - { name, description, definition }
     */
    async createStrategy(strategy) {
        const response = await fetch(`${API_BASE_URL}/strategies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${_accessToken}`,
            },
            body: JSON.stringify(strategy),
        });
        if (!response.ok) throw new Error(`Create strategy failed: ${response.statusText}`);
        return response.json();
    },

    /**
     * Run a backtest for a strategy.
     * @param {Object} request - { strategy_id, start_date, end_date, initial_cash, commission, slippage, tax_profile, data_source }
     */
    async backtest(request) {
        const response = await fetch(`${API_BASE_URL}/backtest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${_accessToken}`,
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error(`Backtest failed: ${response.statusText}`);
        return response.json();
    },

    /**
     * Upload historical price data for a symbol.
     * @param {string} symbol
     * @param {string} csvData - Raw CSV content
     */
    async uploadData(symbol, csvData) {
        const response = await fetch(`${API_BASE_URL}/data/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${_accessToken}`,
            },
            body: JSON.stringify({ symbol, csv_data: csvData }),
        });
        if (!response.ok) throw new Error(`Upload data failed: ${response.statusText}`);
        return response.json();
    },
};

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
