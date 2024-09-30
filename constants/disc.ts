// константы для дисков (взято из видео. В моем варианте уже не тспользуются, поскольку у меня нет вшитых в константы размеров дисков. В моем варианте доступные размеры дисков вычисляются на лету из items, получаемого из БД.)
// export const mapDiscThickness = {
//     1.5: '1.5 мм',
//     1.7: '1.7 мм',
//     1.8: '1.8 мм',
// } as const;

// export const mapDiscQuantityOfTeeth = {
//     55: '55 зубьев',
//     60: '60 зубьев',
// } as const

// export const discThickness = Object.entries(mapDiscThickness).map(([value, name]) => ({
//     name,
//     value
// }));

// export const discQuantityOfTeeth = Object.entries(mapDiscQuantityOfTeeth).map(([value, name]) => ({
//     name,
//     value
// }));

// export type DiscThickness = keyof typeof mapDiscThickness;
// export type DiscQuantityOfTeeth = keyof typeof mapDiscQuantityOfTeeth;