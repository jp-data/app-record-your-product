import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Trash2 } from 'lucide-react';

interface DataType {
    key: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
}

export function TableProducts() {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Editar </a>
                    <a><Trash2 size={18} /></a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'Teste 23',
            description: 'Teste 23 descricao',
            category: 'Teste23 category',
            quantity: 100,
            price: 60
        },
        {
            key: '2',
            name: 'Teste 25',
            description: 'Teste 25 descricao',
            category: 'Teste25 category',
            quantity: 150,
            price: 75
        },
    ];


    return (
        <Table<DataType> columns={columns} dataSource={data} />
    )
}