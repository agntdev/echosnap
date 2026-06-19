import { Composer } from "grammy";
import type { BotContext } from "../toolkit/index.js";
import type { Session } from "../bot.js";

const composer = new Composer<BotContext<Session>>();

composer.command("div", async (ctx) => {
  const raw = ctx.match ?? "";
  const parts = raw.trim().split(/\s+/);

  if (parts.length < 2 || parts[0] === "" || parts[1] === "") {
    await ctx.reply("Usage: /div <a> <b>");
    return;
  }

  if (parts.length > 2) {
    await ctx.reply("Usage: /div <a> <b>");
    return;
  }

  const a = parseFloat(parts[0]);
  const b = parseFloat(parts[1]);

  if (isNaN(a) || isNaN(b)) {
    await ctx.reply("Please provide two numbers. Usage: /div <a> <b>");
    return;
  }

  if (b === 0) {
    await ctx.reply("Division by zero is undefined");
    return;
  }

  const result = a / b;
  await ctx.reply(`${a} / ${b} = ${result}`);
});

export default composer;