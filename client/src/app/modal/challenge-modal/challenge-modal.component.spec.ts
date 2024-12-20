import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeModalComponent } from './challenge-modal.component';

describe('ChallengeModalComponent', () => {
  let component: ChallengeModalComponent;
  let fixture: ComponentFixture<ChallengeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
