import { type FC, type ReactElement } from "react"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"

enum EMessageVariant {
    Danger = 'Danger'
}

const variantsMap: { [K in EMessageVariant]: string } = {
    [EMessageVariant.Danger]: "text-red-400 bg-red-100 border-1 rounded-md"
}

const Message: FC = ({
    message = String(),
    variant = EMessageVariant.Danger
}: {
    message?: string
    variant?: EMessageVariant
}): ReactElement => (
    <p
        className={classNames("text-sm w-fit mt-1 p-1", {
            hidden: isEmpty(message),
            [variantsMap[variant]]: variant
        })}>
        {message}
    </p>
)

export { Message, EMessageVariant }
