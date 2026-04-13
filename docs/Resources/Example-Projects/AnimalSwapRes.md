---
sidebar_position: 3
---

# Reduce Stimulation Amplitude

Adjust the stimulation amplitude to a lower range by replacing a resistor on the PG4 board.

---

## Overview

The Translational Neuro Engineering Lab at Scuola Superiore Sant'Anna is studying several neuromodulation techniques in animal models. Because these applications interface directly with the peripheral nervous system, they require lower stimulation levels and finer resolution than the original COSMIIC system design for muscular activation.

### Contributors

- Scuola Superiore Sant'Anna Lab: Filippo Castellani, Alice Gianotti, Francesco Iberite, Silvestro Micera
- COSMIIC team: Jerry Ukwela, Chris Rexroth

---

## Modifications

The goal was to reduce the stimulation amplitude range from ```[1 mA - 20 mA]``` at 1 mA resolution to ```[100 uA - 2000 uA]``` at 100 uA resolution.

### Design Thinking

Given the PG4 version in use (Rev. B) and the fact that the change is intended to be permanent, a hardware modification is more appropriate than a firmware change. Future versions of the PG4 should make amplitude-range adjustments easier to implement in firmware.

Take a look at R67 on the stimulation output schematic from our GitHub. This is the circuitry for the PG4. The current output is based on an input voltage divided by that R67. The current range and resolution will scale inversely with changes made to R67. To scale the current amplitude range down by 10, R67 was swapped with a 56ohm*10 = 560ohm resistor. The next version of the PG4 (version E) will be easier to make firmware changes and use the full resolution of the DAC. That will be ready in about 6 months.

![2D view of circuit schematic for stimulation output](./img/resistorswap-schematic.png)

Here is the view of that resistor's location on the pcbdoc viewer. Shown here as R10, it seems one version of the schematic has that resistor as R67 and another as R10. It is still a 56ohm resistor regardless.

![3D view of PG4 circuit board](./img/resistorswap-location.png)

|Picture of PG4 board after resistor substitution                         | Notes                            |
|-------------------------------------------------------------------------|----------------------------------|
|![Picture of PG4 board after resistor swap](./img/resistorswap-board.png)| Here is the picture of the board after the previous SMD resistor was removed and the new one soldered in.|

## Application

While the PG4 was originally designed for muscular activation, the modified PG4 was specifically customized/modified for neuromodulation applications.

![Cosmiic evaluation kit employed for Neural Stimulation](./img/SSSA_Cosmiic_eval_kit_for_Neural_Stimulation.png)

The modified PG4 was used in a preliminary animal experiment to test its performance in vivo. The experiment involved stimulating the pudendal nerve of a pig (Sus Scrofa Domesticus) and recording the resulting muscle activity of the External Anal Sphincter. The stimulation was delivered through a TIME (Transverse Intrafascicular Multichannel Electrode). The Electromyographic (EMG) signals were recorded using needle electrodes placed percutaneously in the muscle.

![Picture of experimental setup for in vivo testing](./img/SSSA_Cosmiic_eval_kit_Experimental_Setup.png)

Preliminary results showed the ability to evoke muscle activity with the modified PG4. 

![Picture of experimental and preliminary results](./img/SSSA_Cosmiic_eval_kit_Schematic_Exp_Setup.png)

Further experiments are needed to fully characterize the performance of the modified PG4 as compared to standard stimulation devices.

### Forks of Repository

No modifications were made to the firmware or hardware repositories for the modules involved.

---

## Attributions

Supported by the NIH SPARC HORNET program, the Case Western Reserve University team is funded by main award U41NS129436-03 and is interacting with the Scuola Superiore Sant'Anna as an early adopter.
