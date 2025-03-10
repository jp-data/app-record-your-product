import { ShoppingCart, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { Flex, Radio, RadioChangeEvent } from 'antd';
import { useMutation } from "@tanstack/react-query";
import { createOrders } from "../../../api-requisitions/create-order";
import { queryClient } from "../../../lib/react-query";
import * as zod from 'zod'
import { Dispatch, SetStateAction, useState } from "react";
import { FormDiscount } from "./form-discount";
import { TableProductsDataType } from "../products/table-products";
import { updateProducts } from "../../../api-requisitions/update-products";


const itensOrderSchema = zod.object({
    product_id: zod.number(),
    quantity: zod.number()
})

const newOrderSchema = zod.object({
    payment: zod.string(),
    discount: zod.number().default(0),
    items: zod.array(itensOrderSchema)
})

export type RegisterOrderForm = zod.infer<typeof newOrderSchema>

interface CartNewSaleProps {
    cartProducts: TableProductsDataType[];
    setCartProducts: Dispatch<SetStateAction<TableProductsDataType[]>>;
    onClose: () => void;
}

export function CartNewSale({ cartProducts, setCartProducts, onClose }: CartNewSaleProps) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [paymentChosen, setPaymentChosen] = useState('')
    const [discount, setDiscount] = useState<number>(0)
    const total: number = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
    const subtotal = total - discount;

    const options = [
        { label: 'Débito', value: 'Débito' },
        { label: 'Crédito', value: 'Crédito' },
        { label: 'Pix', value: 'Pix' },
    ];

    const { mutateAsync: registerOrder } = useMutation({
        mutationFn: createOrders,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        }
    })

    async function handleCreateOrder() {
        try {
            const orderData = {
                payment: paymentChosen,
                discount: discount || 0,
                items: cartProducts.map((product) => ({
                    product_id: product.id,
                    quantity: product.quantity
                }))
            }

            const validatedOrder = newOrderSchema.parse(orderData)
            await registerOrder(validatedOrder)

            for (const product of cartProducts) {
                const newQuantity = product.quantityAvailable ? product.quantityAvailable - product.quantity : product.quantity;
                await updateProducts(product.id, { quantity: newQuantity });
            }

            setCartProducts([])
            setPaymentChosen('')
            setDiscount(0)
            onClose()

            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
        catch (error) {
            console.error('Erro inesperado: ', error)
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
        setCartProducts((prevCart) =>
            prevCart.map((product) =>
                product.id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    }

    function handlePaymentInputChange(e: RadioChangeEvent) {
        const { value } = e.target
        setPaymentChosen(value)
    }

    return (
        <>
            <div className="h-full flex flex-col w-full rounded-l-xl bg-white">
                <div className="h-min row-span-1 ml-2 mt-2 hidden md:block">
                    <ShoppingCart />
                </div>
                <div className="h-full mt-6 ml-4 mr-4 max-h-98 overflow-y-auto scrollbar-hide">
                    {cartProducts.map((product) => (
                        <div key={uuidv4()} className="mb-8">
                            <div className="w-full grid grid-cols-6 font-semibold">

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
                    <div className="flex flex-col gap-4 w-full">
                        <Flex vertical gap="middle">
                            <Radio.Group
                                disabled={cartProducts.length === 0}
                                block
                                options={options}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={handlePaymentInputChange}
                                className="font-semibold"
                            />
                        </Flex>
                        {!paymentChosen && (
                            <p className="text-blue-600 text-sm ml-1 font-semibold">Selecione um método de pagamento(obrigatório)</p>
                        )}
                    </div>
                </div>

                <div className="flex h-2/6 flex-col mr-4 items-end justify-center">
                    <div className="flex justify-end items-end w-2/3 h-2/3">
                        {discount > 0 ? (
                            <div className="flex flex-col">
                                <p className="font-semibold text-base">Subtotal: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)}</p>
                                <p className="text-red-500 mr-5 font-semibold text-base">Desconto: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(discount)}</p>
                            </div>
                        ) : (
                            <button
                                className="h-8 text-lg w-full  bg-slate-200 hover:bg-slate-400 rounded-full font-semibold disabled:text-gray-500 disabled:cursor-not-allowed"
                                onClick={() => setIsDialogOpen(true)}
                                disabled={cartProducts.length === 0}
                            >
                                Aplicar desconto
                            </button>
                        )}

                        <FormDiscount
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            total={total}
                            setDiscount={setDiscount}
                        />
                    </div>
                    <div className="h-1/3 w-full mt-5 flex justify-end">
                        <button
                            className="border disabled:bg-cyan-300 hover:bg-cyan-600 disabled:cursor-not-allowed focus:outline-none rounded-full h-9 text-xl bg-cyan-500 w-[90%] self-end  text-white font-semibold"
                            type="submit"
                            onClick={handleCreateOrder}
                            disabled={cartProducts.length === 0 || !paymentChosen}
                        >
                            Registrar venda {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                                subtotal
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}