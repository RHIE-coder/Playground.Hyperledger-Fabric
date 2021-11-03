export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.flea.com/peers/peer0.org2.flea.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.flea.com/users/Admin@org2.flea.com/msp
export CORE_PEER_ADDRESS=localhost:9051

peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllAssets"]}' | jq