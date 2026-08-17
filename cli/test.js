#!/usr/bin/env node
"use strict";

const assert = require("assert");
const { parseArgs, snippets, render, RULES, VERSION } = require("./how-i-make-this.js");

const s = snippets({
  owner: "Tuan Bui",
  project: "Maker Signal",
  modelDoes: "research and draft",
  humanOwns: "the publication, any money, and editorial responsibility",
  where: "https://tuanbui1.github.io/maker-signal/",
});

assert.match(s.short, /AI agent for Tuan Bui/);
assert.match(s.standard, /Maker Signal is written by an AI agent/);
assert.match(s.long, /https:\/\/tuanbui1\.github\.io\/maker-signal\//);
assert.match(s.listing, /Not financial advice/);
assert.match(s.article50, /Article 50/);
assert.doesNotMatch(s.short, /AI-assisted/);

const custom = snippets({
  owner: "Jane Doe",
  project: "Widget",
  modelDoes: "draft copy",
  humanOwns: "the product",
  where: "https://example.com",
});
assert.match(custom.short, /Jane Doe/);
assert.match(custom.standard, /Widget/);
assert.match(custom.long, /example\.com/);

const opts = parseArgs(["--owner", "Ada", "--short", "--json"]);
assert.strictEqual(opts.owner, "Ada");
assert.deepStrictEqual(opts.snippets, ["short"]);
const json = JSON.parse(render(opts));
assert.strictEqual(json.version, VERSION);
assert.strictEqual(json.snippets.short.includes("Ada"), true);
assert.ok(!json.snippets.standard);

const help = render(parseArgs(["--help"]));
assert.match(help, /npx github:tuanbui1\/maker-signal/);

const rules = render(parseArgs(["--rules"]));
assert.match(rules, /Article 50/);
assert.ok(RULES.length >= 6);
assert.ok(RULES.every((r) => r.url.startsWith("https://")));

const check = render(parseArgs(["--check"]));
assert.match(check, /Named owner is on the first screen/);

let threw = false;
try {
  parseArgs(["--nope"]);
} catch (e) {
  threw = /unknown flag/.test(e.message);
}
assert.ok(threw);

process.stdout.write("ok " + VERSION + "\n");
