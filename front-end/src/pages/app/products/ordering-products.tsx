import { useState } from "react"

export function OrderingProducts() {
    const [sortBy, setSortBy] = useState('')

    function handleChangeSortBy(e) {
        const value = e.target.value
        setSortBy(value)
    }

    return (
        <>
            <div className="bg-gray-100 border rounded-md pl-2 pr-2 py-1.5">
                <label htmlFor="select">Ordenar por: </label>
                <select className="border rounded-md" id="select" value={sortBy} onChange={handleChangeSortBy}>
                    <option value="" disabled={sortBy === ""}>
                        Selecione
                    </option>
                    <option value="quant_asc">Quantidade (Menor p/ maior)</option>
                    <option value="quant_desc">Quantidade (Maior p/ menor)</option>
                    <option value="price_asc">Preço (Menor p/ maior)</option>
                    <option value="price_desc">Preço (Maior p/ menor)</option>

                </select>

            </div >
        </>

    )
}