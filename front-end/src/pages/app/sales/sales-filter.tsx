
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Dialog } from "../../../components/ui/dialog";
import { Flex, Radio } from "@radix-ui/themes";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SalesFilterProps {
    paymentChosen: string
    hasDiscount: string
    setHasDiscount: Dispatch<SetStateAction<string>>
    setPaymentChosen: Dispatch<SetStateAction<string>>
    setIsLoadingFilteredSales: Dispatch<SetStateAction<boolean>>
}

export function SalesFilter({ paymentChosen, hasDiscount, setPaymentChosen, setHasDiscount, setIsLoadingFilteredSales }: SalesFilterProps) {
    async function handleChosenFilterPayment(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        if (value) {
            setIsLoadingFilteredSales(true)
            setPaymentChosen(value)
            setTimeout(() => {
                setIsLoadingFilteredSales(false)
            }, 500)
        }
    }

    async function handleChosenFilterDiscount(e: ChangeEvent<HTMLInputElement>) {
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
                        <div className="w-full font-medium">
                            <button className={`flex items-center justify-between w-full text-right mt-1 rounded-lg p-2
                                ${paymentChosen != '' || hasDiscount != '' ? 'bg-cyan-100'
                                    : ''
                                }    
                                `}
                            >
                                <p className="ml-2">Filtros</p>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg w-52 md:w-64 lg:w-72">
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