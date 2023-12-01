export interface Product 
{
    id: number;
    type: TYPEPRODUCT;
    nameProduct: string;
    markUp: string;
    price: number;
    img: string;
    discount: number;
}

export enum TYPEPRODUCT {
  // bicykle
    Bicycle = 'bicykel',
    ElectroBicycle = 'electroBicykel',
    HorskyBicycle = 'horskyBicykel',
    CestnyBicycle = 'cestnyBicykel',
    KrosovyBicycle = 'krosovyBicykel',
    MestkyBicycle = 'mestkyBicykel',
    TrekingBicycle = 'trekingBicykel',
    GravelCyklotrosBicycle = 'gravelCyklotrosBicykel',
    DetskyBicycle = 'detskyBicykel',
    DirtBMXBicycle = 'dirtBMXBicykel'

    // 
  }
  
  // Přidání nové hodnoty do enumu
  export namespace TYPEPRODUCT {
    export const NewType = 'newType';
  }