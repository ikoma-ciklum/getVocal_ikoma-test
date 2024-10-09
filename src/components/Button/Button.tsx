import { type FC, type ReactElement, type ReactNode } from "react"
import classNames from "classnames"

enum EButtonVariant {
    Danger = 'Danger',
}

const variantsMap: { [K in EButtonVariant]: string } = {
    [EButtonVariant.Danger]: "bg-red-400 focus:outline-red-500"
}

type TProps = {
    variant?: EButtonVariant
    label: string | ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

const Button: FC = ({ variant = EButtonVariant.Danger, label, className, onClick, disabled }: TProps): ReactElement => (
    <button
        onClick={onClick}
        className={classNames("text-white p-2 w-full outline-1 outline outline-black-100 rounded-md font-semibold", {
            "!bg-gray-400 pointer-events-none": disabled,
            [variantsMap[variant]]: variant,
            [className]: className
        })}>
        {label}
    </button>
)

export { Button, EButtonVariant }
