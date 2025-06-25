export const dailyQuotes = [
  "You light up every room you walk into – never forget your glow was made to shine, not shrink.",
  "No mountain is too high when you've got fire in your heart and a sister in your corner.",
  "Life may throw storms, but with you by my side, every rainbow feels closer.",
  "You've got the strength of a thousand hearts and the smile that melts a million worries.",
  "Even on your hardest days, I hope you remember how deeply loved and wildly capable you are.",
  "Chin up, crown on – queens like you don't quit, they rise.",
  "You were never meant to blend in – your sparkle is supposed to stand out.",
  "You're not just growing, you're blooming – and girl, it's beautiful.",
  "The world is better because you're in it – don't ever doubt that for a second.",
  "We're a team – when you fly, I cheer; when you fall, I catch. Always.",
  "Mistakes don't define you, they shape the masterpiece you're becoming.",
  "You've got dreams that matter and a heart that can change the world – keep going.",
  "If your wings ever forget how to fly, I'll remind them what they're made for.",
  "You're like sunshine mixed with resilience – the rare kind of magic that never fades.",
  "You're doing better than you think. Be gentle with your soul, it's learning.",
  "Through every twist and turn, never forget – you're never alone. You've got me, always."
];

export const getDailyQuote = (): string => {
  const startDate = new Date('2025-06-27'); // 16 days before July 12th
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Ensure we're within the quote range
  if (diffDays < 0 || diffDays >= dailyQuotes.length) {
    return dailyQuotes[0]; // Default to first quote
  }
  
  return dailyQuotes[diffDays];
};