// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

contract CertificateVerifier{

    mapping(bytes32 => bool) public certificates;
    
    address public admin;
    
    constructor() {
        admin = msg.sender;
    }
    
    // storing the hash on the blockchain
    function registerCertificate(bytes32 certificateHash) external{

        require(msg.sender == admin, "Only platform can register");

        require(!certificates[certificateHash], "Already registered");
        
        certificates[certificateHash] = true;
    }
    
    // Verify by providing the same hash
    function verifyCertificate(bytes32 certificateHash) external view returns (bool){

        return certificates[certificateHash];

    }

}



