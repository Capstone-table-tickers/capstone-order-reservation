"use client"; 
 
import { useEffect, useState } from "react"; 
import NavLinks from "./NavLinks"; 
 
export default function MobileMenu() { 
  const [isOpen, setIsOpen] = useState(false); 
 
  useEffect(() => { 
    if (!isOpen) return; 
 
    const handleEscape = (event: KeyboardEvent) => { 
      if (event.key === "Escape") setIsOpen(false); 
    }; 
 
    window.addEventListener("keydown", handleEscape); 
    return () => window.removeEventListener("keydown", handleEscape); 
  }, [isOpen]); 
 
  return ( 
    <div className="md:hidden"> 
      <button 
        type="button" 
        onClick={() => setIsOpen((prev) => !prev)} 
        className="inline-flex items-center justify-center rounded-lg border border-gray
200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50" 
        aria-expanded={isOpen} 
        aria-controls="mobile-menu" 
        aria-label="Toggle navigation menu" 
      > 
        {isOpen ? "Close" : "Menu"} 
      </button> 
 
      {isOpen ? ( 
        <div 
          id="mobile-menu" 
          className="mt-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm" 
        > 
          <NavLinks mobile onNavigate={() => setIsOpen(false)} /> 
        </div> 
      ) : null} 
    </div> 
  ); 
}