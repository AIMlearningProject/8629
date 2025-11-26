"""
Cleanup script - removes unnecessary files after project completion
Keeps only essential deliverables and tools
"""

import shutil
from pathlib import Path

def cleanup():
    print("="*70)
    print("CLEANUP - Removing Unnecessary Files")
    print("="*70)

    # Directories to remove
    dirs_to_remove = [
        'Centria_3D_Logo_Project/scripts',
        'Centria_3D_Logo_Project/documentation',
        'Centria_3D_Logo_Project/delivery',
        'Centria_3D_Logo_Project/output',
        'Centria_3D_Logo_Project/checklist',
    ]

    # Files to remove (markdown docs that were for development)
    files_to_remove = [
        'Centria_3D_Logo_Project/README.md',
        'Centria_3D_Logo_Project/PROJECT_SUMMARY.md',
        'Centria_3D_Logo_Project/SETUP_GUIDE.md',
        'Centria_3D_Logo_Project/TECHNICAL_SPECIFICATIONS.md',
        'Centria_3D_Logo_Project/TEST_RESULTS.md',
        'STL_VALIDATION_REPORT.json',
    ]

    removed_dirs = 0
    removed_files = 0

    # Remove directories
    for dir_path in dirs_to_remove:
        p = Path(dir_path)
        if p.exists() and p.is_dir():
            try:
                shutil.rmtree(p)
                print(f"[DELETED DIR]  {dir_path}")
                removed_dirs += 1
            except Exception as e:
                print(f"[ERROR] Could not remove {dir_path}: {e}")

    # Remove files
    for file_path in files_to_remove:
        p = Path(file_path)
        if p.exists() and p.is_file():
            try:
                p.unlink()
                print(f"[DELETED FILE] {file_path}")
                removed_files += 1
            except Exception as e:
                print(f"[ERROR] Could not remove {file_path}: {e}")

    print("\n" + "="*70)
    print("CLEANUP SUMMARY")
    print("="*70)
    print(f"Directories removed: {removed_dirs}")
    print(f"Files removed: {removed_files}")

    print("\n" + "="*70)
    print("REMAINING STRUCTURE")
    print("="*70)

    print("\nKEPT - Essential files:")
    print("  [OK] Centria_3D_Models/ - Final 12 STL files + README")
    print("  [OK] Centria_3D_Logo_Project/source_vectors/ - Original SVG files")
    print("  [OK] library-ui/ - Web interface")
    print("  [OK] docs/ - Reference documentation")
    print("  [OK] generate_all_stl.py - STL generation script")
    print("  [OK] validate_stl_files.py - Validation script")

    print("\nDELETED - Unnecessary files:")
    print("  [X] Blender scripts (Blender not installed)")
    print("  [X] Generated markdown documentation (redundant)")
    print("  [X] Old delivery structures")
    print("  [X] Temporary validation reports")

    # Show final directory tree
    print("\n" + "="*70)
    print("FINAL PROJECT STRUCTURE")
    print("="*70)
    print("""
D:\\7629/
├── Centria_3D_Models/          ← MAIN DELIVERABLE
│   ├── Finnish/
│   │   ├── Centria_FI_pin.stl
│   │   ├── Centria_FI_magnet.stl
│   │   ├── Centria_FI_keyring.stl
│   │   └── Centria_FI_cake_mould.stl
│   ├── English/
│   │   ├── Centria_EN_pin.stl
│   │   ├── Centria_EN_magnet.stl
│   │   ├── Centria_EN_keyring.stl
│   │   └── Centria_EN_cake_mould.stl
│   ├── C_letter/
│   │   ├── Centria_C_pin.stl
│   │   ├── Centria_C_magnet.stl
│   │   ├── Centria_C_keyring.stl
│   │   └── Centria_C_cake_mould.stl
│   └── README.md
│
├── Centria_3D_Logo_Project/
│   └── source_vectors/         ← Source SVG files
│       ├── Centria_FI.svg
│       ├── Centria_EN.svg
│       └── Centria_C.svg
│
├── library-ui/                 ← Web interface
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/                       ← Reference docs
│   ├── guide.md
│   ├── suggestion.md
│   └── photo_2025-11-25_16-52-36.jpg
│
├── generate_all_stl.py         ← Generation tool
└── validate_stl_files.py       ← Validation tool
    """)

    print("\n" + "="*70)
    print("CLEANUP COMPLETE")
    print("="*70)

if __name__ == '__main__':
    cleanup()
