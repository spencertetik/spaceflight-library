import React, { useState } from 'react';
import { StatCard } from './StatCard';
import { DetailModal } from './DetailModal';
import { spaceStats } from '../data';

/**
 * Dashboard Component
 * 
 * Displays space statistics from the baked-in api-snapshot.json data.
 * Data is refreshed server-side by running: node update_stats.cjs
 * No client-side API calls are made.
 */
export function Dashboard() {
    // Use the baked-in data directly - no client-side fetching
    const stats = spaceStats;

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', data: [], type: '' });

    const handleCardClick = (section) => {
        if (section.id === 'launches') {
            setModalContent({
                title: 'Orbital Launches (2026)',
                data: section.data || [],
                type: 'launches'
            });
            setModalOpen(true);
        } else if (section.id === 'humans-orbit') {
            setModalContent({
                title: 'Humans Currently in Space',
                data: section.data || [],
                type: 'humans'
            });
            setModalOpen(true);
        }
    };

    return (
        <>
            <div className="animate-enter" style={{
                marginBottom: '2rem',
                animationDelay: '200ms',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                {/* Data is updated server-side via update_stats.cjs */}
            </div>

            <div className="stats-grid">
                {stats.map((section, index) => (
                    <StatCard
                        key={section.id}
                        {...section}
                        index={index + 2}
                        onSelect={section.data ? () => handleCardClick(section) : undefined}
                    />
                ))}
            </div>

            <DetailModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
                data={modalContent.data}
                type={modalContent.type}
            />
        </>
    );
}
