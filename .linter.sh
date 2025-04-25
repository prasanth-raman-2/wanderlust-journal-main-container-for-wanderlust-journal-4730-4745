#!/bin/bash
cd /home/kavia/workspace/wanderlust-journal-main-container-for-wanderlust-journal-4730-4745/core_component_for_wanderlust_journal
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

