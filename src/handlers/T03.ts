import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.command("help", async (ctx) => {
  await ctx.reply(
    "Available commands:\n\n" +
      "/start — Welcome message\n" +
      "/ping — Health check (replies pong)\n" +
      "/help — This help message",
  );
});

export default composer;
