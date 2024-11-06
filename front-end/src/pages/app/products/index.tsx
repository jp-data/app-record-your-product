import { useState } from "react";
import { NewProductButton } from "./new-product-button"
import { SearchProduct } from "./search-product"
import { TableProducts } from "./table-products"
import { getProducts } from "../../../api-requisitions/get-products";
import { useQuery } from "@tanstack/react-query";


export function Products() {
    const { data: result } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
            <div className="flex items-center w-full max-w-lg">
                <NewProductButton />
                <SearchProduct onSearch={handleSearch} />
            </div>
            <div className="w-full">
                <TableProducts data={result} />
            </div>
        </div>

    )
}