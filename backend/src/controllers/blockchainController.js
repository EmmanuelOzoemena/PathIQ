
/**
 * Sends the Hash and Id to the Blockchain
 */
exports.sendToBlockchain = async (certId, certHash) => {
    try {
        console.log(`Sending Cert ${certId} to the blockchain...`);

        // Calling the function on the smart contract
        const tx = await certificateContract.recordCertificate(certId, certHash);

        // Wait for the transaction to be "mined" (confirmed)
        const receipt = await tx.wait();

        console.log("Transaction Confirmed!");
        return receipt.hash; // This is the "Transaction ID" (txHash)
    } catch (error) {
        console.error("Blockchain Error:", error);
        throw new Error("Failed to record on blockchain");
    }
};
