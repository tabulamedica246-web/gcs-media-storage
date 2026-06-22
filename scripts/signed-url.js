#!/usr/bin/env node
/**
 * Generate a signed URL for a private GCS object.
 * Usage: node scripts/signed-url.js --bucket tabulamedica-audio --file chapter-1.mp3
 */
const { Storage } = require("@google-cloud/storage");

const args = process.argv.slice(2);
const bucket = args[args.indexOf("--bucket") + 1] || process.env.GCS_AUDIO_BUCKET;
const file = args[args.indexOf("--file") + 1];

async function getSignedUrl() {
  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
  });

  const [url] = await storage.bucket(bucket).file(file).getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  console.log("Signed URL:", url);
}

getSignedUrl().catch(console.error);
