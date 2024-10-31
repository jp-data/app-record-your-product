import { CirclePlus } from "lucide-react";
import { FormNewProduct } from "./form-new-product";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";

export function NewTaskButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" title="Cadastrar produto">
                    <CirclePlus size={32} />
                </button>
            </DialogTrigger>
            <FormNewProduct />
        </Dialog>
    );
}
