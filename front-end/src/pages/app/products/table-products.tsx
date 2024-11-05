import { useQuery } from '@tanstack/react-query';
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Trash2 } from 'lucide-react';
import { getProducts } from '../../../api-requisitions/get-products';


interface DataType {
    key: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
}

export function TableProducts() {
    const { data: result } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })

    console.log(result)

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '',
            key: 'actionEdit',
            render: (_, record) => (
                <Space size="middle">
                    <a>Editar </a>
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

    const data: DataType[] = result?.map((item, index) => ({
        key: item.id || index.toString(),
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
    })) || [];


    return (
        <Table<DataType> columns={columns} className='mt-10 mr-20 mb-5 ml-20' dataSource={data} />
    )
}