import { SameDayPipe } from './pipes/same-day/same-day.pipe';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { InitialsPipe } from './pipes/initials/initials.pipe';
import { NegativeToZeroPipe } from './pipes/negative-to-zero/negative-to-zero.pipe';
import { BeneficiaryNamePipe } from './pipes/beneficiary-name/beneficiary-name.pipe';
import { SliceDotPipe } from './pipes/dot-slice/dot-slice.pipe';
import { BeneficiaryLettersPipe } from './pipes/beneficiary-letter/beneficairy-letters.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { FirstNameSlicePipe } from './pipes/first-name/first-name.pipe';
import { AccountNumberPipe } from './pipes/account-number/account-number.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberPipe } from './pipes/phone-number/phone-number.pipe';
import { CountDownPipe } from './pipes/count-down/count-down.pipe';
import { ProblemNumberPipe } from './pipes/problem-number/problem-number.pipe';
import { AlertService } from './services/alert.service';
import { NumToPercentagePipe } from './pipes/number-to-percentage/number-to-percentage.pipe';
import { SmartlookDirective } from './directives/smartlook.directive';
import { DiffDayPipe } from './pipes/diff-day/diff-day.pipe';
import { NotificatonsTimesPipe } from './pipes/notification-times/notifications-times.pipe';
import { GoNextDirective } from './directives/go-next.directive';
import { NotificationBadgePipe } from './pipes/notification-badge/notification-badge.pipe';
import { StatusPipe } from './pipes/status/status.pipe';
import { ValuePipe } from './pipes/column/column.pipe';
import { DataDirective } from './directives/data.directive';
import { TwoDigitsPipe } from './pipes/two-digits/two-digits.pipe';
import { MonthAndYearDatePipe } from './pipes/month-and-year-date/month-and-year-date.pipe';
import { SplitArrayPipe } from './pipes/split-array/split-arry.pipe';
import { PermPipe } from './pipes/perm/perm.pipe';
import { TimePipe } from './pipes/time/time.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RemoveWhiteSpaceDirective } from './directives/remove-whitespace.directive';
import { ModifyDealPipe } from './pipes/modify-deal-name/modify-deal-name.pipe';
import { ColFilterPipe } from './pipes/col-filter/col-filter.pipe';
import { AuthenticationService } from './services/authentication.service';

export function loadAuthService(authService: AuthenticationService): Function {
  return () => authService.setSdkToken().toPromise();
}
@NgModule({
  declarations: [
    InitialsPipe,
    NegativeToZeroPipe,
    FilterPipe,
    NotificationBadgePipe,
    StatusPipe,
    MonthAndYearDatePipe,
    BeneficiaryNamePipe,
    SliceDotPipe,
    AccountNumberPipe,
    BeneficiaryLettersPipe,
    FirstNameSlicePipe,
    SplitArrayPipe,
    PhoneNumberPipe,
    CountDownPipe,
    NotificatonsTimesPipe,
    ValuePipe,
    ProblemNumberPipe,
    NumToPercentagePipe,
    SmartlookDirective,
    RemoveWhiteSpaceDirective,
    PermPipe,
    GoNextDirective,
    DataDirective,
    TwoDigitsPipe,
    DiffDayPipe,
    ColFilterPipe,
    ValuePipe,
    SameDayPipe,
    TimePipe,
    ModifyDealPipe,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadAuthService,
      deps: [AuthService],
      multi: true
    },
    Geolocation,
    Storage,
    AuthService,
    TwoDigitsPipe,
    MonthAndYearDatePipe,
    ModifyDealPipe
  ],
  exports: [
    InitialsPipe,
    SplitArrayPipe,
    TwoDigitsPipe,
    NegativeToZeroPipe,
    FilterPipe,
    MonthAndYearDatePipe,
    PermPipe,
    BeneficiaryNamePipe,
    SliceDotPipe,
    ColFilterPipe,
    StatusPipe,
    AccountNumberPipe,
    BeneficiaryLettersPipe,
    NotificationBadgePipe,
    NotificatonsTimesPipe,
    FirstNameSlicePipe,
    PhoneNumberPipe,
    CountDownPipe,
    ValuePipe,
    ProblemNumberPipe,
    NumToPercentagePipe,
    SmartlookDirective,
    RemoveWhiteSpaceDirective,
    DataDirective,
    GoNextDirective,
    DiffDayPipe,
    ValuePipe,
    TimePipe,
    SameDayPipe,
    ModifyDealPipe,
  ]
})
export class SharedModule {}
