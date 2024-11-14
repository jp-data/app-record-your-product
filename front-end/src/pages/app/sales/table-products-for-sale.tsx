import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import { getProducts } from "../../../api-requisitions/get-products";
import { useEffect, useState } from "react";

interface DataType {
    id: string;
    item: string;
    category: string;
    value: number
}


export function TableProductsForSale() {
    const [products, setProducts] = useState<DataType[]>([])

    const { data: result } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })

    useEffect(() => {
        if (result) {
            setProducts(result)
        }
    }, [result])

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
        },

    ];

    return (
        <Table<DataType>
            columns={columns}
            dataSource={products?.map(item => ({ ...item, key: item.id }))}
        />
    )
}