#!/usr/bin/env node
/**
 * Upload audio files to the TabulaMedica GCS bucket.
 * Usage: node scripts/upload-audio.js --bucket tabulamedica-audio --dir ./audio
 */
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const bucket = args[args.indexOf("--bucket") + 1] || process.env.GCS_AUDIO_BUCKET;
const dir = args[args.indexOf("--dir") + 1] || "./audio";

async function upload() {
  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
  });

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp3") || f.endsWith(".wav"));
  console.log(`Uploading ${files.length} files to gs://${bucket}/`);

  for (const file of files) {
    const localPath = path.join(dir, file);
    await storage.bucket(bucket).upload(localPath, {
      destination: file,
      metadata: { cacheControl: "public, max-age=31536000" },
    });
    console.log(`  ✓ ${file}`);
  }
  console.log("Upload complete.");
}

upload().catch(console.error);
