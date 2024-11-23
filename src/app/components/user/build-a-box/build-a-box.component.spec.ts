import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildABoxComponent } from './build-a-box.component';

describe('BuildABoxComponent', () => {
  let component: BuildABoxComponent;
  let fixture: ComponentFixture<BuildABoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildABoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildABoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
