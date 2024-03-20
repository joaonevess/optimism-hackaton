#! /bin/bash

(cd sibyl && forge create --rpc-url http://127.0.0.1:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Sibyl.sol:Sibyl --json > ../frontend/src/lib/SibylDeployment.json);