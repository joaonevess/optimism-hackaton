#! /bin/bash

(cd sibyl && forge build);
(cp sibyl/out/Sibyl.sol/Sibyl.json frontend/src/lib);
(mkdir -p backend/abi);
(cp sibyl/out/Sibyl.sol/Sibyl.json backend/abi/Sibyl.json);