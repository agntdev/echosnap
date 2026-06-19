import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";
import { inlineKeyboard, inlineButton } from "../toolkit/index.js";

const composer = new Composer<BotContext<Session>>();

composer.command("menu", async (ctx) => {
  await ctx.reply("Welcome! I am your bot assistant. Use the menu below to navigate:", {
    reply_markup: inlineKeyboard([
      [inlineButton("📊 Dashboard", "menu:dashboard")],
      [inlineButton("⚙️ Settings", "menu:settings")],
      [inlineButton("ℹ️ Help", "menu:help")],
    ]),
  });
});

export default composer;
