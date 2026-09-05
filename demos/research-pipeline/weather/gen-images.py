#!/usr/bin/env python3
"""Generate the four presentation images for weather-modification-deck-v2.pptx"""

import os, urllib.request, warnings
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import geopandas as gpd
from shapely.geometry import Polygon, box as shapely_box
from geodatasets import get_path

warnings.filterwarnings('ignore')

HERE   = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, 'assets')
os.makedirs(ASSETS, exist_ok=True)

NAVY  = '#1A1A2E'
GOLD  = '#B8860B'
LIGHT = '#F0EDE6'
WHITE = '#FFFFFF'
GRAY  = '#888888'
OCEAN = '#0D1B2A'
LAND  = '#2D3A4A'


def save(fig, name):
    out = os.path.join(ASSETS, name)
    fig.savefig(out, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    print(f'  saved: {out}')
    return out


# ── 1. SAI Atmosphere Cross-Section ─────────────────────────────────────────

def gen_sai():
    fig, ax = plt.subplots(figsize=(5.2, 5.4), facecolor=NAVY)
    ax.set_facecolor(NAVY)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    layers = [
        (0.0, 0.6,  '#2A1F10', 'Ground',                     '0 km'),
        (0.6, 3.8,  '#1E4070', 'Troposphere\n(weather)',      '0–12 km'),
        (3.8, 7.5,  '#0D2555', 'Stratosphere\n(SAI target)',  '12–50 km'),
        (7.5, 9.2,  '#070F1E', 'Mesosphere',                  '50–85 km'),
        (9.2, 10.0, '#020408', 'Space',                       ''),
    ]
    for y0, y1, col, label, alt in layers:
        ax.fill_between([0, 10], [y0, y0], [y1, y1], color=col, alpha=0.95, zorder=1)
        if y0 > 0:
            ax.axhline(y=y0, color='#3A5080', linewidth=0.5, alpha=0.4, zorder=2)
        ax.text(0.25, (y0 + y1) / 2, f'{label}\n{alt}',
                color='#AABBCC', fontsize=7.5, va='center', ha='left', zorder=3)

    # Stratosphere injection zone box
    ax.fill_between([2.0, 8.0], [3.8, 3.8], [7.5, 7.5],
                    color=GOLD, alpha=0.07, zorder=2)
    for xe in [2.0, 8.0]:
        ax.plot([xe, xe], [3.8, 7.5], color=GOLD, lw=1.2, ls='--', alpha=0.5, zorder=3)
    ax.text(5, 7.3, 'SAI INJECTION ZONE', color=GOLD, fontsize=9,
            ha='center', va='top', fontweight='bold', zorder=4)

    # Aerosol particles
    np.random.seed(42)
    px = np.random.uniform(2.2, 7.8, 90)
    py = np.random.uniform(4.1, 7.0, 90)
    ax.scatter(px, py, s=np.random.uniform(3, 14, 90), color=GOLD, alpha=0.5, zorder=5)

    # Delivery arrow (ground to stratosphere)
    ax.annotate('', xy=(5, 4.6), xytext=(5, 0.8),
                arrowprops=dict(arrowstyle='->', color=GOLD, lw=2.2))
    ax.text(5.35, 2.6, 'Aerosol delivery\n(aircraft / balloon)',
            color=GOLD, fontsize=7.5, ha='left', va='center')

    # Incoming sunlight arrows
    for xi in [7.5, 8.2, 8.9]:
        ax.annotate('', xy=(xi - 0.5, 3.5), xytext=(xi + 0.1, 9.2),
                    arrowprops=dict(arrowstyle='->', color='#FFA030', lw=1.4, alpha=0.7))
    ax.text(8.2, 9.85, 'Sunlight', color='#FFA030', fontsize=7.5, ha='center', va='top')

    # Reflected arrows (back to space)
    for xi, ys, ye in [(4.2, 4.9, 8.8), (5.5, 4.4, 8.5), (6.8, 5.0, 8.9)]:
        ax.annotate('', xy=(xi + 0.4, ye), xytext=(xi, ys),
                    arrowprops=dict(arrowstyle='->', color=GOLD, lw=1.3, alpha=0.6,
                                   connectionstyle='arc3,rad=-0.25'))
    ax.text(5, 9.6, 'Reflected back to space', color=GOLD,
            fontsize=7.5, ha='center', va='bottom', alpha=0.85)

    # Sun
    ax.add_patch(plt.Circle((9.1, 9.5), 0.42, color='#FFD000', zorder=6))
    ax.text(9.1, 9.5, '☀', fontsize=17, ha='center', va='center', zorder=7)

    ax.text(5, 0.05, 'Source: Talati et al. (2022) Earth\'s Future  doi.org/10.1029/2021EF002545',
            color=GRAY, fontsize=6, ha='center', va='bottom', style='italic')

    return save(fig, 'sai-diagram.png')


# ── 2. World Map — 56 Countries ──────────────────────────────────────────────

def gen_world_map():
    land = gpd.read_file(get_path('naturalearth.land'))

    # Approximate centroids of ~56 countries with documented programs
    pts = [
        (39,-97),(24,54),(35,104),(22,79),(-27,133),   # USA UAE China India Australia
        (61,99),(24,45),(26,50),(32,53),(31,35),         # Russia Saudi Bahrain Iran Israel
        (31,37),(29,48),(32,-6),(22,57),(30,70),         # Jordan Kuwait Morocco Oman Pakistan
        (25,51),(-30,25),(36,128),(15,101),(39,35),      # Qatar S.Africa S.Korea Thailand Turkey
        (47,2),(51,10),(40,-3),(43,12),(47,8),           # France Germany Spain Italy Switzerland
        (-35,-65),(-15,-52),(23,-102),(56,-96),(48,68),  # Argentina Brazil Mexico Canada Kazakhstan
        (28,3),(27,30),(27,17),(9,8),(-1,38),            # Algeria Egypt Libya Nigeria Kenya
        (-5,118),(3,110),(12,122),(36,138),(-41,174),   # Indonesia Malaysia Philippines Japan NZ
        (39,22),(39,-8),(52,5),(63,10),(60,17),          # Greece Portugal Netherlands Norway Sweden
        (62,25),(52,20),(50,16),(-35,-72),(4,-74),       # Finland Poland Czech Chile Colombia
        (-10,-76),(8,-65),(-20,30),(-6,35),(9,40),       # Peru Venezuela Zimbabwe Tanzania Ethiopia
    ]
    lats = [p[0] for p in pts]
    lons = [p[1] for p in pts]

    fig, ax = plt.subplots(figsize=(10, 5.4), facecolor=NAVY)
    ax.set_facecolor(OCEAN)
    land.plot(ax=ax, color=LAND, edgecolor='#3A4A5A', linewidth=0.4, alpha=0.95)
    ax.scatter(lons, lats, s=32, color=GOLD, alpha=0.92, zorder=5,
               edgecolors='white', linewidths=0.35)

    for name, lat, lon, tx, ty in [
        ('USA',   39,  -97, -120, 52), ('UAE',  24,  54,  62, 32),
        ('China', 35,  104, 118, 44),  ('India', 22, 79,  92, 14),
    ]:
        ax.annotate(name, xy=(lon, lat), xytext=(tx, ty),
                    color=WHITE, fontsize=7, ha='center', zorder=6,
                    arrowprops=dict(arrowstyle='-', color=GOLD, lw=0.6, alpha=0.7))

    ax.set_xlim(-180, 180)
    ax.set_ylim(-60, 90)
    ax.axis('off')
    ax.text(0, 89, '56 Countries with Active Weather Modification Programs',
            color=WHITE, fontsize=11, fontweight='bold', ha='center', va='top')
    ax.text(0, -56, 'Source: World Meteorological Organization (WMO) 2022  |  library.wmo.int',
            color=GRAY, fontsize=7, ha='center', va='bottom', style='italic')

    return save(fig, 'world-map.png')


# ── 3. US States Map ─────────────────────────────────────────────────────────

STATES_URL   = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json'
STATES_CACHE = os.path.join(ASSETS, '_us-states.json')

ACTIVE = {'Texas','Colorado','Utah','Idaho','California','Wyoming','Nevada','North Dakota','New Mexico'}

ABBR = {
    'Texas':'TX','Colorado':'CO','Utah':'UT','Idaho':'ID',
    'California':'CA','Wyoming':'WY','Nevada':'NV','North Dakota':'ND','New Mexico':'NM',
}
LABEL_POS = {
    'Texas':(-99,31),'Colorado':(-105.5,39),'Utah':(-111.5,39.3),
    'Idaho':(-114.5,44),'California':(-119.5,37),'Wyoming':(-107.5,43),
    'Nevada':(-116.7,39),'North Dakota':(-100.5,47.5),'New Mexico':(-106,34.5),
}

def gen_us_map():
    if not os.path.exists(STATES_CACHE):
        print('  Downloading US states GeoJSON...')
        urllib.request.urlretrieve(STATES_URL, STATES_CACHE)
    states = gpd.read_file(STATES_CACHE)

    fig, ax = plt.subplots(figsize=(10, 6.5), facecolor=NAVY)
    ax.set_facecolor(NAVY)

    inactive = states[~states['name'].isin(ACTIVE)]
    active   = states[states['name'].isin(ACTIVE)]
    inactive.plot(ax=ax, color='#2D3A4A', edgecolor='#4A5A6A', linewidth=0.6)
    active.plot(ax=ax,   color=GOLD,      edgecolor=NAVY,      linewidth=1.0, alpha=0.9)

    for name, (lon, lat) in LABEL_POS.items():
        ax.text(lon, lat, ABBR[name], color=NAVY, fontsize=8, fontweight='bold',
                ha='center', va='center', zorder=5)

    ax.set_xlim(-130, -65)
    ax.set_ylim(22, 52)
    ax.axis('off')
    ax.text(-97, 51.8, 'Active Cloud Seeding States — United States',
            color=WHITE, fontsize=12, fontweight='bold', ha='center', va='top')

    legend_patches = [
        mpatches.Patch(color=GOLD,      label='Active cloud seeding program'),
        mpatches.Patch(color='#2D3A4A', label='No confirmed program'),
    ]
    ax.legend(handles=legend_patches, loc='lower right',
              facecolor=NAVY, edgecolor=GOLD, labelcolor=WHITE,
              fontsize=9, framealpha=0.9)
    ax.text(-97, 22.3, 'Source: GAO Report GAO-11-11 (2010)  |  gao.gov/products/gao-11-11',
            color=GRAY, fontsize=7.5, ha='center', va='bottom', style='italic')

    return save(fig, 'us-states-map.png')


# ── 4. Operation Popeye — Southeast Asia ─────────────────────────────────────

def gen_popeye():
    land = gpd.read_file(get_path('naturalearth.land'))
    bbox = shapely_box(98.0, 8.0, 112.0, 24.5)
    land_clip = land.clip(bbox)

    # Rough country outlines for illustration (not cartographically precise)
    vietnam  = Polygon([(102.1,22.5),(106.7,22.5),(109.5,18.0),(108.0,12.0),
                         (107.5,10.5),(104.8,10.3),(103.0,12.0),(102.0,17.5),(102.1,22.5)])
    laos     = Polygon([(100.1,22.5),(102.1,22.5),(102.0,17.5),(105.0,15.5),
                         (104.5,14.5),(102.5,14.2),(100.1,18.0),(100.1,22.5)])
    cambodia = Polygon([(102.5,14.2),(104.5,14.5),(107.5,13.5),(107.0,10.5),
                         (104.8,10.3),(103.0,12.0),(102.5,14.2)])

    region = gpd.GeoDataFrame(
        {'name': ['Vietnam','Laos','Cambodia'],
         'geometry': [vietnam, laos, cambodia]},
        crs='EPSG:4326'
    )

    # Ho Chi Minh Trail approximate route
    trail_lons = [105.8, 104.5, 103.5, 103.0, 104.0, 105.5, 106.2, 106.8, 107.2]
    trail_lats = [21.0,  19.5,  17.0,  15.0,  13.0,  12.5,  12.0,  11.0,  10.7]

    fig, ax = plt.subplots(figsize=(5.2, 5.8), facecolor=NAVY)
    ax.set_facecolor(OCEAN)

    land_clip.plot(ax=ax, color=LAND, edgecolor='#4A5A6A', linewidth=0.5)
    region.plot(ax=ax, color='#3A5C28', edgecolor=GOLD, linewidth=1.4, alpha=0.8, zorder=3)

    for _, row in region.iterrows():
        c = row.geometry.centroid
        ax.text(c.x, c.y, row['name'], color=WHITE, fontsize=8.5, fontweight='bold',
                ha='center', va='center', zorder=6)

    # Trail line
    ax.plot(trail_lons, trail_lats, color=GOLD, lw=2.5, ls='--', alpha=0.9, zorder=6)
    ax.text(102.5, 16.2, 'Ho Chi\nMinh Trail', color=GOLD, fontsize=8,
            ha='center', va='center', zorder=7,
            bbox=dict(boxstyle='round,pad=0.3', facecolor=NAVY, edgecolor=GOLD, alpha=0.85))

    # Seeding zone circles
    for lon_c, lat_c in [(103.5,17.5),(104.0,15.0),(103.5,13.5)]:
        ax.add_patch(plt.Circle((lon_c, lat_c), 0.75, color=GOLD, alpha=0.18, zorder=4))
        ax.add_patch(plt.Circle((lon_c, lat_c), 0.75, fill=False,
                                edgecolor=GOLD, lw=1.1, ls=':', zorder=4))

    # City markers
    for label, lon, lat, ha in [('Hanoi',105.85,21.03,'left'),('Ho Chi Minh City',106.63,10.82,'left')]:
        ax.plot(lon, lat, 'o', color=WHITE, ms=4, zorder=7)
        ax.text(lon+0.3, lat, label, color=LIGHT, fontsize=7.5, va='center', ha=ha, zorder=7)

    ax.set_xlim(98.5, 112.0)
    ax.set_ylim(8.5, 24.2)
    ax.axis('off')

    ax.text(105.0, 24.0, 'Operation Popeye (1967–1972)',
            color=WHITE, fontsize=10.5, fontweight='bold', ha='center', va='top')
    ax.text(105.0, 23.2, 'U.S. Military Cloud Seeding Zones',
            color=GOLD, fontsize=9, ha='center', va='top')

    legend_items = [
        mpatches.Patch(color='#3A5C28', label='Operation theater'),
        plt.Line2D([0],[0], color=GOLD, lw=2, ls='--', label='Ho Chi Minh Trail'),
        plt.Circle((0,0), 0.1, color=GOLD, alpha=0.5, label='Seeding zones'),
    ]
    ax.legend(handles=legend_items, loc='lower right',
              facecolor=NAVY, edgecolor=GOLD, labelcolor=WHITE,
              fontsize=7.5, framealpha=0.9)

    ax.text(105.0, 8.7, 'Source: U.S. Senate Commerce Committee (1978)  |  govinfo.gov',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic')

    return save(fig, 'popeye-map.png')


# ── Run all ───────────────────────────────────────────────────────────────────

print('Generating images...')
gen_sai()
gen_world_map()
gen_us_map()
gen_popeye()
print('Done.')
