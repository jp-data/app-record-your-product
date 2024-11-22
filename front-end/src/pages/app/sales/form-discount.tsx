import { useState } from "react";
import { DialogContent, DialogHeader } from "../../../components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";

export function FormDiscount({ isDialogOpen, setIsDialogOpen, total, setDiscount }) {
    const [priceInput, setPriceInput] = useState('')

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")
        const formatedValue = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(parseFloat(value) / 100)
        setPriceInput(formatedValue)
    }

    const parsePriceInput = () => {
        const numericValue = parseFloat(priceInput.replace(/[^\d,]/g, "").replace(",", "."))
        return isNaN(numericValue) ? 0 : numericValue
    }

    const handleApplyDiscount = () => {
        const parsedDiscount = parsePriceInput();
        setDiscount(parsedDiscount);
        setIsDialogOpen(false);
    };

    return <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="small">
            <DialogHeader>
                <div className="space-y-4 py-4">
                    <h1 className="text-xl text-center">Desconto na compra</h1>
                </div>
            </DialogHeader>
            <form className="flex flex-col items-center justify-center">
                <div className="space-y-4 py-4 flex justify-center w-1/2">
                    <input
                        type="text"
                        value={priceInput}
                        onChange={handlePriceChange}
                        placeholder="R$0,00"
                        className="h-10 border-2 rounded px-2 border-gray-500"
                    />
                </div>
                <div className="space-y-4 py-4 flex justify-around w-1/2">
                    <p>Subtotal</p>
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                        total - parsePriceInput()
                    )}
                </div>
                <button type='button' className="h-9 w-1/2 text-lg self-end" onClick={handleApplyDiscount}>
                    Aplicar
                </button>
            </form>
        </DialogContent>
    </Dialog>
}