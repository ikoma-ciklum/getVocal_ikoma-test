import type { Dispatch, SetStateAction } from "react"
import { useCallback, useInsertionEffect, useState } from "react"
import { type TEmptyCallback, emptyCallback } from "@/helpers"

enum EAnimationVariant {
    Appearance,
    Shaking,
    Removal
}

enum EAnimationClassname {
    Appear = "appear",
    AppearActive = "appear-active",
    Shake = "shake",
    ShakeActive = "shake-active",
    Remove = "remove",
    RemoveActive = "remove-active"
}

const animationsMap = {
    [EAnimationVariant.Appearance]: { start: EAnimationClassname.Appear, end: EAnimationClassname.AppearActive },
    [EAnimationVariant.Shaking]: { start: EAnimationClassname.Shake, end: EAnimationClassname.ShakeActive },
    [EAnimationVariant.Removal]: { start: EAnimationClassname.Remove, end: EAnimationClassname.RemoveActive }
}

const animationsCss: string = `
    .${EAnimationClassname.Appear} { opacity: 0; transform: translateY(-10px); }
    .${EAnimationClassname.AppearActive} { opacity: 1; transform: translateY(0); transition: opacity 300ms, transform 300ms; }
    .${EAnimationClassname.Shake} { transition: transform 0.1s ease-in-out; transform: scale(1.025); }
    .${EAnimationClassname.ShakeActive} { transition: transform 0.1s ease-in-out; transform: scale(1); }
    .${EAnimationClassname.Remove} { opacity: 1; transform: translateY(0); }
    .${EAnimationClassname.RemoveActive} { opacity: 0; transform: translateY(10px); transition: opacity 200ms, transform 200ms; }
`

type TTriggerAnimationFunctionParams = { variant: EAnimationVariant; timeout?: number; cb?: TEmptyCallback }
type TTriggerAnimationFunction = ({
    variant,
    timeout = 200,
    cb = emptyCallback
}: TTriggerAnimationFunctionParams) => void

type TUseHook = {
    animationClass: string
    triggerAnimation: TTriggerAnimationFunction
    triggerListItemAddAnimation(onAdd?: TEmptyCallback): TEmptyCallback
    triggerListItemClearAnimation(onClear?: TEmptyCallback): void
    triggerListItemChangeStatus(onChange?: TEmptyCallback): void
}

function useHook(): ReturnType<() => TUseHook> {
    const [animationClass, setAnimationClass]: [EAnimationClassname, Dispatch<SetStateAction<EAnimationClassname>>] =
        useState<EAnimationClassname>(String())

    useInsertionEffect(function (): TEmptyCallback {
        const style = document.createElement("style")
        style.textContent = animationsCss
        document.head.appendChild(style)

        return (): void => document.head.removeChild(style)
    }, [])

    const triggerAnimation: TTriggerAnimationFunction = useCallback(function ({
        variant,
        timeout,
        cb
    }: TTriggerAnimationFunctionParams) {
        setAnimationClass(animationsMap[variant].start)
        setTimeout(function (): void {
            setAnimationClass(animationsMap[variant].end)
            setTimeout((): void => (cb?.(), setAnimationClass(String())), timeout)
        }, 100)
    }, [])

    return { animationClass, triggerAnimation }
}

export {
    useHook as useAnimations,
    type TUseHook as TUseAnimations,
    type TTriggerAnimationFunction,
    EAnimationVariant
}
