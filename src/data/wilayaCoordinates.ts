// Coordinates of Algeria's 58 Wilaya Chefs-lieux
export interface WilayaCoord {
  name: string;
  lat: number;
  lon: number;
}

export const WILAYA_COORDINATES: Record<string, WilayaCoord> = {
  "01": { name: "Adrar", lat: 27.8742, lon: -0.2939 },
  "02": { name: "Chlef", lat: 36.1654, lon: 1.3345 },
  "03": { name: "Laghouat", lat: 33.8000, lon: 2.8651 },
  "04": { name: "Oum El Bouaghi", lat: 35.8754, lon: 7.1135 },
  "05": { name: "Batna", lat: 35.5559, lon: 6.1741 },
  "06": { name: "Béjaïa", lat: 36.7558, lon: 5.0843 },
  "07": { name: "Biskra", lat: 34.8504, lon: 5.7280 },
  "08": { name: "Béchar", lat: 31.6167, lon: -2.2167 },
  "09": { name: "Blida", lat: 36.4700, lon: 2.8300 },
  "10": { name: "Bouira", lat: 36.3749, lon: 3.9020 },
  "11": { name: "Tamanrasset", lat: 22.7850, lon: 5.5228 },
  "12": { name: "Tébessa", lat: 35.4042, lon: 8.1242 },
  "13": { name: "Tlemcen", lat: 34.8783, lon: -1.3150 },
  "14": { name: "Tiaret", lat: 35.3710, lon: 1.3170 },
  "15": { name: "Tizi Ouzou", lat: 36.7118, lon: 4.0459 },
  "16": { name: "Alger", lat: 36.7538, lon: 3.0588 },
  "17": { name: "Djelfa", lat: 34.6728, lon: 3.2536 },
  "18": { name: "Jijel", lat: 36.8205, lon: 5.7667 },
  "19": { name: "Sétif", lat: 36.1911, lon: 5.4137 },
  "20": { name: "Saïda", lat: 34.8303, lon: 0.1517 },
  "21": { name: "Skikda", lat: 36.8762, lon: 6.9092 },
  "22": { name: "Sidi Bel Abbès", lat: 35.1899, lon: -0.6308 },
  "23": { name: "Annaba", lat: 36.9000, lon: 7.7667 },
  "24": { name: "Guelma", lat: 36.4621, lon: 7.4261 },
  "25": { name: "Constantine", lat: 36.3650, lon: 6.6147 },
  "26": { name: "Médéa", lat: 36.2642, lon: 2.7539 },
  "27": { name: "Mostaganem", lat: 35.9311, lon: 0.0892 },
  "28": { name: "M'Sila", lat: 35.7058, lon: 4.5419 },
  "29": { name: "Mascara", lat: 35.3966, lon: 0.1403 },
  "30": { name: "Ouargla", lat: 31.9527, lon: 5.3340 },
  "31": { name: "Oran", lat: 35.6971, lon: -0.6308 },
  "32": { name: "El Bayadh", lat: 33.6832, lon: 1.0193 },
  "33": { name: "Illizi", lat: 26.4833, lon: 8.4667 },
  "34": { name: "Bordj Bou Arréridj", lat: 36.0732, lon: 4.7607 },
  "35": { name: "Boumerdès", lat: 36.7664, lon: 3.4772 },
  "36": { name: "El Tarf", lat: 36.7672, lon: 8.3138 },
  "37": { name: "Tindouf", lat: 27.6711, lon: -8.1474 },
  "38": { name: "Tissemsilt", lat: 35.6072, lon: 1.8108 },
  "39": { name: "El Oued", lat: 33.3683, lon: 6.8674 },
  "40": { name: "Khenchela", lat: 35.4358, lon: 7.1433 },
  "41": { name: "Souk Ahras", lat: 36.2864, lon: 7.9511 },
  "42": { name: "Tipaza", lat: 36.5897, lon: 2.4475 },
  "43": { name: "Mila", lat: 36.4503, lon: 6.2644 },
  "44": { name: "Aïn Defla", lat: 36.2644, lon: 1.9679 },
  "45": { name: "Naâma", lat: 33.2667, lon: -0.3167 },
  "46": { name: "Aïn Témouchent", lat: 35.2975, lon: -1.1404 },
  "47": { name: "Ghardaïa", lat: 32.4909, lon: 3.6736 },
  "48": { name: "Relizane", lat: 35.7373, lon: 0.5558 },
  "49": { name: "Timimoun", lat: 29.2639, lon: 0.2310 },
  "50": { "name": "Bordj Badji Mokhtar", lat: 21.3278, lon: 0.9542 },
  "51": { "name": "Ouled Djellal", lat: 34.4333, lon: 5.0667 },
  "52": { "name": "Béni Abbès", lat: 30.1333, lon: -2.1667 },
  "53": { "name": "In Salah", lat: 27.1936, lon: 2.4608 },
  "54": { "name": "In Guezzam", lat: 19.5683, lon: 5.7694 },
  "55": { "name": "Touggourt", lat: 33.1053, lon: 6.0578 },
  "56": { "name": "Djanet", lat: 24.5531, lon: 9.4844 },
  "57": { "name": "El M'Ghair", lat: 33.9500, lon: 5.9167 },
  "58": { "name": "El Meniaa", lat: 30.5833, lon: 2.8833 }
};

/**
 * Calculate Haversine distance in km between two wilayas
 * Multiplied by 1.25 road tortuosity factor to reflect Algerian road distance
 */
export function calculateWilayaDistanceKm(code1: string, code2: string): number {
  if (code1 === code2) return 15; // intra-wilaya standard local transit

  const c1 = WILAYA_COORDINATES[code1];
  const c2 = WILAYA_COORDINATES[code2];
  if (!c1 || !c2) return 250; // fallback standard inter-wilaya distance

  const R = 6371; // Earth radius in km
  const dLat = (c2.lat - c1.lat) * Math.PI / 180;
  const dLon = (c2.lon - c1.lon) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;

  // Road factor of ~1.25 for Algerian topography
  return Math.round(straightDistance * 1.25);
}

/**
 * Estimate logistics transport cost in DZD
 */
export function estimateLogisticsCostDzd(distanceKm: number, baseFee = 4000, ratePerKm = 35): number {
  return Math.round(baseFee + (distanceKm * ratePerKm));
}
