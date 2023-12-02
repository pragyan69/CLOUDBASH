// components/Layout.tsx
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import StakeInfo from './StakeInfo'; // Import StakeInfo

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
                <Header />
                <StakeInfo userAddress="0xf7eD5AEd83921E1e1e19adb506954bE031D0E4b3" /> 
                <div className="py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
