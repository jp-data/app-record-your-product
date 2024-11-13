import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditProduct } from './edit-product';

export interface DataType {
    id: string
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
}

interface dataProps {
    data: DataType[]
}

export function TableProducts({ data }: dataProps) {
    const [editProduct, setEditProduct] = useState<DataType | null>(null)

    const handleEdit = (product: DataType) => {
        setEditProduct(product)
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '',
            key: 'actionEdit',
            render: (_, row: DataType) => (
                <Space size="middle">
                    <button onClick={() => handleEdit(row)}>
                        Editar
                    </button>
                </Space>
            ),
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Quantidade',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '',
            key: 'actionDelete',
            render: (_, record) => (
                <Space size="middle">
                    <a><Trash2 size={18} /></a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table<DataType>
                columns={columns}
                className='mt-10 mr-20 mb-5 ml-20'
                dataSource={data?.map(item => ({ ...item, key: item.id }))}
            />
            <EditProduct
                product={editProduct}
                setEditProduct={setEditProduct}
            />
        </>

    )
}