import { Pipe, PipeTransform } from '@angular/core';
import { Kursevi } from './kursevi.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Kursevi[], filterString: string, tip: string, search: string): any {
    // let kursevi: Kursevi[];
    // kursevi = [];


    // for (let kurs of value) {


    //   // kurs.imeKursa = 'HAHAH';
    //   // kursevi.push(kurs);

    //   if (kurs.tipKursa == 'javascript') {
    //     kursevi.push(kurs);
    //   }





    //   kursevi.sort((a, b) => {
    //     return +b.cenaKursa - +a.cenaKursa;
    //   })




    // }
    // return kursevi;
    if (value?.length === 0) {
      return value;
    }
    let resultArray: Kursevi[] = [];

    for (const kurs of value) {


      // if(kurs.tipKursa.includes(filterString) || kurs.imeKursa === filterString){
      //   resultArray.push(kurs)
      // }
      resultArray.push(kurs);




    }

    switch (filterString) {
      case 'cenarastuce':

        resultArray.sort((a, b) => {
          return +b.cenaKursa - +a.cenaKursa;


        })

        break;
      case 'cenaopadajuce':
        resultArray.sort((a, b) => {
          return +a.cenaKursa - +b.cenaKursa;


        })
        break;
      case 'a-z':
        resultArray.sort((a, b) => {
          return a.imeKursa.localeCompare(b.imeKursa);
        })
        break;

      case 'z-a':
        resultArray.sort((a, b) => {
          return b.imeKursa.localeCompare(a.imeKursa);
        })
        break;



      default:
        break;
    }




    // if (filterString === 'cenarastuce') {
    //   resultArray.sort((a, b) => {
    //     return +b.cenaKursa - +a.cenaKursa;


    //   })




    // }


    // if (filterString === 'cenaopadajuce') {
    //   resultArray.sort((a, b) => {
    //     return +a.cenaKursa - +b.cenaKursa;


    //   })







    // }
    let i = 0;

    // for (const result of resultArray) {
    //   if (result.tipKursa !== tip) {



    //   }
    //   i++;
    // }
    if (tip !== '') {
      resultArray = resultArray.filter(a => a.tipKursa == tip);


    }

    if(search !== ''){
      resultArray = resultArray.filter(a => a.imeKursa.toLowerCase().includes(search.toLowerCase()));
    }




    return resultArray;
  }

}
