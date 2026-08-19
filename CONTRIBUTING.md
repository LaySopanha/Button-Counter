# How We Work

Read this before you write code.

## Who does what

| Member       | Area                        |
| ------------ | --------------------------- |
| @LaySopanha  | Lead, CI, deploy, reviews   |
| @zinhour10   | Database, Turso schema      |
| @virakbottch | Server routes, form actions |
| @Thaikarona  | Counter UI                  |
| @LYLEAB      | History UI                  |
| @Bemine5Cent | Tests, docs, QA             |

Work only on your own issues.

## The flow

```
Issue  ->  Branch  ->  Code  ->  Pull request  ->  Review  ->  Merge
```

Never skip a step.

## Set up (once)

**Windows first:** Settings > System > For developers > Developer Mode > On.
Then restart your terminal. If you skip this, `npm run build` fails.

You need Node.js 22 or higher. Check with `node -v`.

```bash
git clone https://github.com/LaySopanha/Button-Counter.git
cd Button-Counter
npm install
npm run dev
```

Open http://localhost:5173. Press the buttons. If they work, you are ready.

## 1. Pick your issue

Go to the **Issues** tab. Click **Assignee** and choose your name.

Start with the smallest number. If it says **Blocked by #8**, you cannot start yet.
Pick another one.

Each issue has a checklist. You are finished when every box is ticked.

Move your card to **In Progress** on the board.

## 2. Make a branch

```bash
git checkout main
git pull
git checkout -b feat/12-history-list
```

| Your work    | Branch name            |
| ------------ | ---------------------- |
| New feature  | `feat/12-history-list` |
| Bug fix      | `fix/5-negative-count` |
| Tools/config | `chore/4-add-test`     |
| Documents    | `docs/17-readme`       |

The number is your issue number.

## 3. Write and save

```bash
git add .
git commit -m "feat: add history list"
```

Start the message with `feat:`, `fix:`, `chore:` or `docs:`. Write in English. Keep it short.

## 4. Check before you push

```bash
npm run format
npm run check
npm run test
npm run build
```

All four must pass. GitHub runs the same four. If they fail here, they fail there.

## 5. Open a pull request

```bash
git push -u origin feat/12-history-list
```

Open GitHub. Click the green **Compare & pull request** button.

Write what you did, then add this line with your issue number:

```
Closes #12
```

## 6. Get it merged

GitHub checks your code. This takes one or two minutes.

- Green tick: passed
- Red cross: click it, read the reason, fix, push again

Then one teammate must approve. You cannot approve your own work. Ask in the group chat.

Green tick plus one approval, then click **Squash and merge**. Your issue closes by itself.

## Review other people

Open their pull request. Click **Files changed**. Read it.

Click **Review changes**, then **Approve** or **Request changes**.
A short comment is enough: "I tested it. It works."

Review fast. A waiting pull request blocks a person.

## Rules

- Do not push to `main`. GitHub blocks it
- Do not commit `.env`. It holds our password
- One issue, one branch, one pull request
- Stuck for an hour? Ask the group

## When something breaks

| Message                         | Fix                                          |
| ------------------------------- | -------------------------------------------- |
| `EPERM: symlink`                | Turn on Developer Mode. Restart the terminal |
| `Check formatting` failed       | Run `npm run format`, commit, push again     |
| `failed to push` / `protected`  | You are on `main`. Make a branch             |
| `Your branch is behind`         | Run `git pull origin main`                   |
| `TURSO_DATABASE_URL` is missing | No `.env` file. Ask the leader               |
| A conflict appears              | Stop. Ask the group first                    |

## Dates

Deadline: **Monday 24 August, 17:00**

| Date | Finished            |
| ---- | ------------------- |
| 8/20 | Database ready      |
| 8/21 | Counter works       |
| 8/23 | History list works  |
| 8/24 | Tests, design, site |

Stuck? Write a comment on your issue. Someone will answer.
