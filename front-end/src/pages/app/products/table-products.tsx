import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Trash2 } from 'lucide-react';

export interface DataType {
    id: string
    key: string;
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

    return (
        <Table<DataType>
            columns={columns}
            className='mt-10 mr-20 mb-5 ml-20'
            dataSource={data?.map(item => ({ ...item, key: item.id }))}
        />
    )
}