import { Select } from "antd";
import { useState } from "react";

export function DataSelector() {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (value) => {
        const selectedOption = options.find(option => option.value === value);
        setSelectedValue(selectedOption);
    };

    const options = [
        { value: '1', label: 'Últimos 7 dias' },
        { value: '2', label: 'Últimos 3 dias' },
        { value: '3', label: 'Últimos 30 dias' },
    ];

    return (
        <Select
            showSearch
            placeholder="Período:"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
            value={selectedValue ? `Período: ${selectedValue.label}` : undefined}
            onChange={handleChange}
        />
    );
}
