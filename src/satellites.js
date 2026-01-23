export const notableSatellites = [
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    type: 'Space Observatory',
    operator: 'NASA / ESA / CSA',
    launchDate: 'December 25, 2021',
    launchVehicle: 'Ariane 5 ECA',
    orbit: 'Sun-Earth L2 (1.5M km from Earth)',
    mass: '6,200 kg',
    primaryMirror: '6.5 m diameter',
    wavelength: 'Infrared (0.6-28.5 μm)',
    description: 'Most powerful space telescope ever built. Successor to Hubble, designed to observe the earliest galaxies and stars in the universe. Features a massive sunshield the size of a tennis court to keep instruments at -233°C.',
    status: 'Operational',
    cost: '$10 billion',
    achievements: [
      'First images of exoplanet atmospheres in unprecedented detail',
      'Deepest infrared view of the universe',
      'Discovery of earliest galaxies (13.4 billion years old)',
      'Detailed analysis of TRAPPIST-1 exoplanet system'
    ]
  },
  {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    type: 'Space Observatory',
    operator: 'NASA / ESA',
    launchDate: 'April 24, 1990',
    launchVehicle: 'Space Shuttle Discovery (STS-31)',
    orbit: 'Low Earth Orbit (~540 km)',
    mass: '11,110 kg',
    primaryMirror: '2.4 m diameter',
    wavelength: 'Ultraviolet, Visible, Near-Infrared',
    description: 'Revolutionary space telescope that has fundamentally changed our understanding of the universe. Serviced five times by Space Shuttle astronauts, extending its life far beyond original design.',
    status: 'Operational',
    cost: '$4.7 billion (initial)',
    achievements: [
      'Determined the age of the universe (13.8 billion years)',
      'Discovered dark energy through supernova observations',
      'Deep Field images revealing thousands of distant galaxies',
      'Measured expansion rate of universe (Hubble Constant)',
      'First detailed images of Pluto before New Horizons',
      '1.6 million observations over 34+ years'
    ]
  },
  {
    id: 'iss',
    name: 'International Space Station',
    type: 'Space Station',
    operator: 'NASA / Roscosmos / ESA / JAXA / CSA',
    launchDate: 'First module: November 20, 1998',
    assembly: '1998-2011 (40+ missions)',
    orbit: 'Low Earth Orbit (408 km average)',
    mass: '420,000 kg',
    volume: '916 m³ (pressurized)',
    dimensions: '109m × 73m (solar arrays)',
    description: 'Largest artificial object in space and most expensive single item ever constructed. Continuously inhabited since November 2000. International collaboration between 5 space agencies representing 15 countries.',
    status: 'Operational (through 2030)',
    cost: '$150 billion',
    achievements: [
      'Over 3,000 scientific experiments conducted',
      '20+ years of continuous human presence',
      '280+ individuals from 23 countries visited',
      'Platform for testing technologies for Mars missions',
      'Medical research in microgravity',
      'Observation platform for Earth science'
    ]
  },
  {
    id: 'starlink',
    name: 'Starlink Constellation',
    type: 'Communications Constellation',
    operator: 'SpaceX',
    firstLaunch: 'May 24, 2019',
    orbit: 'Low Earth Orbit (340-614 km)',
    satellites: '9,538 operational (Jan 2026)',
    mass: '~260 kg per satellite (V2 Mini)',
    description: 'Largest satellite constellation ever deployed, providing global broadband internet coverage. Comprises 65% of all active satellites. Revolutionary flat-panel design with autonomous collision avoidance.',
    status: 'Operational & Expanding',
    achievements: [
      'Largest satellite constellation in history',
      '65% of all active satellites',
      'Global internet coverage including remote areas',
      'Low-latency connectivity (~20-40ms)',
      'Disaster relief communications',
      'Laser inter-satellite links (V2.0+)'
    ]
  },
  {
    id: 'gps',
    name: 'GPS (NAVSTAR)',
    type: 'Navigation Constellation',
    operator: 'US Space Force',
    firstLaunch: 'February 22, 1978',
    orbit: 'Medium Earth Orbit (20,200 km)',
    satellites: '31 operational',
    description: 'Global Positioning System that revolutionized navigation worldwide. Constellation of satellites providing precise location and timing services globally. Free for civilian use.',
    status: 'Operational',
    achievements: [
      'Revolutionized navigation and mapping',
      'Timing source for financial transactions',
      'Critical infrastructure for modern society',
      'Sub-meter accuracy with modern receivers',
      'Used by billions of devices daily'
    ]
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    type: 'Deep Space Probe',
    operator: 'NASA',
    launchDate: 'September 5, 1977',
    launchVehicle: 'Titan IIIE-Centaur',
    currentDistance: '24.5 billion km from Sun',
    mass: '825 kg',
    description: 'Most distant human-made object. First spacecraft to enter interstellar space (Aug 2012). Still communicating with Earth after 48+ years. Carries Golden Record with sounds and images of Earth.',
    status: 'Operational (interstellar)',
    achievements: [
      'First spacecraft in interstellar space',
      'Most distant human-made object',
      'Grand Tour of Jupiter and Saturn',
      'Discovered active volcanism on Io',
      'First images of Jupiter and Saturn systems',
      '48+ years of operation'
    ]
  },
  {
    id: 'chandra',
    name: 'Chandra X-ray Observatory',
    type: 'X-ray Observatory',
    operator: 'NASA',
    launchDate: 'July 23, 1999',
    launchVehicle: 'Space Shuttle Columbia (STS-93)',
    orbit: 'Highly elliptical (16,000-133,000 km)',
    mass: '4,800 kg',
    wavelength: 'X-ray (0.1-10 keV)',
    description: 'NASA\'s flagship X-ray observatory, revealing the invisible universe. 25+ years of observations of black holes, supernovae, and dark matter.',
    status: 'Operational',
    achievements: [
      'Detailed study of supermassive black holes',
      'Dark matter distribution in galaxy clusters',
      'Supernova remnant analysis',
      '25+ years of continuous operation'
    ]
  },
  {
    id: 'landsat-9',
    name: 'Landsat 9',
    type: 'Earth Observation',
    operator: 'NASA / USGS',
    launchDate: 'September 27, 2021',
    launchVehicle: 'Atlas V 401',
    orbit: 'Sun-synchronous LEO (705 km)',
    mass: '2,750 kg',
    description: 'Latest in the Landsat series, the longest continuous record of Earth observation from space (50+ years). Critical for monitoring climate change, land use, and natural resources.',
    status: 'Operational',
    achievements: [
      'Part of 50+ year continuous Earth observation',
      'Monitoring deforestation and urbanization',
      'Climate change documentation',
      'Free public data access'
    ]
  },
  {
    id: 'tiangong',
    name: 'Tiangong Space Station',
    type: 'Space Station',
    operator: 'CNSA (China)',
    launchDate: 'First module: April 29, 2021',
    orbit: 'Low Earth Orbit (340-450 km)',
    mass: '~100,000 kg',
    description: 'China\'s modular space station, the third operational space station after ISS and former Mir. Permanently crewed since June 2022.',
    status: 'Operational',
    achievements: [
      'China\'s first long-term space station',
      'Continuously crewed since 2022',
      'Multiple successful crew rotations',
      'Scientific experiments platform'
    ]
  }
];
