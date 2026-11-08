# Fawaz Ahmed Quran API - Upstream Snapshot

This directory stores an unmodified upstream edition-catalogue snapshot and its upstream license file.

- Upstream repository: https://github.com/fawazahmed0/quran-api
- Upstream ref: `1`
- Upstream file: `editions.min.json`
- Upstream blob SHA: `e295247fc4d429708eae95c9ff71745453c531c0`
- Snapshot date: 2026-11-08
- Catalogue audit: 492 edition entries across 98 language labels; 13 Urdu editions and 33 Arabic editions.
- Upstream project license: Unlicense (see LICENSE).

## Important data-quality and rights notes

The upstream README warns that some translations were OCR-converted and may contain spelling mistakes. The catalogue records author, language, source and edition endpoints where supplied. Preserve these fields with every imported edition. The repository-wide Unlicense applies to the repository's software/catalogue as stated by its author; it does not automatically establish the copyright or reuse rights of every underlying translation. Verify each translation's source and terms before redistributing it.

## Scope and import policy

This snapshot contains the edition catalogue only, not the complete Quran text corpus. GitHub reports the upstream repository at approximately 4.26 million KB, so copying its entire history and every data file into this application's Git repository would be impractical and could make the project repository unwieldy.

Next imports should be staged in manageable batches, with raw payloads left unchanged, checksums and upstream blob/version metadata recorded, and no merge into the existing Quran database. Large edition payloads may need a separate data store or versioned upstream CDN references rather than Git history.

No transformation or normalization has been applied to the catalogue.
