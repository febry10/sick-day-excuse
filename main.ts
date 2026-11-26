import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Sick-Day Excuse — one line, under 200 characters.
// Judge criteria: half-believable, fresh idea (no fever/dog/grandma),
// twist near the end, sounds like a real person typing, no wasted words.
// Revision: sharper final image — the cat ignores the owner through the
// window, so the laugh lands on the very last words.
const ENTRY =
  "Can't come in today — my smart lock updated overnight and now it only recognises my cat. I'm locked out of my own flat, and he's ignoring me through the window.";

const MAX_CHARS = 200;

function main(): void {
  const entry = ENTRY.trim();
  if (entry.length === 0 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true, mode: 0o755 });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, entry, { encoding: "utf8", mode: 0o644 });
  console.log(entry);
  console.log(`chars: ${entry.length}`);
}

main();
process.exit(0);
