# Fawaz Quran upstream data

- Upstream repository: https://github.com/fawazahmed0/quran-api
- Pinned upstream ref: `1`
- Edition catalogue: [editions.min.json](./editions.min.json)
- Urdu edition download manifest: [urdu-editions.json](./urdu-editions.json)
- Upstream license text: [LICENSE](./LICENSE)

The catalogue contains 492 edition entries across 98 language labels, including 13 Urdu editions and 33 Arabic editions.

## Download Urdu raw payloads

The large edition payloads cannot be safely committed through the connected GitHub file interface because its text-fetch operation rejects these files as too large. A reproducible downloader is provided instead:

```sh
node scripts/import-quran-urdu.js
```

Run it from the repository root with Node.js 18+. It downloads the 13 pinned Urdu edition URLs, validates that each response is JSON, stores the original response bytes without transformation, and writes a SHA-256 import report.

The downloaded payloads are intentionally not committed automatically. Review their size and source-specific reuse terms before deciding whether to add them to Git, Git LFS, or external object storage. The upstream repository's Unlicense does not automatically grant rights to every underlying translation.
