"use client"; 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { publicNavItems } from "./site-nav"; 
type NavLinksProps = { 
onNavigate?: () => void; 
mobile?: boolean; 
}; 
function isActivePath(pathname: string, href: string) { 
if (href === "/") return pathname === "/"; 
return pathname === href || pathname.startsWith(`${href}/`); 
} 
export default function NavLinks({ 
onNavigate, 
mobile = false, 
}: NavLinksProps) { 
const pathname = usePathname(); 
return ( 
<nav 
      className={ 
        mobile 
          ? "flex flex-col gap-2" 
          : "hidden items-center gap-2 md:flex" 
      } 
      aria-label="Primary navigation" 
    > 
      {publicNavItems.map((item) => { 
        const isActive = isActivePath(pathname, item.href); 
 
        return ( 
          <Link 
            key={item.href} 
            href={item.href} 
            onClick={onNavigate} 
            className={[ 
              "rounded-full px-4 py-2 text-sm font-medium transition", 
              isActive 
                ? "bg-green-700 text-white" 
                : "text-gray-700 hover:bg-green-50 hover:text-green-700", 
              mobile ? "w-full" : "", 
            ].join(" ")} 
            aria-current={isActive ? "page" : undefined} 
          > 
            {item.label} 
          </Link> 
        ); 
      })} 
    </nav> 
  ); 
}