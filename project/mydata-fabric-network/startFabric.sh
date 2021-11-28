#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE="javascript" # just show language
CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
CC_SRC_PATH=/opt/gopath/src/github.com/chaincode/javascript

# clean the keystore
rm -rf ./hfc-key-store

# launch network; create channel and join peer to channel
./mydata_platform.sh down
./mydata_platform.sh up -a -n -s couchdb -o etcdraft

CONFIG_ROOT=/opt/gopath/src/github.com/hyperledger/fabric/peer
ORG1_MSPCONFIGPATH=${CONFIG_ROOT}/crypto/peerOrganizations/org1.mydata.com/users/Admin@org1.mydata.com/msp
ORG1_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/peerOrganizations/org1.mydata.com/peers/peer0.org1.mydata.com/tls/ca.crt
ORG2_MSPCONFIGPATH=${CONFIG_ROOT}/crypto/peerOrganizations/org2.mydata.com/users/Admin@org2.mydata.com/msp
ORG2_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/peerOrganizations/org2.mydata.com/peers/peer0.org2.mydata.com/tls/ca.crt
ORDERER_TLS_ROOTCERT_FILE=${CONFIG_ROOT}/crypto/ordererOrganizations/mydata.com/orderers/orderer.mydata.com/msp/tlscacerts/tlsca.mydata.com-cert.pem
set -x

echo "Installing smart contract on peer0.org1.mydata.com"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org1MSP \
  -e CORE_PEER_ADDRESS=peer0.org1.mydata.com:7051 \
  -e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
  -e CORE_PEER_TLS_ROOTCERT_FILE=${ORG1_TLS_ROOTCERT_FILE} \
  cli \
  peer chaincode install \
    -n mydata-contract \
    -v 1.0 \
    -p "$CC_SRC_PATH" \
    -l "$CC_RUNTIME_LANGUAGE"

echo "Installing smart contract on peer0.org2.mydata.com"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org2MSP \
  -e CORE_PEER_ADDRESS=peer0.org2.mydata.com:9051 \
  -e CORE_PEER_MSPCONFIGPATH=${ORG2_MSPCONFIGPATH} \
  -e CORE_PEER_TLS_ROOTCERT_FILE=${ORG2_TLS_ROOTCERT_FILE} \
  cli \
  peer chaincode install \
    -n mydata-contract \
    -v 1.0 \
    -p "$CC_SRC_PATH" \
    -l "$CC_RUNTIME_LANGUAGE"

echo "Instantiating smart contract on mydata-channel"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org1MSP \
  -e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
  cli \
  peer chaincode instantiate \
    -o orderer.mydata.com:7050 \
    -C mydata-channel \
    -n mydata-contract \
    -l "$CC_RUNTIME_LANGUAGE" \
    -v 1.0 \
    -c '{"Args":[]}' \
    -P "AND('Org1MSP.member','Org2MSP.member')" \
    --tls \
    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
    --peerAddresses peer0.org1.mydata.com:7051 \
    --tlsRootCertFiles ${ORG1_TLS_ROOTCERT_FILE}

echo "Waiting for instantiation request to be committed ..."
sleep 10

echo "Submitting initLedger transaction to smart contract on mydata-channel"
echo "The transaction is sent to the two peers with the chaincode installed (peer0.org1.mydata.com and peer0.org2.mydata.com) so that chaincode is built before receiving the following requests"
docker exec \
  -e CORE_PEER_LOCALMSPID=Org1MSP \
  -e CORE_PEER_MSPCONFIGPATH=${ORG1_MSPCONFIGPATH} \
  cli \
  peer chaincode invoke \
    -o orderer.mydata.com:7050 \
    -C mydata-channel \
    -n mydata-contract \
    -c '{"function":"initLedger","Args":[]}' \
    --waitForEvent \
    --tls \
    --cafile ${ORDERER_TLS_ROOTCERT_FILE} \
    --peerAddresses peer0.org1.mydata.com:7051 \
    --peerAddresses peer0.org2.mydata.com:9051 \
    --tlsRootCertFiles ${ORG1_TLS_ROOTCERT_FILE} \
    --tlsRootCertFiles ${ORG2_TLS_ROOTCERT_FILE}
set +x


echo "==================================================="
echo "  __  ____   ______    _  _____  _     "
echo " |  \/  \ \ / /  _ \  / \|_   _|/ \    "
echo " | |\/| |\ V /| | | |/ _ \ | | / _ \   "
echo " | |  | | | | | |_| / ___ \| |/ ___ \  "
echo " |_|  |_| |_| |____/_/   \_\_/_/   \_\ "
echo "                                       "
echo "  ____  _        _  _____ _____ ___  ____  __  __  "
echo " |  _ \| |      / \|_   _|  ___/ _ \|  _ \|  \/  | "
echo " | |_) | |     / _ \ | | | |_ | | | | |_) | |\/| | "
echo " |  __/| |___ / ___ \| | |  _|| |_| |  _ <| |  | | "
echo " |_|   |_____/_/   \_\_| |_|   \___/|_| \_\_|  |_| "
echo "==================================================="    
