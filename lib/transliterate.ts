/**
 *  функция для транслитерации названия категорий
 * 
 * @param str - строка для транслитерации
 * @returns возвращает исходную строку в транслите
 */
export const transliterate = (str: string) => {
  const rusLetters = [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ъ',
    'ы',
    'ь',
    'э',
    'ю',
    'я',
    ' ',
  ];
  const engLetters = [
    'a',
    'b',
    'v',
    'g',
    'd',
    'e',
    'e',
    'zh',
    'z',
    'i',
    'i',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'r',
    's',
    't',
    'u',
    'f',
    'kh',
    'tc',
    'ch',
    'sh',
    'shch',
    '',
    'y',
    '',
    'e',
    'iu',
    'ia',
    '-',
  ];
  const letterArr = str.toLocaleLowerCase().split('');
  let accum: string[] = [];

  letterArr.map((letter) => {
    const foundIndex = rusLetters.indexOf(letter);
    if (foundIndex !== -1) {
      accum.push(engLetters[foundIndex]);
    }
  });

  const finallyResult = accum.join('');

  return finallyResult;
};
