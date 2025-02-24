import { DialogContent, DialogFooter, DialogHeader } from "../../../components/ui/dialog";
import { DialogTitle, DialogDescription, Dialog } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createProducts } from "../../../api-requisitions/create-product";
import { queryClient } from "../../../lib/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface newProductSchema {
    id: string
    name: string
    description: string
    category: string
    quantity: number
    price: number
}

interface DialogsProps {
    isDialogOpen: boolean
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export function FormNewProduct({ isDialogOpen, setIsDialogOpen }: DialogsProps) {
    const [priceInput, setPriceInput] = useState("")
    const { register, handleSubmit, reset, watch } = useForm<newProductSchema>()

    const { mutateAsync: registerProduct } = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })

    const selectedCategory = watch('category')

    async function handleCreateProduct(data: newProductSchema) {
        const formattedPrice = parseFloat(priceInput.replace(/\D/g, "")) / 100
        try {
            await registerProduct({
                ...data,
                price: formattedPrice
            })
            setIsDialogOpen(false)
        }
        catch (error) {
            console.error(error)
        }
        reset()
        return { data }
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")
        const formatedValue = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(parseFloat(value) / 100)
        setPriceInput(formatedValue)
    }

    useEffect(() => {
        if (!isDialogOpen) {
            setPriceInput('')
        }
    }, [isDialogOpen])

    return <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent size="small">
            <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">Novo produto</DialogTitle>
                <DialogDescription>Descrição</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-1">
                        <label htmlFor="name" className="font-semibold text-base mb-0 w-3/5">Nome do produto:</label>
                        <input
                            type="text"
                            id="name"
                            className="border rounded-md w-full pl-4"
                            {...register('name')}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-1">
                        <label htmlFor="description" className="font-semibold text-base mb-0 w-3/5">Descrição :</label>
                        <input
                            type="text"
                            id="description"
                            className="border rounded-md w-full pl-4"
                            {...register('description')}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-1">
                        <label htmlFor="category" className="font-semibold text-base mb-0 w-3/5">Categoria :</label>
                        <select

                            id="category"
                            className="border rounded-md w-full pl-4"
                            {...register('category')}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="Produto">Produto</option>
                            <option value="Serviço">Serviço(estoque indefinido)</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-1">
                        <label htmlFor="quantity" className="font-semibold text-base mb-0 w-3/5">Quantidade :</label>
                        <input
                            type="number"
                            id="quantity"
                            className="border rounded-md w-full pl-4"
                            {...register('quantity', { valueAsNumber: true })}
                            required
                            disabled={selectedCategory === 'Serviço'}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-1">
                        <label htmlFor="price" className="font-semibold text-base mb-0 w-3/5">Preço :</label>
                        <input
                            type="text"
                            id="price"
                            className="border rounded-md w-full pl-4"
                            value={priceInput}
                            onChange={handlePriceChange}
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <button className="border rounded-lg bg-gray-300 w-2/4 font-semibold" type="submit">Cadastrar</button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}
