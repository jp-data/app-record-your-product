export function OrderingProducts({ setSortBy, setDirection, sortBy, direction, setisLoadingFilteredProducts }) {
    async function handleChangeSortBy(e) {
        const value = e.target.value
        const sortOptions = {
            quant_asc: { sortBy: 'quantity', direction: 'ASC' },
            quant_desc: { sortBy: 'quantity', direction: 'DESC' },
            price_asc: { sortBy: 'price', direction: 'ASC' },
            price_desc: { sortBy: 'price', direction: 'DESC' },
            selecione: { sortBy: '', direction: '' }
        }

        const selectedOption = sortOptions[value]
        if (selectedOption) {
            setisLoadingFilteredProducts(true)
            setTimeout(() => {
                setSortBy(selectedOption.sortBy);
                setDirection(selectedOption.direction);
                setisLoadingFilteredProducts(false)
            }, 700)
        }
    }

    const getSortInputValue = () => {
        if (sortBy === 'quantity' && direction === 'ASC') return 'quant_asc'
        if (sortBy === 'quantity' && direction === 'DESC') return 'quant_desc'
        if (sortBy === 'price' && direction === 'ASC') return 'price_asc'
        if (sortBy === 'price' && direction === 'DESC') return 'price_desc'
        if (sortBy === '' && direction === '') return 'selecione'
    }

    const sortInputCurrentValue = getSortInputValue()

    return (
        <>
            <div className={`border rounded-md pl-2 pr-2 py-1.5 transition-all 
                ${sortBy === '' ? 'bg-gray-100'
                    : 'bg-cyan-100 font-semibold'}
                `}>
                <label htmlFor="select" className="font-medium">Ordenar por: </label>
                <select className={`border rounded-md transition-all
                    ${sortBy === '' ? 'bg-gray-50' : 'bg-white'}
                `}

                    id="select"
                    value={sortInputCurrentValue}
                    onChange={handleChangeSortBy}
                >
                    <option value="selecione" disabled={sortInputCurrentValue === "selecione"}>
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