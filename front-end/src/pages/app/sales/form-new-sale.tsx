import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { CartNewSale } from "./cart-new-sale";
import { TableProductsForSale } from "./table-products-for-sale";
import { TableProductsDataType } from "../products/table-products";

export function FormNewSale({ onClose }: { onClose: () => void }) {
    const [cartProducts, setCartProducts] = useState<TableProductsDataType[]>([])

    function handleAddProductToCart(product: TableProductsDataType) {
        setCartProducts((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id)
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: (p.quantity || 1) + 1 }
                        : p
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    return <DialogContent size="large" className="flex flex-col h-4/5">
        <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-2xl font-semibold">Produtos</DialogTitle>
        </DialogHeader>

        <div className="flex-grow py-4 flex gap-4 w-full h-4/5">
            <div className="w-2/4 overflow-y-auto">
                <TableProductsForSale onAddToCart={handleAddProductToCart} />
            </div>
            <div className="w-1/3 ml-auto">
                <CartNewSale
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                    onClose={onClose}
                />
            </div>
        </div>
    </DialogContent>
}