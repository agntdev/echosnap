import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.command("div", async (ctx) => {
  const text = ctx.match;
  if (!text) {
    await ctx.reply("Usage: /div <numerator> <denominator>");
    return;
  }
  const parts = text.trim().split(/\s+/);
  if (parts.length < 2) {
    await ctx.reply("Usage: /div <numerator> <denominator>");
    return;
  }
  const [numStr, denStr] = [parts[0]!, parts[1]!];
  const num = Number(numStr);
  const den = Number(denStr);
  if (isNaN(num) || isNaN(den)) {
    throw new Error(`Invalid numbers: ${numStr} ${denStr}`);
  }
  if (den === 0) {
    throw new Error("Division by zero");
  }
  await ctx.reply(`${num} / ${den} = ${num / den}`);
});

async function errorHandler(err: unknown) {
  const botError = err as { error: unknown; ctx: BotContext<Session> };
  const e =
    botError.error instanceof Error
      ? botError.error
      : new Error(String(botError.error));
  console.error("[ERROR]", e.stack ?? e.message ?? String(e));
  try {
    await botError.ctx.reply("An internal error occurred.");
  } catch {
    // reply delivery failed — nothing further we can do
  }
}

export default composer.errorBoundary(errorHandler);
