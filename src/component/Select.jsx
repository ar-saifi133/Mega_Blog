import React from 'react'
import { useId } from 'react'

const Select = ({
                option,
                label,
                className,
                ...props
},ref) => {
    const id= useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select {...props} className={`${className}`} ref={ref} id={id}> 
        {option?.map((option)=>( <option key= {option} value={option}>{option}</option> ))}
        </select>

    </div>
  )
}

export default React.forwardRef( Select)