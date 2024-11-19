
export class ProductListDto {
   constructor(
      readonly id: number,
      readonly name: string,
      readonly description: string,
      readonly category: string,
      readonly quantity: number,
      readonly price: number,
   ) { }
}