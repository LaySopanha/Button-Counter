# Contributing

Team workflow for Button Counter. Read this before your first PR.

## Setup

Requires **Node 22+** (`node -v`). The repo enforces this via `engines` + `.npmrc`.

```bash
git clone https://github.com/LaySopanha/Button-Counter.git
cd Button-Counter
npm install
cp .env.example .env   # turso value is needed
npm run dev
```

**Windows only:** enable Developer Mode once, or `npm run build` fails with `EPERM: symlink`.
Just search developer setting and fine developer mode to enable it. Then restart your terminal.

## Workflow

One issue → one branch → one PR. Never push to `main`; it is protected.

1. Pick an issue assigned to you. Move it to **In Progress** on the board.
2. Branch off the latest `main`:

   ```bash
   git checkout main
   git pull
   git checkout -b feat/12-counter-button
   ```

3. Commit as you go (see format below).
4. Push and open a PR:

   ```bash
   git push -u origin feat/12-counter-button
   gh pr create --fill
   ```

5. Put `Closes #12` in the PR body so the issue closes on merge.
6. Wait for CI green + 1 approval, then **Squash and merge**.
7. Delete the branch.

## Branch names

`<type>/<issue-number>-<short-slug>`

```
feat/12-counter-button
fix/18-decrement-double-step
chore/4-ci-workflow
docs/21-readme
```

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/). Subject in imperative mood, 50 chars or less.

```
feat: add reset button to counter
fix: stop decrement subtracting twice
chore: add vitest to CI pipeline
docs: document Turso setup steps
```

## Before you open a PR

```bash
npm run format
npm run check
npm run test
npm run build
```

CI runs these same four checks. If they fail locally, they fail on the PR.

## Review rules

- Every PR needs 1 approval from someone who did not write it.
- Reviewers: leave at least one comment, even if it is only "looks good, tested locally".
- Author merges their own PR after approval. Reviewer does not merge for you.
- Blocked on something? Add the `blocked` label and comment which issue number blocks you.

## Environment variables

Secrets live in `.env`, which is gitignored. Never commit it.
`.env.example` lists the required keys with fake values — keep it updated when you add a key.
