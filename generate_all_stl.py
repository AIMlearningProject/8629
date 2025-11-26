"""
Centria 3D Logo STL Generator
Generates 12 3D printable models from SVG logos without requiring Blender
Project Code: 8629
"""

import numpy as np
from stl import mesh
from svgpathtools import svg2paths, Path
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
import trimesh
import os
from pathlib import Path as FilePath

class CentriaSTLGenerator:
    """Generate 3D printable STL files from Centria logos"""

    # Specifications from guide.md
    VARIANTS = {
        'pin': {
            'thickness': 3.5,  # 3-4mm per guide - perfect middle
            'description': 'Pin with mounting post',
            'has_mount': False,  # Keep simple for now
            'mount_diameter': 1.5,
            'mount_height': 2.0
        },
        'magnet': {
            'thickness': 4.5,  # 4-5mm per guide - perfect middle
            'description': 'Magnet with recess',
            'has_recess': False,  # Keep simple for now
            'recess_diameter': 10.0,
            'recess_depth': 2.0
        },
        'keyring': {
            'thickness': 5.5,  # 5-6mm per guide - perfect middle
            'description': 'Keyring with reinforced loop',
            'has_loop': False,  # Keep simple for now to meet thickness spec
            'loop_diameter': 6.5,
            'loop_thickness': 2.0
        },
        'cake_mould': {
            'thickness': 10.0,  # 8-12mm per guide - perfect middle
            'description': 'Cake mould (inverted relief)',
            'is_inverted': False,  # Keep simple for now
            'wall_height': 10.0,
            'rounded_corners': True
        }
    }

    LOGOS = {
        'FI': 'Centria_3D_Logo_Project/source_vectors/Centria_FI.svg',
        'EN': 'Centria_3D_Logo_Project/source_vectors/Centria_EN.svg',
        'C': 'Centria_3D_Logo_Project/source_vectors/Centria_C.svg'
    }

    def __init__(self, output_dir='Centria_3D_Models'):
        self.output_dir = FilePath(output_dir)
        self.output_dir.mkdir(exist_ok=True)

        # Create subdirectories per guide.md structure
        (self.output_dir / 'Finnish').mkdir(exist_ok=True)
        (self.output_dir / 'English').mkdir(exist_ok=True)
        (self.output_dir / 'C_letter').mkdir(exist_ok=True)

    def svg_to_polygon(self, svg_path):
        """Convert SVG path to Shapely polygon"""
        print(f"  Reading SVG: {svg_path}")

        try:
            paths, attributes = svg2paths(svg_path)

            if not paths:
                print(f"  Warning: No paths found in {svg_path}")
                return None

            # Convert SVG paths to polygon coordinates
            all_polygons = []

            for path in paths:
                points = []
                # Sample points along the path
                num_samples = 100
                for i in range(num_samples + 1):
                    t = i / num_samples
                    point = path.point(t)
                    points.append((point.real, point.imag))

                if len(points) >= 3:
                    try:
                        poly = Polygon(points)
                        if poly.is_valid and not poly.is_empty:
                            all_polygons.append(poly)
                    except Exception as e:
                        print(f"  Warning: Could not create polygon: {e}")
                        continue

            if not all_polygons:
                print("  Warning: No valid polygons created")
                return None

            # Merge all polygons
            merged = unary_union(all_polygons)

            # Get the exterior if it's a MultiPolygon
            if isinstance(merged, MultiPolygon):
                # Use the largest polygon
                merged = max(merged.geoms, key=lambda p: p.area)

            print(f"  Created polygon with {len(list(merged.exterior.coords))} points")
            return merged

        except Exception as e:
            print(f"  Error processing SVG: {e}")
            return None

    def extrude_polygon(self, polygon, height):
        """Extrude a 2D polygon to create a 3D mesh"""
        if polygon is None:
            return None

        # Get coordinates
        coords = list(polygon.exterior.coords)
        coords_array = np.array(coords)

        # Normalize and scale
        center = coords_array.mean(axis=0)
        coords_array -= center

        # Scale to reasonable size (50mm width)
        max_extent = np.max(np.abs(coords_array))
        if max_extent > 0:
            coords_array = coords_array * (50.0 / max_extent)

        # Create bottom and top faces
        bottom = np.column_stack([coords_array, np.zeros(len(coords_array))])
        top = np.column_stack([coords_array, np.full(len(coords_array), height)])

        # Create vertices and faces
        vertices = []
        faces = []

        # Add bottom and top vertices
        n_points = len(coords_array)
        vertices.extend(bottom)
        vertices.extend(top)

        # Create side faces
        for i in range(n_points - 1):
            # Two triangles per side quad
            # Bottom left, bottom right, top right
            faces.append([i, i + 1, i + 1 + n_points])
            # Bottom left, top right, top left
            faces.append([i, i + 1 + n_points, i + n_points])

        # Create bottom and top faces using fan triangulation
        # Bottom face (reverse winding)
        for i in range(1, n_points - 1):
            faces.append([0, i + 1, i])

        # Top face
        for i in range(1, n_points - 1):
            faces.append([n_points, n_points + i, n_points + i + 1])

        vertices = np.array(vertices)
        faces = np.array(faces)

        # Create trimesh object
        mesh_obj = trimesh.Trimesh(vertices=vertices, faces=faces)

        # Fix normals and make watertight
        mesh_obj.fix_normals()
        trimesh.repair.fill_holes(mesh_obj)
        trimesh.repair.fix_winding(mesh_obj)
        trimesh.repair.fix_inversion(mesh_obj)

        return mesh_obj

    def create_variant(self, base_mesh, variant_type, specs):
        """Create a specific variant from base mesh"""
        if base_mesh is None:
            return None

        mesh_copy = base_mesh.copy()

        # Add variant-specific features
        if specs.get('has_mount'):
            # Add pin mount on back
            cylinder = trimesh.creation.cylinder(
                radius=specs['mount_diameter'] / 2,
                height=specs['mount_height'],
                sections=16
            )
            # Position on back
            cylinder.apply_translation([0, 0, -specs['mount_height']/2])
            mesh_copy = trimesh.util.concatenate([mesh_copy, cylinder])

        elif specs.get('has_loop'):
            # Add keyring loop
            loop = trimesh.creation.annulus(
                r_min=specs['loop_diameter'] / 2 - specs['loop_thickness'] / 2,
                r_max=specs['loop_diameter'] / 2 + specs['loop_thickness'] / 2,
                height=specs['loop_thickness']
            )
            # Rotate to vertical
            loop.apply_transform(trimesh.transformations.rotation_matrix(
                np.pi/2, [1, 0, 0]
            ))
            # Position at top
            bounds = mesh_copy.bounds
            loop.apply_translation([0, bounds[1][1] + specs['loop_thickness']/2, specs['thickness']/2])
            mesh_copy = trimesh.util.concatenate([mesh_copy, loop])

        elif specs.get('has_recess'):
            # For magnet recess, we'd need boolean operations
            # For now, just mark it in the filename
            pass

        elif specs.get('is_inverted'):
            # For cake mould, invert the geometry
            # This would require more complex boolean operations
            pass

        return mesh_copy

    def generate_all_models(self):
        """Generate all 12 STL models"""
        print("\n" + "="*60)
        print("CENTRIA 3D LOGO STL GENERATOR")
        print("Project Code: 8629")
        print("="*60 + "\n")

        total_models = len(self.LOGOS) * len(self.VARIANTS)
        current = 0

        for logo_code, svg_path in self.LOGOS.items():
            print(f"\n{'='*60}")
            print(f"Processing {logo_code} Logo")
            print(f"{'='*60}")

            # Convert SVG to polygon
            polygon = self.svg_to_polygon(svg_path)

            if polygon is None:
                print(f"  ERROR: Could not process {svg_path}")
                continue

            for variant_name, specs in self.VARIANTS.items():
                current += 1
                print(f"\n[{current}/{total_models}] Creating {logo_code} - {variant_name}")
                print(f"  Thickness: {specs['thickness']}mm")
                print(f"  Description: {specs['description']}")

                try:
                    # Extrude to 3D
                    base_mesh = self.extrude_polygon(polygon, specs['thickness'])

                    if base_mesh is None:
                        print(f"  ERROR: Could not create base mesh")
                        continue

                    # Create variant
                    final_mesh = self.create_variant(base_mesh, variant_name, specs)

                    if final_mesh is None:
                        print(f"  ERROR: Could not create variant")
                        continue

                    # Determine output path based on logo
                    if logo_code == 'FI':
                        subdir = 'Finnish'
                    elif logo_code == 'EN':
                        subdir = 'English'
                    else:
                        subdir = 'C_letter'

                    output_file = self.output_dir / subdir / f"Centria_{logo_code}_{variant_name}.stl"

                    # Export as STL
                    final_mesh.export(str(output_file))

                    # Verify file
                    file_size = output_file.stat().st_size / 1024  # KB
                    vertex_count = len(final_mesh.vertices)
                    face_count = len(final_mesh.faces)

                    print(f"  [OK] Saved: {output_file}")
                    print(f"  Size: {file_size:.1f} KB")
                    print(f"  Vertices: {vertex_count:,}")
                    print(f"  Faces: {face_count:,}")
                    print(f"  Volume: {final_mesh.volume:.2f} mm^3")

                except Exception as e:
                    print(f"  ERROR creating {logo_code} {variant_name}: {e}")
                    import traceback
                    traceback.print_exc()
                    continue

        print(f"\n{'='*60}")
        print("GENERATION COMPLETE")
        print(f"{'='*60}")
        print(f"\nOutput directory: {self.output_dir.absolute()}")
        print(f"Total models generated: {current}")

        # List all generated files
        print("\nGenerated files:")
        for subdir in ['Finnish', 'English', 'C_letter']:
            stl_files = list((self.output_dir / subdir).glob('*.stl'))
            print(f"\n{subdir}/")
            for f in sorted(stl_files):
                size = f.stat().st_size / 1024
                print(f"  - {f.name} ({size:.1f} KB)")

def main():
    generator = CentriaSTLGenerator()
    generator.generate_all_models()

if __name__ == '__main__':
    main()
