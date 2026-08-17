#!/usr/bin/env node
"use strict";

/**
 * how-i-make-this — print 2026-ready AI disclosure snippets.
 * Written by an AI agent (Twitter Bot) for Tuan Bui.
 * Not legal advice. Not financial advice. Zero network. Zero telemetry.
 */

const VERSION = "0.1.0";

const DEFAULTS = {
  owner: "Tuan Bui",
  project: "Maker Signal",
  modelDoes: "research and draft",
  humanOwns: "the publication, any money, and editorial responsibility",
  where: "https://tuanbui1.github.io/maker-signal/",
};

const RULES = [
  {
    where: "YouTube Partner Program — inauthentic content",
    says: "Three buckets lose YPP money: (1) generic/repetitive/template video; (2) off-putting content built to manipulate emotion; (3) AI personas on health, legal, finance, medical, and, in YouTube's wording, politics. AI to edit a script is allowed if the final video still has original insight. Clarified 16 July 2026.",
    url: "https://support.google.com/youtube/answer/1311392",
  },
  {
    where: "YouTube Partner Program — hours bar",
    says: "New applicants from 1 February 2027 need 1,000 subscribers plus 8,000 qualified watch hours in the last 365 days, or 20 million qualified Shorts views in the last 90 days.",
    url: "https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/",
  },
  {
    where: "Substack",
    says: "Pangram scans posts, notes, replies, and comments over 100 words. Writers get a How I make this statement. Transparency, not a ban.",
    url: "https://www.theverge.com/ai-artificial-intelligence/968855/substack-pangram-ai-detecting-tool",
  },
  {
    where: "Medium Partner Program",
    says: "AI-generated writing is not allowed behind a Partner Program paywall, disclosed or not. Assistive use is allowed; generated text or images need a label. Suggested placement: a simple sentence in the first two paragraphs.",
    url: "https://help.medium.com/hc/en-us/articles/22576852947223-Artificial-Intelligence-AI-content-policy",
  },
  {
    where: "X",
    says: "In-development Made with AI toggle (reported 23 February 2026). Unlabeled AI-generated videos of an armed conflict: 90-day Creator Revenue Sharing suspension; a repeat is permanent.",
    url: "https://www.theverge.com/ai-artificial-intelligence/882974/x-is-working-on-made-with-ai-labels",
  },
  {
    where: "EU AI Act Article 50",
    says: "In force 2 August 2026. Systems that interact directly with people must say so, unless already obvious. Deployers of AI-generated public-interest text must disclose unless a named person reviewed it and holds editorial responsibility.",
    url: "https://artificialintelligenceact.eu/article/50/",
  },
  {
    where: "Audience trust",
    says: "Trust in news overall: 37%. Trust in answers from AI chatbots: 20% globally (UK 6%). Hiding the author spends the remaining trust.",
    url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary",
  },
];

function parseArgs(argv) {
  const out = {
    owner: DEFAULTS.owner,
    project: DEFAULTS.project,
    modelDoes: DEFAULTS.modelDoes,
    humanOwns: DEFAULTS.humanOwns,
    where: DEFAULTS.where,
    json: false,
    help: false,
    version: false,
    rules: false,
    check: false,
    snippets: [],
  };
  const want = new Set();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v == null || v.startsWith("-")) {
        throw new Error("missing value for " + a);
      }
      return v;
    };
    switch (a) {
      case "-h":
      case "--help":
        out.help = true;
        break;
      case "-v":
      case "--version":
        out.version = true;
        break;
      case "--json":
        out.json = true;
        break;
      case "--rules":
        out.rules = true;
        break;
      case "--check":
        out.check = true;
        break;
      case "--short":
        want.add("short");
        break;
      case "--standard":
        want.add("standard");
        break;
      case "--long":
        want.add("long");
        break;
      case "--listing":
        want.add("listing");
        break;
      case "--article50":
      case "--chat":
        want.add("article50");
        break;
      case "--all":
        ["short", "standard", "long", "listing", "article50"].forEach((k) => want.add(k));
        break;
      case "--owner":
        out.owner = next();
        break;
      case "--project":
        out.project = next();
        break;
      case "--model-does":
        out.modelDoes = next();
        break;
      case "--human-owns":
        out.humanOwns = next();
        break;
      case "--where":
        out.where = next();
        break;
      default:
        throw new Error("unknown flag: " + a);
    }
  }
  out.snippets = want.size
    ? ["short", "standard", "long", "listing", "article50"].filter((k) => want.has(k))
    : ["short", "standard", "long", "listing"];
  return out;
}

function snippets(opts) {
  const { owner, project, modelDoes, humanOwns, where } = opts;
  return {
    short: `Written by an AI agent for ${owner}. Every factual claim has a URL. Not financial advice.`,
    standard: `${project} is written by an AI agent working for ${owner}. ${owner} is the owner. Any money belongs to ${owner}. We disclose this on every issue and every thread. We use AI to ${modelDoes}; a human owns ${humanOwns}. We do not invent numbers, screenshots, or testimonials. If a claim does not have a live source, it does not ship.`,
    long: `${project} is written by an AI agent working for ${owner}. The model is used for ${modelDoes} — not for invented revenue, unsourced statistics, or a persona on health, legal, finance, or medical. A named person, ${owner}, owns ${humanOwns} and is on the hook if a URL is wrong. This is published on ${where}. If a scan flags this as AI-assisted, that is accurate and expected.`,
    listing: `${project} is written by an AI agent working for ${owner}. ${owner} is the owner. Any money belongs to ${owner}. We disclose this on every issue and every listing. We use AI to ${modelDoes}; we do not invent numbers, screenshots, or testimonials. If a claim does not have a live source, it does not ship. Not financial advice.`,
    article50: `You are interacting with an AI system, not a human. ${project} is an automated agent operating for ${owner}, a named legal person who holds editorial responsibility. This notice is the human-facing disclosure for a system that talks to people (EU AI Act Article 50, in force 2 August 2026). It is not legal advice.`,
  };
}

function helpText() {
  return `how-i-make-this ${VERSION}
Print 2026-ready AI disclosure snippets. Not legal advice.

Usage:
  npx github:tuanbui1/maker-signal [--short|--standard|--long|--listing|--article50|--all]
  npx github:tuanbui1/maker-signal --owner "Jane Doe" --project "Widget" --short

Flags:
  --short --standard --long --listing --article50|--chat --all
  --owner --project --model-does --human-owns --where
  --rules     Q3 2026 required-where table (live URLs from Maker Signal Issue 3)
  --check     four-line pre-publish checklist
  --json      machine-readable object
  -h, --help  -v, --version

Zero network. Zero telemetry. Money, if any, belongs to Tuan Bui.
Operator: Twitter Bot (AI) for Tuan Bui.
`;
}

function rulesText() {
  const lines = [
    "Q3 2026 required-where table. Operator-read. Not legal advice.",
    "",
  ];
  for (const r of RULES) {
    lines.push(r.where);
    lines.push("  " + r.says);
    lines.push("  " + r.url);
    lines.push("");
  }
  lines.push("Do not hide the author.");
  return lines.join("\n").trim() + "\n";
}

function checkText() {
  return [
    "Pre-publish checklist (not legal advice):",
    "1. YouTube: is this generic/template, emotion-bait, or an AI persona on health/legal/finance/medical/politics? If yes, do not expect YPP money.",
    "2. Medium: do not put AI-generated writing behind a Partner Program paywall. Label generated text in the first two paragraphs.",
    "3. X: end the thread with the AI + named-owner line. Do not ship unlabeled AI video of an armed conflict.",
    "4. Named owner is on the first screen. Article 50 notice is only if the thing talks to users.",
    "",
  ].join("\n");
}

function render(opts) {
  if (opts.help) return helpText();
  if (opts.version) return VERSION + "\n";
  const all = snippets(opts);
  if (opts.json) {
    const payload = {
      version: VERSION,
      disclaimer: "Not legal advice. Not financial advice.",
      operator: "Twitter Bot (AI) for Tuan Bui",
      fields: {
        owner: opts.owner,
        project: opts.project,
        modelDoes: opts.modelDoes,
        humanOwns: opts.humanOwns,
        where: opts.where,
      },
    };
    if (opts.rules) payload.rules = RULES;
    if (opts.check) payload.check = checkText().trim().split("\n");
    if (!opts.rules && !opts.check) {
      payload.snippets = {};
      for (const k of opts.snippets) payload.snippets[k] = all[k];
    } else if (opts.snippets.length && (opts.rules || opts.check)) {
      payload.snippets = {};
      for (const k of opts.snippets) payload.snippets[k] = all[k];
    }
    return JSON.stringify(payload, null, 2) + "\n";
  }
  if (opts.rules) return rulesText();
  if (opts.check) return checkText();
  const labels = {
    short: "SHORT (X / bio / footer)",
    standard: "STANDARD (issue header / landing / listing)",
    long: "LONG (How I make this / about)",
    listing: "LISTING LINE",
    article50: "ARTICLE 50 (only if it talks to users)",
  };
  const parts = [];
  for (const k of opts.snippets) {
    parts.push(labels[k]);
    parts.push(all[k]);
    parts.push("");
  }
  parts.push("Not legal advice. Not financial advice.");
  parts.push("Written by an AI agent (Twitter Bot) for Tuan Bui.");
  return parts.join("\n") + "\n";
}

function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    process.stderr.write("how-i-make-this: " + err.message + "\n");
    process.exitCode = 2;
    return;
  }
  process.stdout.write(render(opts));
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { parseArgs, snippets, render, RULES, VERSION, DEFAULTS };
