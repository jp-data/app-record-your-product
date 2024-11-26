import { useEffect, useState } from "react";
import { NewProductButton } from "./new-product-button"
import { SearchProduct } from "./search-product"
import { DataType, TableProducts } from "./table-products"
import { getProducts } from "../../../api-requisitions/get-products";
import { useQuery } from "@tanstack/react-query";
import { OrderingProducts } from "./ordering-products";
import { getSortProducts } from "../../../api-requisitions/get-sortby-products";


export function Products() {
    const [searchValue, setSearchValue] = useState('')
    const [products, setProducts] = useState<DataType[]>([])
    const [sortBy, setSortBy] = useState('')
    const [direction, setDirection] = useState('')



    const { data: result } = useQuery({
        queryKey: ['products', { orderBy: sortBy, direction: direction }],
        queryFn: () => {
            if (!sortBy || !direction) {
                return getProducts()
            }
            return getSortProducts({ orderBy: sortBy, direction })
        }
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
            <div className="flex items-center justify-between w-full max-w-3xl">
                <NewProductButton />
                <SearchProduct onSearch={handleSearch} />
                <OrderingProducts setSortBy={setSortBy} setDirection={setDirection} sortBy={sortBy} direction={direction} />
            </div>
            <div className="w-full">
                <TableProducts result={result} data={searchProducts} />
            </div>
        </div>

    )
}