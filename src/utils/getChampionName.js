function getChampionName(id, champions) {
  for (let champion in champions) {
    if (parseInt(champions[champion].key) === id) {
      return champions[champion].name;
    }
  }
}

export default getChampionName;
