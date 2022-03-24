import { Fragment, useRef, useState, useEffect } from "react"
import { Popover, Transition } from "@headlessui/react"
import config from '../../utils/config'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ButtonPopover({
  menuTitle = "Core",
  linksArray = [
    
    [`Ther multiplier represents the proportion of Token rewards each farm receives, as a proportion of the Token produced each block.
    For example, if a 1x farm received 1 LOLLI per block, a 40x farm would receive 40 LOLLI per block.
    This amount is already included in all APR calculations for the farm. `, ],

  ]
}) {
  let timeout 
  const timeoutDuration = 500


  const buttonRef = useRef(null) 
  const [openState, setOpenState] = useState(false)

  const toggleMenu = (open) => {
    
    setOpenState((openState) => !openState)
   
    buttonRef?.current?.click() // eslint-disable-line
  }

    const onHover = (open, action) => {
  
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      
      clearTimeout(timeout)
      
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
    }
    
  }

  const handleClick = (open) => {
    setOpenState(!open) 
    clearTimeout(timeout) 
  }

  const LINK_STYLES = classNames(
   "text-white  items-center justify-center" 
 
  )
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation()
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })
  return (
    <a href={config.AUDIT_URL} target="_blank" rel="noreferrer">
      <div
      className={classNames(
        "inline-flex items-center px-4 py-2 rounded-full  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 mr-2"
      )}
 style={{
                  background: "linear-gradient(#002a1a -10%,#165413)",
                }}
    >
 <svg class="w-6 h-6 text-[#76fa00]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      <Popover className="z-20">
        {({ open }) => (
          <div
            onMouseEnter={() => onHover(open, "onMouseEnter")}
            onMouseLeave={() => onHover(open, "onMouseLeave")}
            className="flex flex-col"
          >
            <Popover.Button ref={buttonRef}>
              <div
                className={classNames( "font-pocket text-2xl",
                  open ? "text-white" : "text-white",
                  
                  
                  "flex justify-center",
                  LINK_STYLES
                )}
                onClick={() => handleClick(open)}
              >
                
                  {menuTitle}
           
                                 
              </div>
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static className="z-10 absolute right-[90px]">
                <div
                  className={classNames(
                   
                    "self-start px-6 py-6 text-white text-md  bg-[#2f2e2e]  rounded-lg",
                 
                  )}
                >
                  {linksArray.map(([title, href]) => (
                    <Fragment key={"PopoverPanel<>" + title + href}>
                      <a href={href} >
                        Ther multiplier represents the proportion of Token rewards each farm receives, as a proportion of the Token produced each block. <br/> <br/>
    For example, if a 1x farm received 1 $MAT per block, a 40x farm would receive 40 $MAT per block. <br/> <br/>
    This amount is already included in all APR calculations for the farm.                      </a>
                    </Fragment>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
      </div>
    </a>
  )
}
