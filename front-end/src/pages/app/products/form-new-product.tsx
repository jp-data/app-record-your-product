import { DialogContent, DialogFooter, DialogHeader } from "../../../components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProducts } from "../../../api-requisitions/create-product";

const newProductSchema = zod.object({
    id: zod.number(),
    name: zod.string(),
    description: zod.string(),
    category: zod.string(),
    quantity: zod.number(),
    price: zod.number()
})

export type newProduct = zod.infer<typeof newProductSchema>

export function FormNewProduct() {
    const { handleSubmit, register, watch, reset } = useForm<newProduct>({
        resolver: zodResolver(newProductSchema)
    })
    const queryClient = useQueryClient()
    const { mutate } = useMutation(createProducts, {
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
        },
        onError: (error) => {
            console.error("Error creating product:", error);
        }
    })

    const name = watch('name')
    const description = watch('description')
    const category = watch('category')
    const quantity = watch('quantity')
    const price = watch('price')

    async function handleCreateNewProduct(data: newProduct) {
        mutate(data)
    }

    return <DialogContent size="small">
        <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Novo produto</DialogTitle>
            <DialogDescription>Descrição</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateNewProduct)}>
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="name" className="font-semibold text-base mb-0 w-3/5">Nome do produto:</label>
                    <input type="text" id="name" className="border rounded-md w-full pl-4" required />
                </div>

                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="description" className="font-semibold text-base mb-0 w-3/5">Descrição :</label>
                    <input type="text" id="description" className="border rounded-md w-full pl-4" required />
                </div>

                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="category" className="font-semibold text-base mb-0 w-3/5">Categoria :</label>
                    <input type="text" id="category" className="border rounded-md w-full pl-4" required />
                </div>


                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="quantity" className="font-semibold text-base mb-0 w-3/5">Quantidade :</label>
                    <input type="number" id="quantity" className="border rounded-md w-full pl-4" required />
                </div>


                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="price" className="font-semibold text-base mb-0 w-3/5">Preço :</label>
                    <input type="number" id="price" className="border rounded-md w-full pl-4" required />
                </div>

            </div>

            <DialogFooter>
                <button className="border rounded-lg bg-gray-300 w-2/4 font-semibold" type="submit">Cadastrar</button>
            </DialogFooter>

        </form>
    </DialogContent>
}
