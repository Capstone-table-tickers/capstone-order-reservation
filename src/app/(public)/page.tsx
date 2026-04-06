import Link from "next/link"; 
 
export default function HomePage() { 
  return ( 
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-16 sm:px
6 lg:px-8"> 
      <div className="max-w-3xl"> 
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text
green-700"> 
          Welcome to Table Tickers 
        </p> 
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"> 
          Fresh farm products and easy reservations in one place 
        </h1> 
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg"> 
          Browse available products, make reservations, and connect with the 
          farm through a clean and reliable digital experience. 
        </p> 
 
        <div className="mt-8 flex flex-wrap gap-4"> 
          <Link 
            href="/products" 
            className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text
white transition hover:bg-green-800" 
          > 
            View Products 
          </Link> 
          <Link 
            href="/reservation" 
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold 
text-gray-900 transition hover:border-green-700 hover:text-green-700" 
          > 
            Make Reservation 
          </Link> 
        </div> 
      </div> 
 
      <div className="grid gap-6 md:grid-cols-3"> 
        <div className="rounded-2xl border border-gray-200 p-6"> 
          <h2 className="text-lg font-semibold text-gray-900"> 
            Farm Fresh Products 
          </h2> 
          <p className="mt-2 text-sm leading-6 text-gray-600"> 
            Explore available products through a clean public catalog. 
          </p> 
        </div> 
 
        <div className="rounded-2xl border border-gray-200 p-6"> 
          <h2 className="text-lg font-semibold text-gray-900"> 
            Simple Reservation Flow 
          </h2> 
          <p className="mt-2 text-sm leading-6 text-gray-600"> 
            Reserve quickly without unnecessary steps or confusion. 
          </p> 
        </div> 
 
        <div className="rounded-2xl border border-gray-200 p-6"> 
          <h2 className="text-lg font-semibold text-gray-900"> 
            Clear Communication 
          </h2> 
          <p className="mt-2 text-sm leading-6 text-gray-600"> 
            Contact details, policies, and product information are easy to find. 
          </p> 
        </div> 
      </div> 
    </section> 
  ); 
}