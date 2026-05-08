---
title: 'Code'
subtitle: 'Software I build at the intersection of hockey, improv, and technology'
date: 2020-12-18
description: I build software that solves problems I care about — from improv comedy audio tools to NHL game bots to interactive fan experiences.
featured_image: '/images/site/cursor-screenshot.png'
permalink: '/software'
sort_order: 4
---

## What I Build

I write software to scratch my own itches, and those itches tend to
involve hockey, improv comedy, and the ATProto/Bluesky ecosystem. Most of
my work is in Ruby, JavaScript, and Electron. Here's what I'm working on.

---

## [Mx. Voice](https://mxvoice.app)

### Audio software for improv shows

**Site**: [mxvoice.app](https://mxvoice.app) | **Code**: [GitHub](https://github.com/minter/mxvoice-electron)

The modern successor to Mr. Voice, the software that powered sound in
dozens of [ComedySportz](https://www.csz.com/) clubs since 2000. Mx. Voice
is a desktop app for Windows and macOS that makes finding and playing
sound cues during improv shows as fast and reliable as possible.

Built with Electron, Electron Builder, Node.js, SQLite, WaveSurfer.js,
Howler, Bootstrap, Playwright, and Vitest. Actively developed since 2000
in various forms — from the original Perl/Tk version to today's Electron app.

![Mx. Voice desktop application](/images/site/software/mxvoice-screenshot.png)

---

## [Watch Party Games](https://watchparty.app)

### Interactive games for NHL watch party events

**Site**: [watchparty.app](https://watchparty.app)

A dual-window Electron application built for running interactive fan games
at Carolina Hurricanes watch parties. Staff operate the Control window
while fans see the Display window on a TV or projector.

Includes 14 interactive games — trivia, face-mashing NHL player headshots
together, Family Feud-style faceoffs, raffles, bingo, prediction contests,
and physical challenges like puck stacking. Integrates with the NHL API
for automatic roster imports and team branding.

Built with Electron, Electron Builder, Anthropic, Express.js, WebSocket,
ngrok, Firebase, the NHL API, Stream Deck, and Playwright. Designed for
live event use by any NHL team, with dual-monitor support, game lifecycle
management, and per-party configuration.

![Watch Party Games display window](/images/site/software/watch-party-games-screenshot.png)

---

## [Rod The Bot](https://github.com/minter/rod_the_bot)

### Live NHL game updates on Bluesky

A Bluesky bot that posts real-time game updates for NHL teams. Built
to power [@canesgameday.bsky.social](https://bsky.app/profile/canesgameday.bsky.social),
it monitors the NHL API and posts goals, penalties, period changes, and
final scores as they happen.

Configurable for any NHL team. Runs via Docker with Redis for state
management. The successor to a previous Twitter-based goal bot that was
retired when that platform went sideways.

Built with Ruby on Rails, Sidekiq, Redis, Bluesky, and the NHL API. Open source.

![Rod The Bot posting a goal update on Bluesky](/images/site/software/rod-the-bot-screenshot.png)

---

## Carolina Hurricanes Custom Feed

### A curated Bluesky feed for Canes fans

A custom ATProto feed generator that aggregates and curates posts about
the Carolina Hurricanes from across Bluesky. Pulls Canes-related content
out of the hockey timeline using keywords, hashtags (#LetsGoCanes,
#RaiseUp), and account tracking.

Built with Sinatra, GoLang, OpenAI, Anthropic, Bluesky, Sidekiq, Redis,
and PostgreSQL. Includes tooling for managing banned accounts, suspended
account cleanup, and feed metadata updates via the ATProto API.

---

## [RosterFlash](https://rosterflash.com/)

### Get alerted when your team's lineup changes

**Site**: [rosterflash.com](https://rosterflash.com/)

A companion app to [TeamSnap](https://teamsnap.com/) that sends you an
alert when a teammate changes their availability close to game time.
Know immediately if you need to adjust your lineup plans. Uses TeamSnap's
OAuth login for authentication.

Built with Ruby on Rails, Sidekiq, and Redis.

![RosterFlash web application](/images/site/software/rosterflash-screenshot.png)

---

## [Suggestion Ox](https://suggestionox.com/)

### Anonymous feedback for organizations

**Site**: [suggestionox.com](https://suggestionox.com/)

The online suggestion box that makes it easy to find out what you're not
hearing before small problems become big problems. Trusted by over 50,000
companies, associations, and government agencies including Samsung,
Hilton, and the US Air Force.

I'm the founder and CTO. Built with Ruby on Rails, Node.js, Sidekiq, Puma, AWS (EC2, RDS, ElastiCache, DynamoDB), Terraform, Ansible, and Mailgun.

![Suggestion Ox web application](/images/site/software/suggestion-ox-screenshot.png)
