# Mirrorline · CO₂ mirror alignment

A browser-only tool for aligning a CO₂ laser's three-screw mirror mount. Map the screws, measure their movement, plot a beam hit, and calculate a small correction. Repeat while preserving the actual alignment history.

## Run it

Download **mirrorline.html** and open it in a modern browser. The file contains all HTML, CSS, and JavaScript. It works offline with no server, dependencies, installation, or account.

## Features

- Select three physical screw locations from four corners.
- Enable individual screws or hold them fixed.
- Calibrate the signed horizontal and vertical movement caused by each screw.
- Plot spots inside or outside the target circle, or enter coordinates directly.
- Calculate combined screw turns with adjustable correction strength and step limits.
- Record actual turns separately from suggested turns and predicted positions.
- Repeat corrections using new measured hits.
- Save the session in browser storage and export/import JSON backups.

## Workflow

1. **Mount setup:** map the occupied corners as seen from the screw heads. Enter the target diameter and enable the adjusters you want to use.
2. **Calibrate:** plot a starting hit, make a small known turn on one screw, and plot the resulting hit. Repeat for each enabled screw.
3. **Align beam:** plot the current hit and calculate the next correction. Apply the turns manually, record the actual turns, then plot and save the result.
4. **Session log:** review measured progress and export a backup.

See [Quick-start.md](Quick-start.md) for detailed instructions, mechanics, research links, and limitations.

## How the calculation works

A measured before/after displacement divided by the signed test turn gives each screw's response vector in millimetres per clockwise turn. Those vectors form a two-row response matrix. A least-squares solver finds a correction toward the circle center; with three enabled screws it chooses a minimum-norm turn vector. Held screws receive zero turns.

The default uses 70% of the predicted correction and caps each screw at 1/8 turn per iteration. If a limit is reached, the correction is scaled together to preserve its direction, with display rounding accounted for. Limited control directions are reported. Calibration stays fixed until explicitly changed; repeated iterations use newly measured hits.

## Scope

This tool assists mirror alignment at one fixed target plane. It does not set lens focus or operate the machine. A centered spot at one location alone does not establish beam alignment throughout machine travel. Complete the manufacturer's near/far procedure and recheck after locking the mount.

Use the machine's approved safeguards, specified eye protection, marking method, and test settings. Keep interlocks intact and disable firing before touching adjustment screws. Recalibrate after changing distance, scale, orientation, or mount mechanics.

Browser storage for local HTML files varies. Export JSON backups to preserve sessions across file moves, browsers, or cleared storage. Session files are private to the user and should not be committed.

## Contributing and checking changes

The application source lives directly in **mirrorline.html**. Edit that file; no build step is required. Keep it self-contained and offline-capable.

With Node.js installed, run the numerical checks:

```sh
node tests/core.cjs
```

Checks cover coupled responses, signed calibration, three-screw minimum-norm solutions, limited control directions, maximum steps, repeated correction, and 1,000 numerical cases. They do not validate hardware behavior. Before submitting interface changes, manually check mouse/touch plotting, keyboard input, calibration, saved-session reload, and JSON export/import in a browser.

## License

[MIT](LICENSE), copyright 2026 ecspot.
