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


# ── 5. Evidence Bar Chart (positive results) ──────────────────────────────────

def gen_evidence_chart():
    studies = [
        ('Karnataka, India\n(Dani 2019)',       24,  'Peer-reviewed'),
        ('UAE 30-year\n(Bruintjes 2021)',        12.5,'Peer-reviewed'),
        ('WRF Model\n(Xue 2023)',                10,  'Numerical model'),
        ('WMO Global\nConsensus (2022)',          17.5,'WMO assessment'),
        ('India CAIPEEX\n(Prabha 2023)',          None,'Randomized trial'),
    ]

    fig, ax = plt.subplots(figsize=(5.2, 5.4), facecolor=NAVY)
    ax.set_facecolor(NAVY)

    bar_colors = [GOLD, GOLD, '#C8A020', '#D4AC30', GOLD]
    ys = range(len(studies))

    for i, (label, val, stype) in enumerate(studies):
        if val is not None:
            bar = ax.barh(i, val, color=bar_colors[i], alpha=0.9, height=0.55, zorder=3)
            ax.text(val + 0.4, i, f'+{val}%', color=WHITE, fontsize=9,
                    va='center', fontweight='bold')
        else:
            ax.barh(i, 28, color=GOLD, alpha=0.4, height=0.55, zorder=3,
                    hatch='///', edgecolor=GOLD)
            ax.text(1.0, i, 'Statistically significant (p < 0.05)', color=WHITE,
                    fontsize=8.5, va='center', style='italic')

    ax.set_yticks(list(ys))
    ax.set_yticklabels([s[0] for s in studies], color=WHITE, fontsize=8.5)
    ax.set_xlabel('Precipitation Enhancement (%)', color=GRAY, fontsize=8.5)
    ax.set_xlim(0, 32)
    ax.tick_params(colors=GRAY, labelsize=8)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    for spine in ['bottom', 'left']:
        ax.spines[spine].set_color('#3A4A5A')
    ax.xaxis.label.set_color(GRAY)
    ax.tick_params(axis='x', colors=GRAY)
    ax.tick_params(axis='y', colors=WHITE)
    ax.set_title('Documented Precipitation Enhancement by Study',
                 color=WHITE, fontsize=10, fontweight='bold', pad=10)
    ax.text(16, -0.85, 'Source: WMO (2022), Prabha (2023), Bruintjes (2021), Dani (2019), Xue (2023)',
            color=GRAY, fontsize=6.5, ha='center', style='italic')
    ax.grid(axis='x', color='#2A3A4A', linewidth=0.5, zorder=0)

    plt.tight_layout()
    return save(fig, 'evidence-chart.png')


# ── 6. Queensland Null Result Map ─────────────────────────────────────────────

def gen_queensland_map():
    land = gpd.read_file(get_path('naturalearth.land'))
    bbox = shapely_box(136.0, -30.0, 156.0, -10.0)
    land_clip = land.clip(bbox)

    fig, ax = plt.subplots(figsize=(5.2, 5.4), facecolor=NAVY)
    ax.set_facecolor(OCEAN)

    land_clip.plot(ax=ax, color=LAND, edgecolor='#4A5A6A', linewidth=0.5)

    # Rough Queensland outline
    qld = Polygon([
        (138.0,-26.0),(141.0,-26.0),(141.0,-29.0),(149.0,-29.0),
        (153.5,-28.0),(153.5,-20.0),(148.0,-19.5),(145.0,-14.5),
        (142.5,-10.5),(138.0,-16.0),(138.0,-26.0)
    ])
    qld_gdf = gpd.GeoDataFrame({'geometry': [qld]}, crs='EPSG:4326')
    qld_gdf.plot(ax=ax, color='#8B3A3A', edgecolor=GOLD, linewidth=1.5, alpha=0.75, zorder=3)

    # Trial zone marker (coastal Queensland)
    ax.add_patch(plt.Circle((152.5, -27.5), 1.2, color=GOLD, alpha=0.2, zorder=4))
    ax.add_patch(plt.Circle((152.5, -27.5), 1.2, fill=False,
                            edgecolor=GOLD, lw=1.2, ls='--', zorder=4))
    ax.text(152.5, -27.5, 'Trial\nZone', color=WHITE, fontsize=8,
            ha='center', va='center', fontweight='bold', zorder=5)

    # Brisbane marker
    ax.plot(153.02, -27.47, 'o', color=WHITE, ms=5, zorder=6)
    ax.text(153.3, -27.3, 'Brisbane', color=LIGHT, fontsize=8, va='center', zorder=6)

    ax.set_xlim(137.0, 155.5)
    ax.set_ylim(-29.5, -10.5)
    ax.axis('off')

    ax.text(146.0, -10.8, 'Queensland, Australia',
            color=WHITE, fontsize=11, fontweight='bold', ha='center', va='top')
    ax.text(146.0, -11.8, 'Randomized trial: NO significant effect detected',
            color='#FF7070', fontsize=9, ha='center', va='top', fontweight='bold')

    legend_items = [
        mpatches.Patch(color='#8B3A3A', label='Queensland state'),
        plt.Line2D([0],[0], color=GOLD, lw=1.5, ls='--',
                   marker='o', markersize=6, label='Cloud seeding trial zone'),
    ]
    ax.legend(handles=legend_items, loc='lower left',
              facecolor=NAVY, edgecolor=GOLD, labelcolor=WHITE,
              fontsize=8, framealpha=0.9)

    ax.text(146.0, -29.2, 'Source: Soderholm et al. (2012) BAMS  |  doi.org/10.1175/BAMS-D-11-00060.1',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic')

    return save(fig, 'queensland-map.png')


# ── 7. Jungle Military Operation (stylized illustration) ─────────────────────

def gen_jungle():
    fig, ax = plt.subplots(figsize=(5.2, 5.4), facecolor='#0A1208')
    ax.set_facecolor('#0A1208')
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    np.random.seed(7)

    # Heavy rain streaks
    for _ in range(220):
        x = np.random.uniform(0, 10)
        y0 = np.random.uniform(0, 10)
        length = np.random.uniform(0.3, 0.9)
        alpha = np.random.uniform(0.25, 0.6)
        ax.plot([x, x - 0.12], [y0, y0 - length], color='#7AB8D4', lw=0.6, alpha=alpha)

    # Dark jungle canopy layers
    canopy_layers = [
        (0.0, 2.2, '#0D2010'), (0.0, 1.4, '#0A1A0C'),
        (0.0, 0.9, '#081508'),
    ]
    for y0, yh, col in canopy_layers:
        xs = np.linspace(0, 10, 120)
        ys = y0 + yh * (0.5 + 0.5 * np.sin(xs * 1.8 + np.random.uniform(0, 2)))
        ax.fill_between(xs, 0, ys, color=col, alpha=0.9, zorder=3)

    # Tree trunks
    for tx in np.random.uniform(0.5, 9.5, 12):
        th = np.random.uniform(2.5, 5.0)
        ax.plot([tx, tx + np.random.uniform(-0.2, 0.2)], [0, th],
                color='#0C1A0A', lw=np.random.uniform(3, 7), alpha=0.7, zorder=2)

    # Mud / flooded ground patches
    for mx, my, mr in zip(np.random.uniform(1, 9, 8), np.random.uniform(0.3, 1.8, 8),
                           np.random.uniform(0.3, 0.9, 8)):
        ellipse = mpatches.Ellipse((mx, my), mr * 2, mr * 0.5,
                                   color='#1A1200', alpha=0.65, zorder=4)
        ax.add_patch(ellipse)

    # Standing water reflections
    for wx in np.random.uniform(0.5, 9.5, 15):
        wy = np.random.uniform(0.2, 1.5)
        ax.plot([wx - 0.3, wx + 0.3], [wy, wy], color='#2A4A5A', lw=1.2, alpha=0.5, zorder=5)

    # Lightning strike
    lx, ly = 7.5, 9.8
    bolt = [(lx, ly), (lx-0.3, ly-1.5), (lx-0.1, ly-1.5), (lx-0.5, ly-3.2), (lx-0.3, ly-3.2), (lx-0.7, ly-5.0)]
    bx = [p[0] for p in bolt]
    by = [p[1] for p in bolt]
    ax.plot(bx, by, color='#FFFFAA', lw=2.5, alpha=0.85, zorder=6)
    ax.plot(bx, by, color='WHITE', lw=0.8, alpha=0.5, zorder=6)

    # Glow around lightning
    ax.add_patch(plt.Circle((7.2, 4.8), 1.5, color='#FFFF88', alpha=0.04, zorder=5))

    # Dark atmospheric text overlay
    ax.text(5, 9.3, 'Operation Popeye', color='#DDDDCC', fontsize=12,
            ha='center', va='top', fontweight='bold', alpha=0.9,
            fontfamily='monospace')
    ax.text(5, 8.6, '2,600+ cloud seeding missions  |  1967–1972',
            color='#AABBAA', fontsize=8, ha='center', va='top', alpha=0.8,
            fontfamily='monospace')

    ax.text(5, 0.25, 'Source: U.S. Senate Commerce Committee (1978)  |  govinfo.gov',
            color='#556655', fontsize=6.5, ha='center', va='bottom', style='italic')

    return save(fig, 'jungle-military.png')


# ── State slides ─────────────────────────────────────────────────────────────

def state_base(title, subtitle, bg_top, bg_bot, accent):
    """Shared canvas for state illustration slides."""
    fig, ax = plt.subplots(figsize=(5.2, 5.4), facecolor=bg_top)
    ax.set_facecolor(bg_top)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    # gradient sky
    for i, y in enumerate(np.linspace(10, 4, 60)):
        c = i / 60
        col = tuple(s * (1-c) + e * c for s, e in zip(
            tuple(int(bg_top.lstrip('#')[j*2:j*2+2], 16)/255 for j in range(3)),
            tuple(int(bg_bot.lstrip('#')[j*2:j*2+2], 16)/255 for j in range(3))
        ))
        ax.axhline(y=y, color=col, lw=3.5, zorder=0)
    ax.text(5, 9.6, title, color=WHITE, fontsize=13, fontweight='bold',
            ha='center', va='top', zorder=10)
    ax.text(5, 9.0, subtitle, color=accent, fontsize=9,
            ha='center', va='top', zorder=10)
    return fig, ax

def gen_state_texas():
    fig, ax = state_base('Texas', 'Agriculture & Hail Suppression',
                          '#1A0F00', '#4A2800', GOLD)
    np.random.seed(3)
    # Wide flat farmland
    ax.fill_between([0, 10], [0, 0], [2.2, 2.2], color='#3A2800', zorder=2)
    # Crop rows
    for cx in np.linspace(0.3, 9.7, 18):
        ax.plot([cx, cx], [0, 2.0], color='#5A4010', lw=1.8, alpha=0.6, zorder=3)
    # Storm clouds (large cumulonimbus)
    for cx, cy, r in [(3.0, 5.5, 1.8), (6.5, 6.0, 2.0), (1.5, 4.8, 1.2), (8.5, 5.0, 1.3)]:
        ax.add_patch(plt.Circle((cx, cy), r, color='#2A2A35', alpha=0.88, zorder=4))
        ax.add_patch(plt.Circle((cx - r*0.3, cy + r*0.4), r*0.7, color='#303040', alpha=0.85, zorder=4))
    # Hail suppression aircraft
    ax.annotate('', xy=(5.5, 5.8), xytext=(2.5, 4.5),
                arrowprops=dict(arrowstyle='->', color=GOLD, lw=2.0))
    ax.text(2.2, 4.2, '✈ seeding\naircraft', color=GOLD, fontsize=7.5,
            ha='center', va='top', zorder=8)
    # Hail suppression zone circle
    ax.add_patch(plt.Circle((5.5, 5.8), 1.5, fill=False,
                            edgecolor=GOLD, lw=1.5, ls='--', alpha=0.7, zorder=6))
    ax.text(5.5, 7.5, 'Hail suppression zone', color=GOLD, fontsize=7.5,
            ha='center', va='bottom', zorder=8)
    # Rain below cloud (good rain, not hail)
    for rx in np.random.uniform(3.5, 7.5, 25):
        ry = np.random.uniform(2.2, 4.5)
        ax.plot([rx, rx - 0.05], [ry, ry - 0.5], color='#6090B0', lw=0.9, alpha=0.55, zorder=5)
    ax.text(5, 0.3, 'Source: TDLR Texas  |  tdlr.texas.gov/weather/summary.htm',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic', zorder=10)
    return save(fig, 'state-texas.png')

def gen_state_utah():
    fig, ax = state_base('Utah', 'Snowpack Augmentation — Colorado River Basin',
                          '#0D1B2E', '#1A3050', '#A8C8E8')
    np.random.seed(11)
    # Mountain silhouettes
    for peaks, col in [
        ([(0,2),(2.5,7),(4,4),(5,8.5),(6.5,5),(8,7.5),(10,3),(10,0),(0,0)], '#1A2A3A'),
        ([(0,1.5),(1.5,5),(3,3),(4.5,6.5),(6,4),(7.5,6),(9,4.5),(10,2),(10,0),(0,0)], '#243040'),
        ([(0,1),(1,3.5),(2.5,2),(4,5),(5.5,3.5),(7,5.5),(8.5,3),(10,1.8),(10,0),(0,0)], '#2D3A48'),
    ]:
        ax.fill(peaks, color=col, zorder=2)
    # Snow caps
    for (px, py) in [(2.5,7),(5,8.5),(8,7.5)]:
        ax.fill([px-0.7, px, px+0.7], [py-1.2, py, py-1.2], color='#E8EEFF', alpha=0.85, zorder=4)
    # Snowflakes
    for sx, sy in zip(np.random.uniform(0.5,9.5,40), np.random.uniform(3,9,40)):
        ax.text(sx, sy, '❄', fontsize=np.random.uniform(6,12),
                color='#C8D8FF', alpha=np.random.uniform(0.4, 0.9),
                ha='center', va='center', zorder=5)
    # River at bottom (Colorado River)
    rx = np.linspace(0, 10, 100)
    ry = 0.8 + 0.3 * np.sin(rx * 1.2)
    ax.plot(rx, ry, color='#4080B0', lw=2.5, alpha=0.8, zorder=3)
    ax.text(8.5, 1.3, 'Colorado\nRiver', color='#6090C0', fontsize=7, ha='center', zorder=6)
    # Stats
    ax.text(5, 1.8, '185 remote generators  |  3–13% snowpack increase  |  $17M state investment (2023)',
            color='#A8C8E8', fontsize=7.5, ha='center', va='bottom', zorder=8)
    ax.text(5, 0.3, 'Source: USU Extension  |  extension.usu.edu/climate/research/cloud-seeding',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic', zorder=10)
    return save(fig, 'state-utah.png')

def gen_state_colorado():
    fig, ax = state_base('Colorado', 'Snowpack for Ski Tourism & Western Slope Agriculture',
                          '#0A1520', '#1A2C40', '#B0D0F0')
    np.random.seed(17)
    # Mountain range
    for peaks, col in [
        ([(0,1.5),(1.5,6),(3,4),(4.5,8),(6,5),(7.5,7),(9,4.5),(10,2),(10,0),(0,0)], '#1A2535'),
        ([(0,1),(1,4),(2.5,2.5),(4,6.5),(5.5,4),(7,6),(8.5,3.5),(10,1.5),(10,0),(0,0)], '#243045'),
    ]:
        ax.fill(peaks, color=col, zorder=2)
    # Heavy snow caps (more coverage = drought resilience)
    for px, py, w in [(1.5,6,1.0),(4.5,8,1.3),(7.5,7,1.1)]:
        ax.fill([px-w, px-w*0.3, px, px+w*0.3, px+w],
                [py-1.5, py-0.4, py, py-0.4, py-1.5],
                color='#E8EEFF', alpha=0.9, zorder=4)
    # Ski runs (diagonal lines on mountain face)
    for slope_x, slope_y in [(1.5, 5.5), (4.5, 7.5), (7.5, 6.5)]:
        for offset in [-0.25, 0, 0.25]:
            ax.plot([slope_x + offset, slope_x + offset + 0.5],
                    [slope_y, slope_y - 2.0],
                    color='#FFFFFF', lw=0.9, alpha=0.35, zorder=5)
    # Cloud seeding aircraft trail
    ax.annotate('', xy=(8.0, 7.5), xytext=(3.5, 9.0),
                arrowprops=dict(arrowstyle='->', color=GOLD, lw=1.8,
                               connectionstyle='arc3,rad=-0.2'))
    ax.text(2.5, 9.2, '✈ seeding run', color=GOLD, fontsize=8, ha='center', zorder=8)
    # Snowflakes
    for sx, sy in zip(np.random.uniform(0.5,9.5,35), np.random.uniform(2.5,8.5,35)):
        ax.text(sx, sy, '❄', fontsize=np.random.uniform(5,11),
                color='#C0D5FF', alpha=np.random.uniform(0.4, 0.85),
                ha='center', va='center', zorder=6)
    ax.text(5, 1.5, '7 permitted winter projects (Western Slope)  |  CO Water Conservation Board',
            color='#B0D0F0', fontsize=7.5, ha='center', va='bottom', zorder=8)
    ax.text(5, 0.3, 'Source: KUNC (Apr 2026)  |  Colorado Water Conservation Board',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic', zorder=10)
    return save(fig, 'state-colorado.png')

def gen_state_idaho():
    fig, ax = state_base('Idaho', 'Mountain Snowpack for Agricultural Spring Runoff',
                          '#0C1A10', '#1A3020', '#90C878')
    np.random.seed(23)
    # Mountains
    for peaks, col in [
        ([(0,2),(2,7),(4,4.5),(6,8),(8,5.5),(10,3),(10,0),(0,0)], '#152510'),
        ([(0,1.5),(1.5,5),(3,3),(5,7),(7,4.5),(9,3.5),(10,2),(10,0),(0,0)], '#1E3018'),
    ]:
        ax.fill(peaks, color=col, zorder=2)
    # Snow caps
    for px, py, w in [(2,7,0.9),(6,8,1.1),(5,7,0.7)]:
        ax.fill([px-w, px, px+w], [py-1.3, py, py-1.3],
                color='#E0EEE0', alpha=0.85, zorder=4)
    # River / spring runoff flowing down
    rx = np.array([4.5, 4.3, 4.6, 4.2, 4.5, 4.8, 4.4, 4.7, 5.0])
    ry = np.array([7.0, 6.0, 5.0, 4.0, 3.2, 2.5, 1.8, 1.2, 0.5])
    ax.plot(rx, ry, color='#4090C0', lw=3, alpha=0.75, zorder=5)
    ax.text(5.5, 3.8, 'Spring\nrunoff', color='#70B0D0', fontsize=7.5,
            ha='left', va='center', zorder=7)
    # Farmland at base
    ax.fill_between([0, 10], [0, 0], [1.0, 1.0], color='#2A4010', zorder=3)
    for fx in np.linspace(0.5, 9.5, 14):
        ax.plot([fx, fx], [0, 0.9], color='#3A5018', lw=2, alpha=0.6, zorder=4)
    # Snowflakes
    for sx, sy in zip(np.random.uniform(0.5,9.5,30), np.random.uniform(4,9,30)):
        ax.text(sx, sy, '❄', fontsize=np.random.uniform(5,10),
                color='#C8E0C8', alpha=np.random.uniform(0.4, 0.8),
                ha='center', va='center', zorder=6)
    ax.text(5, 1.2, 'Expanding program  |  Western states water coordination',
            color='#90C878', fontsize=7.5, ha='center', va='bottom', zorder=8)
    ax.text(5, 0.3, 'Source: GAO-11-11 (2010)  |  Western Governors\' Association',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic', zorder=10)
    return save(fig, 'state-idaho.png')

def gen_state_arizona():
    fig, ax = state_base('Arizona', 'CAP Co-Funds Upstream Seeding — No In-State Program Yet',
                          '#1A0A00', '#3A1800', '#D4A060')
    np.random.seed(31)
    # Desert landscape
    ax.fill_between([0, 10], [0, 0], [2.0, 2.0], color='#3A2000', zorder=2)
    # Saguaro cacti
    for cx in [1.5, 3.2, 5.8, 7.5, 9.0]:
        h = np.random.uniform(2.5, 4.0)
        ax.plot([cx, cx], [2.0, 2.0+h], color='#284018', lw=6, solid_capstyle='round', zorder=3)
        for arm_y, arm_dir in [(2.0 + h*0.5, -1), (2.0 + h*0.6, 1)]:
            ax.plot([cx, cx + arm_dir*0.8], [arm_y, arm_y], color='#284018', lw=4,
                    solid_capstyle='round', zorder=3)
            ax.plot([cx + arm_dir*0.8, cx + arm_dir*0.8],
                    [arm_y, arm_y + 0.8], color='#284018', lw=4,
                    solid_capstyle='round', zorder=3)
    # Colorado River (aqueduct)
    ax.fill_between(np.linspace(0, 10, 50),
                    0.4 + 0.15*np.sin(np.linspace(0,8,50)),
                    0.7 + 0.15*np.sin(np.linspace(0,8,50)),
                    color='#3060A0', alpha=0.7, zorder=4)
    ax.text(8.5, 0.95, 'Colorado\nRiver\naqueduct', color='#5080C0',
            fontsize=6.5, ha='center', va='bottom', zorder=6)
    # Dry cracked sun
    sun = plt.Circle((8, 8), 1.0, color='#D4A020', alpha=0.9, zorder=4)
    ax.add_patch(sun)
    for angle in np.linspace(0, 360, 12, endpoint=False):
        rad = np.radians(angle)
        ax.plot([8 + 1.1*np.cos(rad), 8 + 1.6*np.cos(rad)],
                [8 + 1.1*np.sin(rad), 8 + 1.6*np.sin(rad)],
                color='#D4A020', lw=1.5, alpha=0.7, zorder=4)
    # Arrow pointing north (to Utah/Colorado)
    ax.annotate('', xy=(2.5, 9.5), xytext=(2.5, 7.0),
                arrowprops=dict(arrowstyle='->', color='#A0C0E0', lw=2))
    ax.text(2.5, 6.5, 'CAP funds\nseeding in\nUT & CO', color='#A0C0E0',
            fontsize=7.5, ha='center', va='top', zorder=7)
    ax.text(5, 1.8, 'Central Arizona Project co-funds Utah & Colorado seeding  |  HB2056 under review',
            color='#D4A060', fontsize=7.5, ha='center', va='bottom', zorder=8)
    ax.text(5, 0.3, 'Source: GAO-11-11 (2010)  |  AZ Legislature HB2056',
            color=GRAY, fontsize=6.5, ha='center', va='bottom', style='italic', zorder=10)
    return save(fig, 'state-arizona.png')


# ── Run all ───────────────────────────────────────────────────────────────────

print('Generating images...')
gen_sai()
gen_world_map()
gen_us_map()
gen_popeye()
gen_evidence_chart()
gen_queensland_map()
gen_jungle()
gen_state_texas()
gen_state_utah()
gen_state_colorado()
gen_state_idaho()
gen_state_arizona()
print('Done.')
