import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubmodalComponent } from './hubmodal.component';

describe('HubmodalComponent', () => {
  let component: HubmodalComponent;
  let fixture: ComponentFixture<HubmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
