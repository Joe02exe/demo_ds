import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallOfShameComponent } from './wall-of-shame.component';

describe('WallOfShameComponent', () => {
  let component: WallOfShameComponent;
  let fixture: ComponentFixture<WallOfShameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WallOfShameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WallOfShameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
