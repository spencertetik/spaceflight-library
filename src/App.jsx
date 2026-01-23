import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { Satellites } from './components/Satellites';
import { Starfield } from './components/Starfield';
import { Menu, X } from 'lucide-react';

function Layout() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <Starfield />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <header style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div className="animate-enter" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 style={{
                  fontSize: isMobile ? '2rem' : '3rem',
                  fontWeight: '400',
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  cursor: 'pointer'
                }}>
                  <span className="text-gradient" style={{ fontWeight: '800' }}>Spaceflight</span> Library
                </h1>
              </Link>

              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem', marginTop: '1rem' }}>
              {!isMobile && (
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.125rem' }}>
                  Live Statistics & Current Metrics
                </p>
              )}

              {/* Desktop Navigation */}
              {!isMobile && (
                <nav style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to="/" style={{
                    color: location.pathname === '/' ? 'white' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: location.pathname === '/' ? '600' : '400',
                    background: location.pathname === '/' ? 'var(--accent-purple)' : 'transparent',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    transition: 'all 0.2s',
                  }}>Dashboard</Link>
                  <Link to="/satellites" style={{
                    color: location.pathname === '/satellites' ? 'white' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: location.pathname === '/satellites' ? '600' : '400',
                    background: location.pathname === '/satellites' ? 'var(--accent-purple)' : 'transparent',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    transition: 'all 0.2s',
                  }}>Satellites</Link>
                  <Link to="/library" style={{
                    color: location.pathname === '/library' ? 'white' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: location.pathname === '/library' ? '600' : '400',
                    background: location.pathname === '/library' ? 'var(--accent-purple)' : 'transparent',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    transition: 'all 0.2s',
                  }}>Vehicle Library</Link>
                </nav>
              )}
            </div>
          </div>

          {!isMobile && (
            <div className="glass-panel animate-enter" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', animationDelay: '100ms' }}>
              <div style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                <span style={{
                  position: 'absolute',
                  display: 'inline-flex',
                  height: '100%',
                  width: '100%',
                  borderRadius: '9999px',
                  background: 'var(--accent-blue)',
                  opacity: 0.75,
                  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}></span>
                <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '8px', width: '8px', background: 'var(--accent-blue)' }}></span>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', fontVariantNumeric: 'tabular-nums' }}>
                {currentTime.toLocaleTimeString()} UTC
              </span>
            </div>
          )}
        </header>

        {/* Mobile Menu Overlay */}
        {isMobile && mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              gap: '2rem',
              height: '100%'
            }}>
              {/* Close button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                flex: 1,
                paddingTop: '2rem'
              }}>
                <Link
                  to="/"
                  style={{
                    color: location.pathname === '/' ? 'white' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '2rem',
                    fontWeight: location.pathname === '/' ? '700' : '400',
                    transition: 'all 0.2s',
                    borderLeft: location.pathname === '/' ? '4px solid var(--accent-blue)' : '4px solid transparent',
                    paddingLeft: '1rem'
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/satellites"
                  style={{
                    color: location.pathname === '/satellites' ? 'white' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '2rem',
                    fontWeight: location.pathname === '/satellites' ? '700' : '400',
                    transition: 'all 0.2s',
                    borderLeft: location.pathname === '/satellites' ? '4px solid var(--accent-blue)' : '4px solid transparent',
                    paddingLeft: '1rem'
                  }}
                >
                  Satellites
                </Link>
                <Link
                  to="/library"
                  style={{
                    color: location.pathname === '/library' ? 'white' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '2rem',
                    fontWeight: location.pathname === '/library' ? '700' : '400',
                    transition: 'all 0.2s',
                    borderLeft: location.pathname === '/library' ? '4px solid var(--accent-blue)' : '4px solid transparent',
                    paddingLeft: '1rem'
                  }}
                >
                  Vehicle Library
                </Link>
              </nav>

              {/* Mobile Time Display */}
              <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <div style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
                  <span style={{
                    position: 'absolute',
                    display: 'inline-flex',
                    height: '100%',
                    width: '100%',
                    borderRadius: '9999px',
                    background: 'var(--accent-blue)',
                    opacity: 0.75,
                    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                  }}></span>
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '8px', width: '8px', background: 'var(--accent-blue)' }}></span>
                </div>
                <span style={{ fontSize: '1rem', fontWeight: '500', fontVariantNumeric: 'tabular-nums' }}>
                  {currentTime.toLocaleTimeString()} UTC
                </span>
              </div>
            </div>
          </div>
        )}

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/satellites" element={<Satellites />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>

        <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', opacity: 0.5 }}>
          <p>© 2026 Spaceflight Library • Data sourced from The Space Devs API</p>
        </footer>

        <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
