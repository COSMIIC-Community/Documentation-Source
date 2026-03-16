---
sidebar_position: 6
---

# Basic Applications

Existing applications to get started with the COSMIIC System

---

### Required

- PM Development Board
- Optional: Any additional modules (PG4 and/or BP2 Development Boards)
- Wireless Link board + USB-C cable
- MATLAB
- Local clone of the [**NNP-API**](https://github.com/COSMIIC-Community/NNP-API) Github repository

---

## Common Apps in NNP-API

Open ../NNP-API as your working directory in Matlab and use the following commands in a script or Command Window


```matlab title="commonDevKitCommands.m"
%% create nnp artifact for access point. Select COM port.
nnp=NNPHELPERS()

%% confirm default radio settings
radioconfig(nnp)

%% qualitative overview of pm data output
pmtest(nnp)

%% qualitative overview of bp data output
bptest(nnp)

%% qualitative overview of pg data output
pgtest(nnp)

%% hook up remote module and confirm network connection
netscanner(nnp)

%% determine nodes / change node if necessary
rmbootloader(nnp)

%% demonstrate stim across 4 channels at remote module node
profiler(nnp)

%% demonstrate emg recording
emgRecordRaw(nnp)
```
## Coming soon...

Some "blinky"-like project to familiarize you with the system's network and capabilities