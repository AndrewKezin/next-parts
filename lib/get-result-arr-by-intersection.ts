import intersection from 'lodash/intersection';

export const getResultArrByIntersection = (
  arr1: string[],
  arr2: string[],
  arr3: string[],
  arr4: string[],
  arr5: string[],
  arr6: string[],
  arr7: string[],
): string[] => {
  // пропускаем пустые массивы
  const tempArr = [arr1, arr2, arr3, arr4, arr5, arr6, arr7].filter((arr) => arr.length > 0);
  // выполняем пересечение (получаем итоговый массив, в котором есть только элементы, которые есть во всех массивах)
  const resultArr = intersection(...tempArr).sort((a, b) => a.localeCompare(b));
  return resultArr;
};
