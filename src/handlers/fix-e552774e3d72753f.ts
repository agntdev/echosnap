import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.callbackQuery(/^menu:(dashboard|settings|help)$/, async (ctx) => {
  const page = ctx.callbackQuery.data.split(":")[1];
  await ctx.answerCallbackQuery();
  switch (page) {
    case "dashboard":
      await ctx.reply("Dashboard: Your bot assistant overview.");
      break;
    case "settings":
      await ctx.reply("Settings: Configure your bot preferences.");
      break;
    case "help":
      await ctx.reply("Help: Use /menu to navigate, /echo to repeat text.");
      break;
  }
});

export default composer;