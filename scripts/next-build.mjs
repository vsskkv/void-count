import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";
import { StringDecoder } from "node:string_decoder";

const require = createRequire(import.meta.url);
const nextCliPath = require.resolve("next/dist/bin/next");

const mockFontPath =
  process.env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES ||
  join(process.cwd(), "scripts", "next-font-mock.json");

const existingNodeOptions = process.env.NODE_OPTIONS || "";
const reactServerCondition = "--conditions react-server";
const nodeOptions = existingNodeOptions.includes(reactServerCondition)
  ? existingNodeOptions
  : `${existingNodeOptions} ${reactServerCondition}`.trim();

const nextEnv = {
  ...process.env,
  BROWSERSLIST_IGNORE_OLD_DATA: "true",
  BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA: "true",
  NEXT_FONT_GOOGLE_MOCKED_RESPONSES: mockFontPath,
  NODE_OPTIONS: nodeOptions,
};

const dropLineSnippets = [
  "[baseline-browser-mapping] The data in this module is over two months old",
];

function pipeWithLineFilter(readable, writable) {
  if (!readable) return;

  const decoder = new StringDecoder("utf8");
  let buffer = "";

  readable.on("data", (chunk) => {
    buffer += decoder.write(chunk);

    let newlineIndex;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newlineIndex + 1);
      buffer = buffer.slice(newlineIndex + 1);

      if (!dropLineSnippets.some((snippet) => line.includes(snippet))) {
        writable.write(line);
      }
    }
  });

  readable.on("end", () => {
    buffer += decoder.end();
    if (
      buffer.length > 0 &&
      !dropLineSnippets.some((snippet) => buffer.includes(snippet))
    ) {
      writable.write(buffer);
    }
  });
}

const child = spawn(process.execPath, [nextCliPath, "build", "--webpack"], {
  env: nextEnv,
  stdio: ["inherit", "pipe", "pipe"],
});

pipeWithLineFilter(child.stdout, process.stdout);
pipeWithLineFilter(child.stderr, process.stderr);

child.on("error", (error) => {
  process.stderr.write(`Build launcher error: ${error.message}\n`);
  process.exit(1);
});

child.on("close", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exitCode = code ?? 1;
});
