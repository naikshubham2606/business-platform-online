import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Main site layout wrapper.
 * Applies the sticky navbar and footer around page content.
 * The padding-top offsets the fixed navbar height.
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="flex-1"
        style={{ paddingTop: 'var(--navbar-height)' }}
        id="main-content"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
