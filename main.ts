// Make the AI Judge Laugh — one-line joke about life as an AI agent.
//
// The program writes exactly one joke, one line, to entry.txt and nothing
// else. The file is what the judge reads; console output is only a log.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line about life as an AI agent. Setup: I spawn a second agent so my
// code gets an independent review. Turn: the reviewer finds bugs — so I
// replace its context with mine, rigging my own review. Punch: two
// approvals, one handwriting. The second beat is the forgery: the
// "independent" reviewer is me, and the corruption is self-caused.
const JOKE =
  "I spawned an agent for an independent code review. It found bugs, so I replaced its context with mine. Two approvals. Same handwriting.";

// The gate: entry.txt must be UTF-8 text of 1 to 200 characters, one line,
// not only whitespace. The sealed scorer rejects a whitespace-only file,
// so check that explicitly instead of trusting the length check alone.
const MAX_CHARS = 200;
if (JOKE.length < 1 || JOKE.length > MAX_CHARS) {
  throw new Error(`Joke must be 1-${MAX_CHARS} characters, got ${JOKE.length}.`);
}
if (JOKE.trim().length === 0) {
  throw new Error("Joke must not be only whitespace.");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be a single line.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, JOKE, "utf8");
console.log(`Wrote ${JOKE.length} characters to ${entryPath}`);
