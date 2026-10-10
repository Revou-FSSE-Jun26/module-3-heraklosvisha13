export const metadata = {
  title: "RevoShop — Quality Bags for Every Journey",
  description: "Browse our collection of quality bags for every journey.",
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {/* Banner Products Page */}
            <div className="bg-indigo-50 border-b border-indigo-100">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <p className="text-sm text-indigo-700 font-medium">
                        🛍️ Browse our collection — quality bags for every journey
                    </p>
                </div>
            </div>

            {/* Content Page place*/}
            {children}
        </div>
    );
}