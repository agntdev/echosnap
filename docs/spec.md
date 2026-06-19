# EchoSnap — Refined Bot Brief

## Summary
EchoSnap is a minimal Telegram bot that replies to two commands: /start (sends a short friendly welcome) and /echo <text> (replies with the same text back). No database, no external APIs, no inline keyboards, and no persistence — keep it intentionally tiny.

## Audience
- Telegram users who want a simple echo bot for testing or playful use.
- The bot owner / developer who will deploy and run the bot (must provide the Telegram bot token).

## Core entities
- User: Telegram user who sends commands.
- Message/Command: Telegram update containing /start or /echo command and arguments.

## Integrations & notification targets
- Telegram Bot API only (via official HTTP API wrapper). No other integrations or notification targets.
- Bot token must be supplied at deployment time (environment variable). No webhooks or external callbacks required by the bot itself.

## Interaction flows
1. /start
   - Trigger: user sends "/start" (private chat or group). 
   - Bot: reply with a short friendly welcome message. Suggested text: "Hi — I'm EchoSnap. Send /echo <text> and I'll repeat it back to you." (plain text, no formatting required).

2. /echo <text>
   - Trigger: user sends command "/echo" followed by text.
   - Bot behavior:
     - If <text> is present: reply with the exact text that follows the command (preserve characters; send as plain text, parse_mode: None).
     - If no text provided: reply with usage hint: "Usage: /echo <text>".
     - If text length exceeds Telegram message limit (4096 characters): truncate to 4096 characters and append "..." (or send a short error telling user the message was truncated).
   - Examples:
     - User: "/echo hello world" → Bot: "hello world"
     - User: "/echo    lots of spaces" → Bot: "lots of spaces" (leading spaces trimmed from arguments)

Notes on chats:
- The bot will respond to commands in private chats and in groups where it receives the command (subject to Telegram privacy settings). It will ignore non-command messages.

## Persistence
- None. No database, no file storage. The bot is stateless.

## Payments
- None.

## Non-goals
- No inline keyboards, no callback handling.
- No external APIs, no webhooks to third-party services.
- No user data storage, analytics, or message history retention beyond what Telegram provides.

## Operational details (for the developer / deployer)
- Language & runtime: Python 3.11 (sensible default).
- Library: python-telegram-bot v20+ (or equivalent minimal wrapper). Implementation should use long polling for simplicity.
- Bot token: provided via environment variable TELEGRAM_BOT_TOKEN at runtime.
- Logging: log to stdout/stderr only (INFO for normal ops, ERROR for exceptions).
- Error handling: catch exceptions in update handlers; log full exception server-side and send a minimal user-facing message "An internal error occurred." to the user when appropriate.

## Assumptions & defaults
- Default language: Python 3.11 and python-telegram-bot v20+ — common, well-supported stack for small bots.
- Use long polling rather than webhooks — simpler deployment and sufficient for a tiny bot.
- Bot token is supplied via environment variable TELEGRAM_BOT_TOKEN — standard secure practice for deployments.
- Replies are plain text (no Markdown/HTML) — avoids escaping and keeps behavior predictable.
- If /echo has no argument: respond with "Usage: /echo <text>" — gives a clear, minimal hint.
- Trim leading whitespace from the echoed argument and echo the remainder exactly — sensible for user input cleanliness.
- Enforce Telegram max message length 4096 by truncating and indicating truncation — prevents Telegram send failures.
- Log to stdout/stderr only and do not send logs externally — aligns with "no external integrations" requirement.


This brief contains concrete, production-ready decisions for building EchoSnap; the builder should implement exactly these behaviors unless the owner requests changes.