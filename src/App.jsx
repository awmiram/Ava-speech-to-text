import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SideBar from './components/sideBar';
import Header from './components/header';
import BottomNav from './components/bottomNav'; 

const Home = lazy(() => import('./pages/home'));
const Archive = lazy(() => import('./pages/archivePage'));
const NotFound = lazy(() => import('./pages/notFound'));

function App() {
  return (
    <Router>
      <Toaster position="bottom-left" toastOptions={{duration: 3000, style: { fontFamily: 'inherit' }}}/>
        
      <div className="flex h-screen w-full bg-white text-gray-800 ">
        <div className="hidden md:flex h-full">
          <SideBar />
        </div>
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header />
          <div className="flex-1  overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-width:none flex flex-col items-center pb-16 md:pb-0">
            
            <Suspense fallback={
              <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-primaryColor border-t-transparent rounded-full animate-spin"></div>
              </div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

          </div>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
