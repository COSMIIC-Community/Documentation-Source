---
sidebar_position: 3
---

# Script OpCodes

Operational Codes that can be used in .nnpscript files

---

## OpCode Reference

This page documents all of the operational codes that are native to the PM through the firmware source code at [**app/ScriptInterpreter.c**](https://github.com/COSMIIC-Community/Implantables-PM-App/blob/main/app/ScriptInterpreter.c) and in the NNP-API Script assembler at [**apps/Scripting/assembler.m**](https://github.com/COSMIIC-Community/NNP-API/blob/main/apps/Scripting/assembler.m). These opcodes are used to manipulate in variables, memory, and system state in .nnpscript scripts.

### Script Control

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `NOP` | 0 | 0 | No operation — skip |
| `EXIT` | 255 | 0 | Terminate script |
| `STARTSCPT` | 90 | 1 | Start script at pointer |
| `STOPSCPT` | 91 | 1 | Stop script at pointer |
| `RUNONCE` | 92 | 1 | Run script pointer once |
| `RUNIMM` | 93 | 1 | Run script pointer immediate |
| `RUNNEXT` | 94 | 1 | Run script pointer next |
| `RUNMULT` | 95 | 1 | Decode operand for starting scripts |
| `RESETGLOBALS` | 96 | 1 | Reset global vars for script (`0` = all) |
| `TDEL` | 70 | 1 | Time delay in milliseconds |

**Examples:**

```nnpscript
NOP
EXIT
STARTSCPT 21
STOPSCPT 7
TDEL 500
```

---

### System / Network

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `NMT0` | 2 | 2 | NMT command — node, cmd |
| `NMT1` | 3 | 3 | NMT command — node, cmd, param |
| `NMT2` | 4 | 4 | NMT command — node, cmd, 2 params |
| `GNS` | 71 | 1 | Get node status (Op0 = node → status) |
| `NODESCAN` | 97 | 1 | Scan for node |

**Examples:**

```nnpscript
NMT0 7 0x95 % hex value 0x95 sent to power module (node:7) turns the network ON
NMT1 7 0x8D 1 % hex value 0x8D sent to power module (node:7) starts script at Script ID:1
```

### Move

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `MOV` | 1 | 1 | Move value from source to destination |

**Examples:**

```nnpscript
MOV 100 => myVariable
MOV N7:1006.0 => syncPeriod
MOV $syncPeriod => N7:1006.0|UNS32
```

---

### Counter

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `INC` | 15 | 0 | Increment result register |
| `INCS` | 78 | 0 | Saturating increment result register |
| `DEC` | 16 | 0 | Decrement result register |
| `DECS` | 79 | 0 | Saturating decrement result register |

---

### Branch

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `GOTO` | 68 | 0 | Unconditional jump to label |
| `BEQ` | 62 | 2 | Branch if Op0 == Op1 |
| `BGT` | 61 | 2 | Branch if Op0 > Op1 |
| `BGTE` | 64 | 2 | Branch if Op0 >= Op1 |
| `BLT` | 60 | 2 | Branch if Op0 &lt; Op1 |
| `BLTE` | 65 | 2 | Branch if Op0 &lt;= Op1 |
| `BNE` | 63 | 2 | Branch if Op0 != Op1 |
| `BNZ` | 66 | 1 | Branch if Op0 != 0 |
| `BZ` | 67 | 1 | Branch if Op0 == 0 |
| `BBITON` | 69 | 2 | Branch if bit Op1 in Op0 is ON |
| `BBITOFF` | 72 | 2 | Branch if bit Op1 in Op0 is OFF |

For branch instructions, the **destination** operand is a code block label name.

**Examples:**

```nnpscript
GOTO => MainLoop
BEQ sensorValue threshold => DoAction
BNE count;0 => StimState
BLT temperature;$threshold  => TooHot
BNZ errorFlag => HandleError
BBITON statusReg 3  => BitIsSet
```

---

### Math

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `ABS` | 21 | 1 | `ABS(Op0)` → result |
| `ADD` | 10 | 5 | Add Op0 + Op1 + ... Opn |
| `ADDS` | 75 | 5 | Saturating add Op0 + Op1 + ... Opn |
| `SUB` | 11 | 2 | Subtract Op0 from Op1 |
| `SUBS` | 76 | 2 | Saturating subtract Op0 from Op1 |
| `MUL` | 12 | 5 | Multiply Op0 × Op1 × ... Opn |
| `MULS` | 77 | 5 | Saturating multiply Op0 × Op1 × ... Opn |
| `DIV` | 13 | 2 | Integer divide Op0 ÷ Op1 |
| `MODD` | 39 | 2 | Modulo division → remainder |
| `SIGN` | 50 | 1 | Returns +1, 0, or -1 based on sign of Op0 |
| `CHS` | 34 | 0 | Change sign of result register |
| `DIFF` | 14 | 2 | Absolute value of (Op0 − Op1) |
| `MAX` | 17 | 2 | Maximum of Op0 and Op1 |
| `MIN` | 18 | 2 | Minimum of Op0 and Op1 |
| `INTERPOL` | 100 | 3 | Interpolate X(Op0) in table Op1 (X values) against Op2 (Y values) → result (fixed-point) |

**Examples:**

```nnpscript
ADD counter 1 => counter
SUB maxValue currentValue => remaining
MUL frequency 10 => scaledFreq
DIV 1000 frequency => period
ABS error => absError
MAX a b => larger
MODD value 100 => remainder
```

---

### Trigonometry

All trig functions work in degrees.

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `SIN` | 43 | 1 | Sin(Op0°) → result |
| `COS` | 44 | 1 | Cos(Op0°) → result |
| `TAN` | 45 | 1 | Tan(Op0°) → result |
| `ASIN` | 46 | 1 | ArcSin(Op0) → result (degrees) |
| `ACOS` | 47 | 1 | ArcCos(Op0) → result (degrees) |
| `ATAN` | 48 | 1 | ArcTan(Op0) → result (degrees) |
| `ATAN2` | 49 | 2 | ArcTan2(y=Op0, x=Op1) → result (degrees) |

---

### Fixed-Point Arithmetic

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `ITQ` | 24 | 1 | Integer to fixed-point |
| `UTQ` | 25 | 1 | Unsigned integer to fixed-point |
| `QTI` | 31 | 1 | Fixed-point to integer |
| `QTU` | 32 | 1 | Fixed-point to unsigned integer |
| `QTS` | 33 | 2 | Fixed-point to string; field width = Op1 |
| `ADDQ` | 26 | 2 | Fixed-point addition Op0 + Op1 → result |
| `SUBQ` | 27 | 2 | Fixed-point subtraction Op0 − Op1 → result |
| `MULQ` | 28 | 2 | Fixed-point multiplication Op0 × Op1 → result |
| `DIVQ` | 29 | 2 | Fixed-point division Op0 ÷ Op1 → result |
| `SQRTQ` | 30 | 1 | Square root of Op0 → result |

---

### Bit Operations

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `AND` | 37 | 2 | Bitwise AND |
| `OR` | 38 | 2 | Bitwise OR |
| `XOR` | 40 | 2 | Bitwise exclusive OR → result |
| `COMP` | 41 | 1 | Bitwise complement Op0 → result |
| `SLFT` | 20 | 2 | Op0 &lt;&lt; Op1 (logical shift left) |
| `SRGT` | 19 | 2 | Op0 >> Op1 (logical shift right) |
| `SIL` | 35 | 2 | Arithmetic shift left |
| `SIR` | 36 | 2 | Arithmetic shift right |
| `BITON` | 22 | 2 | Set bit Op1 in Op0 → result |
| `BITOFF` | 23 | 2 | Clear bit Op1 in Op0 → result |
| `BITSET` | 73 | 2 | Set or clear bit Op1 based on Op0 (0 = clear, ≠0 = set) → result |
| `BITCNT` | 74 | 1 | Count number of set bits in Op0 → result |
| `BBITON` | 69 | 2 | Branch if bit Op1 in Op0 is ON |
| `BBITOFF` | 72 | 2 | Branch if bit Op1 in Op0 is OFF |

---

### Vector Operations

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `FIFO` | 104 | 1 | First-in first-out shift: `Buf[i] = Buf[i-1]`, `Buf[0]` = new value → Buf |
| `VECMOV` | 105 | 4 | Vector move: source array, source start index, dest start index, count → dest array |
| `VECADD` | 121 | 2 | VectorA + VectorB (or scalar) → vector |
| `VECSUB` | 122 | 2 | VectorA − VectorB (or scalar) → vector |
| `VECMUL` | 123 | 2 | VectorA × VectorB element-wise (or scalar) → vector |
| `VECDIV` | 124 | 2 | VectorA ÷ VectorB element-wise (or scalar) → vector |
| `VECDOT` | 125 | 2 | VectorA · VectorB → dot product (scalar) |
| `VECSUM` | 113 | 1 | Sum of all elements → scalar |
| `VECPROD` | 114 | 1 | Product of all elements → scalar |
| `VECMEAN` | 112 | 1 | Mean of all elements → scalar |
| `VECMED` | 110 | 1 | Median value → scalar |
| `VECMEDI` | 111 | 1 | Index of median value → scalar |
| `VECMAX` | 106 | 1 | Maximum element value → scalar |
| `VECMAXI` | 107 | 1 | Index of maximum element → scalar |
| `VECMIN` | 108 | 1 | Minimum element value → scalar |
| `VECMINI` | 109 | 1 | Index of minimum element → scalar |
| `VECMAG` | 115 | 1 | Vector magnitude → scalar |
| `VECMAG2` | 116 | 1 | Vector magnitude squared → scalar |

---

### String Operations

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `ITS` | 6 | 2 | Integer to string; Op0 = value, Op1 = field width |
| `ITS0` | 8 | 2 | Integer to null-terminated string; Op1 = field width |
| `UTS` | 7 | 2 | Unsigned integer to string; Op1 = field width |
| `UTS0` | 9 | 2 | Unsigned integer to null-terminated string; Op1 = field width |
| `CATMOV` | 5 | 5 | Concatenate Op0 + Op1 + ... → result |
| `CATMOV0` | 80 | 5 | Concatenate Op0 + Op1 + ... → result with null terminator |
| `CATMOVCR` | 81 | 5 | Concatenate Op0 + Op1 + ... → result with carriage return |
| `SUBSTR` | 42 | 3 | Substring: Op0 = string, Op1 = start index, Op2 = length → result |

**Examples:**

```nnpscript
ITS myInt 5 => myStr
SUBSTR fullString 0 4 => firstFour
```

---

### Logging

| OpCode | Op# | Operands | Description |
| --- | --- | --- | --- |
| `FILE_CLOSE` | 89 | 1 | Close log file (Op0 = file ID) |
