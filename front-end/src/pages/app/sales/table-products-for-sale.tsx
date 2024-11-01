import { Table, TableProps } from "antd";

interface DataType {
    key: string;
    item: string;
    category: string;
    value: number
}


export function TableProductsForSale() {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Preço',
            dataIndex: 'value',
            key: 'value',
        },

    ];

    const data: DataType[] = [
        {
            key: '2',
            item: 'Bola society',
            category: 'bolas',
            value: 121.9
        },
        {
            key: '1',
            item: 'Meião Nike',
            category: 'vestuário',
            value: 85.89
        },
        {
            key: '1',
            item: 'Meião Nike',
            category: 'vestuário',
            value: 85.89
        },
        {
            key: '1',
            item: 'Meião Nike',
            category: 'vestuário',
            value: 85.89
        },

    ];
    return (
        <Table<DataType> columns={columns} dataSource={data} />
    )
}