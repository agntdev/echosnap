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
    await ctx.reply("An internal error occurred.");
    return;
  }

  if (den === 0) {
    await ctx.reply("An internal error occurred.");
    return;
  }

  await ctx.reply(`${num} / ${den} = ${num / den}`);
});

export default composer;