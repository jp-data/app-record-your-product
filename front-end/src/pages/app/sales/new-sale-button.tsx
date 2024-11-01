import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { FormNewSale } from "./form-new-sale";

export function NewSaleButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" title="Nova Venda" className="border rounded-full w-32 h-12 text-white bg-cyan-500 font-semibold">
                    Nova Venda
                </button>
            </DialogTrigger>
            <FormNewSale />
        </Dialog>
    );
}