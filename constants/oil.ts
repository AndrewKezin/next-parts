// константы для масел
export const mapOilVolume = {
    1: '1 л',
    4: '4 л',
    5: '5 л',
} as const;

export const oilVolume = Object.entries(mapOilVolume).map(([value, name]) => ({
    name,
    value
}));

export type OilVolume = keyof typeof mapOilVolume;

