export function DatePicker() {
    return (
        <div className="col-span-3">
            <select defaultValue="Hoje" className="bg-gray-100 border w-4/5 text-base rounded-md mt-2">
                <option value="Today">
                    Hoje
                </option>
                <option value="yesterday">
                    Ontem
                </option>
                <option value="last7days">
                    Últimos 7 dias
                </option>
                <option value="last15days">
                    Últimos 15 dias
                </option>
                <option value="lastMonth">
                    Últimos 30 dias
                </option>
                <option value="last3Months">
                    Últimos 3 meses
                </option>
            </select>
        </div>


    )
}