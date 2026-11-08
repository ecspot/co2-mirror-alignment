# Mirrorline — CO₂ mirror alignment

Open **mirrorline.html** in a modern browser by double-clicking the file. All styling and JavaScript are inside that single file. No server, installation, account, or internet connection is needed.

## First use

1. **Mount setup:** select the three occupied corners from the four corner buttons. Label them as viewed from the screw heads. Enable the screws you want the calculation to use; hold the pivot screw fixed if your mount calls for it.
2. Enter the actual diameter of the circle you will plot against, and a center tolerance. Name the session and describe the target position. Observe the downstream target while adjusting the upstream mirror.
3. **Calibrate:** choose an enabled screw. Plot the observed starting hit, then select **Use as starting hit**. Make a small, known turn on only that screw. Enter the actual signed turns and plot the new hit. Save its response. Repeat for every enabled screw. Leave each screw where its test finishes; the next test uses a new starting hit.
4. **Align beam:** plot the current observed hit, including hits outside the circle, or type its X/Y coordinates. Select **Save hit & calculate turns**.
5. Apply the suggested turns manually. If you made different turns, open **Record different turns if needed** and enter those instead. Select **I applied these turns**.
6. Plot the new measured hit and select **Save result & calculate next**. Repeat until it is within your chosen tolerance.

**Positive turns mean clockwise; negative turns mean counterclockwise, looking directly at each screw head.** Target coordinates use +X to the right and +Y up. Keep your viewing orientation consistent.

The target accepts mouse/touch plotting and arrow-key adjustments. Arrow keys move the dot by 0.1 mm; Shift + arrow moves it by 1 mm. Wide views and numeric entry support spots outside the circle.

## Why calibration is necessary

Corner positions and a single spot do not establish the number or direction of turns. Screw pitch, support geometry, beam distance, and viewing orientation all affect the result.

Mirrorline measures the two-dimensional movement per signed turn of each enabled screw. It combines those measured responses using a least-squares calculation. With three enabled screws it chooses a minimum-norm solution; it does not separately constrain mirror translation. Held screws receive zero turns. When the enabled screws only control one direction, the page warns that a perpendicular error may remain.

The default applies 70% of the predicted correction and limits a suggested step to 1/8 turn per screw. Repeated calculations use new measured hits. The tool keeps its calibration fixed rather than silently inferring new screw responses from simultaneous turns. Predictions can differ from measurements because of backlash, preload, locking changes, or nonlinearity.

Recalibrate after changing the target distance, scale, view, mirror, or mount. Use **Clear calibration for a changed setup** on the calibration screen. Changing the physical corner layout, target diameter, or target-position notes also clears calibration while retaining the log.

## Save and resume

The current session saves automatically to browser storage. Reloading can resume an applied adjustment that is still awaiting its measured hit. **Session log** shows the calibration tests, actual turns, measured positions, and predicted results.

Use **Export** to download a JSON backup. **Import session** restores that file, including unfinished progress. Importing replaces the current workspace, so export the current session first if you want to keep it.

Storage for local HTML files varies between browsers and may be cleared or isolated when you move or rename the file. Export is the reliable way to preserve or transfer your session. No measurements are sent anywhere.

## Scope and machine procedure

This tool supports alignment at one fixed target plane. It does not set lens focal distance, connect to a laser controller, or verify the full beam path. A centered spot at one location alone does not prove correct alignment throughout travel. Use the machine manufacturer's complete near/far checks and recheck after locking the mount.

Follow the machine's approved alignment procedure and specified eye protection. Keep interlocks and guards working. Disable firing before touching screws. Use manufacturer-approved marking materials and test settings.

## Research

- [Newport — Optical Mounts: Ignore Them at Your Peril](https://www.newport.com/medias/sys_master/images/images/hbd/h75/8797225975838/Optical-Mounts-Ignore-Them-at-Your-Peril.pdf) explains ball-supported kinematic mounts, coupled axes, and the relationship between mirror angle, reflected beam angle, and distance.
- [Newport — Three-actuator kinematic mirror mount](https://www.newport.com/p/M05-XL) documents tip, tilt, and translation adjustments.
- [OMTech — CO₂ laser mirror alignment](https://help.omtechlaser.com/hc/en-us/articles/32755275789081-Laser-Engraver-Mirror-Alignment-How-to-Align-a-CO2-Laser-Beam) covers repeated near/far comparison and small adjustment steps.

The measured-response solver is this tool's implementation, informed by those mechanics; it is not a manufacturer-certified alignment algorithm.

## Verification

The numerical checks covered coupled axes, signed turns, three-screw solutions, limited control directions, maximum steps, repeated correction, and 1,000 numerical cases. Simulated page-control checks covered setup, calibration, off-circle entry, actual-turn logging, reload during an unfinished correction, and session history. A real-browser visual preview was unavailable in the authoring environment because it blocked local HTML navigation. No hardware alignment was performed.
