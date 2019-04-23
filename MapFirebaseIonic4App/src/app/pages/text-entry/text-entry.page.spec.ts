import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEntryPage } from './text-entry.page';

describe('TextEntryPage', () => {
  let component: TextEntryPage;
  let fixture: ComponentFixture<TextEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
