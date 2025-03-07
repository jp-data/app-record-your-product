import { useEffect, useState } from "react";
import { NewProductButton } from "./new-product-button"
import { SearchProduct } from "./search-product"
import { TableProductsDataType, TableProducts } from "./table-products"
import { getProducts } from "../../../api-requisitions/get-products";
import { useQuery } from "@tanstack/react-query";
import { OrderingProducts } from "./ordering-products";
import { getSortProducts } from "../../../api-requisitions/get-sortby-products";


export function Products() {
    const [searchValue, setSearchValue] = useState('')
    const [products, setProducts] = useState<TableProductsDataType[]>([])
    const [sortBy, setSortBy] = useState<string>('')
    const [direction, setDirection] = useState<string>('')
    const [isLoadingFilteredProducts, setisLoadingFilteredProducts] = useState<boolean>(false)

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

            <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-full max-w-3xl gap-2">

                <div className="flex w-full md:w-auto gap-3">
                    <NewProductButton />
                    <SearchProduct onSearch={handleSearch} />
                </div>

                <div className="w-full md:w-auto">
                    <OrderingProducts
                        setSortBy={setSortBy}
                        setDirection={setDirection}
                        sortBy={sortBy}
                        direction={direction}
                        setisLoadingFilteredProducts={setisLoadingFilteredProducts}
                    />
                </div>
            </div>
            <div className="w-full overflow-auto max-h-[500px] border rounded-lg shadow">
                <TableProducts
                    result={result}
                    data={searchProducts}
                    isLoadingFilteredProducts={isLoadingFilteredProducts}
                    setProducts={setProducts}
                />
            </div>
        </div>
    );
}