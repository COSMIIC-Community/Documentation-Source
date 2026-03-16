---
sidebar_position: 2
---

# Licensing

How you can use and redistribute our technology and documentation

---

## Summary of Licenses

In July 2024, COSMIIC Inc, a B-corp formed in parallel with the COSMIIC grant, finalized a license agreement with Case Western Reserve University. The non-exclusive agreement granted COSMIIC Inc the privilege of sublicensing to the world all former intellectual property related to the COSMIIC System + new developments under the NIH SPARC HORNET program.

To ensure maximally-permissive use of COSMIIC source files and documentation, we have chosen mixed license approach to licensing the different materials you will find on our webpages and GitHub. The licenses allow unrestricted development and commercial applications. All we ask of you is that you spread the word and provide attribution to COSMIIC. Below is a summary to our approach so that you can always understand how you are able to use our materials.

### Hardware Source File Licensing - CERN-OHL-P-2.0

Hardware-related files are licensed to open source users by COSMIIC under the CERN Open Hardware License - Permissive - v2 (CERN-OHL-P-2.0). Refer to the **[license text](https://ohwr.org/cern_ohl_p_v2.txt)** and **[user guide](https://ohwr.org/project/cernohl/-/wikis/uploads/8a6b5d01f71c207c49493e4d114d61e6/cern_ohl_p_v2_howto.pdf)** to understand your permissions.

All files of this category are hosted across COSMIIC GitHub repositories. This includes, but is not limited to...

- Mechanical Design
    - 3D CAD Files (parts and assemblies, multiple file types)
    - Mechanical Drawings (parts and assemblies, mulitple file types)
- PCB Design
    - Fabrication (Gerber and Drill files)
    - Assembly (Pick and Place, BOM)
    - Archive (Schematics, multiple file types)

### Firmware and Software Source File Licensing - MIT

Firmware and software files are licensed to open source users by COSMIIC under the MIT License. Refer to the **[license text](https://mit-license.org/)** to understand your permissions.

All files of this category are hosted across COSMIIC GitHub repositories. This includes, but is not limited to...

- Firmware
    - Module source code (bootloaders and applications)
    - External wireless components source code
- Software
    - API in Matlab
    - Assorted Matlab apps
    - Tools and processes, such as custom linters and GitHub Action workflow files

### Documentation Licensing - CC-BY-4.0

Files containing documentation of the COSMIIC System and user ecosystem in supplement to the above listed filetypes are licensed to open source users by COSMIIC under the Creative Commons Attribution Only License (CC-BY-4.0). Refer to the **[license text](https://creativecommons.org/licenses/by/4.0/legalcode.txt)** to understand your permissions.

Note: Attribution is REQUIRED for sharing of documentation, modified or unmodified. In the case you are redistributing COSMIIC documentation, CC-BY-4.0 mandates that "You must give appropriate credit, provide a link to the license, and indicate if changes were made" (per **[legal code page](https://creativecommons.org/licenses/by/4.0/legalcode.en)**).

These materials are mostly hosted on this site and cosmiic.org. This docs.cosmiic.org site is built using Markdown (.md) files and the Docusaurus tool through GitHub Actions in a **[COSMIIC GitHub repository](https://github.com/COSMIIC-Community/Documentation-Source)**. Files in the /docs/ folder of this repository are licensed under CC-BY-4.0. This includes, but is not limited to...

- Documentation of system components and system architecture, .md and other archival file types
- Test reports
- Fabrication instructions
- Software build instructions
- Example documents
    - Example IDE
    - Example BEP

---

## Description of Materials

The technology of the COSMIIC System is involved in multiple patents, grants, and regulatory filings. We are releasing all relevant design and documentation related to the below patents, which includes all hardware, software and other technology described in:

- The Early Feasibility Study of the Networked Neuroprosthesis IDE G0140225 and its subsequent amendments
- All or any of the inventions and developments described or disclosed therein, patents, patent applications (including but not limited to those referenced below)
- Any formulations, compositions, methods and physical embodiments thereof, test data, test procedures, test methods, figures, manuscripts, regulatory filings, regulatory correspondence
- All work funded by the NIH SPARC HORNET Grant U41-NS129436, titled "The Cleveland Open Source Modular Implant Innovators Community."

### Neural Prosthesis  

**Patent #:** :file_folder: [US-9108060-B2](./img/9108060.pdf)  
**Filed:** 2013-08-01   **Issued:** 2015-08-18  
**Assignee:** Case Western Reserve University  

**Abstract (from USPTO filing):** "A neural prosthesis includes a centralized device that can provide power, data, and clock signals to one or more individual neural prosthesis subsystems. Each subsystem may include a number ofindividually addressable, programmable modules that can be dynamically allocated or shared among neural prosthetic networks to achieve complex, coordinated functions or to operate in autonomous groups."

This patent is the continuation of the following parent patents that were filed and issued prior:

| Patent # (download link) | Filed | Issued | Assignee |
|---|---|---|---|
| :file_folder: [US-7260436-B2](./img/7260436.pdf) | 2002-10-16 | 2007-08-21 | Case Western Reserve University |
| :file_folder: [US-8532786-B2](./img/8532786.pdf) | 2007-08-21 | 2013-09-10 | Case Western Reserve University |
| :file_folder: [US-8768482-B2](./img/8768482.pdf) | 2012-06-16 | 2014-06-01 | Case Western Reserve University |

### Asymmetrical Force Connector System

**Patent #:** :file_folder: [US-10634181-B2](./img/10634181.pdf)  
**Filed:** 2013-03-12   **Issued:** 2020-04-28  
**Assignee:** Case Western Reserve University  

**Abstract (From USPTO filing):** "An asymmetrical-force connector system includes a socket having a longitudinally-oriented shaft bore defining a bore axis. A spring-receiving cavity is coaxial with the bore axis and extends laterally around the shaft bore. The spring-receiving cavity has an inner circumference that is open to the shaft bore. A toroidal canted coil spring is located at least partially within the spring-receiving cavity. The toroidal canted coil spring has an inner spring circumference. A connector pin including a maximum shaft circumference is configured for selective sliding insertion into the shaft bore longitudinally from the front housing face. A v-groove extends laterally inward from the maximum shaft circumference toward the pin axis and defines a minimum shaft circumference. The connector pin is located in a maintenance position within the shaft bore when at least a portion of the toroidal canted coil spring laterally extends into the v-groove beyond the maximum shaft circumference."
