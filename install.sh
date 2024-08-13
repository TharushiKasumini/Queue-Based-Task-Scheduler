#!/bin/bash

cd ./Server
pip install -r requirements.txt

cd ../
cd ./Client
npm install
cd ../

cd ./Server
python api.py

echo "Server is running successfully"

cd ../
cd ./Client
npm run dev

echo "Client is running successfully"