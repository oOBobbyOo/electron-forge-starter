import { FrameCornersIcon, MinusSquareIcon, XSquareIcon } from '@phosphor-icons/react'

export function NavBar() {
  return (
    <nav className="navbar bg-base-100 min-h-2 p-1 shadow-sm sm:min-h-4 sm:p-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-sm sm:text-xl">Electron</a>
      </div>
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost btn-sm sm:btn-md tooltip tooltip-bottom"
          data-tip="minimize"
          onClick={() => window.electronAPI.windowAction('minimize')}
        >
          <MinusSquareIcon
            size={40}
            color="#f1c332"
          />
        </button>
        <button
          className="btn btn-square btn-ghost btn-sm sm:btn-md tooltip tooltip-bottom"
          data-tip="maximize"
          onClick={() => window.electronAPI.windowAction('maximize')}
        >
          <FrameCornersIcon
            size={40}
            color="#59bb57"
          />
        </button>
        <button
          className="btn btn-square btn-ghost btn-sm sm:btn-md tooltip tooltip-bottom"
          data-tip="close"
          onClick={() => window.electronAPI.windowAction('close')}
        >
          <XSquareIcon
            size={40}
            color="#eb6058"
          />
        </button>
      </div>
    </nav>
  )
}
