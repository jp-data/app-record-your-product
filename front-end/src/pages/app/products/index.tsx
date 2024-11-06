import { useEffect, useState } from "react";
import { NewProductButton } from "./new-product-button"
import { SearchProduct } from "./search-product"
import { DataType, TableProducts } from "./table-products"
import { getProducts } from "../../../api-requisitions/get-products";
import { useQuery } from "@tanstack/react-query";


export function Products() {
    const [searchValue, setSearchValue] = useState('')
    const [products, setProducts] = useState<DataType[]>([])

    const { data: result } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })

    useEffect(() => {
        if (result) {
            setProducts(result);
        }
    }, [result]);

    const handleSearch = (value: string) => {
        setSearchValue(value)
    }

    const searchProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase())
    )


    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
            <div className="flex items-center w-full max-w-lg">
                <NewProductButton />
                <SearchProduct onSearch={handleSearch} />
            </div>
            <div className="w-full">
                <TableProducts data={searchProducts} />
            </div>
        </div>

    )
}