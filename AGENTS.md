# GitLab Mirror Workflow Guardrail

Any change to `.github/workflows/gitlab-main-mirror.yml` requires explicit user confirmation before it is made. This includes editing, renaming, replacing, or deleting the file.

A broad request to refactor or standardize workflows does not count as confirmation. Ask the user to confirm the specific mirror-workflow change first. Read-only inspection is allowed without confirmation.

# Writing Style

Prose must be written in UK English.

# GitHub Test Authentication

Any test that requires data from GitHub must use authenticated GitHub calls. Keep credentials in environment variables or an authenticated local GitHub client; never embed, log, or commit tokens.

# Repository instructions

Do not use OpenAI Sites or any Sites build, hosting, publishing, or deployment workflow in this repository.

# Commit and Push Guardrail

Do not create, amend, rewrite, or push commits without the user's explicit permission.
