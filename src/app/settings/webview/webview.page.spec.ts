import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebviewPage } from './webview.page';

describe('WebviewPage', () => {
  let component: WebviewPage;
  let fixture: ComponentFixture<WebviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WebviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
