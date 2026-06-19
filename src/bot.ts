import { Composer } from "grammy";
import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createBot, type BotContext } from "./toolkit/index.js";

export interface Session {
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const handlersDir = join(__dirname, "handlers");

const composers: Composer<BotContext<Session>>[] = [];

const entries = await readdir(handlersDir);
for (const file of entries) {
  if (!file.endsWith(".js")) continue;
  const url = pathToFileURL(join(handlersDir, file)).href;
  const mod = await import(url);
  if (mod.default instanceof Composer) {
    composers.push(mod.default);
  }
}

export function buildBot(token: string) {
  const bot = createBot<Session>(token, {
    initial: () => ({}),
  });

  for (const composer of composers) {
    bot.use(composer);
  }

  return bot;
}