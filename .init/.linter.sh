#!/bin/bash
cd /home/kavia/workspace/code-generation/admin-dashboard-responsive-conversion-39944-39953/dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

