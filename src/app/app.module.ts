import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { AppComponent } from './app.component';
import { DataService } from './app-data';

@NgModule({
    imports: [
        BrowserModule,
        WjGridModule
    ],
    declarations: [AppComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {}
