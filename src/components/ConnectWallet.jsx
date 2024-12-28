"use client";
import { ethers } from "ethers"; // Sadece ethers'i import edin
import { useState, useEffect } from "react";
import Button from "./Button";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = ethers.getAddress(accounts[0]);
        setWalletAddress(account);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setNetwork(network);
      } catch (error) {
        console.error("Error request wallet:", error);
      }
    } else {
      alert(
        "Cüzdan bulunamadı. Lütfen MetaMask gibi bir cüzdan sağlayıcısını kurun."
      );
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      const account = ethers.getAddress(accounts[0]);
      setWalletAddress(account);
    } else {
      setWalletAddress(null);
    }
  };

  const handleChainChanged = async (_chainId) => {
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, []);

  return (
    <div className="text-center">
      {walletAddress ? (
        <div>
          <p className="mb-2">
            <strong>Cüzdan Adresi:</strong> {walletAddress}
          </p>
          {network && (
            <p>
              <strong>BAŞARILI!</strong>
            </p>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
