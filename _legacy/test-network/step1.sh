#! /bin/bash

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.flea.com/peers/peer0.org1.flea.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.flea.com/users/Admin@org1.flea.com/msp
export CORE_PEER_ADDRESS=localhost:7051

peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllAssets"]}' | jq