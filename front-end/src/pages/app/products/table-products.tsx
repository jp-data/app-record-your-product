import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EditProduct } from './edit-product';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '../../../api-requisitions/delete-product';
import { queryClient } from '../../../lib/react-query';
import { Flex } from '@radix-ui/themes';
import { Spin } from 'antd'

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
    result: DataType[] | undefined
    isLoadingFilteredProducts: boolean
}

export function TableProducts({ data, result, isLoadingFilteredProducts }: dataProps) {
    const [editProduct, setEditProduct] = useState<DataType | null>(null)
    const [products, setProducts] = useState<DataType[]>(data);

    const { mutateAsync: removeProduct } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        }
    })

    async function handleDelete(id: string) {
        const confirm = window.confirm('Esta ação irá excluir este produto')
        if (confirm) {
            try {
                await removeProduct(id)
            }
            catch (error) {
                console.error('Erro ao excluir: ', error)
            }
        }
    }

    useEffect(() => {
        if (result) {
            setProducts(result)
        }
    }, [result])


    const handleEdit = (product: DataType) => {
        setEditProduct(product)
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '',
            key: 'actionEdit',
            render: (_, row: DataType) => (
                <Space size="middle" className="flex items-center justify-center">
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
            render: (_, row) => (
                <Space size="middle" className="flex items-center justify-center">
                    <a onClick={() => handleDelete(row.id)}><Trash2 size={18} /></a>
                </Space>
            ),
        },
    ];
    return (
        <>
            {isLoadingFilteredProducts ? (
                <div className='flex items-center justify-center h-[400px]'>
                    <Flex align="center" gap="4">
                        <Spin size="large" />
                    </Flex>
                </div>
            )
                : (
                    <>
                        <Table<DataType>
                            columns={columns}
                            className="mt-10 mr-20 mb-5 ml-20 font-semibold"
                            dataSource={data?.map(item => ({ ...item, key: item.id }))}
                        />
                        <EditProduct
                            product={editProduct}
                            setEditProduct={setEditProduct}
                        />
                    </>
                )
            }
        </>
    );
}