# gcs-media-storage

Google Cloud Storage bucket configuration and tooling for TabulaMedica projects.

## Purpose

Manages GCS buckets for:
- **NoorJyoti** audio files (scripture recordings)
- General TabulaMedica media assets

## Buckets

| Bucket | Purpose |
|--------|---------|
| `tabulamedica-audio` | Scripture audio for NoorJyoti |
| `tabulamedica-media` | General media assets |

## Structure

```
infra/          Terraform configs for bucket creation & IAM
scripts/        Upload, sync, and signed-URL helpers
policies/       CORS and lifecycle policy JSON files
```

## Quick Start

```bash
npm install
node scripts/upload-audio.js --bucket tabulamedica-audio --dir ./audio
node scripts/signed-url.js --bucket tabulamedica-audio --file chapter-1.mp3
```

## Environment Variables

```
GCS_PROJECT_ID=your-gcp-project-id
GCS_KEY_FILE=path/to/service-account-key.json
GCS_AUDIO_BUCKET=tabulamedica-audio
GCS_MEDIA_BUCKET=tabulamedica-media
```
