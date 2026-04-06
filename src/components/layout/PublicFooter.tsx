import Link from "next/link"; 
 
export default function PublicFooter() { 
  const year = new Date().getFullYear(); 
 
  return ( 
    <footer className="border-t border-gray-200 bg-gray-50"> 
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 text-sm 
text-gray-600 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between"> 
        <div className="max-w-md"> 
          <h2 className="text-base font-semibold text-gray-900"> 
            Table Tickers 
          </h2> 
          <p className="mt-2 leading-6"> 
            Fresh farm products and simple reservation experiences built for 
            customers who want clarity, speed, and convenience. 
          </p> 
        </div> 
 
        <div className="grid grid-cols-2 gap-3 sm:gap-6"> 
          <div className="flex flex-col gap-2"> 
            <span className="font-semibold text-gray-900">Navigation</span> 
            <Link href="/" className="hover:text-green-700"> 
              Home 
            </Link> 
            <Link href="/about" className="hover:text-green-700"> 
              About 
            </Link> 
            <Link href="/products" className="hover:text-green-700"> 
              Products 
            </Link> 
            <Link href="/reservation" className="hover:text-green-700"> 
              Reservation 
            </Link> 
            <Link href="/contact" className="hover:text-green-700"> 
              Contact 
            </Link> 
          </div> 
 
          <div className="flex flex-col gap-2"> 
            <span className="font-semibold text-gray-900">Policies</span> 
            <Link href="/policies/privacy" className="hover:text-green-700"> 
              Privacy Policy 
            </Link> 
            <Link href="/policies/booking" className="hover:text-green-700"> 
              Booking Policy 
            </Link> 
            <Link href="/policies/delivery-pickup" className="hover:text-green-700"> 
              Delivery & Pickup 
            </Link> 
          </div> 
        </div> 
      </div> 
 
<div className="border-t border-gray-200 px-4 py-4 text-center text-xs text-gray-500 
sm:px-6 lg:px-8"> 
© {year} Table Tickers. All rights reserved. 
</div> 
</footer> 
); 
}