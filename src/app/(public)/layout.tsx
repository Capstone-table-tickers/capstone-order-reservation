import PublicLayout from "@/components/layout/PublicLayout"; 
export default function MarketingLayout({ 
children, 
}: { 
children: React.ReactNode; 
}) { 
return <PublicLayout>{children}</PublicLayout>; 
}