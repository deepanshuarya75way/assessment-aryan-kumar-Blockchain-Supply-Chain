import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


// -------------------------
// ENCRYPTION
// -------------------------
// const ENCRYPTION_KEY = crypto
//   .createHash("sha256")
//   .update(process.env.ENCRYPTION_SECRET)
//   .digest();

//   const IV_LENGTH = 16;

//   function encrypt(text) {
//     const iv = crypt.randomBytes(IV_LENGTH);

//     const cipher = crypto.createCipheriv(
//       "aes-256-cbc", ENCRYPTION_KEY, iv
//     );

//     let encrypted = cipher.update(text, "utf8", "hex");
//     encrypted += cipher.final("hex");

//     return `${iv.toString("hex")}:${encrypted}`;
//   }

//   // -------------------------
//   // DECRYTION
//   // -------------------------

//   function decrypt(text) {
//     const parts = text.split(":");
    
//     const iv = Buffer.from(parts[0], "hex");
//     const encrytedText = parts[1];

//     const decipher = crypto.createDecipheriv(
//       "aes-256-cbc",
//       ENCRYPTION_KEY, iv
//     );

//     let decrypted = decipher.update(encrytedText, "hex", "utf8");
//     decrypted += decipher.final("utf8");

//     return decrypted;
//   }


// const app = express();
// app.use(cors());
// app.use(express.json());

// =========================
//  CONNECT TO HARDHAT NODE
// =========================
//
// Hardhat Account #0 (SAFE FOR DEV ONLY)
// const privateKey = process.env.PRIVATE_KEY;

// const wallet = new ethers.Wallet(privateKey, provider);

// =========================
//  LOAD CONTRACT ABI
// =========================
const abi = JSON.parse(
  fs.readFileSync(
    "./artifacts/contracts/SupplyChain.sol/SupplyChain.json",
    "utf8"
  )
).abi;

// =========================
//  CONTRACT ADDRESS
// =========================
const contractAddress = JSON.parse(
  fs.readFileSync("./contract-address.json", "utf8")
).address;

const contract = new ethers.Contract(contractAddress, abi, wallet);

// =========================
// ADD PRODUCT (with origin)
// =========================
app.post("/add", async (req, res) => {
  try {
    const { name, origin } = req.body;

    const tx = await
    contract.addProduct(name, origin);
    await tx.wait();

    const count = await contract.getTotalProducts();
    const productId = Number(count) - 1;

    conole.log("New product ID : ", productId);
  
    res.json({
      success: true,
      productId : productId;
    });

  } catch (err) {
    console.log(err);
    res.status(500).send(err.toString());
  }
});

// =========================
//  ADD MOVEMENT
// =========================
app.post("/move", async (req, res) => {
  try {
    const { id, location } = req.body;
        
    const tx = await contract.addMovement(id, location);
    await tx.wait();

    res.send("📍 Movement added");
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// =========================
//  GET PRODUCT LIST (for UI IDs)
// =========================
app.get("/products", async (req, res) => {
  try {
    let list = [];

    for (let i = 0; i < 20; i++) {
      try {
        const name = await contract.getProduct(i);
        list.push({ id: i, name });
      } catch {
        break;
      }
    }

    res.json(list);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// =========================
//  TRACK FULL HISTORY
// =========================
app.get("/history/:id", async (req, res) => {
  try {
    const data = await contract.getHistory(req.params.id);

    const formatted = data.map((h) => ({
      location: h.location,
      timestamp: h.timestamp.toString(),
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// =========================
// START SERVER
// =========================
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});