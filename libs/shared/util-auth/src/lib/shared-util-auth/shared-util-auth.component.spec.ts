import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUtilAuthComponent } from './shared-util-auth.component';

describe('SharedUtilAuthComponent', () => {
  let component: SharedUtilAuthComponent;
  let fixture: ComponentFixture<SharedUtilAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUtilAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUtilAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
