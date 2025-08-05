// Page Navigation Function
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Remove active class from all nav items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected page
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
            
            // Add active class to clicked nav item
            event.target.classList.add('active');
            
            // Log page change
            console.log(`Navigated to: ${pageId}`);
        }

        // Alert function for interactive elements
        function showAlert(message) {
            alert(message);
        }

        // Strategy Builder Functions
        function simulateValidation() {
            const statusDiv = document.getElementById('validation-status');
            const resultsDiv = document.getElementById('validation-results');
            
            statusDiv.innerHTML = '<div style="color: #3b82f6;">🔄 Running validation tests... Please wait</div>';
            
            setTimeout(() => {
                statusDiv.style.display = 'none';
                resultsDiv.style.display = 'block';
                showAlert('✅ Validation completed! Strategy passed all tests.');
            }, 3000);
        }

        // Optimization Functions
        let selectedOptimizationMethod = 'genetic';
        
        function selectOptimizationMethod(method) {
            // Reset all cards
            document.querySelectorAll('#genetic-card, #bruteforce-card, #ml-card').forEach(card => {
                card.style.border = '2px solid transparent';
            });
            
            // Highlight selected card
            document.getElementById(method + '-card').style.border = '2px solid #3b82f6';
            selectedOptimizationMethod = method;
            
            showAlert(`Selected optimization method: ${method}`);
        }

        function startOptimization() {
            const progressDiv = document.getElementById('optimization-progress');
            const resultsDiv = document.getElementById('optimization-results');
            
            progressDiv.style.display = 'block';
            resultsDiv.style.display = 'none';
            
            // Simulate optimization progress
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

        function stopOptimization() {
            showAlert('⏹️ Optimization stopped by user');
            document.getElementById('optimization-progress').style.display = 'none';
        }

        // Task Management Functions
        function refreshTasks() {
            showAlert('🔄 Task list refreshed');
            // Simulate updating progress
            const progressBars = document.querySelectorAll('#active-tasks .progress-bar');
            progressBars.forEach(bar => {
                const currentWidth = parseInt(bar.style.width) || 0;
                bar.style.width = Math.min(currentWidth + 5, 100) + '%';
            });
        }

        function filterTasks() {
            showAlert('🔍 Tasks filtered based on selected criteria');
        }

        // Live Trading Functions
        function deployStrategy() {
            const panel = document.getElementById('deployment-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }

        function confirmDeployment() {
            showAlert('🚀 Strategy deployed successfully to live trading!');
            document.getElementById('deployment-panel').style.display = 'none';
        }

        function startForwardTest() {
            showAlert('🧪 Forward test initiated. Monitoring live performance...');
            
            // Simulate real-time P&L updates
            const pnlElement = document.querySelector('#forward-test-results .metric-value');
            if (pnlElement) {
                setInterval(() => {
                    const currentPnL = parseFloat(pnlElement.textContent.replace(/[$,+]/g, ''));
                    const change = (Math.random() - 0.5) * 100;
                    const newPnL = currentPnL + change;
                    
                    pnlElement.textContent = (newPnL >= 0 ? '+' : '') + '        <!-- Strategy Builder Page -->
        <div class="page" id="strategy-builder">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: #1e40af; font-size: 2.5rem;">🔧 Strategy Theory Creation</h1>
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="showAlert('💾 Strategy saved successfully!')">Save Strategy</button>
                    <button class="btn btn-success" onclick="showAlert('🤖 AI generating strategy theory...')">Auto Generate</button>
                </div>
            </div>

            <!-- Strategy Configuration Form -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1.5rem;">Define Strategy Structure</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <div class="form-group">
                            <label class="form-label">Strategy Name</label>
                            <input type="text" class="form-input" placeholder="e.g., My RSI Strategy" value="RSI Momentum Pro">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Primary Technical Indicator</label>
                            <select class="form-select">
                                <option>RSI (Relative Strength Index)</option>
                                <option>MACD (Moving Average Convergence Divergence)</option>
                                <option>Bollinger Bands</option>
                                <option>Moving Average (SMA/EMA)</option>
                                <option>Stochastic Oscillator</option>
                                <option>Williams %R</option>
                                <option>Volume Weighted Average Price (VWAP)</option>
                                <option>Fibonacci Retracement</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Secondary Indicator (Optional)</label>
                            <select class="form-select">
                                <option>None</option>
                                <option>Volume</option>
                                <option>Moving Average</option>
                                <option>ATR (Average True Range)</option>
                                <option>ADX (Average Directional Index)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Timeframe</label>
                            <select class="form-select">
                                <option>1 minute</option>
                                <option>5 minutes</option>
                                <option>15 minutes</option>
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>4 hours</option>
                                <option>1 day</option>
                                <option>1 week</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div class="form-group">
                            <label class="form-label">Entry Logic</label>
                            <select class="form-select">
                                <option>Buy when RSI < 30 (Oversold)</option>
                                <option>Buy when RSI > 70 (Overbought - contrarian)</option>
                                <option>Buy on MACD signal line crossover</option>
                                <option>Buy when price touches lower Bollinger Band</option>
                                <option>Buy when price crosses above moving average</option>
                                <option>Custom Logic</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Exit Logic</label>
                            <select class="form-select">
                                <option>Sell when RSI > 70</option>
                                <option>Sell when RSI < 30</option>
                                <option>Take Profit at X%</option>
                                <option>Stop Loss at X%</option>
                                <option>Trailing Stop</option>
                                <option>Time-based Exit</option>
                                <option>Reverse Signal</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Stock Selection</label>
                            <input type="text" class="form-input" placeholder="e.g., AAPL, MSFT, GOOGL" value="AAPL, MSFT, TSLA">
                            <small style="color: #64748b;">Enter stock tickers separated by commas</small>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Position Sizing</label>
                            <select class="form-select">
                                <option>Fixed Dollar Amount</option>
                                <option>Percentage of Portfolio</option>
                                <option>Kelly Criterion</option>
                                <option>Risk Parity</option>
                                <option>Volatility-based</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn-primary" onclick="showAlert('🧪 Moving to validation phase...'); showPage('validation')" style="margin-right: 1rem;">Create & Validate Strategy</button>
                    <button class="btn btn-secondary" onclick="showAlert('📄 Strategy template saved as draft')">Save as Draft</button>
                </div>
            </div>

            <!-- Strategy Preview -->
            <div class="dashboard-card">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Strategy Preview</h3>
                <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <p style="margin-bottom: 0.5rem;"><strong>Strategy Name:</strong> RSI Momentum Pro</p>
                    <p style="margin-bottom: 0.5rem;"><strong>Logic:</strong> Buy when RSI < 30 on AAPL, MSFT, TSLA using 1-hour timeframe</p>
                    <p style="margin-bottom: 0.5rem;"><strong>Exit:</strong> Sell when RSI > 70</p>
                    <p><strong>Risk Management:</strong> Position size based on percentage of portfolio</p>
                </div>
            </div>
        </div>

        <!-- Validation & Testing Page -->
        <div class="page" id="validation">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: #1e40af; font-size: 2.5rem;">✅ Strategy Validation & Testing</h1>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="showAlert('🧪 Running comprehensive validation...'); simulateValidation()">Run Full Validation</button>
                    <button class="btn btn-secondary" onclick="showAlert('⚡ Quick test completed')">Quick Test</button>
                </div>
            </div>

            <!-- Test Configuration -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Test Configuration</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;">
                    <div class="form-group">
                        <label class="form-label">Test Period</label>
                        <select class="form-select">
                            <option>Last 6 Months</option>
                            <option>Last 1 Year</option>
                            <option>Last 2 Years</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Initial Capital</label>
                        <input type="number" class="form-input" value="100000" step="1000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Commission per Trade</label>
                        <input type="number" class="form-input" value="1.00" step="0.01">
                    </div>
                </div>
            </div>

            <!-- Test Results -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Validation Results</h3>
                <div id="validation-status" style="text-align: center; padding: 2rem; color: #64748b;">
                    Click "Run Full Validation" to see test results
                </div>
                
                <div id="validation-results" style="display: none;">
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
                        <div class="performance-card">
                            <div class="performance-value positive">+18.7%</div>
                            <div class="metric-label">Total Return</div>
                        </div>
                        <div class="performance-card">
                            <div class="performance-value">1.42</div>
                            <div class="metric-label">Sharpe Ratio</div>
                        </div>
                        <div class="performance-card">
                            <div class="performance-value negative">-5.3%</div>
                            <div class="metric-label">Max Drawdown</div>
                        </div>
                        <div class="performance-card">
                            <div class="performance-value">67.2%</div>
                            <div class="metric-label">Win Rate</div>
                        </div>
                    </div>

                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Test Type</th>
                                <th>Status</th>
                                <th>Result</th>
                                <th>Score</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data Quality Check</td>
                                <td><span class="trading-status status-active">✅ Passed</span></td>
                                <td>All tickers have sufficient data</td>
                                <td>100%</td>
                                <td>No missing data found</td>
                            </tr>
                            <tr>
                                <td>Logic Validation</td>
                                <td><span class="trading-status status-active">✅ Passed</span></td>
                                <td>Strategy logic is mathematically sound</td>
                                <td>95%</td>
                                <td>Minor optimization suggested</td>
                            </tr>
                            <tr>
                                <td>Risk Assessment</td>
                                <td><span class="trading-status status-paused">⚠️ Warning</span></td>
                                <td>Moderate risk detected</td>
                                <td>75%</td>
                                <td>Consider position sizing limits</td>
                            </tr>
                            <tr>
                                <td>Market Regime Test</td>
                                <td><span class="trading-status status-active">✅ Passed</span></td>
                                <td>Performs well across market conditions</td>
                                <td>88%</td>
                                <td>Strong in trending markets</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="margin-top: 2rem; text-align: center;">
                        <button class="btn btn-success" onclick="showAlert('🚀 Moving to optimization...'); showPage('optimization')">Proceed to Optimization</button>
                        <button class="btn btn-secondary" onclick="showAlert('📊 Detailed report generated')" style="margin-left: 1rem;">Generate Detailed Report</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enhanced Optimization Page -->
        <div class="page" id="optimization">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: #1e40af; font-size: 2.5rem;">⚙️ Strategy Optimization Engine</h1>
                <button class="btn btn-primary" onclick="startOptimization()">Start Optimization</button>
            </div>

            <!-- Optimization Method Selection -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Select Optimization Method</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                    <div class="strategy-card" onclick="selectOptimizationMethod('genetic')" style="cursor: pointer; border: 2px solid transparent;" id="genetic-card">
                        <div style="text-align: center;">
                            <h4 style="color: #1e40af;">🧬 Genetic Algorithm</h4>
                            <p style="color: #64748b; font-size: 0.9rem;">Best for complex parameter spaces. Uses evolutionary principles to find optimal combinations.</p>
                            <div style="margin-top: 1rem;">
                                <span style="background: #dcfce7; color: #059669; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem;">Recommended</span>
                            </div>
                        </div>
                    </div>
                    <div class="strategy-card" onclick="selectOptimizationMethod('bruteforce')" style="cursor: pointer; border: 2px solid transparent;" id="bruteforce-card">
                        <div style="text-align: center;">
                            <h4 style="color: #1e40af;">🔍 Brute Force</h4>
                            <p style="color: #64748b; font-size: 0.9rem;">Tests all possible combinations. Thorough but slower for large parameter spaces.</p>
                            <div style="margin-top: 1rem;">
                                <span style="background: #fef3c7; color: #d97706; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem;">Thorough</span>
                            </div>
                        </div>
                    </div>
                    <div class="strategy-card" onclick="selectOptimizationMethod('ml')" style="cursor: pointer; border: 2px solid transparent;" id="ml-card">
                        <div style="text-align: center;">
                            <h4 style="color: #1e40af;">🤖 Machine Learning</h4>
                            <p style="color: #64748b; font-size: 0.9rem;">Uses AI to intelligently search parameter space. Fast and adaptive.</p>
                            <div style="margin-top: 1rem;">
                                <span style="background: #f3e8ff; color: #7c3aed; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem;">Advanced</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Parameter Ranges -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Parameter Ranges</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h4 style="margin-bottom: 1rem;">Technical Indicators</h4>
                        <div class="form-group">
                            <label class="form-label">RSI Period Range</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <input type="number" class="form-input" value="10" min="5" max="50" style="width: 30%;">
                                <span>to</span>
                                <input type="number" class="form-input" value="30" min="5" max="50" style="width: 30%;">
                                <span style="font-size: 0.8rem; color: #64748b;">Step: 2</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">RSI Oversold Threshold</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <input type="number" class="form-input" value="20" min="10" max="40" style="width: 30%;">
                                <span>to</span>
                                <input type="number" class="form-input" value="35" min="10" max="40" style="width: 30%;">
                                <span style="font-size: 0.8rem; color: #64748b;">Step: 1</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1rem;">Risk Management</h4>
                        <div class="form-group">
                            <label class="form-label">Take Profit % Range</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <input type="number" class="form-input" value="2" min="1" max="20" step="0.5" style="width: 30%;">
                                <span>to</span>
                                <input type="number" class="form-input" value="10" min="1" max="20" step="0.5" style="width: 30%;">
                                <span style="font-size: 0.8rem; color: #64748b;">Step: 0.5</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Stop Loss % Range</label>
                            <div style="display: flex; gap: 0.5rem; align-items: center;">
                                <input type="number" class="form-input" value="1" min="0.5" max="10" step="0.25" style="width: 30%;">
                                <span>to</span>
                                <input type="number" class="form-input" value="5" min="0.5" max="10" step="0.25" style="width: 30%;">
                                <span style="font-size: 0.8rem; color: #64748b;">Step: 0.25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Optimization Progress -->
            <div class="dashboard-card" style="margin-bottom: 2rem; display: none;" id="optimization-progress">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Optimization in Progress</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; margin-bottom: 1rem;">
                    <div>
                        <div style="font-size: 0.9rem; color: #64748b;">Progress</div>
                        <div style="font-size: 1.2rem; font-weight: bold;" id="progress-text">0 / 1000 iterations</div>
                        <div style="width: 100%; height: 12px; background: #e2e8f0; border-radius: 6px; overflow: hidden; margin-top: 0.5rem;">
                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #1e40af); width: 0%; transition: width 0.3s ease;" id="progress-bar"></div>
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: #64748b;">Best Performance</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #059669;" id="best-performance">Sharpe: 0.00</div>
                        <div style="font-size: 0.8rem; color: #64748b;" id="improvement">No improvement yet</div>
                    </div>
                    <div>
                        <div style="font-size: 0.9rem; color: #64748b;">Time Remaining</div>
                        <div style="font-size: 1.2rem; font-weight: bold;" id="time-remaining">Calculating...</div>
                        <div style="font-size: 0.8rem; color: #64748b;">Estimated completion</div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-danger" onclick="stopOptimization()">Stop Optimization</button>
                    <button class="btn btn-secondary" onclick="showAlert('📊 Live optimization chart would open here')">View Live Chart</button>
                </div>
            </div>

            <!-- Optimization Results -->
            <div class="dashboard-card" id="optimization-results" style="display: none;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">Optimization Results</h3>
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div>
                        <h4 style="margin-bottom: 1rem;">Best Configuration Found</h4>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Original</th>
                                    <th>Optimized</th>
                                    <th>Improvement</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>RSI Period</td>
                                    <td>14</td>
                                    <td>22</td>
                                    <td class="positive">+57%</td>
                                </tr>
                                <tr>
                                    <td>RSI Threshold</td>
                                    <td>30</td>
                                    <td>25</td>
                                    <td class="positive">+23%</td>
                                </tr>
                                <tr>
                                    <td>Take Profit %</td>
                                    <td>5%</td>
                                    <td>7.5%</td>
                                    <td class="positive">+34%</td>
                                </tr>
                                <tr>
                                    <td>Stop Loss %</td>
                                    <td>3%</td>
                                    <td>2.25%</td>
                                    <td class="positive">+12%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1rem;">Performance Comparison</h4>
                        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
                            <div style="margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between;">
                                    <span>Original Sharpe:</span>
                                    <span>1.24</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-weight: bold; color: #059669;">
                                    <span>Optimized Sharpe:</span>
                                    <span>2.47</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; color: #059669;">
                                    <span>Improvement:</span>
                                    <span>+99%</span>
                                </div>
                            </div>
                            <button class="btn btn-success" style="width: 100%;" onclick="showAlert('✅ Optimized parameters applied to strategy')">Apply Optimized Settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Real-Time Task Dashboard -->
        <div class="page" id="tasks">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: #1e40af; font-size: 2.5rem;">⏱️ Real-Time Task Dashboard</h1>
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="refreshTasks()">🔄 Refresh</button>
                    <button class="btn btn-danger" onclick="showAlert('❌ All running tasks cancelled')">Cancel All</button>
                </div>
            </div>

            <!-- Task Filters -->
            <div class="search-filter-bar">
                <div class="filter-group">
                    <label>Status:</label>
                    <select class="form-select" onchange="filterTasks()">
                        <option>All Tasks</option>
                        <option>Running</option>
                        <option>Queued</option>
                        <option>Completed</option>
                        <option>Failed</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Type:</label>
                    <select class="form-select" onchange="filterTasks()">
                        <option>All Types</option>
                        <option>Validation</option>
                        <option>Backtesting</option>
                        <option>Optimization</option>
                        <option>Forward Testing</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Time Range:</label>
                    <select class="form-select">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            <!-- Active Tasks -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">🔄 Currently Running Tasks</h3>
                <div id="active-tasks">
                    <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: #f8fafc; border-radius: 12px; border-left: 4px solid #3b82f6;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div>
                                <h4 style="color: #1e40af; margin-bottom: 0.25rem;">RSI Momentum Pro - Optimization</h4>
                                <div style="color: #64748b; font-size: 0.9rem;">Genetic Algorithm • Started 14 minutes ago</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: bold; color: #059669;">68%</div>
                                <div style="font-size: 0.8rem; color: #64748b;">ETA: 8 min</div>
                            </div>
                        </div>
                        <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #059669); width: 68%; transition: width 0.3s ease;"></div>
                        </div>
                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <button class="btn btn-secondary" onclick="showAlert('📊 Task details opened')">View Details</button>
                            <button class="btn btn-danger" onclick="showAlert('❌ Task cancelled')">Cancel</button>
                        </div>
                    </div>

                    <div style="margin-bottom: 1.5rem; padding: 1.5rem; background: #f8fafc; border-radius: 12px; border-left: 4px solid #d97706;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div>
                                <h4 style="color: #1e40af; margin-bottom: 0.25rem;">Mean Reversion Alpha - Validation</h4>
                                <div style="color: #64748b; font-size: 0.9rem;">Data Quality Check • Started 3 minutes ago</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: bold; color: #d97706;">Queued</div>
                                <div style="font-size: 0.8rem; color: #64748b;">Position #2</div>
                            </div>
                        </div>
                        <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; background: #d97706; width: 0%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Task History -->
            <div class="dashboard-card">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">📋 Task History</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Strategy Name</th>
                            <th>Task Type</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Duration</th>
                            <th>Started</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>RSI Momentum Pro</strong></td>
                            <td>Optimization</td>
                            <td><span class="trading-status" style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669;">⚡ Running</span></td>
                            <td>68%</td>
                            <td>14 min</td>
                            <td>2:15 PM</td>
                            <td>
                                <button class="btn btn-secondary" onclick="showAlert('📊 Task details')">Details</button>
                                <button class="btn btn-danger" onclick="showAlert('❌ Task cancelled')">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Breakout Scanner V2</strong></td>
                            <td>Backtesting</td>
                            <td><span class="trading-status" style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669;">✅ Completed</span></td>
                            <td>100%</td>
                            <td>23 min</td>
                            <td>1:45 PM</td>
                            <td>
                                <button class="btn btn-secondary" onclick="showAlert('📊 Results opened')">View Results</button>
                                <button class="btn btn-secondary" onclick="showAlert('📄 Report downloaded')">Download</button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>MACD Cross Strategy</strong></td>
                            <td>Validation</td>
                            <td><span class="trading-status" style="background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626;">❌ Failed</span></td>
                            <td>45%</td>
                            <td>8 min</td>
                            <td>1:20 PM</td>
                            <td>
                                <button class="btn btn-secondary" onclick="showAlert('🔍 Error: Insufficient data for AMZN')">View Error</button>
                                <button class="btn btn-primary" onclick="showAlert('🔄 Task restarted')">Retry</button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Volume Spike Detector</strong></td>
                            <td>Forward Testing</td>
                            <td><span class="trading-status" style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669;">✅ Completed</span></td>
                            <td>100%</td>
                            <td>2h 15m</td>
                            <td>11:30 AM</td>
                            <td>
                                <button class="btn btn-secondary" onclick="showAlert('📊 Live results opened')">View Results</button>
                                <button class="btn btn-success" onclick="showAlert('🚀 Strategy deployed to live trading')">Deploy Live</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Performance Reports Page -->
        <div class="page" id="reports">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: #1e40af; font-size: 2.5rem;">📋 Performance Reports</h1>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="generateReport()">📊 Generate New Report</button>
                    <button class="btn btn-secondary" onclick="showAlert('📤 All reports exported')">Export All</button>
                </div>
            </div>

            <!-- Report Filters -->
            <div class="search-filter-bar">
                <div class="filter-group">
                    <label>Strategy:</label>
                    <select class="form-select">
                        <option>All Strategies</option>
                        <option>RSI Momentum Pro</option>
                        <option>Mean Reversion Alpha</option>
                        <option>Breakout Scanner</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Time Period:</label>
                    <select class="form-select">
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>Last Year</option>
                        <option>All Time</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Report Type:</label>
                    <select class="form-select">
                        <option>All Reports</option>
                        <option>Performance Summary</option>
                        <option>Risk Analysis</option>
                        <option>Strategy Comparison</option>
                    </select>
                </div>
            </div>

            <!-- Key Performance Metrics -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1.5rem;">📈 Portfolio Performance Summary</h3>
                
                <!-- Performance Cards -->
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
                    <div class="performance-card">
                        <div class="performance-value positive">+24.7%</div>
                        <div class="metric-label">Total Return</div>
                        <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">vs S&P 500: +18.2%</div>
                    </div>
                    <div class="performance-card">
                        <div class="performance-value">2.34</div>
                        <div class="metric-label">Sharpe Ratio</div>
                        <div style="font-size: 0.8rem; color: #059669; margin-top: 0.5rem;">Excellent</div>
                    </div>
                    <div class="performance-card">
                        <div class="performance-value">1.87</div>
                        <div class="metric-label">Profit Factor</div>
                        <div style="font-size: 0.8rem; color: #059669; margin-top: 0.5rem;">Above Target</div>
                    </div>
                    <div class="performance-card">
                        <div class="performance-value negative">-5.3%</div>
                        <div class="metric-label">Max Drawdown</div>
                        <div style="font-size: 0.8rem; color: #059669; margin-top: 0.5rem;">Within Limits</div>
                    </div>
                    <div class="performance-card">
                        <div class="performance-value">68.4%</div>
                        <div class="metric-label">Win Rate</div>
                        <div style="font-size: 0.8rem; color: #059669; margin-top: 0.5rem;">Strong</div>
                    </div>
                </div>

                <!-- Equity Curve Chart -->
                <div class="chart-container" style="height: 300px; margin-bottom: 2rem;">
                    <div style="text-align: center;">
                        <h4 style="color: #1e40af; margin-bottom: 1rem;">📈 Equity Curve (Last 12 Months)</h4>
                        <div style="color: #64748b;">Interactive equity curve chart would appear here</div>
                        <div style="margin-top: 1rem;">
                            <button class="btn btn-secondary" onclick="showAlert('📊 Full chart opened')">View Full Chart</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Strategy Comparison -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">⚖️ Strategy Comparison Report</h3>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Strategy</th>
                            <th>Total Return</th>
                            <th>Sharpe Ratio</th>
                            <th>Max Drawdown</th>
                            <th>Win Rate</th>
                            <th>Profit Factor</th>
                            <th>Calmar Ratio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #dcfce7;">
                            <td><strong>🥇 RSI Momentum Pro</strong></td>
                            <td class="positive">+24.7%</td>
                            <td>2.34</td>
                            <td class="negative">-3.2%</td>
                            <td>68.4%</td>
                            <td>1.87</td>
                            <td>7.72</td>
                            <td><span class="trading-status status-active">Live</span></td>
                        </tr>
                        <tr>
                            <td><strong>🥈 Mean Reversion Alpha</strong></td>
                            <td class="positive">+18.9%</td>
                            <td>1.87</td>
                            <td class="negative">-5.1%</td>
                            <td>64.2%</td>
                            <td>1.54</td>
                            <td>3.71</td>
                            <td><span class="trading-status status-active">Live</span></td>
                        </tr>
                        <tr>
                            <td><strong>🥉 Breakout Scanner</strong></td>
                            <td class="positive">+16.7%</td>
                            <td>1.54</td>
                            <td class="negative">-7.3%</td>
                            <td>56.8%</td>
                            <td>1.43</td>
                            <td>2.29</td>
                            <td><span class="trading-status status-paused">Testing</span></td>
                        </tr>
                        <tr>
                            <td><strong>Trend Following</strong></td>
                            <td class="positive">+12.1%</td>
                            <td>1.32</td>
                            <td class="negative">-9.8%</td>
                            <td>52.3%</td>
                            <td>1.28</td>
                            <td>1.23</td>
                            <td><span class="trading-status status-paused">Paused</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Risk Analysis -->
            <div class="dashboard-card">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">🛡️ Risk Analysis Report</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h4 style="margin-bottom: 1rem;">Risk Metrics</h4>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Value at Risk (95%):</span>
                                <span class="negative">-2.8%</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Expected Shortfall:</span>
                                <span class="negative">-4.2%</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Beta to Market:</span>
                                <span>0.84</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Correlation to S&P 500:</span>
                                <span>0.68</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Volatility (Annualized):</span>
                                <span>14.7%</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1rem;">Risk Assessment</h4>
                        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
                            <div style="margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <span>Overall Risk Score:</span>
                                    <span style="background: #fef3c7; color: #d97706; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">Medium</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; background: #d97706; width: 60%; transition: width 0.3s ease;"></div>
                                </div>
                            </div>
                            <div style="font-size: 0.9rem; color: #64748b;">
                                Portfolio shows moderate risk levels with good diversification across strategies. Consider position sizing limits for high-volatility periods.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enhanced Live Trading Page -->
        <div class="page" id="live-trading">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h1 style="color: #1e40af; font-size: 2.5rem;">🔴 Live Trading & Forward Testing</h1>
                <div class="action-buttons">
                    <button class="btn btn-success" onclick="deployStrategy()">🚀 Deploy Strategy</button>
                    <button class="btn btn-primary" onclick="startForwardTest()">🧪 Start Forward Test</button>
                    <button class="btn btn-danger" onclick="showAlert('🛑 Emergency stop executed for all strategies')">Emergency Stop All</button>
                </div>
            </div>

            <!-- Deployment Panel -->
            <div class="dashboard-card" style="margin-bottom: 2rem; display: none;" id="deployment-panel">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">🚀 Strategy Deployment</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <div class="form-group">
                            <label class="form-label">Select Strategy</label>
                            <select class="form-select">
                                <option>RSI Momentum Pro (Optimized)</option>
                                <option>Mean Reversion Alpha</option>
                                <option>Breakout Scanner V2</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Deployment Mode</label>
                            <select class="form-select">
                                <option>Paper Trading (Simulated)</option>
                                <option>Live Trading (Real Money)</option>
                                <option>Forward Testing</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Position Size</label>
                            <input type="number" class="form-input" value="10000" placeholder="USD Amount">
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <label class="form-label">Risk Limits</label>
                            <input type="number" class="form-input" value="5" placeholder="Max Drawdown %">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Max Positions</label>
                            <input type="number" class="form-input" value="5" placeholder="Concurrent positions">
                        </div>
                        <div style="margin-top: 2rem;">
                            <button class="btn btn-success" style="width: 100%;" onclick="confirmDeployment()">Confirm Deployment</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Forward Testing Control -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">🧪 Forward Testing Control Panel</h3>
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
                    <div>
                        <div class="form-group">
                            <label class="form-label">Strategy for Forward Test</label>
                            <select class="form-select">
                                <option>RSI Momentum Pro (Optimized)</option>
                                <option>Mean Reversion Alpha</option>
                                <option>New Strategy (Validation Passed)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Test Duration</label>
                            <select class="form-select">
                                <option>1 Week</option>
                                <option>2 Weeks</option>
                                <option>1 Month</option>
                                <option>3 Months</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" style="width: 100%;" onclick="startForwardTest()">Start Forward Test</button>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1rem;">Real-Time Forward Test Results</h4>
                        <div id="forward-test-results" style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                <div style="text-align: center;">
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #059669;">+$1,247</div>
                                    <div style="font-size: 0.8rem; color: #64748b;">Unrealized P&L</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">3</div>
                                    <div style="font-size: 0.8rem; color: #64748b;">Open Positions</div>
                                </div>
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span>Test Progress:</span>
                                    <span>Day 3 of 7</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; background: #3b82f6; width: 43%; transition: width 0.3s ease;"></div>
                                </div>
                            </div>
                            <button class="btn btn-secondary" onclick="showAlert('📊 Live results opened')">View Live Details</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Trading Status Overview -->
            <div class="dashboard-grid" style="margin-bottom: 2rem;">
                <div class="dashboard-card metric-card">
                    <div class="metric-value">$127,450</div>
                    <div class="metric-label">Total Portfolio Value</div>
                    <div class="metric-change positive">+8.7% (30d)</div>
                </div>
                <div class="dashboard-card metric-card">
                    <div class="metric-value">5</div>
                    <div class="metric-label">Active Strategies</div>
                    <div class="metric-change positive">All systems operational</div>
                </div>
                <div class="dashboard-card metric-card">
                    <div class="metric-value">$2,847</div>
                    <div class="metric-label">Today's P&L</div>
                    <div class="metric-change positive">+2.4%</div>
                </div>
            </div>

            <!-- Live Trading Logs -->
            <div class="dashboard-card" style="margin-bottom: 2rem;">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">📊 Real-Time Trading Logs</h3>
                <div style="max-height: 300px; overflow-y: auto; background: #f8fafc; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem;">
                    <div style="margin-bottom: 0.5rem; color: #059669;">[14:32:15] ✅ RSI Momentum Pro: BUY AAPL 100 shares @ $185.42 - Signal: RSI(23)</div>
                    <div style="margin-bottom: 0.5rem; color: #3b82f6;">[14:31:08] 📊 Mean Reversion Alpha: Monitoring TSLA - RSI: 67.8, approaching sell threshold</div>
                    <div style="margin-bottom: 0.5rem; color: #059669;">[14:29:45] ✅ Breakout Scanner: SELL MSFT 50 shares @ $378.95 - Profit: +$247</div>
                    <div style="margin-bottom: 0.5rem; color: #d97706;">[14:28:12] ⚠️ Risk Manager: Position size limit check passed for all strategies</div>
                    <div style="margin-bottom: 0.5rem; color: #3b82f6;">[14:26:33] 📊 Market Data: All feeds operational, latency: 12ms avg</div>
                    <div style="margin-bottom: 0.5rem; color: #dc2626;">[14:25:18] ❌ Connection retry: Broker API reconnected successfully</div>
                    <div style="margin-bottom: 0.5rem; color: #059669;">[14:23:45] ✅ RSI Momentum Pro: Position closed - GOOGL +$156 profit</div>
                    <div style="color: #3b82f6;">[14:22:10] 📊 System Health: All strategies running normally</div>
                </div>
                <div style="margin-top: 1rem; text-align: center;">
                    <button class="btn btn-secondary" onclick="showAlert('📋 Full log exported')">Export Full Log</button>
                    <button class="btn btn-secondary" onclick="showAlert('🔍 Advanced filter opened')" style="margin-left: 1rem;">Filter Logs</button>
                </div>
            </div>

            <!-- Error Handling & Notifications -->
            <div class="dashboard-card">
                <h3 style="color: #1e40af; margin-bottom: 1rem;">🚨 System Alerts & Error Handling</h3>
                <div>
                    <div style="padding: 1rem; margin-bottom: 0.75rem; background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>✅ All Systems Operational</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">All strategies are running normally with no errors detected.</div>
                        </div>
                        <button class="btn btn-secondary" onclick="showAlert('✅ System health check completed')">Check Status</button>
                    </div>
                    
                    <div style="padding: 1rem; margin-bottom: 0.75rem; background: linear-gradient(135deg, #fef3c7, #fed7aa); color: #d97706; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>⚠️ Data Feed Latency Warning</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Market data feed experiencing slight delays (avg 45ms). Monitoring...</div>
                        </div>
                        <button class="btn btn-secondary" onclick="showAlert('🔄 Attempting to switch to backup feed')">Troubleshoot</button>
                    </div>
                    
                    <div style="padding: 1rem; background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>❌ Strategy "MACD Cross" - Execution Error</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Failed to execute trade for AMZN - insufficient buying power. Strategy paused.</div>
                        </div>
                        <div>
                            <button class="btn btn-secondary" onclick="showAlert('🔄 Strategy restarted with adjusted position size')" style="margin-right: 0.5rem;">Retry</button>
                            <button class="btn btn-secondary" onclick="showAlert('📊 Error details opened')">Details</button>
                        </div>
                    </div>
                </div>
            </div>
