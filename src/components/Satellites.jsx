import React, { useState } from 'react';
import { Satellite, Search, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { notableSatellites } from '../satellites';

function SatelliteModal({ isOpen, onClose, satellite }) {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isOpen || !satellite) return null;

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0.5rem' : '2rem',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.2s ease-out'
        }} onClick={onClose}>
            <div style={{
                background: '#171717',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '1200px',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
                position: 'relative',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClose();
                    }}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s',
                        zIndex: 50,
                        backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >
                    <X size={24} />
                </button>

                {/* Scrollable Content */}
                <div style={{ overflowY: 'auto', flex: 1, width: '100%' }}>
                    {/* Header */}
                    <div style={{
                        padding: isMobile ? '1.5rem' : '3rem',
                        background: 'linear-gradient(to bottom, #262626, #171717)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{
                                fontSize: '0.75rem',
                                color: 'var(--accent-blue)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: '700',
                                background: 'rgba(99, 102, 241, 0.15)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '99px'
                            }}>{satellite.type}</span>
                            {satellite.status && (
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: satellite.status === 'Operational' ? '#10b981' : '#94a3b8',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontWeight: '600',
                                    border: `1px solid ${satellite.status === 'Operational' ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '99px'
                                }}>{satellite.status}</span>
                            )}
                        </div>
                        <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: '800', margin: '0 0 0.5rem 0', lineHeight: 1 }}>{satellite.name}</h2>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.25rem', color: 'var(--text-secondary)', margin: 0 }}>{satellite.operator}</p>
                    </div>

                    {/* Content */}
                    <div style={{ padding: isMobile ? '1.5rem' : '3rem' }}>
                        <p style={{ lineHeight: '1.7', color: '#cbd5e1', fontSize: isMobile ? '1rem' : '1.125rem', marginBottom: isMobile ? '2rem' : '3rem' }}>
                            {satellite.description}
                        </p>

                        {/* Specs Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: isMobile ? '1.25rem' : '2rem',
                            padding: isMobile ? '1.5rem' : '2rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            marginBottom: isMobile ? '2rem' : '3rem'
                        }}>
                            {Object.entries(satellite).map(([key, value]) => {
                                if (['id', 'name', 'type', 'operator', 'description', 'status', 'achievements'].includes(key)) return null;
                                return (
                                    <div key={key}>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase',
                                            color: 'var(--text-secondary)',
                                            marginBottom: '0.5rem',
                                            letterSpacing: '0.05em',
                                            fontWeight: '600'
                                        }}>
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '500', color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>
                                            {value}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Achievements */}
                        {satellite.achievements && satellite.achievements.length > 0 && (
                            <div>
                                <h3 style={{
                                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                                    fontWeight: '700',
                                    marginBottom: isMobile ? '1rem' : '1.5rem',
                                    background: 'var(--accent-gradient)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Key Achievements</h3>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'grid',
                                    gap: isMobile ? '0.75rem' : '1rem'
                                }}>
                                    {satellite.achievements.map((achievement, index) => (
                                        <li key={index} style={{
                                            padding: isMobile ? '0.875rem 1rem' : '1rem 1.5rem',
                                            background: 'rgba(99, 102, 241, 0.05)',
                                            border: '1px solid rgba(99, 102, 241, 0.2)',
                                            borderRadius: '12px',
                                            color: '#e2e8f0',
                                            fontSize: isMobile ? '0.9375rem' : '1rem',
                                            position: 'relative',
                                            paddingLeft: isMobile ? '2.5rem' : '3rem'
                                        }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: isMobile ? '1rem' : '1.25rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'var(--accent-blue)'
                                            }}></span>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export function Satellites() {
    const [selectedSatellite, setSelectedSatellite] = useState(null);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    // Get unique types
    const types = ['All', ...new Set(notableSatellites.map(s => s.type))];

    // Filter satellites
    const filteredSatellites = notableSatellites.filter(satellite => {
        const matchesSearch = satellite.name.toLowerCase().includes(search.toLowerCase()) ||
            satellite.operator.toLowerCase().includes(search.toLowerCase()) ||
            satellite.description.toLowerCase().includes(search.toLowerCase());

        if (typeFilter === 'All') return matchesSearch;
        return satellite.type === typeFilter && matchesSearch;
    });

    return (
        <div className="animate-enter">
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Satellite size={32} className="text-gradient" />
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>Notable Satellites</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' }}>
                    Explore some of the most important and influential satellites in orbit and beyond
                </p>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Search Input */}
                    <div className="glass-panel" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '12px'
                    }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search satellites..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '1rem',
                                width: '100%',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    {/* Type Filters */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {types.map(type => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                style={{
                                    background: typeFilter === type ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${typeFilter === type ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '99px',
                                    color: typeFilter === type ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
                minHeight: '50vh'
            }}>
                {filteredSatellites.length > 0 ? (
                    filteredSatellites.map((satellite, index) => (
                        <div
                            key={satellite.id}
                            onClick={() => setSelectedSatellite(satellite)}
                            className="glass-panel"
                            style={{
                                cursor: 'pointer',
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: `fadeIn 0.5s ease-out ${Math.min(index * 50, 500)}ms backwards`,
                                position: 'relative',
                                border: '1px solid rgba(255,255,255,0.05)',
                                padding: '2rem'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0,0,0,0.4)';
                                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            <div style={{ minWidth: 0, overflow: 'hidden' }}>
                            {/* Header */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{
                                        fontSize: '0.65rem',
                                        color: 'var(--accent-blue)',
                                        textTransform: 'uppercase',
                                        fontWeight: '700',
                                        letterSpacing: '0.05em',
                                        background: 'rgba(99, 102, 241, 0.15)',
                                        padding: '0.25rem 0.625rem',
                                        borderRadius: '4px'
                                    }}>
                                        {satellite.type}
                                    </span>
                                    {satellite.status && (
                                        <span style={{
                                            fontSize: '0.65rem',
                                            color: satellite.status === 'Operational' ? '#10b981' : '#94a3b8',
                                            textTransform: 'uppercase',
                                            fontWeight: '600',
                                            background: satellite.status === 'Operational' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                            padding: '0.25rem 0.625rem',
                                            borderRadius: '4px'
                                        }}>
                                            {satellite.status}
                                        </span>
                                    )}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    margin: '0 0 0.5rem 0',
                                    color: 'white',
                                    lineHeight: '1.2',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                }}>
                                    {satellite.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    margin: 0,
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                }}>
                                    {satellite.operator}
                                </p>
                            </div>

                            {/* Description */}
                            <p style={{
                                fontSize: '0.9375rem',
                                color: '#cbd5e1',
                                lineHeight: '1.6',
                                margin: '0 0 1.5rem 0',
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {satellite.description}
                            </p>

                            {/* Quick Stats */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                {satellite.launchDate && (
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>
                                            Launched
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: '500', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {satellite.launchDate}
                                        </div>
                                    </div>
                                )}
                                {satellite.orbit && (
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>
                                            Orbit
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: '500', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {satellite.orbit}
                                        </div>
                                    </div>
                                )}
                                {satellite.firstLaunch && (
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>
                                            First Launch
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: '500', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {satellite.firstLaunch}
                                        </div>
                                    </div>
                                )}
                                {satellite.satellites && (
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.25rem' }}>
                                            Satellites
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: '500', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {satellite.satellites}
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p style={{ fontSize: '1.25rem' }}>No satellites found matching your criteria</p>
                        <button
                            onClick={() => { setSearch(''); setTypeFilter('All'); }}
                            style={{
                                marginTop: '1rem',
                                background: 'var(--accent-blue)',
                                border: 'none',
                                color: 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '99px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            <SatelliteModal
                isOpen={!!selectedSatellite}
                satellite={selectedSatellite}
                onClose={() => setSelectedSatellite(null)}
            />

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
