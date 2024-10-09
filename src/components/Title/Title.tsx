import {FC, ReactElement} from "react";
import classNames from "classnames";

const Title: FC = ({text, className}: {text: string, className?: string}): ReactElement => <h1 className={classNames('mb-4 text-2xl font-bold text-gray-700',{[className]: className})}>{text}</h1>

export {Title}