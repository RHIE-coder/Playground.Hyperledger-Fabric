#! /bin/bash

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

while [[ true ]];
do
    let tmp=$RANDOM/3200

    if [[ tmp%2 -eq 1 ]];then
        export CORE_PEER_TLS_ENABLED=true
        export CORE_PEER_LOCALMSPID="Org1MSP"
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.flea.com/peers/peer0.org1.flea.com/tls/ca.crt
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.flea.com/users/Admin@org1.flea.com/msp
        export CORE_PEER_ADDRESS=localhost:7051
    else
        export CORE_PEER_TLS_ENABLED=true
        export CORE_PEER_LOCALMSPID="Org2MSP"
        export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.flea.com/peers/peer0.org2.flea.com/tls/ca.crt
        export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.flea.com/users/Admin@org2.flea.com/msp
        export CORE_PEER_ADDRESS=localhost:9051
    fi

    sleep $tmp
    peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.flea.com --tls --cafile ${PWD}/organizations/ordererOrganizations/flea.com/orderers/orderer.flea.com/msp/tlscacerts/tlsca.flea.com-cert.pem -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.flea.com/peers/peer0.org1.flea.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.flea.com/peers/peer0.org2.flea.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'

    echo "숙성중...$CORE_PEER_LOCALMSPID"
done