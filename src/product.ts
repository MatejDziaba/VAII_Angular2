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
    Bicycle = 'bicykel',
    ElectroBicycle = 'electroBicykel',
    // Další prvky podle potřeby
  }
  
  // Přidání nové hodnoty do enumu
  export namespace TYPEPRODUCT {
    export const NewType = 'newType';
  }