import React, { useState, useEffect } from 'react';
import { Rocket, Box, Database, Search, Filter, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { rockets, engines, capsules } from '../vehicles';

// Helper to determine region
const getRegion = (manufacturer) => {
    const m = manufacturer.toLowerCase();
    if (m.includes('spacex') || m.includes('nasa') || m.includes('ula') || m.includes('blue origin') || m.includes('rocket lab') || m.includes('boeing') || m.includes('rocketdyne') || m.includes('aerojet')) return 'American';
    if (m.includes('soviet') || m.includes('russia')) return 'Russian';
    if (m.includes('ariane') || m.includes('esa')) return 'European';
    if (m.includes('china') || m.includes('casc')) return 'Chinese';
    return 'Other';
};

function VehicleModal({ isOpen, onClose, vehicle: initialVehicle, type }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (initialVehicle?.variants && initialVehicle.variants.length > 0) {
            setSelectedVariant(initialVehicle.variants[0]);
        } else {
            setSelectedVariant(null);
        }
    }, [initialVehicle]);

    // Determine current vehicle state
    const currentVehicle = selectedVariant || initialVehicle;
    const currentImage = currentVehicle?.image || initialVehicle?.image;
    const currentName = currentVehicle?.name || initialVehicle?.name;

    if (!isOpen || !initialVehicle) return null;

    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999, // Super high z-index
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
                maxWidth: '1600px',
                height: '92vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
                position: 'relative',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                {/* Close Button - Fixed Position */}
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
                        zIndex: 50, // Higher z-index to stay on top
                        backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >
                    <X size={24} />
                </button>

                {/* Scrollable Content Container */}
                <div style={{ overflowY: 'auto', flex: 1, width: '100%' }}>
                    {/* Header Image */}
                    <div style={{
                        height: isMobile ? '200px' : '400px',
                        width: '100%',
                        position: 'relative',
                        background: 'linear-gradient(to bottom, #262626, #171717)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: isMobile ? '1.5rem' : '3rem',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <img
                            src={currentImage}
                            alt={currentName}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ padding: isMobile ? '1.5rem' : '3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? '1rem' : '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--accent-blue)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: '700',
                                        background: 'rgba(56, 189, 248, 0.1)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px'
                                    }}>{type === 'rockets' ? 'Launch Vehicle' : type === 'engines' ? 'Rocket Engine' : 'Spacecraft'}</span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: '#94a3b8',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: '600',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px'
                                    }}>{getRegion(initialVehicle.manufacturer)}</span>
                                </div>
                                <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: '800', margin: '0 0 0.5rem 0', lineHeight: 1 }}>{initialVehicle.name}</h2>
                                <p style={{ fontSize: isMobile ? '1rem' : '1.25rem', color: 'var(--text-secondary)', margin: 0 }}>{initialVehicle.manufacturer}</p>
                            </div>

                            {/* Variant Selector */}
                            {initialVehicle.variants && initialVehicle.variants.length > 1 && (
                                <div style={{ minWidth: '200px' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>Configuration / Angle</label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            value={selectedVariant ? selectedVariant.name : ''}
                                            onChange={(e) => {
                                                const v = initialVehicle.variants.find(x => x.name === e.target.value);
                                                setSelectedVariant(v);
                                            }}
                                            style={{
                                                width: '100%',
                                                appearance: 'none',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'white',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '12px',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                outline: 'none'
                                            }}
                                        >
                                            {initialVehicle.variants.map((v, i) => (
                                                <option key={i} value={v.name} style={{ background: '#171717' }}>
                                                    {v.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p style={{ lineHeight: '1.7', color: '#cbd5e1', fontSize: isMobile ? '1rem' : '1.125rem', marginBottom: isMobile ? '2rem' : '3rem', maxWidth: '75ch' }}>
                            {initialVehicle.description}
                        </p>

                        {/* Specs Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: isMobile ? '1.25rem' : '2rem',
                            padding: isMobile ? '1.5rem' : '2rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {/* 1. Show Variant Specific Stats First */}
                            {currentVehicle !== initialVehicle && Object.entries(currentVehicle).map(([key, value]) => {
                                if (['name', 'image', 'manufacturer', 'description', 'id', 'variants'].includes(key)) return null;
                                return (
                                    <div key={`param-${key}`}>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase',
                                            color: 'var(--accent-blue)', // Highlight variant specific stats
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
                                )
                            })}

                            {/* 2. Show Base Model Stats (if not overridden by variant) */}
                            {Object.entries(initialVehicle).map(([key, value]) => {
                                if (['id', 'name', 'manufacturer', 'description', 'image', 'variants'].includes(key)) return null;
                                // If variant has this key, skip it here (already shown above)
                                if (currentVehicle !== initialVehicle && currentVehicle[key]) return null;

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
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export function Library() {
    const [activeTab, setActiveTab] = useState('rockets');
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');

    // Theme handled globally

    const tabs = [
        { id: 'rockets', label: 'Launch Vehicles', icon: Rocket, data: rockets },
        { id: 'engines', label: 'Rocket Engines', icon: Box, data: engines },
        { id: 'capsules', label: 'Capsules', icon: Database, data: capsules },
    ];

    const currentData = tabs.find(t => t.id === activeTab)?.data || [];

    // Filter Data
    const filteredData = currentData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.manufacturer.toLowerCase().includes(search.toLowerCase());

        if (regionFilter === 'All') return matchesSearch;
        return getRegion(item.manufacturer) === regionFilter && matchesSearch;
    });

    return (
        <div className="animate-enter">
            {/* Search and Navigation Bar */}
            <div style={{ marginBottom: '2rem' }}>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '1px',
                    marginBottom: '2rem'
                }}>
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setRegionFilter('All'); setSearch(''); }}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: '1rem 0',
                                    color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                    fontSize: '1rem',
                                    fontWeight: isActive ? '600' : '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    position: 'relative',
                                    transition: 'color 0.2s'
                                }}
                            >
                                <Icon size={18} />
                                {tab.label}
                                {isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-1px',
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: 'var(--accent-blue)',
                                        boxShadow: '0 -4px 10px var(--accent-blue)'
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Controls: Search & Filters */}
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
                            placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
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

                    {/* Region Filters */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {['All', 'American', 'Russian', 'European', 'Chinese'].map(f => (
                            <button
                                key={f}
                                onClick={() => setRegionFilter(f)}
                                style={{
                                    background: regionFilter === f ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${regionFilter === f ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '99px',
                                    color: regionFilter === f ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem',
                minHeight: '50vh'
            }}>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="glass-panel"
                            style={{
                                cursor: 'pointer',
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: `fadeIn 0.5s ease-out ${Math.min(index * 50, 500)}ms backwards`,
                                position: 'relative',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -5px rgba(0,0,0,0.4)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            <div style={{
                                height: '220px',
                                background: 'radial-gradient(circle at center, #404040 0%, #171717 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem',
                                position: 'relative'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.65rem',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        fontWeight: '700',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {item.manufacturer.split(' ')[0]}
                                    </span>
                                    {getRegion(item.manufacturer) !== 'Other' && (
                                        <span style={{
                                            fontSize: '0.65rem',
                                            background: 'rgba(255,255,255,0.1)',
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '4px',
                                            color: '#94a3b8'
                                        }}>
                                            {getRegion(item.manufacturer)}
                                        </span>
                                    )}
                                </div>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    margin: 0,
                                    color: 'white',
                                    lineHeight: '1.2',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {item.name}
                                </h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                        <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p style={{ fontSize: '1.25rem' }}>No vehicles found matching your criteria</p>
                        <button
                            onClick={() => { setSearch(''); setRegionFilter('All'); }}
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

            <VehicleModal
                isOpen={!!selectedItem}
                vehicle={selectedItem}
                onClose={() => setSelectedItem(null)}
                type={activeTab}
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
