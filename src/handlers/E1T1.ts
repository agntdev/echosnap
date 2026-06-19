import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const MAX_LENGTH = 4096;

const composer = new Composer<BotContext<Session>>();

composer.command("echo", async (ctx) => {
  let text = ctx.match;

  if (!text) {
    await ctx.reply("Usage: /echo <text>");
    return;
  }

  text = text.replace(/^ +/, "");

  if (text.length > MAX_LENGTH) {
    text = text.slice(0, MAX_LENGTH) + "...";
  }

  await ctx.reply(text);
});

export default composer;