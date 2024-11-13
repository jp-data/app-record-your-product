import { CirclePlus } from "lucide-react";
import { FormNewProduct } from "./form-new-product";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { useState } from "react";

export function NewProductButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button type="button" title="Cadastrar produto" onClick={() => setIsDialogOpen(true)}>
                    <CirclePlus size={32} />
                </button>
            </DialogTrigger>
            <FormNewProduct isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
    );
}
