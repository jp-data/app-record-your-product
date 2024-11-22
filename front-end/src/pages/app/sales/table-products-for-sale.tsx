import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import { getProducts } from "../../../api-requisitions/get-products";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface DataType {
    id: string;
    name: string;
    category: string;
    price: number
}

interface addToCartFunction {
    onAddToCart: (product: DataType) => void
}


export function TableProductsForSale({ onAddToCart }: addToCartFunction) {
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
            render: (value: number) =>
                new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(value),
        },
        {
            title: '',
            key: 'actionAdd',
            render: (_, row) => (
                <button
                    onClick={() => onAddToCart(row)}
                    className="underline text-blue-500 hover:text-blue-700">
                    Adicionar
                </button>
            )
        }

    ];

    return (
        <Table<DataType>
            columns={columns}
            dataSource={products?.map(item => ({
                ...item,
                key: uuidv4(),
            }))}
            pagination={false}
            scroll={{ y: 500 }}
        />
    )
}