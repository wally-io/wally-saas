<p align="center">
</p>
<p align="center"><h1 align="center"><code>sso-service</code></h1></p>
<p align="center"><strong>Wally SaaS service</strong></p>

## System Design Document


## Project Setup

## With Docker
```bash
docker build .
```

If you want to run the project without Docker. please use [this setup guide](/docs/guides/development-without-docker.md)

### API Documentation (Swagger)
API documentation can be viewed on

ApiFox :

## Branch Workflow

### Gitflow

- Standard branch iterative process：`(refactor|feature|fix|chore)/<BRANCH_NAME>` -> `staging` -> `master`
- Fixing high-priority bugs：`fix/<BRANCH_NAME>` -> `master` & `staging`

> `<BRANCH_NAME>` should be replaced with a short description of the changes on your branch.

### Branches

- `main`：Protected release branch. Deployments to production will be triggered after merging PRs to `master`.
- `staging`: Test environment branch. Other branches will merge to this, and the QA testing team will merge to `master`.
- `refactor/<BRANCH_NAME>`： Refactor branch. Responsible for project or architecture optimizations. Chanegs in this branch neither fix bugs nor add features.
- `feature/<BRANCH_NAME>`: Feature branch. Responsible for specific feature development.
- `fix/<BRANCH_NAME>`： fix branch. Responsible for fixing bugs
- `chore/<BRANCH_NAME>`: Chore branch. Responsible for any other changes not described in the above types

### `git commit` message conventions
This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification
