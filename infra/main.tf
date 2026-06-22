terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = "us-central1"
}

variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

resource "google_storage_bucket" "audio" {
  name          = "tabulamedica-audio"
  location      = "US"
  force_destroy = false

  uniform_bucket_level_access = true

  cors {
    origin          = ["https://noorjyoti.replit.app", "https://noorjyoti.com"]
    method          = ["GET", "HEAD"]
    response_header = ["*"]
    max_age_seconds = 3600
  }

  lifecycle_rule {
    condition { age = 365 }
    action { type = "SetStorageClass"; storage_class = "NEARLINE" }
  }
}

resource "google_storage_bucket" "media" {
  name          = "tabulamedica-media"
  location      = "US"
  force_destroy = false
  uniform_bucket_level_access = true
}

# Public read access for audio bucket
resource "google_storage_bucket_iam_member" "audio_public" {
  bucket = google_storage_bucket.audio.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

output "audio_bucket_url" {
  value = "gs://${google_storage_bucket.audio.name}"
}

output "media_bucket_url" {
  value = "gs://${google_storage_bucket.media.name}"
}
