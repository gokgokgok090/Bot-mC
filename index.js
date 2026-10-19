const config = {
  host: 'secretsmp118.mcsh.io',
  port: 25565,
  username: 'RevengeByRain',
  auth: 'offline',
  version: '1.21.4'
};

let bot;
let timer = null;
let stopped = false;
let delay = 10000;

function connect() {
  if (stopped) return;

  console.log('[BOT] সার্ভারে ঢোকার চেষ্টা করছে...');

  bot = mineflayer.createBot(config);

  bot.on('login', () => {
    console.log('[BOT] Login successful!');
  });

  bot.once('spawn', () => {
    console.log('[BOT] Joined Successfully!');
    delay = 10000;
  });

  bot.on('messagestr', () => {
    // কোনো চ্যাট মেসেজ পাঠাবে না
  });

  bot.on('kicked', reason => {
    console.log('[BOT] Kicked:', reason);
  });

  bot.on('error', err => {
    console.log('[BOT] Error:', err.message);
  });

  bot.on('end', () => {
    console.log('[BOT] Disconnected!');

    if (stopped || timer) return;

    timer = setTimeout(() => {
      timer = null;
      console.log('[BOT] আবার কানেক্ট হচ্ছে...');
      connect();
      delay = Math.min(delay * 2, 60000);
    }, delay);
  });
}

connect();

process.on('SIGINT', () => {
  stopped = true;
  clearTimeout(timer);
  console.log('[BOT] বন্ধ করা হচ্ছে...');
  if (bot) bot.quit();
  process.exit(0);
});
