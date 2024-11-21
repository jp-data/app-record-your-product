
import { useState } from "react";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { FormNewSale } from "./form-new-sale";

export function NewSaleButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function handleCloseDialog() {
        setIsDialogOpen(false)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    title="Nova Venda"
                    className="border rounded-full w-32 h-12 text-white bg-cyan-500 font-semibold"

                >
                    Nova Venda
                </button>
            </DialogTrigger>
            <FormNewSale onClose={handleCloseDialog} />
        </Dialog>
    );
}