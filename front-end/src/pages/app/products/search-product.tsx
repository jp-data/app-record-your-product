import { Search } from "lucide-react";

export function SearchProduct() {
    return (
        <div className="relative w-full left-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <input
                type="text"
                placeholder="Search products"
                className="pl-10 border rounded-md w-full py-1.5"
            />
        </div>
    );
}
