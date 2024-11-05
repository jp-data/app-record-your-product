import { useState } from "react";
import { NewProductButton } from "./new-product-button"
import { SearchProduct } from "./search-product"
import { TableProducts } from "./table-products"

export function Products() {
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
                <TableProducts />
            </div>
        </div>

    )
}