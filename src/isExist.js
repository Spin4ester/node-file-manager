import { access } from 'node:fs/promises';

export default async function isExist(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
