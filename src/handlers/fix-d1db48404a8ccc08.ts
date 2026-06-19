import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const e = err instanceof Error ? err : new Error(String(err));
    console.error("[ERROR]", e.stack ?? e.message ?? String(e));
    try {
      await ctx.reply("An internal error occurred.");
    } catch {
      // reply delivery failed — nothing further we can do
    }
  }
});

composer.command("parse", async (ctx) => {
  const raw = ctx.match?.trim();
  if (!raw) {
    await ctx.reply("Usage: /parse <number>");
    return;
  }
  const n = Number(raw);
  if (isNaN(n)) {
    throw new Error(`Not a number: ${raw}`);
  }
  await ctx.reply(String(n));
});

export default composer;
