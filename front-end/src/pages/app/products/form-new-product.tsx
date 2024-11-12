import { DialogContent, DialogFooter, DialogHeader } from "../../../components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { createProducts } from "../../../api-requisitions/create-product";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newProductSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    category: zod.string(),
    quantity: zod.number(),
    price: zod.number()
})

export type RegisterProductForm = zod.infer<typeof newProductSchema>

export function FormNewProduct() {
    const { register, handleSubmit, reset } = useForm<RegisterProductForm>()
    const { mutateAsync: registerProduct } = useMutation({
        mutationFn: createProducts
    })

    async function handleCreateProduct(data: RegisterProductForm) {
        try {
            await registerProduct({
                name: data.name,
                description: data.description,
                category: data.category,
                quantity: Number(data.quantity),
                price: Number(data.price)
            })
        }
        catch (error) {
            console.log(error)
        }
        reset()
        return { data }
    }

    return <DialogContent size="small">
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
                    <input
                        type="text"
                        id="category"
                        className="border rounded-md w-full pl-4"
                        {...register('category')}
                        required
                    />
                </div>


                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="quantity" className="font-semibold text-base mb-0 w-3/5">Quantidade :</label>
                    <input
                        type="number"
                        id="quantity"
                        className="border rounded-md w-full pl-4"
                        {...register('quantity')}
                        required
                    />
                </div>


                <div className="grid grid-cols-2 items-center gap-1">
                    <label htmlFor="price" className="font-semibold text-base mb-0 w-3/5">Preço :</label>
                    <input
                        type="number"
                        id="price"
                        className="border rounded-md w-full pl-4"
                        {...register('price')}
                        required
                    />
                </div>
            </div>

            <DialogFooter>
                <button className="border rounded-lg bg-gray-300 w-2/4 font-semibold" type="submit">Cadastrar</button>
            </DialogFooter>
        </form>
    </DialogContent>
}
