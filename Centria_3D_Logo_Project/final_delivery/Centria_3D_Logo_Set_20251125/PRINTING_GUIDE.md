# 3D Printing Guide
## Centria Logo Branding Items

### Material Selection

**Recommended Materials:**
- **PLA:** Best for pins, magnets, keyrings (general use)
- **PETG:** Better durability for keyrings
- **Food-Safe PETG/Resin:** Required for cake moulds

### Print Settings by Variant

#### Pins (3.5mm)
```
Layer Height: 0.2mm
Infill: 20%
Wall Lines: 3
Top/Bottom Layers: 4
Speed: 50mm/s
Supports: No
Adhesion: Skirt
Time: ~20-30 minutes each
```

#### Magnets (4.5mm)
```
Layer Height: 0.2mm
Infill: 30%
Wall Lines: 3
Top/Bottom Layers: 4
Speed: 50mm/s
Supports: No
Adhesion: Skirt
Time: ~25-35 minutes each
```

#### Keyrings (5.5mm)
```
Layer Height: 0.2mm
Infill: 50% (strength!)
Wall Lines: 4
Top/Bottom Layers: 5
Speed: 45mm/s (slower for strength)
Supports: No
Adhesion: Brim
Time: ~35-45 minutes each
```

#### Cake Moulds (10mm)
```
Layer Height: 0.15mm (smoother surface)
Infill: 100% (solid)
Wall Lines: 5
Top/Bottom Layers: 6
Speed: 40mm/s
Supports: No
Adhesion: Raft
Time: ~1-2 hours each
```

### Slicing Tips

1. **Orientation:** Models are already oriented correctly (flat on bed)
2. **Z-Seam:** Set to "Random" or "Hide Seam"
3. **Cooling:** 100% fan (except first layer)
4. **First Layer:** Slow (20mm/s) for good adhesion

### Quality Checklist

Before printing:
- [ ] STL file loads without errors
- [ ] Correct orientation (flat side down)
- [ ] No support material needed
- [ ] Estimated time looks reasonable

During printing:
- [ ] First layer adheres well
- [ ] No warping or lifting
- [ ] Layers bonding properly

After printing:
- [ ] No stringing or blobs
- [ ] Dimensions are correct
- [ ] Mounting features intact
- [ ] Smooth enough surface finish

### Troubleshooting

**Problem:** Logo details not clear
- Increase wall lines to 4-5
- Decrease layer height to 0.15mm
- Slow down outer wall speed

**Problem:** Weak keyring loop
- Increase infill to 70-80%
- Print slower for better layer adhesion
- Consider PETG instead of PLA

**Problem:** Cake mould has rough surface
- Use 0.1mm layers
- Enable "Ironing" for top surface
- Sand with 400-800 grit sandpaper

---

**Need Help?** See SETUP_GUIDE.md for full documentation
