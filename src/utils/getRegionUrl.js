function getRegionUrl(region) {
  switch (region) {
    case 'BR':
      return 'https://br1.api.riotgames.com';
    case 'NA':
      return 'https://na1.api.riotgames.com';
    case 'EUN':
      return 'https://eun1.api.riotgames.com';
    case 'EUW':
      return 'https://euw1.api.riotgames.com';
    case 'JP':
      return 'https://jp1.api.riotgames.com';
    case 'KR':
      return 'https://kr1.api.riotgames.com';
    case 'LA1':
      return 'https://la1.api.riotgames.com';
    case 'LA2':
      return 'https://la2.api.riotgames.com';
    case 'OC':
      return 'https://oc1.api.riotgames.com';
    case 'TR':
      return 'https://tr1.api.riotgames.com';
    case 'RU':
      return 'https://ru.api.riotgames.com';
    default:
      return 'https://na1.api.riotgames.com';
  }
}

export default getRegionUrl;
