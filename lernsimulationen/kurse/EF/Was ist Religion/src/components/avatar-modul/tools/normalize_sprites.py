from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
TILE_SIZE = 256


SHEETS = {
    "avatars-female-teen.png": {
        "size": (1619, 971),
        "x": [(19, 323), (337, 641), (656, 960), (975, 1279), (1294, 1600)],
        "y": [(18, 320), (334, 636), (649, 952)],
    },
    "avatars-male-teen.png": {
        "size": (1619, 971),
        "x": [(12, 324), (335, 643), (655, 963), (975, 1283), (1295, 1608)],
        "y": [(12, 321), (333, 630), (641, 960)],
    },
    "avatars-nonbinary-teen.png": {
        "size": (1823, 863),
        "x": [(45, 593), (635, 1184), (1224, 1774)],
        "y": [(48, 814)],
    },
    "avatars-historical-female.png": {
        "size": (1254, 1254),
        "x": [(6, 246), (254, 490), (497, 728), (736, 976), (983, 1247)],
        "y": [(6, 267), (274, 526), (531, 773), (780, 1005)],
    },
    "avatars-historical-male.png": {
        "size": (1536, 1024),
        "x": [(17, 299), (317, 584), (601, 870), (887, 1160), (1178, 1519)],
        "y": [(17, 256), (273, 503), (520, 744), (761, 1008)],
    },
}


def normalize_sheet(path: Path, spec: dict) -> None:
    with Image.open(path) as source:
        source = source.convert("RGB")
        normalized_size = (len(spec["x"]) * TILE_SIZE, len(spec["y"]) * TILE_SIZE)
        if source.size == normalized_size:
            print(f"{path.name}: bereits normalisiert ({normalized_size[0]}x{normalized_size[1]} Pixel)")
            return
        if source.size != spec["size"]:
            raise RuntimeError(f"Unerwartete Ausgangsgröße für {path.name}: {source.size}")

        columns = len(spec["x"])
        rows = len(spec["y"])
        output = Image.new("RGB", (columns * TILE_SIZE, rows * TILE_SIZE), "white")

        for row, (top, bottom) in enumerate(spec["y"]):
            for column, (left, right) in enumerate(spec["x"]):
                tile = source.crop((left, top, right, bottom))
                tile = ImageOps.fit(
                    tile,
                    (TILE_SIZE, TILE_SIZE),
                    method=Image.Resampling.LANCZOS,
                    centering=(0.5, 0.4),
                )
                output.paste(tile, (column * TILE_SIZE, row * TILE_SIZE))

        output.save(path, format="PNG", optimize=True)
        print(f"{path.name}: {columns}x{rows} Felder, {output.size[0]}x{output.size[1]} Pixel")


for filename, sheet_spec in SHEETS.items():
    normalize_sheet(ASSETS / filename, sheet_spec)
