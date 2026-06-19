import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.command("start", async (ctx) => {
  await ctx.reply(
    "Hi — I'm EchoSnap. Send /echo <text> and I'll repeat it back to you.",
  );
});

export default composer;