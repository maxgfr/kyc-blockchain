#!/bin/bash

cd dist

composer network install --card PeerAdmin@hlfv1 --archiveFile kyc.bna

composer network start --networkName kyc --networkVersion 0.0.1 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw

composer card import --file admin@kyc.card

composer network ping --card admin@kyc

composer-rest-server --card admin@kyc
