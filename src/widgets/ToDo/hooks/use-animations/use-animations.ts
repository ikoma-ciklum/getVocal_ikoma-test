import type { Dispatch, SetStateAction } from "react"
import { useCallback, useState, useInsertionEffect } from "react"
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

const TAILWIND_ANIMATION_ENABLED: boolean = false

const animationsMap = TAILWIND_ANIMATION_ENABLED
    ? {
          [EAnimationVariant.Appearance]: {
              start: "opacity-0 -translate-y-2",
              end: "opacity-100 translate-y-0 transition-opacity transition-transform duration-300"
          },
          [EAnimationVariant.Shaking]: {
              start: "transform scale-105 transition-transform duration-100 ease-in-out",
              end: "transform scale-100 transition-transform duration-100 ease-in-out"
          },
          [EAnimationVariant.Removal]: {
              start: "opacity-100 translate-y-0",
              end: "opacity-0 translate-y-2 transition-opacity transition-transform duration-300"
          }
      }
    : {
          [EAnimationVariant.Appearance]: { start: EAnimationClassname.Appear, end: EAnimationClassname.AppearActive },
          [EAnimationVariant.Shaking]: { start: EAnimationClassname.Shake, end: EAnimationClassname.ShakeActive },
          [EAnimationVariant.Removal]: { start: EAnimationClassname.Remove, end: EAnimationClassname.RemoveActive }
      }

const pureCssAnimations: string = `
    .${EAnimationClassname.Appear} { opacity: 0; transform: translateY(-10px); }
    .${EAnimationClassname.AppearActive} { opacity: 1; transform: translateY(0); transition: opacity 300ms, transform 300ms; }
    .${EAnimationClassname.Shake} { transition: transform 0.1s ease-in-out; transform: scale(1.025); }
    .${EAnimationClassname.ShakeActive} { transition: transform 0.1s ease-in-out; transform: scale(1); }
    .${EAnimationClassname.Remove} { opacity: 1; transform: translateY(0); }
    .${EAnimationClassname.RemoveActive} { opacity: 0; transform: translateY(10px); transition: opacity 300ms, transform 300ms; }
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
        if (TAILWIND_ANIMATION_ENABLED) return emptyCallback()

        const style = document.createElement("style")
        style.textContent = pureCssAnimations
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

export { useHook as useAnimations, type TUseHook as TUseAnimations, type TTriggerAnimationFunction, EAnimationVariant }
