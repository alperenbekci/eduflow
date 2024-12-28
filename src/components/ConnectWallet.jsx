// components/ConnectWallet.jsx
"use client";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const router = useRouter();

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

        router.push("/messages");
      } catch (error) {
        console.error("Error request wallet:", error);
      }
    } else {
      alert(
        "Cüzdan bulunamadı. Lütfen MetaMask gibi bir cüzdan sağlayıcısını kurun."
      );
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setNetwork(null);
    // Ek olarak, cüzdan bağlantısını kesmek için gerekli işlemler
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
    <div className="flex flex-col md:flex-row items-center">
      {walletAddress ? (
        <div className="flex flex-col md:flex-row items-center md:space-x-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <strong className="text-blue-500">Cüzdan Adresi:</strong>
            <span className="text-black break-all">{walletAddress}</span>
          </div>
          {network && (
            <button
              onClick={disconnectWallet}
              className="mt-2 md:mt-0 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
            >
              Disconnect Wallet
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
