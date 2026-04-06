import type { Metadata } from "next"; 
import { Poppins } from "next/font/google"; 
import "./globals.css"; 
import AuthProvider from "@/components/providers/AuthProvider"; 
 
const poppins = Poppins({ 
subsets: ["latin"], 
weight: ["300", "400", "500", "600", "700"], 
variable: "--font-poppins", 
display: "swap", 
}); 
export const metadata: Metadata = { 
title: "Table Tickers", 
description: "Order & Reservation Web App", 
}; 
export default function RootLayout({ 
children, 
}: { 
children: React.ReactNode; 
}) { 
return ( 
<html lang="en" className={poppins.variable}> 
<body className="min-h-screen bg-white text-gray-900 antialiased"> 
<AuthProvider>{children}</AuthProvider> 
</body> 
</html> 
); 
} 