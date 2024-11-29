export function DataSelector({ setPeriod }) {
    async function handleChosenFilterDay(e) {
        const value = e.target.value
        setPeriod(value)
    }


    return (
        <div className="font-medium">
            <select defaultValue="últimos 3 dias" onChange={handleChosenFilterDay} className="bg-gray-100 border w-4/5 text-base rounded-md mt-2">
                <option value="3">
                    Últimos 3 dias
                </option>
                <option value="5">
                    Últimos 5 dias
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
    );
}
