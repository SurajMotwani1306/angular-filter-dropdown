# angular-filter-dropdown

Filter your data respective to any field based on your dataset
Also, identifies duplications of data & handles with single checkbox created dynamically.

<br/>

<table>
  <tr>
    <td align="center">
      <img alt="Angular Filter Dropdown"
        src="projects/angular-filter-dropdown/src/lib/Screenshot/filter.PNG" />
    </td>
   </tr>
</table>

## Installation

```sh
npm i angular-filter-dropdown
```

## Usage

## Import
```ts
import { AngularFilterDropdownModule } from 'angular-filter-dropdown';

@NgModule({
  ...
  imports: [
    ...
    AngularFilterDropdownModule
  ],
  ...
})
```

## Fundamental Usage
```html
<lib-angular-filter-dropdown 
    [tableData]="data" 
    [columnName]="colName" 
    (onCheckBoxStatusChanged)="checkboxStatusChange($event)" 
    (onUnselectAll)="getStatusOfUnselectedAll($event)">
</lib-angular-filter-dropdown>
```

# Configuration - Props
```ts
  checkboxStatusChange(event: any){
    console.log(event);
  }

  getStatusOfUnselectedAll(event: any){
    console.log(event);
  }

let data = [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com'},
      { id: 2, name: 'Jane Doe', age: 28, email: 'jane@example.com'},
      { id: 3, name: 'Michael Smith', age: 35, email: 'michael@example.com'},
      { id: 4, name: 'Emily Johnson', age: 25, email: 'emily@example.com'},
      { id: 5, name: 'James Brown', age: 32, email: 'james@example.com'},
      { id: 6, name: 'John Doe', age: 30, email: 'john@example.com'},
      { id: 7, name: 'Jane Doe', age: 28, email: 'jane@example.com'},
      { id: 8, name: 'Michael Smith', age: 35, email: 'michael@example.com'},
      { id: 9, name: 'Emily Johnson', age: 25, email: 'emily@example.com'},
      { id: 10, name: 'James Brown', age: 32, email: 'james@example.com'}
    ],

let colName = "name"
```

For identifiation of duplication of data & handles with single checkbox dynamically
<br/>
Just an instance, shared piece of code below for duplication handling.
<br/>

```ts
checkboxStatusChange(event: any){
    let keysName = Object.keys(event);
    
    if(event[keysName[1]] === true){
      let result = this.replicaData.filter((obj: any) => obj[keysName[0]] === event[keysName[0]]);
      result.forEach((element:any) => {
        this.data.push(element);
        this.data.sort((a: any, b: any) => a.id - b.id)
      });
      
    }else{
      this.data = this.data.filter((obj: any) => obj[keysName[0]] !== event[keysName[0]]);
    }

    this.checkForDuplicationOfItems();
}

getStatusOfUnselectedAll(event: any){
    if(event === false){
      this.data = this.replicaData;
    }else{
      this.data = [];
    }
    this.checkForDuplicationOfItems();
}

checkForDuplicationOfItems(){
    this.data = this.data.filter((data: any, index: number) => data.id !== (this.data[index + 1]?.id));
}
```

## Fundamentals / Mandatories

| Property/Method         |  Type   | Description                                                             |
| ----------------------- | :-----: | -------------------------------------- |
| tableData               | Array   | Array of objects data/ table data      |
| columnName              | string  | To which field, you want to add filter |
| onCheckBoxStatusChanged | method  | On checkbox changes                    |
| onUnselectAll           | method  | Emits on select All or Unselect All    |


## Future Plans
- [ ] More decorative Approach in terms of CSS.
- [ ] Will come up with search functionality.

## Author
Suraj Motwani - Email: suraj.motwani1306@gmail.com

## License

Angular Filter Dropdown is available under the MIT license. See the LICENSE file for more info.

