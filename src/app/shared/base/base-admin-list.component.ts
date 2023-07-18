import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '@shared/services/spinner-toggle.service';
import { Injector, Component, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SdkService } from '@shared/services/sdk.service';
import { defaultValues, ListOptions } from '@shared/constants/constants';
import { IonInfiniteScroll } from '@ionic/angular';
import { RefresherComponent } from '@shared/components/refresher/refresher.component';

interface OrFilters {
  dtoName: string;
  type?: string;
}
@Component({ template: '' })
export abstract class BaseAdminListComponent<T extends Entity> implements OnDestroy {
  @Output() paginated = new EventEmitter();
  list: T[];
  totalCount: number;
  id: string;
  infiniteScrollInterval: any;
  tabsNaviage: boolean;
  refresher: RefresherComponent;
  fullList: T[] = [];
  refreshing: boolean;
  listChange = new BehaviorSubject<{ entities: T[]; totalCount: number }>(undefined);
  itemsPerPage = defaultValues.items_per_page;
  currentPage = 1;
  originalTotalCount = 0;
  lastRes: any;
  searchTerm = '';
  options: PaginationInfo = {
    pageNumber: this.currentPage,
    pageSize: this.itemsPerPage,
    sortBy: '_id',
    sortOrder: 'desc'
  };
  optionsArr: any[] = [];
  searchDelay: any;
  isMulti: boolean;
  endpointName: string;
  secondOption: any;
  filterOptions: any[] = [];
  resolverName: string;
  infiniteScroll: IonInfiniteScroll;
  thirdOption: any;
  filters: OrFilters[];
  queryMode = 'or';
  showAlert: boolean;
  @ViewChild(IonInfiniteScroll, { static: false }) iScroll: IonInfiniteScroll;
  public spinner?: SpinnerService;
  public sdk: SdkService;
  public financeSdk: SdkService; // will change it once we have a real finance sdk
  public authenticationService: AuthService;
  private routee: ActivatedRoute;
  constructor(protected injector: Injector, private methodName: ListOptions) {
    this.endpointName = methodName.name;
    console.log(this.endpointName);
    this.spinner = this.injector.get(SpinnerService);
    this.sdk = injector.get(SdkService);
    this.financeSdk = injector.get(SdkService);
    this.routee = injector.get(ActivatedRoute);
    this.authenticationService = injector.get(AuthService);
    this.list = [];
  }
  paginateV2(page: number, searching?: boolean): Promise<void> {
    return new Promise((res) => {
      if (!this.methodName.noPagination) {
        if ((!this.methodName.infiniteScroll || searching) && !this.refreshing) {
          this.spinner.showSpinner();
        }
        let sdk = this.financeSdk;
        if (this.methodName.service) {
          sdk = this.financeSdk[this.methodName.service];
        }
        const opts = [];
        if (this.id) {
          opts.push(this.id);
        }
        opts.push({
          pagination: this.options,
          filters: this.filterOptions.length ? this.filterOptions : undefined,
          queryMode: this.queryMode
        });
        sdk[this.endpointName](...opts, ...this.optionsArr).then((data: PaginatedResult<T>) => {
          this.getData(data, searching);
          this.currentPage = page;
          this.spinner.hideSpinner();
          this.checkInfiniteScroll();
          res();
        });
      } else {
        this.currentPage = page || 1;
        res();
      }
    });
  }

  init() {
    this.routee.data.subscribe((data) => {
      // if (!this.tabsNaviage) {
      this.list = [];
      this.currentPage = 1;
      this.getData(data[this.resolverName]);
      this.originalTotalCount = this.totalCount;
      // }
    });
    this.infiniteScrollInterval = setInterval(() => {
      this.checkInfiniteScroll();
    }, 1000);
    // this.tabsNaviage = true;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.infiniteScrollInterval);
  }
  getData(res: any, searching?: boolean) {
    this.lastRes = res;
    this.fullList?.push(...res?.entities);
    if (!this.methodName.infiniteScroll || searching || this.refreshing) {
      this.list = res.entities;
    } else {
      this.list.push(...res?.entities);
    }
    this.listChange.next({ entities: res.entities, totalCount: res.totalCount });
    this.removeDups();
    this.totalCount = res.totalCount;
    this.checkInfiniteScroll();
    this.paginated.emit();
  }

  pageChanged(page: number, searching?: boolean) {
    this.options.pageNumber = page || 1;
    return this.paginateV2(page, searching);
  }
  handleInifniteScroll(event: any) {
    this.options.pageNumber = Math.ceil(this.list.length / this.itemsPerPage) + 1;
    this.currentPage = this.options.pageNumber;
    this.paginateV2(this.options.pageNumber, false).then(() => {
      event.target.complete();
      this.checkInfiniteScroll();
    });
  }
  search(input: string) {
    this.filterOptions = [];
    if (input && this.filters) {
      this.filters.forEach((data) => {
        if (!isNaN(+input) || data.type !== 'equal') {
          this.filterOptions.push({
            column: data.dtoName,
            option: data.type || 'contains',
            value: input
          });
        }
      });
    }
    clearTimeout(this.searchDelay);
    this.searchDelay = setTimeout(() => {
      this.options.pageNumber = 1;
      if (!input && this.iScroll) {
        this.resetAll();
        this.checkInfiniteScroll();
      } else {
        this.currentPage = this.options.pageNumber;
        this.pageChanged(this.currentPage, Boolean(input));
      }
    }, 600);
  }
  checkInfiniteScroll() {
    if (this.iScroll) {
      if (this.list.length >= this.totalCount) {
        this.iScroll.disabled = true;
      } else {
        this.iScroll.disabled = false;
        this.options.pageNumber = Math.ceil(this.list.length / this.itemsPerPage);
      }
    }
  }
  get listStatus() {
    if (this.list) {
      if (!this.list.length && this.originalTotalCount) {
        return 'empty-search';
      }
      if (!this.list.length && !this.originalTotalCount) {
        return 'empty-state';
      }
    } else {
      return 'empty-state';
    }
    return 'normal';
  }
  removeDups(): void {
    // remove duplicates ES6 style
    this.fullList = this.fullList.filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i);
  }
  ngAfterViewInit() {
    // this will fix infinite scroll triggering when there are less than 10 (default items per page) in the list and the user scrolls down
    this.checkInfiniteScroll();
  }
  async refresh(e: RefresherComponent) {
    let isRefreshing = true;
    this.options.pageNumber = 1;
    this.searchTerm = '';
    this.currentPage = 1;
    const pageSize = this.options.pageSize;
    this.filterOptions = [];
    this.options.pageSize = this.list.length >= this.itemsPerPage ? this.list.length : this.itemsPerPage;
    this.refreshing = true;
    setTimeout(() => {
      if (!isRefreshing) {
        e.resetAll();
      }
      isRefreshing = false;
    }, 1500);
    await this.pageChanged(1);
    this.refreshing = false;
    this.options.pageSize = pageSize;
    if (!isRefreshing) {
      e.resetAll();
    }
    isRefreshing = false;
  }
  resetAll() {
    return new Promise<void>((res) => {
      this.spinner.showSpinner();
      let sdk = this.financeSdk;
      if (this.methodName.service) {
        sdk = this.financeSdk[this.methodName.service];
      }
      this.options.pageNumber = 1;
      this.currentPage = 1;
      this.totalCount = this.originalTotalCount;
      const opts = [];
      this.filterOptions = [];
      if (this.id) {
        opts.push(this.id);
      }
      opts.push({
        pagination: this.options,
        filters: this.filterOptions.length ? this.filterOptions : undefined,
        queryMode: 'or'
      });
      sdk[this.endpointName](...opts, ...this.optionsArr).then((data: PaginatedResult<T>) => {
        this.list = data.entities;
        this.currentPage = 1;
        this.listChange.next({ entities: data.entities, totalCount: data.totalCount });
        this.spinner.hideSpinner();
        this.checkInfiniteScroll();
        res();
      });
    });
  }
}
