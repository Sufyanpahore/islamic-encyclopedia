# Data sources and import policy

This project keeps the existing first-party Quran and Hadith databases separate from upstream source snapshots.

## Directory policy

- `upstream/`: local, unmodified clones of external source repositories. This directory is intentionally ignored by Git because the upstream datasets are very large.
- `upstream-manifests/`: tracked source descriptions and reproducibility metadata.
- `refined/`: reserved for later normalized and reviewed datasets. Do not populate it during the raw-import phase.

## Raw import rules

1. Do not edit files inside an upstream clone.
2. Preserve the upstream repository, branch, commit SHA, and license/reference documents.
3. Keep editions and translations separate. Do not combine text from different editions.
4. Do not overwrite the existing `QURAN data/` or `Hadith data/` directories.
5. Do not assume the repository-level Unlicense clears third-party rights in every translation or source text. Preserve source attribution and check the upstream References/Translations documentation before redistribution.

## Sync

Run `bash scripts/sync-upstream-data.sh` from the repository root. The script clones or updates the two Fawaz repositories under the ignored `data/upstream/` directory and prints the exact checked-out commit for each.

AlQuran Cloud is a hosted API rather than a Git repository. Its data should be fetched as a separately dated snapshot only after its endpoint, attribution, and applicable content terms have been recorded. No live API snapshot is silently mixed into the Fawaz source trees.
