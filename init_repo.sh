#!/usr/bin/env bash

# This script initializes the folder structure for the "Samer Trader" platform.
# Run it from the directory that should contain the top-level samer_trader2/ folder.

set -e

# Create top-level project folder and initialize git repository
mkdir -p samer_trader2
cd samer_trader2

# Initialize git repository (if not already initialized)
if [ ! -d .git ]; then
    git init
fi

# Create top-level directories
mkdir -p backend frontend mobile docs scripts tests infrastructure

# Backend subdirectories for each phase and module
mkdir -p backend/phase1_strategy_builder/{models,routers,services,tests}
mkdir -p backend/phase1_backtesting_engine/{engine,data,queue,tests}
mkdir -p backend/phase1_performance_analytics/{metrics,api,tests}
mkdir -p backend/phase1_paper_trading/{broker_sim,api,tests}
mkdir -p backend/phase1_user_management/{auth,models,api,tests}
mkdir -p backend/phase2_auto_strategy_generator/{genetic_algorithm,ml_models,api,tests}
mkdir -p backend/phase2_optimization_engine/{algorithms,parallel,api,tests}
mkdir -p backend/phase2_validation_pipeline/{walk_forward,monte_carlo,statistics,api,tests}
mkdir -p backend/phase2_risk_management/{risk_engine,alerts,api,tests}
mkdir -p backend/phase3_live_trading_engine/{brokers,order_manager,logging,api,tests}
mkdir -p backend/phase3_alert_system/{alert_rules,notification,api,tests}
mkdir -p backend/phase3_api_framework/{routers,models,schemas,services,tests}
mkdir -p backend/phase4_ml_enhancement/{model_training,model_serving,api,tests}
mkdir -p backend/phase4_portfolio_optimization/{mpt,cvxpy,api,tests}
mkdir -p backend/phase4_compliance_reporting/{audit_logger,report_generator,api,tests}

# Frontend structure
mkdir -p frontend/web_app/src/{pages,components,services}
mkdir -p frontend/web_app/public
mkdir -p frontend/web_app/tests
mkdir -p frontend/admin_app/src/{pages,components,services}
mkdir -p frontend/admin_app/public
mkdir -p frontend/admin_app/tests

# Mobile structure
mkdir -p mobile/{ios,android,common,tests}

# Docs directories
mkdir -p docs/{phase1_design,phase2_design,phase3_design,phase4_design,architecture,user_stories,api_specs}

# Scripts directories and files
mkdir -p scripts/docker
: > scripts/setup_env.sh
: > scripts/deploy.sh
: > scripts/docker/Dockerfile.backend
: > scripts/docker/Dockerfile.frontend

# Infrastructure directories
mkdir -p infrastructure/{terraform,kubernetes,ci_cd}

# Tests directories
mkdir -p tests/{integration,e2e,performance}

# Add top-level README and .gitignore if they do not exist
if [ ! -f README.md ]; then
cat <<'README' > README.md
# Samer Trader 2

This repository contains the folder structure for the Samer Trader algorithmic trading platform.

## Phases Overview
- Phase 1: Strategy Builder, Backtesting Engine, Performance Analytics, Paper Trading, User Management
- Phase 2: Auto Strategy Generator, Optimization Engine, Validation Pipeline, Risk Management
- Phase 3: Live Trading Engine, Alert System, API Framework
- Phase 4: ML Enhancement, Portfolio Optimization, Compliance Reporting

Each phase contains multiple modules with their own subdirectories.
README
fi

if [ ! -f .gitignore ]; then
cat <<'GITIGNORE' > .gitignore
# Python
__pycache__/
*.py[cod]
*.egg-info/

# Node
node_modules/

# IDE files
.vscode/
.idea/
.DS_Store

# Environment files
.env
GITIGNORE
fi

# Create empty top-level directories with .gitkeep to track them
find . -type d -empty -exec touch {}/.gitkeep \;

# End of script
