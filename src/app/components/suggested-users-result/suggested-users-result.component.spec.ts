import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedUsersResultComponent } from './suggested-users-result.component';

describe('SuggestedUsersResultComponent', () => {
  let component: SuggestedUsersResultComponent;
  let fixture: ComponentFixture<SuggestedUsersResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedUsersResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedUsersResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
