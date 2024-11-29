
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Dialog } from "../../../components/ui/dialog";
import { Flex, Radio } from "@radix-ui/themes";

export function SalesFilter({ paymentChosen, hasDiscount, setPaymentChosen, setHasDiscount, setIsLoadingFilteredSales }) {
    async function handleChosenFilterPayment(e) {
        const value = e.target.value
        if (value) {
            setIsLoadingFilteredSales(true)
            setPaymentChosen(value)
            setTimeout(() => {
                setIsLoadingFilteredSales(false)
            }, 500)
        }

    }

    async function handleChosenFilterDiscount(e) {
        const value = e.target.value
        if (value) {
            setIsLoadingFilteredSales(true)
            setHasDiscount(value)
            setTimeout(() => {
                setIsLoadingFilteredSales(false)
            }, 500)
        }

    }
    return (
        <div className="flex col-span-2">
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-2/3 font-medium">
                            <button className={`flex w-full text-right mt-1 rounded-lg
                                ${paymentChosen != '' || hasDiscount != '' ? 'bg-cyan-100'
                                    : ''
                                }    
                                `}
                            >
                                <p className="ml-2">Filtros</p>
                                <ChevronDown />
                            </button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute bg-white shadow-lg w-52">
                        <DropdownMenuLabel>
                            <span>Pagamento</span>
                        </DropdownMenuLabel>
                        <Flex align="start" direction="column" onChange={handleChosenFilterPayment} gap="1" className="flex flex-col">
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="Todos" checked={paymentChosen === "Todos"} className="mr-1" />
                                    Todos
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="Débito" checked={paymentChosen === "Débito"} className="mr-1" />
                                    Débito
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="Crédito" checked={paymentChosen === "Crédito"} className="mr-1" />
                                    Crédito
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="Pix" checked={paymentChosen === "Pix"} className="mr-1" />
                                    Pix
                                </span>
                            </Flex>
                        </Flex>
                        <DropdownMenuSeparator className="bg-gray-400" />
                        <DropdownMenuLabel>
                            <span>Desconto</span>
                        </DropdownMenuLabel>
                        <Flex align="start" direction="column" onChange={handleChosenFilterDiscount} gap="1" className="flex flex-col">
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="discount" value="Todos" checked={hasDiscount === "Todos"} className="mr-1" />
                                    Todos
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="discount" value="true" checked={hasDiscount === "true"} className="mr-1" />
                                    Com desconto
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="discount" value="false" checked={hasDiscount === "false"} className="mr-1" />
                                    Sem desconto
                                </span>
                            </Flex>
                        </Flex>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>
        </div>
    )

}