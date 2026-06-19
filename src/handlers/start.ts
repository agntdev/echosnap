import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.command("start", async (ctx) => {
  await ctx.reply("Welcome! I am ready to help.");
});

export default composer;