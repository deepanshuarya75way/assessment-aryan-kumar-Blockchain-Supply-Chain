const { spawn } = require("child_process");

console.log("🚀 Starting Blockchain Supply Chain...\n");

const processes = [];

function run(command, args) {
    const child = spawn(command, args, {
        shell: true,
        stdio: "inherit"
    });

    processes.push(child);
    return child;
}

// 1. Start Hardhat blockchain
console.log("⛓️ Starting Hardhat blockchain...");
run("npm", ["run", "node"]);

// 2. Wait for Hardhat, then deploy contract
setTimeout(() => {
    console.log("\n📦 Deploying smart contract...");
    run("npm", ["run", "deploy"]);
}, 5000);

// 3. Start backend after deployment
setTimeout(() => {
    console.log("\n🚀 Starting backend server...");
    run("npm", ["run", "server"]);
}, 10000);

// 4. Start frontend
setTimeout(() => {
    console.log("\n🌐 Starting frontend...");
    run("npx", ["serve", "."]);
}, 12000);

// Stop all processes with Ctrl+C
process.on("SIGINT", () => {
    console.log("\n🛑 Stopping all services...");

    processes.forEach((process) => {
        process.kill();
    });

    process.exit();
});