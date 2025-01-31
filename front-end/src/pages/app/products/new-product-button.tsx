import { CirclePlus } from "lucide-react";
import { FormNewProduct } from "./form-new-product";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { useState } from "react";

export function NewProductButton() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button type="button" title="Cadastrar produto" className="rounded-full hover:bg-cyan-600 focus:outline-none text-white bg-cyan-500" onClick={() => setIsDialogOpen(true)}>
                    <CirclePlus size={32} />
                </button>
            </DialogTrigger>
            <FormNewProduct isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
    );
}
