/**
 * Функция для преобразования даты в российский формат
 * @param data 
 * @returns возравщает дату в ru-формате
 */
export const getLocalFormatDate = (data: Date): string => {
  const date = new Date(data);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const getLocalDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return getLocalDate;
};
