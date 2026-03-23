---
sidebar_position: 4
---

# Software - MATLAB API

What is included in the NNP-API interface on MATLAB

---

## NNP-API Interface on MATLAB

The NNP-API is the MATLAB-based interface for communicating with the COSMIIC System (originally referred to as the NNP). NNP-API controls the **Wireless Link** (Access Point) device over USB serial to wirelessly communicate with the **Power Module (PM)** radio. The PM can then relay commands to the Remote Modules (RMs) in the system.

The interface is implemented as two layered MATLAB classes:

- **`NNPCORE`**: Low-level communication layer. Manages the serial port, Access Point radio settings, and core SDO/NMT radio protocols.
- **`NNPHELPERS`**: High-level layer with additional helpful functions. Provides convenient commands for common operations like changing system state, reading sensor data, and managing the network. Extends `NNPCORE`

To begin using, clone :link: [**NNP-API on COSMIIC GitHub**](https://github.com/COSMIIC-Community/NNP-API) and open as the project folder in MATLAB.

---

## Setup

### Constructing the Interface Object

```matlab
nnp = NNPHELPERS()         % Opens a port selection dialog
nnp = NNPHELPERS('COM3')   % Opens a specific serial port
```

The constructor opens a USB serial connection to the Wireless Link at 230400 baud. If no port is specified and multiple ports are available, a dialog box prompts the user to select one.

### Public Properties

| Property | Default | Description |
|---|---|---|
| `port` | `[]` | Serial port object used by the Wireless Link |
| `RSSI` | `0` | Received Signal Strength Indication of the last radio message (dBm) |
| `LQI` | `0` | Link Quality Indication of the last radio message |
| `verbose` | `0` | Verbosity level: `0` = silent, `1` = warnings only, `2` = all radio messages |
| `timeout` | `0.5` | Serial port response timeout (seconds) |
| `lastError` | `[]` | Description of the most recent error |

### Node Addressing

Most commands require specifying a **node** to address the modules in the COSMIIC System. The node is an identifier assigned to a module that allows it to be uniquely referenced on the CAN network and is used in the NNP-API commands and in embedded scripts. All devices have a node number. The node number can not be changed without engineering intervention, typically through the `rmbootloader.mlapp`. Node number typically exist between 1 and 15 inclusively. By convention, the Power Module is always assigned node number 7 and a former external device called the Control Tower is always assigned node number 8. Each node requires a standardized Object Dictionary (OD) for configuration, communicates using PDOs/SDOs

| Node Value | Target |
|---|---|
| `0` | Broadcast (all nodes - only valid for certain NMT commands) |
| `7` | Power Module (PM) |
| `8` | Control Tower  - obsoleted, not open source |
| `1`–`14` | Remote Modules (RMs) - typically 1-6 for PG4s and 9-14 for BP2s |

---

## NNPCORE - Low-Level Commands

These commands provide direct access to radio settings, the Object Dictionary, NMT messaging, and memory. They are used internally by `NNPHELPERS` and are also available for advanced use.

---

### Radio Configuration

---

#### `getRadioSettings`
Read the current Wireless Link radio settings.
```matlab
nnp.getRadioSettings()
```
- **Returns:** A struct with fields:
    - **`addrAP`**: Wireless Link radio address (1–254)
    - **`addrPM`**: Power Module radio address (1–254)
    - **`chan`**: Radio channel (0–9)
    - **`txPower`**: Transmit power level (0–46)
    - **`worInt`**: Wake-on-radio interval in ms (0 = WOR off, 14–255)
    - **`rxTimeout`**: Receive timeout in ms (0–255)
    - **`retries`**: Number of retry attempts (0–5)

---

#### `setRadioSettings`
Write a full radio settings struct to the Wireless Link.
```matlab
settings = nnp.setRadioSettings(settingsIn)
settings = nnp.setRadioSettings(settingsIn, save)
```
- **`settingsIn`**: Struct with the same fields as returned by `getRadioSettings`.
- **`save`** *(optional)*: `true` to persist settings to Wireless Link flash; `false` (default) for RAM-only (lost on power cycle).
- **Returns:** The confirmed `settings` struct after the write.

---

#### `getClearChannel`
Scan all radio channels and return the one with the lowest noise.
```matlab
[ch, rssi] = nnp.getClearChannel()
[ch, rssi] = nnp.getClearChannel(dwell)
```
- **`dwell`** *(optional)*: Time spent listening on each channel in ms (1–255). Default is `10` ms. Use ≥ 10 ms for MedRadio compliance.
- **Returns:**
  - `ch`: Channel number with clearest signal.
  - `rssi`: RSSI on that channel (dBm).

---

#### `getAPRev`
Read the Wireless Link firmware and hardware revision numbers.
```matlab
[sw, hw] = nnp.getAPRev()
```
- **Returns:** `sw` = software revision, `hw` = hardware revision.

---

### Wake-on-Radio (WOR)

---


#### `worOn`
Enable Wake-on-Radio (WOR) mode on the PM and configure the Wireless Link with long preambles. WOR reduces PM power consumption at the cost of bandwidth and latency.
```matlab
success = nnp.worOn()
success = nnp.worOn(wakeInterval)
```
- **`wakeInterval`** *(optional)*: Wake interval in ms. Default = `20`. Range: 14–255.
- **Returns:** `true` on success, `false` on failure.

---

#### `worOff`
Disable Wake-on-Radio mode on the PM and restore normal radio operation on the Wireless Link.
```matlab
success = nnp.worOff()
```
- **Returns:** `true` on success, `false` on failure.

---

### Read/Write Object Dictionary 

---

#### `read`
Read one or more entries from a node's CANopen Object Dictionary (SDO read or block read).
```matlab
dataOut = nnp.read(node, indexOD, subIndexOD)
dataOut = nnp.read(node, indexOD, subIndexOD, readType)
dataOut = nnp.read(node, indexOD, subIndexOD, numSubIndices)
dataOut = nnp.read(node, indexOD, subIndexOD, readType, numSubIndices)
```
- **`node`**: Target node (7 for PM, 1–15 for RM; broadcast `0` not allowed).
- **`indexOD`**: OD index as a 4-character hex string (e.g., `'1F53'`).
- **`subIndexOD`**: OD subindex as a 1–2 character hex string (e.g., `'0A'`) or a decimal integer (e.g., `10`).
- **`readType`** *(optional)*: Data type for casting. One of `'uint8'`, `'uint16'`, `'uint32'`, `'int8'`, `'int16'`, `'int32'`, `'string'`. Default: `'uint8'`.
- **`numSubIndices`** *(optional)*: Number of consecutive subindices to read (1–50). All must be the same scalar type. Default: `1`.
- **Returns:** OD data cast to the specified type.

**Example:**
```matlab
rev = nnp.read(7, '1018', 3, 'uint32')   % Read PM software revision
```

---

#### `write`
Write one or more entries to a node's CANopen Object Dictionary (SDO write or block write).
```matlab
dataOut = nnp.write(node, indexOD, subIndexOD, writeData)
dataOut = nnp.write(node, indexOD, subIndexOD, writeData, writeType)
dataOut = nnp.write(node, indexOD, subIndexOD, writeData, numSubIndices)
dataOut = nnp.write(node, indexOD, subIndexOD, writeData, writeType, numSubIndices)
```
- **`node`**: Target node (broadcast `0` not allowed).
- **`indexOD`**: OD index as a 4-character hex string.
- **`subIndexOD`**: OD subindex as a hex string or decimal integer.
- **`writeData`**: Data to write (will be cast to `writeType`).
- **`writeType`** *(optional)*: `'uint8'`, `'uint16'`, `'uint32'`, `'int8'`, `'int16'`, `'int32'`. Default: `'uint8'`.
- **`numSubIndices`** *(optional)*: Number of consecutive subindices to write. Default: `1`.
- **Returns:** `0` on success.

**Example:**
```matlab
nnp.write(7, '1006', 0, uint32(10), 'uint32')  % Set sync period to 10 ms
```

---

### NMT Commands

---

#### `nmt`
Send a CANopen Network Management (NMT) command directly to a node.
```matlab
dataOut = nnp.nmt(node, command)
dataOut = nnp.nmt(node, command, param1)
dataOut = nnp.nmt(node, command, param1, param2)
```
- **`node`**: Target node (7 for PM, 1–15 for RM, `0` for broadcast, `8` for CT).
- **`command`**: NMT command as a 1–2 character hex string (e.g., `'8B'`) or a decimal integer.
- **`param1`** *(optional)*: First parameter (0–255).
- **`param2`** *(optional)*: Second parameter (0–255).
- **Returns:** The echoed command byte on success, or empty on failure.

---

### Memory Access

---

#### `readFile`
Read the PM Log or OD Restore file from remote flash.
```matlab
dataOut = nnp.readFile(file, address, len)
dataOut = nnp.readFile(file, address, len, print)
dataOut = nnp.readFile(file, address, len, print, fileOut)
```
- **`file`**: `'log'` or `1` for the log file; `'param'`, `'odrestore'`, or `2` for the OD Restore file.
- **`address`**: Starting byte address within the file (use `0` to start at the beginning).
- **`len`**: Number of bytes to read, or `'all'` to read the entire file.
- **`print`** *(optional)*: Output format: `'ascii'`/`1`, `'bin'`/`2`, `'hex'`/`3`, or `0`/`false` for no printing.
- **`fileOut`** *(optional)*: File path to write output. If omitted, output is printed to the command line.
- **Returns:** Byte array of all data read.

---

#### `readMemory`
Read raw memory from a node (flash, EEPROM, or RAM).
```matlab
dataOut = nnp.readMemory(node, memSelect, address, len)
dataOut = nnp.readMemory(node, memSelect, address, len, print, fastMode, disableWOR, printAddress)
```
- **`node`**: Target node (broadcast `0` not allowed).
- **`memSelect`**: Memory region to read:
  - `1` / `'flash'` - Local flash (PM or RM)
  - `2` / `'remoteflash'` - Remote flash (PM only)
  - `3` / `'remoteram'` - Remote RAM (PM only)
  - `4` / `'eeprom'` - EEPROM (RM only)
  - `9` / `'ram'` - Local RAM (PM only)
- **`address`**: Starting address in decimal.
- **`len`**: Number of bytes to read.
- **`print`** *(optional)*: Print to command line if `true`. Default: `false`.
- **`fastMode`** *(optional)*: Use faster NMT-based read (requires PM firmware 404+). Default: `false`.
- **`disableWOR`** *(optional)*: Disable Wake-on-Radio during read for faster transfer. Defaults to `true` if `fastMode` is `true`. Default: `false`.
- **`printAddress`** *(optional)*: Print memory address alongside data. Default: `false`.
- **Returns:** Byte array of memory contents.

**Approximate timing for 512-byte PM flash read (default WOR interval 20 ms):**

| `fastMode` | `disableWOR` | Duration |
|---|---|---|
| `false` | `false` | ~3.6 s |
| `false` | `true` | ~2.4 s |
| `true` | `false` | ~1.2 s |
| `true` | `true` | ~0.5 s |

---

#### `loadScript`
Load compiled script data to a specified script slot on the PM.
```matlab
result = nnp.loadScript(SP, data)
```
- **`SP`**: Script pointer - the destination slot number (1–25).
- **`data`**: Byte array of compiled script data.
- **Returns:** `[1, 0]` on success.

A progress bar is displayed during the transfer. Closing the progress bar prompts for cancellation.

**Possible error messages:**

| Code | Meaning |
|---|---|
| 2 | Script pointer invalid |
| 3 | Script packet too short |
| 4 | Could not reset script control |
| 5 | Script too large |
| 6 | Script packet out of sequence |
| 7 | Could not validate script ID |
| 8 | Could not set script pointer |
| 9 | Could not load global variables (total across scripts may not exceed 400 bytes) |

---

### Connection Utilities

---

#### `refresh`
Close and reopen the USB serial port to recover from USB communication errors.
```matlab
nnp.refresh()
```

---

#### `flushInput`
Clear any pending bytes from the serial port input buffer.
```matlab
nnp.flushInput()
```

---

#### `isBusy`
Check whether the Wireless Link is currently processing a request.
```matlab
busy = nnp.isBusy()
```
- **Returns:** `true` if a transaction is in progress, `false` otherwise.

---

## NNPHELPERS - High-Level Commands

These are the most commonly used commands for everyday operation of the COSMIIC system. Many use commands from `NNPCORE` with specific values entered to create a more efficient and plain language layer.

---

### Network Status

---

#### `getNetworkStatus`
Returns whether the CAN network is currently on or off.
```matlab
status = nnp.getNetworkStatus()
```
- **Returns:** `1` = network on, `0` = network off.

---
#### `networkOn`
Turn the CAN network ON. The system must be in Waiting mode first.
```matlab
success = nnp.networkOn()
```
- **Returns:** `true` on success, `false` on failure.

---

#### `networkOff`
Turn the CAN network OFF. The system must be in Waiting mode first.
```matlab
success = nnp.networkOff()
```
- **Returns:** `true` on success, `false` on failure.

---

#### `networkOnBootloader`
Turn the CAN network ON without starting RM applications (leaves RMs in bootloader). The system must be in Waiting mode first.
```matlab
success = nnp.networkOnBootloader()
```
- **Returns:** `true` on success, `false` on failure.

---

### System Mode Status

---

#### `getStatus`
Returns a comprehensive snapshot of PM status and the node table.
```matlab
modes = nnp.getStatus()
modes = nnp.getStatus(nodes)
[modes, temp, vsys, net, rssi, lqi, group, lpm] = nnp.getStatus(nodes)
```
- **`nodes`** *(optional)*: Array of node numbers to query (default: `1:15`).
- **Returns:**
  - `modes`: Cell array of mode strings for each node.
  - `temp`: PM temperature (°C).
  - `vsys`: System voltage (V).
  - `net`: Network status (`1` = on, `0` = off).
  - `rssi`: PM radio RSSI (dBm).
  - `lqi`: PM radio LQI.
  - `group`: Active function group.
  - `lpm`: Low Power Mode status.

**Possible mode strings:** `'Waiting'`, `'TestPatterns'`, `'TestStim'`, `'Stopped'`, `'Patient'`, `'BootCheckReset'`, `'Test Patient Mode'`, `'Test Features'`, `'Test Raw'`, `'Charging'`, `'Not Connected'`, `'Unknown'`

---

#### `enterWaiting`
Command all nodes to enter Waiting mode.
```matlab
success = nnp.enterWaiting()
```
- **Returns:** `true` on success, `false` on failure.

---

#### `enterPatient`
Enter Patient (therapy delivery) mode.
```matlab
success = nnp.enterPatient()
success = nnp.enterPatient(pattern)
```
- **`pattern`** *(optional)*: Pattern number to activate on entry.
- **Returns:** `true` on success, `false` on failure.

---

#### `enterTestStim`
Enter Test Stimulation ("Y Manual") mode. Stimulation parameters are controlled directly.
```matlab
success = nnp.enterTestStim()
success = nnp.enterTestStim(mode)
```
- **`mode`** *(optional)*:
  - `0`: Stimulation values set directly in PG 3212.1–4.
  - `1`: Stimulation values set via PM; PDOs must be mapped appropriately.
  - `2`: Same as `1`, but updates only occur when a value changes.
- **Returns:** `true` on success, `false` on failure.

---

#### `enterTestPatterns`
Enter Test Patterns ("X Manual") mode for testing pre-programmed patterns.
```matlab
success = nnp.enterTestPatterns()
success = nnp.enterTestPatterns(pattern)
```
- **`pattern`** *(optional)*: Specific pattern number to activate.
- **Returns:** `true` on success, `false` on failure.

---

#### `enterTestRaw`
Enter Raw MES (Myoelectric Signal) mode for a specific node and channel.
```matlab
success = nnp.enterTestRaw(node, ch)
```
- **`node`**: Node number (1–15 for RM).
- **`ch`**: Channel number.
- **Returns:** `true` on success, `false` on failure.

---

#### `enterTestFeatures`
Enter Feature Extraction ("Produce X") mode.
```matlab
success = nnp.enterTestFeatures()
success = nnp.enterTestFeatures(mode)
```
- **`mode`** *(optional)*:
  - `0`: Feature values set directly in PG 3212.1–4.
  - `1`: Feature values set via PM; PDOs must be mapped appropriately.
  - `2`: Same as `1`, but updates only occur when a value changes.
- **Returns:** `true` on success, `false` on failure.

---

#### `enterLowPower`
Command a node to enter Low Power mode. **For RMs, a network power cycle is required to restore normal operation.**
```matlab
success = nnp.enterLowPower(node)
```
- **`node`**: Target node.
- **Returns:** `true` on success, `false` on failure.

---

#### `enterApp`
Wake a node (or all nodes) from the bootloader into the application.
```matlab
success = nnp.enterApp()          % Wakes all nodes
success = nnp.enterApp(node)      % Wakes specified node (0 = all)
```
- **`node`** *(optional)*: Node to wake; `0` wakes all. Defaults to `0`.
- **Returns:** `true` on success, `false` on failure.

---

#### `powerOff`
Power off the PM. A coil power cycle is required to restart.
```matlab
success = nnp.powerOff()
```
- **Returns:** `true` on success, `false` on failure.

---

#### `resetPM`
Reset (power off) the PM. A coil power cycle is required to restart. Equivalent to `powerOff`.
```matlab
success = nnp.resetPM()
```
- **Returns:** `true` on success, `false` on failure.

---

#### `getSwRev`
Get the software revision number of a node.
```matlab
rev = nnp.getSwRev()          % Queries PM (node 7) by default
rev = nnp.getSwRev(node)
```
- **`node`** *(optional)*: Target node. Defaults to `7` (PM).
- **Returns:** Software revision number.

---

#### `getSerial`
Get the PCB serial number of a node.
```matlab
sn = nnp.getSerial()          % Queries PM (node 7) by default
sn = nnp.getSerial(node)
```
- **`node`** *(optional)*: Target node. Defaults to `7` (PM).
- **Returns:** PCB serial number.

---

#### `getType`
Get the device type string of a node.
```matlab
type = nnp.getType()          % Queries PM (node 7) by default
type = nnp.getType(node)
```
- **`node`** *(optional)*: Target node. Defaults to `7` (PM).
- **Returns:** Device type as a string.

---

#### `getTemp`
Get the temperature of a node.
```matlab
temp = nnp.getTemp(node)
```
- **`node`**: Target node.
- **Returns:** Temperature in °C.

---

#### `getPower`
Read the net system power flowing into or out of the PM battery. This is a 5-second rolling average. Values may take up to 12 seconds to reach steady state after a mode transition.
```matlab
power = nnp.getPower()
```
- **Returns:** Net power in mW. Negative = discharging; positive = charging.

---

#### `getAccel`
Get the accelerometer reading for a node.
```matlab
accel = nnp.getAccel(node)
[accel, cnt, mag] = nnp.getAccel(node)
```
- **`node`** *(optional)*: Target node. Defaults to `7` (PM).
- **Returns:**
  - `accel`: 3-element vector `[x, y, z]` in g's. Returns `[Inf Inf Inf]` if sensor is not available.
  - `cnt`: Update counter.
  - `mag`: Magnitude of acceleration vector.

---

#### `checkPMStacks`
Returns the stack usage (as a percentage) for the 9 tasks running on the PM.
```matlab
stacks = nnp.checkPMStacks()
```
- **Returns:** 9-element array of stack usage percentages for tasks in order: App, CAN Server, CAN Timer, IO Scan, Sleep, Script, Tick, Idle, Stats.

---

### Network Voltage & Timing

---

#### `setVNET`
Set the PM network supply voltage. Valid range: 4.7–9.6 V.
```matlab
success = nnp.setVNET(V)
```
- **`V`**: Desired voltage in Volts.
- **Returns:** `true` on success, `false` on failure.

---

#### `getVNET`
Get the current PM network supply voltage.
```matlab
vnet = nnp.getVNET()
```
- **Returns:** Voltage in Volts.

---

#### `setSync`
Set the PM SYNC message interval.
```matlab
success = nnp.setSync(T)
```
- **`T`**: Interval in milliseconds.
- **Returns:** `true` on success, `false` on failure.

---

#### `getSync`
Get the current PM SYNC message interval.
```matlab
T = nnp.getSync()
```
- **Returns:** Interval in milliseconds.

---

### Time

---

#### `getTime`
Read the current date and time from the PM real-time clock.
```matlab
[year, month, day, dow, hour, min, sec] = nnp.getTime()
```
- **Returns:** Year, month, day, day-of-week, hour, minute, and second.

---

#### `setTime`
Synchronize the PM real-time clock to the current computer time.
```matlab
success = nnp.setTime()
```
- **Returns:** `true` on success, `false` on failure.

---

### Signal Parameters

---

#### `setBPGains`
Set the bandpass filter gain wiper values for both channels of a specified node.
```matlab
success = nnp.setBPGains(node, ch1, ch2)
```
- **`node`**: Target RM node.
- **`ch1`**: Gain wiper setting for channel 1.
- **`ch2`**: Gain wiper setting for channel 2.
- **Returns:** `true` on success, `false` on failure.

---

#### `getBPGains`
Get the current bandpass filter gain wiper values for both channels of a node.
```matlab
[ch1, ch2] = nnp.getBPGains(node)
```
- **`node`**: Target RM node.
- **Returns:** Gain wiper values for channel 1 and channel 2. Returns `NaN` if a channel could not be read.

---

### Save Object Dictionary

---

#### `saveOD`
Save a node's Object Dictionary to non-volatile memory.
```matlab
success = nnp.saveOD(node)
```
- **`node`**: Target node.
- **Returns:** `true` on success, `false` on failure.

---

### Data Logging

---

#### `getLogCursor`
Get the current PM log write cursor position (address in remote flash).
```matlab
A = nnp.getLogCursor()
```
- **Returns:** Current log address (uint32).

---

#### `flushLog`
Clear (erase) the PM log storage space.
```matlab
success = nnp.flushLog()
```
- **Returns:** `true` on success, `false` on failure.

---

#### `initDirectory`
Initialize the PM log directory.
```matlab
success = nnp.initDirectory()
```
- **Returns:** `true` on success, `false` on failure.

---

## Error Handling

The `nnp.lastError` property is updated after each failed operation with a descriptive string. Common error values:

| Error String | Cause |
|---|---|
| `'Radio Timeout'` | PM did not respond within the receive timeout window |
| `'Bad CRC'` | Radio message received with a bad CRC |
| `'PM Internal or CAN error'` | PM reported an internal or CAN bus error |
| `'PM response is too short'` | Radio response was shorter than expected |
| `'PM response does not echo request'` | Response header did not match the outgoing request |
| `'USB timeout'` | Wireless Link did not respond over serial |
| `'Bad Response'` | Wireless Link returned a malformed response |
| `'AP access denied'` | A new request was made while another was still in progress |
| `'Serial Port'` | Failed to write to or open the serial port |

---

## Transmit Error Codes

The internal `transmit` method returns an error code (`errOut`) for debugging:

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | PM internal or CAN error |
| `2` | PM response too short |
| `3` | Radio timeout |
| `4` | Unknown response from Wireless Link |
| `5` | USB timeout |
| `6` | PM response does not echo request |
| `7` | Bad CRC |