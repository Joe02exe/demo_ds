import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListclusterComponent } from './listcluster.component';

describe('ListclusterComponent', () => {
  let component: ListclusterComponent;
  let fixture: ComponentFixture<ListclusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListclusterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListclusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
