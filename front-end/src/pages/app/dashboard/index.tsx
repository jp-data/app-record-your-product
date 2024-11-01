import { PopularCategoriesGraph } from "./popular-categories";
import { ResultGraph } from "./result-graph";
import { RevenueCard } from "./revenue-card";
import { SalesCountCard } from "./sales-count-card";

export function Dashboard() {
    return (
        <div className="flex flex-col gap-4 p-8 items-start">
            <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
            <div className="grid grid-cols-2 gap-4">
                <RevenueCard />
                <SalesCountCard />
            </div>
            <div className="grid grid-cols-9 gap-4 w-full">
                <ResultGraph />
                <PopularCategoriesGraph />
            </div>
        </div>
    )
}