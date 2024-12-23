import { tv } from 'tailwind-variants'

const SidebarButton = ({ children, color }) => {
  const sideBar = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        selected: 'bg-brand-primary bg-opacity-15 px-6 py-3 text-brand-primary',
        unselected: 'text-brand-dark-blue',
      },
    },
  })

  return (
    <a href="#" className={sideBar({ color })}>
      {children}
    </a>
  )
}

export default SidebarButton
