import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { stringify } from 'querystring';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(students: any[], filter: string, sorting: string): unknown {
    if (sorting===undefined && isNullOrUndefined(filter)){
      return students;
    }
    if (!isNullOrUndefined(students) && sorting !== undefined){
      switch(sorting){
        case 'id':{
          students=students.sort((function (a, b){
            if (a.id < b.id)
              return -1;
            else if (a.id > b.id)
              return 1;
            else 
              return 0;
            }))
          break;
        }
        case 'id2':{
          students=students.sort((function (a, b){
            if (a.id > b.id)
              return -1;
            else if (a.id < b.id)
              return 1;
            else 
              return 0;
          }))
          break;
        }
        case 'alf':{
          students=students.sort((function (a, b){
            if (a.surname[0] < b.surname[0] )
              return -1;
            else if (a.surname[0]  > b.surname[0] )
              return 1;
            else 
              return 0;
          }))
          break;
        }
        case 'alf1':{
          students=students.sort((function (a, b){
            if (a.surname[0] > b.surname[0] )
              return -1;
            else if (a.surname[0]  < b.surname[0] )
              return 1;
            else 
              return 0;
          }))
          break;
        }
      }
    }

    if (!isNullOrUndefined(students) && !isNullOrUndefined(filter)){
      let filt = students.filter(
        student => (student.name.toLowerCase().indexOf(filter.toLowerCase())==0 || student.surname.toLowerCase().indexOf(filter.toLowerCase())==0 || student.middlename.toLowerCase().indexOf(filter.toLowerCase())==0));
      return filt;
    }
    return students;
  }
}
