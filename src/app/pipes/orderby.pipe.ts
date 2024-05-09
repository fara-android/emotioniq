import { Pipe, PipeTransform } from "@angular/core"; 
import { orderBy } from 'lodash'; 
  
@Pipe({ 
    name: "orderBy",
    standalone: true
}) 
export class OrderBy implements PipeTransform { 
    transform(array: any, key: any): any[] { 
        return orderBy(array, key, 'desc');
    } 
}