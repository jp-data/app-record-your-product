import { Search } from "lucide-react";
import { useState } from "react";


interface SearchProductProps {
    onSearch: (value: string) => void
}

export function SearchProduct({ onSearch }: SearchProductProps) {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
        onSearch(value)
        console.log(searchValue)
    }

    return (
        <div className="relative w-full left-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
                type="text"
                placeholder="Search products"
                className="pl-10 border rounded-md w-full py-1.5"
                value={searchValue}
                onChange={handleChange}
            />
        </div>
    );
}
