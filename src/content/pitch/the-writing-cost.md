---
title: Writing was never the differentiator
description: Every documentation system asks for the same sentences. What differs is what happens to them afterwards — and that is the only claim worth comparing.
order: 6
updated: 2026-11-13
tags: pitch, writing, limits
seeds: pitch
---

# Writing was never the differentiator

The honest part of the pitch, before the rest of it.

Every documentation system asks for the same input: sentences written by someone who knows the
thing. A wiki, a managed platform, a static site, a folder of Word documents — the writing is
identical in all of them, and it is usually the largest line item on the project.

No stack has ever shipped a sentence. That is not a slogan about this one; it is the reason a
comparison built on authoring speed is a comparison of text editors.

## The cost that does not move

| Cost | Changes when you change the stack? |
| --- | --- |
| The sentences | No |
| Review and sign-off | Rarely |
| Being wrong six months later | No |
| Finding the person who knows the answer | No |
| Where the text lives | Yes |
| Who can edit it | Yes |
| What a broken link costs | Yes |
| Time from "fix this" to published | Yes |
| The bill in year three | Yes |

A forty-page site is a week of writing if you know the subject, and a month if you are learning it
while you write. That week does not shrink because the build is fast, and it does not grow because
the build is slow. It is the same week in every tool.

## What this stack actually chooses

Markdown, one file per page, flat frontmatter, path equals URL. Those are **format** decisions,
not productivity claims:

- the text is diffable, so a change has a review and a rollback;
- the source is portable, so a vault's notes can be copied in and a clone can leave;
- an agent can read the same file a person edits;
- nothing in the content model needs a database, an account, or an export button.

What none of that buys is faster typing. A wiki with a rich-text editor is genuinely quicker to
write in, and this stack gives that up on purpose. The trade is that the writing is slower and the
keeping is cheaper, and the keeping is where the years go.

## Compare on keeping, not authoring

| Question | Wiki or managed platform | This stack |
| --- | --- | --- |
| Type a paragraph | rich text, fast | Markdown, slower |
| Change one sentence in year three | find it, edit, publish | find it, edit, commit |
| Fix a link that rotted | depends on the platform | the guard fails the build |
| Add an author who will not use git | yes | no |
| Take the content elsewhere | export, if the export is good | clone the repository |
| Cost in year three | a subscription | attention, and a small bill |

The left column wins the first row. The right column wins most of the rest, and the rest is the
part that lasts.

## Where this stack loses on writing

- No rich-text editor. Markdown is punctuation you have to remember.
- No comments, review states, or scheduled publishing.
- No images without a commit, which means no author who cannot commit.
- No workflow for a subject-matter expert who will send you a document to paste in.

If most of your cost is authoring by people who will never open a terminal, buy the platform. That
is the honest recommendation, and it is the same one
[Let me spill the beans](/pitch/spill-the-beans) makes about versioning and search.

## Why it is worth saying out loud

A pitch that implies the tool writes for you sells a template and calls it a saving. The buyer
discovers the writing is still theirs in week two, and by then the tool is to blame for a cost it
never carried.

The claim this project can defend is narrower and survives contact with a calendar:

- the writing is the same in every system, and it is the largest cost;
- the differences are in what happens after the first draft — review, links, rollback, the bill;
- the guard is about the keeping. It checks the build, not the prose, and it has never claimed to
  write anything.

That is also why the site's own pages carry an `updated` date and a person who edits them. The
sentences are the part no framework can take.

## The short version

- **Writing:** identical cost everywhere, usually the biggest one.
- **This stack:** cheaper to keep, slower to type in, no lock-in.
- **Differentiator:** what happens after the first draft, not the draft itself.

The other half of the comparison — what "free" means here, and where it stops — is
[Free, twice](/pitch/free).
