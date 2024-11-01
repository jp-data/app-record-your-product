import { Card } from "antd";
import { ShoppingCart } from "lucide-react";
import { DialogFooter } from "../../../components/ui/dialog";

export function CartNewSale() {
    return (
        <Card
            title={
                <div className="flex items-center gap-2">
                    <ShoppingCart className="text-xl" />
                </div>
            }
            className="w-full h-full"
        >
            <div className="mb-9">
                <div className="flex w-full justify-between">
                    <p>1 Bola futebol society</p>
                    <p>R$ 89.95</p>
                </div>
                <hr />
            </div>
            <div className="mb-9">
                <div className="flex w-full justify-between">
                    <p>1 Bola futebol society</p>
                    <p>R$ 89.95</p>
                </div>
                <hr />
            </div>

            <div>
                <DialogFooter className="flex-shrink-0">
                    <button className="border rounded-full h-9 bg-cyan-500 w-2/4  text-white font-semibold" type="submit">FECHAR VENDA R$154.9</button>
                </DialogFooter>
            </div>


        </Card>
    )
}