const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");

    const supplyChain = await SupplyChain.deploy();

    await supplyChain.deployed();

    console.log("✅ Contract deployed at:", supplyChain.address);

    // Save contract address
    fs.writeFileSync(
        "./contract-address.json",
        JSON.stringify(
            {
                address: supplyChain.address
            },
            null,
            2
        )
    );

    console.log("📄 Contract address saved to contract-address.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});