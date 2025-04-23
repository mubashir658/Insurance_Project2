import express from "express";
import { spawn } from "child_process";
import BasicQuestion from "../models/BasicQuestion.js";
import fs from "fs";
import path from "path";
import os from "os";

const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      area,
      qualification,
      income,
      vintage,
      claimAmount,
      numberOfPolicies,
      policiesChosen,
      maritalStatus,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const policyTypeMap = {
      A: "health",
      B: "vehicle",
      C: "life",
    };
    const policyType = policyTypeMap[policiesChosen] || "unknown";

    const inputData = {
      gender,
      area,
      qualification,
      income: income ? (Number(income) <= 500000 ? "2L-5L" : "5L-10L") : "2L-5L", // Align with le_income.classes_
      marital_status: maritalStatus === "married" ? 1 : 0,
      vintage: Number(vintage) || 0,
      claim_amount: Number(claimAmount) || 0,
      num_policies: Number(numberOfPolicies) > 1 ? "More than 1" : "1",
      policy: policiesChosen || "A",
      type_of_policy: "Silver",
    };

    console.log("Input data for grok.py:", inputData);

    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `grok_input_${Date.now()}.json`);
    fs.writeFileSync(tempFilePath, JSON.stringify(inputData, null, 2));

    const pythonProcess = spawn(
      "C:\\Users\\vamsh\\AppData\\Local\\Programs\\Python\\Python312\\python.exe",
      ["C:\\Users\\vamsh\\Source\\ps-2\\Insurance_Project2\\dl\\grok.py", tempFilePath]
    );

    let pythonOutput = "";
    let pythonError = "";

    pythonProcess.stdout.on("data", (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      pythonError += data.toString();
    });

    pythonProcess.on("error", (error) => {
      console.error("Python process error:", error.message);
      pythonError += `Process error: ${error.message}\n`;
    });

    pythonProcess.on("close", async (code) => {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (err) {
        console.error("Error deleting temporary file:", err.message);
      }

      console.log("Python script exited with code:", code);
      console.log("Raw Python output:", pythonOutput);
      console.log("Raw Python error:", pythonError);

      if (code !== 0) {
        return res.status(500).json({
          success: false,
          message: `Python script failed with code ${code}`,
          error: pythonError || "No error output captured",
          rawOutput: pythonOutput,
        });
      }

      try {
        const result = JSON.parse(pythonOutput.trim());
        console.log("Parsed Python script output:", result);

        if (result.error) {
          return res.status(500).json({
            success: false,
            message: "Python script returned an error",
            error: result.error,
            rawOutput: pythonOutput,
          });
        }

        const basicQuestion = new BasicQuestion({
          name,
          email,
          gender,
          area,
          qualification,
          income,
          vintage,
          claimAmount,
          numberOfPolicies,
          policiesChosen,
          policyType,
          maritalStatus,
          result: result.prominent || "No",
        });

        await basicQuestion.save();
        console.log("Data saved to MongoDB:", basicQuestion);
        res.json({ success: true, message: "Form data saved successfully", result: result.prominent });
      } catch (error) {
        console.error("Error processing Python output or saving to MongoDB:", error.message, error.stack);
        res.status(500).json({
          success: false,
          message: "Failed to process model prediction or save data",
          error: error.message,
          rawOutput: pythonOutput,
          rawError: pythonError,
        });
      }
    });
  } catch (error) {
    console.error("Error in /submit endpoint:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Failed to process form submission", error: error.message });
  }
});

export default router;