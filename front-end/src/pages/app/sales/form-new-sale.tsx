import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { CartNewSale } from "./cart-new-sale";
import { TableProductsForSale } from "./table-products-for-sale";


export function FormNewSale() {
    return <DialogContent size="large" className="flex flex-col h-4/5">
        <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold">Produtos</DialogTitle>
        </DialogHeader>


        <div className="flex-grow py-4 flex gap-4 w-full h-4/5">
            <div className="w-2/4 overflow-y-auto">
                <TableProductsForSale />
            </div>

            <div className="w-1/3 ml-auto">
                <CartNewSale />
            </div>
        </div>
    </DialogContent>
}