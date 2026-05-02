/**
 * Food image map — keys match menuData.image values
 */
export const FOOD_IMAGES = {
  'pork-ribs':       'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop',
  'pork-skewers':    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop',
  'pork-belly':      'https://images.unsplash.com/photo-1602526212253-54e7e57ce537?w=600&h=450&fit=crop',
  'lechon-kawali':   'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop',
  'chicken-inasal':  'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=450&fit=crop',
  'chicken-skewers': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop',
  'spicy-wings':     'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&h=450&fit=crop',
  'beef-tapa':       'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=600&h=450&fit=crop',
  'beef-ribs':       'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=450&fit=crop',
  'beef-skewers':    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop',
  'samgyeopsal':     'https://images.unsplash.com/photo-1593030668930-65e2ed5fcbf6?w=600&h=450&fit=crop',
  'bulgogi':         'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=600&h=450&fit=crop',
  'korean-chicken':  'https://images.unsplash.com/photo-1627662168781-d376389f8a22?w=600&h=450&fit=crop',
  'galbi':           'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=450&fit=crop',
  'bangus':          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=450&fit=crop',
  'blue-marlin':     'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=450&fit=crop',
  'garlic-shrimp':   'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=450&fit=crop',
  'squid-bbq':       'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&h=450&fit=crop',
  'calamansi-juice': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=450&fit=crop',
  'mango-shake':     'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=450&fit=crop',
  'buko-juice':      'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=450&fit=crop',
  'iced-tea':        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=450&fit=crop',
  'soda':            'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=450&fit=crop',
};

export const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop';

export const getItemImage = (key) => FOOD_IMAGES[key] || FALLBACK_IMG;
