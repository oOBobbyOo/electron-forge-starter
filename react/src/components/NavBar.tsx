import { FrameCornersIcon, MinusSquareIcon, XSquareIcon } from '@phosphor-icons/react'

export function NavBar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Electron</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <MinusSquareIcon
            size={40}
            color="#f1c332"
          />
        </button>
        <button className="btn btn-square btn-ghost">
          <FrameCornersIcon
            size={40}
            color="#59bb57"
          />
        </button>
        <button className="btn btn-square btn-ghost">
          <XSquareIcon
            size={40}
            color="#eb6058"
          />
        </button>
      </div>
    </nav>
  )
}
