import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListingDataSource } from './listing-datasource';
import { ListingService } from '../common/listing.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListingDataSource;

  displayedColumns = [];
  model: string;
  search: string = '';

  constructor(private listingService: ListingService, private router: Router) {
    this.router.events
      .pipe(filter(route => route instanceof NavigationEnd))
      .subscribe((route: NavigationEnd) => {
        this.model = route.url.split('/')[1];
        this.setIdentifierColumn();
      });
  }

  ngOnInit() {
    this.dataSource = new ListingDataSource(this.model, this.listingService);
    this.dataSource.loadItems();
  }

  getUpdate(event) {
    this.dataSource.loadItems(
      this.search,
      this.sort.direction,
      event.pageIndex,
      event.pageSize,
    );
  }

  setFilter() {
    this.dataSource.loadItems(
      this.search,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
    );
  }

  setIdentifierColumn() {
    switch (this.model) {
      case 'registered-client':
        this.displayedColumns.unshift('clientId');
        break;
      case 'queue-log':
        this.displayedColumns.unshift('queueId');
        break;
      default:
        break;
    }
  }

  setColumnName(camelCase) {
    const result = camelCase.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
