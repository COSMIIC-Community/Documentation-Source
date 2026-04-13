---
sidebar_position: 2
---

# PG4 - Pulse Generator Module

4-channel IPG module

:link: **[Implantables-PG4-Hardware on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PG4-Hardware)**

---

## Component Overview

The four-channel pulse generator module (PG) is a remote module utilized for electrical stimulation of nerve and muscle tissue. The PG can deliver stimulation to four independent monopolar electrodes, using the metal case of the PG as the common return electrode. The PG is small enough to be located in the extremities, including the upper arm and forearm, thus minimizing electrode lead length and simplifying surgical lead routing. The PG is connected to the NNP network through a single network cable. The PG gains power from the network, receives data from the network that is utilized to determine the stimulation parameters that should be delivered, and places data on the network regarding its status. The PG has four total network connections, allowing a single PG to branch from a single network input to three network outputs.

![pulse](./img/pg.png)

---

## Technical Description

The PG has internal processing based on the AVR-core processor (Atmel AT90CAN128). Computational processing is used to identify relevant network data (typically control signal levels from the sensor module) and convert that data into the appropriate stimulus levels to each electrode based on pre-programmed patterns. These patterns are customized to provide the desired coordinated functional responses from each muscle and nerve. The PG combines three levels of failsafe mechanisms to assure that potentially damaging stimulation is not delivered: 1) hardware limits on total charge per pulse, 2) software limits on stimulation parameters, and 3) failsafe magnetic switches in both the PG and the power module.

---

## Source Files

### Mechanical Design and Drawings
All files and drawings for the design of the Biopotential Recording Module are available on the COSMIIC GitHub here:

:link: **[Implantables-PG4-Hardware/"Mechanical Design CAD Files" on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PG4-Hardware/tree/main/Mechanical%20Design%20CAD%20Files)**

### PCB and Schematics

:link: **[Implantables-PG4-Hardware/"NNP-DWG-125-001-000 PCB Files" on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PG4-Hardware/tree/main/NNP-DWG-125-001-000%20PG4%20PCB%20Files)**

### Firmware

:link: **[Implantables-PG4-App on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PG4-App)**

:link: **[Implantables-RemoteModule-Boot on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-RemoteModule-Boot)**  Note: the common Remote Modules Bootloader source code for the PG4/BP2 module version using an AVR microprocessor is being held private until certain proprietary code segments can be replaced. 

Guidance on the build and flash process are incoming.

## Coming soon...

Information on the fabrication process, manufacturing partners, and how to obtain Pulse Generator Modules will be uploaded soon.