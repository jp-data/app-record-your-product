
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Dialog } from "../../../components/ui/dialog";
import { Flex, Radio } from "@radix-ui/themes";

export function SalesFilter() {
    return (
        <div className="flex">
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-full">
                            <button className="flex w-full mt-1">
                                Filtros
                                <ChevronDown />
                            </button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute bg-white shadow-lg w-52">
                        <DropdownMenuLabel>
                            <span>Pagamento</span>
                        </DropdownMenuLabel>
                        <Flex align="start" direction="column" gap="1" className="flex flex-col">
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="1" defaultChecked className="mr-1" />
                                    Todos
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="1" className="mr-1" />
                                    Débito
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="1" className="mr-1" />
                                    Crédito
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="payment" value="1" className="mr-1" />
                                    Pix
                                </span>
                            </Flex>
                        </Flex>
                        <DropdownMenuSeparator className="bg-gray-400" />
                        <DropdownMenuLabel>
                            <span>Desconto</span>
                        </DropdownMenuLabel>
                        <Flex align="start" direction="column" gap="1" className="flex flex-col">
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="discount" value="1" defaultChecked className="mr-1" />
                                    Todos
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="discount" value="1" className="mr-1" />
                                    Com desconto
                                </span>
                            </Flex>
                            <Flex asChild gap="2">
                                <span>
                                    <Radio name="discount" value="1" className="mr-1" />
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