import React, { useEffect, useRef, useState } from 'react'

import useMapContext from '@components/Map/useMapContext'

function SidePanel() {
  const { currentTarget, sidePanel, setSidePanel } = useMapContext()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const panelContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window])

  screenWidth > 660 && sidePanel
    ? panelContainer.current?.style.setProperty('width', '40%')
    : screenWidth < 640 && sidePanel
    ? panelContainer.current?.style.setProperty('width', '100%')
    : panelContainer.current?.style.setProperty('width', '0%')

  const closePanel = () => {
    panelContainer.current?.style.setProperty('width', '0')
    setSidePanel!(false)
  }
  return (
    <>
      <div
        ref={panelContainer}
        className="transition-all duration-500 z-[2000] fixed h-[calc(100%-5rem)] overflow-scroll bg-dark opacity-95 w-0 right-0 bottom-0"
      >
        <div className="flex flex-col justify-between items-center text-white m-8">
          <div className="flex w-full items-end">
            <button onClick={() => closePanel()} className="scale-[2] ml-4 mb-4 h-5">
              &times;
            </button>
          </div>
          <h1 className="text-xl mb-8">{currentTarget?.name_fi}</h1>
          <img className="rounded-md w-60 mb-8" src={currentTarget?.picture_url} alt={currentTarget?.id} />
          <p className="text-lg mb-8">{currentTarget?.desc_fi}</p>
          <p className="text-sm w-full">{currentTarget?.street_address_fi}</p>
        </div>
      </div>
    </>
  )
}

export default SidePanel
