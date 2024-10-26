
class ProductImageListDto {
   url: string
   description: string
}

export class ProductListDto {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly image: ProductImageListDto,
   ) {}
}