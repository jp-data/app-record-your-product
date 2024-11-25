import { Search } from "lucide-react";

interface SearchProductsProps {
    onSearch: (value: string) => void
}

export function SearchProduct({ onSearch }: SearchProductsProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onSearch(value)
    }
    return (
        <div className="relative w-1/2 left-4">
            <Search
                className="absolute left-3 top-3 h-4 w-4 text-gray-500"
            />
            <input
                type="text"
                placeholder="Buscar produto"
                className="pl-10 border rounded-md w-full py-1.5"
                onChange={handleChange}
            />
        </div>
    );
}
