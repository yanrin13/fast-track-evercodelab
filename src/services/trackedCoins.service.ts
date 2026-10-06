import {
  getTrackedCoins,
  addTrackedCoin,
  updateTrackedCoin,
  deleteTrackedCoin,
} from "../repositories/trackedCoins.repository.js";

// Получение списка отслеживаемых монет из базы данных
export function getTrackedList(userId: number) {
  return getTrackedCoins(userId);
}

// добавление монеты в список отслеживаемых
export function addCoin(userId: number, coinSymbol: string) {
  return addTrackedCoin(userId, coinSymbol);
}
// изменение монеты в списке отслеживаемых
export function updateCoin(
  userId: number,
  oldSymbol: string,
  newSymbol: string,
) {
  return updateTrackedCoin(userId, oldSymbol, newSymbol);
}
// удаление монеты из списка отслеживаемых
export function deleteCoin(userId: number, coinSymbol: string) {
  return deleteTrackedCoin(userId, coinSymbol);
}
