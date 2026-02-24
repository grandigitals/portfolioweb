#!/bin/bash

echo "========================================"
echo "SportsDash Pro - Quick Start"
echo "========================================"
echo ""

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null
then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

node --version
echo ""

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    exit 1
fi

echo ""
echo "========================================"
echo "Installation complete!"
echo "Starting development server..."
echo "========================================"
echo ""
echo "The app will open at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
