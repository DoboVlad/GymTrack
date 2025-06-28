import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Navbar } from "./layout/navbar/navbar";
import { Footer } from "./layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend-gymtrack';
}
