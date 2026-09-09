import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BusinessProvider } from '@/context/BusinessContext';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ContactPage } from '@/pages/ContactPage';
import { RequestQuotePage } from '@/pages/RequestQuotePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/**
 * Application router.
 *
 * Add new routes here as the platform grows.
 * All pages are wrapped in MainLayout (Navbar + Footer).
 * BusinessProvider loads the three public endpoints once
 * and makes them available to the entire app.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <BusinessProvider>
        <MainLayout>
          <Routes>
            <Route path="/"              element={<HomePage />}        />
            <Route path="/about"         element={<AboutPage />}       />
            <Route path="/services"      element={<ServicesPage />}    />
            <Route path="/projects"      element={<ProjectsPage />}    />
            <Route path="/contact"       element={<ContactPage />}     />
            <Route path="/request-quote" element={<RequestQuotePage />}/>
            <Route path="*"             element={<NotFoundPage />}    />
          </Routes>
        </MainLayout>
      </BusinessProvider>
    </BrowserRouter>
  );
}
