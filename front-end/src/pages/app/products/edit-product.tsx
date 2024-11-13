import { DialogTitle, DialogDescription, Dialog } from "@radix-ui/react-dialog";
import { DataType } from "./table-products";
import { DialogContent, DialogHeader, DialogFooter } from "../../../components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/react-query";
import { updateProducts } from "../../../api-requisitions/update-products";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface EditProductsProps {
    product: DataType | null;
    setEditProduct: (product: DataType | null) => void
}

export function EditProduct({ product, setEditProduct }: EditProductsProps) {
    const [priceInput, setPriceInput] = useState("");
    const { register, handleSubmit, setValue } = useForm<Omit<DataType, 'id'>>();

    const { mutateAsync: editProduct } = useMutation({
        mutationFn: ({ id, ...data }: { id: string } & Omit<DataType, 'id'>) => updateProducts(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    });

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("category", product.category);
            setValue("quantity", product.quantity);
            setPriceInput(new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(product.price));
        }
    }, [product, setValue]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        }).format(parseFloat(value) / 100);
        setPriceInput(formattedValue);
    };

    async function handleSaveEdit(data: Omit<DataType, 'id'> & { price: string }) {
        if (product) {
            try {
                await editProduct({ id: product.id, ...data, price: parseFloat(priceInput.replace(/\D/g, "")) / 100 });
                setEditProduct(null)
            } catch (error) {
                console.error("Erro ao editar produto:", error);
            }
        }
    }

    return (
        <Dialog open={!!product} onOpenChange={() => setEditProduct(null)}>
            <DialogContent size="small">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Editar produto</DialogTitle>
                    <DialogDescription>Atualize as informações do produto</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSaveEdit)}>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-1">
                            <label htmlFor="name" className="font-semibold text-base mb-0 w-3/5">Nome do produto:</label>
                            <input type="text" id="name" className="border rounded-md w-full pl-4" {...register('name')} required />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-1">
                            <label htmlFor="description" className="font-semibold text-base mb-0 w-3/5">Descrição :</label>
                            <input type="text" id="description" className="border rounded-md w-full pl-4" {...register('description')} required />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-1">
                            <label htmlFor="category" className="font-semibold text-base mb-0 w-3/5">Categoria :</label>
                            <input type="text" id="category" className="border rounded-md w-full pl-4" {...register('category')} required />
                        </div>

                        <div className="grid grid-cols-2 items-center gap-1">
                            <label htmlFor="quantity" className="font-semibold text-base mb-0 w-3/5">Quantidade :</label>
                            <input type="number" id="quantity" className="border rounded-md w-full pl-4" {...register('quantity')} required />
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
                        <button className="border rounded-lg bg-gray-300 w-2/4 font-semibold" type="submit">Salvar</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
