function getRegionUrl(region) {
  switch (region) {
    case 'BR':
      return 'br1.api.riotgames.com';
    case 'NA':
      return 'na1.api.riotgames.com';
    case 'EUN':
      return 'eun1.api.riotgames.com';
    case 'EUW':
      return 'euw1.api.riotgames.com';
    case 'JP':
      return 'jp1.api.riotgames.com';
    case 'KR':
      return 'kr1.api.riotgames.com';
    case 'LA1':
      return 'la1.api.riotgames.com';
    case 'LA2':
      return 'la2.api.riotgames.com';
    case 'OC':
      return 'oc1.api.riotgames.com';
    case 'TR':
      return 'tr1.api.riotgames.com';
    case 'RU':
      return 'ru.api.riotgames.com';
    default:
      return 'na1.api.riotgames.com';
  }
}

export default getRegionUrl;
