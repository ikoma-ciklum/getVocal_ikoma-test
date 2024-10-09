import { type FC, type ReactElement } from "react"
import { EToDoListItemStatus } from "../types.ts"
import { itemFilterLabelsMap } from "../config.ts"

type TProps = { selectedFilters: EToDoListItemStatus[]; handleFilterChange(f: EToDoListItemStatus): void }

const ListFilter: FC = ({ selectedFilters, handleFilterChange }: TProps): ReactElement => (
    <div className="flex flex-col p-3 rounded-[10px] border-[1px] border-gray-300 border-2 mb-6">
        {Object.keys(EToDoListItemStatus).map(
            (k: EToDoListItemStatus): ReactElement => (
                <label key={`filter-${k}`} className="flex items-center mb-[6px]">
                    <input
                        type="checkbox"
                        className="w-4 h-4 outline-teal-200 outline-1 outline text-teal-600 bg-white border-2 border-gray-300 rounded-md focus:ring-teal-500 focus:ring-1 checked:bg-teal-500 checked:border-none"
                        checked={selectedFilters.includes(k)}
                        onChange={() => handleFilterChange(k)}
                    />
                    <span className="text-teal-500 text-sm select-none">&nbsp;{itemFilterLabelsMap[k]}</span>
                </label>
            )
        )}
    </div>
)

export { ListFilter as ToDoListFilter }
