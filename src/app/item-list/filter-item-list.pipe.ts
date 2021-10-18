import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../item';

@Pipe({
    name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {
    transform(value: Array<Item>, type:string, keyWord: string): Item[] {
        if (type && keyWord) {
            type = type.toUpperCase();
            keyWord = keyWord.toUpperCase();
            return value.filter(item =>
                (item.type.toUpperCase().indexOf(type) >= 0) &&
                (item.description.toUpperCase().indexOf(keyWord) >= 0)
            );
        } else if (type) {
            type = type.toUpperCase();
            return value.filter(item =>
                item.type.toUpperCase().indexOf(type) >= 0
            );
        } else if (keyWord) {
            keyWord = keyWord.toUpperCase();
            return value.filter(item =>
                item.description.toUpperCase().indexOf(keyWord) >= 0
            );
        }
        return value;
    }
}