import { openDB } from "idb";
import CryptoJS from "crypto-js";

const DB_NAME = "ApiCacheDB";
const STORE_NAME = "apiCache";
const SECRET_KEY = "YOUR_SECRET_KEY"; // Ideally derive per user session

// Open DB
async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

// Set item (encrypt)
export async function setItem(key, value) {
  const db = await getDB();
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    SECRET_KEY
  ).toString();
  await db.put(STORE_NAME, encrypted, key);
}

// Get item (decrypt)
export async function getItem(key) {
  const db = await getDB();
  const encrypted = await db.get(STORE_NAME, key);
  if (!encrypted) return null;
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
}

// Delete item
export async function deleteItem(key) {
  const db = await getDB();
  await db.delete(STORE_NAME, key);
}

// Clear all cache
export async function clearAll() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
