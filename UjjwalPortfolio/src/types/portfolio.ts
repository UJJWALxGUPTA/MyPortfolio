export interface TelemetryData {
  rtt: number;
  packetLoss: number;
  status: 'ESTABLISHED' | 'SYN_SENT' | 'LISTENING' | 'DIAGNOSTIC';
  mtu: number;
  jitter: number;
  uptimeSeconds: number;
  packetsProcessed: number;
  bandwidthMbps: number;
  activeInterface: string;
}

export type SkillCategory = 
  | 'networking' 
  | 'backend_distributed' 
  | 'embedded_iot' 
  | 'tools_eda' 
  | 'os_scripting';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Expert' | 'Advanced' | 'Proficient';
  proficiencyPercent: number;
  osiLayer?: string;
  description: string;
  protocolStandard?: string;
  commandExample?: string;
  packetHeaderSummary?: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  status: 'CURRENT' | 'COMPLETED';
  statusColor: string;
  highlights: string[];
  hardwareTags: string[];
  metrics: { label: string; value: string }[];
}

export type ProjectFilterCategory = 'all' | 'fullstack' | 'networks' | 'embedded';

export interface ProjectItem {
  id: string;
  title: string;
  tabCategory: 'fullstack' | 'networks' | 'embedded';
  displayBadge: string;
  headline: string;
  overview: string;
  architectureDetails: string[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  interactiveType?: 'topology' | 'kafka_stream' | 'iot_schematic' | 'crm_analytics' | 'room_matrix' | 'game_loop';
  simulationAvailable: boolean;
  metrics: { label: string; value: string }[];
  keyProtocols?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  code?: string;
  badgeType: 'cisco' | 'linux' | 'cyber';
  status: 'ACTIVE' | 'VERIFIED';
  issueDate: string;
  expirationDate?: string;
  verificationId: string;
  domains: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  specialization: string;
  highlights: string[];
}

export interface TopologyNode {
  id: string;
  name: string;
  type: 'host' | 'switch' | 'router' | 'gateway' | 'cloud';
  ip: string;
  mac: string;
  vlan?: number;
  vlanName?: string;
  subnet?: string;
  status: 'UP' | 'WARNING' | 'STANDBY';
  x: number;
  y: number;
  description: string;
  activeAcl?: string;
}

export interface PacketTraceStep {
  fromNodeId: string;
  toNodeId: string;
  protocol: 'ICMP' | 'OSPF' | 'TCP' | '802.1Q' | 'NAT';
  info: string;
  status: 'PERMIT' | 'DENY' | 'ROUTED' | 'TRANSLATED';
}
