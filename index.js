const { parse } = require('csv-parse');
const fs = require('fs');

const totalMarriages = [];

function Marriages(marriage) {
  return marriage['Same-Sex_or_Opposite_Sex'] === 'Same-sex'
    && marriage['Marriage_or_Civil_Union'] === 'Marriage' 
    && marriage['Period'] === '2020';
}

fs.createReadStream('MCUD-dec20-marriages-civil-union-by-relationship-type.csv')
  .pipe(parse({
    columns: true,
  }))
  .on('data', (data) => {
    if (Marriages(data)) {
      totalMarriages.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(totalMarriages.map((marriage) => {
        return marriage['Count'];
    }))
    console.log(`${totalMarriages.length} total marriages.`);
  });

// Same-Sex_or_Opposite_Sex = Opposite-sex
// Marriage_or_Civil_Union = Marriage
// Period = 2020

// oposite sex = [ '16347' ]
// total =  [ '16734' ]
// same sex = [ '387' ]