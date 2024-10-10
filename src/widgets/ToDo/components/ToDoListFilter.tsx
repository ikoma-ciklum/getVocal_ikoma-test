import { type FC, type ReactElement } from "react"
import classNames from "classnames"
import { EToDoListItemStatus } from "../types.ts"
import { filterLabelColorsMap, itemFilterLabelsMap, filterCheckboxClassNamesMap } from "../config.ts"

type TProps = { selectedFilters: EToDoListItemStatus[]; handleFilterChange(f: EToDoListItemStatus): void }

const ListFilter: FC = ({ selectedFilters, handleFilterChange }: TProps): ReactElement => (
    <div className="flex flex-col p-3 rounded-[10px] border-[1px] border-gray-300 border-2 mb-6">
        {Object.keys(EToDoListItemStatus).map(
            (k: EToDoListItemStatus): ReactElement => (
                <label key={`filter-${k}`} className="flex items-center mb-[6px]">
                    <input
                        type="checkbox"
                        className={classNames(
                            "w-4 h-4 outline-transparent outline-1 outline bg-white border-2 border-gray-300 rounded-md focus:ring-1 checked:border-none",
                            { [filterCheckboxClassNamesMap[k]]: k }
                        )}
                        checked={selectedFilters.includes(k)}
                        onChange={() => handleFilterChange(k)}
                    />
                    <span className={classNames("text-sm select-none", { [filterLabelColorsMap[k]]: k })}>
                        &nbsp;{itemFilterLabelsMap[k]}
                    </span>
                </label>
            )
        )}
    </div>
)

export { ListFilter as ToDoListFilter }
