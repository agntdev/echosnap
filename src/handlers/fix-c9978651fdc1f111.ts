import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const MAX_LENGTH = 4096;

const composer = new Composer<BotContext<Session>>();

composer.command("echo", async (ctx) => {
  const raw = ctx.match ?? "";
  const text = raw.replace(/^ +/, "");

  if (!text) {
    await ctx.reply("Usage: /echo <text>");
    return;
  }

  if (text.length > MAX_LENGTH) {
    await ctx.reply(text.slice(0, MAX_LENGTH) + "...");
    return;
  }

  await ctx.reply(text);
});

export default composer;
