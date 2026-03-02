/**
 * Upstash Redis store via REST API (no SDK needed).
 *
 * Env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 */

const REDIS_URL = () => process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = () => process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  const res = await fetch(REDIS_URL(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upstash Redis ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.result;
}

// --- Conversations ---

/**
 * Get conversation history for a phone number.
 * @param {string} phone
 * @returns {Promise<object|null>} Conversation data or null
 */
export async function getConversation(phone) {
  const raw = await redis(["GET", `conv:${phone}`]);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Save conversation state for a phone number.
 * TTL: 30 days.
 * @param {string} phone
 * @param {object} data - { messages: [...], name, lastActive, mode }
 */
export async function saveConversation(phone, data) {
  const ttl = 30 * 24 * 60 * 60; // 30 days
  await redis(["SET", `conv:${phone}`, JSON.stringify(data), "EX", ttl]);
}

// --- Patterns (learned from owner interactions) ---

/**
 * Get all learned patterns.
 * @returns {Promise<string[]>} Array of pattern strings
 */
export async function getPatterns() {
  const raw = await redis(["GET", "patterns"]);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Add a new learned pattern. Keeps at most 50 patterns (FIFO).
 * @param {string} pattern - The pattern description
 */
export async function addPattern(pattern) {
  const patterns = await getPatterns();
  patterns.push(pattern);
  // Keep only the 50 most recent
  const trimmed = patterns.slice(-50);
  await redis(["SET", "patterns", JSON.stringify(trimmed)]);
}

// --- Interactions (for learning) ---

/**
 * Record an interaction for training: what AI suggested vs what owner sent.
 * @param {string} phone
 * @param {{ clientMsg: string, suggestedReply: string, actualReply: string }} interaction
 */
export async function recordInteraction(phone, interaction) {
  const key = `interactions:${phone}`;
  const raw = await redis(["GET", key]);
  const list = raw ? JSON.parse(raw) : [];
  list.push({ ...interaction, timestamp: Date.now() });
  // Keep last 100 interactions per phone
  const trimmed = list.slice(-100);
  const ttl = 90 * 24 * 60 * 60; // 90 days
  await redis(["SET", key, JSON.stringify(trimmed), "EX", ttl]);
}

// --- Bot config ---

/**
 * Get bot mode (training/active) for a specific phone or globally.
 * @param {string} [phone] - If provided, check per-phone pause status
 * @returns {Promise<string>} "training" or "active"
 */
export async function getBotMode(phone) {
  if (phone) {
    const paused = await redis(["GET", `paused:${phone}`]);
    if (paused) return "training"; // paused = forced training for this phone
  }
  const mode = await redis(["GET", "bot_mode"]);
  return mode || process.env.BOT_MODE || "training";
}

/**
 * Set bot mode globally.
 * @param {string} mode - "training" or "active"
 */
export async function setBotMode(mode) {
  await redis(["SET", "bot_mode", mode]);
}

/**
 * Pause auto-replies for a specific phone number.
 * @param {string} phone
 */
export async function pausePhone(phone) {
  const ttl = 30 * 24 * 60 * 60;
  await redis(["SET", `paused:${phone}`, "1", "EX", ttl]);
}

/**
 * Resume auto-replies for a specific phone number.
 * @param {string} phone
 */
export async function resumePhone(phone) {
  await redis(["DEL", `paused:${phone}`]);
}

// --- Stats ---

/**
 * Get basic stats.
 * @returns {Promise<object>}
 */
export async function getStats() {
  const mode = await getBotMode();
  const patterns = await getPatterns();
  return {
    mode,
    patternsCount: patterns.length,
  };
}
