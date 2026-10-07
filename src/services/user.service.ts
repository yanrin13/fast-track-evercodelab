import * as userRepository from "../repositories/user.repository.js";
import { getFirstUserApiKey } from "../repositories/user.repository.js";

export function createUser() {
  return userRepository.createUser();
}

export async function getFirstUserApiKeyService(): Promise<string | null> {
  return getFirstUserApiKey();
}
