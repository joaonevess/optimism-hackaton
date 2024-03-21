#! /bin/bash

(cd sibyl && forge build);
(cp sibyl/out/Sibyl.sol/Sibyl.json frontend/src/lib);
(cp sibyl/out/Sibyl.sol/Sibyl.json backend/abi/Sibyl.json);