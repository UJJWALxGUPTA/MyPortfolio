import {
  SkillItem,
  ExperienceItem,
  ProjectItem,
  CertificationItem,
  EducationItem,
  TopologyNode
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Ujjwal Gupta',
  title: 'Full-Stack Software, Distributed Systems & Network Infrastructure Engineer',
  headline: 'Electronics & Telecommunication Engineering graduate (2021-2025) with versatile cross-domain execution across low-level hardware (STM32, Arduino, Ki-Cad), scalable backend architectures (Apache Kafka, WebSockets, MERN), and mission-critical network backbones (CCNA, OSPF, VLANs, Linux).',
  email: 'ujjwalxgupta16@gmail.com',
  phone: '+91 7304693409',
  location: 'Mumbai, Maharashtra, India',
  github: 'https://github.com/ujjwalgupta-net',
  linkedin: 'https://linkedin.com/in/ujjwal-gupta-ccna',
  status: 'ONLINE // ACCEPTING TRAFFIC',
  gatewayIp: '192.168.1.1',
  asn: 'AS65001',
  interfaces: [
    'GigabitEthernet0/0/0 (WAN)',
    'GigabitEthernet0/0/1.10 (VLAN 10)',
    'GigabitEthernet0/0/1.20 (VLAN 20)',
    'kafka://broker:9092 (Event Stream)',
    'eth0 (Host Sockets)'
  ],
};

export const ROTATING_SUBHEADS = [
  'Network Engineer & CCNA Associate',
  'Full-Stack Developer (MERN & Distributed Kafka)',
  'Embedded Systems & IoT Hardware Builder'
];

export const QUICK_BADGES = [
  {
    label: 'Cisco Certified Network Associate',
    code: 'CCNA 200-301',
    color: 'noc-cyan',
    icon: 'Network',
  },
  {
    label: 'Distributed Kafka & MERN Architect',
    code: 'Event-Driven Systems',
    color: 'noc-green',
    icon: 'Layers',
  },
  {
    label: 'Embedded IoT & Hardware Builder',
    code: 'STM32 / Arduino / Ki-Cad',
    color: 'noc-purple',
    icon: 'Cpu',
  },
];

export const SKILLS_DATA: SkillItem[] = [
  // 1. Networking & Protocols
  {
    id: 'tcp-ip',
    name: 'TCP/IP Suite & Socket Architecture',
    category: 'networking',
    level: 'Expert',
    proficiencyPercent: 96,
    osiLayer: 'Layer 4 (Transport)',
    description: 'Deep understanding of 3-way handshake (SYN, SYN-ACK, ACK), flow control (sliding window), MSS negotiation, and teardown states.',
    protocolStandard: 'RFC 793 / RFC 791',
    commandExample: 'netstat -natp | grep ESTABLISHED',
    packetHeaderSummary: 'Source Port (16b) | Dest Port (16b) | Seq Num (32b) | Ack Num (32b) | Flags: SYN/ACK/FIN/RST',
    tags: ['Core Protocol', 'Handshake', 'Flow Control', 'Sockets']
  },
  {
    id: 'ospf',
    name: 'Dynamic Routing (OSPF Area 0)',
    category: 'networking',
    level: 'Expert',
    proficiencyPercent: 94,
    osiLayer: 'Layer 3 (Network)',
    description: 'Dijkstra Shortest Path First (SPF) algorithm, Link-State Advertisements (LSA Type 1-5), DR/BDR election, neighbor adjacency states (Down -> Init -> 2-Way -> ExStart -> Exchange -> Loading -> Full).',
    protocolStandard: 'RFC 2328 (OSPFv2) / RFC 5340 (OSPFv3)',
    commandExample: 'show ip ospf neighbor detail',
    packetHeaderSummary: 'OSPF Packet: Type 1 (Hello) / Type 2 (DBD) / Type 3 (LSR) / Type 4 (LSU) / Type 5 (LSAck)',
    tags: ['Routing', 'Link-State', 'Dijkstra', 'Area 0', 'Convergence']
  },
  {
    id: 'switching-vlans',
    name: 'VLANs & 802.1Q Trunking',
    category: 'networking',
    level: 'Expert',
    proficiencyPercent: 95,
    osiLayer: 'Layer 2 (Data Link)',
    description: 'Broadcast domain isolation, 4-byte 802.1Q Ethernet frame encapsulation (TPID 0x8100, VID 12b), Native VLAN security, and Inter-VLAN routing (Router-on-a-Stick).',
    protocolStandard: 'IEEE 802.1Q',
    commandExample: 'show interfaces trunk',
    packetHeaderSummary: 'Tagged Frame: D-MAC | S-MAC | 0x8100 (TPID) | PRI/CFI/VID (TCI) | EtherType | Payload | FCS',
    tags: ['802.1Q', 'Trunking', 'Inter-VLAN', 'Sub-interfaces']
  },
  {
    id: 'nat-pat-acls',
    name: 'NAT/PAT & Extended ACL Security',
    category: 'networking',
    level: 'Expert',
    proficiencyPercent: 93,
    osiLayer: 'Layer 3 & 4',
    description: 'Dynamic Port Address Translation (NAT Overload) allowing private subnets to reach public WANs. Extended ACL 100-199 packet filtering by transport port and IP headers.',
    protocolStandard: 'RFC 3022 / RFC 1812',
    commandExample: 'access-list 101 permit tcp 192.168.10.0 0.0.0.255 any eq 443',
    packetHeaderSummary: 'Translation: Inside Local IP:Port <-> Inside Global IP:Port <-> Outside Global IP:Port',
    tags: ['NAT/PAT', 'ACL 101', 'Perimeter Defense', 'Packet Filtering']
  },

  // 2. Backend & Distributed Systems
  {
    id: 'apache-kafka',
    name: 'Apache Kafka & Event Streaming',
    category: 'backend_distributed',
    level: 'Advanced',
    proficiencyPercent: 90,
    osiLayer: 'Layer 7 (Application)',
    description: 'Distributed pub/sub event pipeline architecture, multi-broker topics, partition rebalancing, consumer offset commit lag tracking, and at-least-once message delivery.',
    protocolStandard: 'Kafka Binary Wire Protocol',
    commandExample: 'kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic chat-events --from-beginning',
    packetHeaderSummary: 'Kafka Record: Offset (64b) | Key-Length | Key | Value-Length | Payload | Timestamp | CRC32',
    tags: ['Event-Driven', 'Partitions', 'Offsets', 'Pub/Sub', 'High-Throughput']
  },
  {
    id: 'websockets-realtime',
    name: 'WebSockets & High-Concurrency Telemetry',
    category: 'backend_distributed',
    level: 'Expert',
    proficiencyPercent: 93,
    osiLayer: 'Layer 7 (Application / TCP)',
    description: 'Full-duplex bi-directional persistent connections over a single TCP socket with RFC 6455 handshake upgrade, heartbeat ping/pong frames, and room broadcasts.',
    protocolStandard: 'RFC 6455',
    commandExample: 'ws.send(JSON.stringify({ event: "telemetry_ping", offset: 1042 }));',
    packetHeaderSummary: 'WS Frame: FIN (1b) | RSV (3b) | Opcode (4b) | Mask (1b) | Payload Len (7b/16b/64b) | Masking-Key',
    tags: ['Real-Time', 'Full-Duplex', 'Socket.IO', 'RFC 6455', 'Low-Latency']
  },
  {
    id: 'node-express',
    name: 'Node.js & Express.js RESTful APIs',
    category: 'backend_distributed',
    level: 'Expert',
    proficiencyPercent: 94,
    osiLayer: 'Layer 7 (Application)',
    description: 'Asynchronous event-loop runtime, non-blocking I/O, custom middleware pipelines, JWT auth handshakes, rate limiting, and structured REST endpoints.',
    protocolStandard: 'HTTP/1.1 & HTTP/2 RFC 9110',
    commandExample: 'app.post("/api/v1/telemetry", rateLimiter, verifyJWT, handleTelemetry);',
    packetHeaderSummary: 'HTTP Req: POST /api/v1/orders | Host | Authorization: Bearer <jwt> | Content-Type: application/json',
    tags: ['Node.js', 'Express', 'REST API', 'JWT', 'Middleware']
  },
  {
    id: 'mongodb-nosql',
    name: 'MongoDB & Document Sharding',
    category: 'backend_distributed',
    level: 'Advanced',
    proficiencyPercent: 90,
    osiLayer: 'Layer 7 (Application)',
    description: 'Document schema design, aggregation pipelines, atomic multi-document transactions, compound indexing, and replica set high availability.',
    commandExample: 'db.leads.aggregate([{ $match: { status: "ACTIVE" } }, { $group: { _id: "$pipeline", total: { $sum: "$value" } } }]);',
    tags: ['MongoDB', 'NoSQL', 'Aggregation', 'Indexing', 'MERN Stack']
  },
  {
    id: 'java-jdbc',
    name: 'Java, JDBC & OOP Architecture',
    category: 'backend_distributed',
    level: 'Advanced',
    proficiencyPercent: 88,
    osiLayer: 'Layer 7 (Application)',
    description: 'Enterprise object-oriented design, JDBC connection pooling, prepared statements preventing SQL injection, desktop GUI (Java Swing), and multithreaded workers.',
    commandExample: 'PreparedStatement ps = conn.prepareStatement("SELECT * FROM reservations WHERE room_id = ?");',
    tags: ['Java', 'JDBC', 'MySQL', 'OOP', 'Desktop GUI']
  },

  // 3. Embedded & IoT / Low-Level
  {
    id: 'arduino-iot',
    name: 'Arduino & Microcontroller IoT Firmware',
    category: 'embedded_iot',
    level: 'Expert',
    proficiencyPercent: 94,
    osiLayer: 'Physical / Firmware',
    description: 'Bare-metal C/C++ firmware development, hardware timer interrupts, GPIO pull-up/pull-down resistor interfacing, analog-to-digital sampling, and EEPROM state storage.',
    commandExample: 'attachInterrupt(digitalPinToInterrupt(RFID_IRQ_PIN), onCardDetected, FALLING);',
    packetHeaderSummary: 'Serial UART Frame: Start Bit (1b) | Data (8b) | Parity (None) | Stop Bit (1b) @ 115200 Baud',
    tags: ['Arduino', 'C/C++', 'Interrupts', 'MFA Security', 'Relays']
  },
  {
    id: 'rfid-security',
    name: 'RFID (MFRC522) & Keypad Matrix Security',
    category: 'embedded_iot',
    level: 'Advanced',
    proficiencyPercent: 92,
    osiLayer: 'Physical / Data Link',
    description: '13.56 MHz contactless SPI communication with MIFARE Classic cards, cryptographic sector authentication keys, and 4x4 matrix keypad scanning with debouncing.',
    protocolStandard: 'ISO/IEC 14443A',
    commandExample: 'mfrc522.PICC_ReadCardSerial(); if (mfrc522.uid.uidByte[0] == AUTHORIZED_UID) { ... }',
    tags: ['MFRC522', 'SPI Bus', '13.56MHz', 'Keypad 4x4', 'Solenoid 12V']
  },
  {
    id: 'dm542-motor-laser',
    name: 'Motor Driver (DM542) & Laser Calibration',
    category: 'embedded_iot',
    level: 'Advanced',
    proficiencyPercent: 93,
    description: 'Square-wave PWM step/dir pulse generation, microstepping DIP configuration, optical isolation, and 1064nm IR / 355nm UV laser toolpathing in EzCad.',
    commandExample: 'DM542 PULSE+/DIR+ optocoupler logic 5V TTL wave tuning',
    tags: ['DM542', 'PWM', 'Microstepping', 'EzCad', 'IR/UV Optics']
  },
  {
    id: 'stm32-arm',
    name: 'STM32 & ARM Cortex-M Systems',
    category: 'embedded_iot',
    level: 'Advanced',
    proficiencyPercent: 88,
    description: 'ARM Cortex peripheral programming (GPIO, Hardware Timers, PWM, USART, SPI, I2C), FreeRTOS task scheduling, and ADC signal sampling.',
    commandExample: 'HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);',
    tags: ['STM32', 'ARM Cortex', 'PWM', 'FreeRTOS', 'SPI/I2C']
  },

  // 4. Hardware & EDA Tools
  {
    id: 'kicad-eda',
    name: 'Ki-Cad & Schematic/PCB Layout',
    category: 'tools_eda',
    level: 'Advanced',
    proficiencyPercent: 89,
    description: 'Schematic electrical rule checking (ERC), multi-layer PCB routing, differential pair impedance tuning, ground copper pours, and Gerber manufacturing file generation.',
    commandExample: 'Ki-Cad DRC Check: 0 Violations, Clearance: 0.2mm, Copper Thickness: 1oz',
    tags: ['Ki-Cad', 'Schematic Capture', 'PCB Layout', 'Gerbers', 'EDA']
  },
  {
    id: 'circuit-sim',
    name: 'Circuit Simulation & SPICE Analysis',
    category: 'tools_eda',
    level: 'Advanced',
    proficiencyPercent: 87,
    description: 'Transient analysis, AC frequency response sweeps, DC operating points, and relay flyback diode clamp verification in LTSpice & Proteus.',
    commandExample: '.tran 0 100ms 0 1us ; Run transient motor pulse simulation',
    tags: ['SPICE', 'Transient Sim', 'Flyback Protection', 'EDA']
  },
  {
    id: 'arduino-ide',
    name: 'Arduino IDE & Serial Monitors',
    category: 'tools_eda',
    level: 'Expert',
    proficiencyPercent: 95,
    description: 'AVR/SAMD toolchain compilation, bootloader flashing via ISP/USB, baud rate tuning, serial plotting of analog telemetry, and library management.',
    commandExample: 'avrdude -v -patmega328p -carduino -P/dev/ttyUSB0 -b115200 -Uflash:w:firmware.hex:i',
    tags: ['Arduino IDE', 'AVR', 'AVRDUDE', 'Serial Plotter']
  },

  // 5. OS & Scripting / IDEs
  {
    id: 'linux-shell',
    name: 'Linux (Ubuntu/Debian) & Bash Automation',
    category: 'os_scripting',
    level: 'Expert',
    proficiencyPercent: 93,
    description: 'LPI certified mastery of systemd services, SysV init, cron scheduling, UFW/iptables firewalls, POSIX file permissions (chmod/chown), and user management.',
    commandExample: 'sudo systemctl restart kafka.service && journalctl -u kafka -f',
    tags: ['Ubuntu', 'Debian', 'Systemd', 'Iptables', 'Bash', 'LPI']
  },
  {
    id: 'python-pygame',
    name: 'Python, Sockets & Pygame Engine',
    category: 'os_scripting',
    level: 'Advanced',
    proficiencyPercent: 90,
    description: 'Object-oriented 2D game loops, spatial coordinate collision tracking, Netmiko network automation scripts, and Scapy packet manipulation.',
    commandExample: 'python3 -m snake_engine.main --fps 60 --scale 20',
    tags: ['Python', 'Pygame', 'OOP', 'Game Engine', 'Netmiko']
  },
  {
    id: 'dev-ides',
    name: 'Modern Development Environments & IDEs',
    category: 'os_scripting',
    level: 'Expert',
    proficiencyPercent: 95,
    description: 'Multi-tool workflow across VS Code (ESLint, Prettier, Git Lens), Spyder (Scientific Python), and Turbo C++ / GCC toolchains.',
    commandExample: 'code . --remote ssh://ujjwal@noc-gateway',
    tags: ['VS Code', 'Spyder', 'Turbo C++', 'GCC', 'Git']
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'specialise-products',
    role: 'Graduate Trainee (Hardware, Embedded & Systems)',
    company: 'Specialise Products Pvt. Ltd.',
    location: 'Mumbai, India',
    period: 'June 2026 – Present',
    status: 'CURRENT',
    statusColor: '#10b981',
    highlights: [
      'Embedded Hardware & Host UI: Programmed host software control logic and user interface modules for real-time hardware telemetry and status monitoring.',
      'Laser Calibration & CAD Toolpathing: Executed mechanical toolpathing, surface marking, and footprint generation using CAD suites (DesignSpark, EzCad) for high-precision IR (1064nm) and UV (355nm) industrial laser systems.',
      'Signal Integrity & Motor Diagnostics: Isolated electrical communication failures and calibrated motor driver configurations (DM542) across circuit boards to minimize production line downtime.',
      'Quality Assurance & Safety Protocols: Conducted optical beam alignment, sensor loop verification, and thermal safety interlock testing prior to machine dispatch.'
    ],
    hardwareTags: ['EzCad CAD Suite', 'DesignSpark', 'DM542 Stepper Drivers', 'IR / UV Laser Optics', 'Digital Oscilloscopes', 'PWM Tuning'],
    metrics: [
      { label: 'Signal Uptime', value: '99.4%' },
      { label: 'Laser Calibration Accuracy', value: '±15 µm' },
      { label: 'Driver Response Time', value: '<2.5 ms' }
    ]
  }
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  // 1. RealtyFlow CRM
  {
    id: 'realty-flow',
    title: 'RealtyFlow | Real Estate Automation Platform',
    tabCategory: 'fullstack',
    displayBadge: 'Full-Stack CRM & Distributed',
    headline: 'Multi-tenant commercial real estate automation engine with dynamic lead pipelines and financial modules.',
    overview: 'Engineered a full-featured multi-tenant CRM platform architected for real estate brokerages, streamlining customer acquisition pipelines, agent deal assignments, financial transactions, and real-time revenue analytics.',
    architectureDetails: [
      'Multi-Tenant Architecture: Designed isolated organizational workspaces with role-based access control (Admin, Broker, Agent) ensuring strict data segregation across tenant schemas.',
      'Dynamic Lead Velocity Pipeline: Built drag-and-drop pipeline stages with automated status transitions, SLA escalation timers, and lead valuation calculations.',
      'Automated Reporting & Analytics: Aggregated monthly revenue projections, agent performance leaderboards, and conversion ratios calculated via high-speed MongoDB aggregation pipelines.',
      'Responsive MERN Implementation: React.js frontend styled with Tailwind CSS, secured by JWT authentication cookies and express-validator input sanitization.'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT Auth', 'RESTful API'],
    interactiveType: 'crm_analytics',
    simulationAvailable: true,
    githubUrl: 'https://github.com/ujjwalgupta-net/realtyflow-crm',
    metrics: [
      { label: 'Lead Velocity', value: '10k+ Req/s' },
      { label: 'Architecture', value: 'Multi-Tenant' },
      { label: 'API Latency', value: '<55 ms' }
    ]
  },

  // 2. KafkaChat
  {
    id: 'kafka-chat',
    title: 'KafkaChat | Real-Time Distributed Messaging Platform',
    tabCategory: 'fullstack',
    displayBadge: 'Distributed Event Streaming',
    headline: 'High-throughput event-driven messaging backbone powered by Apache Kafka partitions and WebSockets.',
    overview: 'Built a fault-tolerant, horizontally scalable distributed chat engine leveraging Apache Kafka topics as an event log and persistent buffer, connected to Node.js WebSocket gateways for sub-millisecond bidirectional client synchronization.',
    architectureDetails: [
      'Partition-Based Stream Ingestion: Partitioned chat events across 3 active Kafka topic brokers with deterministic key hashing (RoomID) for strict FIFO message ordering per channel.',
      'Full-Duplex WebSocket Gateways: Connected clients through persistent RFC 6455 WebSockets, dispatching active typing status, presence heartbeats, and read-receipt acknowledgments.',
      'Fault-Tolerant Offset Persistence: Configured manual consumer offset commits to guarantee zero message loss during broker failovers or consumer restart cycles.',
      'MongoDB Chat Archival: Decoupled historical persistence workers consuming Kafka topics asynchronously into MongoDB with compound index lookups.'
    ],
    techStack: ['Apache Kafka', 'Node.js', 'WebSockets (ws)', 'MongoDB', 'Express.js', 'Docker', 'Event-Driven'],
    interactiveType: 'kafka_stream',
    simulationAvailable: true,
    githubUrl: 'https://github.com/ujjwalgupta-net/kafkachat-engine',
    metrics: [
      { label: 'Throughput', value: '50k+ Msg/sec' },
      { label: 'Kafka Partitions', value: '3 Active Brokers' },
      { label: 'Socket Latency', value: '<12 ms' }
    ]
  },

  // 3. Multi-VLAN Enterprise Topology (CCNA Capstone)
  {
    id: 'multi-vlan-enterprise-topology',
    title: 'Multi-VLAN Enterprise Topology & Dynamic Routing Simulation',
    tabCategory: 'networks',
    displayBadge: 'Cisco Campus Backbone // CCNA',
    headline: 'High-availability multi-department network backbone with OSPF routing, 802.1Q trunking, and extended security ACLs.',
    overview: 'Engineered an end-to-end enterprise network infrastructure simulating departmental broadcast domain isolation (Staff VLAN 10, Admin VLAN 20), redundant core routing, and internet egress through dynamic NAT/PAT overload.',
    architectureDetails: [
      'VLAN Segmentation: Created dedicated broadcast domains for Staff (VLAN 10: 192.168.10.0/24) and Admin/Management (VLAN 20: 192.168.20.0/24) configured across Cisco Catalyst switches.',
      'Router-on-a-Stick (Inter-VLAN): Implemented 802.1Q sub-interfaces (g0/0.10, g0/0.20) on Cisco 2911 router acting as default gateways for each VLAN.',
      'Dynamic OSPF Area 0: Configured single-area OSPF routing protocol across router backbones with sub-second link-failure recalculation and neighbor authentication.',
      'Egress NAT / PAT: Deployed dynamic IP masquerading (NAT Overload) allowing private internal hosts to access WAN addresses through a single public IP interface.',
      'Perimeter Security & SSH Hardening: Applied Extended Access Control Lists (ACL 101) to restrict inter-departmental traffic while permitting stateful outbound TCP/UDP, plus switch port-security with MAC sticky address limits.'
    ],
    techStack: ['Cisco Packet Tracer', 'OSPF Area 0', 'IEEE 802.1Q', 'Inter-VLAN Routing', 'NAT / PAT', 'Extended ACLs', 'SSH Hardening', 'Port Security'],
    interactiveType: 'topology',
    simulationAvailable: true,
    metrics: [
      { label: 'Broadcast Domain Isolation', value: '100%' },
      { label: 'OSPF Convergence', value: '<1.2s' },
      { label: 'Security Enforcement', value: 'ACL 101' },
      { label: 'Trunk Protocol', value: '802.1Q' }
    ],
    keyProtocols: ['OSPFv2', '802.1Q', 'ICMP', 'NAT/PAT', 'DHCP', 'SSHv2']
  },

  // 4. Smart Door Lock (IoT & Security)
  {
    id: 'smart-door-lock',
    title: 'Smart Door Lock | Multi-Factor Hardware Security System',
    tabCategory: 'embedded',
    displayBadge: 'IoT & Embedded Security',
    headline: 'Embedded hardware-level multi-factor authentication engine pairing RFID card scanning with PIN keypad relay actuation.',
    overview: 'Designed and fabricated an autonomous physical security access control system integrating a 13.56 MHz RFID sensor and 4x4 matrix keypad with an Arduino microcontroller, controlling a 12V solenoid door strike via opto-isolated relay circuitry.',
    architectureDetails: [
      'Multi-Factor Authentication (MFA): Implemented two-tiered access logic requiring both a valid cryptographic RFID card UID tag scan followed by a 4-digit PIN verification within a 10-second timeout window.',
      'Hardware Anti-Tamper & Debounce: Integrated software debounce routines for matrix keypad polling and lockout security logic triggering after 3 consecutive invalid attempts.',
      'Opto-Isolated Relay Actuation: Designed flyback diode clamped relay circuit driving high-current 12V solenoid strikes while protecting low-voltage microcontroller logic lines from inductive voltage spikes.',
      'Low-Power Sleep States: Configured hardware external interrupts on the RFID IRQ pin to wake the microcontroller from low-power standby upon card proximity.'
    ],
    techStack: ['Arduino', 'RFID (MFRC522)', 'Matrix Keypad (4x4)', '12V Solenoid', 'Optocoupler Relay', 'C/C++', 'SPI Bus'],
    interactiveType: 'iot_schematic',
    simulationAvailable: true,
    githubUrl: 'https://github.com/ujjwalgupta-net/arduino-smart-lock',
    metrics: [
      { label: 'Auth Pipeline', value: 'MFA (RFID + PIN)' },
      { label: 'Relay Latch Time', value: '<150 ms' },
      { label: 'Bus Protocol', value: 'SPI @ 13.56 MHz' }
    ]
  },

  // 5. Digi-Dine Smart Canteen
  {
    id: 'digi-dine-smart-canteen',
    title: 'Digi-Dine | Smart Canteen Management System',
    tabCategory: 'fullstack',
    displayBadge: 'Full-Stack Software',
    headline: 'High-concurrency full-stack canteen automation platform with time-slot ordering and automated queue processing.',
    overview: 'Architected a responsive full-stack platform addressing peak-hour campus dining congestion, handling live time-slot meal bookings, automated token queues, and payment gateway transactions.',
    architectureDetails: [
      'Reactive Frontend: Responsive user interface built with React.js offering real-time combo meal customization, dietary filtering, and live preparation status tracking.',
      'High-Throughput REST Backend: Node.js and Express.js REST API handling concurrent order dispatches with rate-limiting and validation middleware.',
      'Database Architecture: MongoDB document store with atomic transaction updates for inventory depletion to eliminate double-booking during peak rush.',
      'Financial Gateway Integration: Integrated Razorpay payment API with cryptographic signature verification and webhook listeners for instant payment confirmation.'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay Webhooks', 'REST API', 'JWT Authentication', 'Tailwind CSS'],
    simulationAvailable: false,
    githubUrl: 'https://github.com/ujjwalgupta-net/digi-dine',
    metrics: [
      { label: 'Order Processing', value: '<45 ms' },
      { label: 'Peak Concurrency', value: '500+ Req/min' },
      { label: 'Payment Reliability', value: '99.98%' }
    ]
  },

  // 6. Hotel Management Desktop System
  {
    id: 'hotel-management-system',
    title: 'Hotel Management Desktop System | Operations Automation',
    tabCategory: 'fullstack',
    displayBadge: 'Software & Database Architecture',
    headline: 'Enterprise desktop operations platform covering room allocation matrices, guest billing, and inventory control.',
    overview: 'Developed a robust Java desktop operations system utilizing Java Swing and JDBC to interface with a normalized MySQL relational database, automating reservation lifecycles, real-time room availability, and tax-calculated invoice generation.',
    architectureDetails: [
      'Relational Database Modeling: Designed 3NF normalized MySQL database with strict foreign-key integrity constraints preventing double-booking anomalies.',
      'Real-Time Room Availability Matrix: Created dynamic graphical floor maps displaying room occupancy states (Occupied, Reserved, Cleaning, Vacant) updated live via JDBC query listeners.',
      'Automated Billing Engine: Automated room tariff, food service, and applicable GST/tax rate calculations with instantaneous PDF invoice compilation.',
      'Defensive Security: Implemented parameterized PreparedStatements across all query builders to guarantee complete immunity against SQL injection.'
    ],
    techStack: ['Java', 'MySQL', 'JDBC Connection Pooling', 'Java Swing', 'OOP Design', 'Jasper Reports'],
    interactiveType: 'room_matrix',
    simulationAvailable: true,
    githubUrl: 'https://github.com/ujjwalgupta-net/hotel-management-java',
    metrics: [
      { label: 'Data Integrity', value: '100% ACID' },
      { label: 'GUI Framework', value: 'Java Swing' },
      { label: 'Query Security', value: 'PreparedStmts' }
    ]
  },

  // 7. 2D Retro Snake Engine
  {
    id: 'snake-game-engine',
    title: '2D Retro Snake Engine | Object-Oriented Arcade Core',
    tabCategory: 'fullstack',
    displayBadge: 'Software & Game Physics',
    headline: 'Modular object-oriented 2D arcade engine with discrete grid coordinate physics, collision detection, and score serialization.',
    overview: 'Engineered an object-oriented 2D game engine in Python utilizing Pygame, implementing custom fixed-tick update loops, Cartesian grid spatial collision algorithms, dynamic snake body segment queues, and persistent high-score serialization.',
    architectureDetails: [
      'Fixed-Tick Physics Loop: Structured deterministic game loop decoupling rendering frame rate from logic updates to ensure consistent movement speed across varied hardware.',
      'Discrete Coordinate Tracking: Represented the snake body as an efficient FIFO deque of coordinate vectors, evaluating self-intersections and boundary collisions in $O(1)$ time.',
      'State Machine Architecture: Implemented clean finite-state machine (FSM) governing state transitions between Menu, In-Game, Paused, and Game-Over screens.',
      'Persistent High-Score Storage: Serialized encrypted local score records with validation checksums to prevent record tampering.'
    ],
    techStack: ['Python', 'Pygame', 'OOP Architecture', 'Vector Physics', 'FSM State Machine', 'JSON Serialization'],
    interactiveType: 'game_loop',
    simulationAvailable: true,
    githubUrl: 'https://github.com/ujjwalgupta-net/python-snake-engine',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS Fixed' },
      { label: 'Collision Logic', value: 'O(1) Spatial' },
      { label: 'Architecture', value: 'OOP / FSM' }
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'ccna-200-301',
    title: 'Cisco Certified Network Associate (CCNA)',
    issuer: 'Cisco Systems',
    code: '200-301 CCNA',
    badgeType: 'cisco',
    status: 'VERIFIED',
    issueDate: '2025',
    verificationId: 'CSCO-CCNA-84920419',
    domains: [
      'Network Fundamentals (20%) - Routers, switches, topology architectures, IPv4/IPv6',
      'Network Access (20%) - VLANs, 802.1Q, EtherChannel, Spanning Tree (RSTP)',
      'IP Connectivity (25%) - Routing tables, static routing, OSPFv2 Area 0 point-to-point & broadcast',
      'IP Services (10%) - NAT/PAT, NTP, DHCP snooping, DNS, SNMPv3, Syslog',
      'Security Fundamentals (15%) - Extended ACLs, Port Security, AAA, VPN fundamentals',
      'Automation & Programmability (10%) - REST APIs, JSON data structures, Ansible/Puppet concepts'
    ]
  },
  {
    id: 'linux-essentials',
    title: 'Linux Essentials Certificate',
    issuer: 'Linux Professional Institute (LPI)',
    code: '010-160',
    badgeType: 'linux',
    status: 'VERIFIED',
    issueDate: '2024',
    verificationId: 'LPI-LE-93021844',
    domains: [
      'Linux Community & Open Source Ecosystem',
      'Command Line Navigation, Streams, Pipes & Redirection',
      'File System Hierarchy (FHS), Archiving & Permissions (rwx/SUID)',
      'User Accounts, Groups & Process Management (ps, top, kill)'
    ]
  },
  {
    id: 'cyber-connecting-networks',
    title: 'Cyber Connecting Networks (CCN)',
    issuer: 'Cisco Networking Academy',
    badgeType: 'cyber',
    status: 'VERIFIED',
    issueDate: '2024',
    verificationId: 'NETACAD-CCN-719302',
    domains: [
      'Hierarchical Network Design & Redundancy',
      'WAN Technologies, VPNs & IPSec Tunnels',
      'Threat Mitigation & Switch Port Security Defense'
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'B.E. in Electronics & Telecommunication (EXTC)',
    institution: 'Xavier Institute of Engineering, Mumbai',
    location: 'Mumbai, India',
    period: '2021 – 2025',
    score: '6.89 CGPA',
    specialization: 'Computer Networking, Telecommunication Protocols, Microcontrollers & Embedded Systems',
    highlights: [
      'Rigorous coursework in Data Communication, Computer Networks, Microwave & Optical Communication, and Embedded Systems.',
      'Hands-on lab work in Cisco Packet Tracer, Wireshark packet capture, digital signal processing, and microcontrollers (8051, STM32).'
    ]
  },
  {
    degree: 'Higher Secondary Certificate (HSC) - EXTC / Science',
    institution: 'Maharashtra State Board',
    location: 'Mumbai, India',
    period: '2019 – 2021',
    score: '89.60%',
    specialization: 'Electronics, Physics, Mathematics, Chemistry',
    highlights: ['Distinction with 89.60% score in board examinations.']
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Maharashtra State Board',
    location: 'Mumbai, India',
    period: '2019',
    score: '69.80%',
    specialization: 'General Sciences & Mathematics',
    highlights: ['Foundational grounding in mathematics and science.']
  }
];

export const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 'host-vlan10',
    name: 'Staff PC (VLAN 10)',
    type: 'host',
    ip: '192.168.10.15',
    mac: '00:1A:2B:3C:4D:11',
    vlan: 10,
    vlanName: 'Staff_Operations',
    subnet: '192.168.10.0/24',
    status: 'UP',
    x: 100,
    y: 120,
    description: 'Staff workstation requiring access to Admin servers and Internet via NAT.',
    activeAcl: 'Standard User Permitted'
  },
  {
    id: 'host-vlan20',
    name: 'Admin Server (VLAN 20)',
    type: 'host',
    ip: '192.168.20.50',
    mac: '00:1A:2B:3C:4D:22',
    vlan: 20,
    vlanName: 'Admin_Management',
    subnet: '192.168.20.0/24',
    status: 'UP',
    x: 100,
    y: 340,
    description: 'Internal protected server running critical management services.',
    activeAcl: 'Strict ACL 101 Enforced'
  },
  {
    id: 'sw-access',
    name: 'Access Switch (2960)',
    type: 'switch',
    ip: '192.168.10.2 (SVI)',
    mac: '00:0C:85:1F:A1:01',
    vlan: 1,
    subnet: 'VLAN 10 & 20 Access Ports',
    status: 'UP',
    x: 320,
    y: 230,
    description: 'Cisco Catalyst 2960 with 802.1Q trunk port uplink and Port-Security enabled.',
    activeAcl: 'MAC Sticky Max 2'
  },
  {
    id: 'sw-core',
    name: 'Core Distribution Switch',
    type: 'switch',
    ip: '192.168.1.2',
    mac: '00:0C:85:2B:B2:02',
    vlan: 1,
    subnet: '802.1Q Trunk Backbone',
    status: 'UP',
    x: 520,
    y: 230,
    description: 'Catalyst 3560 High-speed distribution layer carrying tagged VLAN frames.',
    activeAcl: 'VTP Transparent'
  },
  {
    id: 'rtr-stick',
    name: 'Router-on-a-Stick (2911)',
    type: 'router',
    ip: '192.168.10.1 / 192.168.20.1',
    mac: '00:D0:D3:55:01:AA',
    subnet: 'Sub-interfaces g0/0.10, g0/0.20',
    status: 'UP',
    x: 720,
    y: 160,
    description: 'Inter-VLAN gateway running OSPF Area 0 with sub-interfaces for 802.1Q encapsulation.',
    activeAcl: 'ACL 101 Inbound'
  },
  {
    id: 'gw-nat',
    name: 'NAT/PAT Edge Gateway',
    type: 'gateway',
    ip: 'Inside: 192.168.1.1 | Outside: 203.0.113.15',
    mac: '00:D0:D3:55:99:BB',
    subnet: 'PAT Overload on g0/1',
    status: 'UP',
    x: 880,
    y: 280,
    description: 'Dynamic NAT/PAT gateway translating RFC1918 private addresses to routable public WAN IP.',
    activeAcl: 'PAT Pool Active'
  },
  {
    id: 'cloud-wan',
    name: 'Public Internet / WAN',
    type: 'cloud',
    ip: '203.0.113.1 / 8.8.8.8',
    mac: 'FF:FF:FF:FF:FF:FF',
    subnet: '0.0.0.0/0 (Default Route)',
    status: 'UP',
    x: 1040,
    y: 280,
    description: 'External autonomous network reached via default static route 0.0.0.0/0.',
    activeAcl: 'Stateful Return'
  }
];
