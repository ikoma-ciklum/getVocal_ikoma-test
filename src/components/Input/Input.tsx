import { type FC, type ReactElement, type ChangeEvent, type KeyboardEvent } from "react"
import classNames from "classnames"

type TProps = {
    type?: string
    value?: string
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e?: KeyboardEvent) => void
    onBlur?: () => void
    placeholder?: string
    className?: string
    autoFocus?: boolean
}

const Input: FC = ({
    type = "text",
    value,
    onChange,
    onBlur,
    onKeyDown,
    placeholder,
    className
}: TProps): ReactElement => (
    <input
        type={type}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={classNames(
            "outline outline-0 outline-transparent focus:outline-1 focus:outline-gray-300 focus:outline-1",
            { [className]: className }
        )}
    />
)

export { Input }
