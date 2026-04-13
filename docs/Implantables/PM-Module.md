---
sidebar_position: 1
---

# PM - Power Module

Power and processing module with 2 network ports

---

## Component Overview

The Power Module is an implanted module that has two key functions. First, it houses the rechargeable Li-ion batteries that supply power to the entire NNP implanted system, along with the required recharging link and circuitry. Second, it contains the wireless MedRadio link for transcutaneous communication and system programming. The power module connects to the network through the network cable, placing power onto it for distribution to all remote modules. During functional operation, the power module primarily functions as the power source for the entire implanted NNP system. However, due to its significant processing power, it is capable of performing signal processing and data storage in support of the remote module functions when required.

![power module graphic](./img/power-module-resized.png)

---

## Technical Overview

The power module is designed to be implanted in the torso, typically either chest or abdomen, because these portions of the body can accommodate the power module package size. This location also allows convenient access for recharging through an inductive link, and easy surgical exposure for replacement. The power module contains a magnetically activated switch for emergency shut-down of the entire NNP system. This switch implements a failsafe shutdown function that will deenergize all of the power module circuitry in the presence of a strong, static magnetic field. The power module utilizes a 32 bit ARM-7 microprocessor, the NXP Semiconductor LPC2129 processor. The processor runs a real time operating system (RTOS). The power module has a titanium case with feedthroughs for the network connections and antenna wire. An epoxy header holds the connections and antenna. A polymer nest inside the case holds the batteries and circuitry in place. The coil for inductive battery recharging surrounds the circuitry inside the case. Three identical Li-ion rechargeable cells are connected in parallel to provide the NNP system power.

---

## Source Files

### Mechanical Design and Drawings

All files and drawings for the design of the Power Module are available on the COSMIIC GitHub here:

:link: **[Implantables-PM-Hardware/"Mechanical Design CAD Files" on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PM-Hardware/tree/main/Mechanical%20Design%20CAD%20Files)**

### PCB and Schematics

This repository is up-to-date with the newest version of the Power Module circuit board. This newest version is the PM1C, updated from the PM1B. Our team transitioned the design files from Altium to KiCad to enable increased free and open source interactions.

:link: **[Implantables-PM-Hardware/"NNP-DWG-115-004-000 PCB Files" on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PM-Hardware/tree/main/NNP-DWG-115-004-000%20PCB%20Files)**

### Firmware

:link: **[Implantables-PM-App on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PM-App)**

:link: **[Implantables-PM-Boot on COSMIIC GitHub](https://github.com/COSMIIC-Community/Implantables-PM-Boot)**

Guidance on the build and flash process are incoming.

---

## Coming soon...

Information on the fabrication process, manufacturing partners, and how to obtain Power Modules will be uploaded soon.