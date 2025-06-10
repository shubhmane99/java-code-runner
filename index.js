// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const { exec } = require("child_process");
// const path = require("path");
// const { statSync } = require("fs");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is up and running!");
// });

// // console.log('Test directory exists:', fs.existsSync(testDir));
// // console.log('Test directory stats:', fs.statSync(testDir));
// // console.log('Node.js process UID:', process.getuid && process.getuid());
// // console.log('Try writing dummy file...');
// // fs.writeFileSync(path.join(testDir, 'dummy.txt'), 'hello');

// exec('/usr/lib/jvm/java-17-openjdk-amd64/bin/javac -version', (err, stdout, stderr) => {
//   console.log('Javac version stdout:', stdout);
//   console.log('Javac version stderr:', stderr);
//   if (err) console.error('Javac version error:', err);
// });

// function normalize(str) {
//   return str
//     .trim()
//     .replace(/\r\n/g, "\n")
//     .replace(/[ \t]+/g, " ")
//     .replace(/\n+/g, "\n");
// }

// function execCommand(command) {
//   return new Promise((resolve, reject) => {
//     exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
//       if (err) {
//         reject({ message: err.message, stderr, stdout });
//       } else {
//         resolve({ stdout });
//       }
//     });
//   });
// }


// app.post("/run", async (req, res) => {
//   const { code, questionId, userId ,testCases } = req.body;
//   console.log(userId);
  

//   // Create unique directory
//   const uid = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
// //   const tempDir = "/tmp/java-run";
// // fs.mkdirSync(tempDir, { recursive: true });

//   const tempDir = path.join("/tmp", userId);
//   // fs.mkdirSync(tempDir, { recursive: true });
//   // const tempDir = path.join(__dirname, "tempJava");
// fs.mkdirSync(tempDir, { recursive: true });
// const javaFile = path.join(tempDir, "Solution.java");


//   // const javaFile = path.join(tempDir, "Solution.java");

//   // Write user code to the unique directory
//   fs.writeFileSync(javaFile, code);
//   const normalizedCode = code.replace(/\r\n/g, "\n");
// fs.writeFileSync(javaFile, normalizedCode, { encoding: "utf8" });

//   console.log("Code written to file:\n", fs.readFileSync(javaFile, "utf-8"));
//   const stat = fs.statSync(javaFile);
// console.log("File permissions:", stat.mode.toString(8)); 
// // const { stdout: lsOut } = await execCommand(`ls -l /tmp/java-run`);
// // console.log("Directory listing of /tmp/java-run:", lsOut);

//   const cases = testCases;

//   if (!cases || !Array.isArray(cases)) {
//     return res.status(400).json({ error: "No valid test cases provided." });
//   }

//   const results = [];

//   try {
//     // Compile the Java code
//     // await execCommand(`javac ${javaFile}`);
//     await execCommand(`/usr/bin/javac ${javaFile}`);
//   } catch (compileError) {
//     console.error("⛔️ Compilation Failed:");
//   console.error("stderr:", compileError.stderr);
//   console.error("stdout:", compileError.stdout);
//   console.error("message:", compileError.message);
//     return res.json({
//       results: cases.map((c, i) => ({
//         id: i + 1,
//         input: c.input,
//         expected: c.output || c.expected,
//         output: "",
//         passed: false,
//         error: `Compilation Error: ${compileError.stderr || compileError.message}`,
//       })),
//     });
//   }

//   for (let i = 0; i < cases.length; i++) {
//     const { input, output: expected, isPattern } = cases[i];

//     try {
//       const { stdout } = await execCommand(
//         `echo "${input}" | java -cp ${tempDir} Solution`
//       );
//       const output = stdout.trim();

//       const passed = isPattern
//         ? output === expected
//         : normalize(output) === normalize(expected);

//       results.push({
//         id: i + 1,
//         input,
//         expected,
//         output,
//         passed,
//       });
//     } catch (runError) {
//       results.push({
//         id: i + 1,
//         input,
//         expected,
//         output: runError.stdout || "",
//         passed: false,
//         error: `Runtime Error: ${runError.stderr || runError.message}`,
//       });
//     }
//   }

//   // Cleanup files
//   try {
//     fs.unlinkSync(path.join(tempDir, "Solution.java"));
//     fs.unlinkSync(path.join(tempDir, "Solution.class"));
//     fs.rmdirSync(tempDir);
//   } catch (err) {
//     console.warn("Cleanup failed:", err.message);
//   }

//   res.json({ results });
// });

// app.get("/check-java", async (req, res) => {
//   const { exec } = require("child_process");

//   exec("javac -version", (err, stdout, stderr) => {
//     if (err) {
//       return res.json({ installed: false, error: err.message, stderr });
//     }
//     res.json({ installed: true, version: stderr || stdout });
//   });
// });

// app.get("/debug-env", async (req, res) => {
//   const { exec } = require("child_process");

//   exec("echo $PATH && which javac && javac -version", (err, stdout, stderr) => {
//     if (err) {
//       return res.status(500).json({ error: err.message, stderr });
//     }
//     res.send(`<pre>${stdout}\n${stderr}</pre>`);
//   });
// });
// app.get("/test-javac", async (req, res) => {
//   try {
//     const { stdout, stderr } = await execCommand("/usr/bin/javac -version");
//     res.json({ stdout, stderr });
//   } catch (err) {
//     res.json({ error: err.message, stderr: err.stderr });
//   }
// });



// app.get("/test-java", async (req, res) => {
//   const testDir = "/app/tmp";
//   const testFile = "Solution.java";

//   try {
//     // Create directory if not exists
//     fs.mkdirSync(testDir, { recursive: true });

//     // Write Java code file
//     const javaCode = `
//     public class Solution {
//         public static void main(String[] args) {
//             System.out.println("Hello Test");
//         }
//     }
//     `;
//     fs.writeFileSync(path.join(testDir, testFile), javaCode);

//     // Verify directory contents (optional debug)
//     const ls = await execCommand(`ls -l ${testDir}`);

//     // Compile Java code
//     const compile = await execCommand(
//       `cd ${testDir} && /usr/lib/jvm/java-17-openjdk-amd64/bin/javac ${testFile} 2>&1`
//     );

//     // Run Java program
//     const run = await execCommand(
//       `cd ${testDir} && /usr/lib/jvm/java-17-openjdk-amd64/bin/java Solution 2>&1`
//     );

//     res.json({ ls, compile, run });
//   } catch (e) {
//     res.json({ error: e });
//   }
// });









// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port...shubham ${PORT}`));





const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

function normalize(str) {
  return str
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n+/g, "\n");
}

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
      if (err) {
        reject({ message: err.message, stderr, stdout });
      } else {
        resolve({ stdout });
      }
    });
  });
}

app.post("/run", async (req, res) => {
  const { code, questionId, userId ,testCases } = req.body;
  console.log(userId);
  

  // Create unique directory
  const uid = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const tempDir = path.join(__dirname, "tmp", userId);
  fs.mkdirSync(tempDir, { recursive: true });

  const javaFile = path.join(tempDir, "Solution.java");

  // Write user code to the unique directory
  fs.writeFileSync(javaFile, code);

  const cases = testCases;

  if (!cases || !Array.isArray(cases)) {
    return res.status(400).json({ error: "No valid test cases provided." });
  }

  const results = [];

  try {
    // Compile the Java code
    await execCommand(`javac ${javaFile}`);
  } catch (compileError) {
    return res.json({
      results: cases.map((c, i) => ({
        id: i + 1,
        input: c.input,
        expected: c.output || c.expected,
        output: "",
        passed: false,
        error: `Compilation Error: ${compileError.stderr || compileError.message}`,
      })),
    });
  }

  for (let i = 0; i < cases.length; i++) {
    const { input, output: expected, isPattern } = cases[i];

    try {
      const { stdout } = await execCommand(
        `echo "${input}" | java -cp ${tempDir} Solution`
      );
      const output = stdout.trim();

      const passed = isPattern
        ? output === expected
        : normalize(output) === normalize(expected);

      results.push({
        id: i + 1,
        input,
        expected,
        output,
        passed,
      });
    } catch (runError) {
      results.push({
        id: i + 1,
        input,
        expected,
        output: runError.stdout || "",
        passed: false,
        error: `Runtime Error: ${runError.stderr || runError.message}`,
      });
    }
  }

  // Cleanup files
  try {
    fs.unlinkSync(path.join(tempDir, "Solution.java"));
    fs.unlinkSync(path.join(tempDir, "Solution.class"));
    fs.rmdirSync(tempDir);
  } catch (err) {
    console.warn("Cleanup failed:", err.message);
  }

  res.json({ results });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port...shubham ${PORT}`));



