---
sidebar_position: 2
---

# Script Basics and Syntax

Structure of `.nnpscript` files and line syntax

---

## File Format

Script files use the `.nnpscript` extension and are plain text files. Each non-comment line is assembled into tokens (OpCode + operands) and compiled into a compact binary image for download to the Power Module. Comments and whitespace are stripped during assembly.

```nnpscript
% Script metadata and description
% Author: Your Name
% Created: YYYY-MM-DD

% Variable declarations
global uint8 myCounter = 0
stack uint16 tempValue = 0

% Code sections with labels
{Init}
MOV 0 => myCounter
GOTO => MainLoop

{MainLoop}
ADD myCounter 1 => myCounter
GOTO => End

{End}
NOP
```

---

## Comments

Comments begin with `%` and continue to the end of the line:

```nnpscript
% This is a single-line comment
MOV 5 => myVar % Inline comment
```

---

## Code Block Labels

Labels define jump targets for control flow. They must be enclosed in braces:

```nnpscript
{SectionName}
% Code goes here

{AnotherSection}
% More code
```

---

## Basic Script Line Form

Every executable line follows this pattern:

```nnpscript
OpCode  Operand  Operand  =>  Destination
```

- **OpCode** — from the OpCode list (e.g., `MOV`, `ADD`, `BEQ`)
- **Operands** — 0 to 5 inputs, depending on the OpCode
- **Destination** — result location, a jump label, or omitted

---

## Data Types

Scripts support the following data types. When writing to a network location, the type name is required (e.g., `N7:1F53.1|uint8`).

| Type | Size | Range | Notes |
| ---- | ---- | ----- | ----- |
| `uint8` | 8-bit | 0 to 255 | Unsigned byte |
| `uint16` | 16-bit | 0 to 65,535 | Unsigned short |
| `uint32` | 32-bit | 0 to 4,294,967,295 | Unsigned integer |
| `int8` | 8-bit | -128 to 127 | Signed byte |
| `int16` | 16-bit | -32,768 to 32,767 | Signed short |
| `int32` | 32-bit | -2,147,483,648 to 2,147,483,647 | Signed integer |
| `BOOL` | 8-bit | 0 or 1 | Boolean |
| `string` | variable | — | Text; cannot be used as an array |
| `FIXP` | 32-bit | — | Fixed point: 16-bit signed integer + 8-bit decimal |
| `BYTEARRAY` | variable | — | Byte array; can only be a constant |

---

## Variable Scope

Variables must be declared before use. Three scope levels are available, each with a different persistence model.

### Stack Variables (`stack`)

Temporary variables that **do not persist** between script executions. Memory is released when the script completes and the value is not accessible from other scripts.

**Syntax (text editor):**

```nnpscript
stack <type> <name> = <initial_value>
```

**Examples:**

```nnpscript
stack uint8 loopCounter = 0
stack int16 sensorReading = -1
stack string logPrefix = "Scan"
```

### Global Variables (`global`)

Persistent variables that **retain their values** between script runs. Accessible from other scripts running on the same module. Global variables are not shared across scripts directly.

**Syntax (text editor):**

```nnpscript
global <type> <name> = <initial_value>
```

**Examples:**

```nnpscript
global uint8 sessionCount = 0
global uint16 totalStimTime = 0
global uint8 systemState = 0
```

### Constant Variables (`const`)

Global in scope but **cannot change value** once declared.

**Syntax (text editor):**

```nnpscript
const <type> <name> = <initial_value>
const <type> <name>[<size>] = [<v1> <v2> ... <vN>]
```

**Examples:**

```nnpscript
const uint8 maxFrequency = 43
const uint8 patternList[7] = [1 2 3 4 5 6 9]
```

---

## Array Variables

Any integer data type may be stored as an array. The array size must be specified in the declaration. Strings cannot be arrays. Byte arrays can only be constants.

**Declaration:**

```nnpscript
const uint8 patternList[7] = [1 2 3 4 5 6 7]
stack uint8 channelAmps[4] = [0 0 0 0]
```

**Accessing array elements** — use brackets with an index after the variable name:

```nnpscript
% Read element at index 2
MOV patternList[2] => currentPattern

% Write to element at index 0
MOV 50 => channelAmps[0]
```

---

## Memory Addressing

NNPScript provides direct access to the Object Dictionary (OD) for reading and writing device parameters.

### Address Syntax

```nnpscript
% Simplified (most common)
N<NODE>:<INDEX>.<SUBINDEX>|<TYPE>

% Advanced
N<PORT,NETID>NODE:INDEX.SUBINDEX|TYPESPEC^NUMSUBINDICES
```

### Components

| Component | Description | Example |
| --------- | ----------- | ------- |
| `NODE` | Device node ID (PM=7, CT=8, RM=1-6,9-15) | `7` |
| `INDEX` | OD index in hexadecimal | `1006`, `1F53` |
| `SUBINDEX` | OD subindex in hexadecimal | `0`, `03`, `1A` |
| `TYPE` | Data type specifier | `uint8`, `uint32` |
| `^COUNT` | Number of consecutive subindices (optional) | `^2`, `^4` |

### Reading from OD

```nnpscript
MOV N7:1006.0|uint32 => syncPeriod
MOV N5:1018.3|uint32 => nodeSWRev
```

### Writing to OD

When writing, cast the destination with the type:

```nnpscript
MOV 50 => (uint32)N7:1006.0
MOV syncPeriod => (uint32)N7:1006.0
```

---

## Defined Variables (Memory Aliases)

`define` creates a named reference to a specific Object Dictionary location. These act as aliases to persistent memory locations and are resolved at assembly time.

**Syntax:**

```nnpscript
define <name> = N<node>:<index>.<subindex>|<type>
define <name> = N<node>:<index>.<subindex>^<count>|<type>
```

**Examples:**

```nnpscript
% Single value alias
define stimFreq = N7:1F57.5|uint8

% Array / multiple value alias: 2 consecutive subindices starting at subindex 3
define StimParams[] = N7:1F57.3^2|uint8
```

---

## Naming Conventions

| Element | Convention | Example |
| --------- | ----------- | --------- |
| Variables | camelCase | `stimFrequency`, `loopCounter` |
| Labels | PascalCase | `{StimActive}`, `{ErrorHandler}` |
| Constants | camelCase or UPPER | `maxFreq`, `MAX_FREQ` |
