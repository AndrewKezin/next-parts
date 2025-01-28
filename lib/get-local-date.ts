/**
 * Функция для преобразования даты в российский формат
 * @param data 
 * @returns возравщает дату в ru-формате
 */
export const getLocalFormatDate = (data: Date): string => {
  let date = new Date(data);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let getLocalDate = `${day}.${month}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return getLocalDate;
};
