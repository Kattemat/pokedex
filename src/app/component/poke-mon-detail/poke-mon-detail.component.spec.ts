import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeMonDetailComponent } from './poke-mon-detail.component';

describe('PokeMonDetailComponent', () => {
  let component: PokeMonDetailComponent;
  let fixture: ComponentFixture<PokeMonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokeMonDetailComponent]
    });
    fixture = TestBed.createComponent(PokeMonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
