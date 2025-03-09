import { useQuery } from "@tanstack/react-query";
import { Table, TableProps } from "antd";
import { getProducts } from "../../../api-requisitions/get-products";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TableProductsDataType } from "../products/table-products";

export interface TableProductsForSaleProps {
    onAddToCart: (product: TableProductsDataType) => void
}

export function TableProductsForSale({ onAddToCart }: TableProductsForSaleProps) {
    const [products, setProducts] = useState<TableProductsDataType[]>([])

    const { data: result } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })



    useEffect(() => {
        if (result) {
            setProducts(result)
        }
    }, [result])

    const columns: TableProps<TableProductsDataType>['columns'] = [
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            className: "lg:table-cell hidden lg:block"
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
                    onClick={() => onAddToCart({ ...row, quantityAvailable: row.quantity, quantity: 1 })}
                    className="underline text-blue-500 hover:text-blue-700">
                    Adicionar
                </button>
            )
        }
    ];

    return (
        <Table<TableProductsDataType>
        columns={columns.map(column => ({
            ...column,
            onHeaderCell: () => ({
                style: {
                    whiteSpace: 'nowrap'
                }
            }),
            width: column.width || 110
        }))}
            dataSource={products?.map(item => ({
                ...item,
                key: uuidv4(),
            }))}
            pagination={false}
            scroll={{ y: 300 }}
            className="font-semibold"
        />
    )
}