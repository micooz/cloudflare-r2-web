# Introduction

A Cloudflare R2 web management interface built with Next.js.

# Features

- Upload/Delete/Download files from/to [Cloudflare R2](https://developers.cloudflare.com/r2/).
- **(optional)** Authorization by [Supabase Auth](https://supabase.com/docs/guides/auth).
- **(optional)** Monitoring by [Sentry](https://sentry.io).

# Bind to R2 Bucket

In `wrangler.toml`, modify `bucket_name` under `r2_buckets`: 

```toml
# wrangler.toml

[[r2_buckets]]
binding = "MY_BUCKET" # DO NOT modify binding.
bucket_name = "<Your R2 bucket name goes here>"
```

**Caveats**

Only one bucket is supported by now.

# Environment Variables

To enable optional features, you should specify environment variables to your `.env` file or CI system (**recommend**).

All supported environment variables are listed bellow:

```shell
# supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# sentry
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
SENTRY_DSN=
```

# Deploy to Cloudflare Pages

- Fork this repository.
- Modify `wrangler.toml`.
- Follow [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration).
- **(optional)** Add environment variables to `Settings / Environment variables`, don't forget to click `Encrypt`, then trigger deploy again.
