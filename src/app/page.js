"use client";


import Link from "next/link";
import { useState,  } from "react";



export default function Home() {
  const [account, setAccount] = useState("");


  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Metamask not installed!");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-6 flex flex-col">
      <header className="flex justify-between items-center py-4 px-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold tracking-wide">EDUFLOW</h1>
        {!account ? (
          <button
            className="bg-neutral-700 hover:bg-neutral-600 transition-colors px-4 py-2 rounded-md text-sm font-medium"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-sm bg-neutral-800 px-3 py-1 rounded-md">Connected: {account}</span>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-xl space-y-6">
          <h2 className="text-3xl font-semibold">Welcome to the Web3 Eduflow Platform</h2>
          <p className="text-base text-neutral-300">
            Engage with others by asking questions and sharing answers in a decentralized way.
          </p>
          <Link href="/questions">
            <button className="bg-neutral-800 hover:bg-neutral-700 transition-colors px-5 py-3 mt-5 rounded-md font-medium text-sm">
              Explore Questions
            </button>
          </Link>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-neutral-500 border-t border-neutral-800">
        © 2025 Eduflow. All Rights Reserved.
      </footer>
    </div>
  );
}
