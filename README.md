# Introduction

A Cloudflare R2 web management interface built with Next.js.

# Features

- Upload/Delete/Download files from/to [Cloudflare R2](https://developers.cloudflare.com/r2/).
- **(optional)** Authorization by [Supabase Auth](https://supabase.com/docs/guides/auth).
- **(optional)** Monitoring by [Sentry](https://sentry.io).

# Environment Variables

To enable optional features, you should specify environment variables to your `.env` file or CI system (**recommend**).

All supported environment variables listed bellow:

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
