import React from 'react';
import { ChevronRight } from 'lucide-react';

export function StatCard({ title, icon: Icon, stats, index, onSelect }) {
    return (
        <div
            className="glass-panel animate-enter"
            style={{
                animationDelay: `${index * 100}ms`,
                cursor: onSelect ? 'pointer' : 'default',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onClick={onSelect}
            // Add simple hover effect via inline styles and JS events for interaction feedback
            onMouseEnter={(e) => {
                if (onSelect) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
                }
            }}
            onMouseLeave={(e) => {
                if (onSelect) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                }
            }}
        >
            <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            padding: '0.5rem',
                            background: 'var(--accent-glow)',
                            borderRadius: '8px',
                            color: 'var(--accent-blue)'
                        }}>
                            <Icon size={24} style={{ color: 'white' }} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>{title}</h2>
                    </div>
                    {onSelect && <ChevronRight size={20} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            paddingBottom: stat.highlight ? '0.5rem' : '0',
                            borderBottom: stat.highlight ? '1px solid var(--border-card)' : 'none',
                            marginBottom: stat.highlight ? '0.5rem' : '0',
                            opacity: stat.secondary ? 0.5 : 1
                        }}>
                            <div>
                                <span style={{
                                    color: stat.highlight ? 'var(--text-secondary)' : 'var(--text-secondary)',
                                    fontSize: stat.highlight ? '0.875rem' : '0.875rem',
                                    display: 'block'
                                }}>
                                    {stat.label}
                                </span>
                                {stat.note && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                                        {stat.note}
                                    </span>
                                )}
                            </div>
                            <span style={{
                                fontSize: stat.highlight ? '1.5rem' : '1rem',
                                fontWeight: stat.highlight ? '700' : '500',
                                color: stat.highlight ? 'var(--text-primary)' : 'var(--text-primary)',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
