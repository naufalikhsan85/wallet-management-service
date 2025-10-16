import Web3 from "web3";
import { getActiveRPC } from "core-account-abstraction-sdk";

export const getUserNonce = async (entryPointAddress: string, walletAddress: string, key: number = 0): Promise<string> => {
    const rpc = await getActiveRPC();
    const web3 = new Web3(rpc);

    const abi = [
        {
            "inputs": [
                { "internalType": "address", "name": "sender", "type": "address" },
                { "internalType": "uint192", "name": "key", "type": "uint192" }
            ],
            "name": "getNonce",
            "outputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const entryPoint = new web3.eth.Contract(abi, entryPointAddress);

    const userNonce = await entryPoint.methods.getNonce(walletAddress, key).call() as string;

    console.log(`🔹 Current Nonce for ${walletAddress}: ${userNonce}`);
    return userNonce;
};
