import { Rocket, Users, Globe, Orbit, Satellite, Calendar } from 'lucide-react';

import snapshot from './api-snapshot.json';

// Filter out non-human entries (like Starman mannequin)
const realHumans = snapshot.humans.people.filter(
  person => person.type?.name !== 'Non-Human'
);

export const spaceStats = [
  {
    id: 'launches',
    title: 'Orbital Launches',
    icon: Rocket,
    stats: [
      { label: 'Total Attempts (2026)', value: snapshot.launches.total, highlight: true },
      { label: 'Successful', value: snapshot.launches.success },
      { label: 'Failures', value: snapshot.launches.failure },
      { label: 'SpaceX Launches', value: snapshot.launches.spacex },
      { label: '2025 Total (Ref)', value: '329', secondary: true }
    ],
    data: snapshot.launches.list
  },
  {
    id: 'human-spaceflight',
    title: 'Human Spaceflight',
    icon: Users,
    stats: [
      { label: 'Humans Launched (2026)', value: '6', highlight: true, note: 'NS-38 (Jan 22)' },
      { label: 'Orbital Travelers', value: '0' },
      { label: 'Suborbital Travelers', value: '6' },
      { label: '2025 Total (Ref)', value: '70', secondary: true }
    ]
  },
  {
    id: 'humans-orbit',
    title: 'Humans in Space',
    icon: Globe,
    stats: [
      { label: 'Currently in Space', value: realHumans.length, highlight: true, note: 'ISS & Tiangong' },
      { label: 'On ISS', value: realHumans.filter(p => p.agency?.abbrev === 'NASA' || p.agency?.abbrev === 'RFSA').length },
      { label: 'On Tiangong', value: realHumans.filter(p => p.agency?.abbrev === 'CNSA').length },
      { label: '2025 Peak', value: '20', secondary: true }
    ],
    data: realHumans
  },
  {
    id: 'launch-vehicles',
    title: 'Launch Vehicles',
    icon: Orbit,
    stats: [
      { label: 'Maiden Flights (2026)', value: '1+', highlight: true, note: 'CERES-2 (Failed), Neutron (Q1)' },
      { label: 'Expected This Year', value: '10+' },
      { label: '2025 Total', value: '11–13', secondary: true }
    ]
  },
  {
    id: 'satellites',
    title: 'Satellites',
    icon: Satellite,
    stats: [
      { label: 'Active Satellites', value: '14,300+', highlight: true },
      { label: 'Starlink Satellites', value: '9,538' },
      { label: 'Starlink Market Share', value: '~65%' },
      { label: '2025 Total', value: '13,000+', secondary: true }
    ]
  },
  {
    id: 'notable-missions',
    title: 'Notable 2026 Missions',
    icon: Calendar,
    stats: [
      { label: 'Artemis II Launch', value: 'Feb 5-6', highlight: true, note: 'First crewed lunar mission since 1972' },
      { label: 'Crew Members', value: '4' },
      { label: 'Mission Duration', value: '10 days' },
      { label: 'ISS Operations', value: 'Through 2030', secondary: true }
    ]
  }
];

