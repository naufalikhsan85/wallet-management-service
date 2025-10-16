import { Request, Response } from 'express';
import Web3 from 'web3';
import dotenv from 'dotenv';
import { handleOps, getActiveRPC } from "core-account-abstraction-sdk";

dotenv.config();

interface BuildTxBody {
  privateKey: string;
  deployedWalletAddress: string;
  targetContract: string;
  value?: string;
}

const build = async (req: Request, res: Response) => {
  try {
    const body = req.body as BuildTxBody;

    const { privateKey, targetContract, value = "0", deployedWalletAddress } = body;

    if (!privateKey || !targetContract) {
      res.status(400).json({ error: "Missing required fields: privateKey, targetContract, methodName" });
      return;
    }

    const rpc = await getActiveRPC();
    const web3 = new Web3(rpc);

    const data = web3.eth.abi.encodeFunctionCall(
      { name: "increase", type: "function", inputs: [] },
      []
    );

    const currentBlock = Number(await web3.eth.getBlockNumber());
    const clientBlockNumber = currentBlock + 100;
    const userNonce = 0;

    const dataHash = web3.utils.keccak256(data);
    const messageHash = web3.utils.soliditySha3(
      { type: "address", value: deployedWalletAddress },
      { type: "address", value: targetContract },
      { type: "uint256", value: value },
      { type: "bytes32", value: dataHash },
      { type: "uint256", value: clientBlockNumber },
      { type: "uint256", value: userNonce }
    )!;
    const signatureObj = web3.eth.accounts.sign(messageHash, privateKey);

    res.status(200).json({
      deployedWalletAddress,
      targetContract,
      data,
      dataHash,
      value,
      clientBlockNumber,
      userNonce,
      messageHash,
      signature: signatureObj.signature,
    });

    return;

  } catch (err: any) {
    console.error('Error building transaction:', err.message);
    res.status(500).json({ error: err.toString() });
    return;
  }
};

const send = async (req: Request, res: Response) => {
  try {
    const { privateKey, walletAddress, targetContract, methodData, value, clientBlockNumber, userNonce, signature } = req.body;

    if (!privateKey || !walletAddress || !targetContract || !methodData || !signature) {
      res.status(400).json({ error: "Missing required fields for send" });
      return;
    }

    const txHash = await handleOps({
      privateKey,
      walletAddress,
      targetContract,
      methodData,
      value: value || "0",
      clientBlockNumber,
      userNonce,
      signature,
    });

    res.status(200).json({ txHash });
    return;
  } catch (err: any) {
    console.error('Error sending transaction:', err.message);
    res.status(500).json({ error: err.toString() });
    return;
  }
};

export { build, send };
