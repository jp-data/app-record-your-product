export function DatePicker({ day, setDay }) {
    async function handleChosenFilterDay(e) {
        const value = e.target.value
        setDay(value)
    }

    return (
        <div className="col-span-3 font-medium">
            <select defaultValue="Hoje" onChange={handleChosenFilterDay} className="bg-gray-100 border w-4/5 text-base rounded-md mt-2">
                <option value="0">
                    Hoje
                </option>
                <option value="1">
                    Ontem
                </option>
                <option value="7">
                    Últimos 7 dias
                </option>
                <option value="15">
                    Últimos 15 dias
                </option>
                <option value="30">
                    Últimos 30 dias
                </option>
                <option value="90">
                    Últimos 3 meses
                </option>
            </select>
        </div>


    )
}