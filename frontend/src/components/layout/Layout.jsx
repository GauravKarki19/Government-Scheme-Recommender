import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  console.log('Layout component rendered');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {isHomePage ? (
        <div className="relative">
          {/* Shared background for header and hero section on homepage */}
          <div className="fixed inset-0 bg-cover bg-center z-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(/images/Layoutimage.jpg)',
            backgroundPosition: 'center 60%',
            backgroundAttachment: 'fixed',
            height: '100vh'
          }}></div>
          
          {/* Header with transparent background */}
          <div className="relative z-50">
            <Header transparent={true} />
          </div>
          
          {/* Main content without container for hero section */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      ) : (
        <>
          <Header transparent={false} />
          <main className="flex-grow py-6 sm:py-8 md:py-12">
            <div className="container-custom">
              {children}
            </div>
          </main>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Layout;