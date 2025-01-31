import { Dispatch, SetStateAction, useState } from "react";
import { DialogContent, DialogHeader } from "../../../components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";

interface FormDiscountFilterProps {
    isDialogOpen: boolean
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
    total: number
    setDiscount: Dispatch<SetStateAction<number>>
}

export function FormDiscount({ isDialogOpen, setIsDialogOpen, total, setDiscount }: FormDiscountFilterProps) {
    const [discountInput, setDiscountInput] = useState('')

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")
        const formatedValue = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(parseFloat(value) / 100)
        setDiscountInput(formatedValue)
    }

    const parsePriceInput = () => {
        const numericValue = parseFloat(discountInput.replace(/[^\d,]/g, "").replace(",", "."))
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
                    <h1 className="text-2xl text-center font-semibold">Desconto na compra</h1>
                </div>
            </DialogHeader>
            <form className="flex flex-col items-center justify-center">
                <div className="space-y-4 py-4 flex justify-center w-1/2">
                    <input
                        type="text"
                        value={discountInput}
                        onChange={handlePriceChange}
                        placeholder="R$0,00"
                        className="h-10 border-2 rounded w-full px-2 border-gray-500"
                    />
                </div>
                <div className="space-y-4 py-4 flex flex-col items-end w-1/2">
                    <div className="flex w-3/5 justify-between font-semibold">
                        <p>Subtotal</p>
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                            total
                        )}
                    </div>

                    <div className="flex w-3/5 justify-between text-red-600 font-semibold">
                        <p>Desconto</p>
                        {'-' + discountInput}
                    </div>

                    <div className="flex w-2/4 justify-between font-semibold">
                        <p>Total</p>
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                            total - parsePriceInput()
                        )}
                    </div>

                    <div className="flex w-2/4">
                        <button
                            type='button'
                            className="h-9 text-lg self-end font-bold w-full bg-slate-200 rounded-xl  disabled:text-gray-500 disabled:cursor-not-allowed"
                            onClick={handleApplyDiscount}
                            disabled={discountInput === '' || parsePriceInput() <= 0}
                        >
                            Aplicar
                        </button>
                    </div>
                </div>
            </form>
        </DialogContent>
    </Dialog>
}