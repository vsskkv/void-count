import { spawn } from "node:child_process";
import { createInterface } from "node:readline";

const warningPrefix =
  "[baseline-browser-mapping] The data in this module is over two months old.";

const child = spawn("next", ["build"], {
  env: {
    ...process.env,
    BROWSERSLIST_IGNORE_OLD_DATA: "true",
    BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA: "true",
  },
  stdio: ["inherit", "pipe", "pipe"],
  shell: process.platform === "win32",
});

const forwardWithoutBaselineWarning = (stream, target) => {
  const lineReader = createInterface({ input: stream });
  lineReader.on("line", (line) => {
    if (line.includes(warningPrefix)) {
      return;
    }
    target.write(`${line}\n`);
  });
};

forwardWithoutBaselineWarning(child.stdout, process.stdout);
forwardWithoutBaselineWarning(child.stderr, process.stderr);

child.on("close", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
