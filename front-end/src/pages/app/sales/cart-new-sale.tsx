import { Card } from "antd";
import { ShoppingCart, Trash2 } from "lucide-react";
import { DialogFooter } from "../../../components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import { Flex, Radio } from 'antd';
import { useMutation } from "@tanstack/react-query";
import { createOrders } from "../../../api-requisitions/create-order";
import { queryClient } from "../../../lib/react-query";
import * as zod from 'zod'


const itensOrderSchema = zod.object({
    product_id: zod.number(),
    quantity: zod.number()
})

const newOrderSchema = zod.object({
    payment: zod.string(),
    items: zod.array(itensOrderSchema)
})

export type RegisterOrderForm = zod.infer<typeof newOrderSchema>

interface CartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartNewSaleProps {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

export function CartNewSale({ cartProducts, setCartProducts }: CartNewSaleProps) {
    const total = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)

    const options = [
        { label: 'Débito', value: 'Débito' },
        { label: 'Crédito', value: 'Crédito' },
        { label: 'Pix', value: 'Pix' },
    ];

    const { mutateAsync: registerOrder } = useMutation({
        mutationFn: createOrders,
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
        }
    })

    async function handleCreateOrder() {
        try {
            const orderData = {
                payment: 'Pix',
                items: cartProducts.map((product) => ({
                    product_id: product.id,
                    quantity: product.quantity
                }))
            }
            const validatedOrder = newOrderSchema.parse(orderData)
            await registerOrder(validatedOrder)
        }
        catch (error) {
            console.log(error)
        }
    }

    function handleIncrement(productID: string) {
        setCartProducts((prevCart) =>
            prevCart.map((product) =>
                product.id === productID
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        )
    }

    function removeProductFromCart(productID: string) {
        setCartProducts((prevCart) =>
            prevCart.filter((product) => product.id !== productID)
        )
    }

    function handleDecrement(productId: string) {
        // Decrementa a quantidade, mas não deixa cair abaixo de 1
        setCartProducts((prevCart) =>
            prevCart.map((product) =>
                product.id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    }

    return (
        <Card
            title={
                <div className="flex items-center gap-2">
                    <ShoppingCart className="text-xl" />
                </div>
            }
            className="w-full h-full"
        >
            {cartProducts.map((product) => (
                <div key={uuidv4()} className="mb-9">
                    <div className="w-full grid grid-cols-6">

                        <div className="flex col-span-4">
                            <p className="mr-3">{product.name}</p>
                            <p>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                product.price * product.quantity
                            )}</p>
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <button
                                className="rounded-full bg-slate-200  w-2/6 h-2/3 flex items-center justify-center"
                                onClick={() => handleDecrement(product.id)}>
                                -
                            </button>
                            <p className="text-center self-center">{product.quantity}</p>
                            <button
                                className="rounded-full bg-slate-200 w-2/6 h-2/3 flex items-center justify-center"
                                onClick={() => handleIncrement(product.id)}>
                                +
                            </button>
                        </div>

                        <div className="flex justify-center self-center">
                            <a onClick={() => removeProductFromCart(product.id)}><Trash2 size={18} /></a>
                        </div>

                    </div>
                    <hr />
                </div>
            ))}
            <div>
                <DialogFooter className="flex-shrink-0">
                    <div className="flex flex-col gap-4 w-full">
                        <Flex vertical gap="middle">
                            <Radio.Group
                                disabled={cartProducts.length === 0}
                                block
                                options={options}
                                defaultValue="Débito"
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Flex>
                        <button
                            className="border rounded-full h-9 bg-cyan-500 w-3/4 self-end  text-white font-semibold"
                            type="submit"
                            onClick={handleCreateOrder}
                        >
                            REGISTRAR VENDA {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                total
                            )}
                        </button>
                    </div>
                </DialogFooter>
            </div>
        </Card>
    )
}