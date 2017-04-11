Instruction to import data to mongodb:
(under terminal)

1. mongoimport -d tripedia -c cities cities.json
2. mongoimport -d tripedia -c tmp cityImg.json
3. mongoimport -d tripedia -c pois pois.json
4. node mergeData.js