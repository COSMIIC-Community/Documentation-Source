---
sidebar_position: 2
---

# NNP-API Apps

MATLAB App Designer GUIs for testing, configuring, and programming the COSMIIC System

---

## Overview

The NNP-API includes a collection of MATLAB App Designer applications (`.mlapp`) and supporting classes (`.m`) located in the `apps/` directory of the repository. These apps build directly on top of the `NNPCORE` and `NNPHELPERS` command layers to provide graphical user interfaces for functional testing, device configuration, firmware programming, and script development.

Each app accepts a shared `NNPCORE` or `NNPHELPERS` object so that a single serial connection to the Wireless Link can be used across multiple apps simultaneously. 

> Use in MATLAB command line: `appname.mlapp` is run by command `appname(nnp)`

To begin using, clone :link: [**NNP-API on COSMIIC GitHub**](https://github.com/COSMIIC-Community/NNP-API) and open as the project folder in MATLAB.

---

## Functional Test Apps

These apps wrap `NNPHELPERS` and `NNPCORE` commands into interactive GUIs designed to validate hardware during production testing and bring-up.

---

### `pmtest.mlapp` - Power Module Test

**Description**: A comprehensive functional test interface for the Power Module (PM). Surfaces voltage rails, battery status, and memory read/write operations in a single panel.

**Key features:**
- Monitor VSYS, VNET, VREC, and CAN load current in real time
- Display status for up to three battery cells (voltage, current, temperature, cycle count, status)
- Toggle the CAN network and set VNET level
- Read and write external flash, remote RAM, and EEPROM at arbitrary addresses
- Erase individual flash blocks for targeted memory management

**Use case:** Validating PM power delivery, battery management, and memory subsystems following firmware updates or hardware rework.

---

### `bptest.mlapp` - BP2 Production Test

**Description**: A functional test interface for the Biopotential Recording Module (BP2). Provides measurement tools for evaluating analog front-end signal quality and accelerometer function.

**Key features:**
- Select sensing channel and gain setting via dropdown controls
- Capture and display EMG/MES signals on a live axes plot
- Measure common-mode and differential amplitudes; compute CMRR (dB)
- Display FFT of the acquired signal for frequency-domain analysis
- Read input voltage (VIN), common-mode voltage (VIC), and VNET
- Display accelerometer data (X, Y, Z) with live plot
- Read BP2 PCB serial number and application firmware revision

**Use case:** Verifying analog signal chain integrity, gain accuracy, and common-mode rejection ratio of a BP2 sensing module on the bench or during production acceptance testing.

---

### `pgtest.mlapp` - PG4 Production Test

**Description**: A functional test interface for the Pulse Generator Module (PG4). Provides direct control over stimulation parameters on up to four channels and verifies electrical performance during production or bench testing.

**Key features:**
- Set pulse amplitude (PA, mA) and pulse width (PW, μs) per channel
- Read compliance voltage (VOS) and monitor output current
- Display accelerometer readings (X, Y, Z) from the on-board IMU
- Monitor PM network voltage (VNET) and toggle the CAN network
- Read PG4 PCB serial number and application firmware revision

**Use case:** Confirming that a newly assembled or repaired PG4 module delivers correct stimulation waveforms and that all sensors are functioning before implantation or deployment.

---

### `profiler.mlapp` - Stimulation Profiler

**Description**: A GUI for interactively tuning and managing stimulation parameters per channel and saving profile histories for later recall or export.

**Key features:**
- Increment or decrement PA and PW values using Up/Down buttons with configurable step sizes
- Zero PW instantly for safety during parameter adjustment
- Enable regulation mode with a target expression for automated amplitude control
- Maintain a history table of all parameter configurations with add, remove, sort, replace, and clear operations
- Save and load profile history to/from file
- Enable remote tuner mode for hardware-in-the-loop PA/PW control
- Clear stimulation error flags from the GUI

**Use case:** Systematically exploring stimulation parameters during research sessions, building a library of tested profiles and comparing them for a given subject or experimental condition.

---

## Network & Configuration Apps

These apps simplify essential processes for discovering nodes, configuring the radio link, and managing the network.

---

### `netscannerg.mlapp` - Network Scanner

**Description**: The primary network health and status dashboard for the COSMIIC System. Continuously polls all nodes and displays connection quality, system mode, and power data in a multi-column node table.

**Key features:**
- Scan all nodes (1–14) and display mode, RSSI, LQI, and attempt counts per node
- Highlight individual nodes for focused inspection
- Enter Patient, Test Stim, or Test Features mode from the GUI
- Enter low-power mode for a selected node
- Plot VNET over time with a resettable axes
- Log all status data to a timestamped file with optional comments
- Reset PM error counters
- Display AP RSSI and User ID fields for session annotation

**Use case:** The go-to monitoring app during system bring-up, bench testing, and research sessions. Provides a live overview of which nodes are connected, their signal quality, and the system mode.

---

### `radioconfig.mlapp` - Radio Configuration

**Description**: A GUI for reading and writing the radio communication settings of both the Wireless Link (Access Point) and the Power Module. Replaces manual calls to `getRadioSettings` / `setRadioSettings`.

**Key features:**
- Display live RSSI and LQI for both the AP and PM with a connection status lamp
- Configure AP settings: radio channel, TX power, USB timeout, radio timeout, retry count
- Configure PM TX power independently
- Set shared channel and address pair (AP address, PM address)
- Enable or disable Wake-on-Radio (WOR) with configurable wake interval
- Save AP settings to Wireless Link flash or apply to RAM only
- Optionally propagate changes to the PM over the radio link

**Use case:** Setting up or troubleshooting the radio link between the Wireless Link and PM. Changing the radio channel to avoid interference, tuning TX power for range, or enabling WOR to extend battery life.

---

### `odtest.mlapp` - Object Dictionary Test

**Description**: A general-purpose SDO read/write and NMT command GUI for any node on the network. Provides direct access to the CANopen Object Dictionary without writing MATLAB scripts.

**Key features:**
- Select target node from a dropdown (PM, RM nodes 1–14)
- Enter OD index and subindex (hex) and choose read or write direction
- Set number of consecutive subindices to read/write in a single operation
- Issue raw NMT commands with up to two parameters (hex entry)
- Display all responses in a scrollable text area with a clear button

**Use case:** Ad hoc inspection and modification of any Object Dictionary entry during development, debugging, or verification.

---

## Firmware Programming Apps

These apps manage firmware uploads to the PM and RM modules using the NNP bootloader protocol, wrapping `NNPCORE` memory-access and NMT commands into a guided flashing workflow.

---

### `pmbootloader2.mlapp` - Power Module Bootloader (v2)

**Description**: A firmware flashing tool for the Power Module. Handles the full programming sequence: entering the bootloader, erasing, writing, and verifying PM flash. A second-generation variant of `pmbootloader.mlapp`, sharing the same overall interface and workflow, updated to support the Wireless Link but not the original access point.

**Key features:**
- Read PM and AP firmware revision and serial number
- Enter or exit the PM bootloader; attempt a PM reset
- Configure and read PM radio settings from within the bootloader context (channel, address, TX power)
- Flash the PM application firmware from a user-selected file
- Option to include or exclude scripts and app data from the flash image
- Restore OD defaults after programming
- Display AP and PM RSSI/LQI and PM temperature throughout the process

**Use case:** Updating PM firmware in the field or lab, recovering a PM from a bad firmware state, or provisioning a new PM with a known-good image.

---

### `rmbootloader.mlapp` - Remote Module Bootloader

**Description**: A firmware flashing and node management tool for Remote Modules (RMs). Extends the bootloader workflow to scan and reassign nodes numbers.

**Key features:**
- Scan for connected RM nodes in continuous or listed-nodes mode
- Select a target node interactively from a scan result list
- Flash RM firmware with configurable steps: blank check, erase, write, verify
- Exit the bootloader and start the RM application after programming
- Start all nodes or a selected node from the bootloader
- Change node number
- Restore OD defaults on application start
- Display PM serial, app revision, VNET, and network status throughout

**Use case:** Programming new or replacement RM modules, changing a module's node number when reconfiguring a network, and recovering RMs from failed firmware states.

---

## Script Development Apps

These apps together form an embedded script development environment for writing, assembling, debugging, scheduling, and monitoring NNP PM scripts (.nnpscript) - the autonomous programs that run inside the implant.

---

### `scriptedit.mlapp` - Script Editor

**Description**: The central hub of the script development workflow. Provides a full-featured editor interface for writing `.nnpscript` files, assembling them, and downloading compiled images to the PM.

**Key features:**
- Open, edit, save, and export `.nnpscript` source files
- Assemble scripts using the `assembler` class and display compile output
- Download compiled scripts to a specified PM script slot (1–25)
- Read scripts back from PM flash for verification or inspection
- Delete scripts from individual PM slots
- Run, stop, and single-step scripts via integrated debug controls
- Display active and stored script tables with slot assignments
- Open the Script Scheduler, Script Trigger, and Variable Monitor sub-apps from the toolbar
- Export script libraries for sharing across projects

**Use case:** The primary tool for writing and deploying autonomous PM scripts. For example, programs that implement closed-loop stimulation or scheduled data logging entirely within the implant.

---

### `assembler.m` - Script Assembler

**Description**: A MATLAB class (not a GUI app) that parses `.nnpscript` source files and compiles them into binary download images for the PM. Used internally by `scriptedit.mlapp` but also callable from the command line for automated build workflows.

**Key features:**
- Parse NNP script assembly source with a full opcode table (80+ opcodes: arithmetic, logic, fixed-point math, string operations, NMT commands, branching, I/O)
- Resolve variable names, constants, and jump labels
- Produce a `downloadImage` byte array ready for `nnp.loadScript()`
- Support HTML-formatted syntax highlighting in the script editor list box
- Generate assembler logs saved alongside the source file

**Use case:** Compiling `.nnpscript` programs into binary images, either interactively through `scriptedit.mlapp` or in automated test scripts that need to build and deploy scripts programmatically.

---

### `debugger.m` - Script Debugger

**Description**: A MATLAB class that provides single-step debugging capability for NNP PM scripts. Integrates with `scriptedit.mlapp` and surfaces controls for stepping through script execution at the embedded level.

**Key features:**
- Single-step, run-to-line, and run-to-end execution modes
- Display and decode runtime script error codes (26 defined error types including `INVALID_OPCODE`, `DIVIDEBYZERO`, `GETNETWORKDATA`, and more)
- Launch stack and global variable monitors (`variablemonitor.mlapp`)
- Open the OD Test app (`odtest.mlapp`) and memory reader for inspection during a debug session
- Reset global variables without restarting the script
- Toggle literal value display in the assembler listing

**Use case:** Diagnosing incorrect script behavior, stepping instruction-by-instruction through a PM script and inspecting variables at each step to locate logic errors before deploying to a study participant's implant.

---

### `scriptsched.mlapp` - Script Scheduler

**Description**: A GUI for configuring the PM script execution schedule, controlling which scripts run, in what order, and at what period.

**Key features:**
- Display and edit the script execution order table (up to 25 slots)
- Set the global script execution period (ms)
- Configure a startup script slot (the script that runs automatically on PM boot)
- Configure RPDO-triggered script assignments (8 RPDOs, each mappable to a script slot and memory address)
- Refresh the scheduler state from the PM at any time
- Write changes to the PM in a single operation

**Use case:** Setting up the timing and sequencing of multiple PM scripts. For example, assigning a high-frequency stimulation script to run every 10 ms while a lower-frequency data logging script runs every 100 ms.

---

### `scripttrigger.mlapp` - Script Trigger Configuration

**Description**: A GUI for configuring event-based and time-based script triggers on the PM, allowing scripts to be launched automatically in response to external signals or real-time clock alarms.

**Key features:**
- Configure up to 4 real-time clock (RTC) alarms, each mapped to a script slot, with HH:MM:SS time entry
- Enable or disable the RTC alarm system globally
- Read and set the PM real-time clock (synchronize to computer time or enter manually)
- Configure up to 6 RPDO-triggered script assignments (address + script pointer per RPDO)
- Enable or disable RPDO-triggered script execution

**Use case:** Scheduling scripts to fire at specific times of day (e.g., a nightly stimulation program) or in response to incoming RPDO data packets from external sensors or control signals.

---

### `variablemonitor.mlapp` - Script Variable Monitor

**Description**: A live-updating table that displays the current values of PM script variables, either stack (local) or global scope, during script execution or debugging.

**Key features:**
- Display variable address, byte size, name, index, initial value, and live current value
- Highlight cells that have changed value since the last refresh
- Select between stack and global variable scope
- Manually refresh or run in polling mode via the `debugger` class integration
- Set the watch index to observe a specific variable region

**Use case:** Monitoring the internal state of a running PM script in real time. Used alongside `scriptedit.mlapp` and `debugger.m` to inspect variable values while stepping through or running a script.

---

### `scripthelp.mlapp` - Script Help / Opcode Reference

**Description**: A searchable, tabular reference for all NNP script assembly opcodes. Sourced directly from the `assembler` class opcode table to ensure it always reflects the current instruction set.

**Key features:**
- Display all opcodes in a sortable table: opcode name, byte value, operand count range, description
- Checkboxes indicate whether the opcode produces a result or performs a jump
- OpCodes tab and Syntax Tips tab for organized reference

**Use case:** Quick lookup of any NNP script instruction while writing or reviewing `.nnpscript` source. Particularly useful for researchers who are not yet familiar with the full instruction set.

---

### `scripthelpTableDemo.mlapp` - Script Help Table Demo

**Description**: A developer utility app that demonstrates the two rendering approaches for the opcode table in `scripthelp.mlapp` with side-by-side comparison of appearance and scroll performance.

**Use case:** Internal reference for developers maintaining the script help interface. Not intended for routine end-user operation.