import classNames from "classnames"
import { useRef, useEffect, useState } from "react"
import { InputCheckboxComponent } from "./types"



export const InputCheckbox: InputCheckboxComponent = ({ id, checked: initialChecked = false, disabled, onChange }) => {
 const { current: inputId } = useRef(`RampInputCheckbox-${id}`);


  const [checked, setChecked] = useState(() => {
    const storedValue = localStorage.getItem(inputId)
    return storedValue !== null ? JSON.parse(storedValue) : initialChecked 
  })

  useEffect(() => {
    localStorage.setItem(inputId, JSON.stringify(checked))
  }, [inputId, checked])


  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        htmlFor={inputId}
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
      />
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={() => {
          setChecked((prevChecked: boolean) => !prevChecked)
          onChange(!checked)
        }}
      />
    </div>
  )
}
