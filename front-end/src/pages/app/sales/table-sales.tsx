import { Table, TableProps } from "antd";



interface DataType {
    key: string;
    code: number;
    item: string;
    data: string
    value: number;
    discount: number;
    subtotal: number;
    payment: string;
}

export function TableSales() {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Itens',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'Valor total',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Desconto',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
        {
            title: 'Pagamento',
            dataIndex: 'payment',
            key: 'payment',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            code: 54879,
            item: '1 Bola society',
            data: '23/10/2024',
            value: 121.9,
            discount: 0,
            subtotal: 121.9,
            payment: 'Dinheiro'
        },
        {
            key: '2',
            code: 54879 - 4,
            item: ' 1 Bola society 1 meião',
            data: '23/10/2024',
            value: 154.9,
            discount: 0,
            subtotal: 154.9,
            payment: 'Débito'
        },
    ];


    return (
        <Table<DataType> columns={columns} dataSource={data} />
    )
}