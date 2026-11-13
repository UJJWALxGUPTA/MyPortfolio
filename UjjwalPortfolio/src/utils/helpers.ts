import { PERSONAL_INFO, WORK_EXPERIENCE, FEATURED_PROJECTS, CERTIFICATIONS, EDUCATION_DATA } from '../data/portfolioData';

export function generateResumePlainText(): string {
  return `
================================================================================
                    UJJWAL GUPTA // TERMINAL PROFILE RESUME
    Full-Stack Software, Distributed Systems & Network Infrastructure Engineer
================================================================================
Email:    ${PERSONAL_INFO.email}
Phone:    ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub:   ${PERSONAL_INFO.github}
Status:   ${PERSONAL_INFO.status}

--------------------------------------------------------------------------------
[1] PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
${PERSONAL_INFO.headline}
Certified Cisco Network Associate (CCNA 200-301) and LPI Linux Essentials engineer with
proven execution across scalable distributed event pipelines (Apache Kafka, WebSockets),
full-stack multi-tenant web platforms (MERN), low-level embedded hardware (Arduino,
RFID, STM32, DM542 motor drives, 12V relays), and EDA tools (Ki-Cad, SPICE).

--------------------------------------------------------------------------------
[2] CERTIFICATIONS & CREDENTIALS
--------------------------------------------------------------------------------
${CERTIFICATIONS.map(c => `* ${c.title} (${c.issuer}) - Code: ${c.code || 'N/A'}\n  ID: ${c.verificationId} | Status: ${c.status}`).join('\n')}

--------------------------------------------------------------------------------
[3] WORK EXPERIENCE
--------------------------------------------------------------------------------
${WORK_EXPERIENCE.map(w => `
ROLE:     ${w.role}
COMPANY:  ${w.company} (${w.location})
PERIOD:   ${w.period} [${w.status}]
RESPONSIBILITIES:
${w.highlights.map(h => `  - ${h}`).join('\n')}
METRICS:
${w.metrics.map(m => `  * ${m.label}: ${m.value}`).join('\n')}
`).join('\n')}

--------------------------------------------------------------------------------
[4] KEY ENGINEERING SYSTEMS & PROJECTS
--------------------------------------------------------------------------------
${FEATURED_PROJECTS.map(p => `
PROJECT:  ${p.title}
CATEGORY: ${p.displayBadge}
STACK:    ${p.techStack.join(', ')}
OVERVIEW: ${p.overview}
ARCHITECTURE:
${p.architectureDetails.map(a => `  - ${a}`).join('\n')}
`).join('\n')}

--------------------------------------------------------------------------------
[5] TECHNICAL SKILLS MATRIX
--------------------------------------------------------------------------------
* Backend & Distributed: Apache Kafka, WebSockets (RFC 6455), Node.js, Express,
                         MongoDB, Java/JDBC, RESTful APIs, JWT Auth.
* Networking & Routing:  Cisco CCNA (200-301), OSPF Area 0, 802.1Q VLAN Trunks,
                         NAT/PAT Overload, Extended ACLs, TCP/IP, Wireshark DPI.
* Embedded & IoT:        Arduino, RFID (MFRC522), STM32 ARM Cortex, 12V Solenoid
                         Relay Circuits, DM542 Motor Tuning, IR/UV Laser Optics.
* Hardware & EDA Tools:  Ki-Cad (Schematic & PCB Layout), SPICE Simulation,
                         Arduino IDE, EzCad CAD Suite.
* OS, Scripting & IDEs:  Linux (Ubuntu/Debian), Bash Shell, Python/Pygame,
                         VS Code, Spyder, Turbo C++, POSIX Sockets.

--------------------------------------------------------------------------------
[6] EDUCATION
--------------------------------------------------------------------------------
${EDUCATION_DATA.map(e => `* ${e.degree}\n  ${e.institution} (${e.period}) | Score: ${e.score}`).join('\n\n')}

================================================================================
Generated from NOC Interface: ${PERSONAL_INFO.name} @ ${new Date().toISOString()}
================================================================================
`.trim();
}

export function downloadResumeFile() {
  const text = generateResumePlainText();
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Ujjwal_Gupta_FullStack_Network_Engineer_Profile.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
