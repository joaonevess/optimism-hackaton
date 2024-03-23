#! /bin/bash

# Default Anvil private key/address for local development
OWNER_ADDRESS="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

cd sibyl && forge create --chain optimism  --rpc-url http://127.0.0.1:8545  --constructor-args  $OWNER_ADDRESS --private-key $PRIVATE_KEY src/Sibyl.sol:Sibyl --json | tee ../frontend/src/lib/SibylDeployment.json ../backend/abi/SibylDeployment.json


