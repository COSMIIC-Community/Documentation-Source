---
sidebar_position: 2
---

# SC - Smart Charger

Driver of wireless charging of the COSMIIC System

---

## Source Files

### Mechanical Design and Drawings

Source files for the COSMIIC Smart Charger design and assembly will be found here on the COSMIIC GitHub :link: **[Externals-SC-Hardware on COSMIIC GitHub](https://github.com/COSMIIC-Community/Externals-SC-Hardware)**

### Firmware 

The Smart Charger is controlled by the Wireless Link and uses the same repository for firmware. :link: **[Externals-WL-App on COSMIIC GitHub](https://github.com/COSMIIC-Community/Externals-WL-App)**

:::warning note

Make sure `#define WL_IN_CHARGER` is set to `true` in `wirelesslink/src/cmdhandler.h` to orient the firmware build for use in the Smart Charger

:::

---

## Documentation

### Change Charger Mode

The Smart Charger can be operated as a standalone device using its buttons or as a computer-controlled device using the NNP-API commands in MATLAB. To change presets for standalone use, scroll to the [**Configure**](#configure-smart-charger-button-actions) section below. The following code block shows how the NNP-API can be used to set the charger mode:

```matlab
% this example enters the charger into "no feedback mode." Ideal for using the PM in bootloader mode because the PM relies on the wireless energy transfer (does not use batteries) when in bootloader mode.

% 0xA1 represents Wireless Link API command for CHG_SET_CHARGEMODE, the second argument is charge mode
nnp.transmitAP(0xA1, 6)

% 0xA0 represents the Wireless Link API command for CHG_GET_CHARGEMODE, the return value will be the charge mode
nnp.transmitAP(0xA0)
```

Full list of charge modes that can be read or set with `CHG_GET_CHARGEMODE` (0xA0) and `CHG_SET_CHARGEMODE` (0xA1) is in `wirelesslink/src/charger.h`. Common charge modes are as follows: 

```c
#define CHARGER_MODE_NONE	0
#define CHARGER_MODE_CLOCK	1 //main menu
#define CHARGER_MODE_CHARGE	2 //feedback charging
#define CHARGER_MODE_TUNE	3 //tuning
#define CHARGER_MODE_DETECT	4 //metal detector mode
#define CHARGER_MODE_POWERDOWN	5 //power down PM
#define CHARGER_MODE_CHARGE_NOFEEDBACK	6 //no feedback charging
```

### Configure Smart Charger Button Actions

After the first build and flash or any following full erase and flash, you must configure the orange and blue buttons. 

```matlab
% 0x30 represents Wireless Link API command for WL_SET_BUTTON_ACTION, first value in array represents button order, 0xFF is a SYNC byte, 0xA1 is the value for CHG_SET_CHARGEMODE, 4 is the length of this internal packet, and the final argument is the "payload" aka the charge mode value that is being set
% program short press button 1 to start charge (participant setup) 
nnp.transmitAP(0x30, [0 0xFF 0xA1 4 2]) 
% program short press button 2 to start metaldetect
nnp.transmitAP(0x30, [1 0xFF 0xA1 4 4])
% program long press button 1 to power down INC
nnp.transmitAP(0x30, [2 0xFF 0xA1 4 5])
% program long press button 2 to start autotune
nnp.transmitAP(0x30, [3 0xFF 0xA1 4 3])
```

:::tip

Typically, Smart Charger buttons are configured to change the charging mode. However, any Wireless Link API command can be set as a button function using the format above: `nnp.transmitAP(0x30, [button 0xFF Command packetlength valueforcommand])`.

:::

---

## Coming soon...

Source files for the Charging Coil design and assembly