import { Table, TableProps } from "antd";



interface DataType {
    id: number;
    date: string
    products: string;
    total: number;
    discount: number;
    subtotal: number;
    payment: string;
}

interface DataProps {
    result: DataType[]
}

export function TableSales({ result }: DataProps) {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Código(id_product)',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Itens',
            dataIndex: 'products',
            key: 'products',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
        {
            title: 'Desconto',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Valor total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Pagamento',
            dataIndex: 'payment',
            key: 'payment',
        },
    ];


    return (
        <Table<DataType>
            columns={columns}
            dataSource={result?.map(item => ({ ...item, key: item.id }))}
            className="font-semibold"
        />
    )
}