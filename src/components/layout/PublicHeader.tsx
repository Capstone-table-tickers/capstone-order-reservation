import Link from "next/link"; 
import NavLinks from "./NavLinks"; 
import MobileMenu from "./MobileMenu"; 
 
export default function PublicHeader() { 
  return ( 
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur"> 
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 
py-4 sm:px-6 lg:px-8"> 
        <Link href="/" className="flex flex-col"> 
          <span className="text-lg font-semibold tracking-tight text-green-800"> 
            Table Tickers 
          </span> 
          <span className="text-xs text-gray-500"> 
            Farm orders and reservations 
          </span> 
        </Link> 
 
        <NavLinks /> 
        <MobileMenu /> 
      </div> 
    </header> 
  ); 
}