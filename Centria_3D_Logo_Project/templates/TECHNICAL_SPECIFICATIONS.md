# Technical Specifications - Centria 3D Logo Items
**Project Code: 8629**

---

## 📐 Dimensional Specifications

### PIN Variant
- **Overall Dimensions:** Logo dimensions + mount
- **Thickness:** 3.5mm ± 0.2mm
- **Pin Mount:**
  - Type: Butterfly clutch compatible
  - Cylinder diameter: 3mm
  - Cylinder height: 2mm
  - Position: Center back, -5mm from geometric center
  - Orientation: Horizontal (perpendicular to logo face)

### MAGNET Variant
- **Overall Dimensions:** Logo dimensions
- **Thickness:** 4.5mm ± 0.2mm
- **Magnet Recess:**
  - Diameter: 12mm (for standard neodymium magnet)
  - Depth: 2mm
  - Position: Center back
  - Fit: Press-fit with 0.1mm tolerance

### KEYRING Variant
- **Overall Dimensions:** Logo dimensions + loop
- **Thickness:** 5.5mm ± 0.2mm
- **Keyring Loop:**
  - Outer diameter: 7mm
  - Tube thickness: 3mm (wall strength)
  - Position: Top corner, 2mm from edge
  - Orientation: Vertical
  - Strength requirement: >5kg pull force

### CAKE MOULD Variant
- **Base Dimensions:** Logo bounds + 20mm padding
- **Overall Height:** 10mm
- **Logo Depth:** 3mm (impression into dough)
- **Edge Radius:** 2mm (rounded corners)
- **Wall Thickness:** Solid
- **Material Requirements:** Food-safe certified

---

## 🎨 Logo Variants

### Finnish Version (Centria_FI)
- **Logo:** "CENTRIA" text
- **Tagline:** "KIRJASTO" (Finnish for Library)
- **Source File:** `Centria_FI.svg`
- **Estimated Size:** 40mm × 15mm (width × height)

### English Version (Centria_EN)
- **Logo:** "CENTRIA" text
- **Tagline:** "LIBRARY"
- **Source File:** `Centria_EN.svg`
- **Estimated Size:** 40mm × 15mm

### C Letter Version (Centria_C)
- **Logo:** "C" symbol only
- **Style:** Segmented C design
- **Source File:** `Centria_C.svg`
- **Estimated Size:** 20mm × 20mm

---

## 🔧 Manufacturing Specifications

### 3D Printing Parameters

#### FDM (PLA/PETG)
```yaml
Layer Height: 0.2mm (pins, magnets, keyrings)
             0.15mm (cake moulds for smoother surface)

Infill:
  - Pins: 20% (adequate strength, lighter)
  - Magnets: 30% (moderate strength)
  - Keyrings: 50% (high strength required)
  - Moulds: 100% (food safety, smooth surface)

Wall Count: 3-4 perimeters

Top/Bottom Layers: 4-5 layers

Print Speed: 50mm/s (outer walls)
            60mm/s (infill)
            30mm/s (first layer)

Retraction:
  - Distance: 5mm (direct drive) / 7mm (Bowden)
  - Speed: 45mm/s

Support: Usually not required
        (Designs are support-free)

Adhesion: Brim recommended for keyrings
         Raft for moulds (flat bottom critical)
```

#### Resin (For Cake Moulds)
```yaml
Layer Height: 0.05mm

Exposure Time: Per resin specifications

Supports: None (flat base)

Post-Processing:
  - Wash in IPA (10-15 minutes)
  - UV cure (5-10 minutes)
  - Sand surface to 600-800 grit
  - Final food-safe coating
```

### Material Specifications

| Variant | Primary Material | Alternative | Properties Required |
|---------|-----------------|-------------|---------------------|
| Pin | PLA | PETG | Rigid, lightweight, durable |
| Magnet | PLA/PETG | ABS | Rigid, dimensionally stable |
| Keyring | PETG | Nylon, TPU | High strength, impact resistant |
| Cake Mould | Food-safe PETG | Food-safe resin | FDA approved, heat resistant to 80°C |

### Material Properties

**PLA:**
- Density: 1.24 g/cm³
- Tensile Strength: 50 MPa
- Print Temp: 190-220°C
- Bed Temp: 50-60°C
- Pros: Easy to print, good surface finish
- Cons: Lower heat resistance

**PETG:**
- Density: 1.27 g/cm³
- Tensile Strength: 53 MPa
- Print Temp: 220-250°C
- Bed Temp: 70-85°C
- Pros: Strong, heat resistant, food-safe options available
- Cons: More stringing

**Nylon:**
- Density: 1.14 g/cm³
- Tensile Strength: 75 MPa
- Print Temp: 240-260°C
- Bed Temp: 70-90°C
- Pros: Very strong, flexible
- Cons: Hygroscopic, harder to print

---

## 📏 Quality Control Standards

### Dimensional Tolerances
- **Critical Dimensions:** ±0.1mm (mounting features)
- **General Dimensions:** ±0.2mm
- **Non-critical Features:** ±0.3mm

### Surface Quality
- **Visible Surfaces:** Max 0.2mm layer lines
- **Mounting Surfaces:** Smooth, no defects
- **Cake Mould Interior:** <Ra 3.2 (smooth finish)

### Mechanical Requirements
- **Pin Mount:** Secure fit, no wobble
- **Magnet Fit:** Press-fit, holds 500g minimum
- **Keyring Loop:** 5kg pull force minimum
- **General:** No sharp edges, burrs, or defects

### Functional Testing

#### Pin Test
1. Attach pin back
2. Pin to fabric
3. Shake test (30 seconds)
4. Pull test (light force)
5. **Pass:** Stays attached, no damage

#### Magnet Test
1. Insert 12mm × 2mm neodymium magnet
2. Attach to steel surface
3. Hold 500g weight
4. **Pass:** Magnet secure, holds weight

#### Keyring Test
1. Attach keyring hardware
2. Hang 5kg weight for 1 minute
3. Shake test
4. **Pass:** No deformation, hardware secure

#### Cake Mould Test
1. Grease mould
2. Press into cookie dough (5mm thick)
3. Remove cleanly
4. **Pass:** Clean release, clear impression

---

## 🔬 File Format Specifications

### Source Files (SVG)
```yaml
Format: SVG 1.1 (Plain SVG)
Coordinate System: px (pixels)
Fill: Solid black (#000000)
Stroke: None
Text: Converted to paths
Effects: None (no filters, gradients)
Viewbox: Defined
```

### 3D Model Files (Blender)
```yaml
Format: .blend (Blender 3.x)
Units: Metric (millimeters)
Origin: Geometric center, Z=0 at base
Modifiers: All applied before export
Mesh Quality: Manifold, no intersecting faces
```

### Export Files (STL)
```yaml
Format: Binary STL
Units: Millimeters
Scale: 1:1 (ready to print)
Orientation: Print-ready (flat on bed)
Quality: High polygon count for curves
Validation: No errors in mesh analysis
```

---

## 🎯 Production Batch Sizes

### Prototype Phase
- 1× of each variant (4 total)
- Purpose: Functional testing, stakeholder approval

### Small Batch
- 10× of each logo/variant combo
- Total: 120 items (3 logos × 4 variants × 10)

### Standard Batch
- 50× of each logo/variant combo
- Total: 600 items

### Custom Orders
- Flexible quantities
- Minimum: 5 per variant

---

## 📦 Packaging Requirements

### Individual Packaging
- **Pins:** Cardboard backing + clear bag
- **Magnets:** Protective foam + bag
- **Keyrings:** Hang tag + bag
- **Moulds:** Box with usage instructions

### Bulk Packaging
- Organized by logo type and variant
- Clear labeling
- Protective padding
- Assembly instructions included

---

## ✅ Acceptance Criteria

### Visual Inspection
- [ ] Logo is clearly visible and recognizable
- [ ] Surface finish meets standards
- [ ] No layer separation or defects
- [ ] Color is consistent (if applicable)
- [ ] No stringing or blobs

### Dimensional Check
- [ ] Overall dimensions within tolerance
- [ ] Mounting features correct size
- [ ] Thickness as specified
- [ ] Holes/recesses correct diameter and depth

### Functional Test
- [ ] Passes variant-specific functional test
- [ ] Hardware fits properly
- [ ] Meets strength requirements
- [ ] Safe to handle (no sharp edges)

### Final Approval
- [ ] Client visual approval
- [ ] Functional demonstration passed
- [ ] Documentation complete
- [ ] Ready for batch production

---

## 🔄 Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-25 | Initial specifications | Project Team |
| 1.1 | - | Post-prototype adjustments | TBD |

---

**Project Code:** 8629
**Document:** Technical Specifications
**Status:** Approved for Production
