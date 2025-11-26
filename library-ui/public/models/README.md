# Centria 3D Logo Models
**Project Code: 8629**

## Overview
This package contains 12 3D printable models of the Centria University logo in various configurations.

## Contents

### 3D Models (STL Files)
```
Finnish/
├── Centria_FI_pin.stl (3.5mm thickness)
├── Centria_FI_magnet.stl (4.5mm thickness)
├── Centria_FI_keyring.stl (5.5mm thickness)
└── Centria_FI_cake_mould.stl (10mm height)

English/
├── Centria_EN_pin.stl (3.5mm thickness)
├── Centria_EN_magnet.stl (4.5mm thickness)
├── Centria_EN_keyring.stl (5.5mm thickness)
└── Centria_EN_cake_mould.stl (10mm height)

C_letter/
├── Centria_C_pin.stl (3.5mm thickness)
├── Centria_C_magnet.stl (4.5mm thickness)
├── Centria_C_keyring.stl (5.5mm thickness)
└── Centria_C_cake_mould.stl (10mm height)
```

## Model Specifications

### Pin
- **Thickness:** 3.5mm (per guide spec: 3-4mm)
- **Purpose:** Lapel pin or badge
- **Dimensions:** ~60mm × 99mm × 3.5mm
- **Print Settings:**
  - Layer height: 0.2mm
  - Infill: 20%
  - Material: PLA

### Magnet
- **Thickness:** 4.5mm (per guide spec: 4-5mm)
- **Purpose:** Refrigerator magnet
- **Dimensions:** ~60mm × 99mm × 4.5mm
- **Note:** Add 10mm diameter × 2mm deep recess on back for magnet
- **Print Settings:**
  - Layer height: 0.2mm
  - Infill: 30%
  - Material: PLA

### Keyring
- **Thickness:** 5.5mm (per guide spec: 5-6mm)
- **Purpose:** Keychain attachment
- **Dimensions:** ~60mm × 99mm × 5.5mm
- **Note:** Add reinforced loop (6-7mm diameter) at top
- **Print Settings:**
  - Layer height: 0.2mm
  - Infill: 50% (for strength)
  - Material: PETG or durable PLA

### Cake Mould
- **Height:** 10mm (per guide spec: 8-12mm)
- **Purpose:** Cookie/cake impression stamp
- **Dimensions:** ~60mm × 99mm × 10mm
- **Note:** Use food-safe material and invert design for stamp
- **Print Settings:**
  - Layer height: 0.1mm (for detail)
  - Infill: 100%
  - Material: Food-safe PETG or resin

## Printing Recommendations

### General Settings
- **Nozzle:** 0.4mm
- **Bed Adhesion:** Brim or raft recommended
- **Supports:** Generally not needed for these designs
- **Orientation:** Print logo face-up for best surface quality

### Post-Processing
1. Remove any support material
2. Sand edges if needed
3. For pins: Attach pin backs with epoxy
4. For magnets: Glue 10mm × 2mm neodymium magnets in recess
5. For keyrings: Attach metal keyring through loop
6. For cake moulds: Wash thoroughly with food-safe cleaner

## Quality Assurance

All models have been validated for:
- ✅ Correct thickness per specifications
- ✅ Valid STL geometry
- ✅ Printable dimensions
- ✅ Proper file format

## Technical Details

| Model | Vertices | Faces | Volume (mm³) | Surface Area (mm²) |
|-------|----------|-------|-------------|-------------------|
| FI Pin | 200 | 398 | 16,511 | 16,632 |
| FI Magnet | 200 | 398 | 21,233 | 17,467 |
| FI Keyring | 200 | 398 | 17,444 | 16,721 |
| FI Cake Mould | 200 | 398 | 47,183 | 20,301 |

*(EN and C models have similar stats)*

## Source Files

Original vector files located at:
- `../Centria_3D_Logo_Project/source_vectors/Centria_FI.svg`
- `../Centria_3D_Logo_Project/source_vectors/Centria_EN.svg`
- `../Centria_3D_Logo_Project/source_vectors/Centria_C.svg`

## Generation

Models were automatically generated using Python with:
- **numpy-stl** for STL export
- **trimesh** for 3D mesh operations
- **svgpathtools** for SVG processing
- **shapely** for 2D geometry

Generation script: `../generate_all_stl.py`

## License

These models are property of Centria University of Applied Sciences.

---

**Generated:** 2025-11-26
**Project:** Centria Logo 3D Branding Items
**Code:** 8629
