import {type FC, type ReactElement, useEffect} from "react"
import isEmpty from "lodash/isEmpty"
import classNames from "classnames"
import { useTodoStore, type ITodoListStore } from "@/store"
import { EToDoListItemStatus } from "../types.ts"
import { filterLabelColorsMap, itemFilterLabelsMap, filterCheckboxClassNamesMap } from "../config.ts"
import { useAnimations, type TUseAnimations, EAnimationVariant } from "../hooks"

type TProps = {
    animationClass: string
    selectedFilters: EToDoListItemStatus[]
    handleFilterChange(f: EToDoListItemStatus): void
}

const ListFilter: FC = ({  selectedFilters, handleFilterChange }: TProps): ReactElement => {
    const { todoList }: ITodoListStore = useTodoStore()

    const {animationClass, triggerAnimation}: TUseAnimations = useAnimations()

    useEffect(function () {
        return function ()  {
            isEmpty(todoList) && triggerAnimation({variant: EAnimationVariant.Appearance, timeout: 200})
        }
    }, [todoList])

    return (
        <div
            className={classNames("flex flex-col p-3 rounded-[10px] border-[1px] border-gray-300 border-2 mb-6", {
                hidden: isEmpty(todoList),
                [animationClass]: animationClass
            })}>
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
}
export { ListFilter as ToDoListFilter }
