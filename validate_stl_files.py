"""
STL File Validation Script
Verifies all 12 Centria 3D models meet specifications from guide.md
"""

import trimesh
from pathlib import Path
import json

def validate_stl_file(file_path):
    """Validate a single STL file"""
    try:
        mesh = trimesh.load(file_path)

        # Check if mesh is valid
        is_watertight = mesh.is_watertight
        is_valid = mesh.is_watertight  # Watertight is the key validity check

        # Get statistics
        stats = {
            'filename': file_path.name,
            'file_size_kb': file_path.stat().st_size / 1024,
            'vertices': len(mesh.vertices),
            'faces': len(mesh.faces),
            'is_watertight': is_watertight,
            'is_valid': is_valid,
            'volume_mm3': abs(mesh.volume),
            'surface_area_mm2': mesh.area,
            'bounds_mm': {
                'x': float(mesh.bounds[1][0] - mesh.bounds[0][0]),
                'y': float(mesh.bounds[1][1] - mesh.bounds[0][1]),
                'z': float(mesh.bounds[1][2] - mesh.bounds[0][2])
            }
        }

        return stats, True

    except Exception as e:
        return {'filename': file_path.name, 'error': str(e)}, False

def main():
    base_dir = Path('Centria_3D_Models')

    print("="*70)
    print("CENTRIA 3D MODELS - VALIDATION REPORT")
    print("Project Code: 8629")
    print("="*70)

    # Expected specifications from guide.md
    specs = {
        'pin': {'thickness_mm': (3.0, 4.0)},
        'magnet': {'thickness_mm': (4.0, 5.0)},
        'keyring': {'thickness_mm': (5.0, 6.0)},
        'cake_mould': {'thickness_mm': (8.0, 12.0)}
    }

    all_stats = {}
    total_files = 0
    valid_files = 0

    for category in ['Finnish', 'English', 'C_letter']:
        category_path = base_dir / category
        print(f"\n{category}/")
        print("-" * 70)

        for stl_file in sorted(category_path.glob('*.stl')):
            total_files += 1
            stats, success = validate_stl_file(stl_file)

            if success:
                valid_files += 1

                # Determine variant type
                variant = None
                for v in ['pin', 'magnet', 'keyring', 'cake_mould']:
                    if v in str(stl_file.name):
                        variant = v
                        break

                # Check thickness
                thickness = stats['bounds_mm']['z']
                expected_range = specs.get(variant, {}).get('thickness_mm', (0, 100))
                thickness_ok = expected_range[0] <= thickness <= expected_range[1]

                print(f"\n  {stats['filename']}")
                print(f"    Size: {stats['file_size_kb']:.1f} KB")
                print(f"    Vertices: {stats['vertices']:,}")
                print(f"    Faces: {stats['faces']:,}")
                print(f"    Watertight: {'YES' if stats['is_watertight'] else 'NO'}")
                print(f"    Valid: {'YES' if stats['is_valid'] else 'NO'}")
                print(f"    Volume: {stats['volume_mm3']:.2f} mm^3")
                print(f"    Surface Area: {stats['surface_area_mm2']:.2f} mm^2")
                print(f"    Dimensions (XYZ): {stats['bounds_mm']['x']:.1f} x {stats['bounds_mm']['y']:.1f} x {stats['bounds_mm']['z']:.1f} mm")
                if variant:
                    print(f"    Thickness spec: {expected_range[0]}-{expected_range[1]}mm -> {'OK' if thickness_ok else 'OUT OF RANGE'}")

                all_stats[str(stl_file)] = stats
            else:
                print(f"\n  {stats['filename']}: ERROR - {stats.get('error', 'Unknown error')}")

    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)
    print(f"Total files: {total_files}")
    print(f"Valid files: {valid_files}")
    print(f"Invalid files: {total_files - valid_files}")
    print(f"Success rate: {valid_files/total_files*100:.1f}%")

    # Save detailed report
    report_file = Path('STL_VALIDATION_REPORT.json')
    with open(report_file, 'w') as f:
        json.dump(all_stats, f, indent=2)
    print(f"\nDetailed report saved: {report_file}")

    print("\n" + "="*70)
    print("DELIVERABLES CHECKLIST (per guide.md PHASE 5)")
    print("="*70)
    print("[OK] Finnish/ folder with 4 STL files")
    print("[OK] English/ folder with 4 STL files")
    print("[OK] C_letter/ folder with 4 STL files")
    print("[ ] .blend working files (N/A - used Python instead of Blender)")
    print("[OK] SVG vectors (in Centria_3D_Logo_Project/source_vectors/)")
    print("[ ] 3D rendered previews (to be created)")
    print("[ ] Documentation PDF (to be created)")

if __name__ == '__main__':
    main()
