import Link from 'next/link'

type Section = 'home' | 'skills' | 'papers' | 'projects'

const navItems: Array<{ section: Section; href: string; label: string }> = [
  { section: 'home', href: '/', label: 'Home' },
  { section: 'skills', href: '/skills', label: 'Skills' },
  { section: 'papers', href: '/papers', label: 'Papers' },
  { section: 'projects', href: '/projects', label: 'Projects' },
]

export function SiteNav({ active }: { active: Section }) {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-5 md:px-10 md:py-8">
      <Link href="/" className="font-display text-2xl leading-none text-white md:text-3xl">
        AMIT
      </Link>
      <ul className="flex items-center gap-1 font-mono text-[9px] font-black uppercase sm:gap-2 md:gap-5 md:text-[10px]">
        {navItems.map((item) => (
          <li key={item.section}>
            <Link href={item.href} className={`nav-chip ${active === item.section ? 'nav-chip-active' : ''}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
